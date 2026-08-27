/**
 * Ingenieurswerkboek-rigting: oorspronklike oefenvraestelle volg die gebruiker
 * se 6-vraag, 2-uur, 75-punt HA1-struktuur. Elke vraag toets die gedeelde
 * leereenheidvaardighede sonder om ’n opgelaaide vraag te dupliseer.
 */
export type GeneratedPaper = {
  id: string;
  title: string;
  focus: string;
  questions: Array<{
    number: string;
    title: string;
    marks: number;
    prompt: string;
    guide: string;
  }>;
};

export const generatedPapers: GeneratedPaper[] = [
  {
    id: "proef-a",
    title: "Proefvraestel A",
    focus: "Omskakeling, twee-komplement, IAS-LOAD/ADD en vertakkingvoorspelling.",
    questions: [
      {
        number: "Vraag 1",
        title: "LE1 — Getallestelsels",
        marks: 5,
        prompt: "Voltooi: (a) 93₁₀ = ______₂ = ______₁₆; (b) 1110 1010₂ = ______₁₀ = ______₁₆; (c) 19,375₁₀ = ______₂.",
        guide: "Kontrole: 93₁₀ = 0101 1101₂ = 5D₁₆; 1110 1010₂ = 234₁₀ = EA₁₆; 19,375₁₀ = 10011,011₂.",
      },
      {
        number: "Vraag 2",
        title: "LE2 — Rekenaarrekenkunde",
        marks: 21,
        prompt: "(a) Bereken 0101 1011 + 0010 1101 as getekende 8-bis getalle en motiveer oorloop. (b) Skryf −37 en −104 in 8-bis twee-komplement. (c) Voltooi C–A–Q–M vir 0110 × 0101. (d) Gebruik die registervloei vir 6−3. (e) Toets 1000 + 1111 vir signed overflow.",
        guide: "Kontrole: (a) 1000 1000 met signed overflow; (b) −37 = 1101 1011 en −104 = 1001 1000; (c) produk = 0001 1110₂ = 30₁₀; (d) 0110 + 1101 = 1 0011 → 0011; (e) ja—twee negatiewe getalle gee ’n positiewe resultaat.",
      },
      {
        number: "Vraag 3",
        title: "LE3 — Digitale logika",
        marks: 9,
        prompt: "Teken ’n hekdiagram vir (A EN B) OF (NIE C). Voltooi die halwe-opteller waarheidstabel. Gee die Som- en Cout-vergelykings vir ’n volopteller. Verduidelik kortliks waarom ’n houwipkring geheue het.",
        guide: "Werk van binne na buite: AND(A,B) en NOT(C) voer na OR. Halwe opteller: Som=A XOR B; Dra=A AND B. ’n Houwipkring behou sy uitset/toestand totdat insette dit verander.",
      },
      {
        number: "Vraag 4",
        title: "LE5 — IAS-rekenaar",
        marks: 15,
        prompt: "M(0) bevat links LOAD M(120) en regs ADD M(121). Gegee M(120)=8, M(121)=6 en PC=0: vul die relevante PC-, MAR-, MBR-, IBR-, IR- en AC-stappe in. Wys duidelik wanneer geheue lees aktief is.",
        guide: "Kontrole: PC→MAR; MBR←M(MAR); IBR kry die regter instruksie; IR kry LOAD; MBR←M(120); AC←8; IR←IBR; MBR←M(121); AC←8+6=14. Elke geheuelees loop via MAR en MBR.",
      },
      {
        number: "Vraag 5",
        title: "LE6 — Prestasie",
        marks: 10,
        prompt: "Bou ’n GH→DE→UV-tabel vir mov eax,[a]; add ebx,eax; mov ecx,[b]; sub edx,ecx. Onderstreep afhanklikhede. Vir die vertakkings N V N N V V N V, gebruik die vorige resultaat as voorspelling; die eerste voorspelling is korrek. Elke fout kos 3 siklusse.",
        guide: "Kontrole: add ebx,eax is afhanklik van die eerste mov; sub edx,ecx is afhanklik van die derde instruksie. Die voorspeller maak 5 foute: totale straf = 15 siklusse.",
      },
      {
        number: "Vraag 6",
        title: "Prakties 1–3",
        marks: 15,
        prompt: "Skryf ’n NASM-program wat 5 heelgetalle in ’n DWORD-array lees, die som bereken, tel hoeveel positief is en die heelgetalgemiddeld vertoon. Gebruik ’n lus, CMP en toepaslike spronge.",
        guide: "Beplan eers: data/declarations → teller en som → invoerlus → positiewe-teller → deling vir gemiddelde → uitvoer. Gebruik ’n offset van 4 grepe per DWORD-element.",
      },
    ],
  },
  {
    id: "proef-b",
    title: "Proefvraestel B",
    focus: "Breuk-omskakeling, vermenigvuldiging, IAS-LOAD/SUB en superskalêre denke.",
    questions: [
      {
        number: "Vraag 1",
        title: "LE1 — Getallestelsels",
        marks: 5,
        prompt: "Voltooi: (a) 175₁₀ = ______₂ = ______₁₆; (b) C3₁₆ = ______₂ = ______₁₀; (c) 45,625₁₀ = ______₂.",
        guide: "Kontrole: 175₁₀ = 1010 1111₂ = AF₁₆; C3₁₆ = 1100 0011₂ = 195₁₀; 45,625₁₀ = 101101,101₂.",
      },
      {
        number: "Vraag 2",
        title: "LE2 — Rekenaarrekenkunde",
        marks: 21,
        prompt: "(a) Bereken 0111 1100 + 0000 0110 as getekende 8-bis getalle. (b) Skryf −18 en −91 in 8-bis twee-komplement. (c) Voltooi C–A–Q–M vir 0100 × 0111. (d) Vul die registervloei vir 7−4. (e) Toets 0111 + 0010 vir 4-bis signed overflow.",
        guide: "Kontrole: (a) 1000 0010 met signed overflow; (b) −18 = 1110 1110 en −91 = 1010 0101; (c) produk = 0001 1100₂ = 28₁₀; (d) 0111 + 1100 = 1 0011 → 0011; (e) ja—twee positiewe insette gee ’n negatiewe resultaat.",
      },
      {
        number: "Vraag 3",
        title: "LE3 — Digitale logika",
        marks: 9,
        prompt: "Teken ’n hekdiagram vir NIE((A OF B) EN C). Voltooi die halwe-opteller tabel. Gee die volopteller-uitdrukking vir Cout en vergelyk kombinasionele logika met ’n wipkring.",
        guide: "Die binnekant word eers gebou: OR(A,B), dan AND met C, dan NOT. Cout=AB+ACin+BCin. Kombinasionele logika het geen gestoor toestand nie; ’n wipkring wel.",
      },
      {
        number: "Vraag 4",
        title: "LE5 — IAS-rekenaar",
        marks: 15,
        prompt: "M(0) bevat links LOAD M(220) en regs SUB M(221). Gegee M(220)=15, M(221)=9 en PC=0: vul die gaan-haal- en uitvoerstappe in en wys die finale AC-waarde.",
        guide: "Kontrole: volg PC→MAR→MBR; stoor die regter instruksie in IBR; voer LOAD uit en kry AC=15; haal die regter instruksie uit IBR; lees M(221); voer SUB uit en kry AC=6.",
      },
      {
        number: "Vraag 5",
        title: "LE6 — Prestasie",
        marks: 10,
        prompt: "Benoem die uitvoeringseenheid vir: mov eax,[x]; add ebx,eax; imul ecx,edx; jp label. Dui aan wat kan parallel loop en wat data-afhanklik moet wag. Vir V N N V N V V N, bereken die straf met die vorige-resultaat voorspeller en 3 siklusse per fout.",
        guide: "Kontrole: mov=LSE; add=RLE; imul=VVE; jp=VE. add wag vir eax indien die mov nog nie voltooi is nie; onafhanklike instruksies op verskillende eenhede kan saamloop. Die vertakkingstraf is 15 siklusse.",
      },
      {
        number: "Vraag 6",
        title: "Prakties 1–3",
        marks: 15,
        prompt: "Skryf ’n NASM-program met ’n menu: 1) voeg ’n waarde by ’n DWORD-array, 2) vertoon die waardes, 3) vind die grootste waarde, 4) verlaat. Hou rekord van hoeveel waardes reeds ingevoer is.",
        guide: "Merk volgens ’n werkende menu, CMP/JMP-keuses, ’n korrekte array-indeks en lus, behoud van die teller, en duidelike uitvoer. Hanteer die geval waar die array nog leeg is.",
      },
    ],
  },
];
