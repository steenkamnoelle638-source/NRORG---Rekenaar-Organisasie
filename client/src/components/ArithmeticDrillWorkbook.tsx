/* Ingenieurswerkboek: LE2 gebruik klasgetroue C–A–Q–M- en langdelingroosters vir meganiese berekeningoefening. */
import { Check, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { DivisionExamples } from "./ExampleExpansions";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import "./arithmetic-drill-workbook.css";
import "./division-long-format.css";

type Mode = "maal" | "deel";
type MultiplicationScenario = { id: string; label: string; multiplicand: number; multiplier: number };
type DivisionScenario = { id: string; label: string; dividend: number; divisor: number };
type MultiplicationRow = { step: string; carry: string; accumulator: string; multiplier: string; multiplicand: string; note: string };
type DivisionRow = { step: string; remainder: string; quotient: string; divisor: string; note: string };
type LongDivisionRow = { step: string; bringDown: string; decision: "JA" | "NEE"; quotientBit: string; remainder: string; operation: string };

const multiplicationScenarios: MultiplicationScenario[] = [
  { id: "maal-1", label: "01 · 10 × 6", multiplicand: 10, multiplier: 6 },
  { id: "maal-2", label: "02 · 7 × 3", multiplicand: 7, multiplier: 3 },
  { id: "maal-3", label: "03 · 9 × 5", multiplicand: 9, multiplier: 5 },
  { id: "maal-4", label: "04 · 12 × 4", multiplicand: 12, multiplier: 4 },
  { id: "maal-5", label: "05 · 11 × 7", multiplicand: 11, multiplier: 7 },
];

const divisionScenarios: DivisionScenario[] = [
  { id: "deel-1", label: "01 · 147 ÷ 11", dividend: 147, divisor: 11 },
  { id: "deel-2", label: "02 · 84 ÷ 7", dividend: 84, divisor: 7 },
  { id: "deel-3", label: "03 · 65 ÷ 5", dividend: 65, divisor: 5 },
  { id: "deel-4", label: "04 · 72 ÷ 8", dividend: 72, divisor: 8 },
  { id: "deel-5", label: "05 · 96 ÷ 3", dividend: 96, divisor: 3 },
];

const pad = (value: number, length: number) => value.toString(2).padStart(length, "0");
const compact = (value: string) => value.toLowerCase().replace(/[\s.,;:()→←=]/g, "");
const actionOptions = ["Oorspronklike waardes", "Q₀ = 0; skuif C–A–Q regs", "Q₀ = 1; A + M, skuif C–A–Q regs"];
const divisionReferenceSketch = "assets/le2-delingskets-klasformaat.png";

function multiplicationRows({ multiplicand, multiplier }: MultiplicationScenario): MultiplicationRow[] {
  let carry = 0;
  let accumulator = 0;
  let q = multiplier;
  const rows: MultiplicationRow[] = [{ step: "Begin", carry: "0", accumulator: pad(0, 4), multiplier: pad(q, 4), multiplicand: pad(multiplicand, 4), note: actionOptions[0] }];
  for (let cycle = 1; cycle <= 4; cycle += 1) {
    const q0 = q & 1;
    if (q0 === 1) {
      const sum = accumulator + multiplicand;
      carry = sum >> 4;
      accumulator = sum & 0b1111;
    } else {
      carry = 0;
    }
    const shifted = ((carry << 8) | (accumulator << 4) | q) >> 1;
    carry = (shifted >> 8) & 1;
    accumulator = (shifted >> 4) & 0b1111;
    q = shifted & 0b1111;
    rows.push({ step: `Siklus ${cycle}`, carry: String(carry), accumulator: pad(accumulator, 4), multiplier: pad(q, 4), multiplicand: pad(multiplicand, 4), note: q0 === 1 ? actionOptions[2] : actionOptions[1] });
  }
  return rows;
}

function divisionRows({ dividend, divisor }: DivisionScenario): DivisionRow[] {
  const dividendBits = pad(dividend, 8);
  let remainder = 0;
  let quotient = "";
  const rows: DivisionRow[] = [{ step: "Begin", remainder: pad(0, 8), quotient: pad(dividend, 8), divisor: pad(divisor, 8), note: "Oorspronklike dividend in Q; begin met A = 0" }];
  Array.from(dividendBits).forEach((bit, index) => {
    remainder = remainder * 2 + Number(bit);
    if (remainder >= divisor) {
      remainder -= divisor;
      quotient += "1";
      rows.push({ step: `Bis ${index + 1}`, remainder: pad(remainder, 8), quotient, divisor: pad(divisor, 8), note: "Bring die volgende bis af; trek M af; skryf 1 in die kwosiënt" });
    } else {
      quotient += "0";
      rows.push({ step: `Bis ${index + 1}`, remainder: pad(remainder, 8), quotient, divisor: pad(divisor, 8), note: "Bring die volgende bis af; M pas nie; skryf 0 in die kwosiënt" });
    }
  });
  return rows;
}

function longDivisionRows({ dividend, divisor }: DivisionScenario): LongDivisionRow[] {
  let remainder = 0;
  return Array.from(pad(dividend, 8)).map((bit, index) => {
    const workingValue = remainder * 2 + Number(bit);
    const decision = workingValue >= divisor ? "JA" : "NEE";
    remainder = decision === "JA" ? workingValue - divisor : workingValue;
    const working = workingValue.toString(2);
    const divisorBits = pad(divisor, Math.max(4, working.length));
    return { step: `Stap ${index + 1}`, bringDown: working, decision, quotientBit: decision === "JA" ? "1" : "0", remainder: remainder.toString(2), operation: decision === "JA" ? `${working} − ${divisorBits} = ${remainder.toString(2)}` : `${working} < ${divisorBits}; behou die waarde` };
  });
}

function idFor(mode: Mode, scenarioId: string, row: number, field: string) { return `${mode}-${scenarioId}-${row}-${field}`; }

export function ArithmeticDrillWorkbook() {
  const [mode, setMode] = useState<Mode>("maal");
  const [activeIndex, setActiveIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [marked, setMarked] = useState<Record<string, boolean>>({});
  const scenarios = mode === "maal" ? multiplicationScenarios : divisionScenarios;
  const scenario = scenarios[activeIndex];
  const key = `${mode}-${scenario.id}`;
  const isMarked = marked[key] ?? false;
  const rows = useMemo(() => mode === "maal" ? multiplicationRows(scenario as MultiplicationScenario) : divisionRows(scenario as DivisionScenario), [mode, scenario]);
  const longRows = useMemo(() => mode === "deel" ? longDivisionRows(scenario as DivisionScenario) : [], [mode, scenario]);
  const fieldCount = mode === "maal" ? rows.length * 5 : longRows.length + 4;
  const change = (id: string, value: string) => { setAnswers((current) => ({ ...current, [id]: value })); setMarked((current) => ({ ...current, [key]: false })); };
  const switchMode = (nextMode: Mode) => { setMode(nextMode); setActiveIndex(0); };
  const reset = () => { setAnswers((current) => Object.fromEntries(Object.entries(current).filter(([itemKey]) => !itemKey.startsWith(`${mode}-${scenario.id}-`)))); setMarked((current) => ({ ...current, [key]: false })); };

  const multiplicationCorrect = (row: MultiplicationRow, rowIndex: number) => [
    ["carry", row.carry], ["accumulator", row.accumulator], ["multiplier", row.multiplier], ["multiplicand", row.multiplicand], ["note", row.note],
  ].filter(([field, expected]) => compact(answers[idFor(mode, scenario.id, rowIndex, field)] ?? "") === compact(expected)).length;
  const divisionCorrect = (row: DivisionRow, rowIndex: number) => [
    ["remainder", row.remainder], ["quotient", row.quotient], ["divisor", row.divisor], ["note", row.note],
  ].filter(([field, expected]) => compact(answers[idFor(mode, scenario.id, rowIndex, field)] ?? "") === compact(expected)).length;
  const longDivisionCorrect = (row: LongDivisionRow, rowIndex: number) => compact(answers[idFor("deel", scenario.id, rowIndex, "remainder")] ?? "") === compact(row.remainder) ? 1 : 0;
  const longDivisionHeaderCorrect = () => {
    const divisor = pad((scenario as DivisionScenario).divisor, 4);
    const dividend = pad((scenario as DivisionScenario).dividend, 8);
    const quotient = Math.floor((scenario as DivisionScenario).dividend / (scenario as DivisionScenario).divisor).toString(2);
    const remainder = ((scenario as DivisionScenario).dividend % (scenario as DivisionScenario).divisor).toString(2);
    return [["divisor", divisor], ["dividend", dividend], ["quotient", quotient], ["final-remainder", remainder]].filter(([field, expected]) => compact(answers[idFor("deel", scenario.id, 0, field)] ?? "") === compact(expected)).length;
  };
  const correctFields = mode === "maal" ? rows.reduce((total, row, index) => total + multiplicationCorrect(row as MultiplicationRow, index), 0) : longDivisionHeaderCorrect() + longRows.reduce((total, row, index) => total + longDivisionCorrect(row, index), 0);

  return <section className="arithmetic-workbook" aria-labelledby="arithmetic-workbook-heading">
    <header>
      <span>LE2 / KLASOEFENING / INVULTABELLE</span>
      <h3 id="arithmetic-workbook-heading">Maal en deel met die ry-vir-ry metode.</h3>
      <p>Kies eers <b>MAAL</b> of <b>DEEL</b>, kies dan een oefenblad. Elke ry vra vir die <b>nuwe waardes</b> ná die aangeduide aksie—net soos die klaswerkvel.</p>
    </header>

    <nav className="arithmetic-workbook__modes" aria-label="LE2-oefentipe"><button type="button" className={mode === "maal" ? "active" : ""} onClick={() => switchMode("maal")}>MAAL · C–A–Q–M</button><button type="button" className={mode === "deel" ? "active" : ""} onClick={() => switchMode("deel")}>DEEL · LANGDELING</button></nav>
    <nav className="arithmetic-workbook__pages" aria-label={`${mode} oefenbladsye`}>{scenarios.map((item, index) => <button key={item.id} type="button" className={activeIndex === index ? "active" : ""} onClick={() => setActiveIndex(index)}>{item.label}</button>)}</nav>

    <DivisionTheoryInsert />
    {mode === "maal" ? <MultiplicationTable scenario={scenario as MultiplicationScenario} rows={rows as MultiplicationRow[]} answers={answers} marked={isMarked} onChange={change} /> : <LongDivisionTable scenario={scenario as DivisionScenario} rows={longRows} answers={answers} marked={isMarked} onChange={change} />}

    <footer>
      <div className="arithmetic-workbook__pager"><button type="button" onClick={() => setActiveIndex((index) => Math.max(0, index - 1))} disabled={activeIndex === 0}><ChevronLeft className="size-4"/>Vorige</button><b>{String(activeIndex + 1).padStart(2, "0")} / 05</b><button type="button" onClick={() => setActiveIndex((index) => Math.min(scenarios.length - 1, index + 1))} disabled={activeIndex === scenarios.length - 1}>Volgende<ChevronRight className="size-4"/></button></div>
      <button type="button" className="arithmetic-workbook__mark" onClick={() => setMarked((current) => ({ ...current, [key]: true }))}><Check className="size-4"/>Merk hierdie tabel</button>
      <button type="button" className="arithmetic-workbook__reset" onClick={reset}><RotateCcw className="size-3.5"/>Herstel</button>
      {isMarked ? <p><b>Nasien:</b> {correctFields}/{fieldCount} velde korrek. Groen is korrek; rooi velde wys die verwagte waarde en die ry se aksie.</p> : <p><b>Wenk:</b> tik die binêre waardes sonder spasies. By maal: toets eers Q₀. By deel: bring een dividendbis af, vergelyk met M en skryf daarna die volgende kwosiëntbis.</p>}
    </footer>
  </section>;
}

function Input({ value, expected, marked, onChange, label, placeholder = "Vul in" }: { value: string; expected: string; marked: boolean; onChange: (value: string) => void; label: string; placeholder?: string }) {
  const correct = compact(value) === compact(expected);
  return <input aria-label={label} className={marked ? (correct ? "correct" : "wrong") : ""} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />;
}

function MultiplicationTable({ scenario, rows, answers, marked, onChange }: { scenario: MultiplicationScenario; rows: MultiplicationRow[]; answers: Record<string, string>; marked: boolean; onChange: (id: string, value: string) => void }) {
  const key = scenario.id;
  return <div className="arithmetic-workbook__sheet"><div className="arithmetic-workbook__brief"><span>OEFENBLAD · MAAL</span><code>{scenario.multiplicand} × {scenario.multiplier}</code><strong>Produk: {scenario.multiplicand * scenario.multiplier}₁₀ = {pad(scenario.multiplicand * scenario.multiplier, 8)}₂</strong></div><p className="arithmetic-workbook__instruction">Begin met die oorspronklike waardes. Toets op elke volgende ry die <b>laaste bis van Q (Q₀)</b>; tel M by A slegs wanneer Q₀ = 1, en skuif dan <b>C–A–Q regs</b>.</p><div className="arithmetic-workbook__table-wrap"><table className="arithmetic-workbook__table arithmetic-workbook__table--multiply"><thead><tr><th>Stap</th><th>C</th><th>A</th><th>Q</th><th>M</th><th>Nota / aksie</th></tr></thead><tbody>{rows.map((row, index) => <tr key={row.step}><th>{row.step}</th><td><Input label={`${scenario.label}, ${row.step}, C`} value={answers[idFor("maal", key, index, "carry")] ?? ""} expected={row.carry} marked={marked} onChange={(value) => onChange(idFor("maal", key, index, "carry"), value)} /></td><td><Input label={`${scenario.label}, ${row.step}, A`} value={answers[idFor("maal", key, index, "accumulator")] ?? ""} expected={row.accumulator} marked={marked} onChange={(value) => onChange(idFor("maal", key, index, "accumulator"), value)} /></td><td><Input label={`${scenario.label}, ${row.step}, Q`} value={answers[idFor("maal", key, index, "multiplier")] ?? ""} expected={row.multiplier} marked={marked} onChange={(value) => onChange(idFor("maal", key, index, "multiplier"), value)} /></td><td><Input label={`${scenario.label}, ${row.step}, M`} value={answers[idFor("maal", key, index, "multiplicand")] ?? ""} expected={row.multiplicand} marked={marked} onChange={(value) => onChange(idFor("maal", key, index, "multiplicand"), value)} /></td><td><select aria-label={`${scenario.label}, ${row.step}, nota`} className={marked ? (compact(answers[idFor("maal", key, index, "note")] ?? "") === compact(row.note) ? "correct" : "wrong") : ""} value={answers[idFor("maal", key, index, "note")] ?? ""} onChange={(event) => onChange(idFor("maal", key, index, "note"), event.target.value)}><option value="">Kies aksie</option>{actionOptions.map((option) => <option key={option} value={option}>{option}</option>)}</select>{marked && compact(answers[idFor("maal", key, index, "note")] ?? "") !== compact(row.note) ? <small><b>{row.note}</b> — toets Q₀ voor jy die ry invul.</small> : null}</td></tr>)}</tbody></table></div></div>;
}


function DivisionTable({ scenario, rows, answers, marked, onChange }: { scenario: DivisionScenario; rows: DivisionRow[]; answers: Record<string, string>; marked: boolean; onChange: (id: string, value: string) => void }) {
  const key = scenario.id;
  const quotient = Math.floor(scenario.dividend / scenario.divisor);
  const remainder = scenario.dividend % scenario.divisor;
  const noteOptions = ["Oorspronklike dividend in Q; begin met A = 0", "Bring die volgende bis af; M pas nie; skryf 0 in die kwosiënt", "Bring die volgende bis af; trek M af; skryf 1 in die kwosiënt"];
  return <div className="arithmetic-workbook__sheet"><div className="arithmetic-workbook__brief"><span>OEFENBLAD · DEEL</span><code>Langdeling: {scenario.dividend} ÷ {scenario.divisor}</code><strong>Antwoord: {quotient} res {remainder} · {pad(quotient, 8)}₂</strong></div><p className="arithmetic-workbook__instruction">Werk van links na regs deur die <b>8-bis dividend</b>. Bring elke volgende bis na A af, vergelyk die gedeeltelike res met M, en skryf dan <b>1</b> (trek af) of <b>0</b> (moenie aftrek nie) in Q.</p><div className="arithmetic-workbook__longline"><b>{pad(scenario.divisor, 8)}</b><i>⟌</i><span>{pad(scenario.dividend, 8)}</span><small>divisor</small><small>dividend</small></div><div className="arithmetic-workbook__table-wrap"><table className="arithmetic-workbook__table arithmetic-workbook__table--divide"><thead><tr><th>Stap</th><th>A · gedeeltelike res</th><th>Q · kwosiënt</th><th>M · deler</th><th>Nota / aksie</th></tr></thead><tbody>{rows.map((row, index) => <tr key={row.step}><th>{row.step}</th><td><Input label={`${scenario.label}, ${row.step}, gedeeltelike res A`} value={answers[idFor("deel", key, index, "remainder")] ?? ""} expected={row.remainder} marked={marked} onChange={(value) => onChange(idFor("deel", key, index, "remainder"), value)} /></td><td><Input label={`${scenario.label}, ${row.step}, kwosiënt Q`} value={answers[idFor("deel", key, index, "quotient")] ?? ""} expected={row.quotient} marked={marked} onChange={(value) => onChange(idFor("deel", key, index, "quotient"), value)} /></td><td><Input label={`${scenario.label}, ${row.step}, deler M`} value={answers[idFor("deel", key, index, "divisor")] ?? ""} expected={row.divisor} marked={marked} onChange={(value) => onChange(idFor("deel", key, index, "divisor"), value)} /></td><td><select aria-label={`${scenario.label}, ${row.step}, nota`} className={marked ? (compact(answers[idFor("deel", key, index, "note")] ?? "") === compact(row.note) ? "correct" : "wrong") : ""} value={answers[idFor("deel", key, index, "note")] ?? ""} onChange={(event) => onChange(idFor("deel", key, index, "note"), event.target.value)}><option value="">Kies aksie</option>{noteOptions.map((option) => <option key={option} value={option}>{option}</option>)}</select>{marked && compact(answers[idFor("deel", key, index, "note")] ?? "") !== compact(row.note) ? <small><b>{row.note}</b> — kyk of A groot genoeg is om M af te trek.</small> : null}</td></tr>)}</tbody></table></div></div>;
}

function DivisionTheoryInsert() {
  const [target, setTarget] = useState<HTMLElement | null>(null);
  useEffect(() => setTarget(document.querySelector<HTMLElement>(".integer-division-examples-slot")), []);
  if (!target) return null;
  return createPortal(<article className="integer-division-theory"><span>DELING</span><h4>Langdeling bou die heelgetal deel én die res.</h4><p>Werk die dividend <b>van links na regs</b> deur. Bring die volgende bis af, toets of die deler in jou huidige deelstuk pas, en skryf dan die volgende kwosiëntbis: <b>NEE → 0</b>; <b>JA → 1</b>, trek die deler af en hou die nuwe res vir die volgende stap.</p><figure className="division-theory__reference"><header><b>WOORD-BRON SKETS · BEREKEN 147 ÷ 11</b><code>10010011₂ ÷ 1011₂</code></header><img src={divisionReferenceSketch} alt="Aangehegte Word-bron skets vir die binêre langdeling 147 ÷ 11. Die kwosiëntbisse is bo, die aftrekwerklyne is onder, en die finale antwoord is 13 res 4."/><figcaption><b>Lees die kleurmerke in volgorde:</b> lila bou die kwosiënt; rooi wys die huidige besluit; groen wys die finale res.</figcaption></figure><DivisionExamples /></article>, target);
}

function LongDivisionTable({ scenario, rows, answers, marked, onChange }: { scenario: DivisionScenario; rows: LongDivisionRow[]; answers: Record<string, string>; marked: boolean; onChange: (id: string, value: string) => void }) {
  const key = scenario.id;
  const quotient = Math.floor(scenario.dividend / scenario.divisor);
  const remainder = scenario.dividend % scenario.divisor;
  const headerId = (field: string) => idFor("deel", key, 0, field);
  return <div className="arithmetic-workbook__sheet"><div className="arithmetic-workbook__brief"><span>OEFENBLAD · DEEL / LANGDELING FORMAAT LEEG</span><code>{scenario.dividend} ÷ {scenario.divisor}</code><strong>Vul die leë werklyne soos die klas- en Word-vorm in.</strong></div><p className="arithmetic-workbook__instruction">Skryf die <b>deler</b> links, die binêre <b>heelgetalantwoord</b> bo en die dividend onder. Werk dan elke deelstuk op die opeenvolgende lyne uit; die laaste sel is die <b>res-deel van die antwoord in binêr</b>.</p><section className="arithmetic-workbook__long-sheet long-empty-sheet" aria-label={`${scenario.label} leë langdelingformaat`}><div className="long-empty-sheet__head"><label className="long-empty-sheet__divisor"><i>Deler</i><Input placeholder="" label={`${scenario.label}, deler`} value={answers[headerId("divisor")] ?? ""} expected={pad(scenario.divisor, 4)} marked={marked} onChange={(value) => onChange(headerId("divisor"), value)} /></label><div className="long-empty-sheet__answer"><label><i>Heelgetal antw deel in biner</i><Input placeholder="" label={`${scenario.label}, heelgetalantwoord in binêr`} value={answers[headerId("quotient")] ?? ""} expected={quotient.toString(2)} marked={marked} onChange={(value) => onChange(headerId("quotient"), value)} /></label><label><i>Getal wat mee gedeel word</i><Input placeholder="" label={`${scenario.label}, dividend in binêr`} value={answers[headerId("dividend")] ?? ""} expected={pad(scenario.dividend, 8)} marked={marked} onChange={(value) => onChange(headerId("dividend"), value)} /></label></div></div><div className="long-empty-sheet__work" aria-label="Langdelingwerklyne">{rows.map((row, index) => <div key={row.step} className={`long-empty-sheet__line long-empty-sheet__line--${index < 2 ? "short" : index < 5 ? "middle" : "long"}`}><span aria-hidden="true">{index % 2 === 0 ? "−" : "+"}</span><Input placeholder="" label={`${scenario.label}, ${row.step}, werklyn`} value={answers[idFor("deel", key, index, "remainder")] ?? ""} expected={row.remainder} marked={marked} onChange={(value) => onChange(idFor("deel", key, index, "remainder"), value)} />{marked && compact(answers[idFor("deel", key, index, "remainder")] ?? "") !== compact(row.remainder) ? <small><b>{row.operation}</b></small> : null}</div>)}</div><label className="long-empty-sheet__result"><i>Res deel v. antw in biner</i><Input placeholder="" label={`${scenario.label}, finale res in binêr`} value={answers[headerId("final-remainder")] ?? ""} expected={remainder.toString(2)} marked={marked} onChange={(value) => onChange(headerId("final-remainder"), value)} /></label></section></div>;
}
