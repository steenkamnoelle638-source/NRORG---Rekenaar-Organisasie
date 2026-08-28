/* Geïntegreerde Word-uitleg: voorbeelde word binne die onderwerpkaart geplaas, nie in ’n los voorbeeldbank nie. */
import { Play } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import "./example-expansions.css";
import "./adder-example-tables.css";
import "./two-complement-reminder.css";

type PortalProps = { selector: string; children: ReactNode };
function IntoLessonBlock({ selector, children }: PortalProps) {
  const [target, setTarget] = useState<HTMLElement | null>(null);
  useEffect(() => setTarget(document.querySelector<HTMLElement>(selector)), [selector]);
  return target ? createPortal(children, target) : null;
}

function ExampleToggle({ label = "Wys 2 voorbeelde", children }: { label?: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return <section className="embedded-examples"><button type="button" onClick={() => setOpen(!open)}><Play className="size-3.5" />{open ? "Versteek voorbeelde" : label}</button>{open ? <div className="embedded-examples__content">{children}</div> : null}</section>;
}

function TwoComplementExamples() {
  return <ExampleToggle><div className="complement-example-grid">{[["Voorbeeld A · −3", "+3 = 0011", "1100", "1101"], ["Voorbeeld B · −6", "+6 = 0110", "1001", "1010"]].map(([title, start, inverted, result]) => <section key={title}><b>{title}</b><div className="complement-example-grid__steps"><table><thead><tr><th>Begin</th><th>Inverseer elke bis</th></tr></thead><tbody><tr><td>{start}</td><td>{inverted}</td></tr></tbody></table><span>+</span><table><thead><tr><th>Tel 1 by</th></tr></thead><tbody><tr><td>{inverted} + 0001 = <strong>{result}</strong></td></tr></tbody></table></div><p><b>Antwoord:</b> {result}₂.</p></section>)}</div></ExampleToggle>;
}

function BusExamples() {
  return <ExampleToggle><table className="embedded-bit-table"><thead><tr><th>Voorstelling</th><th>Oorspronklik</th><th></th><th>Uitgebreid na 8 bis</th></tr></thead><tbody><tr><td>Unsigned</td><td><code>1011</code></td><td>→</td><td><code>0000 <i>1011</i></code></td></tr><tr><td>Twee-komplement</td><td><code>1011</code></td><td>→</td><td><code>1111 <i>1011</i></code></td></tr></tbody></table><p>Die spasie deel die twee 4-bis groepe. Unsigned kry nulle links; twee-komplement herhaal die tekenbis.</p></ExampleToggle>;
}

function OverflowExamples() {
  return <ExampleToggle><table className="embedded-overflow-table"><thead><tr><th>Voorbeeld</th><th>Berekening</th><th>Antwoord</th><th>Waarom?</th></tr></thead><tbody><tr><td>Positiewe oorloop</td><td><code>0111 (+7) + 0001 (+1)</code></td><td><code><mark>1</mark>000</code></td><td>Twee <b>+</b>-insette gee ’n <b>−</b>-tekenbis: <strong>oorloop</strong>.</td></tr><tr><td>Negatiewe oorloop</td><td><code>1000 (−8) + 1111 (−1)</code></td><td><code><mark>0</mark>111</code></td><td>Twee <b>−</b>-insette gee ’n <b>+</b>-tekenbis: <strong>oorloop</strong>.</td></tr></tbody></table><p><b>Oorloopreël:</b> by twee-komplement wys dieselfde teken in, maar die teenoorgestelde teken uit, dat die antwoord nie in die vaste bislengte pas nie.</p></ExampleToggle>;
}

function AdditionExamples() {
  const rows = [["A", "0101", "0011", "1000", "8", "Oorloop"], ["B", "0111", "0001", "1000", "8", "Oorloop"], ["C", "1011", "1101", "1000", "−8", "Geen oorloop"], ["D", "0100", "1101", "0001", "1", "Geen oorloop"], ["E", "1000", "1111", "0111", "7", "Oorloop"], ["F", "0011", "0100", "0111", "7", "Geen oorloop"]];
  return <ExampleToggle label="Wys voorbeelde A–F"><table className="embedded-overflow-table"><thead><tr><th>Voorbeeld</th><th>A</th><th>+</th><th>B</th><th>4-bis antwoord</th><th>Desimaal / nota</th></tr></thead><tbody>{rows.map((row) => <tr key={row[0]}>{row.map((cell, i) => <td key={i}>{i === 4 ? <code>{cell}</code> : cell}</td>)}</tr>)}</tbody></table></ExampleToggle>;
}

function MultiplicationExamples() {
  const examples = [["Voorbeeld A · 5 × 3", [["Begin", "0", "0000", "0011", "0101", "Q₀=1; begin"], ["Siklus 1", "0", "0010", "1001", "0101", "A←A+M; skuif"], ["Siklus 2", "0", "0011", "1100", "0101", "A←A+M; skuif"], ["Siklus 3", "0", "0001", "1110", "0101", "Q₀=0; slegs skuif"], ["Siklus 4", "0", "0000", "1111", "0101", "Q₀=0; slegs skuif"]], "A|Q = 0000 1111 = 15"], ["Voorbeeld B · 4 × 6", [["Begin", "0", "0000", "0110", "0100", "Q₀=0; begin"], ["Siklus 1", "0", "0000", "0011", "0100", "Q₀=0; slegs skuif"], ["Siklus 2", "0", "0010", "0001", "0100", "A←A+M; skuif"], ["Siklus 3", "0", "0011", "0000", "0100", "A←A+M; skuif"], ["Siklus 4", "0", "0001", "1000", "0100", "Q₀=0; slegs skuif"]], "A|Q = 0001 1000 = 24"]] as const;
  return <ExampleToggle>{examples.map(([title, rows, answer]) => <section className="embedded-multiply" key={title}><b>{title}</b><div className="embedded-scroll"><table><thead><tr><th>Stap</th><th>C</th><th>A</th><th>Q</th><th>M</th><th>Nota / aksie</th></tr></thead><tbody>{rows.map((row) => <tr key={row[0]}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody></table></div><p><b>Antwoord:</b> {answer}</p></section>)}</ExampleToggle>;
}

export function DivisionExamples() {
  const examples = [["Voorbeeld A · 147 ÷ 11", "1011", "10010011", "00001101", "0100", ["1 < 1011; skryf 0", "10 < 1011; skryf 0", "100 < 1011; skryf 0", "1001 < 1011; skryf 0", "10010 − 01011 = 00111; skryf 1", "1110 − 1011 = 0011; skryf 1", "111 < 1011; skryf 0", "1111 − 1011 = 0100; skryf 1"], "13 res 4"], ["Voorbeeld B · 84 ÷ 7", "0111", "01010100", "00001100", "0000", ["0 < 0111; skryf 0", "01 < 0111; skryf 0", "010 < 0111; skryf 0", "0101 < 0111; skryf 0", "1010 − 0111 = 0011; skryf 1", "0111 − 0111 = 0000; skryf 1", "0 < 0111; skryf 0", "00 < 0111; skryf 0"], "12 res 0"]] as const;
  return <section className="embedded-division-set"><header><span>DELING / 2 VOORBEELDE</span></header><ExampleToggle><div className="embedded-long-format-grid">{examples.map(([title, divisor, dividend, quotient, remainder, steps, answer]) => <section className="embedded-long-format" key={title}><h4>{title}</h4><div className="long-sheet__head"><div className="long-sheet__bracket"><b>{divisor}</b><i>⟌</i><span>{dividend}</span></div><div className="long-sheet__quotient"><span>HEELGETAL DEEL</span>{quotient.split("").map((bit, i) => <code key={i}>{bit}</code>)}</div></div><div className="long-sheet__legend"><b>Deler links</b><b>Dividend onder</b><b>Kwosiënt bo</b><b>Werklynne onder</b></div><ol className="long-sheet__worklines">{steps.map((step, i) => <li className="long-sheet__workline long-sheet__workline--yes" key={i}><span className="long-sheet__step">{i + 1}</span><label><small>langdelingstap</small><code>{step}</code></label></li>)}</ol><div className="arithmetic-workbook__long-result"><span>RES DEEL VAN ANTWOORD IN BINÊR</span><strong>{remainder}</strong><strong>Antwoord: {answer}</strong></div></section>)}</div></ExampleToggle></section>;
}

function Le3AdderExamples({ full = false }: { full?: boolean }) {
  const headings = full ? ["Voorbeeld", "A", "B", "Cin", "Som", "Cout"] : ["Voorbeeld", "A", "B", "Som", "Dra"];
  const rows = full ? [["A", "1", "1", "1", "1", "1"], ["B", "1", "0", "1", "0", "1"]] : [["A", "1", "1", "0", "1"], ["B", "1", "0", "1", "0"]];
  return <ExampleToggle><table className="embedded-adder-table"><thead><tr>{headings.map((heading) => <th key={heading}>{heading}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row[0]}>{row.map((cell, i) => <td key={i}>{cell}</td>)}</tr>)}</tbody></table><p>Elke ry wys een volledige voorbeeld met insette, som en oordrag.</p></ExampleToggle>;
}

export function Le2ExampleExpansions() {
  return <><IntoLessonBlock selector=".negative-numbers__methods article:nth-of-type(1)"><ExampleToggle><div className="embedded-sign-grid"><p><b>Voorbeeld A · +5</b><code>0 | 101</code><span>0 wys positief; 101₂ = 5.</span></p><p><b>Voorbeeld B · −5</b><code>1 | 101</code><span>1 wys negatief; omvang bly 101₂ = 5.</span></p></div></ExampleToggle></IntoLessonBlock><IntoLessonBlock selector=".negative-numbers__methods article:nth-of-type(2)"><TwoComplementExamples /></IntoLessonBlock><IntoLessonBlock selector=".negative-numbers__rules > div:first-child"><BusExamples /></IntoLessonBlock><IntoLessonBlock selector=".negative-numbers__rules > div:last-child"><OverflowExamples /></IntoLessonBlock><IntoLessonBlock selector=".integer-calculation__blocks > article:nth-of-type(1)"><AdditionExamples /></IntoLessonBlock><IntoLessonBlock selector=".integer-calculation__blocks > article:nth-of-type(2)"><MultiplicationExamples /></IntoLessonBlock></>;
}

export function Le3ExampleExpansions() {
  return <><IntoLessonBlock selector=".adder-deep > article:nth-of-type(1)"><Le3AdderExamples /></IntoLessonBlock><IntoLessonBlock selector=".adder-deep > article:nth-of-type(2)"><Le3AdderExamples full /></IntoLessonBlock></>;
}
