/**
 * Ingenieurswerkboek-rigting: leerhulpbronne gebruik uitgelêde registerpaaie,
 * waarheidstabelle en klikbare sketsblokke in plaas van abstrakte blou tekskaarte.
 */
import { Check, CircleHelp, RotateCcw, TriangleAlert } from "lucide-react";
import { useState } from "react";

function normalise(value: string) {
  return value.toUpperCase().replaceAll(" ", "").replaceAll(",", ".").trim();
}

function Feedback({ correct, explanation }: { correct: boolean; explanation: string }) {
  return <span className={correct ? "summary-feedback summary-feedback--correct" : "summary-feedback summary-feedback--wrong"}>{correct ? <Check className="size-3.5" /> : <TriangleAlert className="size-3.5" />}{correct ? "Korrek." : explanation}</span>;
}

export function LearningSketch({ id, lines }: { id: string; lines: string[] }) {
  if (id === "decimal-binary") return <div className="learning-visual binary-columns" aria-label="Deelmetode vir desimaal na binêr"><div><b>Deel deur 2</b><span>13 ÷ 2 = 6</span><span>6 ÷ 2 = 3</span><span>3 ÷ 2 = 1</span><span>1 ÷ 2 = 0</span></div><div><b>Res</b><span>1</span><span>0</span><span>1</span><span>1</span></div><div className="binary-columns__answer"><b>Lees op</b><strong>1101₂</strong></div></div>;
  if (id === "hex-binary") return <div className="learning-visual hex-groups"><div><span>2</span><span>C</span><i>₁₆</i></div><b>↓ elke syfer kry 4 bisse</b><div><span>0010</span><span>1100</span><i>₂</i></div></div>;
  if (id === "binary-fraction") return <div className="learning-visual fraction-steps"><div><span>0,625 × 2</span><b>1,25 → 1</b></div><div><span>0,25 × 2</span><b>0,5 → 0</b></div><div><span>0,5 × 2</span><b>1,0 → 1</b></div><strong>0,101₂</strong></div>;
  if (id === "twos-complement") return <div className="learning-visual aligned-operation"><span>+6</span><b>0110</b><i>inverseer</i><b>1001</b><i>tel 1 by</i><b>+0001</b><em>−6 = 1010</em></div>;
  if (id === "overflow") return <div className="learning-visual aligned-operation"><span>+7</span><b>0111</b><span>+1</span><b>0001</b><i>────</i><b className="visual-warn">1000</b><em>twee + insette → − resultaat</em></div>;
  if (id === "caq-m") return <div className="learning-visual caqm-visual"><div className="caq-row"><span>C</span><span>A</span><span>Q</span><span>M</span></div><div className="caq-row caq-row--value"><b>0</b><b>0000</b><b>0011</b><b>0101</b></div><p>Toets <b>Q₀</b> → tel M by A indien Q₀=1 → skuif <b>C-A-Q</b> regs.</p><div className="caq-arrow">C ─ A ─ Q&nbsp;&nbsp; ⇢ &nbsp;&nbsp;regs-skuif</div></div>;
  if (id === "subtract-flow") return <div className="learning-visual subtract-visual"><div className="subtract-visual__top"><span>B = 0010</span><i>→</i><span>Komplimenteerder</span><i>→</i><span>SK +1</span></div><div className="subtract-visual__bottom"><span>A = 0101</span><i>───────────────────┐</i><b>Opteller</b><strong>0011</strong></div></div>;
  if (id === "gates") return <GateFlow />;
  if (id === "adders") return <AdderVisual />;
  if (id === "flipflop") return <FlipFlopVisual />;
  if (id === "ias-memory-format") return <IasWordVisual />;
  if (id === "ias-registers") return <div className="learning-visual ias-register-flow"><span>PC</span><i>↓</i><span>MAR</span><i>→</i><span>M( )</span><i>→</i><span>MBR</span><div><b>IR</b><em>← linker</em><b>IBR</b><em>← regter</em></div><strong>AC ↔ MQ</strong></div>;
  if (id === "structure-function") return <div className="learning-visual system-map"><span>Toevoer</span><i>↔</i><b>SVE</b><i>↔</i><span>Geheue</span><i>↔</i><span>Afvoer</span><small>Verwerk · Stoor · Beweeg · Beheer</small></div>;
  if (id === "memory-modules") return <div className="learning-visual memory-maths"><div><span>n adreslyne</span><b>2ⁿ adresse</b></div><i>×</i><div><span>m datalyne</span><b>m bis/woord</b></div><strong>kapasiteit = 2ⁿ × m</strong></div>;
  if (id === "pipeline") return <div className="learning-visual mini-pipeline"><div><span>Siklus</span><b>1</b><b>2</b><b>3</b><b>4</b></div><div><span>I1</span><i>GH</i><i>DE</i><i>UV</i><i /></div><div><span>I2</span><i /><i>GH</i><i>DE</i><i>UV</i></div><div><span>I3</span><i /><i /><i>GH</i><i>DE</i></div></div>;
  if (id === "dependency") return <div className="learning-visual dependency-flow"><span>mov eax,[a]</span><b>skryf eax</b><i>→</i><span>add ebx,eax</span><b>lees eax</b><em>Wag totdat UV klaar is.</em></div>;
  if (id === "branches") return <div className="learning-visual branch-mini"><div><span>Werklik</span><b>N</b><b>V</b><b>V</b><b>N</b></div><div><span>Voorspel</span><b>N</b><b>N</b><b>V</b><b>V</b></div><div><span>Reg/Fout</span><i>–</i><i>F</i><i>R</i><i>F</i></div><strong>straf = foute × 3</strong></div>;
  if (id === "parallelism") return <div className="learning-visual execution-units"><span>Instruksies</span><i>↓</i><div><b>LSE</b><b>RLE</b><b>VVE</b></div><em>Onafhanklik + verskillende eenhede = parallel.</em></div>;
  return <div className="learning-visual learning-visual--fallback"><pre>{lines.join("\n")}</pre></div>;
}

function GateFlow() {
  return <div className="learning-visual gate-flow"><svg viewBox="0 0 310 130" role="img" aria-label="AND, OR en NOT hekpad"><path d="M12 30 H57 M12 78 H57 M57 18 H88 Q112 54 88 90 H57 Z" /><text x="67" y="60">AND</text><path d="M112 54 H145 M145 38 Q166 54 145 70 M145 30 Q192 30 214 54 Q192 78 145 78" /><text x="166" y="59">OR</text><path d="M12 111 H134 M134 98 L164 111 L134 124 Z M164 111 H244" /><text x="94" y="108">C</text><circle cx="250" cy="111" r="6" /><text x="266" y="115">Uit</text></svg><p><b>Lees van links na regs:</b> bou die binneste hekke eerste; die driehoek met ’n sirkel is ’n NOT-hek.</p></div>;
}

function AdderVisual() {
  return <div className="learning-visual adder-comparison"><div><h4>Halwe opteller</h4><p><b>A</b> en <b>B</b> in</p><span>A ⊕ B → Som</span><span>A · B → Dra</span><table><tbody><tr><th>A</th><th>B</th><th>S</th><th>D</th></tr><tr><td>0</td><td>0</td><td>0</td><td>0</td></tr><tr><td>0</td><td>1</td><td>1</td><td>0</td></tr><tr><td>1</td><td>1</td><td>0</td><td>1</td></tr></tbody></table></div><div><h4>Volopteller</h4><p><b>A</b>, <b>B</b> en <b>Cin</b> in</p><span>HA₁ + HA₂ + OR</span><span>Som = A ⊕ B ⊕ Cin</span><span>Cout = AB + ACin + BCin</span><div className="adder-blocks"><i>HA₁</i><i>HA₂</i><i>OR</i></div></div></div>;
}

function FlipFlopVisual() {
  return <div className="learning-visual flipflop-comparison"><div><h4>Wipkring</h4><span>S / R</span><b>→</b><i>Q</i><small>Uitset word deur die stel-/terugstel-inset verander.</small></div><div><h4>Houwipkring</h4><span>S / R</span><b>→</b><i>Q</i><em>↺</em><small>Terugvoer laat die huidige toestand bly totdat ’n inset dit verander.</small></div></div>;
}

function IasWordVisual() {
  return <div className="learning-visual ias-word-visual"><div className="ias-word-visual__number"><span>teken<br />0</span><b>number word</b><i>39</i></div><div className="ias-word-visual__instruction"><span>opcode<br /><small>0–7</small></span><b>adres<br /><small>8–19</small></b><span>opcode<br /><small>20–27</small></span><b>adres<br /><small>28–39</small></b></div><div className="ias-word-visual__labels"><span>linker instruksie / 20 bis</span><span>regter instruksie / 20 bis</span></div></div>;
}

type Exercise = { prompt: string; answer: string; explanation: string; hint: string };
const exercises: Record<string, Exercise[]> = {
  le1: [
    { prompt: "45₁₀ → binêr", answer: "101101", explanation: "45 = 32 + 8 + 4 + 1, daarom 101101₂.", hint: "Gebruik plekwaardes 32, 16, 8, 4, 2, 1." },
    { prompt: "2C₁₆ → binêr", answer: "00101100", explanation: "2 word 0010 en C word 1100. Hou die voorste nulle.", hint: "Elke hex-syfer kry vier bisse." },
    { prompt: "0,375₁₀ → binêr", answer: "0.011", explanation: "0,375×2=0,75→0; 0,75×2=1,5→1; 0,5×2=1,0→1.", hint: "Vermenigvuldig net die breukdeel met 2." },
  ],
  le2: [
    { prompt: "−5 in 4-bis twee-komplement", answer: "1011", explanation: "+5=0101; inverseer na 1010; tel 1 by om 1011 te kry.", hint: "Skryf eers die positiewe vorm." },
    { prompt: "7 + 1 in 4-bis signed arithmetic: oorloop?", answer: "ja", explanation: "0111+0001=1000: twee positiewe insette gee ’n negatiewe teken.", hint: "Vergelyk die tekens van die insette en resultaat." },
    { prompt: "Eerste stap in C–A–Q–M", answer: "toets q0", explanation: "Toets Q₀. Slegs indien Q₀=1 tel jy M by A, daarna skuif jy regs.", hint: "Die toets kom voor die optelling en skuif." },
  ],
  le3: [
    { prompt: "Halwe opteller: A=1, B=1. Som?", answer: "0", explanation: "1 XOR 1 = 0; die dra is 1.", hint: "Som gebruik XOR." },
    { prompt: "Volopteller: A=1, B=1, Cin=1. Cout?", answer: "1", explanation: "Drie 1’s gee binêr 11: Som=1 en Cout=1.", hint: "Dink aan 1+1+1 = 3 = 11₂." },
    { prompt: "Watter stroombaan behou toestand?", answer: "wipkring", explanation: "’n Wipkring/houwipkring gebruik terugvoer en kan ’n vorige toestand hou.", hint: "Soek die woord ‘toestand’ of ‘geheue’." },
  ],
  le5: [
    { prompt: "Hoeveel bisse in ’n IAS-woord?", answer: "40", explanation: "Die IAS-geheuewoord is 40 bisse lank.", hint: "Die woord het twee 20-bis instruksiehelftes." },
    { prompt: "By watter bis begin die regter instruksie?", answer: "20", explanation: "Die linker instruksie gebruik bisse 0–19; die regter begin by bis 20.", hint: "Twee gelyke helftes van ’n 40-bis woord." },
    { prompt: "Watter register dra ’n geheue-adres?", answer: "mar", explanation: "MAR beteken Memory Address Register en kies die geheueligging.", hint: "Die ‘A’ in MAR staan vir Address." },
  ],
  le6: [
    { prompt: "In ’n 3-stadium pyplyn: I2 in siklus 2?", answer: "gh", explanation: "I1 is in DE en I2 begin in GH in siklus 2.", hint: "Nuwe instruksies begin elke siklus in GH." },
    { prompt: "Straf per fout in jou TKA-voorbeeld", answer: "3", explanation: "Die voorbeeld gebruik 3 siklusse straf vir elke verkeerde voorspelling.", hint: "Totale straf = foute × sikluskoste." },
    { prompt: "Superskalêr: instruksies moet onafhanklik wees én ...", answer: "verskillende uitvoeringseenhede", explanation: "Geen data-afhanklikheid en verskillende beskikbare eenhede word vereis.", hint: "Dink aan LSE, RLE en VVE." },
  ],
};

export function UnitExercises({ unitId, title }: { unitId: string; title: string }) {
  const [values, setValues] = useState<Record<number, string>>({});
  const [marked, setMarked] = useState(false);
  const unitExercises = exercises[unitId] ?? [];
  const score = unitExercises.filter((exercise, index) => normalise(values[index] ?? "") === normalise(exercise.answer)).length;
  return <section className="unit-exercises"><header><div><span>INVULOEFENINGE / {title.toUpperCase()}</span><h3>Doen dit sonder die voorbeeld.</h3><p>Merk wanneer jy klaar is; die terugvoer wys watter kernreël jy moet herhaal.</p></div><CircleHelp className="size-5" /></header><div className="exercise-grid">{unitExercises.map((exercise, index) => { const correct = normalise(values[index] ?? "") === normalise(exercise.answer); return <label key={exercise.prompt} className={marked && !correct ? "exercise-card exercise-card--wrong" : "exercise-card"}><b>{String(index + 1).padStart(2, "0")}</b><span>{exercise.prompt}</span><input value={values[index] ?? ""} onChange={(event) => { setValues((answers) => ({ ...answers, [index]: event.target.value })); setMarked(false); }} placeholder="Tik antwoord" />{marked ? <Feedback correct={correct} explanation={`${exercise.answer} — ${exercise.explanation}`} /> : <small>Wenk: {exercise.hint}</small>}</label>; })}</div><footer><button type="button" onClick={() => { setValues({}); setMarked(false); }}><RotateCcw className="size-4" /> Herstel</button><button type="button" onClick={() => setMarked(true)}><Check className="size-4" /> Merk oefeninge</button>{marked ? <strong>{score}/{unitExercises.length} korrek</strong> : null}</footer>{unitId === "le3" ? <LogicBuilder /> : null}</section>;
}

type GateType = "AND" | "OR" | "XOR" | "NOT";
function LogicBuilder() {
  const [gates, setGates] = useState<GateType[]>([]);
  return <section className="logic-builder"><header><div><span>LE3 / KLIK-EN-BOU</span><h3>Stel ’n hekpad saam.</h3><p>Kies hekke in die volgorde waarin jy die uitdrukking van binne na buite sou bou. Dit is ’n klikweergawe van ’n eenvoudige tekenblad.</p></div><button type="button" onClick={() => setGates([])}><RotateCcw className="size-4" /> Maak skoon</button></header><div className="gate-palette" aria-label="Logiese hekpalet">{(["AND", "OR", "XOR", "NOT"] as GateType[]).map((gate) => <button type="button" key={gate} onClick={() => setGates((items) => [...items, gate])}><GateSymbol type={gate} /><span>{gate}</span></button>)}</div><div className="logic-canvas" aria-label="Hekbou-werkarea">{gates.length === 0 ? <p>Klik ’n hek bo om dit hier te plaas.</p> : gates.map((gate, index) => <div className="logic-canvas__gate" key={`${gate}-${index}`}><GateSymbol type={gate} /><span>{gate}</span>{index < gates.length - 1 ? <b>→</b> : null}</div>)}</div><p className="logic-builder__prompt">Probeer: bou eers <b>OR</b>, voeg dan <b>NOT</b> vir C by, en eindig met <b>AND</b> vir <code>(A OF B) EN NIE C</code>.</p></section>;
}

function GateSymbol({ type }: { type: GateType }) {
  return <svg viewBox="0 0 72 42" aria-hidden="true"><path d={type === "AND" ? "M4 4 H28 Q64 21 28 38 H4 Z" : type === "NOT" ? "M5 5 L50 21 L5 37 Z M55 21 a4 4 0 1 0 0.1 0" : type === "XOR" ? "M9 5 Q42 5 63 21 Q42 37 9 37 M3 5 Q17 21 3 37 M9 0 Q-2 21 9 42" : "M9 5 Q42 5 63 21 Q42 37 9 37 M3 5 Q17 21 3 37"} /><text x="33" y="25" textAnchor="middle">{type}</text></svg>;
}
