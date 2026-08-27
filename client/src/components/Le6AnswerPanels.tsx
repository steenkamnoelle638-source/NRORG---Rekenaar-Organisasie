/* Ingenieurswerkboek: LE6-antwoorde gebruik die Word-bron se kleurgekodeerde registerkettings en TKA-styl. */
import { Check, ChevronRight, Network } from "lucide-react";
import { useState } from "react";
import "./le6-answer-panels.css";

type DependencyTone = "red" | "orange" | "green" | "teal";

function Dependency({ tone, children }: { tone: DependencyTone; children: string }) {
  return <mark className={`le6-answer__dependency le6-answer__dependency--${tone}`}>{children}</mark>;
}

function SuperscalarAnswer() {
  return <div className="le6-answer__body">
    <section className="le6-answer__question">
      <span>ANTWOORD / SUPERSKALA</span>
      <h4>Ken eers die uitvoeringseenheid toe.</h4>
      <table>
        <thead><tr><th>Instruksie</th><th>Eenheid</th><th>Waarom?</th></tr></thead>
        <tbody>
          <tr><td><code>mov eax, [a]</code></td><td><b>LSE</b></td><td>Geheue-toegang / laai.</td></tr>
          <tr><td><code>add ebx, eax</code></td><td><b>RLE</b></td><td>Rekenkundige en logiese optel.</td></tr>
          <tr><td><code>sub ecx, ebx</code></td><td><b>RLE</b></td><td>Rekenkundige en logiese aftrek.</td></tr>
          <tr><td><code>mov edx, [b]</code></td><td><b>LSE</b></td><td>Geheue-toegang / laai.</td></tr>
          <tr><td><code>imul esi, edx</code></td><td><b>VVE</b></td><td>Vermenigvuldiging.</td></tr>
          <tr><td><code>add edi, esi</code></td><td><b>RLE</b></td><td>Rekenkundige en logiese optel.</td></tr>
        </tbody>
      </table>
    </section>

    <div className="le6-answer__split">
      <article className="le6-answer__card le6-answer__card--ready">
        <header><Check className="size-4"/><span>ANTWOORD</span><h4>Gelyktydige uitvoering</h4></header>
        <div className="le6-answer__code-stack">
          <code>mov eax, [a]</code>
          <code>add ecx, edx</code>
          <code>imul esi, edi</code>
        </div>
        <p><b>Motivering:</b> Hierdie instruksies kan in <strong>aparte uitvoeringseenhede</strong> uitvoer en het geen afhanklikhede nie. LSE, RLE en VVE kan dus terselfdertyd begin.</p>
      </article>

      <article className="le6-answer__card le6-answer__card--wait">
        <header><ChevronRight className="size-4"/><span>ANTWOORD</span><h4>Instruksies wat eers moet wag</h4></header>
        <div className="le6-answer__code-stack le6-answer__code-stack--yellow">
          <code>mov ebx, [b]</code>
          <code>add ecx, edx</code>
          <code>sub ebx, ecx</code>
          <code>add eax, ebx</code>
        </div>
        <p><b>Motivering:</b> Hierdie stel deel uitvoeringseenhede, maar is ook afhanklik van ander instruksies om eers te voltooi. Die <mark>geel</mark> pare toon waar parallelle uitvoering slegs moontlik is wanneer die nodige resultaat reeds beskikbaar is.</p>
      </article>
    </div>

    <aside className="le6-answer__rule"><b>Eksamenreël:</b> “Verskillende uitvoeringseenhede” is nie genoeg nie—kontroleer ook of ’n instruksie ’n register lees wat ’n vorige instruksie nog moet skryf.</aside>
  </div>;
}

function DataflowAnswer() {
  return <div className="le6-answer__body">
    <section className="le6-answer__question">
      <span>ANTWOORD / DATAVLOEI</span>
      <h4>Onderstreep en verbind elke afhanklike registerketting.</h4>
      <p>Die kleure volg jou Word-antwoord: dieselfde kleur verbind die verskafferinstruksie se uitvoer met die verbruikerinstruksie se invoer.</p>
      <div className="le6-answer__legend"><span><Dependency tone="red">eax</Dependency> eerste laai → eerste optel</span><span><Dependency tone="orange">ebx</Dependency> eerste optel → aftrek</span><span><Dependency tone="green">edx</Dependency> tweede laai → vermenigvuldiging</span><span><Dependency tone="teal">esi</Dependency> vermenigvuldiging → laaste optel</span></div>
    </section>

    <div className="le6-answer__table-wrap">
      <table className="le6-answer__pipeline">
        <thead><tr><th>Siklus</th><th>GH</th><th>DE</th><th>UV</th></tr></thead>
        <tbody>
          <tr><td>1</td><td><code>mov <Dependency tone="red">eax</Dependency>, [a]</code></td><td></td><td></td></tr>
          <tr><td>2</td><td><code>add <Dependency tone="orange">ebx</Dependency>, <Dependency tone="red">eax</Dependency></code></td><td><code>mov <Dependency tone="red">eax</Dependency>, [a]</code></td><td></td></tr>
          <tr><td>3</td><td><code>sub ecx, <Dependency tone="orange">ebx</Dependency></code></td><td><code>add <Dependency tone="orange">ebx</Dependency>, <Dependency tone="red">eax</Dependency></code></td><td><code>mov <Dependency tone="red">eax</Dependency>, [a]</code></td></tr>
          <tr><td>4</td><td><code>mov <Dependency tone="green">edx</Dependency>, [b]</code></td><td><code>sub ecx, <Dependency tone="orange">ebx</Dependency></code></td><td><code>add <Dependency tone="orange">ebx</Dependency>, <Dependency tone="red">eax</Dependency></code></td></tr>
          <tr><td>5</td><td><code>imul <Dependency tone="teal">esi</Dependency>, <Dependency tone="green">edx</Dependency></code></td><td><code>mov <Dependency tone="green">edx</Dependency>, [b]</code></td><td><code>sub ecx, <Dependency tone="orange">ebx</Dependency></code></td></tr>
          <tr><td>6</td><td><code>add edi, <Dependency tone="teal">esi</Dependency></code></td><td><code>imul <Dependency tone="teal">esi</Dependency>, <Dependency tone="green">edx</Dependency></code></td><td><code>mov <Dependency tone="green">edx</Dependency>, [b]</code></td></tr>
          <tr><td>7</td><td></td><td><code>add edi, <Dependency tone="teal">esi</Dependency></code></td><td><code>imul <Dependency tone="teal">esi</Dependency>, <Dependency tone="green">edx</Dependency></code></td></tr>
          <tr><td>8</td><td></td><td></td><td><code>add edi, <Dependency tone="teal">esi</Dependency></code></td></tr>
        </tbody>
      </table>
    </div>

    <div className="le6-answer__explanations">
      <article><b>Vraag 1 · Die probleem</b><p>Die dekodeerder kan nog nie afhanklike registers opstel voordat die uitvoer van die verskafferinstruksies voltooi is nie. Die verbruiker lees anders ’n ou of onvolledige waarde.</p></article>
      <article><b>Vraag 2 · Een oplossing</b><p>Vertraag die dekodeerfase totdat die uitvoer klaar is. Dit voeg ’n stilstand (stall) in, maar verhoed dat ’n afhanklike instruksie die verkeerde registerwaarde gebruik.</p></article>
    </div>

    <section className="le6-answer__stall">
      <header><Network className="size-4"/><b>VOORBEELD: vertraging totdat UV klaar is</b></header>
      <table>
        <thead><tr><th>Siklus</th><th>GH</th><th>DE</th><th>UV</th></tr></thead>
        <tbody>
          <tr><td>3</td><td><code>sub ecx, <Dependency tone="orange">ebx</Dependency></code></td><td><code>add <Dependency tone="orange">ebx</Dependency>, <Dependency tone="red">eax</Dependency></code></td><td><code>mov <Dependency tone="red">eax</Dependency>, [a]</code></td></tr>
          <tr><td>4</td><td><code>mov <Dependency tone="green">edx</Dependency>, [b]</code></td><td><code>sub ecx, <Dependency tone="orange">ebx</Dependency></code></td><td><em>← Vertraging: geen instruksie is tans in UV nie.</em></td></tr>
          <tr><td>5</td><td><code>imul <Dependency tone="teal">esi</Dependency>, <Dependency tone="green">edx</Dependency></code></td><td><code>mov <Dependency tone="green">edx</Dependency>, [b]</code></td><td><code>sub ecx, <Dependency tone="orange">ebx</Dependency></code></td></tr>
          <tr><td>6</td><td><code>add edi, <Dependency tone="teal">esi</Dependency></code></td><td><code>imul <Dependency tone="teal">esi</Dependency>, <Dependency tone="green">edx</Dependency></code></td><td><code>mov <Dependency tone="green">edx</Dependency>, [b]</code></td></tr>
        </tbody>
      </table>
    </section>
  </div>;
}

export function Le6AnswerPanels() {
  const [active, setActive] = useState<"superskala" | "datavloei">("superskala");
  return <section className="le6-answer-panel">
    <header><span>LE6 / TKA-ANTWOORDKONTROLE</span><h3>Vergelyk jou werk met die Word-bron se antwoord.</h3><p>Gebruik die kleur en motivering om te sien <b>waarom</b> ’n instruksie gelyktydig kan loop, wag, of ’n pyplynvertraging veroorsaak.</p></header>
    <nav aria-label="LE6 antwoordbladsye"><button type="button" onClick={() => setActive("superskala")} className={active === "superskala" ? "le6-answer-panel__active" : ""}>Superskala verwerking vb · antwoord</button><button type="button" onClick={() => setActive("datavloei")} className={active === "datavloei" ? "le6-answer-panel__active" : ""}>Datavloei analisering vb · antwoord</button></nav>
    {active === "superskala" ? <SuperscalarAnswer /> : <DataflowAnswer />}
  </section>;
}
