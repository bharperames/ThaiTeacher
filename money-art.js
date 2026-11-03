// Thai banknotes and coins, and baht-to-dollar conversion, shared by the
// money primer and the market page.
//
// The drawings are schematic on purpose. The Bank of Thailand requires its
// permission to reproduce banknote images and bars any depiction that could
// offend the monarchy, so portraits are labeled outlines, never likenesses,
// and every note carries a SPECIMEN mark that keeps clear of the portrait.

const USD_PER_BAHT = 0.030;   // the rate this app assumes

function toUsd(baht) { return baht * USD_PER_BAHT; }
function fmtUsd(usd) {
  if (usd < 1) return `${Math.round(usd * 100)}¢`;
  return "$" + usd.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function fmtBaht(baht) { return "฿" + baht.toLocaleString("en-US"); }

// Series 17 (2018–), King Vajiralongkorn on the front. Sizes in mm.
const BANKNOTES = [
  { v: 20, th: "ยี่สิบบาท", ro: "yîi-sìp bàat", color: "green", ink: "#2f7d46", paper: "#d7ead9", w: 138,
    back: ["King Rama I", "King Rama II"], note: "The note you'll handle most. Printed on polymer since 2022; paper ones are still around." },
  { v: 50, th: "ห้าสิบบาท", ro: "hâa-sìp bàat", color: "blue", ink: "#2f5fae", paper: "#d6e2f3", w: 144,
    back: ["King Rama III", "King Rama IV"], note: "Polymer since November 2025, same design as the paper note." },
  { v: 100, th: "หนึ่งร้อยบาท", ro: "nùeng ráawy bàat", color: "red", ink: "#b8352c", paper: "#f3d9d5", w: 150,
    back: ["King Rama V", "King Rama VI"], note: "Polymer since November 2025, same design as the paper note." },
  { v: 500, th: "ห้าร้อยบาท", ro: "hâa ráawy bàat", color: "purple", ink: "#6e46a0", paper: "#e3d9ef", w: 156,
    back: ["King Rama VII", "King Rama VIII"], note: "Fine in shops and restaurants; small stalls may struggle to change it." },
  { v: 1000, th: "หนึ่งพันบาท", ro: "nùeng phan bàat", color: "brown", ink: "#7a5a3c", paper: "#ebe0d3", w: 162,
    back: ["King Rama IX", "King Rama X"], note: "What ATMs hand out. Break it at a convenience store or mall, not a street stall." },
];

// Coin colors as they look in the hand. Sizes in mm.
const METALS = {
  copper: ["#e7a47a", "#a35a33"],
  gold: ["#f6dc8a", "#b88d2c"],
  silver: ["#f1f3f5", "#9aa1aa"],
};
const COINS = [
  { v: 0.25, label: "25", unit: "สต.", th: "ยี่สิบห้าสตางค์", nick: "สลึง (sà-lǔeng)", metal: "copper", d: 16,
    old: "a temple stupa", note: "Rarely used outside supermarkets." },
  { v: 0.5, label: "50", unit: "สต.", th: "ห้าสิบสตางค์", nick: "สองสลึง (sǎawng sà-lǔeng)", metal: "copper", d: 18,
    old: "a temple stupa", note: "Rarely used outside supermarkets." },
  { v: 1, label: "1", unit: "บาท", th: "หนึ่งบาท", metal: "silver", d: 20,
    old: "Wat Phra Kaew (Temple of the Emerald Buddha)", note: "Small and silver. Easy to confuse with an old silver 2 baht." },
  { v: 2, label: "2", unit: "บาท", th: "สองบาท", metal: "gold", d: 21.75,
    old: "the Golden Mount at Wat Saket", note: "Coins from before 2009 are silver instead, and look a lot like a 1 baht." },
  { v: 5, label: "5", unit: "บาท", th: "ห้าบาท", metal: "silver", d: 24,
    old: "Wat Benchamabophit (the Marble Temple)", note: "The big silver one." },
  { v: 10, label: "10", unit: "บาท", th: "สิบบาท", metal: "bimetal", d: 26,
    old: "Wat Arun (Temple of Dawn)", note: "The most useful coin, and the easiest to spot." },
];

// A banknote drawn to scale: width in mm times `scale` pixels.
function banknoteSvg(n, side = "front", scale = 2) {
  const w = n.w, h = 72;
  const id = `n${n.v}${side}${Math.random().toString(36).slice(2, 7)}`;
  const big = n.v.toLocaleString("en-US");
  const pattern = `<pattern id="${id}" width="8" height="8" patternUnits="userSpaceOnUse">
      <path d="M0 4c2-3 6-3 8 0M0 8c2-3 6-3 8 0" fill="none" stroke="${n.ink}" stroke-opacity="0.16" stroke-width="0.6"/></pattern>`;
  const frame = `<rect x="0.5" y="0.5" width="${w - 1}" height="${h - 1}" rx="3" fill="${n.paper}"/>
    <rect x="0.5" y="0.5" width="${w - 1}" height="${h - 1}" rx="3" fill="url(#${id})"/>
    <rect x="3" y="3" width="${w - 6}" height="${h - 6}" rx="2" fill="none" stroke="${n.ink}" stroke-width="0.8"/>`;
  // The portrait sits at the right on the front; SPECIMEN runs across the left.
  const specimen = (x, y) => `<text x="${x}" y="${y}" transform="rotate(-18 ${x} ${y})" text-anchor="middle"
      font-family="Overpass, Arial, sans-serif" font-weight="800" font-size="9" fill="#fff" fill-opacity="0.85"
      stroke="${n.ink}" stroke-opacity="0.5" stroke-width="0.4" letter-spacing="1">SPECIMEN</text>`;
  let body;
  if (side === "front") {
    body = `
    <ellipse cx="${w * 0.2}" cy="36" rx="15" ry="20" fill="#fff" fill-opacity="0.35" stroke="${n.ink}" stroke-opacity="0.35" stroke-dasharray="2 2"/>
    <text x="${w * 0.2}" y="38" text-anchor="middle" font-size="4" fill="${n.ink}" fill-opacity="0.7" font-family="Figtree, sans-serif">watermark</text>
    <text x="${w * 0.47}" y="15" text-anchor="middle" font-size="7" font-weight="700" fill="${n.ink}" font-family="Sarabun, sans-serif">รัฐบาลไทย</text>
    <text x="${w * 0.47}" y="47" text-anchor="middle" font-size="9" font-weight="700" fill="${n.ink}" font-family="Sarabun, sans-serif">${n.th}</text>
    <rect x="${w * 0.66}" y="9" width="${w * 0.27}" height="54" rx="22" fill="#fff" fill-opacity="0.5" stroke="${n.ink}" stroke-width="0.8"/>
    <text x="${w * 0.795}" y="34" text-anchor="middle" font-size="4.2" fill="${n.ink}" font-family="Figtree, sans-serif">portrait of</text>
    <text x="${w * 0.795}" y="40" text-anchor="middle" font-size="4.2" fill="${n.ink}" font-family="Figtree, sans-serif">King Rama X</text>
    <text x="7" y="17" font-size="11" font-weight="800" fill="${n.ink}" font-family="Overpass, Arial, sans-serif">${big}</text>
    <text x="${w * 0.62}" y="66" text-anchor="end" font-size="13" font-weight="800" fill="${n.ink}" font-family="Overpass, Arial, sans-serif">${big}</text>
    ${specimen(w * 0.36, 32)}`;
  } else {
    body = `
    <rect x="${w * 0.08}" y="10" width="${w * 0.24}" height="46" rx="18" fill="#fff" fill-opacity="0.5" stroke="${n.ink}" stroke-width="0.8"/>
    <text x="${w * 0.2}" y="35" text-anchor="middle" font-size="4.2" fill="${n.ink}" font-family="Figtree, sans-serif">${n.back[0]}</text>
    <rect x="${w * 0.36}" y="10" width="${w * 0.24}" height="46" rx="18" fill="#fff" fill-opacity="0.5" stroke="${n.ink}" stroke-width="0.8"/>
    <text x="${w * 0.48}" y="35" text-anchor="middle" font-size="4.2" fill="${n.ink}" font-family="Figtree, sans-serif">${n.back[1]}</text>
    <text x="${w - 8}" y="20" text-anchor="end" font-size="13" font-weight="800" fill="${n.ink}" font-family="Overpass, Arial, sans-serif">${big}</text>
    <text x="${w * 0.76}" y="62" text-anchor="middle" font-size="4.6" fill="${n.ink}" font-family="Figtree, sans-serif">scenes of each reign</text>
    ${specimen(w * 0.78, 42)}`;
  }
  return `<svg class="banknote" viewBox="0 0 ${w} ${h}" width="${w * scale}" height="${h * scale}" role="img"
      aria-label="${big} baht note, ${n.color}, ${side}"><defs>${pattern}</defs>${frame}${body}</svg>`;
}

// A coin drawn to scale, value side up. `series` "new" shows the royal
// monogram's place; "old" a temple outline.
function coinSvg(c, scale = 3, series = "new") {
  const r = c.d / 2, s = c.d * scale;
  const grad = `g${String(c.v).replace(".", "")}${Math.random().toString(36).slice(2, 7)}`;
  const fill = (m, gid) => `<radialGradient id="${gid}" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="${METALS[m][0]}"/><stop offset="1" stop-color="${METALS[m][1]}"/></radialGradient>`;
  let defs, face;
  if (c.metal === "bimetal") {
    defs = fill("silver", grad + "o") + fill("gold", grad + "i");
    face = `<circle cx="${r}" cy="${r}" r="${r - 0.2}" fill="url(#${grad}o)"/><circle cx="${r}" cy="${r}" r="${r * 0.62}" fill="url(#${grad}i)"/>`;
  } else {
    defs = fill(c.metal, grad);
    face = `<circle cx="${r}" cy="${r}" r="${r - 0.2}" fill="url(#${grad})"/>`;
  }
  const ink = "rgba(40, 30, 20, 0.7)";
  const emblem = series === "old"
    ? `<path d="M${r} ${r * 0.42}l${r * 0.08} ${r * 0.2}h${-r * 0.16}z M${r - r * 0.32} ${r * 0.86}l${r * 0.32} ${-r * 0.24} ${r * 0.32} ${r * 0.24}z M${r - r * 0.24} ${r * 0.86}v${r * 0.22}h${r * 0.48}v${-r * 0.22}" fill="none" stroke="${ink}" stroke-width="${r * 0.05}"/>`
    : `<circle cx="${r}" cy="${r * 0.78}" r="${r * 0.26}" fill="none" stroke="${ink}" stroke-width="${r * 0.04}" stroke-dasharray="${r * 0.08} ${r * 0.06}"/>`;
  return `<svg class="coin" viewBox="0 0 ${c.d} ${c.d}" width="${s}" height="${s}" role="img" aria-label="${c.label} ${c.unit} coin">
    <defs>${defs}</defs>${face}
    <circle cx="${r}" cy="${r}" r="${r - 0.9}" fill="none" stroke="${ink}" stroke-width="0.25" stroke-dasharray="0.6 0.5"/>
    ${emblem}
    <text x="${r}" y="${r * 1.42}" text-anchor="middle" font-family="Overpass, Arial, sans-serif" font-weight="800"
      font-size="${r * 0.52}" fill="${ink}">${c.label}</text>
    <text x="${r}" y="${r * 1.72}" text-anchor="middle" font-family="Sarabun, sans-serif" font-weight="700"
      font-size="${r * 0.26}" fill="${ink}">${c.unit}</text></svg>`;
}
