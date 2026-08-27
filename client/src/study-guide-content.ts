/**
 * Ingenieurswerkboek-rigting: hierdie bron organiseer die gebruiker se
 * handgeskrewe notas, klas-skyfies, TKA-memos en HA1-fokus in leerbare,
 * interaktiewe afdelings. Dit vermy los feite deur elke punt aan ’n metode,
 * skets, voorbeeld en kontrole te koppel.
 */

export type SummaryCard = {
  id: string;
  kicker: string;
  title: string;
  explanation: string;
  sketch: string[];
  exampleTitle: string;
  exampleSteps: string[];
  check: string;
};

export type SummaryUnit = {
  id: string;
  code: string;
  title: string;
  points: number;
  focus: string;
  sourceImage?: string;
  sourceCaption?: string;
  cards: SummaryCard[];
};

export const summaryUnits: SummaryUnit[] = [
  {
    id: "le1",
    code: "LE1 / HF10 / VRAAG 1",
    title: "Getallestelsels",
    points: 5,
    focus: "Desimaal ↔ binêr, heksadesimaal ↔ binêr, en breukdele.",
    sourceImage: "/manus-storage/le1-omskakeling_6b792113.png",
    sourceCaption: "Klasverwysing: omskakeling tussen binêr en desimaal.",
    cards: [
      {
        id: "decimal-binary",
        kicker: "METODE 01",
        title: "Desimaal → binêr: deel, onthou, lees terug",
        explanation: "Die deelmetode breek ’n desimale heelgetal in magte van 2 op. Deel telkens deur 2; elke res is ’n bis. Die eerste res is regs (die minste betekenisvolle bis), daarom lees jy die lys van onder na bo wanneer jy klaar is.",
        sketch: ["13 ÷ 2 = 6 res 1", " 6 ÷ 2 = 3 res 0", " 3 ÷ 2 = 1 res 1", " 1 ÷ 2 = 0 res 1", "lees ↑ 1101₂"],
        exampleTitle: "Wys die 13₁₀-voorbeeld",
        exampleSteps: ["Grootste plekwaardes: 8, 4, 2, 1.", "13 = 8 + 4 + 1; merk dus 1 by 8, 4 en 1.", "Die 2 se plek kry 0: 13₁₀ = 1101₂."],
        check: "Kan jy jou antwoord terugtoets deur die gemerkte magte van 2 bymekaar te tel?",
      },
      {
        id: "hex-binary",
        kicker: "METODE 02",
        title: "Heksadesimaal ↔ binêr: altyd vier bisse",
        explanation: "Een heksadesimale syfer stel 16 moontlikhede voor, van 0 tot F. Omdat 2⁴ = 16, word elke enkele hex-syfer deur presies vier binêre bisse vervang. Groepeer binêr van regs in viere voordat jy terugskakel na heksadesimaal.",
        sketch: ["A₁₆ = 1010₂", "F₁₆ = 1111₂", "2C₁₆ = 0010 1100₂", "0010 | 1100", "  2  |   C"],
        exampleTitle: "Wys die 2C₁₆-voorbeeld",
        exampleSteps: ["2 word 0010; C word 1100.", "Plaas die groepe langs mekaar, sonder ’n ekstra omskakelstap.", "2C₁₆ = 0010 1100₂ en dit is 44₁₀."],
        check: "Het elke hex-syfer ’n vier-bis groep—ook wanneer die groep met nulle begin?",
      },
      {
        id: "binary-fraction",
        kicker: "METODE 03",
        title: "Breuke: vermenigvuldig die breukdeel met 2",
        explanation: "Ná die binêre punt gebruik jy negatiewe magte van 2: 2⁻¹, 2⁻², 2⁻³, ensovoorts. Hou aan om slegs die breukdeel met 2 te vermenigvuldig. Die heelgetaldeel wat telkens verskyn, word die volgende bis—van bo na onder gelees.",
        sketch: ["0,625 × 2 = 1,25  → 1", "0,25  × 2 = 0,5   → 0", "0,5   × 2 = 1,0   → 1", "dus: 0,101₂"],
        exampleTitle: "Wys die 14,5625₁₀-voorbeeld",
        exampleSteps: ["Heelgetal: 14₁₀ = 1110₂.", "Breuk: 0,5625 × 2 = 1,125; 0,125 × 2 = 0,25; 0,25 × 2 = 0,5; 0,5 × 2 = 1,0.", "Lees die heelgetaldele: 1001. Dus 14,5625₁₀ = 1110,1001₂."],
        check: "Moenie die breukbisse omkeer nie—hier lees jy van bo na onder.",
      },
    ],
  },
  {
    id: "le2",
    code: "LE2 / HF11 / VRAAG 2",
    title: "Rekenaarrekenkunde",
    points: 21,
    focus: "Twee-komplement, bislengte, oorloop, vermenigvuldiging en aftrekregisters.",
    sourceImage: "/manus-storage/le2-twee-komplement_c09a425d.png",
    sourceCaption: "Klasverwysing: optelling van twee getalle in twee-komplementvoorstelling.",
    cards: [
      {
        id: "twos-complement",
        kicker: "KERNREËL",
        title: "Negatiewe getalle: vaste bislengte, inverseer, tel een by",
        explanation: "Twee-komplement is die standaard manier om negatiewe heelgetalle in ’n vaste aantal bisse voor te stel. Hou die bislengte konstant: skryf eers +x, keer elke bis om, en tel 1 by. Die linkerbis wys dan die teken: 0 positief, 1 negatief.",
        sketch: ["+6 = 0110", "inverseer → 1001", "+ 0001     0001", "───────────────", "−6 = 1010"],
        exampleTitle: "Wys die −26 in 8 bisse",
        exampleSteps: ["+26 = 00011010.", "Inverseer elke bis: 11100101.", "Tel 1 by: 11100110. Dus −26 = 11100110₂."],
        check: "Het jy ’n voorste 0 by die positiewe vorm gevoeg voordat jy gekomplimenteer het?",
      },
      {
        id: "overflow",
        kicker: "KONTROLE",
        title: "Signed overflow: kyk na die tekens, nie net die dra-bis nie",
        explanation: "By getekende optelling is oorloop teenwoordig wanneer twee positiewe insette ’n negatiewe resultaat gee, of wanneer twee negatiewe insette ’n positiewe resultaat gee. ’n Dra uit die linkerkantste posisie is nie op sy eie ’n genoegsame oorlooptoets nie.",
        sketch: ["0111  (+7)", "+0001  (+1)", "──────", "1000  (lyk negatief)", "twee + → − = oorloop"],
        exampleTitle: "Wys die 4-bis oorloopvoorbeeld",
        exampleSteps: ["0111₂ stel +7 voor en 0001₂ stel +1 voor.", "Die 4-bis som is 1000₂, wat ’n negatiewe tekenbis het.", "Omdat die twee insette positief was, is daar signed overflow."],
        check: "Vergelyk altyd die tekens van beide insette met die teken van die resultaat.",
      },
      {
        id: "caq-m",
        kicker: "WERKVLIEG",
        title: "C–A–Q–M: toets Q₀, tel, skuif saam",
        explanation: "Die vermenigvuldigingsmetode werk met vier registers: C vir dra, A vir gedeeltelike antwoord, Q vir vermenigvuldiger en M vir vermenigvuldigtal. Elke ry begin deur Q₀ te toets. As Q₀ = 1, tel M by A; daarna skuif die gekombineerde C–A–Q-register een plek regs.",
        sketch: ["[ C |   A   |   Q   ]", "             ↑ Q₀", "Q₀ = 1 → A + M", "daarna: gekombineerde", "regs-skuif C–A–Q"],
        exampleTitle: "Wys die 0101 × 0011-voorbeeld",
        exampleSteps: ["Begin: C=0, A=0000, Q=0011, M=0101.", "Ry 1: Q₀=1, A+M=0101; skuif → C=0, A=0010, Q=1001.", "Herhaal die toets/tel/skuif-volgorde totdat vier skuiwe klaar is; finale A|Q = 0000 1111 = 15."],
        check: "Moet nooit die skuif voor die Q₀-toets doen nie; die toets bepaal die huidige ry se optelling.",
      },
      {
        id: "subtract-flow",
        kicker: "BLOKDIAGRAM",
        title: "Aftrek word optelling met twee-komplement",
        explanation: "Om A − B te bereken, vorm die twee-komplement van B en tel dit by A. In ’n registerdiagram volg jy die waardes deur elke blok: B na die komplimenteerder, plus 1 deur die SK, dan saam met A na die opteller. Die oorloop/dra-uitset moet ook aangedui word wanneer die vraag dit vra.",
        sketch: ["B → [komplimenteer] → [SK +1] ┐", "                               ├→ [opteller] → resultaat", "A ─────────────────────────────┘", "5 − 2 = 0101 + 1110 = 1 0011"],
        exampleTitle: "Wys die 5 − 2-registerpad",
        exampleSteps: ["A=0101 en B=0010.", "B se twee-komplement: 0010 → 1101 → 1110.", "Opteller: 0101 + 1110 = 1 0011; behou 0011 as die 4-bis antwoord."],
        check: "Skryf die invoer én die uitvoer van elke blok neer; die memo merk die pad, nie net 0011 nie.",
      },
    ],
  },
  {
    id: "le3",
    code: "LE3 / HF12 / VRAAG 3",
    title: "Digitale logika",
    points: 9,
    focus: "Logiese hekke, kombinasionele stroombane, optellers en wipkringe.",
    cards: [
      {
        id: "gates",
        kicker: "HEKPAD",
        title: "Teken Boole-uitdrukkings van binne na buite",
        explanation: "’n Hekskets moet die groepering van die uitdrukking respekteer. Teken eers ’n NOT-hek vir enige geïnverteerde veranderlike, bou dan die binneste AND/OR-operasie, en verbind die tussenuitsette laastens met die buitenste hek. ’n Waarheidstabel is jou vinnigste kontrole.",
        sketch: ["A ─┐", "   OR ─┐", "B ─┘    AND ─ Uit", "C ─ NOT ─┘"],
        exampleTitle: "Wys (A OF B) EN NIE C",
        exampleSteps: ["Laat A en B eers in ’n OR-hek ontmoet.", "Stuur C deur ’n NOT-hek om NIE C te vorm.", "Voer die twee tussenresultate na ’n AND-hek: (A+B)·C̅."],
        check: "Het jy die NOT op C toegepas voordat jy C met die OR-resultaat gekombineer het?",
      },
      {
        id: "adders",
        kicker: "KOMBINASIONEEL",
        title: "Halwe en voloptellers: som plus dra",
        explanation: "’n Halwe opteller tel twee insetbisse A en B. Sy Som-uitset is XOR en sy Dra-uitset is AND. ’n Volopteller sluit ’n dra-inset Cin in en kan opgebou word uit twee halwe optellers met ’n OR-hek vir die twee dra-uitsette.",
        sketch: ["A ─┐     ┌─ XOR → Som", "B ─┼→ HA ┤", "Cin ─┘   └─ AND/OR → Cout", "Som = A ⊕ B ⊕ Cin"],
        exampleTitle: "Wys die volopteller-vergelykings",
        exampleSteps: ["Eerste halwe opteller: A en B gee S₁ en C₁.", "Tweede halwe opteller: S₁ en Cin gee Som en C₂.", "Cout = C₁ OF C₂ = AB + ACin + BCin."],
        check: "Onthou: XOR gee 1 wanneer die relevante insette verskil; AND gee die dra vir ’n halwe opteller.",
      },
      {
        id: "flipflop",
        kicker: "TOESTAND",
        title: "Wipkringe onthou; kombinasionele logika onthou nie",
        explanation: "Kombinasionele stroombane se uitset hang slegs van die huidige insette af. ’n Wipkring of houwipkring gebruik terugvoer om ’n vorige toestand te behou totdat ’n toepaslike inset of klok dit verander. Dit is waarom registers uit veelvuldige wipkringe gebou kan word.",
        sketch: ["inset S/R → [wipkring] → Q", "                 ↑        │", "                 └────────┘", "terugvoer = toestand"],
        exampleTitle: "Wys die verskil in een sin",
        exampleSteps: ["AND(A,B) verander onmiddellik wanneer A of B verander.", "’n Houwipkring kan Q=1 hou selfs ná die stel-inset verdwyn.", "Gebruik die woord ‘toestand’ wanneer jy die verskil verduidelik."],
        check: "As die vraag oor geheue of vorige toestand praat, is ’n wipkring die relevante konsep.",
      },
    ],
  },
  {
    id: "le5",
    code: "LE5 / HF1 / VRAAG 4",
    title: "Basiese konsepte en IAS",
    points: 15,
    focus: "Struktuur/funksie, argitektuur/organisasie, IAS en geheueskyfies/modules.",
    sourceImage: "/manus-storage/le5-ias-struktuur_decb911b.png",
    sourceCaption: "Klasverwysing: IAS Struktuur I met geheue-, CPU- en toevoer/afvoerpaadjies.",
    cards: [
      {
        id: "structure-function",
        kicker: "GROOT PRENT",
        title: "Struktuur beskryf dele; funksie beskryf wat hulle doen",
        explanation: "’n Rekenaar se struktuur is die verhouding tussen die SVE, hoofgeheue, toevoer/afvoer en die verbindings tussen hulle. Funksie vra wat die stelsel doen: dataverwerking, datastoor, databeweging en beheer. Argitektuur is wat ’n programmeerder kan sien; organisasie is hoe die fisiese eenhede dit implementeer.",
        sketch: ["T/A ↔ [ SVE ] ↔ Geheue", "        │", "      beheer", "4 funksies: verwerk", "stoor · beweeg · beheer"],
        exampleTitle: "Wys argitektuur teenoor organisasie",
        exampleSteps: ["Instruksiestel en registertipes is deel van argitektuur.", "Datapaaie, beheerseine en konkrete hardewareverbindinge is organisasie.", "Antwoord met albei begrippe en een voorbeeld van elk."],
        check: "Vra: kan ’n programmeerder hierdie eienskap direk waarneem? Indien ja, dink eers aan argitektuur.",
      },
      {
        id: "ias-registers",
        kicker: "IAS-REGISTERPAD",
        title: "Ken elke register se rol voordat jy die vloei invul",
        explanation: "PC bevat die adres van die volgende instruksiewoord. MAR dra ’n geheue-adres. MBR dra die hele woord wat na of vanaf geheue beweeg. IR bevat die instruksie wat nou uitgevoer word, terwyl IBR die ander (gewoonlik regter) instruksie uit dieselfde 40-bis woord waghou. AC hou rekenkundige tussentydse resultate en MQ dien by vermenigvuldiging/deling.",
        sketch: ["PC ↓ MAR → M( ) → MBR", "                 ↙     ↘", "             IR (links) IBR (regs)", "AC ↔ MQ ↔ ALU"],
        exampleTitle: "Wys links teenoor regs in ’n woord",
        exampleSteps: ["Lees die 40-bis woord vanaf geheue na MBR.", "Stuur die regter 20-bis instruksie na IBR om te wag.", "Stuur die linker opcode na IR en sy adres na MAR vir die eerste uitvoering."],
        check: "Moenie IBR en IR omruil nie: IBR bêre die ander instruksie; IR hou die huidige instruksie.",
      },
      {
        id: "ias-memory-format",
        kicker: "40-BIS WOORD",
        title: "Die IAS-woord verdeel in twee 20-bis instruksies",
        explanation: "’n IAS-getalwoord het 40 bisse met ’n tekenbis links. ’n IAS-instruksiewoord bestaan uit ’n linker en regter instruksie van 20 bisse elk. Elke 20-bis instruksie verdeel in ’n 8-bis opcode en 12-bis adres. Hierdie merkers moet jy kan invul wanneer ’n tabel of diagram dit vra.",
        sketch: ["0 |──────── number word ────────| 39", "| opcode | address | opcode | address |", "0       8        20      28        39", "← links 20 →   ← regs 20 →"],
        exampleTitle: "Wys die geheueformaat",
        exampleSteps: ["Merk die linker grens 0 en die laaste bis 39.", "Plaas die skeiding by 20 vir die twee instruksies.", "Merk elke opcode as 8 bisse en elke adres as 12 bisse."],
        check: "Die regter instruksie begin by bis 20; sy opcode loop 20–27 en sy adres 28–39.",
      },
      {
        id: "memory-modules",
        kicker: "GEHEUE",
        title: "Skyfies en modules: kapasiteit kom uit adres- en databisse",
        explanation: "’n Geheueskyfie se aantal adresse word deur sy adreslyne bepaal: n adreslyne gee 2ⁿ adresse. Die databusse bepaal hoeveel bisse by elke adres gelees of geskryf word. Groter modules kombineer skyfies om meer woorde, wyer woorde, of albei te kry.",
        sketch: ["n adreslyne → 2ⁿ adresse", "m datalyne → m bis/woord", "kapasiteit = 2ⁿ × m", "skyfies in reeks / parallel"],
        exampleTitle: "Wys die kapasiteitsdenkpad",
        exampleSteps: ["Identifiseer eers hoeveel adreslyne die vraag gee.", "Bereken 2ⁿ adresse en vermenigvuldig met die biswydte per woord.", "Sê of die uitbreiding meer adresse, ’n wyer woord of albei lewer."],
        check: "Moenie adreslyne met databusse verwar nie: adresse kies ’n plek; datalyne dra die woord.",
      },
    ],
  },
  {
    id: "le6",
    code: "LE6 / HF2 / VRAAG 5",
    title: "Prestasie-kwessies",
    points: 10,
    focus: "Pyplyn, vertakkingvoorspelling, datavloei, superskalêr, spekulatief, meerkern en GPU.",
    sourceImage: "/manus-storage/le6-verwerkerprestasie_7697d0fb.png",
    sourceCaption: "Klasverwysing: verwerkerspoed en die relevante verbeteringstegnieke.",
    cards: [
      {
        id: "pipeline",
        kicker: "3 STADIA",
        title: "Pyplyn: GH, DE en UV oorvleuel in tyd",
        explanation: "Pyplynverwerking verhoog deurset deur verskillende instruksies gelyk in verskillende stadia te plaas: Gaan haal (GH), Dekodeer (DE), Uitvoer (UV). Die eerste instruksie neem steeds al drie stadia, maar nuwe instruksies kan daarna elke siklus begin—solank daar nie ’n gevaar is nie.",
        sketch: ["siklus:  1   2   3   4", "I1:     GH  DE  UV", "I2:         GH  DE  UV", "I3:             GH  DE  UV"],
        exampleTitle: "Wys die eerste drie instruksies",
        exampleSteps: ["Siklus 1: I1 is in GH.", "Siklus 2: I1 skuif na DE terwyl I2 in GH kom.", "Siklus 3: I1 is in UV, I2 in DE en I3 in GH."],
        check: "Vul die tabel diagonaal: elke instruksie beweeg elke siklus een kolom regs, tensy ’n vertraging voorkom.",
      },
      {
        id: "dependency",
        kicker: "DATA-GEVAAR",
        title: "Data-afhanklikheid: die verbruiker wag vir die verskaffer",
        explanation: "’n Instruksie wat ’n register lees wat ’n vroeëre instruksie eers gaan skryf, is data-afhanklik. In die TKA se taal kan die dekodeerder nie die afhanklike register opstel voordat die verskafferinstruksie se uitvoer voltooi is nie. ’n Vertraging/stall plaas wagtyd in die rooster.",
        sketch: ["mov eax,[a]  → skryf eax", "add ebx,eax  → lees eax", "                 ↑ wag", "DE vertraag tot UV klaar"],
        exampleTitle: "Wys ’n vertraging",
        exampleSteps: ["Identifiseer dat add ebx,eax die waarde uit die voorafgaande mov nodig het.", "Hou DE vir die verbruiker terug wanneer die waarde nog nie gereed is nie.", "Merk die leë UV-siklus/vertraging soos in die TKA-memo."],
        check: "Soek die bestemmingregister van die eerste instruksie in die bronregistere van die volgende een.",
      },
      {
        id: "branches",
        kicker: "VOORSPEL",
        title: "Vertakkingvoorspelling: tel foute en vermenigvuldig die straf",
        explanation: "By die vorige-resultaat voorspeller word die vorige werklike uitkoms as die volgende voorspelling gebruik. Jou tabel moet die werklike resultaat, voorspelling en Reg/Fout per GH-nommer wys. Die totale straf is die aantal foute maal die gegewe sikluskoste; voeg dit by die basis-siklusse vir die werklike tyd.",
        sketch: ["werklik:  N  V  V  V  N", "voorspel: N  N  V  V  V", "reg/fout: –  F  R  R  F", "straf = foute × 3"],
        exampleTitle: "Wys die TKA-berekening",
        exampleSteps: ["Skryf die eerste voorspelling neer soos die vraag dit gee.", "Skuif elke werklike resultaat een ry af om die volgende voorspelling te kry.", "Tel foute; by vier foute teen 3 siklusse is straf 12 siklusse."],
        check: "Moenie die eerste ry as ’n fout merk wanneer die vraag sê die eerste voorspelling is korrek nie.",
      },
      {
        id: "parallelism",
        kicker: "MEER DEURSET",
        title: "Superskalêr, spekulatief, meerkern en GPU—ken die verskil",
        explanation: "’n Superskalêre verwerker kan meer as een instruksie per siklus na verskillende uitvoeringseenhede uitstuur. Datavloei-analise soek onafhanklike instruksies; spekulatiewe verwerking voer voorspelbare paaie vooruit uit. Meerkern plaas verskeie algemene verwerkerskerne op ’n skyfie, terwyl ’n GPU baie eenvoudige parallelle berekeninge oor groot datastelle aanpak.",
        sketch: ["instruksies → [LSE] [RLE] [VVE]", " onafhanklik  ↘  ↓  ↙", "       parallel in een siklus", "meerkern ≠ GPU, maar albei parallel"],
        exampleTitle: "Wys die uitvoereenheid-kontrole",
        exampleSteps: ["Merk geheuebewegings as LSE, rekenkundige ADD/SUB as RLE en IMUL as VVE.", "Kies slegs instruksies wat onafhanklik is én verskillende eenhede gebruik vir gelyktydige uitvoering.", "Motiveer ook waarom die oorblywende instruksies moet wag."],
        check: "Parallel beteken nie bloot ‘meer as een’: daar mag geen data-afhanklikheid en geen eenheidsbotsing wees nie.",
      },
    ],
  },
];

export type AnswerRow = { id: string; item: string; prompt: string; answer: string; explanation: string };

export type InteractivePaper = {
  id: string;
  title: string;
  type: "HA1" | "PROEF";
  q1Rows: AnswerRow[];
  q4: { memory: string; pc: string; left: string; right: string; rows: AnswerRow[]; finalAnswer: string; explanation: string };
  q5: { instructions: string[]; pipelineAnswer: string[][]; branchRows: { actual: string; predicted: string; result: string }[]; branchPenalty: number; branchCost: number; explanation: string };
  practical: string;
};

const commonPipeline = [
  ["mov eax, [a]", "", ""],
  ["add ebx, eax", "mov eax, [a]", ""],
  ["sub ecx, ebx", "add ebx, eax", "mov eax, [a]"],
  ["mov edx, [b]", "sub ecx, ebx", "add ebx, eax"],
  ["imul esi, edx", "mov edx, [b]", "sub ecx, ebx"],
  ["add edi, esi", "imul esi, edx", "mov edx, [b]"],
  ["", "add edi, esi", "imul esi, edx"],
  ["", "", "add edi, esi"],
];

export const interactivePapers: InteractivePaper[] = [
  {
    id: "ha1-1", title: "Oefen-HA1 1", type: "HA1",
    q1Rows: [
      { id: "a", item: "(a)", prompt: "Skakel 44₁₀ om na heksadesimaal.", answer: "2C", explanation: "44 ÷ 16 gee 2 met res 12; 12 word C in heksadesimaal. Dus 2C₁₆." },
      { id: "b", item: "(b)", prompt: "Skakel 157₁₀ om na 8-bis binêr.", answer: "10011101", explanation: "157 = 128 + 16 + 8 + 4 + 1, dus 1 0 0 1 1 1 0 1." },
      { id: "c", item: "(c)", prompt: "Skakel 0110 0000₂ om na desimaal.", answer: "96", explanation: "Die 1-bisse is 64 en 32: 64 + 32 = 96." },
      { id: "d", item: "(d)", prompt: "Skakel 10 1010.111₂ om na desimaal.", answer: "42.875", explanation: "42 kom van 32+8+2; .111₂ = 0,5+0,25+0,125 = 0,875." },
    ],
    q4: { memory: "M(1000)=3; M(1001)=2", pc: "0", left: "LOAD M(1000)", right: "ADD M(1001)", rows: [
      { id: "fetch", item: "1", prompt: "Eerste geheuelees", answer: "MAR←PC;MBR←M(MAR)", explanation: "PC se adres gaan eers na MAR; die geheuewoord kom dan in MBR." },
      { id: "left", item: "2", prompt: "Linker instruksie", answer: "IR←LOAD;MAR←1000", explanation: "Die linker opcode word IR; sy adresveld word MAR. Die regter instruksie gaan na IBR." },
      { id: "execute", item: "3", prompt: "Uitvoer van LOAD", answer: "AC←3", explanation: "Die operand by M(1000) word gelees en AC kry 3." },
      { id: "right", item: "4", prompt: "Regter instruksie en finale AC", answer: "AC←5", explanation: "IBR stuur ADD na IR/MAR; M(1001)=2 word by AC=3 getel." },
    ], finalAnswer: "5", explanation: "Die linker LOAD vul AC met 3. Die regter ADD haal 2 en lewer AC=5." },
    q5: { instructions: ["mov eax, [a]", "add ebx, eax", "sub ecx, ebx", "mov edx, [b]", "imul esi, edx", "add edi, esi"], pipelineAnswer: commonPipeline, branchRows: [
      { actual: "N", predicted: "N", result: "—" }, { actual: "V", predicted: "N", result: "Fout" }, { actual: "V", predicted: "V", result: "Reg" }, { actual: "N", predicted: "V", result: "Fout" }, { actual: "N", predicted: "N", result: "Reg" }, { actual: "V", predicted: "N", result: "Fout" }, { actual: "V", predicted: "V", result: "Reg" }, { actual: "V", predicted: "V", result: "Reg" },
    ], branchPenalty: 9, branchCost: 3, explanation: "Daar is drie foute. Met 3 siklusse per fout is die totale straf 3 × 3 = 9 siklusse." },
    practical: "Vra drie positiewe heelgetalle A, B en C. Vertoon A+B+C, A×B, die heelgetal-kwosiënt en modulus van (A×B)÷C, en die heelgetalgemiddeld.",
  },
  {
    id: "ha1-2", title: "Oefen-HA1 2", type: "HA1",
    q1Rows: [
      { id: "a", item: "(a)", prompt: "Skakel 58₁₀ om na 8-bis binêr.", answer: "00111010", explanation: "58 = 32+16+8+2, dus 00111010₂." },
      { id: "b", item: "(b)", prompt: "Skakel 1010 1101₂ om na desimaal.", answer: "173", explanation: "128+32+8+4+1 = 173." },
      { id: "c", item: "(c)", prompt: "Skakel 1101 0110₂ om na desimaal.", answer: "214", explanation: "128+64+16+4+2 = 214." },
      { id: "d", item: "(d)", prompt: "Skakel 11010₂ om na desimaal.", answer: "26", explanation: "16+8+2 = 26." },
    ],
    q4: { memory: "M(1010)=12; M(1011)=5", pc: "0", left: "LOAD M(1010)", right: "SUB M(1011)", rows: [
      { id: "fetch", item: "1", prompt: "Eerste geheuelees", answer: "MAR←PC;MBR←M(MAR)", explanation: "Volg altyd PC→MAR voor ’n geheuelees na MBR." },
      { id: "left", item: "2", prompt: "Linker instruksie", answer: "IR←LOAD;MAR←1010", explanation: "Die linker instruksie word eerste uitgevoer; die regter SUB bly in IBR." },
      { id: "execute", item: "3", prompt: "Uitvoer van LOAD", answer: "AC←12", explanation: "M(1010) word na MBR gelees en dan na AC geplaas." },
      { id: "right", item: "4", prompt: "Regter instruksie en finale AC", answer: "AC←7", explanation: "Die regter SUB lees M(1011)=5; 12−5 gee AC=7." },
    ], finalAnswer: "7", explanation: "Die twee instruksies deel een geheuewoord: LOAD gee AC=12 en SUB gee AC=7." },
    q5: { instructions: ["mov eax, [x]", "add ecx, eax", "mov ebx, [y]", "sub edx, ebx", "imul esi, ecx", "add edi, esi"], pipelineAnswer: commonPipeline, branchRows: [
      { actual: "V", predicted: "V", result: "—" }, { actual: "V", predicted: "V", result: "Reg" }, { actual: "N", predicted: "V", result: "Fout" }, { actual: "N", predicted: "N", result: "Reg" }, { actual: "V", predicted: "N", result: "Fout" }, { actual: "N", predicted: "V", result: "Fout" }, { actual: "V", predicted: "N", result: "Fout" }, { actual: "V", predicted: "V", result: "Reg" },
    ], branchPenalty: 12, branchCost: 3, explanation: "Vier verkeerde voorspellings gee 4 × 3 = 12 strafsiklusse." },
    practical: "Vra twee positiewe heelgetalle A en B. Bepaal met CMP en ’n voorwaardelike sprong die grootste waarde; vertoon ook die som, A−B en produk.",
  },
  {
    id: "ha1-3", title: "Oefen-HA1 3", type: "HA1",
    q1Rows: [
      { id: "a", item: "(a)", prompt: "Skakel 0011 1111₂ om na desimaal.", answer: "63", explanation: "32+16+8+4+2+1 = 63." },
      { id: "b", item: "(b)", prompt: "Skakel 214₁₀ om na 8-bis binêr.", answer: "11010110", explanation: "214 = 128+64+16+4+2, dus 11010110₂." },
      { id: "c", item: "(c)", prompt: "Skakel BAD₁₆ om na desimaal.", answer: "2989", explanation: "B×16² + A×16 + D = 11×256 + 10×16 + 13 = 2989." },
      { id: "d", item: "(d)", prompt: "Skakel 14,5625₁₀ om na binêr.", answer: "1110.1001", explanation: "14=1110₂ en 0,5625 vorm die breukbisse 1001." },
    ],
    q4: { memory: "M(1020)=7; M(1021)=6", pc: "0", left: "LOAD M(1020)", right: "ADD M(1021)", rows: [
      { id: "fetch", item: "1", prompt: "Eerste geheuelees", answer: "MAR←PC;MBR←M(MAR)", explanation: "Die eerste woord word via MAR uit geheue na MBR gebring." },
      { id: "left", item: "2", prompt: "Linker instruksie", answer: "IR←LOAD;MAR←1020", explanation: "Die linker LOAD word na IR/MAR gestuur; die regter ADD wag in IBR." },
      { id: "execute", item: "3", prompt: "Uitvoer van LOAD", answer: "AC←7", explanation: "M(1020) het 7, dus kry AC eers 7." },
      { id: "right", item: "4", prompt: "Regter instruksie en finale AC", answer: "AC←13", explanation: "Die regter ADD gebruik M(1021)=6; 7+6=13." },
    ], finalAnswer: "13", explanation: "Die finale waarde in AC is 13 nadat LOAD en ADD albei uitgevoer is." },
    q5: { instructions: ["mov eax, [num1]", "mov ebx, [num2]", "add ecx, eax", "sub edx, ebx", "imul esi, ecx", "add edi, esi"], pipelineAnswer: commonPipeline, branchRows: [
      { actual: "N", predicted: "N", result: "—" }, { actual: "N", predicted: "N", result: "Reg" }, { actual: "V", predicted: "N", result: "Fout" }, { actual: "V", predicted: "V", result: "Reg" }, { actual: "V", predicted: "V", result: "Reg" }, { actual: "N", predicted: "V", result: "Fout" }, { actual: "V", predicted: "N", result: "Fout" }, { actual: "N", predicted: "V", result: "Fout" },
    ], branchPenalty: 12, branchCost: 3, explanation: "Vier foute teen drie siklusse elk gee 12 strafsiklusse." },
    practical: "Vra ’n positiewe heelgetal N. Bereken en vertoon die som van 1 tot N met registers, ’n vergelyking, ’n lus en ’n toepaslike sprong.",
  },
  {
    id: "proef-a", title: "Proef-HA1 A", type: "PROEF",
    q1Rows: [
      { id: "a", item: "(a)", prompt: "93₁₀ na binêr en heksadesimaal.", answer: "01011101;5D", explanation: "93=64+16+8+4+1=01011101₂. Groepeer as 0101 1101 → 5D₁₆." },
      { id: "b", item: "(b)", prompt: "EA₁₆ na binêr en desimaal.", answer: "11101010;234", explanation: "E=1110 en A=1010. Desimaal: 14×16+10=234." },
      { id: "c", item: "(c)", prompt: "19,375₁₀ na binêr.", answer: "10011.011", explanation: "19=10011₂ en 0,375=0,011₂." },
      { id: "d", item: "(d)", prompt: "0111 1110₂ na desimaal.", answer: "126", explanation: "64+32+16+8+4+2=126." },
    ],
    q4: { memory: "M(120)=8; M(121)=6", pc: "0", left: "LOAD M(120)", right: "ADD M(121)", rows: [
      { id: "fetch", item: "1", prompt: "Eerste geheuelees", answer: "MAR←PC;MBR←M(MAR)", explanation: "PC plaas die woordadres in MAR; geheue plaas die woord in MBR." },
      { id: "left", item: "2", prompt: "Linker instruksie", answer: "IR←LOAD;MAR←120", explanation: "IBR hou die regter ADD terwyl LOAD M(120) na IR/MAR gaan." },
      { id: "execute", item: "3", prompt: "Uitvoer van LOAD", answer: "AC←8", explanation: "Die operand M(120)=8 word in AC gelaai." },
      { id: "right", item: "4", prompt: "Regter instruksie en finale AC", answer: "AC←14", explanation: "ADD M(121) voeg 6 by die bestaande AC van 8." },
    ], finalAnswer: "14", explanation: "Die finale AC-waarde is 14." },
    q5: { instructions: ["mov eax, [a]", "add ebx, eax", "mov ecx, [b]", "sub edx, ecx", "imul esi, edx", "add edi, esi"], pipelineAnswer: commonPipeline, branchRows: [
      { actual: "N", predicted: "N", result: "—" }, { actual: "V", predicted: "N", result: "Fout" }, { actual: "N", predicted: "V", result: "Fout" }, { actual: "N", predicted: "N", result: "Reg" }, { actual: "V", predicted: "N", result: "Fout" }, { actual: "V", predicted: "V", result: "Reg" }, { actual: "N", predicted: "V", result: "Fout" }, { actual: "V", predicted: "N", result: "Fout" },
    ], branchPenalty: 15, branchCost: 3, explanation: "Vyf foute × 3 siklusse = 15 strafsiklusse." },
    practical: "Skryf ’n NASM-program wat 5 heelgetalle in ’n DWORD-array lees, die som bereken, tel hoeveel positief is en die heelgetalgemiddeld vertoon.",
  },
  {
    id: "proef-b", title: "Proef-HA1 B", type: "PROEF",
    q1Rows: [
      { id: "a", item: "(a)", prompt: "175₁₀ na binêr en heksadesimaal.", answer: "10101111;AF", explanation: "175=128+32+8+4+2+1=10101111₂=AF₁₆." },
      { id: "b", item: "(b)", prompt: "C3₁₆ na binêr en desimaal.", answer: "11000011;195", explanation: "C=1100, 3=0011; 12×16+3=195." },
      { id: "c", item: "(c)", prompt: "45,625₁₀ na binêr.", answer: "101101.101", explanation: "45=101101₂ en 0,625=0,101₂." },
      { id: "d", item: "(d)", prompt: "1000 1111₂ na desimaal.", answer: "143", explanation: "128+8+4+2+1=143." },
    ],
    q4: { memory: "M(220)=15; M(221)=9", pc: "0", left: "LOAD M(220)", right: "SUB M(221)", rows: [
      { id: "fetch", item: "1", prompt: "Eerste geheuelees", answer: "MAR←PC;MBR←M(MAR)", explanation: "Begin altyd met die woordadres uit PC." },
      { id: "left", item: "2", prompt: "Linker instruksie", answer: "IR←LOAD;MAR←220", explanation: "Die linker LOAD word nou gekies; die regter SUB wag in IBR." },
      { id: "execute", item: "3", prompt: "Uitvoer van LOAD", answer: "AC←15", explanation: "M(220) bevat 15, daarom kry AC 15." },
      { id: "right", item: "4", prompt: "Regter instruksie en finale AC", answer: "AC←6", explanation: "SUB M(221) trek 9 van 15 af." },
    ], finalAnswer: "6", explanation: "Die finale AC-waarde is 6." },
    q5: { instructions: ["mov eax, [x]", "add ebx, eax", "imul ecx, edx", "jp label", "mov esi, [y]", "sub edi, esi"], pipelineAnswer: commonPipeline, branchRows: [
      { actual: "V", predicted: "V", result: "—" }, { actual: "N", predicted: "V", result: "Fout" }, { actual: "N", predicted: "N", result: "Reg" }, { actual: "V", predicted: "N", result: "Fout" }, { actual: "V", predicted: "V", result: "Reg" }, { actual: "N", predicted: "V", result: "Fout" }, { actual: "N", predicted: "N", result: "Reg" }, { actual: "V", predicted: "N", result: "Fout" },
    ], branchPenalty: 12, branchCost: 3, explanation: "Vier voorspellings is verkeerd: 4 × 3 = 12 strafsiklusse." },
    practical: "Skryf ’n NASM-program met ’n menu: voeg ’n waarde by ’n DWORD-array, vertoon die waardes, vind die grootste waarde, of verlaat. Hou rekord van die aantal waardes.",
  },
];

export const theoryPapers = [
  {
    id: "teorie-a", title: "Teorie-oefenvraestel A", total: 60,
    questions: [
      { id: "a1", unit: "LE1", marks: 4, prompt: "Waarom is 1 heksadesimale syfer gelyk aan 4 bisse?", options: ["Omdat 2⁴ = 16 moontlike waardes", "Omdat 4 ÷ 2 = 2", "Omdat elke bis 4 waardes het", "Omdat heksadesimaal net 4 syfers gebruik"], answer: 0, explanation: "Vier bisse gee 16 kombinasies (0–15), presies die omvang van een hex-syfer." },
      { id: "a2", unit: "LE2", marks: 6, prompt: "Watter patroon bewys signed overflow tydens optelling?", options: ["Dra-bis is 1", "Twee insette met dieselfde teken gee ’n resultaat met die teenoorgestelde teken", "Enige negatiewe resultaat", "Meer as vier bisse in die som"], answer: 1, explanation: "Signed overflow gaan oor die onmoontlike tekenverandering wanneer twee insette dieselfde teken het." },
      { id: "a3", unit: "LE3", marks: 5, prompt: "Wat is die Som-uitset van ’n halwe opteller?", options: ["A AND B", "A OR B", "A XOR B", "NOT A"], answer: 2, explanation: "XOR is 1 wanneer A en B verskil—dit is presies die som-bis sonder ’n dra-inset." },
      { id: "a4", unit: "LE5", marks: 7, prompt: "Watter register hou die instruksie wat tans uitgevoer word?", options: ["PC", "MAR", "IBR", "IR"], answer: 3, explanation: "IR is die Instruction Register. IBR hou die ander instruksie uit die huidige woord." },
      { id: "a5", unit: "LE5", marks: 8, prompt: "Wat is die korrekte eerste geheuepad wanneer IBR leeg is?", options: ["PC→MAR; MBR←M(MAR)", "AC→MQ; IR→IBR", "MBR→PC; MAR→IR", "MAR→PC; AC→MBR"], answer: 0, explanation: "PC lewer die volgende woordadres aan MAR; die geheuewoord word in MBR gelees." },
      { id: "a6", unit: "LE6", marks: 8, prompt: "Waarom ontstaan ’n data-afhanklikheid in ’n pyplyn?", options: ["Die verbruiker benodig ’n resultaat wat die verskaffer nog nie in UV voltooi het nie", "Daar is te veel geheue", "Die instruksie het geen register nie", "Die vertakking is altyd korrek"], answer: 0, explanation: "Die dekodeerder kan nie die afhanklike register korrek opstel voordat die verskaffer se uitvoer beskikbaar is nie." },
      { id: "a7", unit: "LE6", marks: 10, prompt: "Watter kombinasie kan gelyktydig uitvoer in ’n superskalêre verwerker?", options: ["Twee afhanklike RLE-instruksies", "Onafhanklike instruksies op verskillende uitvoeringseenhede", "Enige twee instruksies wat langs mekaar staan", "Slegs twee vertakkings"], answer: 1, explanation: "Jy benodig sowel geen data-afhanklikheid as beskikbare, verskillende uitvoeringseenhede." },
      { id: "a8", unit: "LE6", marks: 12, prompt: "Hoe bereken jy vertakkingstraf?", options: ["Aantal regte × sikluskoste", "Totale vertakkings ÷ sikluskoste", "Aantal foute × sikluskoste", "Basis-siklusse − foute"], answer: 2, explanation: "Tel eers die fout-rye in die voorspeltabel, en vermenigvuldig dit met die gegewe straf per fout." },
    ],
  },
  {
    id: "teorie-b", title: "Teorie-oefenvraestel B", total: 60,
    questions: [
      { id: "b1", unit: "LE1", marks: 5, prompt: "Watter metode is korrek vir ’n desimale breukdeel na binêr?", options: ["Deel deur 16", "Vermenigvuldig die breukdeel herhaaldelik met 2", "Lees die reste van onder na bo", "Tel ’n vaste 1 by"], answer: 1, explanation: "Breukdele gebruik herhaalde vermenigvuldiging met 2; lees die heelgetaldele van bo na onder." },
      { id: "b2", unit: "LE2", marks: 6, prompt: "Wat doen jy eerste in C–A–Q–M-vermenigvuldiging?", options: ["Skuif regs", "Toets Q₀", "Tel M by Q", "Stel AC na 1"], answer: 1, explanation: "Elke ry begin met Q₀. Slegs by Q₀=1 tel jy M by A voordat jy skuif." },
      { id: "b3", unit: "LE2", marks: 7, prompt: "Hoekom hou jy bislengte konstant in twee-komplement?", options: ["Om die teken en getalreeks eenduidig te hou", "Om die antwoord altyd positief te maak", "Omdat heksadesimaal dit vereis", "Om die dra-bis te verwyder"], answer: 0, explanation: "Die linker tekenbis en die representasie se reeks hang direk van die vaste aantal bisse af." },
      { id: "b4", unit: "LE3", marks: 7, prompt: "Watter stelling onderskei ’n wipkring van kombinasionele logika?", options: ["’n Wipkring het geen uitset nie", "’n Wipkring behou toestand deur terugvoer", "Kombinasionele logika gebruik altyd ’n klok", "’n Wipkring kan nie hekke gebruik nie"], answer: 1, explanation: "Terugvoer laat die wipkring ’n toestand behou; kombinasionele uitsette volg slegs die huidige insette." },
      { id: "b5", unit: "LE5", marks: 8, prompt: "Wat is die korrekte beskrywing van IBR?", options: ["Huidige instruksie", "Adres van volgende woord", "Die ander instruksie uit dieselfde geheuewoord", "Rekenkundige resultaat"], answer: 2, explanation: "IR bevat die huidige instruksie; IBR hou die regter/ander instruksie om ’n ekstra geheuelees te vermy." },
      { id: "b6", unit: "LE5", marks: 8, prompt: "Wat bepaal hoeveel geheueadresse ’n skyfie kan kies?", options: ["Databusse", "Adreslyne: n lyne gee 2ⁿ adresse", "Die AC-register", "Die opcodewydte"], answer: 1, explanation: "Adreslyne kies liggings. Databusse bepaal hoe wyd elke woord is." },
      { id: "b7", unit: "LE6", marks: 9, prompt: "Wat beskryf spekulatiewe verwerking die beste?", options: ["Voer slegs voltooide instruksies uit", "Werk vooruit op ’n waarskynlike pad voor die uitkoms seker is", "Skakel die pyplyn af", "Gebruik net ’n GPU"], answer: 1, explanation: "Die verwerker probeer reeds die waarskynlike pad uitvoer; ’n verkeerde voorspelling vereis herstelwerk." },
      { id: "b8", unit: "LE6", marks: 10, prompt: "Watter taak pas die beste by ’n GPU?", options: ["Een lang, sterk afhanklike instruksiestroom", "Baie soortgelyke berekeninge oor groot parallelle data", "Slegs geheue-adresse", "Instruksies met geen data nie"], answer: 1, explanation: "GPU’s blink uit waar dieselfde tipe berekening oor baie data-elemente herhaal kan word." },
    ],
  },
];
