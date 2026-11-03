// Thai banknotes and coins, and baht-to-dollar conversion, shared by the
// money primer and the market page.
//
// The drawings are representative, not realistic: the right color, size,
// numerals and Thai value, and nothing that imitates a real note's design or
// security features. Thai banknote designs are copyright, the Bank of
// Thailand requires its permission for any reproduction, and depictions that
// could offend the monarchy are barred. So portraits and the royal monogram
// are labeled frames, never likenesses, and every note is marked SPECIMEN.

const USD_PER_BAHT = 0.030;   // the rate this app assumes

function toUsd(baht) { return baht * USD_PER_BAHT; }
function fmtUsd(usd) {
  if (usd < 1) return `${Math.max(1, Math.round(usd * 100))}¢`;
  return "$" + usd.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function fmtBaht(baht) { return "฿" + baht.toLocaleString("en-US"); }
const toThaiDigits = s => String(s).replace(/\d/g, d => "๐๑๒๓๔๕๖๗๘๙"[d]);

// Series 17 (2018–), King Vajiralongkorn on the front. Sizes in mm.
const BANKNOTES = [
  { v: 20, th: "ยี่สิบบาท", ro: "yîi-sìp bàat", color: "green", ink: "#1f6b3a", mid: "#5f9e6e", paper: "#dcebd9", w: 138,
    back: ["King Rama I", "King Rama II"], scenes: ["Grand Palace and Wat Phra Kaew", "Mural from his poem Inao"],
    note: "The note you'll handle most. Polymer since 2022, with two clear windows; paper ones are still around." },
  { v: 50, th: "ห้าสิบบาท", ro: "hâa-sìp bàat", color: "blue", ink: "#1f4f9a", mid: "#5f86c4", paper: "#dbe4f2", w: 144,
    back: ["King Rama III", "King Rama IV"], note: "Polymer since November 2025, same design as the paper note." },
  { v: 100, th: "หนึ่งร้อยบาท", ro: "nùeng ráawy bàat", color: "red", ink: "#a52a22", mid: "#d06a5e", paper: "#f4dcd6", w: 150,
    back: ["King Rama V", "King Rama VI"], note: "Polymer since November 2025, same design as the paper note." },
  { v: 500, th: "ห้าร้อยบาท", ro: "hâa ráawy bàat", color: "purple", ink: "#5d3a8f", mid: "#9474c0", paper: "#e5dcf0", w: 156,
    back: ["King Rama VII", "King Rama VIII"], note: "Fine in shops and restaurants; small stalls may struggle to change it." },
  { v: 1000, th: "หนึ่งพันบาท", ro: "nùeng phan bàat", color: "brown", ink: "#6b4a2e", mid: "#a5835f", paper: "#ede2d4", w: 162,
    back: ["King Rama IX", "King Rama X"], note: "What ATMs hand out. Break it at a convenience store or mall, not a street stall." },
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

// A banknote drawn to scale: width in mm times `scale` pixels. Representative
// only: color, size, numerals, the value in Thai and where the portrait goes.
function banknoteSvg(n, side = "front", scale = 2) {
  const w = n.w, h = 72, ink = n.ink, big = n.v.toLocaleString("en-US");
  const paperG = nextId("pg");
  const defs = `<linearGradient id="${paperG}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${n.paper}"/><stop offset="1" stop-color="${n.mid}" stop-opacity="0.6"/></linearGradient>`;
  const text = (x, y, size, str, o = {}) => `<text x="${f1(x)}" y="${f1(y)}" font-size="${size}" fill="${o.fill || ink}"
    ${o.anchor ? `text-anchor="${o.anchor}"` : ""} font-family="${o.font || "Sarabun, sans-serif"}" font-weight="${o.weight || 700}">${str}</text>`;
  const numeral = (x, y, size, anchor) => text(x, y, size, big, { font: "Overpass, Arial, sans-serif", weight: 800, anchor });
  const frame = (x, y, fw, fh, lines) => `<rect x="${f1(x)}" y="${y}" width="${f1(fw)}" height="${fh}" rx="${f1(fw / 2.3)}"
      fill="#fff" fill-opacity="0.55" stroke="${ink}" stroke-width="0.8"/>` +
    lines.map((l, i) => text(x + fw / 2, y + fh / 2 + (i - (lines.length - 1) / 2) * 5, 3.4, l, { anchor: "middle", font: "Figtree, sans-serif", weight: i ? 600 : 500 })).join("");
  const specimen = (x, y) => `<text x="${f1(x)}" y="${f1(y)}" transform="rotate(-20 ${f1(x)} ${f1(y)})" text-anchor="middle"
      font-family="Overpass, Arial, sans-serif" font-weight="800" font-size="8.5" fill="#fff" fill-opacity="0.9"
      stroke="#c8102e" stroke-opacity="0.75" stroke-width="0.35" letter-spacing="1.2">SPECIMEN</text>`;
  const ground = `<rect x="0.5" y="0.5" width="${w - 1}" height="${h - 1}" rx="3" fill="url(#${paperG})"/>
    <rect x="3" y="3" width="${w - 6}" height="${h - 6}" rx="2" fill="none" stroke="${ink}" stroke-width="0.7"/>`;
  const body = side === "front" ? `
    ${frame(w * 0.6, 9, w * 0.27, 54, ["portrait of", "King Rama X"])}
    ${numeral(8, 19, 11)}
    ${text(w * 0.32, 40, 7.5, n.th, { anchor: "middle" })}
    ${numeral(w * 0.52, h - 9, 13, "end")}
    ${specimen(w * 0.3, 54)}` : `
    ${frame(w * 0.3, 9, w * 0.22, 46, [n.back[0]])}
    ${frame(w * 0.56, 9, w * 0.22, 46, [n.back[1]])}
    ${numeral(8, 19, 11)}
    ${numeral(w - 8, h - 9, 13, "end")}
    ${specimen(w * 0.2, 52)}`;
  return `<svg class="banknote" viewBox="0 0 ${w} ${h}" width="${f1(w * scale)}" height="${f1(h * scale)}" role="img"
      aria-label="${big} baht note, ${n.color}, ${side}"><defs>${defs}</defs>${ground}${body}</svg>`;
}

// ---- Coins ----
// A coin drawn to scale, seen from slightly above so its thickness shows.
// side "value" shows the reverse (a royal crown or a temple outline and the
// value in Thai digits); side "portrait" shows the obverse as a labeled field.
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
      emboss(r, cy + r * 0.62, r * 0.2, c.unit);
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
