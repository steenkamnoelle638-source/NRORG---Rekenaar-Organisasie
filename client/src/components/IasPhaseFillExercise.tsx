/* Ingenieurswerkboek: ’n TKA-agtige IAS-fasetabel laat die leerder elke registeroordrag self invul. */
import { Check, RotateCcw } from "lucide-react";
import { Fragment, useState } from "react";
import "./ias-phase-fill-exercise.css";

type AnswerRow = {
  step: string;
  register: string;
  value: string;
  registerAnswers: string[];
  valueAnswers: string[];
  note: string;
};

type Phase = {
  title: string;
  action?: string;
  rows: AnswerRow[];
};

const normalise = (value: string) => value.toLowerCase().replace(/[\s.,;:→←|()]/g, "").replace(/’/g, "'");

const phaseData: Phase[] = [
  {
    title: "Gaan-haal-fase (linker instruksie)",
    action: "Aktiveer die geheue-leeslyn",
    rows: [
      { step: "1", register: "MAR", value: "10", registerAnswers: ["mar", "pc → mar", "pc->mar"], valueAnswers: ["10", "mar=10"], note: "PC=10 beweeg na MAR; MAR kies geheuewoord 10." },
      { step: "2", register: "MBR", value: "LOAD M(20) | STORE M(21)", registerAnswers: ["mbr", "m(mar) → mbr", "mmar->mbr"], valueAnswers: ["load m20 store m21", "loadm20storem21", "m10=loadm20storem21"], note: "Die hele 40-bis woord word uit M(10) na MBR gelees." },
      { step: "3", register: "IBR", value: "STORE M(21)", registerAnswers: ["ibr", "mbr → ibr", "mbr->ibr"], valueAnswers: ["store m21", "storem21"], note: "IBR hou die regter 20-bis instruksie vir later." },
      { step: "4", register: "IR", value: "LOAD", registerAnswers: ["ir", "mbr → ir", "mbr->ir"], valueAnswers: ["load"], note: "IR ontvang die linker instruksie se opcode." },
      { step: "5", register: "MAR", value: "20", registerAnswers: ["mar", "mbr → mar", "mbr->mar"], valueAnswers: ["20", "mar=20"], note: "MAR kry die linker instruksie se operandadres." },
    ],
  },
  {
    title: "Uitvoer-fase (linker instruksie)",
    rows: [
      { step: "1", register: "MBR", value: "13", registerAnswers: ["mbr", "m20 → mbr", "m20->mbr"], valueAnswers: ["13", "m20=13"], note: "LOAD lees die data by M(20) via MBR." },
      { step: "2", register: "AC", value: "13", registerAnswers: ["ac", "mbr → ac", "mbr->ac"], valueAnswers: ["13", "ac=13"], note: "Die waarde uit MBR word die nuwe akkumulatorwaarde." },
    ],
  },
  {
    title: "Gaan-haal-fase (regter instruksie)",
    rows: [
      { step: "1", register: "IR", value: "STORE", registerAnswers: ["ir", "ibr → ir", "ibr->ir"], valueAnswers: ["store"], note: "Die opcode kom direk uit IBR; haal nie weer uit hoofgeheue nie." },
      { step: "2", register: "MAR", value: "21", registerAnswers: ["mar", "ibr → mar", "ibr->mar"], valueAnswers: ["21", "mar=21"], note: "MAR kry die regter instruksie se adresveld." },
    ],
  },
  {
    title: "Uitvoer-fase (regter instruksie)",
    action: "Aktiveer die geheue-skryflyn",
    rows: [
      { step: "1", register: "MBR → M(MAR)", value: "M(21) = 13", registerAnswers: ["mbr → mmar", "mbr->mmar", "mbr na mmar", "mbr"], valueAnswers: ["m21=13", "m21 13", "13"], note: "STORE plaas AC=13 in MBR en skryf dit na die adres wat MAR hou: M(21)." },
    ],
  },
];

const idFor = (phaseIndex: number, rowIndex: number, field: "register" | "value") => `${phaseIndex}-${rowIndex}-${field}`;

export function IasPhaseFillExercise() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [marked, setMarked] = useState(false);

  const changeAnswer = (id: string, value: string) => {
    setAnswers((current) => ({ ...current, [id]: value }));
    setMarked(false);
  };

  const isCorrect = (value: string, accepted: string[]) => accepted.some((answer) => normalise(value) === normalise(answer));
  const reset = () => {
    setAnswers({});
    setMarked(false);
  };

  return (
    <section className="ias-phase-fill" aria-labelledby="ias-phase-fill-heading">
      <header>
        <span>LE5 / IAS / INVULOEFENING</span>
        <h3 id="ias-phase-fill-heading">Voltooi die IAS-fasetabel soos in die TKA.</h3>
        <p>Vul ná elke registeroordrag die <b>register</b> en sy <b>nuwe waarde</b> in. Die groen fasebalkies beskryf die vaste volgorde; die blou velde is jou antwoordblad.</p>
      </header>

      <div className="ias-phase-fill__brief">
        <div><span>GEHEUEWOORD</span><code>M(10) = LOAD M(20) | STORE M(21)</code></div>
        <div><span>BEGINWAARDES</span><code>PC = 10; M(20) = 13; AC = 0</code></div>
        <div><span>DOEL</span><strong>Laai 13 na AC en stoor daarna 13 in M(21).</strong></div>
      </div>

      <div className="ias-phase-fill__hint"><b>Werkreël:</b> linker instruksie eers; IBR bewaar die regter instruksie; die regter instruksie gaan daarna van IBR na IR/MAR sonder ’n tweede 40-bis geheuelees.</div>

      <div className="ias-phase-fill__table-wrap">
        <table>
          <thead><tr><th>Stap-nr</th><th>Register</th><th>Waarde</th></tr></thead>
          <tbody>
            {phaseData.map((phase, phaseIndex) => (
              <Fragment key={phase.title}>
                <tr className="ias-phase-fill__phase" key={`${phase.title}-title`}><td colSpan={3}>{phase.title}</td></tr>
                {phase.rows.map((row, rowIndex) => {
                  const registerId = idFor(phaseIndex, rowIndex, "register");
                  const valueId = idFor(phaseIndex, rowIndex, "value");
                  const registerCorrect = isCorrect(answers[registerId] ?? "", row.registerAnswers);
                  const valueCorrect = isCorrect(answers[valueId] ?? "", row.valueAnswers);
                  return <tr key={`${phase.title}-${row.step}`}>
                    <td className="ias-phase-fill__step">{row.step}</td>
                    <td><input aria-label={`${phase.title}, stap ${row.step}: register`} className={marked ? (registerCorrect ? "ias-phase-fill__correct" : "ias-phase-fill__wrong") : ""} value={answers[registerId] ?? ""} onChange={(event) => changeAnswer(registerId, event.target.value)} placeholder="Register / beweging" />{marked && !registerCorrect ? <small><b>{row.register}</b> — {row.note}</small> : null}</td>
                    <td><input aria-label={`${phase.title}, stap ${row.step}: waarde`} className={marked ? (valueCorrect ? "ias-phase-fill__correct" : "ias-phase-fill__wrong") : ""} value={answers[valueId] ?? ""} onChange={(event) => changeAnswer(valueId, event.target.value)} placeholder="Nuwe waarde" />{marked && !valueCorrect ? <small><b>{row.value}</b> — {row.note}</small> : null}</td>
                  </tr>;
                })}
                {phase.action ? <tr className="ias-phase-fill__action" key={`${phase.title}-action`}><td colSpan={3}>{phase.action}</td></tr> : null}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <footer>
        <button type="button" className="ias-phase-fill__mark" onClick={() => setMarked(true)}><Check className="size-4"/>Merk my tabel</button>
        <button type="button" className="ias-phase-fill__reset" onClick={reset}><RotateCcw className="size-3.5"/>Herstel</button>
        {marked ? <p><b>Nasien:</b> groen is korrek. By ’n rooi veld verskyn die verwagte waarde en waarom daardie register in dié fase verander.</p> : <p><b>Wenk:</b> skryf ’n kort antwoord soos <code>MAR</code> en <code>20</code>; die pyltjiepad mag ook in die registerveld wees.</p>}
      </footer>
    </section>
  );
}
