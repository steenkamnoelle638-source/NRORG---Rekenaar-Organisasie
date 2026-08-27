/* Ingenieurswerkboek: vyf TKA-agtige IAS-bladsye laat die leerder linker- en regterinstruksies afsonderlik oefen. */
import { Check, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { Fragment, useMemo, useState } from "react";
import "./ias-phase-fill-exercise.css";

type AnswerRow = {
  step: string;
  register: string;
  value: string;
  registerAnswers: string[];
  valueAnswers: string[];
  note: string;
};

type Phase = { title: string; action?: string; rows: AnswerRow[] };
type Instruction = { opcode: "LOAD" | "ADD" | "SUB" | "STORE"; address: number; operand?: number; result?: number };
type Scenario = { id: string; label: string; memoryAddress: number; left: Instruction; right: Instruction; initial: string; goal: string; phases: Phase[] };

const normalise = (value: string) => value.toLowerCase().replace(/[\s.,;:→←|()=\[\]]/g, "").replace(/’/g, "'");
const instructionText = (instruction: Instruction) => `${instruction.opcode} M(${instruction.address})`;
const values = (...items: string[]) => items;

function row(step: string, register: string, value: string, registerAnswers: string[], valueAnswers: string[], note: string): AnswerRow {
  return { step, register, value, registerAnswers, valueAnswers, note };
}

function finalOperation(instruction: Instruction, finalValue: number, target?: number): AnswerRow {
  const instructionName = instructionText(instruction);
  if (instruction.opcode === "STORE") {
    return row("1", "MBR → M(MAR)", `M(${instruction.address}) = ${finalValue}`, values("mbr → mmar", "mbr->mmar", "mbr na mmar", "mbr"), values(`m${instruction.address}=${finalValue}`, `${finalValue}`, `m(${instruction.address})=${finalValue}`), `STORE plaas die huidige AC=${finalValue} in MBR en skryf dit daarna na M(${instruction.address}).`);
  }
  if (instruction.opcode === "ADD") {
    return row("1", "MBR / AC", `${instruction.operand} → AC=${finalValue}`, values("mbr / ac", "mbr ac", "mbr", "ac"), values(`${instruction.operand} → ac=${finalValue}`, `${instruction.operand}->ac${finalValue}`, `ac=${finalValue}`, `${finalValue}`), `${instructionName} lees M(${instruction.address})=${instruction.operand} via MBR en tel dit by AC.`);
  }
  if (instruction.opcode === "SUB") {
    return row("1", "MBR / AC", `${instruction.operand} → AC=${finalValue}`, values("mbr / ac", "mbr ac", "mbr", "ac"), values(`${instruction.operand} → ac=${finalValue}`, `${instruction.operand}->ac${finalValue}`, `ac=${finalValue}`, `${finalValue}`), `${instructionName} lees M(${instruction.address})=${instruction.operand} via MBR en trek dit van AC af.`);
  }
  return row("1", "MBR → AC", `${finalValue}`, values("mbr → ac", "mbr->ac", "mbr", "ac"), values(`${finalValue}`, `ac=${finalValue}`), `${instructionName} lees M(${instruction.address})=${finalValue} via MBR en plaas die waarde in AC.`);
}

function makeScenario({ id, label, memoryAddress, left, right, initial, goal }: Omit<Scenario, "phases">): Scenario {
  const leftText = instructionText(left);
  const rightText = instructionText(right);
  const memoryWord = `${leftText} | ${rightText}`;
  const leftResult = left.result ?? left.operand ?? 0;
  const rightResult = right.result ?? right.operand ?? leftResult;
  const rightAction = right.opcode === "STORE" ? "Aktiveer die geheue-skryflyn" : `Geen geheue-skryflyn: ${right.opcode} voltooi in AC.`;
  return {
    id, label, memoryAddress, left, right, initial, goal,
    phases: [
      {
        title: "Gaan-haal-fase (linker instruksie)",
        action: "Aktiveer die geheue-leeslyn",
        rows: [
          row("1", "MAR", `${memoryAddress}`, values("mar", "pc → mar", "pc->mar"), values(`${memoryAddress}`, `mar=${memoryAddress}`), `PC wys na geheuewoord ${memoryAddress}; daardie adres beweeg na MAR.`),
          row("2", "MBR", memoryWord, values("mbr", "m(mar) → mbr", "mmar->mbr"), values(memoryWord, `m${memoryAddress}=${memoryWord}`), `Die hele 40-bis woord uit M(${memoryAddress}) beweeg vanaf geheue na MBR.`),
          row("3", "IBR", rightText, values("ibr", "mbr → ibr", "mbr->ibr"), values(rightText), "IBR hou die regter 20-bis instruksie vir die volgende fase."),
          row("4", "IR", left.opcode, values("ir", "mbr → ir", "mbr->ir"), values(left.opcode), "IR ontvang die linker instruksie se opcode."),
          row("5", "MAR", `${left.address}`, values("mar", "mbr → mar", "mbr->mar"), values(`${left.address}`, `mar=${left.address}`), "MAR ontvang die linker instruksie se operandadres."),
        ],
      },
      {
        title: "Uitvoer-fase (linker instruksie)",
        rows: left.opcode === "LOAD"
          ? [
              row("1", "MBR", `${left.operand}`, values("mbr", `m${left.address} → mbr`, `m${left.address}->mbr`), values(`${left.operand}`, `m${left.address}=${left.operand}`), `LOAD lees M(${left.address})=${left.operand} via MBR.`),
              row("2", "AC", `${leftResult}`, values("ac", "mbr → ac", "mbr->ac"), values(`${leftResult}`, `ac=${leftResult}`), "Die waarde uit MBR word die nuwe waarde van AC."),
            ]
          : [finalOperation(left, leftResult)],
      },
      {
        title: "Gaan-haal-fase (regter instruksie)",
        rows: [
          row("1", "IR", right.opcode, values("ir", "ibr → ir", "ibr->ir"), values(right.opcode), "Die opcode kom direk uit IBR; jy haal nie weer ’n 40-bis woord uit hoofgeheue nie."),
          row("2", "MAR", `${right.address}`, values("mar", "ibr → mar", "ibr->mar"), values(`${right.address}`, `mar=${right.address}`), "MAR ontvang die regter instruksie se adresveld uit IBR."),
        ],
      },
      { title: "Uitvoer-fase (regter instruksie)", action: rightAction, rows: [finalOperation(right, rightResult, leftResult)] },
    ],
  };
}

const scenarios: Scenario[] = [
  makeScenario({ id: "load-store", label: "01 · LOAD + STORE", memoryAddress: 10, left: { opcode: "LOAD", address: 20, operand: 13, result: 13 }, right: { opcode: "STORE", address: 21, result: 13 }, initial: "PC = 10; M(20) = 13; AC = 0", goal: "Laai 13 na AC en stoor daarna 13 in M(21)." }),
  makeScenario({ id: "load-add", label: "02 · LOAD + ADD", memoryAddress: 4, left: { opcode: "LOAD", address: 30, operand: 7, result: 7 }, right: { opcode: "ADD", address: 31, operand: 5, result: 12 }, initial: "PC = 4; M(30) = 7; M(31) = 5; AC = 0", goal: "Laai 7 na AC en tel daarna 5 by om AC = 12 te kry." }),
  makeScenario({ id: "load-sub", label: "03 · LOAD + SUB", memoryAddress: 7, left: { opcode: "LOAD", address: 40, operand: 18, result: 18 }, right: { opcode: "SUB", address: 41, operand: 6, result: 12 }, initial: "PC = 7; M(40) = 18; M(41) = 6; AC = 0", goal: "Laai 18 na AC en trek daarna 6 af om AC = 12 te kry." }),
  makeScenario({ id: "add-store", label: "04 · ADD + STORE", memoryAddress: 12, left: { opcode: "ADD", address: 50, operand: 4, result: 13 }, right: { opcode: "STORE", address: 51, result: 13 }, initial: "PC = 12; AC = 9; M(50) = 4; M(51) = 0", goal: "Tel 4 by AC=9 om AC = 13 te kry en stoor daarna 13 in M(51)." }),
  makeScenario({ id: "add-load", label: "05 · ADD + LOAD", memoryAddress: 2, left: { opcode: "ADD", address: 60, operand: 8, result: 10 }, right: { opcode: "LOAD", address: 61, operand: 33, result: 33 }, initial: "PC = 2; AC = 2; M(60) = 8; M(61) = 33", goal: "Tel 8 by AC=2 om AC = 10 te kry; die regter LOAD vervang dit daarna met 33." }),
];

const idFor = (scenarioId: string, phaseIndex: number, rowIndex: number, field: "register" | "value") => `${scenarioId}-${phaseIndex}-${rowIndex}-${field}`;

export function IasPhaseFillExercise() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [marked, setMarked] = useState<Record<string, boolean>>({});
  const scenario = scenarios[activeIndex];
  const questionNumber = String(activeIndex + 1).padStart(2, "0");
  const totalFields = useMemo(() => scenario.phases.reduce((count, phase) => count + phase.rows.length * 2, 0), [scenario]);
  const correctFields = useMemo(() => scenario.phases.reduce((count, phase, phaseIndex) => count + phase.rows.reduce((rowCount, item, rowIndex) => {
    const registerCorrect = item.registerAnswers.some((answer) => normalise(answers[idFor(scenario.id, phaseIndex, rowIndex, "register")] ?? "") === normalise(answer));
    const valueCorrect = item.valueAnswers.some((answer) => normalise(answers[idFor(scenario.id, phaseIndex, rowIndex, "value")] ?? "") === normalise(answer));
    return rowCount + Number(registerCorrect) + Number(valueCorrect);
  }, 0), 0), [answers, scenario]);
  const isMarked = marked[scenario.id] ?? false;

  const changeAnswer = (id: string, value: string) => { setAnswers((current) => ({ ...current, [id]: value })); setMarked((current) => ({ ...current, [scenario.id]: false })); };
  const resetCurrent = () => {
    const prefix = `${scenario.id}-`;
    setAnswers((current) => Object.fromEntries(Object.entries(current).filter(([key]) => !key.startsWith(prefix))));
    setMarked((current) => ({ ...current, [scenario.id]: false }));
  };
  const isCorrect = (value: string, accepted: string[]) => accepted.some((answer) => normalise(value) === normalise(answer));

  return <section className="ias-phase-fill" aria-labelledby="ias-phase-fill-heading">
    <header>
      <span>LE5 / IAS / INVULOEFENINGE</span>
      <h3 id="ias-phase-fill-heading">Voltooi die IAS-fasetabel soos in die TKA.</h3>
      <p>Kies een van die vyf oefenbladsye. Elke blad gee ’n nuwe linker/regter-instruksiepad; vul ná elke oordrag die <b>register</b> en sy <b>nuwe waarde</b> in.</p>
    </header>

    <nav className="ias-phase-fill__pages" aria-label="IAS-oefenbladsye">
      {scenarios.map((item, index) => <button type="button" key={item.id} className={index === activeIndex ? "ias-phase-fill__page--active" : ""} aria-current={index === activeIndex ? "page" : undefined} onClick={() => setActiveIndex(index)}>{item.label}</button>)}
    </nav>

    <div className="ias-phase-fill__page-title"><span>OEFENBLAD {questionNumber} VAN 05</span><b>{scenario.left.opcode} links · {scenario.right.opcode} regs</b><small>Gebruik die vorige/volgende knoppie of kies direk bo.</small></div>
    <div className="ias-phase-fill__brief">
      <div><span>GEHEUEWOORD</span><code>M({scenario.memoryAddress}) = {instructionText(scenario.left)} | {instructionText(scenario.right)}</code></div>
      <div><span>BEGINWAARDES</span><code>{scenario.initial}</code></div>
      <div><span>DOEL</span><strong>{scenario.goal}</strong></div>
    </div>
    <div className="ias-phase-fill__hint"><b>Werkreël:</b> voltooi eers die linker instruksie. IBR bewaar die regter instruksie; die regterinstruksie beweeg dus van IBR na IR/MAR sonder ’n tweede 40-bis geheuelees.</div>

    <div className="ias-phase-fill__table-wrap">
      <table>
        <thead><tr><th>Stap-nr</th><th>Register</th><th>Waarde</th></tr></thead>
        <tbody>{scenario.phases.map((phase, phaseIndex) => <Fragment key={phase.title}>
          <tr className="ias-phase-fill__phase"><td colSpan={3}>{phase.title}</td></tr>
          {phase.rows.map((item, rowIndex) => {
            const registerId = idFor(scenario.id, phaseIndex, rowIndex, "register");
            const valueId = idFor(scenario.id, phaseIndex, rowIndex, "value");
            const registerCorrect = isCorrect(answers[registerId] ?? "", item.registerAnswers);
            const valueCorrect = isCorrect(answers[valueId] ?? "", item.valueAnswers);
            return <tr key={`${phase.title}-${item.step}`}><td className="ias-phase-fill__step">{item.step}</td><td><input aria-label={`${scenario.label}, ${phase.title}, stap ${item.step}: register`} className={isMarked ? (registerCorrect ? "ias-phase-fill__correct" : "ias-phase-fill__wrong") : ""} value={answers[registerId] ?? ""} onChange={(event) => changeAnswer(registerId, event.target.value)} placeholder="Register / beweging" />{isMarked && !registerCorrect ? <small><b>{item.register}</b> — {item.note}</small> : null}</td><td><input aria-label={`${scenario.label}, ${phase.title}, stap ${item.step}: waarde`} className={isMarked ? (valueCorrect ? "ias-phase-fill__correct" : "ias-phase-fill__wrong") : ""} value={answers[valueId] ?? ""} onChange={(event) => changeAnswer(valueId, event.target.value)} placeholder="Nuwe waarde" />{isMarked && !valueCorrect ? <small><b>{item.value}</b> — {item.note}</small> : null}</td></tr>;
          })}
          {phase.action ? <tr className="ias-phase-fill__action"><td colSpan={3}>{phase.action}</td></tr> : null}
        </Fragment>)}</tbody>
      </table>
    </div>

    <footer>
      <div className="ias-phase-fill__pager"><button type="button" onClick={() => setActiveIndex((index) => Math.max(0, index - 1))} disabled={activeIndex === 0}><ChevronLeft className="size-4"/>Vorige blad</button><span>{questionNumber} / 05</span><button type="button" onClick={() => setActiveIndex((index) => Math.min(scenarios.length - 1, index + 1))} disabled={activeIndex === scenarios.length - 1}>Volgende blad<ChevronRight className="size-4"/></button></div>
      <button type="button" className="ias-phase-fill__mark" onClick={() => setMarked((current) => ({ ...current, [scenario.id]: true }))}><Check className="size-4"/>Merk hierdie tabel</button>
      <button type="button" className="ias-phase-fill__reset" onClick={resetCurrent}><RotateCcw className="size-3.5"/>Herstel hierdie blad</button>
      {isMarked ? <p><b>Nasien:</b> {correctFields}/{totalFields} velde korrek. Groen is korrek; by ’n rooi veld verskyn die verwagte waarde en waarom daardie register in dié fase verander.</p> : <p><b>Wenk:</b> skryf ’n kort antwoord soos <code>MAR</code> en <code>20</code>; die pyltjiepad mag ook in die registerveld wees.</p>}
    </footer>
  </section>;
}
