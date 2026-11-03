// Thai banknotes and coins, and baht-to-dollar conversion, shared by the
// money primer and the market page.
//
// The drawings follow the real layout, colors, sizes and features, but stop
// short of copies. Thai banknote designs are copyright, the Bank of Thailand
// requires its permission for any reproduction, and depictions that could
// offend the monarchy are barred. So portraits and the royal monogram are
// labeled frames, never likenesses, and every note carries a SPECIMEN mark
// that keeps clear of the portrait.

const USD_PER_BAHT = 0.030;   // the rate this app assumes

function toUsd(baht) { return baht * USD_PER_BAHT; }
function fmtUsd(usd) {
  if (usd < 1) return `${Math.max(1, Math.round(usd * 100))}¢`;
  return "$" + usd.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function fmtBaht(baht) { return "฿" + baht.toLocaleString("en-US"); }
const toThaiDigits = s => String(s).replace(/\d/g, d => "๐๑๒๓๔๕๖๗๘๙"[d]);

// Series 17 (2018–), King Vajiralongkorn on the front. Sizes in mm.
// flower: petals of the color-shifting flower right of the portrait.
// bars: raised slanted bars on the edges, for blind users.
const BANKNOTES = [
  { v: 20, th: "ยี่สิบบาท", ro: "yîi-sìp bàat", color: "green", ink: "#1f6b3a", mid: "#5f9e6e", paper: "#dcebd9", w: 138, bars: true,
    back: ["King Rama I", "King Rama II"], scenes: ["Grand Palace and Wat Phra Kaew", "Mural from his poem Inao"],
    note: "The note you'll handle most. Polymer since 2022, with two clear windows; paper ones are still around." },
  { v: 50, th: "ห้าสิบบาท", ro: "hâa-sìp bàat", color: "blue", ink: "#1f4f9a", mid: "#5f86c4", paper: "#dbe4f2", w: 144,
    back: ["King Rama III", "King Rama IV"], note: "Polymer since November 2025, same design as the paper note." },
  { v: 100, th: "หนึ่งร้อยบาท", ro: "nùeng ráawy bàat", color: "red", ink: "#a52a22", mid: "#d06a5e", paper: "#f4dcd6", w: 150, flower: 5, bars: true,
    back: ["King Rama V", "King Rama VI"], note: "Polymer since November 2025. The gold flower right of the portrait shimmers when tilted." },
  { v: 500, th: "ห้าร้อยบาท", ro: "hâa ráawy bàat", color: "purple", ink: "#5d3a8f", mid: "#9474c0", paper: "#e5dcf0", w: 156, flower: 6,
    back: ["King Rama VII", "King Rama VIII"], note: "Its six-petaled flower shifts from deep gold to yellow. Small stalls may struggle to change it." },
  { v: 1000, th: "หนึ่งพันบาท", ro: "nùeng phan bàat", color: "brown", ink: "#6b4a2e", mid: "#a5835f", paper: "#ede2d4", w: 162, flower: 16, bars: true,
    back: ["King Rama IX", "King Rama X"], note: "What ATMs hand out. The flower and thread shift from gold to green. Break it at a convenience store or mall." },
];

// Coin colors as they look in the hand: highlight, body, shadow. Sizes in mm.
const METALS = {
  copper: ["#f3c3a0", "#c27a50", "#7d4426"],
  brass: ["#fbe9b0", "#d2a948", "#86621c"],
  gold: ["#fbe9b0", "#d9b04a", "#8a641a"],
  silver: ["#ffffff", "#c4cad1", "#737b85"],
};
const COINS = [
  { v: 0.25, value: "๒๕", unit: "สตางค์", th: "ยี่สิบห้าสตางค์", nick: "สลึง (sà-lǔeng)", metal: "brass", d: 16,
    old: "a temple stupa", note: "Rarely used outside supermarkets." },
  { v: 0.5, value: "๕๐", unit: "สตางค์", th: "ห้าสิบสตางค์", nick: "สองสลึง (sǎawng sà-lǔeng)", metal: "copper", d: 18,
    old: "the stupa at Wat Phra That Doi Suthep", note: "Rarely used outside supermarkets." },
  { v: 1, value: "๑", unit: "บาท", th: "หนึ่งบาท", metal: "silver", d: 20,
    old: "Wat Phra Kaew (Temple of the Emerald Buddha)", note: "Small, silver and smooth-edged." },
  { v: 2, value: "๒", unit: "บาท", th: "สองบาท", metal: "gold", d: 21.75,
    old: "the Golden Mount at Wat Saket", note: "Coins from before 2009 are silver instead, and look a lot like a 1 baht." },
  { v: 5, value: "๕", unit: "บาท", th: "ห้าบาท", metal: "silver", d: 24,
    old: "Wat Benchamabophit (the Marble Temple)", note: "The big silver one." },
  { v: 10, value: "๑๐", unit: "บาท", th: "สิบบาท", metal: "bimetal", d: 26,
    old: "Wat Arun (Temple of Dawn)", note: "The most useful coin, and the easiest to spot." },
];

let uid = 0;
const nextId = p => `${p}${++uid}`;
const f1 = n => Math.round(n * 100) / 100;

// ---- Banknote line work ----
// A rosette: a circle whose radius ripples k times around, drawn as one path.
function rosette(cx, cy, r, amp, k, phase = 0) {
  let d = "";
  for (let i = 0; i <= 240; i++) {
    const t = (i / 240) * Math.PI * 2;
    const rr = r + amp * Math.sin(k * t + phase);
    d += `${i ? "L" : "M"}${f1(cx + rr * Math.cos(t))} ${f1(cy + rr * Math.sin(t))}`;
  }
  return d + "Z";
}
// Fine wavy lines across an area, like the background print of a note.
function waves(x0, y0, w, h, gap, amp, period, phase = 0) {
  let d = "";
  for (let y = y0; y <= y0 + h; y += gap) {
    for (let x = x0; x <= x0 + w; x += 1.5) {
      const yy = y + amp * Math.sin((x / period) * Math.PI * 2 + y * 0.35 + phase);
      d += `${x === x0 ? "M" : "L"}${f1(x)} ${f1(yy)}`;
    }
  }
  return d;
}
// The Garuda emblem, much simplified: wings raised, on a small roundel.
function garuda(x, y, s, ink) {
  return `<g transform="translate(${x} ${y}) scale(${s})" fill="${ink}">
    <circle cx="10" cy="10" r="9.4" fill="none" stroke="${ink}" stroke-width="0.7"/>
    <path d="M10 3.2c.9.6 1.3 1.7 1 2.9l2.6-1.6c1.3.9 2.7 1 4 .3-.8 1.9-2.3 2.9-4.2 3l1 1.8c-1.3.5-2.7.3-3.6-.8L10 15.8l-.8-7c-.9 1.1-2.3 1.3-3.6.8l1-1.8c-1.9-.1-3.4-1.1-4.2-3 1.3.7 2.7.6 4-.3L9 6.1c-.3-1.2.1-2.3 1-2.9z"/></g>`;
}
function flower(cx, cy, petals, r, id) {
  let d = "";
  for (let i = 0; i < petals; i++) {
    const a = (i / petals) * Math.PI * 2;
    const px = cx + r * 0.62 * Math.cos(a), py = cy + r * 0.62 * Math.sin(a);
    d += `<ellipse cx="${f1(px)}" cy="${f1(py)}" rx="${f1(r * (petals > 8 ? 0.2 : 0.42))}" ry="${f1(r * 0.3)}"
      transform="rotate(${f1((a * 180) / Math.PI + 90)} ${f1(px)} ${f1(py)})"/>`;
  }
  return `<g fill="url(#${id})" stroke="#7a5a10" stroke-width="0.25">${d}<circle cx="${cx}" cy="${cy}" r="${f1(r * 0.45)}"/></g>`;
}

// A banknote drawn to scale: width in mm times `scale` pixels.
function banknoteSvg(n, side = "front", scale = 2) {
  const w = n.w, h = 72, ink = n.ink, big = n.v.toLocaleString("en-US");
  const paperG = nextId("pg"), goldG = nextId("au"), threadG = nextId("th"), clip = nextId("cl");
  const defs = `
    <radialGradient id="${paperG}" cx="50%" cy="45%" r="75%"><stop offset="0" stop-color="#fffdf7"/><stop offset="0.55" stop-color="${n.paper}"/><stop offset="1" stop-color="${n.mid}" stop-opacity="0.55"/></radialGradient>
    <linearGradient id="${goldG}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff2b8"/><stop offset="0.5" stop-color="#d4a72c"/><stop offset="1" stop-color="#8a6a12"/></linearGradient>
    <linearGradient id="${threadG}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8e8e8"/><stop offset="0.5" stop-color="#9aa0a6"/><stop offset="1" stop-color="#e0e0e0"/></linearGradient>
    <clipPath id="${clip}"><rect x="0" y="0" width="${w}" height="${h}" rx="3"/></clipPath>`;
  const text = (x, y, size, s, o = {}) => `<text x="${f1(x)}" y="${f1(y)}" font-size="${size}" fill="${o.fill || ink}"
    ${o.anchor ? `text-anchor="${o.anchor}"` : ""} font-family="${o.font || "Sarabun, sans-serif"}" font-weight="${o.weight || 700}"
    ${o.op ? `fill-opacity="${o.op}"` : ""} ${o.ls ? `letter-spacing="${o.ls}"` : ""}>${s}</text>`;
  const numeral = (x, y, size, anchor) => text(x, y, size, big, { font: "Overpass, Arial, sans-serif", weight: 800, anchor });

  // Paper, background print and border, shared by both sides.
  const ground = `<g clip-path="url(#${clip})">
    <rect width="${w}" height="${h}" fill="url(#${paperG})"/>
    <path d="${waves(0, 2, w, h, 2.2, 0.8, 18)}" fill="none" stroke="${ink}" stroke-opacity="0.13" stroke-width="0.22"/>
    <path d="${waves(0, 3, w, h, 4.4, 1.6, 31, 1.3)}" fill="none" stroke="${n.mid}" stroke-opacity="0.22" stroke-width="0.25"/>
  </g>
  <rect x="2.2" y="2.2" width="${w - 4.4}" height="${h - 4.4}" rx="2" fill="none" stroke="${ink}" stroke-width="0.7"/>
  <rect x="3.4" y="3.4" width="${w - 6.8}" height="${h - 6.8}" rx="1.5" fill="none" stroke="${ink}" stroke-width="0.25" stroke-dasharray="0.8 0.6"/>`;
  const specimen = (x, y) => `<text x="${f1(x)}" y="${f1(y)}" transform="rotate(-20 ${f1(x)} ${f1(y)})" text-anchor="middle"
      font-family="Overpass, Arial, sans-serif" font-weight="800" font-size="8.5" fill="#fff" fill-opacity="0.9"
      stroke="#c8102e" stroke-opacity="0.75" stroke-width="0.35" letter-spacing="1.2">SPECIMEN</text>`;
  const bars = n.bars ? [6, h - 12].map(y => [0, 1, 2, 3, 4].map(i =>
    `<line x1="${f1(7 + i * 1.6)}" y1="${y + 4}" x2="${f1(8.4 + i * 1.6)}" y2="${y}" stroke="${ink}" stroke-width="0.7" stroke-linecap="round"/>`).join("")).join("") : "";

  let body;
  if (side === "front") {
    const px = w * 0.56, pw = w * 0.25;                  // portrait frame
    body = `
    <!-- watermark area: unprinted paper showing the King's image when held to light -->
    <ellipse cx="${f1(w * 0.17)}" cy="34" rx="13" ry="18" fill="#fffdf7" fill-opacity="0.85"/>
    ${text(w * 0.17, 33, 3.2, "watermark", { anchor: "middle", font: "Figtree, sans-serif", weight: 500, op: 0.55 })}
    ${text(w * 0.17, 37.5, 3.2, "(King's image)", { anchor: "middle", font: "Figtree, sans-serif", weight: 500, op: 0.55 })}
    <!-- windowed security thread -->
    <g>${[8, 22, 36, 50].map(y => `<rect x="${f1(w * 0.33)}" y="${y}" width="1.6" height="9" rx="0.5" fill="url(#${threadG})" stroke="${ink}" stroke-opacity="0.3" stroke-width="0.15"/>`).join("")}</g>
    <path d="${rosette(w * 0.45, 36, 13, 1.6, 18)}" fill="none" stroke="${ink}" stroke-opacity="0.35" stroke-width="0.25"/>
    <path d="${rosette(w * 0.45, 36, 10, 1.2, 24, 0.7)}" fill="none" stroke="${n.mid}" stroke-opacity="0.45" stroke-width="0.25"/>
    ${text(w * 0.45, 13, 6.4, "รัฐบาลไทย", { anchor: "middle" })}
    ${text(w * 0.45, 38, 6.8, n.th, { anchor: "middle" })}
    <!-- signatures: Minister of Finance and Governor of the Bank of Thailand -->
    <path d="M${f1(w * 0.35)} 52c2-2 3 1 5-1s2 1 4 0" fill="none" stroke="${ink}" stroke-width="0.35"/>
    <path d="M${f1(w * 0.47)} 52c1.5-1.5 3 1 4.5-.8s2.5.8 4 0" fill="none" stroke="${ink}" stroke-width="0.35"/>
    ${text(w * 0.38, 55.5, 1.45, "รัฐมนตรีว่าการกระทรวงการคลัง", { anchor: "middle", weight: 400 })}
    ${text(w * 0.505, 55.5, 1.45, "ผู้ว่าการธนาคารแห่งประเทศไทย", { anchor: "middle", weight: 400 })}
    <!-- portrait frame -->
    <rect x="${f1(px)}" y="7" width="${f1(pw)}" height="58" rx="${f1(pw / 2.2)}" fill="#fffdf7" fill-opacity="0.55" stroke="${ink}" stroke-width="0.9"/>
    <rect x="${f1(px + 1.6)}" y="8.6" width="${f1(pw - 3.2)}" height="54.8" rx="${f1(pw / 2.4)}" fill="none" stroke="${ink}" stroke-width="0.3" stroke-dasharray="0.5 0.5"/>
    ${text(px + pw / 2, 33, 3.4, "portrait of", { anchor: "middle", font: "Figtree, sans-serif", weight: 500 })}
    ${text(px + pw / 2, 38, 3.4, "King Rama X", { anchor: "middle", font: "Figtree, sans-serif", weight: 600 })}
    ${garuda(w - 21, 6, 0.85, ink)}
    ${n.flower ? flower(w * 0.9, 40, n.flower, 6.5, goldG) + text(w * 0.9, 41.6, n.v >= 1000 ? 2.6 : 3.2, big, { anchor: "middle", font: "Overpass, Arial, sans-serif", weight: 800, fill: "#5a3d00" }) : ""}
    ${numeral(7, 17, 9.5)}
    ${numeral(w - 7, h - 7, 12, "end")}
    ${text(8, h - 8, 3, "0A 0000000", { font: "Overpass, Arial, sans-serif", weight: 700, fill: "#c8102e" })}
    ${bars}
    ${specimen(w * 0.3, 30)}`;
  } else {
    const k1 = w * 0.42, k2 = w * 0.66, kw = w * 0.2;      // the two kings
    const scene = (x) => `<path d="M${f1(x - 9)} 62h18M${f1(x - 7)} 62v-6l7-5 7 5v6M${f1(x - 4)} 51l4-4 4 4M${f1(x)} 47v-4" fill="none" stroke="${ink}" stroke-opacity="0.45" stroke-width="0.5"/>`;
    body = `
    <ellipse cx="${f1(w * 0.14)}" cy="34" rx="12" ry="17" fill="#fffdf7" fill-opacity="0.75"/>
    <path d="${rosette(w * 0.14, 34, 9, 1, 14)}" fill="none" stroke="${ink}" stroke-opacity="0.35" stroke-width="0.25"/>
    ${[k1, k2].map((x, i) => `
      <rect x="${f1(x - kw / 2)}" y="8" width="${f1(kw)}" height="44" rx="${f1(kw / 2.3)}" fill="#fffdf7" fill-opacity="0.5" stroke="${ink}" stroke-width="0.8"/>
      ${text(x, 29, 3.2, n.back[i], { anchor: "middle", font: "Figtree, sans-serif", weight: 600 })}
      ${scene(x)}
      ${n.scenes ? text(x, 66.5, 2.2, n.scenes[i], { anchor: "middle", font: "Figtree, sans-serif", weight: 500 }) : ""}`).join("")}
    ${garuda(w - 21, 6, 0.85, ink)}
    ${numeral(w - 7, h - 8, 12, "end")}
    ${specimen(w * 0.86, 44)}`;
  }
  return `<svg class="banknote" viewBox="0 0 ${w} ${h}" width="${f1(w * scale)}" height="${f1(h * scale)}" role="img"
      aria-label="${big} baht note, ${n.color}, ${side}"><defs>${defs}</defs>${ground}${body}</svg>`;
}

// ---- Coins ----
// A coin drawn to scale, seen from slightly above so its thickness shows.
// side "value" shows the reverse (royal monogram or temple, value in Thai
// digits, year); side "portrait" shows the obverse as a labeled field.
function coinSvg(c, scale = 3, series = "new", side = "value") {
  const r = c.d / 2, edge = Math.max(0.9, c.d * 0.055), s = c.d * scale;
  const g = nextId("cg");
  const metal = c.metal === "bimetal" ? "silver" : c.metal;
  const [hi, mid, lo] = METALS[metal];
  const grad = (id, [a, b, d]) => `<radialGradient id="${id}" cx="34%" cy="28%" r="80%"><stop offset="0" stop-color="${a}"/><stop offset="0.55" stop-color="${b}"/><stop offset="1" stop-color="${d}"/></radialGradient>`;
  const defs = grad(g, [hi, mid, lo]) + grad(g + "i", METALS.gold) +
    `<linearGradient id="${g}e" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${lo}"/><stop offset="0.5" stop-color="${mid}"/><stop offset="1" stop-color="${lo}"/></linearGradient>`;
  const relief = lo, shine = "rgba(255,255,255,0.55)";
  // Raised lettering: a light offset under dark type.
  const emboss = (x, y, size, str, o = {}) =>
    [[0.12, shine], [0, relief]].map(([d, fill]) => `<text x="${f1(x + d)}" y="${f1(y + d)}" text-anchor="middle"
      font-family="${o.font || "Sarabun, sans-serif"}" font-weight="${o.weight || 700}" font-size="${f1(size)}" fill="${fill}">${str}</text>`).join("");
  const cy = r;                                  // face center
  const center = c.metal === "bimetal" ? `<circle cx="${r}" cy="${cy}" r="${f1(r * 0.6)}" fill="url(#${g}i)"/>
      <circle cx="${r}" cy="${cy}" r="${f1(r * 0.6)}" fill="none" stroke="${METALS.gold[2]}" stroke-width="0.2"/>` : "";
  let field;
  if (side === "portrait") {
    field = emboss(r, cy - r * 0.05, r * 0.2, "portrait of the King", { font: "Figtree, sans-serif", weight: 600 }) +
      emboss(r, cy + r * 0.62, r * 0.2, series === "new" ? "Rama X" : "Rama IX", { font: "Figtree, sans-serif", weight: 600 });
  } else {
    const emblem = series === "old"
      // a temple, much simplified: tiered roof and spire
      ? `<path d="M${r} ${f1(cy - r * 0.62)}v${f1(r * 0.14)}M${f1(r - r * 0.12)} ${f1(cy - r * 0.38)}l${f1(r * 0.12)} ${f1(-r * 0.1)} ${f1(r * 0.12)} ${f1(r * 0.1)}M${f1(r - r * 0.3)} ${f1(cy - r * 0.18)}l${f1(r * 0.3)} ${f1(-r * 0.2)} ${f1(r * 0.3)} ${f1(r * 0.2)}M${f1(r - r * 0.22)} ${f1(cy - r * 0.18)}v${f1(r * 0.2)}h${f1(r * 0.44)}v${f1(-r * 0.2)}"
           fill="none" stroke="${relief}" stroke-width="${f1(r * 0.05)}" stroke-linecap="round" stroke-linejoin="round"/>`
      // the place of the royal monogram: a crown over a frame, not the monogram itself
      : `<path d="M${f1(r - r * 0.18)} ${f1(cy - r * 0.42)}l${f1(r * 0.06)} ${f1(-r * 0.14)} ${f1(r * 0.06)} ${f1(r * 0.08)} ${f1(r * 0.06)} ${f1(-r * 0.16)} ${f1(r * 0.06)} ${f1(r * 0.16)} ${f1(r * 0.06)} ${f1(-r * 0.08)} ${f1(r * 0.06)} ${f1(r * 0.14)}z"
           fill="${relief}" fill-opacity="0.8"/>
         <rect x="${f1(r - r * 0.17)}" y="${f1(cy - r * 0.4)}" width="${f1(r * 0.34)}" height="${f1(r * 0.36)}" rx="${f1(r * 0.08)}" fill="none" stroke="${relief}" stroke-width="${f1(r * 0.035)}"/>`;
    field = emblem +
      emboss(r, cy + r * 0.34, r * (c.value.length > 1 ? 0.42 : 0.5), c.value, { weight: 800 }) +
      emboss(r, cy + r * 0.6, r * 0.18, c.unit) +
      emboss(r, cy + r * 0.82, r * 0.12, series === "new" ? "๒๕๖๘" : "๒๕๕๙", { weight: 600 });
  }
  return `<svg class="coin" viewBox="0 0 ${c.d} ${f1(c.d + edge)}" width="${f1(s)}" height="${f1(s + edge * scale)}" role="img"
      aria-label="${c.v < 1 ? c.v * 100 + " satang" : c.v + " baht"} coin, ${side === "value" ? "value side" : "portrait side"}">
    <defs>${defs}</defs>
    <ellipse cx="${r}" cy="${f1(cy + edge)}" rx="${r}" ry="${r}" fill="url(#${g}e)"/>
    <circle cx="${r}" cy="${cy}" r="${r}" fill="url(#${g})"/>
    <circle cx="${r}" cy="${cy}" r="${f1(r - 0.25)}" fill="none" stroke="${shine}" stroke-width="0.3"/>
    <circle cx="${r}" cy="${cy}" r="${f1(r * 0.88)}" fill="none" stroke="${lo}" stroke-opacity="0.6" stroke-width="${f1(r * 0.05)}"/>
    ${center}${field}</svg>`;
}
