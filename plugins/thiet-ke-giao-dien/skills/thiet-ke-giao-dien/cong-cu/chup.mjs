// Chụp các trạng thái giao diện qua Chrome DevTools Protocol, không cần Puppeteer/Playwright (Node ≥ 22).
//   node chup.mjs <url-gốc> <thư-mục-ra> <canh.json> [ten1,ten2…]
// canh.json: mảng cảnh, xem canh-mau.json. Mỗi cảnh:
//   ten, url (đường dẫn sau url-gốc), w, h, mobile, full (chụp cả trang),
//   b (JS chạy sau khi tải: bấm, gõ…), doi (JS trả về true khi sẵn sàng),
//   sau (JS chạy tiếp, ví dụ mở khung chi tiết), doi2 (chờ cho bước sau).
// Biến môi trường: CHROME (đường dẫn Chrome), CHUP_PORT (mặc định 9481).
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const [GOC, RA, CANH_TEP, CHON] = process.argv.slice(2);
if (!GOC || !RA || !CANH_TEP) { console.error('Cách dùng: node chup.mjs <url-gốc> <thư-mục-ra> <canh.json> [ten,…]'); process.exit(1); }
const CANH = JSON.parse(fs.readFileSync(CANH_TEP, 'utf8')).filter(c => !CHON || CHON.split(',').includes(c.ten));
fs.mkdirSync(RA, { recursive: true });

const CHROME = process.env.CHROME || [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser',
].find(p => fs.existsSync(p));
if (!CHROME) { console.error('Không thấy Chrome. Đặt biến CHROME=<đường dẫn>.'); process.exit(1); }
const CONG = +(process.env.CHUP_PORT || 9481);
// hồ sơ Chrome riêng, tạm: không đụng Chrome đang dùng
const HS = fs.mkdtempSync(path.join(os.tmpdir(), 'chup-cdp-'));
const ch = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${CONG}`, `--user-data-dir=${HS}`, '--hide-scrollbars', 'about:blank'], { stdio: 'ignore' });
const ngu = ms => new Promise(r => setTimeout(r, ms));
const don = () => { try { ch.kill(); } catch {} setTimeout(() => fs.rmSync(HS, { recursive: true, force: true }), 500); };

let ws;
for (let i = 0; i < 40 && !ws; i++) {
  await ngu(250);
  try { const p = (await (await fetch(`http://127.0.0.1:${CONG}/json`)).json()).find(x => x.type === 'page'); if (p) ws = new WebSocket(p.webSocketDebuggerUrl); } catch {}
}
if (!ws) { console.error(`Chrome không mở được cổng ${CONG} (cổng bận? đặt CHUP_PORT khác).`); don(); process.exit(1); }
await new Promise(r => ws.onopen = r);
let id = 0; const cho = {};
ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && cho[m.id]) { cho[m.id](m); delete cho[m.id]; } };
const goi = (method, params = {}) => new Promise(r => { cho[++id] = r; ws.send(JSON.stringify({ id, method, params })); });
const js = async s => { const r = await goi('Runtime.evaluate', { expression: s, awaitPromise: true, returnByValue: true }); return r.result?.result?.value ?? r.result?.exceptionDetails?.exception?.description; };
const doi = async (s, ms = 30000) => { for (let t = 0; t < ms; t += 250) { if (await js(s)) return true; await ngu(250); } return false; };

for (const c of CANH) {
  await goi('Emulation.setDeviceMetricsOverride', { width: c.w || 1440, height: c.h || 900, deviceScaleFactor: 1, mobile: !!c.mobile });
  await goi('Page.navigate', { url: GOC + (c.url || '/') });
  await doi(`document.readyState === 'complete' && document.fonts.status === 'loaded'`);
  await ngu(600);
  if (c.b) await js(`(async () => { ${c.b} })()`);
  if (c.doi && !(await doi(c.doi))) console.log(c.ten, 'HẾT GIỜ chờ:', c.doi);
  if (c.sau) { await js(`(async () => { ${c.sau} })()`); if (c.doi2 && !(await doi(c.doi2))) console.log(c.ten, 'HẾT GIỜ chờ:', c.doi2); }
  await ngu(700);
  // lỗi bố cục hay gặp nhất trên điện thoại: trang rộng hơn màn hình
  const tran = await js(`document.documentElement.scrollWidth > innerWidth ? 'TRÀN NGANG ' + document.documentElement.scrollWidth + 'px' : ''`);
  const w = c.w || 1440, h = c.full ? await js(`Math.min(document.documentElement.scrollHeight, 8000)`) : null;
  const r = await goi('Page.captureScreenshot', { format: 'png', captureBeyondViewport: !!c.full, ...(h ? { clip: { x: 0, y: 0, width: w, height: h, scale: 1 } } : {}) });
  fs.writeFileSync(path.join(RA, `${c.ten}.png`), Buffer.from(r.result.data, 'base64'));
  console.log(c.ten, 'ok', tran || '');
}
ws.close(); don();
