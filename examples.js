// An example sentence for each card, keyed by the card's Thai text.
// Shared by the phrase decks and the signs deck: [thai, pronunciation, english].
//
// Thai and pronunciation are split into words with "|", word for word. A
// trailing space on a Thai word is a pause, kept when the sentence is spoken.
// In the English, {2 word} links "word" to Thai word 2 (counting from 0) and
// {1,3 words} to several; text outside braces has no Thai counterpart.
const EXAMPLES = {
  // Essentials
  "สวัสดี": ["สวัสดี |ยินดี|ที่ได้|รู้จัก", "sà-wàt-dii|yin-dii|thîi dâi|rúu-jàk", "{0 Hello}, {1 nice} {2 to} {3 meet} you."],
  "ขอบคุณ": ["ขอบคุณ|มาก", "khàawp-khun|mâak", "{0 Thank you} {1 very much}."],
  "ใช่": ["ใช่ |ถูกต้อง", "châi|thùuk-dtâwng", "{0 Yes}, that's {1 right}."],
  "ไม่ใช่": ["ไม่ใช่|อัน|นั้น", "mâi châi|an|nán", "{0 No}, {0 not} {2 that} {1 one}."],
  "ขอโทษ": ["ขอโทษ |มา|สาย", "khǎw-thôht|maa|sǎai", "{0 Sorry} I'm {2 late}."],
  "ไม่เป็นไร": ["ไม่เป็นไร |ไม่ต้อง|ห่วง", "mâi pen rai|mâi dtâwng|hùang", "{0 No problem}, {1 don't} {2 worry}."],
  "สบายดีไหม": ["สวัสดี |สบายดี|ไหม", "sà-wàt-dii|sà-baai dii|mǎi", "{0 Hi}, {1,2 how are you}?"],
  "สบายดี": ["สบายดี |ขอบคุณ", "sà-baai dii|khàawp-khun", "{0 I'm fine}, {1 thanks}."],
  "คุณชื่ออะไร": ["สวัสดี |คุณ|ชื่อ|อะไร", "sà-wàt-dii|khun|chûue|à-rai", "{0 Hi}, {3 what's} {1 your} {2 name}?"],
  "ราคาเท่าไหร่": ["เสื้อ|ตัว|นี้|ราคา|เท่าไหร่", "sûea|dtua|níi|raa-khaa|thâo-rài", "{3,4 How much} is {2 this} {0 shirt}?"],
  "ห้องน้ำอยู่ที่ไหน": ["ขอโทษ|นะ |ห้องน้ำ|อยู่|ที่ไหน", "khǎw-thôht|ná|hâwng-náam|yùu|thîi-nǎi", "{0 Excuse me}, {4 where} {3 is} the {2 bathroom}?"],
  "ไม่เข้าใจ": ["ขอโทษ |ไม่|เข้าใจ", "khǎw-thôht|mâi|khâo-jai", "{0 Sorry}, I {1 don't} {2 understand}."],
  "พูดภาษาอังกฤษได้ไหม": ["ขอโทษ |พูด|ภาษาอังกฤษ|ได้|ไหม", "khǎw-thôht|phûut|phaa-sǎa ang-grìt|dâi|mǎi", "{0 Excuse me}, {3 can} you {1 speak} {2 English}?"],
  "พูดช้าๆ หน่อย": ["ไม่|เข้าใจ |พูด|ช้าๆ|หน่อย", "mâi|khâo-jai|phûut|cháa-cháa|nàwy", "I {0 don't} {1 understand}. {4 Please} {2 speak} {3 slowly}."],
  "อร่อย": ["อาหาร|ร้าน|นี้|อร่อย|มาก", "aa-hǎan|ráan|níi|à-ròi|mâak", "The {0 food} {1,2 here} is {4 really} {3 delicious}."],
  "ไม่เผ็ด": ["ขอ|ผัดไทย|ไม่|เผ็ด", "khǎw|phàt thai|mâi|phèt", "{1 Pad thai}, {2 not} {3 spicy}, {0 please}."],
  "เก็บเงินด้วย": ["อิ่ม|แล้ว |เก็บเงิน|ด้วย", "ìm|láew|gèp ngern|dûay", "I'm {0 full}. {2 The bill}, {3 please}."],
  "แพงไป": ["ห้า|ร้อย|บาท |แพง|ไป", "hâa|ráawy|bàat|phaeng|bpai", "{0 Five} {1 hundred} {2 baht}? {4 Too} {3 expensive}."],
  "ไม่เอา ขอบคุณ": ["ไม่|เอา |ขอบคุณ |ดู|ก่อน", "mâi|ao|khàawp-khun|duu|gàwn", "{0,1 No} {2 thanks}, I'm just {3 looking}."],
  "ช่วยด้วย": ["ช่วยด้วย |มี|คน|ล้ม", "chûay dûay|mii|khon|lóm", "{0 Help}! {1,2 Someone} {3 fell down}."],

  // Bangkok 100: street food
  "ข้าว": ["ขอ|ข้าว|เพิ่ม|อีก|จาน", "khǎw|khâao|phêrm|ìik|jaan", "{2,3 Another} {4 plate} of {1 rice}, {0 please}."],
  "ข้าวเหนียว": ["ขอ|ข้าวเหนียว|หนึ่ง|ห่อ", "khǎw|khâao nǐao|nùeng|hàw", "{2 One} {3 packet} of {1 sticky rice}, {0 please}."],
  "ก๋วยเตี๋ยว": ["ขอ|ก๋วยเตี๋ยว|หมู|หนึ่ง|ชาม", "khǎw|gǔay-dtǐao|mǔu|nùeng|chaam", "{3 One} {4 bowl} of {2 pork} {1 noodle soup}, {0 please}."],
  "ผัดไทย": ["ผัดไทย|ใส่|กุ้ง|หนึ่ง|จาน", "phàt thai|sài|gûng|nùeng|jaan", "{3 One} {0 pad thai} {1 with} {2 shrimp}."],
  "ส้มตำ": ["ส้มตำ|เผ็ด|นิดหน่อย", "sôm-dtam|phèt|nít-nàwy", "{0 Papaya salad}, {2 a little} {1 spicy}."],
  "ไก่ย่าง": ["ไก่ย่าง|กับ|ข้าวเหนียว", "gài yâang|gàp|khâao nǐao", "{0 Grilled chicken} {1 with} {2 sticky rice}."],
  "หมูปิ้ง": ["หมูปิ้ง|ไม้|ละ|สิบ|บาท", "mǔu bpîng|mái|lá|sìp|bàat", "{0 Pork skewers} are {3 ten} {4 baht} {2 a} {1 stick}."],
  "ข้าวมันไก่": ["ร้าน|ข้าวมันไก่|อยู่|ตรงนั้น", "ráan|khâao man gài|yùu|dtrong-nán", "The {1 chicken rice} {0 shop} {2 is} {3 over there}."],
  "ต้มยำกุ้ง": ["ต้มยำกุ้ง|เผ็ด|มาก", "dtôm-yam gûng|phèt|mâak", "{0 Tom yum shrimp} is {2 very} {1 spicy}."],
  "แกงเขียวหวาน": ["แกงเขียวหวาน|ไก่|หนึ่ง|ที่", "gaeng khǐao-wǎan|gài|nùeng|thîi", "{2 One} {0 green curry} with {1 chicken}."],
  "ข้าวผัด": ["ข้าวผัด|กุ้ง|หนึ่ง|จาน", "khâao phàt|gûng|nùeng|jaan", "{2 One} {3 plate} of {1 shrimp} {0 fried rice}."],
  "ผัดกะเพรา": ["ผัดกะเพรา|หมู|ใส่|ไข่ดาว", "phàt gà-phrao|mǔu|sài|khài daao", "{1 Pork} {0 holy basil} {2 with} a {3 fried egg}."],
  "ไข่ดาว": ["เพิ่ม|ไข่ดาว|หนึ่ง|ฟอง", "phêrm|khài daao|nùeng|fawng", "{0 Add} {2 one} {1 fried egg}."],
  "ข้าวเหนียวมะม่วง": ["ข้าวเหนียวมะม่วง|อร่อย|มาก", "khâao nǐao má-mûang|à-ròi|mâak", "{0 Mango sticky rice} is {2 really} {1 delicious}."],
  "ไก่": ["ขอ|เป็น|ไก่", "khǎw|bpen|gài", "{1 Make it} {2 chicken}, {0 please}."],
  "หมู": ["ใส่|หมู|หรือ|ไก่", "sài|mǔu|rǔue|gài", "{1 Pork} {2 or} {3 chicken}? (a vendor asking)"],
  "เนื้อ": ["ก๋วยเตี๋ยว|เนื้อ|หนึ่ง|ชาม", "gǔay-dtǐao|núea|nùeng|chaam", "{2 One} {3 bowl} of {1 beef} {0 noodle soup}."],
  "กุ้ง": ["ไม่|กิน|กุ้ง", "mâi|gin|gûng", "I {0 don't} {1 eat} {2 shrimp}."],
  "ปลา": ["ปลา|ตัว|นี้|สด|ไหม", "bplaa|dtua|níi|sòt|mǎi", "{4 Is} {2 this} {0 fish} {3 fresh}?"],
  "ผัก": ["ขอ|ผัก|เยอะๆ", "khǎw|phàk|yúh-yúh", "{2 Lots of} {1 vegetables}, {0 please}."],
  "เผ็ด": ["อัน|นี้|เผ็ด|ไหม", "an|níi|phèt|mǎi", "{3 Is} {1 this} {0 one} {2 spicy}?"],
  "เผ็ดนิดหน่อย": ["ขอ|เผ็ด|นิดหน่อย|นะ", "khǎw|phèt|nít-nàwy|ná", "Just {2 a little} {1 spicy}, {0 please}."],
  "ไม่ใส่ผงชูรส": ["ผัดไทย|ไม่|ใส่|ผงชูรส", "phàt thai|mâi|sài|phǒng-chuu-rót", "{0 Pad thai} {2 with} {1 no} {3 MSG}."],
  "ไม่ใส่ผักชี": ["ก๋วยเตี๋ยว|ไม่|ใส่|ผักชี", "gǔay-dtǐao|mâi|sài|phàk-chii", "{0 Noodle soup}, {1,2 no} {3 cilantro}."],
  "เอากลับบ้าน": ["ข้าวผัด|หนึ่ง|จาน |เอา|กลับบ้าน", "khâao phàt|nùeng|jaan|ao|glàp bâan", "{1 One} {0 fried rice}, {3,4 to take away}."],
  "ทานที่นี่": ["ทาน|ที่นี่|หรือ|เอา|กลับบ้าน", "thaan|thîi-nîi|rǔue|ao|glàp bâan", "{0 Eat} {1 here} {2 or} {3,4 take away}? (a vendor asking)"],
  "ขออันนี้": ["ขอ|อัน|นี้|สอง|อัน", "khǎw|an|níi|sǎawng|an", "{3 Two} of {1,2 these}, {0 please}."],
  "ขอเมนูหน่อย": ["ขอ|เมนู|ภาษาอังกฤษ|หน่อย", "khǎw|mee-nuu|phaa-sǎa ang-grìt|nàwy", "An {2 English} {1 menu}, {0,3 please}."],
  "ไม่กินเนื้อสัตว์": ["ไม่|กิน|เนื้อสัตว์ |มี|ผัดผัก|ไหม", "mâi|gin|núea sàt|mii|phàt phàk|mǎi", "I {0 don't} {1 eat} {2 meat}. {5 Do} you {3 have} {4 stir-fried vegetables}?"],
  "แพ้ถั่ว": ["แพ้|ถั่ว |ไม่|ใส่|ถั่ว|นะ", "pháe|thùa|mâi|sài|thùa|ná", "I'm {0 allergic} to {1 peanuts}. {2,3 No} {4 peanuts}, please."],

  // Bangkok 100: drinks
  "น้ำเปล่า": ["ขอ|น้ำเปล่า|หนึ่ง|ขวด", "khǎw|náam bplào|nùeng|khùat", "{2 One} {3 bottle} of {1 water}, {0 please}."],
  "น้ำแข็ง": ["ขอ|น้ำแข็ง|แก้ว|หนึ่ง", "khǎw|náam khǎeng|gâew|nùeng", "{3 A} {2 glass} of {1 ice}, {0 please}."],
  "ไม่ใส่น้ำแข็ง": ["น้ำส้ม|ไม่|ใส่|น้ำแข็ง", "náam sôm|mâi|sài|náam khǎeng", "{0 Orange juice}, {1,2 no} {3 ice}."],
  "กาแฟ": ["ขอ|กาแฟ|เย็น|หนึ่ง|แก้ว", "khǎw|gaa-fae|yen|nùeng|gâew", "{3 One} {2 iced} {1 coffee}, {0 please}."],
  "ชาเย็น": ["ชาเย็น|หวาน|น้อย", "chaa yen|wǎan|náwy", "{0 Thai iced tea}, {2 less} {1 sweet}."],
  "เบียร์": ["ขอ|เบียร์|เย็นๆ |หนึ่ง|ขวด", "khǎw|bia|yen-yen|nùeng|khùat", "{3 One} {2 cold} {1 beer}, {0 please}."],
  "น้ำมะพร้าว": ["น้ำมะพร้าว|ลูก|ละ|เท่าไหร่", "náam má-phráao|lûuk|lá|thâo-rài", "{3 How much} {2 per} {0,1 coconut}?"],
  "หวานน้อย": ["กาแฟ|เย็น|หวาน|น้อย", "gaa-fae|yen|wǎan|náwy", "{1 Iced} {0 coffee}, {3 less} {2 sweet}."],
  "ไม่หวาน": ["ชาเขียว|ไม่|หวาน", "chaa khǐao|mâi|wǎan", "{0 Green tea}, {1,2 unsweetened}."],
  "น้ำส้ม": ["น้ำส้ม|คั้น|สด", "náam sôm|khán|sòt", "{2 Freshly} {1 squeezed} {0 orange juice}."],

  // Bangkok 100: shopping
  "ตลาด": ["ตลาด|เปิด|กี่โมง", "dtà-làat|bpèrt|gìi moong", "{2 What time} does the {0 market} {1 open}?"],
  "ห้าง": ["ห้าง|ปิด|สี่ทุ่ม", "hâang|bpìt|sìi thûm", "The {0 mall} {1 closes} at {2 10 p.m.}"],
  "ร้านสะดวกซื้อ": ["แถว|นี้|มี|ร้านสะดวกซื้อ|ไหม", "thǎew|níi|mii|ráan sà-dùak súe|mǎi", "{4 Is} {2 there} a {3 convenience store} {0,1 around here}?"],
  "เสื้อ": ["เสื้อ|ตัว|นี้|มี|สี|อื่น|ไหม", "sûea|dtua|níi|mii|sǐi|ùuen|mǎi", "{6 Does} {2 this} {0 shirt} {3 come in} {5 other} {4 colors}?"],
  "กางเกง": ["กางเกง|ตัว|นี้|ยาว|ไป", "gaang-geng|dtua|níi|yaao|bpai", "{2 These} {0 pants} are {4 too} {3 long}."],
  "รองเท้า": ["รองเท้า|คู่|นี้|ใส่|สบาย", "rawng-tháao|khûu|níi|sài|sà-baai", "{2 These} {0 shoes} are {3,4 comfortable}."],
  "กระเป๋า": ["กระเป๋า|ใบ|นี้|ราคา|เท่าไหร่", "grà-bpǎo|bai|níi|raa-khaa|thâo-rài", "{3,4 How much} is {2 this} {0 bag}?"],
  "ใหญ่": ["อัน|นี้|ใหญ่|ไป", "an|níi|yài|bpai", "{1 This} {0 one} is {3 too} {2 big}."],
  "เล็ก": ["มี|อัน|เล็ก|กว่า|นี้|ไหม", "mii|an|lék|gwàa|níi|mǎi", "{5 Do} you {0 have} a {2,3 smaller} {1 one}?"],
  "สี": ["ชอบ|สี|นี้", "châawp|sǐi|níi", "I {0 like} {2 this} {1 color}."],
  "ลองได้ไหม": ["ตัว|นี้|ลอง|ได้|ไหม", "dtua|níi|lawng|dâi|mǎi", "{3 Can} I {2 try} {1 this} {0 one} on?"],
  "มีไซส์ใหญ่กว่านี้ไหม": ["ตัว|นี้|เล็ก|ไป |มี|ไซส์|ใหญ่|กว่า|นี้|ไหม", "dtua|níi|lék|bpai|mii|sai|yài|gwàa|níi|mǎi", "{1 This} {0 one}'s {3 too} {2 small}. {9 Do} you {4 have} a {6,7 bigger} {5 size}?"],
  "ถูก": ["ที่นี่|ถูก|กว่า|ใน|ห้าง", "thîi-nîi|thùuk|gwàa|nai|hâang", "It's {1,2 cheaper} {0 here} than {3 in} the {4 mall}."],
  "แพง": ["แพง|จัง", "phaeng|jang", "{1 So} {0 expensive}!"],
  "ดูก่อน": ["ขอ|ดู|ก่อน|นะ", "khǎw|duu|gàwn|ná", "I'll just {1 have a look} {2 first}."],

  // Bangkok 100: getting around
  "แท็กซี่": ["เรียก|แท็กซี่|ให้|หน่อย", "rîak|tháek-sîi|hâi|nàwy", "Could you {0 call} {2 me} a {1 taxi}?"],
  "ตุ๊กตุ๊ก": ["นั่ง|ตุ๊กตุ๊ก|ไป|วัดโพธิ์", "nâng|túk-túk|bpai|wát phoh", "{0 Take} a {1 tuk-tuk} {2 to} {3 Wat Pho}."],
  "มอเตอร์ไซค์รับจ้าง": ["นั่ง|มอเตอร์ไซค์รับจ้าง|ไป|ปากซอย", "nâng|maw-dter-sai ráp-jâang|bpai|bpàak sawy", "{0 Take} a {1 motorbike taxi} {2 to} {3 the end of the soi}."],
  "รถเมล์": ["รถเมล์|สาย|นี้|ไป|สยาม|ไหม", "rót mee|sǎai|níi|bpai|sà-yǎam|mǎi", "{5 Does} {2 this} {0 bus} {3 go to} {4 Siam}?"],
  "เรือ": ["นั่ง|เรือ|ไป|ท่าช้าง", "nâng|ruea|bpai|thâa cháang", "{0 Take} the {1 boat} {2 to} {3 Tha Chang pier}."],
  "สนามบิน": ["ไป|สนามบิน|สุวรรณภูมิ", "bpai|sà-nǎam bin|sù-wan-ná-phuum", "{0 To} {2 Suvarnabhumi} {1 Airport}, please."],
  "ไปที่นี่": ["ไป|ที่นี่|ได้|ไหม", "bpai|thîi-nîi|dâi|mǎi", "{2 Can} you {0 take me} {1 here}?"],
  "เปิดมิเตอร์ด้วย": ["ไป|สุขุมวิท |เปิด|มิเตอร์|ด้วย", "bpai|sù-khǔm-wít|bpèrt|mí-dtêr|dûay", "{0 To} {1 Sukhumvit}. {4 Please} {2 use} the {3 meter}."],
  "จอดตรงนี้": ["จอด|ตรงนี้|เลย", "jàwt|dtrong-níi|loei", "{0 Stop} {2 right} {1 here}."],
  "เลี้ยวซ้าย": ["ถึง|ไฟแดง|แล้ว|เลี้ยว|ซ้าย", "thǔeng|fai daeng|láew|líao|sáai", "{3 Turn} {4 left} {0 at} the {1 traffic light}."],
  "เลี้ยวขวา": ["เลี้ยว|ขวา|ที่|ซอย|หน้า", "líao|khwǎa|thîi|sawy|nâa", "{0 Turn} {1 right} {2 at} the {4 next} {3 soi}."],
  "ตรงไป": ["ตรงไป|อีก|นิด", "dtrong bpai|ìik|nít", "{0 Go straight} {2 a little} {1 more}."],
  "ไกล": ["เดิน|ไป|ไกล|ไหม", "dern|bpai|glai|mǎi", "{3 Is} it {2 far} to {0,1 walk}?"],
  "ใกล้": ["สถานี|อยู่|ใกล้ๆ", "sà-thǎa-nii|yùu|glâi-glâi", "The {0 station} {1 is} {2 close by}."],
  "ไปสนามบินเท่าไหร่": ["แท็กซี่|ไป|สนามบิน|เท่าไหร่", "tháek-sîi|bpai|sà-nǎam bin|thâo-rài", "{3 How much} is a {0 taxi} {1 to} the {2 airport}?"],

  // Bangkok 100: hotel and massage
  "โรงแรม": ["ไป|โรงแรม|นี้", "bpai|roong-raem|níi", "{0 To} {2 this} {1 hotel}, please."],
  "ห้อง": ["ห้อง|อยู่|ชั้น|ไหน", "hâwng|yùu|chán|nǎi", "{3 Which} {2 floor} {1 is} the {0 room} on?"],
  "กุญแจ": ["ลืม|กุญแจ|ไว้|ใน|ห้อง", "luuem|gun-jae|wái|nai|hâwng", "I {0,2 left} my {1 key} {3 in} the {4 room}."],
  "รหัสไวไฟอะไร": ["ขอโทษ |รหัส|ไวไฟ|อะไร", "khǎw-thôht|rá-hàt|wai-fai|à-rai", "{0 Excuse me}, {3 what's} the {2 wifi} {1 password}?"],
  "ผ้าเช็ดตัว": ["ขอ|ผ้าเช็ดตัว|เพิ่ม", "khǎw|phâa chét dtua|phêrm", "{2 More} {1 towels}, {0 please}."],
  "แอร์": ["แอร์|เสีย", "ae|sǐa", "The {0 air conditioning} is {1 broken}."],
  "ร้านนวด": ["ร้านนวด|เปิด|ถึง|กี่โมง", "ráan nûat|bpèrt|thǔeng|gìi moong", "{2 Until} {3 what time} is the {0 massage shop} {1 open}?"],
  "นวดไทย": ["นวดไทย|หนึ่ง|ชั่วโมง", "nûat thai|nùeng|chûa-moong", "A {1 one}-{2 hour} {0 Thai massage}."],
  "เบาๆ": ["นวด|เบาๆ|หน่อย", "nûat|bao-bao|nàwy", "{0 Massage} {1 gently}, {2 please}."],
  "แรงหน่อย": ["นวด|แรง|หน่อย|ได้|ไหม", "nûat|raeng|nàwy|dâi|mǎi", "{3 Could} you {0 press} {2 a bit} {1 harder}?"],

  // Bangkok 100: health and help
  "หมอ": ["อยาก|ไป|หา|หมอ", "yàak|bpai|hǎa|mǎw", "I {0 want} to {1,2 see} a {3 doctor}."],
  "ยา": ["มี|ยาแก้ปวด|ไหม", "mii|yaa gâe bpùat|mǎi", "{2 Do} you {0 have} {1 painkillers}?"],
  "ปวดหัว": ["ปวดหัว|มาก", "bpùat hǔa|mâak", "I have a {1 bad} {0 headache}."],
  "ปวดท้อง": ["ปวดท้อง |มี|ยา|ไหม", "bpùat tháwng|mii|yaa|mǎi", "I have a {0 stomach ache}. {3 Do} you {1 have} {2 medicine}?"],
  "ไม่สบาย": ["วันนี้|ไม่สบาย", "wan-níi|mâi sà-baai", "I'm {1 not feeling well} {0 today}."],
  "ทำกระเป๋าเงินหาย": ["ทำ|กระเป๋าเงิน|หาย|ที่|ตลาด", "tham|grà-bpǎo ngern|hǎai|thîi|dtà-làat", "I {0,2 lost} my {1 wallet} {3 at} the {4 market}."],
  "โทรศัพท์": ["ขอ|ยืม|โทรศัพท์|หน่อย", "khǎw|yuuem|thoo-rá-sàp|nàwy", "{0 Could I} {1 borrow} your {2 phone}?"],
  "เรียกตำรวจ": ["ช่วย|เรียก|ตำรวจ|ให้|หน่อย", "chûay|rîak|dtam-rùat|hâi|nàwy", "{0 Please} {1 call} the {2 police} {3 for me}."],

  // Bangkok 100: small talk
  "ผม": ["ผม|ไม่|เข้าใจ", "phǒm|mâi|khâo-jai", "{0 I} {1 don't} {2 understand}. (male speaker)"],
  "ฉัน": ["ฉัน|ไม่|กิน|เผ็ด", "chǎn|mâi|gin|phèt", "{0 I} {1 don't} {2 eat} {3 spicy} food. (female speaker)"],
  "คุณ": ["คุณ|พูด|ภาษาอังกฤษ|ได้|ไหม", "khun|phûut|phaa-sǎa ang-grìt|dâi|mǎi", "{3 Can} {0 you} {1 speak} {2 English}?"],
  "มาจากไหน": ["คุณ|มา|จาก|ไหน", "khun|maa|jàak|nǎi", "{3 Where} are {0 you} {1,2 from}?"],
  "โอเค": ["โอเค |ไม่มี|ปัญหา", "oo-khee|mâi mii|bpan-hǎa", "{0 OK}, {1 no} {2 problem}."],
  "ได้": ["พรุ่งนี้|มา|ได้", "phrûng-níi|maa|dâi", "I {2 can} {1 come} {0 tomorrow}."],
  "ไม่ได้": ["วันนี้|ไป|ไม่ได้", "wan-níi|bpai|mâi dâi", "I {2 can't} {1 go} {0 today}."],
  "มี": ["มี|ห้อง|ว่าง|ไหม", "mii|hâwng|wâang|mǎi", "{3 Do} you {0 have} a {1 room} {2 available}?"],
  "ไม่มี": ["ไม่มี|เงินสด", "mâi mii|ngern sòt", "I {0 don't have} any {1 cash}."],
  "อยู่ที่ไหน": ["สถานี|รถไฟฟ้า|อยู่|ที่ไหน", "sà-thǎa-nii|rót fai fáa|yùu|thîi-nǎi", "{3 Where} {2 is} the {1 skytrain} {0 station}?"],
  "นิดหน่อย": ["พูด|ไทย|ได้|นิดหน่อย", "phûut|thai|dâi|nít-nàwy", "I {2 can} {0 speak} {3 a little} {1 Thai}."],
  "พูดอีกครั้งได้ไหม": ["ขอโทษ |พูด|อีกครั้ง|ได้|ไหม", "khǎw-thôht|phûut|ìik khráng|dâi|mǎi", "{0 Sorry}, {3 could} you {1 say} that {2 again}?"],

  // Signs
  "ทางออก": ["ทางออก|อยู่|ทาง|นี้", "thaang àwk|yùu|thaang|níi", "The {0 exit} {1 is} {3 this} {2 way}."],
  "ทางเข้า": ["ทางเข้า|อยู่|ด้านหน้า", "thaang khâo|yùu|dâan nâa", "The {0 entrance} {1 is} {2 at the front}."],
  "ทางหนีไฟ": ["ทางหนีไฟ|อยู่|ข้าง|ลิฟต์", "thaang nǐi fai|yùu|khâang|líp", "The {0 fire exit} {1 is} {2 next to} the {3 elevator}."],
  "สถานี": ["สถานี|ต่อไป |สยาม", "sà-thǎa-nii|dtàw bpai|sà-yǎam", "{1 Next} {0 station}, {2 Siam}."],
  "รถไฟฟ้า": ["นั่ง|รถไฟฟ้า|ไป|อโศก", "nâng|rót fai fáa|bpai|à-sòok", "{0 Take} the {1 skytrain} {2 to} {3 Asok}."],
  "รถไฟใต้ดิน": ["นั่ง|รถไฟใต้ดิน|ไป|สุขุมวิท", "nâng|rót fai dtâi din|bpai|sù-khǔm-wít", "{0 Take} the {1 subway} {2 to} {3 Sukhumvit}."],
  "ป้ายรถเมล์": ["ป้ายรถเมล์|อยู่|หน้า|เซเว่น", "bpâai rót-mee|yùu|nâa|sé-wên", "The {0 bus stop} {1 is} {2 in front of} the {3 7-Eleven}."],
  "ท่าเรือ": ["ท่าเรือ|อยู่|ใกล้|วัดอรุณ", "thâa ruea|yùu|glâi|wát à-run", "The {0 pier} {1 is} {2 near} {3 Wat Arun}."],
  "ขาออก": ["ขาออก|อยู่|ชั้น|สี่", "khǎa àwk|yùu|chán|sìi", "{0 Departures} {1 are} on the {3 fourth} {2 floor}."],
  "ขาเข้า": ["ขาเข้า|อยู่|ชั้น|สอง", "khǎa khâo|yùu|chán|sǎawng", "{0 Arrivals} {1 are} on the {3 second} {2 floor}."],
  "ถนน": ["ถนน|นี้|รถติด|มาก", "thà-nǒn|níi|rót dtìt|mâak", "The {2 traffic} on {1 this} {0 road} is {3 terrible}."],
  "ซอย ๑๑": ["โรงแรม|อยู่|ใน|ซอย|สิบเอ็ด", "roong-raem|yùu|nai|sawy|sìp-èt", "The {0 hotel} {1 is} {2 in} {3 Soi} {4 11}."],
  "รถว่าง": ["แท็กซี่|คัน|นั้น|ว่าง", "tháek-sîi|khan|nán|wâang", "{2 That} {0 taxi} is {3 free}."],
  "ห้องน้ำ": ["ห้องน้ำ|อยู่|ชั้น|สอง", "hâwng-náam|yùu|chán|sǎawng", "The {0 toilet} {1 is} on the {3 second} {2 floor}."],
  "สุขา": ["สุขา|อยู่|ด้านหลัง", "sù-khǎa|yùu|dâan lǎng", "The {0 restroom} {1 is} {2 at the back}."],
  "ชาย": ["ห้องน้ำ|ชาย|อยู่|ทาง|ซ้าย", "hâwng-náam|chaai|yùu|thaang|sáai", "The {1 men's} {0 room} {2 is} {3 on the} {4 left}."],
  "หญิง": ["ห้องน้ำ|หญิง|อยู่|ทาง|ขวา", "hâwng-náam|yǐng|yùu|thaang|khwǎa", "The {1 women's} {0 room} {2 is} {3 on the} {4 right}."],
  "ดึง": ["ประตู|นี้|ต้อง|ดึง", "bprà-dtuu|níi|dtâwng|dueng", "You {2 have to} {3 pull} {1 this} {0 door}."],
  "ผลัก": ["ผลัก|ประตู|เข้าไป", "phlàk|bprà-dtuu|khâo bpai", "{0 Push} the {1 door} to {2 go in}."],
  "เปิด": ["ร้าน|เปิด|สิบโมง", "ráan|bpèrt|sìp moong", "The {0 shop} {1 opens} {2 at ten}."],
  "ปิด": ["วันนี้|ร้าน|ปิด", "wan-níi|ráan|bpìt", "The {1 shop} is {2 closed} {0 today}."],
  "ชั้น ๒": ["ร้านอาหาร|อยู่|ชั้น|สอง", "ráan aa-hǎan|yùu|chán|sǎawng", "The {0 restaurant} {1 is} on the {3 second} {2 floor}."],
  "บันได": ["ลิฟต์|เสีย |ใช้|บันได|นะ", "líp|sǐa|chái|ban-dai|ná", "The {0 elevator}'s {1 broken}. {2 Use} the {3 stairs}."],
  "ห้ามเข้า": ["ตรงนี้|ห้าม|เข้า", "dtrong-níi|hâam|khâo", "{1 No} {2 entry} {0 here}."],
  "ห้ามสูบบุหรี่": ["ใน|ร้าน|ห้าม|สูบ|บุหรี่", "nai|ráan|hâam|sùup|bù-rìi", "{2 No} {3,4 smoking} {0 inside} the {1 shop}."],
  "ห้ามจอด": ["หน้า|บ้าน|ห้าม|จอด", "nâa|bâan|hâam|jàwt", "{2 No} {3 parking} {0 in front of} the {1 house}."],
  "ระวัง": ["ระวัง|รถ", "rá-wang|rót", "{0 Watch out for} {1 cars}."],
  "อันตราย": ["ตรงนั้น|อันตราย |อย่า|เข้าไป", "dtrong-nán|an-dtà-raai|yàa|khâo bpai", "It's {1 dangerous} {0 over there}. {2 Don't} {3 go in}."],
  "หยุด": ["หยุด|ตรงนี้|ก่อน", "yùt|dtrong-níi|gàwn", "{0 Stop} {1 here} {2 first}."],
  "ส่วนบุคคล": ["ที่จอดรถ|ส่วนบุคคล", "thîi jàwt rót|sùan bùk-khon", "{1 Private} {0 parking}."],
  "ถอดรองเท้า": ["กรุณา|ถอด|รองเท้า|ก่อน|เข้า|วัด", "gà-rú-naa|thàawt|rawng-tháao|gàwn|khâo|wát", "{0 Please} {1 remove} your {2 shoes} {3 before} {4 entering} the {5 temple}."],
  "โรงพยาบาล": ["ไป|โรงพยาบาล|ที่|ใกล้|ที่สุด", "bpai|roong phá-yaa-baan|thîi|glâi|thîi-sùt", "{0 To} the {3,4 nearest} {1 hospital}, please."],
  "ร้านขายยา": ["ร้านขายยา|อยู่|ตรงข้าม", "ráan khǎai yaa|yùu|dtrong-khâam", "The {0 pharmacy} {1 is} {2 across the street}."],
  "ตำรวจ": ["ตำรวจ|ท่องเที่ยว|ช่วย|ได้", "dtam-rùat|thâwng-thîao|chûay|dâi", "The {1 tourist} {0 police} {3 can} {2 help}."],
  "วัด": ["วัด|นี้|สวย|มาก", "wát|níi|sǔay|mâak", "{1 This} {0 temple} is {3 very} {2 beautiful}."],
  "ธนาคาร": ["ธนาคาร|ปิด|วันอาทิตย์", "thá-naa-khaan|bpìt|wan aa-thít", "The {0 bank} is {1 closed} on {2 Sunday}."],
  "ร้านอาหาร": ["ร้านอาหาร|นี้|คน|เยอะ", "ráan aa-hǎan|níi|khon|yúh", "{1 This} {0 restaurant} is {2,3 crowded}."],
  "ราคา": ["ราคา|นี้|รวม|ภาษี|แล้ว", "raa-khaa|níi|ruam|phaa-sǐi|láew", "{1 This} {0 price} {2 includes} {3 tax}."],
  "๕๐ บาท": ["อัน|นี้|ห้าสิบ|บาท", "an|níi|hâa-sìp|bàat", "{1 This} {0 one} is {2 fifty} {3 baht}."],
  "ลดราคา": ["วันนี้|ลดราคา|ครึ่งหนึ่ง", "wan-níi|lót raa-khaa|khrûeng nùeng", "{2 Half} {1 price} {0 today}."],
  "เงินสด": ["รับ|แต่|เงินสด", "ráp|dtàe|ngern sòt", "{2 Cash} {1 only}."],
  "น้ำดื่ม": ["น้ำดื่ม|ฟรี", "náam dùuem|frii", "{1 Free} {0 drinking water}."],
};

// Split a raw example into words, linked English and the text to speak.
function parseExample([th, ro, en]) {
  const ths = th.split("|"), ros = ro.split("|");
  const words = ths.map((t, i) => ({ th: t.trim(), ro: ros[i] || "" }));
  const parts = [];
  for (const m of en.matchAll(/\{([\d,]+) ([^}]+)\}|([^{]+)/g)) {
    parts.push(m[3] !== undefined ? { text: m[3] } : { text: m[2], links: m[1].split(",").map(Number) });
  }
  return { words, parts, speech: ths.join("") };
}

function escHtml(s) {
  return String(s).replace(/[&<>"]/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[ch]));
}

// The sentence box: Thai words with pronunciation under each, then the
// English. Linked words light up together on hover or tap.
function sentenceHtml(ex) {
  const linked = new Set(ex.parts.flatMap(p => p.links || []));
  const words = ex.words.map((w, i) =>
    `<span class="s-w${linked.has(i) ? " s-linked" : ""}" data-w="${i}"><span class="s-th">${escHtml(w.th)}</span><span class="s-ro">${escHtml(w.ro)}</span></span>`).join("");
  const en = ex.parts.map(p => p.links
    ? `<span class="s-link" data-links="${p.links.join(",")}">${escHtml(p.text)}</span>` : escHtml(p.text)).join("");
  return `<div class="sentence" hidden><div class="s-words" lang="th">${words}</div><div class="s-en">${en}</div></div>`;
}

function wireSentences(root) {
  root.querySelectorAll(".sentence").forEach(box => {
    const clear = () => box.querySelectorAll(".hl").forEach(e => e.classList.remove("hl"));
    const light = ids => {
      clear();
      ids.forEach(i => box.querySelector(`.s-w[data-w="${i}"]`)?.classList.add("hl"));
      box.querySelectorAll(".s-link").forEach(l => {
        if (l.dataset.links.split(",").some(i => ids.includes(Number(i)))) l.classList.add("hl");
      });
    };
    box.addEventListener("pointerover", e => {
      const w = e.target.closest(".s-w"), l = e.target.closest(".s-link");
      if (w) light([Number(w.dataset.w)]);
      else if (l) light(l.dataset.links.split(",").map(Number));
    });
    box.addEventListener("pointerleave", clear);
  });
}
