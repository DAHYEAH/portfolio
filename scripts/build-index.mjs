#!/usr/bin/env node
/**
 * content/**.md → data/kb.json (청크 + 임베딩)
 *
 * 실행: node scripts/build-index.mjs
 * 필요: .env.local 에 CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN
 *       (토큰 권한: Account → Workers AI → Read)
 *
 * 임베딩 모델은 Worker 런타임과 반드시 동일해야 합니다 (@cf/baai/bge-m3).
 */

import { readFile, writeFile, readdir } from 'node:fs/promises';
import { execFile, spawn } from 'node:child_process';
import { promisify } from 'node:util';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const CONTENT_DIR = join(ROOT, 'content');
const OUT_FILE = join(ROOT, 'data', 'kb.json');

const EMBED_MODEL = '@cf/baai/bge-m3';
const MAX_CHARS = 1200;   // 청크 최대 길이
const MIN_CHARS = 80;     // 이보다 짧은 섹션은 앞 청크에 합침
const BATCH = 20;         // 임베딩 배치 크기
const PRECISION = 5;      // 벡터 소수점 자리수 (파일 크기 절감)
const NPX = process.platform === 'win32' ? 'npx.cmd' : 'npx';

/* ── .env.local 로드 (의존성 없이) ── */
async function loadEnv() {
  try {
    const raw = await readFile(join(ROOT, '.env.local'), 'utf8');
    for (const line of raw.split('\n')) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && !process.env[m[1]]) {
        process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
      }
    }
  } catch { /* .env.local 없으면 환경변수만 사용 */ }
}

/* ── wrangler 로그인 세션에서 Account ID 자동 탐지 ──
   .env.local 에 직접 적어도 되지만, 이미 wrangler login 을 했다면
   굳이 대시보드에서 찾아 복붙할 이유가 없다. */
async function detectAccountId() {
  try {
    const { stdout } = await promisify(execFile)(NPX, ['--no-install', 'wrangler', 'whoami'], {
      cwd: join(ROOT, 'worker'),
      timeout: 60_000,
    });
    // 표 형태 출력에서 32자리 hex ID 를 뽑는다
    const m = stdout.match(/\b[0-9a-f]{32}\b/);
    return m ? m[0] : null;
  } catch {
    return null;
  }
}

/* ── md 파일 전부 수집 ── */
async function collectMarkdown(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await collectMarkdown(full));
    else if (entry.name.endsWith('.md') && entry.name !== 'README.md') out.push(full);
  }
  return out.sort();
}

/* ── 아주 단순한 YAML frontmatter 파서 (이 프로젝트 스키마 전용) ── */
function parseFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return { meta: {}, body: raw };

  const meta = {};
  let lastKey = null;
  for (const line of m[1].split('\n')) {
    if (!line.trim()) continue;
    const kv = line.match(/^([a-z_]+):\s*(.*)$/);
    if (kv) {
      lastKey = kv[1];
      const val = kv[2].trim();
      if (val === '') meta[lastKey] = [];
      else if (val.startsWith('[') && val.endsWith(']')) {
        meta[lastKey] = val.slice(1, -1).split(',').map(s => s.trim()).filter(Boolean);
      } else meta[lastKey] = val;
    } else if (lastKey && /^\s+-\s/.test(line)) {
      // links: 의 - label: / url: 블록은 문자열로만 보관
      if (!Array.isArray(meta[lastKey])) meta[lastKey] = [];
      meta[lastKey].push(line.replace(/^\s*-\s*/, '').trim());
    } else if (lastKey && /^\s+\w+:/.test(line) && Array.isArray(meta[lastKey])) {
      const i = meta[lastKey].length - 1;
      if (i >= 0) meta[lastKey][i] += ' ' + line.trim();
    }
  }
  return { meta, body: raw.slice(m[0].length) };
}

/* ── 본문을 heading 단위로 청킹 ── */
function chunkBody(body, docTitle) {
  // 미작성 플레이스홀더는 지식에서 제외 — 봇이 "채워넣기"를 읊으면 안 됨
  const cleaned = body
    .split('\n')
    .filter(line => !line.trim().startsWith('> 📝 채워넣기'))
    .join('\n');

  const sections = [];
  let heading = null;
  let buf = [];
  let skipping = false;   // `## English` 섹션 동안 true

  const flush = () => {
    const text = buf.join('\n').trim();
    if (text && !skipping) sections.push({ heading, text });
    buf = [];
  };

  for (const line of cleaned.split('\n')) {
    // H1/H2 둘 다 섹션 경계로 취급한다. publications.md 처럼 `# 논문` / `# 수상`
    // 으로 나뉜 문서에서 H1 을 무시하면 서로 다른 주제가 한 청크에 섞인다.
    const h = line.match(/^#{1,2}\s+(.*)$/);
    if (h) {
      const label = h[1].trim();
      // 문서 제목과 같은 H1 은 meta.title 로 이미 갖고 있으므로 건너뛴다
      if (label === docTitle) continue;
      flush();
      heading = label;
      // `## English` 는 한국어 본문의 번역본이다. bge-m3 가 다국어라
      // 한국어 질문에도 이 중복이 상위에 걸려 검색 슬롯을 잡아먹는다.
      // 사람이 읽을 md 에는 남기되 인덱스에서만 제외한다.
      if (label === 'English') { skipping = true; continue; }
      skipping = false;
    } else if (!skipping) buf.push(line);
  }
  flush();

  // 너무 짧은 섹션은 앞에 병합
  const merged = [];
  for (const s of sections) {
    const prev = merged[merged.length - 1];
    if (prev && s.text.length < MIN_CHARS && prev.text.length + s.text.length < MAX_CHARS) {
      prev.text += `\n\n### ${s.heading ?? ''}\n${s.text}`;
    } else merged.push({ ...s });
  }

  // 너무 긴 섹션은 문단 경계로 분할
  const final = [];
  for (const s of merged) {
    if (s.text.length <= MAX_CHARS) { final.push(s); continue; }
    let cur = [];
    let len = 0;
    for (const para of s.text.split(/\n\s*\n/)) {
      if (len + para.length > MAX_CHARS && cur.length) {
        final.push({ heading: s.heading, text: cur.join('\n\n') });
        cur = []; len = 0;
      }
      cur.push(para); len += para.length;
    }
    if (cur.length) final.push({ heading: s.heading, text: cur.join('\n\n') });
  }
  return final;
}

/* ── Workers AI REST 임베딩 ── */
async function embed(texts, accountId, token) {
  const res = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${EMBED_MODEL}`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: texts }),
    },
  );

  if (!res.ok) {
    throw new Error(`Workers AI ${res.status}: ${(await res.text()).slice(0, 400)}`);
  }
  const json = await res.json();
  if (json.success === false) {
    throw new Error(`Workers AI error: ${JSON.stringify(json.errors)}`);
  }
  const vectors = json.result?.data ?? json.result?.response ?? json.data;
  if (!Array.isArray(vectors) || !Array.isArray(vectors[0])) {
    throw new Error(`예상치 못한 응답 형태: ${JSON.stringify(json).slice(0, 300)}`);
  }
  return vectors;
}

/* ── wrangler dev 경유 임베딩 (API 토큰 없이) ──
   Cloudflare 신규 계정에서 API 토큰 발급이 "verify your email" 로 막히는 사례가 있다.
   그 경우 OAuth 로그인 세션만으로 되는 이 경로를 쓴다.
   `wrangler dev --remote` 는 실제 엣지에서 Worker 를 실행하므로 AI 바인딩이 그대로 살아있다. */
const DEV_PORT = 8787;

async function startWranglerDev() {
  const child = spawn(
    NPX,
    ['--no-install', 'wrangler', 'dev', 'src/index.js', '--remote', '--port', String(DEV_PORT), '--var', 'DEV_EMBED:1'],
    { cwd: join(ROOT, 'worker'), stdio: ['ignore', 'pipe', 'pipe'] },
  );

  let log = '';
  child.stdout.on('data', d => { log += d; });
  child.stderr.on('data', d => { log += d; });

  process.stdout.write('🚀 wrangler dev --remote 기동 중');
  for (let i = 0; i < 90; i++) {
    if (child.exitCode !== null) {
      console.log('');
      throw new Error(`wrangler dev 가 종료되었습니다:\n${log.slice(-1500)}`);
    }
    try {
      const res = await fetch(`http://127.0.0.1:${DEV_PORT}/__embed`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: ['ping'] }),
      });
      if (res.ok) { console.log(' ✓'); return child; }
    } catch { /* 아직 안 떴음 */ }
    process.stdout.write('.');
    await new Promise(r => setTimeout(r, 1000));
  }
  child.kill();
  console.log('');
  throw new Error(`wrangler dev 기동 실패:\n${log.slice(-1500)}`);
}

async function embedViaDev(texts) {
  const res = await fetch(`http://127.0.0.1:${DEV_PORT}/__embed`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: texts }),
  });
  if (!res.ok) throw new Error(`/__embed ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const { data } = await res.json();
  if (!Array.isArray(data) || !Array.isArray(data[0])) {
    throw new Error(`예상치 못한 응답 형태: ${JSON.stringify(data).slice(0, 200)}`);
  }
  return data;
}

/* ── main ── */
await loadEnv();

/* 임베딩 경로 결정
   - REST     : CLOUDFLARE_API_TOKEN 이 있을 때 (기본, 빠름)
   - wrangler : 토큰이 없거나 --via-wrangler 일 때. OAuth 로그인 세션만으로 동작하므로
                신규 계정에서 토큰 발급이 "verify your email" 로 막혀도 진행할 수 있다. */
const forceWrangler = process.argv.includes('--via-wrangler');
const token = process.env.CLOUDFLARE_API_TOKEN;
const useWrangler = forceWrangler || !token;

let accountId = null;
if (!useWrangler) {
  accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  if (!accountId) {
    process.stdout.write('🔎 wrangler 세션에서 Account ID 찾는 중… ');
    accountId = await detectAccountId();
    console.log(accountId ?? '실패');
  }
  if (!accountId) {
    console.error('');
    console.error('❌ Account ID 를 찾지 못했습니다.');
    console.error('   cd worker && npx wrangler login  을 먼저 실행하거나,');
    console.error('   .env.local 의 CLOUDFLARE_ACCOUNT_ID 에 직접 적어주세요.');
    process.exit(1);
  }
}

console.log(useWrangler
  ? '🔑 인증: wrangler 로그인 세션 (API 토큰 없이)'
  : '🔑 인증: CLOUDFLARE_API_TOKEN');

const files = await collectMarkdown(CONTENT_DIR);
const chunks = [];

for (const file of files) {
  const raw = await readFile(file, 'utf8');
  const { meta, body } = parseFrontmatter(raw);
  const source = relative(ROOT, file);

  const title = meta.title ?? source;

  for (const section of chunkBody(body, title)) {
    const label = section.heading ? `${title} — ${section.heading}` : title;
    // 임베딩 대상 텍스트에 메타를 얹어야 "지란지교소프트에서 뭐 했어?" 같은 질문이 걸린다
    const contextLine = [meta.org, meta.period, meta.role].filter(Boolean).join(' · ');
    const tagLine = Array.isArray(meta.tags) ? meta.tags.join(', ') : '';

    chunks.push({
      id: `${meta.id ?? source}#${chunks.length}`,
      source,
      title,
      title_en: meta.title_en ?? null,
      heading: section.heading ?? null,
      category: meta.category ?? null,
      org: meta.org ?? null,
      period: meta.period ?? null,
      text: [label, contextLine, section.text, tagLine && `키워드: ${tagLine}`]
        .filter(Boolean).join('\n'),
    });
  }
}

console.log(`📄 ${files.length}개 파일 → ${chunks.length}개 청크`);

let devProc = null;
if (useWrangler) devProc = await startWranglerDev();

const vectors = [];
try {
  for (let i = 0; i < chunks.length; i += BATCH) {
    const batch = chunks.slice(i, i + BATCH);
    process.stdout.write(`  임베딩 ${i + batch.length}/${chunks.length}\r`);
    const texts = batch.map(c => c.text);
    vectors.push(...(useWrangler ? await embedViaDev(texts) : await embed(texts, accountId, token)));
  }
  console.log('');
} finally {
  if (devProc) { devProc.kill(); console.log('🛑 wrangler dev 종료'); }
}

if (vectors.length !== chunks.length) {
  throw new Error(`벡터 수(${vectors.length}) ≠ 청크 수(${chunks.length})`);
}

// L2 정규화 → 런타임에서 내적만으로 코사인 유사도 계산 가능
const normalized = vectors.map(v => {
  const norm = Math.hypot(...v) || 1;
  return v.map(x => Number((x / norm).toFixed(PRECISION)));
});

const kb = {
  model: EMBED_MODEL,
  dim: normalized[0].length,
  normalized: true,
  builtFrom: files.map(f => relative(ROOT, f)),
  chunks: chunks.map((c, i) => ({ ...c, vector: normalized[i] })),
};

await writeFile(OUT_FILE, JSON.stringify(kb));
const kb_kb = (JSON.stringify(kb).length / 1024).toFixed(0);
console.log(`✅ ${relative(ROOT, OUT_FILE)} 생성 — ${chunks.length}청크 · ${kb.dim}차원 · ${kb_kb}KB`);
