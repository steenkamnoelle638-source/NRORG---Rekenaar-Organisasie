# IAS-herontwerpnotas

## LE5-verwysing: IAS Struktuur I (LE5.pdf bl. 16)

Die skyfie wys drie hoofblokke: **Main memory (M)** links, die **Central processing unit (CPU)** in die middel, en **Input-output equipment (I,O)** regs. Binne die CPU is daar twee gestippelde onderafdelings: **Arithmetic-logic unit (CA)** bo en **Program control unit (CC)** onder. Die CA bevat **AC**, **MQ**, **Arithmetic-logic circuits**, en **MBR**. Die CC bevat **PC**, **IBR**, **MAR**, **IR**, en **Control circuits**.

Die belangrike verbindings wat die webskets ook moet wys, is:

1. ’n **Instruksies en data**-lyn vanaf hoofgeheue na die CPU se middel/MBR-pad.
2. ’n Tweede **Instruksies en data**-lyn vanaf CPU na die toevoer/afvoerblok.
3. ’n Afsonderlike **Addresses**-lyn onderaan vanaf die CC/MAR-rigting na hoofgeheue.
4. ’n **Tweerigting-skakel AC ↔ MQ**.
5. Pyle van **AC** en **MQ** af ondertoe na die **Arithmetic-logic circuits** en weer opwaarts/terug waar toepaslik.
6. ’n Vertikale pad tussen **Arithmetic-logic circuits** en **MBR**.
7. In die CC is daar skakels **PC ↓ MAR**, **IBR ↓ IR**, en ’n koppeling vanaf die geheuelyn na **IBR/IR/MAR**.

## LE5-verwysing: IAS Struktuur II (LE5.pdf bl. 17)

Benamings moet eksplisiet en volledig wees:

| Register/komponent | Benaming op skyfies |
| --- | --- |
| AC | Accumulator / Opteller |
| MQ | Multiply-quotient register |
| MBR | Memory buffer register |
| IBR | Instruction buffer register |
| PC | Program counter |
| MAR | Memory address register |
| IR | Instruction register |
| Control circuits | Beheer stroombane |

## LE5-verwysing: IAS Geheue struktuur (LE5.pdf bl. 18)

Die geheueformaat moet wys dat ’n **number word** 40 bis lank is, met die **sign bit** links en merkers by **0**, **1** en **39**. Die **instruction word** moet as twee 20-bis helftes verskyn: **left instruction (20 bits)** en **right instruction (20 bits)**. Elke helfte bestaan uit **opcode (8 bits)** en **address (12 bits)**, met merkers by **0, 8, 20, 28, 39**.

## LE5-verwysing: IAS proses (LE5.pdf bl. 19)

Die gaan-haalvloei moet vollediger wees as net vier los stappe. Die skyfie beklemtoon:

1. Toets eers of die **next instruction in IBR** is.
2. Indien nee: **MAR ← PC**, dan **MBR ← M(MAR)**.
3. Toets of die **left instruction required** is.
4. Indien ja: **IBR ← MBR(20:39)**, **IR ← MBR(0:7)**, **MAR ← MBR(8:19)**.
5. Indien nee en geen geheuetoegang nodig is nie: **IR ← IBR(0:7)** en **MAR ← IBR(8:19)**.
6. Daarna **PC ← PC + 1** voordat die uitvoersiklus se relevante datapad gevolg word.

## Ontwerpimplikasie vir die webblad

Die nuwe IAS-skets moet nie soos los kaarte lyk nie. Dit moet soos ’n **samehangende blokdiagram** werk, met getekende rigtingpyle, benoemde busse, en duidelike verhouding tussen geheue, CPU en I/O. Die detailpaneel kan steeds interaktief bly, maar die basisdiagram moet eers self volledig leesbaar wees sonder dat ’n gebruiker hoef te klik.

## LE6 TKA-memo: vraaguitleg (LE6_TKA_Memo.pdf bl. 1–2)

Die pyplynantwoordblad het eers ’n eenvoudige identiteitskop, gevolg deur **Opdrag 1 – Antwoord** met ’n 4-kolom rooster: **Siklus**, **GH**, **DE** en **UV**. Die korrekte drie-stadium patroon vul instruksies diagonaal oor opeenvolgende siklusse. Onder die rooster is daar twee kortvrae met ruimte vir verduidelikings. Die memo gee die kernverduideliking dat die dekodeerder nie afhanklike registers kan opstel voordat die verskafferinstruksie se uitvoer voltooi is nie, en dat ’n vertraging in DE een manier is om die probleem te hanteer.

**Opdrag 2 – Antwoord** gebruik ’n tweede tabel met vier kolomme: **GH nommer**, **Werklik – Resultaat**, **Voorspel** en **Reg/Fout**. Die terugvoer bereken daarna **totale straf**, **totale werklike siklusse**, en vergelyk die resultaat met ’n scenario sonder pyplyn. Dit is die patroon wat die nuwe Vraag 5 moet volg.

**Oefening 3 – Antwoord** groepeer instruksies volgens uitvoeringseenheid (LSE, RLE, VVE) en vra vir twee antwoordareas: **Gelyktydige uitvoering** en **Instruksies wat eers moet wag**, elk gevolg deur ’n kort motivering. Die eerste lys moet slegs onafhanklike instruksies op verskillende uitvoeringseenhede bevat; die tweede lys moet afhanklike instruksies of instruksies wat ’n eenheid deel, bevat.

## Handgeskrewe notas: bladsye 1–6

Die eerste ses bladsye bevestig die beste leerpatrone vir LE1 en LE2. LE1 gebruik groot, stapsgewyse opskrifte vir **Desimaal → Binêr**, **Desimaal → Heksadesimaal**, **Breuke**, en **Heksadesimaal → Binêr**, met posisiewaardetabelle en delingsresidu’s. Die webopsomming moet dieselfde patroon gebruik: ’n klein visuele tabel, ’n kort metode en een volledig uitgewerkte voorbeeld per omskakeling.

LE2 se notas gebruik afsonderlike blokke vir **heelgetalvoorstelling**, **uitbreiding van bislengte**, **oorloop**, **aftrek**, en ’n **aftrek met twee-komplement**-registerdiagram. Die kritiese klaspresentasiepatroon is nie net ’n finale antwoord nie: dit wys die positiewe voorstelling, die inverseer-/plus-een-stap, en dan die registerwaardes in die blokdiagram. Hierdie patroon behoort as ’n "Wys die voorbeeld"-interaksie in die leerkaart te verskyn.

## Handgeskrewe notas: bladsye 7–12

Bladsye 7–10 wys die gebruiker se berekeningspatroon vir **vermenigvuldiging van positiewe heelgetalle**. Die kernuitleg is ’n horisontale register-/blokdiagram met die kolomme **C**, **A**, **Q** en **M**, gevolg deur ’n tabel waar elke ry ’n toets, moontlike optelling en gekombineerde skuif toon. Die "Hoe sal dit gaan werk?"-rooster bevestig dat die webvoorbeeld nie net die finale produk moet gee nie, maar die oorspronklike ry en alle tussentydse rye.

Bladsy 10 dek **deling** en **wisselpuntvoorstelling**. Bladsy 11 skakel bislengtes en voorstelling aan reekse soos 32-, 16- en 8-bis en beklemtoon die waarde van die tekenbis. Bladsy 12 begin LE3 met **Boole-algebra**, logiese veranderlikes en eenvoudige waarheidstabelle. Die nuwe leerkaarte moet dus ’n klein waarheidstabel/hekpad bevat, nie slegs teks oor die formule nie.

## Handgeskrewe notas: bladsye 13–18

Bladsye 13–15 gee LE3 se visuele volgorde: eers individuele **logiese hekke** (AND, OR, XOR, NOT), daarna ’n kombinasionele hekpad, dan ’n **halwe opteller** met ’n waarheidstabel, en laastens ’n **volopteller** as twee halwe optellers plus ’n OR-hek vir die dra-uitset. ’n Hulpdiagram moet dus insette A/B/Cin, Som en Cout saam met die waarheidstabel wys.

Bladsy 16 begin LE5 met **Organisasie ↔ Argitektuur** en **Struktuur en Funksie**. Bladsye 17–18 toon blokdiagramme van ’n rekenaar met SVE, geheue, toevoer/afvoer en verbindings, asook interne verwerkersamestelling. Dit staaf dat die opsomming eers die algemene vierfunksie-/komponentprent moet gee en dan na die spesifieke IAS-geheuepad kan inzoem.

## Handgeskrewe notas: bladsye 19–27

Bladsye 19–21 fokus op die **IAS-rekenaar**, registre, die gaan-haalpad en geheue-eenhede/skyfies/modules. Die notapatroon bevat ’n registertabel met waardes en ’n blokdiagram: die oefenmodus moet daarom antwoordtabelle vir IAS-stappe bied, nie slegs ’n klikbare registerlys nie.

Bladsye 22–27 dek LE6: **ontwerp van ’n verwerker**, pyplynstappe, gevare/vertragings, uitvoeringseenhede, superskalêre verwerking, spekulatiewe verwerking, meerkernverwerkers en GPU’s. Die notas gebruik prosesstappe, stroomdiagramme en vergelykende lyste. Die opsomming moet dus definisie → klein skets → gepaste voorbeeld volgens hierdie volgorde aanbied, terwyl die oefentoetse pyplynroosters, voorspeltabelle en kort motiveringsvrae moet insluit.

## Geselekteerde klasfiguurverwysings

’n Klasfiguurkontakvel is visueel nagegaan. Die geselekteerde LE1-bron is ’n kort omskakelingsopsomming met binêr ↔ desimaal rigtings. Die LE2-bron bevat ’n twee-komplement-optelling-voorbeeld. Die LE5-bron bevat die IAS Struktuur I-diagram wat as verwysing vir die nuwe CSS/SVG-skets dien. Die geselekteerde LE6-bron lys verwerkerspoed en die toepaslike tegnieke: pyplynverwerking, vertakkingvoorspelling, superskalêre verwerking, datavloei-analise en spekulatiewe verwerking.

Die geselekteerde LE3-blad is hoofsaaklik ’n afdelingstitel vir wipkringe; die handgeskrewe LE3-bladsye is die bruikbaarder bron vir die hek- en opteller-skets.
