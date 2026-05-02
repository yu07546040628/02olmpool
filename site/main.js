// ═══════════════════════════════════════════
// OlmPool.com — main.js
// Model table data + sort/filter interactions
// ═══════════════════════════════════════════

// ── Model Data (from paper Appendix A, Tables 1 & 2) ──
// Fields: swa, qknorm (lw/hw/none), norm (post/pre), fp8, init, kv, ctx,
//         dff, params, h8, h16, h32, h64, lpp, r4, r8, r16, r32, r64, hfName
const MODELS = [
  { swa:1, qknorm:'hw',  norm:'post', fp8:1, init:'A', kv:8,  ctx:'8K', dff:13312, params:'7.4B', h8:42.9, h16:34.0, h32:29.9, h64:27.0, lpp:4.94, r4:80.5, r8:68.3, r16:55.4, r32:45.7, r64:38.8, hfName:'A_post_HQK_8kv_8k_13k_SWA_fp8' },
  { swa:1, qknorm:'lw',  norm:'post', fp8:0, init:'B', kv:32, ctx:'4K', dff:11008, params:'7.3B', h8:48.1, h16:41.9, h32:35.0, h64:30.1, lpp:5.08, r4:81.1, r8:67.0, r16:54.7, r32:45.7, r64:null, hfName:'B_post_LQK_32kv_4k_11k_SWA' },
  { swa:1, qknorm:'lw',  norm:'post', fp8:0, init:'C', kv:8,  ctx:'8K', dff:13312, params:'7.4B', h8:45.1, h16:40.1, h32:35.2, h64:32.1, lpp:5.05, r4:76.3, r8:60.5, r16:51.9, r32:45.0, r64:39.6, hfName:null },
  { swa:1, qknorm:'lw',  norm:'post', fp8:0, init:'H', kv:8,  ctx:'4K', dff:13312, params:'7.4B', h8:50.0, h16:44.1, h32:36.9, h64:31.8, lpp:5.16, r4:78.2, r8:65.3, r16:55.6, r32:44.4, r64:35.0, hfName:'H_post_LQK_8kv_4k_11k_SWA' },
  { swa:1, qknorm:'lw',  norm:'post', fp8:0, init:'D', kv:8,  ctx:'8K', dff:13312, params:'7.4B', h8:49.5, h16:44.8, h32:38.8, h64:33.2, lpp:4.83, r4:79.4, r8:64.2, r16:57.0, r32:46.8, r64:38.2, hfName:'D_post_LQK_8kv_8k_13k_SWA' },
  { swa:1, qknorm:'lw',  norm:'post', fp8:0, init:'G', kv:8,  ctx:'4K', dff:14336, params:'7.8B', h8:49.0, h16:43.0, h32:39.9, h64:34.4, lpp:5.21, r4:76.2, r8:63.6, r16:54.9, r32:48.8, r64:40.2, hfName:'G_post_LQK_8kv_4k_14k_SWA' },
  { swa:1, qknorm:'lw',  norm:'post', fp8:1, init:'D', kv:8,  ctx:'8K', dff:13312, params:'7.4B', h8:56.4, h16:50.2, h32:42.7, h64:36.1, lpp:4.74, r4:80.3, r8:70.7, r16:61.1, r32:52.2, r64:45.6, hfName:null },
  { swa:1, qknorm:'lw',  norm:'post', fp8:1, init:'E', kv:32, ctx:'8K', dff:11008, params:'7.3B', h8:54.6, h16:48.7, h32:42.8, h64:37.4, lpp:4.31, r4:81.0, r8:71.0, r16:62.8, r32:54.6, r64:45.8, hfName:null },
  { swa:0, qknorm:'lw',  norm:'post', fp8:0, init:'B', kv:32, ctx:'4K', dff:11008, params:'7.3B', h8:53.8, h16:50.9, h32:42.9, h64:32.8, lpp:3.83, r4:83.5, r8:76.6, r16:69.0, r32:57.0, r64:40.9, hfName:'B_post_LQK_32kv_4k_11k' },
  { swa:1, qknorm:'none',norm:'pre',  fp8:0, init:'F', kv:8,  ctx:'8K', dff:14336, params:'7.8B', h8:53.7, h16:48.2, h32:43.6, h64:39.2, lpp:4.49, r4:81.6, r8:70.6, r16:63.9, r32:55.3, r64:49.2, hfName:'F_pre_8kv_8k_14k_SWA' },
  { swa:1, qknorm:'none',norm:'pre',  fp8:0, init:'G', kv:8,  ctx:'8K', dff:14336, params:'7.8B', h8:54.1, h16:49.1, h32:44.8, h64:36.1, lpp:4.66, r4:83.2, r8:73.7, r16:64.9, r32:55.1, r64:47.1, hfName:'G_pre_8kv_8k_14k_SWA' },
  { swa:1, qknorm:'lw',  norm:'pre',  fp8:0, init:'H', kv:32, ctx:'8K', dff:11008, params:'7.3B', h8:57.2, h16:51.5, h32:46.3, h64:39.1, lpp:4.67, r4:84.6, r8:74.3, r16:64.1, r32:55.8, r64:49.5, hfName:'H_pre_LQK_32kv_8k_11k_SWA' },
  { swa:1, qknorm:'lw',  norm:'post', fp8:1, init:'H', kv:32, ctx:'8K', dff:11008, params:'7.3B', h8:55.9, h16:52.8, h32:46.7, h64:39.6, lpp:4.23, r4:79.5, r8:71.8, r16:64.2, r32:56.7, r64:48.9, hfName:'H_post_LQK_32kv_8k_11k_SWA_fp8' },
  { swa:0, qknorm:'hw',  norm:'pre',  fp8:0, init:'K', kv:8,  ctx:'8K', dff:12288, params:'7.0B', h8:56.9, h16:54.1, h32:46.9, h64:40.5, lpp:3.47, r4:83.9, r8:76.7, r16:69.4, r32:62.9, r64:52.9, hfName:'K_post_HQK_8kv_12k' },
  { swa:1, qknorm:'hw',  norm:'post', fp8:0, init:'H', kv:32, ctx:'8K', dff:11008, params:'7.3B', h8:55.0, h16:48.9, h32:46.9, h64:43.4, lpp:4.62, r4:81.1, r8:68.9, r16:61.8, r32:57.4, r64:55.8, hfName:null },
  { swa:0, qknorm:'lw',  norm:'post', fp8:0, init:'H', kv:32, ctx:'4K', dff:11008, params:'7.3B', h8:54.3, h16:52.3, h32:47.4, h64:37.6, lpp:3.76, r4:null,r8:null,r16:null,r32:null,r64:null, hfName:'H_post_LQK_32kv_4k_11k' },
  { swa:1, qknorm:'lw',  norm:'post', fp8:0, init:'H', kv:32, ctx:'8K', dff:11008, params:'7.3B', h8:58.4, h16:52.5, h32:47.5, h64:41.1, lpp:4.38, r4:81.2, r8:70.4, r16:61.2, r32:54.1, r64:48.4, hfName:null },
  { swa:0, qknorm:'lw',  norm:'post', fp8:0, init:'G', kv:8,  ctx:'8K', dff:14336, params:'7.8B', h8:58.2, h16:53.0, h32:48.5, h64:39.6, lpp:3.85, r4:79.8, r8:74.6, r16:64.6, r32:57.1, r64:44.2, hfName:null },
  { swa:0, qknorm:'lw',  norm:'post', fp8:0, init:'H', kv:32, ctx:'8K', dff:11008, params:'7.3B', h8:57.7, h16:54.3, h32:48.7, h64:39.7, lpp:3.70, r4:84.9, r8:75.0, r16:66.8, r32:59.3, r64:50.8, hfName:'H_post_LQK_32kv_8k_11k' },
  { swa:0, qknorm:'none',norm:'pre',  fp8:0, init:'G', kv:4,  ctx:'8K', dff:14336, params:'7.7B', h8:55.5, h16:53.8, h32:49.1, h64:43.5, lpp:3.63, r4:80.7, r8:73.3, r16:67.5, r32:61.2, r64:54.0, hfName:null },
  { swa:0, qknorm:'none',norm:'pre',  fp8:0, init:'G', kv:8,  ctx:'4K', dff:14336, params:'7.8B', h8:58.5, h16:55.2, h32:50.2, h64:42.1, lpp:null, r4:81.1, r8:67.0, r16:54.7, r32:45.7, r64:35.2, hfName:null },
  { swa:0, qknorm:'lw',  norm:'pre',  fp8:0, init:'G', kv:8,  ctx:'8K', dff:14336, params:'7.8B', h8:59.4, h16:55.5, h32:51.4, h64:42.4, lpp:3.70, r4:82.5, r8:75.6, r16:68.3, r32:62.8, r64:50.7, hfName:null },
  { swa:0, qknorm:'none',norm:'pre',  fp8:0, init:'G', kv:8,  ctx:'8K', dff:14336, params:'7.8B', h8:57.8, h16:54.5, h32:52.4, h64:48.4, lpp:3.57, r4:83.2, r8:78.1, r16:72.0, r32:64.6, r64:56.0, hfName:null },
  { swa:1, qknorm:'none',norm:'pre',  fp8:0, init:'H', kv:32, ctx:'8K', dff:11008, params:'7.3B', h8:59.6, h16:57.4, h32:53.7, h64:47.8, lpp:4.28, r4:82.8, r8:74.6, r16:66.2, r32:64.2, r64:57.3, hfName:null },
  { swa:0, qknorm:'none',norm:'pre',  fp8:0, init:'I', kv:32, ctx:'8K', dff:12288, params:'7.8B', h8:59.3, h16:55.5, h32:54.4, h64:49.3, lpp:3.41, r4:85.2, r8:81.6, r16:75.5, r32:67.5, r64:58.9, hfName:'I_pre_32kv_8k_12k' },
  { swa:0, qknorm:'none',norm:'pre',  fp8:0, init:'J', kv:16, ctx:'8K', dff:14336, params:'8.1B', h8:60.8, h16:58.6, h32:56.4, h64:50.0, lpp:3.50, r4:86.0, r8:79.9, r16:76.0, r32:67.7, r64:64.9, hfName:null },
];

// ── Helpers ──
function fmt(v) {
  if (v === null || v === undefined) return '<span style="color:#94A3B8">—</span>';
  return v.toFixed(1);
}

function qknormBadge(v) {
  if (v === 'lw')   return '<span class="badge-qk">✓ LW</span>';
  if (v === 'hw')   return '<span class="badge-hqk">hw HW</span>';
  return '<span class="badge-none">×</span>';
}

function swaBadge(v) {
  return v ? '<span class="badge-swa">✓</span>' : '<span class="badge-noswa">×</span>';
}

function fp8Badge(v) {
  return v ? '<span class="badge-qk">✓</span>' : '<span class="badge-none">×</span>';
}

function hfLink(name) {
  if (!name) return '<span style="color:#94A3B8;font-size:.75rem">—</span>';
  const url = `https://huggingface.co/allenai/${name}`;
  return `<a class="hf-link" href="${url}" target="_blank" rel="noopener">↗ ${name}</a>`;
}

// ── Render Table ──
function renderTable(data) {
  const maxH32 = Math.max(...data.map(m => m.h32));
  const minH32 = Math.min(...data.map(m => m.h32));
  const maxR32 = Math.max(...data.filter(m => m.r32).map(m => m.r32));
  const minR32 = Math.min(...data.filter(m => m.r32).map(m => m.r32));

  const tbody = document.getElementById('models-tbody');
  tbody.innerHTML = data.map(m => {
    const h32Class = m.h32 === maxH32 ? 'score-best' : m.h32 === minH32 ? 'score-worst' : '';
    const r32Class = m.r32 === maxR32 ? 'score-best' : m.r32 === minR32 ? 'score-worst' : '';
    return `<tr>
      <td>${swaBadge(m.swa)}</td>
      <td>${qknormBadge(m.qknorm)}</td>
      <td><span style="font-size:.78rem;color:var(--text-muted)">${m.norm}</span></td>
      <td>${fp8Badge(m.fp8)}</td>
      <td><strong>${m.init}</strong></td>
      <td>${m.kv}</td>
      <td>${m.ctx}</td>
      <td style="color:var(--text-muted)">${m.params}</td>
      <td class="col-score">${fmt(m.h8)}</td>
      <td class="col-score">${fmt(m.h16)}</td>
      <td class="col-score col-highlight ${h32Class}">${fmt(m.h32)}</td>
      <td class="col-score">${fmt(m.h64)}</td>
      <td class="col-score">${m.lpp ? m.lpp.toFixed(2) : '<span style="color:#94A3B8">—</span>'}</td>
      <td class="col-score ${r32Class}">${fmt(m.r32)}</td>
      <td>${hfLink(m.hfName)}</td>
    </tr>`;
  }).join('');
}

// ── Sort ──
function sortModels(key) {
  const sorted = [...MODELS].sort((a, b) => {
    if (key === 'helmet32') return b.h32 - a.h32;
    if (key === 'ruler32')  return (b.r32 || 0) - (a.r32 || 0);
    if (key === 'longppl')  return (a.lpp || 99) - (b.lpp || 99);
    return 0;
  });
  renderTable(sorted);
}

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  // Default: sorted worst→best by HELMET 32K (ascending for "worst first" display)
  const initial = [...MODELS].sort((a, b) => a.h32 - b.h32);
  renderTable(initial);

  const sel = document.getElementById('sort-select');
  if (sel) {
    sel.addEventListener('change', () => {
      sortModels(sel.value);
    });
  }

  // ── Citation tabs ──
  document.querySelectorAll('.cite-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cite-tab').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.cite-content').forEach(c => c.classList.add('hidden'));
      btn.classList.add('active');
      const target = document.getElementById('cite-' + btn.dataset.tab);
      if (target) target.classList.remove('hidden');
    });
  });

  // ── Copy citation ──
  const copyBtn = document.getElementById('copy-cite');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const active = document.querySelector('.cite-content:not(.hidden) .cite-code');
      if (!active) return;
      navigator.clipboard.writeText(active.textContent).then(() => {
        copyBtn.textContent = 'Copied!';
        copyBtn.style.background = 'var(--green)';
        setTimeout(() => {
          copyBtn.textContent = 'Copy';
          copyBtn.style.background = '';
        }, 2000);
      });
    });
  }
});
