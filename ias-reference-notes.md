# IAS-verwysingsnotas uit LE5-skyfies

Die gebruiker se LE5-skyfies wys die IAS-gedeelte as ’n eenvoudige, handboekagtige diagram eerder as ’n dekoratiewe konsepskets.

Die belangrikste visuele en inhoudelike kenmerke uit `NRORG261_T_LE5.pdf` bladsye 16–19 is soos volg:

| Skyfie | Kernbevinding |
| --- | --- |
| IAS Struktuur I | Die diagram is verdeel in **Main memory (M)** links, **CPU** in die middel en **Input-output equipment (I,O)** regs. Binne die CPU is daar ’n **Arithmetic-logic unit (CA)** bo en ’n **Program control unit (CC)** onder. |
| IAS Struktuur I | Binne die ALU verskyn **AC** en **MQ** bo, **Arithmetic-logic circuits** in die middel, en **MBR** onder. |
| IAS Struktuur I | Binne die beheerdeel verskyn **PC** links bo, **IBR** regs bo, **MAR** links onder, **IR** regs onder, en **Control circuits** onderaan. |
| IAS Struktuur I | Die geheuekolom links wys adresvoorbeelde soos `M(0)`, `M(1)`, `M(2)`, `M(3)`, `M(4)` en onder in die kolom `M(4092)`–`M(4095)`. Die etikette **Instructions and data** en **Addresses** word ook getoon. |
| IAS Struktuur II | Die skyfie lys die name van die IAS-registers eksplisiet: **AC, MQ, MBR, IBR, PC, MAR, IR** plus **Control circuits** en die **rekenkundige-logiese-stroombane**. |
| IAS Geheue struktuur | Die geheue-afdeling beklemtoon ’n **40-bis** woord. Daar is ’n apart getekende **number word** met ’n tekenbis en ’n **instruction word** wat in **left instruction (20 bits)** en **right instruction (20 bits)** verdeel, elk met **opcode (8 bits)** en **address (12 bits)**. |
| IAS proses | Die proses-skyfie fokus op die **gaan haal siklus** en **uitvoer siklus**. Dit wys eksplisiete vloei soos `MAR ← PC`, `MBR ← M(MAR)`, dan onderskeid tussen linker en regter instruksies met `IBR ← MBR (20:39)`, `IR ← MBR (0:7)` en `MAR ← MBR (8:19)` of wanneer IBR reeds gevul is `IR ← IBR (0:7)` en `MAR ← IBR (8:19)`. |

Hierdie notas impliseer dat die webblad se IAS-seksie bygewerk moet word om:

1. Meer **struktureel-reghoekig en handboekagtig** te wees.
2. Die **ALU- en beheer-eenheid** duidelik van mekaar te skei.
3. Die **geheuekolom**, **I/O-blok** en **registeretikette** meer eksplisiet te toon.
4. ’n Afsonderlike **40-bis geheuewoord/2×20-bis instruksie-uitleg** te bevat.
5. Die **fetch/execute-stappe** nader aan die vloei in die LE5-skyfies te skryf.

## Werkblad- en TKA-uitlegnotas

Die LE2- en LE6-oefenmateriaal wys dat die gebruiker se klas- en TKA-vrae soos formele antwoordblaaie voel, eerder as soos kort kaartjies.

| Bron | Uitlegpatroon wat behou moet word |
| --- | --- |
| `LE2_TKA.pdf` bladsy 2 | ’n Groot **Vraag 1**-houer met kort instruksies bo-aan, gevolg deur ’n blokdiagram en dan ’n antwoordtabel met kolomme **Invoer1**, **Invoer2**, **Uitvoer1**, **Uitvoer2**. |
| `LE2_TKA.pdf` bladsye 2–3 | Die registername staan as ’n linker kolom; die antwoordruimtes lyk soos **duidelike blokkies/selle**. Terugvoer word kleurgewys gegee, maar die onderliggende uitleg is ’n eenvoudige rooster. |
| `LE6_TKA_Vrae.pdf` bladsy 1 | Pyplyn-oefeninge gebruik ’n **werkbladstyl**: gegewe kode bo-aan, dan ’n onderstreepte **Opdrag**, dan afsonderlike **Stap 1**, **Stap 2**, **Stap 3** met ruim witruimte vir werk. |
| `LE6_TKA_Vrae.pdf` bladsy 2 | Vertakking- en superskalêr-vrae word as **afsonderlike oefeninge** aangebied, met ’n kort beskrywing, dan ’n eenvoudige tabel of lys van uitvoeringseenhede. |

Hierdie notas impliseer dat die webblad se oefenvrae verbeter moet word deur:

1. Groter **vraagvelle** met opskrifte soos **Oefening 1**, **Opdrag**, **Stap 1–3**.
2. Meer **antwoordroosters en invulselle** vir register-, pyplyn- en vertakkingsvrae.
3. Minder “app-kaart”-gevoel en meer **antwoordblad/werkboek**-gevoel met margelyne, indeksmerke en onderafdelings.
4. Nuwe oefenvraestelle te laat voel soos **volledige 6-vraag HA1-papiere**, nie net los kort vrae nie.
