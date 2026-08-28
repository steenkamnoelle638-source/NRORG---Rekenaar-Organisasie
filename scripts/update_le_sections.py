from pathlib import Path

path = Path('/home/ubuntu/NRORG---Rekenaar-Organisasie/client/src/components/EnhancedSummaryWorkspace.tsx')
text = path.read_text()

start = text.index('function Le5Extras()')
end = text.index('function Le6Extras()', start)
old_section = text[start:end]

four_start = old_section.index('<section className="four-functions">')
cache_start = old_section.index('<section className="cache-core">')
# The original four-functions markup ends immediately before cache-core.
four_markup = old_section[four_start:cache_start]
cache_end = old_section.rindex('</section></>; }')
cache_markup = old_section[cache_start:cache_end] + '</section>'
# Keep the existing detailed table content, but remove its redundant outer header.
four_markup = four_markup.replace('<header><span>LE5 / VIER BASIESE FUNKSIES</span><h3>STRUKTUUR & FUNKSIE</h3><p>Die vier basiese funksies verbind elke taak met die rekenaarkomponent wat dit hoofsaaklik uitvoer.</p></header>', '<header><span>LE5 / VIER BASIESE FUNKSIES</span><h3>Vier basiese funksies</h3><p>Verwerking, stoor, beweging en beheer.</p></header>', 1)

organisation = '''function Le5Organisation() { return <section className="le5-major-block le5-major-block--organisation"><header><span>LE5 / ORGANISASIE &amp; ARGITEKTUUR</span><h3>ORGANISASIE &amp; ARGITEKTUUR</h3><p>Skei wat die programmeerder sien van hoe die rekenaar dit intern implementeer.</p></header>''' + cache_markup + '</section>; }\n\n'
structure = '''function Le5Extras() { return <section className="le5-major-block le5-major-block--structure"><header><span>LE5 / STRUKTUUR &amp; FUNKSIE</span><h3>STRUKTUUR &amp; FUNKSIE</h3><p>Die vier basiese funksies verbind elke taak met die rekenaarkomponent wat dit hoofsaaklik uitvoer.</p></header>''' + four_markup + '</section>; }\n\n'
text = text[:start] + organisation + structure + text[end:]

marker = 'function Le6Extras()'
new_memory = '''function Le5MemoryModules() { return <section className="le5-major-block le5-major-block--memory"><header><span>LE5 / HEKKE, GEHEUE, SKYFIES &amp; MODULES</span><h3>HEKKE, GEHEUE, SKYFIES &amp; MODULES</h3><p>Hekke bou logika; geheueselle hou toestand; skyfies en modules kombineer kapasiteit en funksie.</p></header><div className="le5-extra-cards"><article><span>HEKKE EN GEHEUESELLE</span><h4>Geheue stoor ’n bis as ’n stabiele toestand.</h4><p>’n Geheuesel gebruik elektroniese stroombane met twee stabiele toestande om 0 of 1 te behou. Hekke en wipkringe vorm die logiese boublokke waaruit registers en geheue georganiseer word.</p><div className="memory-cell-sketch"><b>inset</b><i>→</i><span>sel 0/1</span><i>→</i><b>uitset</b></div></article><article><span>SKYFIES &amp; MODULES</span><h4>Meer funksie, kleiner fisiese ruimte.</h4><p>Mikro-elektroniese skyfies integreer baie transistors en stroombane op klein materiaal. Modules kombineer skyfies om meer adresse, ’n wyer woord of albei te bied.</p><div className="chip-evolution"><b>los komponente</b><i>→</i><b>IC</b><i>→</i><b>VLSI-skyfie</b><i>→</i><b>module</b></div></article></div></section>; }\n\n'''
text = text.replace(marker, new_memory + marker, 1)

# Remove the old memory/chip cards from IasLab, which are now a dedicated fourth block.
ias_start = text.index('function IasLab()')
cards_start = text.index('<div className="le5-extra-cards">', ias_start)
cards_end = text.index('</div></section>; }', cards_start) + len('</div>')
text = text[:cards_start] + text[cards_end:]

old_render = '{unit.id === "le5" ? <><Le5Extras /><IasLab /></> : null}'
new_render = '{unit.id === "le5" ? <><Le5Organisation /><Le5Extras /><section className="le5-major-block le5-major-block--ias"><header><span>LE5 / IAS REKENAAR</span><h3>IAS REKENAAR</h3><p>Die registerpad, 40-bis woord, tabelpatroon, invuloefeninge en TKA-voorbeelde werk saam in een IAS-leerblok.</p></header><IasLab /></section><Le5MemoryModules /></> : null}'
if old_render not in text:
    raise SystemExit('LE5 render marker not found')
text = text.replace(old_render, new_render, 1)
path.write_text(text)
