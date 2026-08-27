# LE6 TKA-antwoorduitbreiding

- [x] Haal die Superskala verwerking-antwoord uit die Word-bron.
- [x] Haal die Datavloei analisering-antwoord en kleurkode uit die Word-bron.
- [x] Voeg die antwoordtabelle en kleuronderstreping by LE6 se oefenbank.
- [x] Toets die twee LE6-bladsye en publiseer die opdatering.

## Word-bronbevindinge

Superskala antwoord: wys die gelyktydige uitvoering as `mov eax, [a]`, `add ecx, edx`, en `imul esi, edi`, met motivering dat hulle in aparte uitvoeringseenhede kan loop en geen afhanklikhede het nie. Wys ook die wagtydgroep as `mov ebx, [b]`, `add ecx, edx`, `sub ebx, ecx`, en `add eax, ebx`, met motivering dat hulle uitvoeringseenhede deel of op vorige resultate wag.

Datavloei antwoord: beklemtoon afhanklikhede in die DE/UV-vloei volgens registerkettings `eax`, `ebx`, `edx`, en `esi`. Die probleemstelling verduidelik dat die dekodeerder nie afhanklike registers kan opstel voordat die verskafferinstruksie se UV-fase voltooi is nie. Die hantering is om dekodering te vertraag totdat die nodige uitvoer klaar is.

Die Word-bron gebruik geel blokkies vir die Superskala-wagpatroon. In die Datavloei-antwoord word registerkettings gekleur en onderstreep: `eax` rooi, `ebx` oranje, `edx` groen en `esi` turkoois. Die nuwe antwoordpaneel is in die ontwikkelweergawe gebou; die bestaande GitHub Pages-blad wys nog die vorige LE6-uitvoer totdat hierdie opdatering gesinchroniseer word.

Die ontwikkelweergawe wys nou die nuwe “LE6 / TKA-ANTWOORDKONTROLE”-paneel direk ná die vier TKA-oefenbladsye. Die Superskala-oortjie bevat die volledige eenheidstoekenning, die gelyktydige groep, die wagtydgroep, geel merking en albei motiverings uit die Word-bron.

Die Datavloei-oortjie is ook direk getoets: die volledige GH/DE/UV-tabel wys die onderstreepte `eax`, `ebx`, `edx` en `esi`-registerkettings in die Word-bron se kleurkode, plus die probleemstelling, stall-oplossing en vertragingstabel.
