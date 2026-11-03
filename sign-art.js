// Draws Bangkok signs: the shapes, colors and pictograms each kind of sign
// uses, with Thai above English where the real sign is bilingual.

// Pictograms on a 24-unit grid, in the sign's ink color. s: stroked lines,
// f: filled shapes.
const PICTO = {
  run: { s: "M13 7.5l-2.2 5.8M13 7.5l-3.8 1.8-2.2-.8M13 7.5l2.8 2.6 2.6-.6M10.8 13.3l3.4 3-1 4.7M10.8 13.3l-1.9 3.6-4 1.1M19.5 3.5h2.5v17.5h-2.5", f: '<circle cx="14.6" cy="4" r="2.2"/>' },
  enter: { s: "M3 12h12M10 6.5l5.5 5.5-5.5 5.5M19.5 3.5v17" },
  train: { s: "M7 3h10a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3zM4.5 10.5h15M8 18l-2.5 3.5M16 18l2.5 3.5", f: '<circle cx="8" cy="14.5" r="1.2"/><circle cx="16" cy="14.5" r="1.2"/>' },
  bus: { s: "M6 3h12a2 2 0 0 1 2 2v13H4V5a2 2 0 0 1 2-2zM4 11h16M4 7h16", f: '<circle cx="7.5" cy="20" r="1.8"/><circle cx="16.5" cy="20" r="1.8"/>' },
  boat: { s: "M3 14.5h18l-2.8 4.5H5.8zM7 14.5V10h8.5v4.5M11 10V5.5M2 22c1.7-1 3.3-1 5 0s3.3 1 5 0 3.3-1 5 0 3.3 1 5 0" },
  depart: { f: '<path transform="rotate(45 12 12)" d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>' },
  arrive: { f: '<path transform="rotate(135 12 12)" d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>' },
  man: { f: '<circle cx="12" cy="3.6" r="2.4"/><path d="M7.8 8h8.4v7.6h-2V22H9.8v-6.4h-2z"/>' },
  woman: { f: '<circle cx="12" cy="3.6" r="2.4"/><path d="M9.4 8h5.2l3.2 8.4h-3.4V22H9.6v-5.6H6.2z"/>' },
  toilets: { vb: "0 0 48 24", s: "M24 2v20", f: '<circle cx="12" cy="3.6" r="2.4"/><path d="M7.8 8h8.4v7.6h-2V22H9.8v-6.4h-2z"/><circle cx="36" cy="3.6" r="2.4"/><path d="M33.4 8h5.2l3.2 8.4h-3.4V22h-4.8v-5.6h-3.4z"/>' },
  stairs: { s: "M3 21h4.5v-4.5H12V12h4.5V7.5H21" },
  cigarette: { s: "M2.5 14h16v3.5h-16zM15 14v3.5M19 12.5c0-1.8 2-1.8 2-3.6s-2-1.8-2-3.6" },
  shoe: { s: "M3 18.5h18M3 18.5V12l4-1 3.2 3 6.3 1.2c2.6.5 4.5 1.6 4.5 3.3" },
  temple: { s: "M12 2v3M9 8l3-3 3 3M5.5 12.5L12 8l6.5 4.5M3 16.5l9-5 9 5M6 16.5V21h12v-4.5M10.5 21v-3h3v3" },
  hospital: { f: '<rect x="2" y="2" width="20" height="20" rx="3" fill="#fff"/><path fill="#1f5fae" d="M6.5 6h3v4.5h5V6h3v12h-3v-4.5h-5V18h-3z"/>' },
  cross: { f: '<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>' },
  badge: { s: "M12 2.5l7.5 2.8v5.9c0 4.7-3.2 8.4-7.5 10.3-4.3-1.9-7.5-5.6-7.5-10.3V5.3z", f: '<path d="M12 7.2l1.3 2.7 3 .4-2.2 2.1.5 3-2.6-1.4-2.6 1.4.5-3-2.2-2.1 3-.4z"/>' },
  drop: { s: "M12 3c4 5 6 8.2 6 11a6 6 0 0 1-12 0c0-2.8 2-6 6-11z" },
};

function pictoSvg(name, cls = "pic") {
  const p = PICTO[name];
  const wide = p.vb && p.vb !== "0 0 24 24" ? " wide" : "";
  return `<svg class="${cls}${wide}" viewBox="${p.vb || "0 0 24 24"}" aria-hidden="true">${
    p.s ? `<path d="${p.s}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>` : ""}${
    p.f ? `<g fill="currentColor">${p.f}</g>` : ""}</svg>`;
}

// Circle, diamond and octagon road signs, drawn on a 100-unit grid.
const DISCS = {
  noentry: '<circle cx="50" cy="50" r="47" fill="#c8102e"/><rect x="17" y="40" width="66" height="20" fill="#fff"/>',
  prohibit: '<circle cx="50" cy="50" r="43" fill="#fff" stroke="#c8102e" stroke-width="9"/>',
  noparking: '<circle cx="50" cy="50" r="43" fill="#1f5fae" stroke="#c8102e" stroke-width="9"/><line x1="20" y1="20" x2="80" y2="80" stroke="#c8102e" stroke-width="9"/>',
  warning: '<path d="M50 4l46 46-46 46L4 50z" fill="#ffc300" stroke="#111" stroke-width="4" stroke-linejoin="round"/><rect x="45" y="24" width="10" height="34" rx="3" fill="#111"/><circle cx="50" cy="70" r="6" fill="#111"/>',
  stop: '<path d="M30 3h40l27 27v40L70 97H30L3 70V30z" fill="#c8102e"/><path d="M32 8h36l24 24v36L68 92H32L8 68V32z" fill="none" stroke="#fff" stroke-width="3"/>',
};

function escSign(s) {
  return String(s).replace(/[&<>"]/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]));
}

// Thai text of the sign, with the word being learned marked when the sign
// says more than just that word.
function signThai(text, target) {
  const t = escSign(text), w = escSign(target);
  return text !== target && t.includes(w) ? t.replace(w, `<span class="tgt">${w}</span>`) : t;
}

// art: { kind, text (Thai on the sign, defaults to the card), en, t (color), pic }
function renderSign(card, art) {
  const text = art.text || card.th;
  const th = signThai(text, card.th);
  // Longer names get smaller type, as on a real sign of fixed width.
  const size = text.length <= 7 ? "" : text.length <= 11 ? " long" : " longer";
  const en = art.en ? `<span class="sg-en" lang="en">${escSign(art.en)}</span>` : "";
  const words = `<span class="s-words-col"><span class="s-thai${size}" lang="th">${th}</span>${en}</span>`;
  switch (art.kind) {
    case "disc": {
      const body = art.disc === "prohibit"
        ? DISCS.prohibit + `<g transform="translate(22 22) scale(2.35)" color="#111">${pictoSvg(art.pic, "").replace(/<\/?svg[^>]*>/g, "")}</g><line x1="20" y1="20" x2="80" y2="80" stroke="#c8102e" stroke-width="9"/>`
        : DISCS[art.disc];
      return `<div class="sg-post"><svg class="sg-disc" viewBox="0 0 100 100" aria-hidden="true">${body}</svg>
        <div class="sg-plate">${words}</div></div>`;
    }
    case "stop":
      return `<div class="sg-post"><div class="sg-stop"><svg viewBox="0 0 100 100" aria-hidden="true">${DISCS.stop}</svg>
        <span class="s-thai" lang="th">${th}</span></div></div>`;
    case "danger":
      return `<div class="sg sg-danger"><span class="sg-danger-band">${words}</span></div>`;
    case "taxi":
      return `<div class="sg sg-taxi"><span class="sg-led t-${art.t || "red"}" lang="th">${th}</span></div>`;
    case "hang":
      return `<div class="sg-hang-wrap"><svg class="sg-string" viewBox="0 0 80 28" aria-hidden="true"><path d="M10 28L40 4L70 28" fill="none" stroke="#8a7a60" stroke-width="2"/><circle cx="40" cy="4" r="3" fill="#8a7a60"/></svg>
        <div class="sg sg-hang t-${art.t}">${words}</div></div>`;
    case "hand":
      return `<div class="sg sg-hand"><span class="s-thai" lang="th">${th}</span></div>`;
    case "street":
      return `<div class="sg sg-street">${words}</div>`;
    case "sticker":
      return `<div class="sg sg-sticker">${art.pic ? pictoSvg(art.pic) : ""}${words}</div>`;
    default:
      return `<div class="sg sg-panel t-${art.t}">${art.pic ? pictoSvg(art.pic) : ""}${words}</div>`;
  }
}
