// Thai characters shared by the pages.

// name: the letter's name (the sound plus a word that starts with it).
// sound: as a first consonant. cls: consonant class. obs: obsolete, no longer used.
const LETTERS = {
  "ก": { name: "gaw gài", word: "chicken", sound: "g", cls: "mid" },
  "ข": { name: "khǎw khài", word: "egg", sound: "kh", cls: "high" },
  "ฃ": { name: "khǎw khùuat", word: "bottle", sound: "kh", cls: "high", obs: true },
  "ค": { name: "khaw khwaai", word: "buffalo", sound: "kh", cls: "low" },
  "ฅ": { name: "khaw khon", word: "person", sound: "kh", cls: "low", obs: true },
  "ฆ": { name: "khaw rá-khang", word: "bell", sound: "kh", cls: "low" },
  "ง": { name: "ngaw nguu", word: "snake", sound: "ng", cls: "low" },
  "จ": { name: "jaw jaan", word: "plate", sound: "j", cls: "mid" },
  "ฉ": { name: "chǎw chìng", word: "cymbals", sound: "ch", cls: "high" },
  "ช": { name: "chaw cháang", word: "elephant", sound: "ch", cls: "low" },
  "ซ": { name: "saw sôh", word: "chain", sound: "s", cls: "low" },
  "ฌ": { name: "chaw chooe", word: "tree", sound: "ch", cls: "low" },
  "ญ": { name: "yaw yǐng", word: "woman", sound: "y", cls: "low" },
  "ฎ": { name: "daw chá-daa", word: "headdress", sound: "d", cls: "mid" },
  "ฏ": { name: "dtaw bpà-dtàk", word: "goad", sound: "dt", cls: "mid" },
  "ฐ": { name: "thǎw thǎan", word: "pedestal", sound: "th", cls: "high" },
  "ฑ": { name: "thaw mon-thoh", word: "Montho (a character)", sound: "th", cls: "low" },
  "ฒ": { name: "thaw phûu-thâo", word: "elder", sound: "th", cls: "low" },
  "ณ": { name: "naw neen", word: "novice monk", sound: "n", cls: "low" },
  "ด": { name: "daw dèk", word: "child", sound: "d", cls: "mid" },
  "ต": { name: "dtaw dtào", word: "turtle", sound: "dt", cls: "mid" },
  "ถ": { name: "thǎw thǔng", word: "sack", sound: "th", cls: "high" },
  "ท": { name: "thaw thá-hǎan", word: "soldier", sound: "th", cls: "low" },
  "ธ": { name: "thaw thong", word: "flag", sound: "th", cls: "low" },
  "น": { name: "naw nǔu", word: "mouse", sound: "n", cls: "low" },
  "บ": { name: "baw bai-mái", word: "leaf", sound: "b", cls: "mid" },
  "ป": { name: "bpaw bplaa", word: "fish", sound: "bp", cls: "mid" },
  "ผ": { name: "phǎw phûeng", word: "bee", sound: "ph", cls: "high" },
  "ฝ": { name: "fǎw fǎa", word: "lid", sound: "f", cls: "high" },
  "พ": { name: "phaw phaan", word: "tray", sound: "ph", cls: "low" },
  "ฟ": { name: "faw fan", word: "teeth", sound: "f", cls: "low" },
  "ภ": { name: "phaw sǎm-phao", word: "junk ship", sound: "ph", cls: "low" },
  "ม": { name: "maw máa", word: "horse", sound: "m", cls: "low" },
  "ย": { name: "yaw yák", word: "giant", sound: "y", cls: "low" },
  "ร": { name: "raw ruea", word: "boat", sound: "r", cls: "low" },
  "ล": { name: "law ling", word: "monkey", sound: "l", cls: "low" },
  "ว": { name: "waw wǎaen", word: "ring", sound: "w", cls: "low" },
  "ศ": { name: "sǎw sǎa-laa", word: "pavilion", sound: "s", cls: "high" },
  "ษ": { name: "sǎw rue-sǐi", word: "hermit", sound: "s", cls: "high" },
  "ส": { name: "sǎw sǔea", word: "tiger", sound: "s", cls: "high" },
  "ห": { name: "hǎw hìip", word: "chest (box)", sound: "h", cls: "high" },
  "ฬ": { name: "law jù-laa", word: "kite", sound: "l", cls: "low" },
  "อ": { name: "aw àang", word: "basin", sound: "silent (carries vowels)", cls: "mid" },
  "ฮ": { name: "haw nók-hûuk", word: "owl", sound: "h", cls: "low" },
};

// Vowel signs, tone marks and other marks. pos: where it sits relative to the
// consonant it belongs to, which is not always where it is read.
const MARKS = {
  "ะ": { name: "sà-rà a", sound: "short a", pos: "after" },
  "ั": { name: "mái hǎn-aa-gàat", sound: "short a, in the middle of a syllable", pos: "above" },
  "า": { name: "sà-rà aa", sound: "long aa", pos: "after" },
  "ำ": { name: "sà-rà am", sound: "am", pos: "after" },
  "ิ": { name: "sà-rà i", sound: "short i", pos: "above" },
  "ี": { name: "sà-rà ii", sound: "long ii", pos: "above" },
  "ึ": { name: "sà-rà ue", sound: "short ue", pos: "above" },
  "ื": { name: "sà-rà uue", sound: "long uue", pos: "above" },
  "ุ": { name: "sà-rà u", sound: "short u", pos: "below" },
  "ู": { name: "sà-rà uu", sound: "long uu", pos: "below" },
  "เ": { name: "sà-rà e", sound: "e (also part of longer vowels)", pos: "before" },
  "แ": { name: "sà-rà ae", sound: "ae", pos: "before" },
  "โ": { name: "sà-rà o", sound: "o", pos: "before" },
  "ใ": { name: "sà-rà ai mái múan", sound: "ai", pos: "before" },
  "ไ": { name: "sà-rà ai mái maa-lai", sound: "ai", pos: "before" },
  "็": { name: "mái dtài-khúu", sound: "makes the vowel short", pos: "above" },
  "่": { name: "mái èek", sound: "tone mark 1", pos: "above", tone: true },
  "้": { name: "mái thoo", sound: "tone mark 2", pos: "above", tone: true },
  "๊": { name: "mái dtrii", sound: "tone mark 3", pos: "above", tone: true },
  "๋": { name: "mái jàt-dtà-waa", sound: "tone mark 4", pos: "above", tone: true },
  "์": { name: "thanthakhat", sound: "the letter under it is silent", pos: "above" },
  "ๆ": { name: "mái yá-mók", sound: "say the word before it twice", pos: "after" },
  "ฤ": { name: "rue", sound: "rue or ri", pos: "letter" },
};

// Thai digits. Shops, buses and old signs use them alongside 0-9.
const DIGITS = {
  "๐": { n: 0, name: "sǔun" }, "๑": { n: 1, name: "nùeng" }, "๒": { n: 2, name: "sǎawng" },
  "๓": { n: 3, name: "sǎam" }, "๔": { n: 4, name: "sìi" }, "๕": { n: 5, name: "hâa" },
  "๖": { n: 6, name: "hòk" }, "๗": { n: 7, name: "jèt" }, "๘": { n: 8, name: "bpàet" },
  "๙": { n: 9, name: "gâo" },
};

// Combining marks render on a dotted circle when shown alone.
function showChar(ch) { return /[\u0E31\u0E34-\u0E3A\u0E47-\u0E4E]/.test(ch) ? "\u25CC" + ch : ch; }
