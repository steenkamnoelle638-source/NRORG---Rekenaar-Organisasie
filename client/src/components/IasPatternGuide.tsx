/* Ingenieurswerkboek: IAS-registeroordragte word as ’n herhaalbare tabelinvulpatroon gelees. */
import "./ias-pattern-guide.css";

const fetchRows = [
  ["1", "PC → MAR", "MAR kry die adres wat in PC was"],
  ["2", "Geheue-leeslyn", "Leeslyn = aktief"],
  ["3", "M(MAR) → MBR", "MBR kry die 40-bis geheuewoord"],
  ["4", "MBR(linker opcode) → IR", "IR kry die linker opcode"],
  ["5", "MBR(linker adres) → MAR", "MAR kry die linker operandadres"],
  ["6", "MBR(regter instruksie) → IBR", "IBR hou die regter 20-bis instruksie"],
];

export function IasPatternGuide() {
  return <section className="ias-pattern-guide">
    <header><span>LE5 / IAS-TABELPATROON</span><h3>Volg die pyltjies; skryf elke nuwe waarde ná die beweging.</h3><p>Moenie die tabel bloot van bo na onder raai nie. Identifiseer eers die linker of regter instruksie en volg dan die registeroordragte.</p></header>
    <div className="ias-pattern-guide__route"><article><span>1 / GAAN HAAL LINKS</span><b>PC → MAR → geheue → MBR → IR/IBR</b><p>Die linker opcode en adres gaan na IR/MAR. Die regter 20-bis instruksie wag in IBR.</p></article><i>→</i><article><span>2 / VOER LINKS UIT</span><b>MAR → geheue → MBR → AC/MQ</b><p>Dekodeer IR. Lees ’n operand net wanneer die opcode ’n geheuewaarde vereis.</p></article><i>→</i><article><span>3 / GAAN HAAL REGS</span><b>IBR(opcode) → IR; IBR(adres) → MAR</b><p>Moenie weer ’n 40-bis woord uit geheue haal nie—die regter instruksie is reeds in IBR.</p></article><i>→</i><article><span>4 / VOER REGS UIT</span><b>dekodeer → lees/skryf/bereken</b><p>Die uitvoerpad hang van die opcode af; volg die nuwe waarde in AC, MQ of geheue.</p></article></div>
    <div className="ias-pattern-guide__grid"><section><h4>Begin elke tabel so.</h4><div className="overflow-x-auto"><table><thead><tr><th>Stap</th><th>Register / beweging</th><th>Waarde ná die stap</th></tr></thead><tbody>{fetchRows.map(row=><tr key={row[0]}><td>{row[0]}</td><td><code>{row[1]}</code></td><td>{row[2]}</td></tr>)}</tbody></table></div></section><aside><h4>Uitvoer verander volgens die opcode.</h4><dl><div><dt>Laai / lees</dt><dd><code>MAR → geheue → MBR → AC</code></dd></div><div><dt>Tel op</dt><dd><code>MAR → geheue → MBR; AC + MBR → AC</code></dd></div><div><dt>Trek af</dt><dd><code>MAR → geheue → MBR; AC − MBR → AC</code></dd></div><div><dt>Stoor</dt><dd><code>AC/MQ → MBR; MBR → M(MAR)</code></dd></div><div><dt>Sprong</dt><dd><code>adresveld → PC</code></dd></div></dl><p><b>Skryfaksie:</b> noem die geheue-skryflyn apart wanneer MBR na geheue gaan.</p></aside></div>
    <footer><b>Eksamenkontrolelys</b><span>Linker of regter instruksie?</span><i>•</i><span>Watter register/lyn verander nou?</span><i>•</i><span>Skryf die nuwe, nie ou, waarde.</span><i>•</i><span>Herhaal nie die geheue-haalfase vir IBR nie.</span></footer>
  </section>;
}
