/**
 * Ingenieurswerkboek: inhoudsbron vir die Rekenaarorganisasie-studiegids.
 * Hierdie data is saamgestel uit die gebruiker se opgelaaide studiegids,
 * oefentoetse en memos, met fokus op die 75-punt HA1-struktuur.
 */

export type LearningUnit = {
  id: string;
  code: string;
  chapter: string;
  title: string;
  points: number;
  question: string;
  focus: string;
  checklist: string[];
  formula?: string;
  accent: "blue" | "red" | "charcoal";
};

export const examMeta = {
  duration: "2 ure",
  total: 75,
  questions: 6,
  note: "Begin met die inhoud wat die meeste punte dra. Gebruik die oefentoetse onder tydsdruk en merk jou foute volgens tipe.",
};

export const learningUnits: LearningUnit[] = [
  {
    id: "le1",
    code: "LE1 / HF10",
    chapter: "Getallestelsels",
    title: "Omskakeling met presisie",
    points: 5,
    question: "Vraag 1",
    focus: "Desimaal ↔ binêr; heksadesimaal ↔ binêr; breukdele.",
    checklist: [
      "Deel desimaal deur 2 en lees die reste van onder na bo.",
      "Groeper binêre syfers van regs in groepe van presies 4 vir heksadesimaal.",
      "Vir ’n binêre breuk vermenigvuldig die breukdeel herhaaldelik met 2.",
    ],
    formula: "HEX ↔ BIN = 4 bisse per syfer",
    accent: "blue",
  },
  {
    id: "le2",
    code: "LE2 / HF11",
    chapter: "Rekenaarrekenkunde en saamgestelde taal",
    title: "Bereken, toets, skuif",
    points: 21,
    question: "Vraag 2",
    focus: "8-bis berekeninge, twee-komplement, oorloop, C–A–Q–M en registervloei.",
    checklist: [
      "Vir −x: positiewe vorm → komplimenteer elke bis → tel 1 by.",
      "Signed overflow: twee insette met dieselfde teken gee ’n resultaat met die teenoorgestelde teken.",
      "By C–A–Q–M: toets Q₀; tel M by A indien Q₀ = 1; doen dan die gekombineerde skuif.",
      "Vul elke blok se invoer én uitvoer by die aftrekdiagram stelselmatig in.",
    ],
    formula: "−26 = 00011010 → 11100101 → 11100110",
    accent: "red",
  },
  {
    id: "le3",
    code: "LE3 / HF12",
    chapter: "Digitale logika",
    title: "Bou uit hekke",
    points: 9,
    question: "Vraag 3",
    focus: "Logiese hekke, halwe/voloptellers, kombinasionele logika en wipkringe.",
    checklist: [
      "Werk van binne na buite wanneer jy ’n Boole-uitdrukking teken.",
      "Halwe opteller: Som = A XOR B; Dra = A AND B.",
      "Volopteller: Som = A XOR B XOR Cin; Cout = AB + ACin + BCin.",
      "Kombinasionele logika reageer op huidige insette; ’n wipkring behou toestand.",
    ],
    formula: "Cout = AB + ACin + BCin",
    accent: "charcoal",
  },
  {
    id: "le5",
    code: "LE5 / HF1",
    chapter: "Basiese konsepte en rekenaar-evolusie",
    title: "Volg die IAS-pad",
    points: 15,
    question: "Vraag 4",
    focus: "Struktuur/funksies, argitektuur teenoor organisasie en IAS-registervloei.",
    checklist: [
      "Ken die rol van PC, MAR, MBR, IBR, IR, AC en MQ.",
      "Onthou: PC → MAR → geheue → MBR → IBR/IR.",
      "Die regter instruksie wag in IBR; die linker instruksie gaan eerste na IR.",
      "Dui altyd aan wanneer die geheue lees- of skryflyn aktief is.",
    ],
    formula: "PC → MAR → MBR → IBR / IR",
    accent: "blue",
  },
  {
    id: "le6",
    code: "LE6 / HF2",
    chapter: "Prestasie-kwessies",
    title: "Maak siklusse tel",
    points: 10,
    question: "Vraag 5",
    focus: "Pyplynverwerking, vertakkingvoorspelling, datavloei, superskalêr en spekulatief.",
    checklist: [
      "3 stadiums: GH → DE → UV; onafhanklike instruksies kan oorvleuel.",
      "Gebruik die vorige werklike resultaat wanneer die vraag dit vra.",
      "’n Data-afhanklikheid laat ’n verbruiker wag vir sy verskaffer se resultaat.",
      "Verskillende uitvoeringseenhede kan in ’n superskalêre verwerker parallel werk.",
    ],
    formula: "Totale straf = aantal foute × siklus-koste",
    accent: "red",
  },
  {
    id: "prakties",
    code: "PRAKTIES 1–3",
    chapter: "NASM/x86-kodering",
    title: "Naspoor voor jy kodeer",
    points: 15,
    question: "Vraag 6",
    focus: "Registers, CMP/JMP, lusse, arrays, menu’s en foutsoek.",
    checklist: [
      "Skets eers jou data/declarations, dan die menu, dan een opsie op ’n slag.",
      "Teken ’n registertabel en onderskei ’n waarde, ’n adres en die inhoud by ’n adres.",
      "DWORD-arrays gebruik 4 grepe per element; kontroleer elke offset.",
      "Toets jou beginwaarde, eindvoorwaarde, indeks en laaste array-element.",
    ],
    formula: "arr[i] vir DWORDs = basisadres + i × 4",
    accent: "charcoal",
  },
];

export const iasRegisters = [
  { key: "PC", label: "Program Counter", role: "adres van die volgende instruksie" },
  { key: "MAR", label: "Memory Address Register", role: "geheue-adres wat gelees of geskryf word" },
  { key: "MBR", label: "Memory Buffer Register", role: "woord wat na/van geheue beweeg" },
  { key: "IBR", label: "Instruction Buffer Register", role: "die ander instruksie uit dieselfde geheuewoord" },
  { key: "IR", label: "Instruction Register", role: "huidige instruksie" },
  { key: "AC", label: "Accumulator", role: "tussentydse en finale rekenkundige resultaat" },
  { key: "MQ", label: "Multiplier Quotient", role: "vermenigvuldiging of deling waar relevant" },
];

export const multiplySteps = [
  { row: "Begin", c: "0", a: "0000", q: "0011", m: "0101", action: "Oorspronklike waardes" },
  { row: "1", c: "0", a: "0010", q: "1001", m: "0101", action: "Q₀=1: A+M=0101; gekombineerde skuif" },
  { row: "2", c: "0", a: "0011", q: "1100", m: "0101", action: "Q₀=1: A+M=0111; gekombineerde skuif" },
  { row: "3", c: "0", a: "0001", q: "1110", m: "0101", action: "Q₀=0: geen optelling; gekombineerde skuif" },
  { row: "4", c: "0", a: "0000", q: "1111", m: "0101", action: "Q₀=0: geen optelling; finale produk = 0000 1111" },
];

type Paper = {
  id: string;
  title: string;
  conversion: {
    prompt: string;
    known: string;
    answer: string;
    label: string;
  }[];
  ias: {
    left: string;
    right: string;
    initial: string;
    result: string;
  };
  pipeline: string;
  branches: string[];
  branchPenalty: number;
  practical: string;
};

export const papers: Paper[] = [
  {
    id: "ha1-1",
    title: "Oefen-HA1 1",
    conversion: [
      { label: "(a)", prompt: "Skakel 44₁₀ om na heksadesimaal.", known: "44₁₀", answer: "2C" },
      { label: "(b)", prompt: "Skakel 157₁₀ om na 8-bis binêr.", known: "157₁₀", answer: "10011101" },
      { label: "(c)", prompt: "Skakel 0110 0000₂ om na desimaal.", known: "0110 0000₂", answer: "96" },
      { label: "(d)", prompt: "Skakel 10 1010.111₂ om na desimaal.", known: "10 1010.111₂", answer: "42.875" },
    ],
    ias: {
      left: "LOAD M(1000)",
      right: "ADD M(1001)",
      initial: "M(1000)=3; M(1001)=2; PC=0",
      result: "AC word eers 3; ná ADD is AC = 5.",
    },
    pipeline: "mov eax, [a]  →  add ebx, eax  →  sub ecx, ebx  →  mov edx, [b]  →  imul esi, edx  →  add edi, esi",
    branches: ["N", "V", "V", "N", "N", "V", "V", "V"],
    branchPenalty: 9,
    practical: "Vra drie positiewe heelgetalle A, B en C. Vertoon A+B+C, A×B, die heelgetal-kwosiënt en modulus van (A×B)÷C, en die heelgetalgemiddeld.",
  },
  {
    id: "ha1-2",
    title: "Oefen-HA1 2",
    conversion: [
      { label: "(a)", prompt: "Skakel 58₁₀ om na 8-bis binêr.", known: "58₁₀", answer: "00111010" },
      { label: "(b)", prompt: "Skakel 1010 1101₂ om na desimaal.", known: "1010 1101₂", answer: "173" },
      { label: "(c)", prompt: "Skakel 1101 0110₂ om na desimaal.", known: "1101 0110₂", answer: "214" },
      { label: "(d)", prompt: "Skakel 11010₂ om na desimaal.", known: "11010₂", answer: "26" },
    ],
    ias: {
      left: "LOAD M(1010)",
      right: "SUB M(1011)",
      initial: "M(1010)=12; M(1011)=5; PC=0",
      result: "AC word eers 12; ná SUB is AC = 7.",
    },
    pipeline: "mov eax, [x]  →  add ecx, eax  →  mov ebx, [y]  →  sub edx, ebx  →  imul esi, ecx  →  add edi, esi",
    branches: ["V", "V", "N", "N", "V", "N", "V", "V"],
    branchPenalty: 12,
    practical: "Vra twee positiewe heelgetalle A en B. Bepaal met CMP en ’n voorwaardelike sprong die grootste waarde; vertoon ook die som, A−B en produk.",
  },
  {
    id: "ha1-3",
    title: "Oefen-HA1 3",
    conversion: [
      { label: "(a)", prompt: "Skakel 0011 1111₂ om na desimaal.", known: "0011 1111₂", answer: "63" },
      { label: "(b)", prompt: "Skakel 214₁₀ om na 8-bis binêr.", known: "214₁₀", answer: "11010110" },
      { label: "(c)", prompt: "Skakel BAD₁₆ om na desimaal.", known: "BAD₁₆", answer: "2989" },
      { label: "(d)", prompt: "Skakel 14,5625₁₀ om na binêr.", known: "14,5625₁₀", answer: "1110.1001" },
    ],
    ias: {
      left: "LOAD M(1020)",
      right: "ADD M(1021)",
      initial: "M(1020)=7; M(1021)=6; PC=0",
      result: "AC word eers 7; ná ADD is AC = 13.",
    },
    pipeline: "mov eax, [num1]  →  mov ebx, [num2]  →  add ecx, eax  →  sub edx, ebx  →  imul esi, ecx  →  add edi, esi",
    branches: ["N", "N", "V", "V", "V", "N", "V", "N"],
    branchPenalty: 12,
    practical: "Vra ’n positiewe heelgetal N. Bereken en vertoon die som van 1 tot N met registers, ’n vergelyking, ’n lus en ’n toepaslike sprong.",
  },
];

export const sharedPaperPrompts = [
  { number: "2(a)", marks: 4, title: "8-bis berekening", prompt: "Bereken 00110110 + 00011101 en 01101101 + 00110111. Wys jou werk en identifiseer signed overflow waar dit relevant is.", memo: "01010011; 10100100. Die tweede som het signed overflow indien dit as getekende 8-bis getalle gelees word." },
  { number: "2(b)", marks: 4, title: "Negatiewe voorstelling", prompt: "Skryf −65 en −26 as 8-bis twee-komplementgetalle. Wys positiewe vorm → kompliment → +1.", memo: "−65: 01000001 → 10111110 → 10111111. −26: 00011010 → 11100101 → 11100110." },
  { number: "2(c–e)", marks: 13, title: "Vermenigvuldiging, aftrekking en oorloop", prompt: "Voltooi die C–A–Q–M-tabel vir 0101 × 0011; volg die A/B → komplimenteerder → SK → opteller-pad vir 5−2; motiveer of 0111+0001 signed overflow gee.", memo: "Produk: 0000 1111 = 15. Vir 5−2: 0101 + 1110 = 1 0011 → 0011. Ja: 0111 + 0001 = 1000; twee positiewe insette gee ’n negatiewe 4-bis resultaat." },
  { number: "3", marks: 9, title: "Digitale logika", prompt: "Teken (A OF B) EN NIE C; voltooi die halwe-opteller waarheidstabel; gee die volopteller vergelykings; verduidelik kombinasionele logika teenoor ’n wipkring.", memo: "OR(A,B) en NOT(C) voer na AND. Halwe opteller: 00→0,0; 01→1,0; 10→1,0; 11→0,1. Som=A XOR B XOR Cin; Cout=AB+ACin+BCin. Wipkringe behou toestand." },
  { number: "4(a)", marks: 3, title: "Argitektuur en organisasie", prompt: "Verduidelik die verskil tussen rekenaarargitektuur en rekenaarorganisasie.", memo: "Argitektuur is die eienskappe sigbaar vir die programmeerder; organisasie is die bedryfseenhede en onderlinge verband wat daardie argitektuur implementeer." },
  { number: "5(a,c)", marks: 7, title: "Pyplyn en parallelisme", prompt: "Voltooi ’n 3-stadium pyplyntabel; dui data-afhanklikhede/vertragings aan; verduidelik watter onafhanklike instruksies op verskillende uitvoeringseenhede kan saamloop.", memo: "Begin elke instruksie in GH en beweeg deur DE na UV. ’n Verbruiker kan wag totdat die verskaffer se UV voltooi. Onafhanklike instruksies op verskillende eenhede kan parallel uitvoer." },
];

export const drillQuestions = [
  {
    id: "drill-binary",
    unit: "LE1",
    question: "Hoeveel bisse verteenwoordig een heksadesimale syfer?",
    options: ["2", "3", "4", "8"],
    answer: 2,
    explanation: "Een heksadesimale syfer dek waardes 0–15, dus presies 4 bisse.",
  },
  {
    id: "drill-twos",
    unit: "LE2",
    question: "Watter volgorde gebruik jy om −x in twee-komplement te vorm?",
    options: ["Deel deur 2, groepeer in 4, tel 1", "Skryf x, komplimenteer elke bis, tel 1 by", "Verwyder die voorste 0, tel 1 by", "Skuif regs en vul met 1"],
    answer: 1,
    explanation: "Begin met die positiewe vorm in die korrekte bislengte; inverteer elke bis; tel een by.",
  },
  {
    id: "drill-overflow",
    unit: "LE2",
    question: "Watter patroon dui signed overflow by optelling aan?",
    options: ["Insette met verskillende tekens gee 0", "Twee insette met dieselfde teken gee ’n resultaat met die teenoorgestelde teken", "Die dra-bis is altyd 1", "Die resultaat het meer as 8 bisse"],
    answer: 1,
    explanation: "Signed overflow word deur die tekenverandering tussen twee gelyk-getekende insette en hul resultaat herken.",
  },
  {
    id: "drill-halfadder",
    unit: "LE3",
    question: "Wat is die Som-uitset van ’n halwe opteller?",
    options: ["A AND B", "A OR B", "A XOR B", "NOT A"],
    answer: 2,
    explanation: "Die som-bis is 1 wanneer die twee insette verskil: A XOR B.",
  },
  {
    id: "drill-ias",
    unit: "LE5",
    question: "Watter register bewaar die instruksie wat tans uitgevoer word?",
    options: ["PC", "MAR", "MBR", "IR"],
    answer: 3,
    explanation: "IR is die Instruction Register—die huidige instruksie beweeg daarheen voordat dit uitgevoer word.",
  },
  {
    id: "drill-pipeline",
    unit: "LE6",
    question: "Wat is die korrekte volgorde vir die 3-stadium pyplyn in jou materiaal?",
    options: ["UV → DE → GH", "GH → DE → UV", "DE → GH → UV", "GH → UV → DE"],
    answer: 1,
    explanation: "GH (gaan haal), DE (dekodeer) en UV (uitvoer) kan oor verskillende instruksies oorvleuel.",
  },
  {
    id: "drill-array",
    unit: "Prakties",
    question: "Wat is die direkte byte-offset van arr[5] as arr uit DWORD-elemente bestaan?",
    options: ["5", "10", "20", "25"],
    answer: 2,
    explanation: "’n DWORD is 4 grepe. By indeks 5 is die offset 5 × 4 = 20 grepe.",
  },
];

export const practicalDrills = [
  { title: "CMP + sprong", time: "1 minuut", prompt: "Skryf CMP + een sprong om te toets of EAX = 0." },
  { title: "Array-lus", time: "2 minute", prompt: "Skryf ’n lus wat 5 array-elemente besoek." },
  { title: "DWORD-adres", time: "1 minuut", prompt: "Skryf die adresberekening vir arr[i] wanneer die array DWORDs bevat." },
  { title: "Ruil waardes", time: "3 minute", prompt: "Ruil twee DWORD-arrayelemente om." },
  { title: "Grootste register", time: "2 minute", prompt: "Vind die grootste van twee registers met CMP/JMP." },
  { title: "Mini-menu", time: "4 minute", prompt: "Skryf ’n eenvoudige menu met twee opsies." },
];

export const practicalChecklist = [
  "Het ek registers gekies sonder om ’n belangrike waarde te oorskryf?",
  "Is die lus se beginwaarde en eindvoorwaarde korrek?",
  "Verhoog of verlaag ek die indeks elke keer?",
  "Gebruik ek die korrekte DWORD-offset van 4 grepe?",
  "Vergelyk CMP die waardes wat ek dink dit vergelyk?",
  "Kan die program werk indien die gebruiker 0 waardes invoer?",
  "Het ek die laaste array-element werklik bereik?",
];


export const visualStudyNotes = [
  {
    id: "le1-methodes",
    code: "LE1 / OMSKAKELING",
    title: "Desimaal → binêr: kies jou metode",
    definition: "’n Binêre getal gebruik plekwaardes wat opeenvolgende magte van 2 is: … 16, 8, 4, 2, 1 en, ná die komma, 1/2, 1/4, 1/8 …",
    steps: [
      "Deelmetode: deel herhaaldelik deur 2 en skryf elke res neer.",
      "Stop wanneer die kwosiënt 0 is.",
      "Lees die reste van onder na bo; die laaste res is die mees betekenisvolle bis.",
      "Tabelmetode: trek die grootste moontlike plekwaarde af en merk daardie bis met 1.",
    ],
    sketch: ["128", "64", "32", "16", "8", "4", "2", "1"],
    example: "13₁₀ = 8 + 4 + 1 = 1101₂",
    check: "Vra jouself: is elke gemerkte plekwaarde gebruik sonder dat die oorblywende waarde negatief word?",
    accent: "blue",
  },
  {
    id: "le1-fraksies",
    code: "LE1 / BREUKDEEL",
    title: "Binêre breuke ná die komma",
    definition: "Elke posisie regs van die binêre punt het ’n kleiner plekwaarde: 2⁻¹ = 0,5; 2⁻² = 0,25; 2⁻³ = 0,125.",
    steps: [
      "Neem slegs die breukdeel, byvoorbeeld 0,625.",
      "Vermenigvuldig met 2 en skryf die heelgetaldeel as die volgende bis.",
      "Gebruik die nuwe breukdeel vir die volgende vermenigvuldiging.",
      "Herhaal totdat die breuk 0 is of totdat genoeg akkuraatheid bereik is.",
    ],
    sketch: ["0,625 × 2", "= 1,25 → 1", "0,25 × 2", "= 0,5 → 0", "0,5 × 2", "= 1,0 → 1"],
    example: "0,625₁₀ = 0,101₂",
    check: "Lees die heelgetalle uit die vermenigvuldigingsresultate van bo na onder—nie onder na bo nie.",
    accent: "red",
  },
  {
    id: "le2-twees",
    code: "LE2 / NEGATIEWE GETALLE",
    title: "Twee-komplement in drie bewegings",
    definition: "Twee-komplement stel ’n negatiewe waarde voor deur die positiewe vaste-bisvorm te inverseer en 1 by te tel.",
    steps: [
      "Skryf +x in die verlangde bislengte, byvoorbeeld +6 = 0110.",
      "Inverseer elke bis: 0110 → 1001.",
      "Tel 1 by: 1001 + 0001 = 1010; dus −6 = 1010 in 4 bisse.",
      "Die linkerkantste bis is die tekenbis: 0 is positief en 1 is negatief.",
    ],
    sketch: ["+6", "0110", "↓ inverseer", "1001", "↓ + 1", "1010 = −6"],
    example: "In n bisse is die reeks −2ⁿ⁻¹ tot 2ⁿ⁻¹ − 1.",
    check: "Hou die bislengte konstant; ’n ontbrekende voorste nul verander die voorstelling se lengte.",
    accent: "red",
  },
  {
    id: "le2-alu",
    code: "LE2 / RLE",
    title: "Wat gebeur binne die ALU?",
    definition: "Die rekenkundige en logiese eenheid (RLE/ALU) voer rekenkundige en Boole-logiese bewerkings op operande uit.",
    steps: [
      "Beheer-seine kies die bewerking, byvoorbeeld optel, aftrek of AND.",
      "Operandregisters lewer die waardes aan die ALU.",
      "Die resultaat gaan na ’n resultaatregister.",
      "Vlaggies teken toestande soos nul, teken, dra of oorloop aan.",
    ],
    sketch: ["Beheer-seine", "↓", "[  ALU  ]", "↑", "Operandregisters", "→ resultaat + vlaggies"],
    example: "Aftrekking kan as optelling van die twee-komplement van die tweede operand uitgevoer word.",
    check: "Onderskei die numeriese resultaat van die vlaggies wat die toestand van die resultaat beskryf.",
    accent: "blue",
  },
  {
    id: "le3-logic",
    code: "LE3 / DIGITALE LOGIKA",
    title: "Van Boole-uitdrukking na skets",
    definition: "Kombinasionele logika se uitset word slegs deur die huidige insette bepaal; ’n wipkring kan vorige toestand behou.",
    steps: [
      "Lees die uitdrukking van binne na buite.",
      "Teken eers NOT-poorte vir geïnverteerde insette.",
      "Verbind die tussenresultate met AND- of OR-poorte.",
      "Kontroleer die skets met ’n waarheidstabel.",
    ],
    sketch: ["A ─┐", "   OR ─┐", "B ─┘    AND ─ Uit", "C ─ NOT ─┘"],
    example: "(A OF B) EN NIE C = (A + B) · C̅",
    check: "’n Halwe opteller gee Som = A XOR B en Dra = A AND B.",
    accent: "charcoal",
  },
  {
    id: "le5-ias",
    code: "LE5 / IAS",
    title: "Die haal-en-uitvoer-siklus",
    definition: "Die IAS-registers verdeel die instruksiepad: die PC wys na die volgende woord, MAR dra die geheue-adres en MBR dra die geheuewoord.",
    steps: [
      "PC → MAR: plaas die adres van die volgende geheuewoord in MAR.",
      "Geheue lees → MBR: die woord word na MBR gebring.",
      "Die linker instruksie gaan na IR; die regter instruksie wag in IBR.",
      "Die instruksie word gedekodeer en deur die toepaslike eenheid uitgevoer.",
    ],
    sketch: ["PC", "↓ adres", "MAR", "↓ lees", "GEHEUE → MBR", "↙ linker: IR   regter: IBR"],
    example: "PC → MAR → geheue → MBR → IR/IBR",
    check: "IR bevat die instruksie wat tans uitgevoer word; IBR hou die ander instruksie uit dieselfde woord.",
    accent: "blue",
  },
  {
    id: "le6-pipeline",
    code: "LE6 / PRESTASIE",
    title: "Pyplyn: drie stadia wat oorvleuel",
    definition: "In ’n pyplyn kan verskillende instruksies terselfdertyd in verskillende stadia wees.",
    steps: [
      "GH = gaan haal die instruksie.",
      "DE = dekodeer die instruksie en bepaal wat benodig word.",
      "UV = voer die bewerking uit.",
      "’n Data-afhanklikheid laat die verbruiker wag totdat die verskaffer se resultaat gereed is.",
    ],
    sketch: ["Tyd →", "I1: GH | DE | UV", "I2:    GH | DE | UV", "I3:         GH | DE | UV"],
    example: "GH → DE → UV; onafhanklike instruksies kan oorvleuel.",
    check: "Soek eers vir ’n afhanklikheid voordat jy aanvaar dat twee instruksies parallel kan loop.",
    accent: "red",
  },
  {
    id: "prakties-registers",
    code: "PRAKTIES / NASM",
    title: "Lees ’n registerspoor soos ’n storie",
    definition: "’n Registerwaarde, ’n geheue-adres en die inhoud by daardie adres is drie verskillende dinge.",
    steps: [
      "Skryf die aanvanklike waarde van elke betrokke register neer.",
      "Merk elke CMP, MOV, ADD, SUB en sprong in volgorde.",
      "By ’n DWORD-array is arr[i] se byte-offset i × 4.",
      "Kontroleer die lus se indeks, eindvoorwaarde en laaste element.",
    ],
    sketch: ["basisadres", " + i × 4", "→ arr[i]", "CMP", "→ voorwaardelike sprong"],
    example: "arr[5] = basisadres + 20 grepe wanneer elke element ’n DWORD is.",
    check: "Toets ook nulwaardes en die grensgeval waar die lus die laaste element bereik.",
    accent: "charcoal",
  },
];

export const sourceCoverage = [
  { label: "Skyfies en mikro-lesse", detail: "LE1–LE6 en praktiese lesings" },
  { label: "Klasoefeninge en TKA’s", detail: "Omskakeling, RLE, IAS, pyplyn en praktiese vrae" },
  { label: "Handgeskrewe notas", detail: "Visuele metodekaarte, ALU-skets en twee-komplementstappe" },
  { label: "Handboek en HA1-voorbereiding", detail: "Definisies, reëls en formele terminologie" },
];
