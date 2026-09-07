function Prompt(man, part, name = null) {
    let prompt
    if (name) {
        prompt = `For product ${name}, provide a concise, trade-focused reference. Prioritise compatibility, installation, and technical data over marketing content. Use these exact headings:
        Type. Product type (e.g. Complete Assembly, Mechanism, Accessory, Cable, Circuit Breaker, RCBO, Contactor, Conduit, Fitting, Sensor).
        Description. One-line product description.
        Top 5 Manufacturer and part number. Sold around Sydney Preferrably. Schnieder, Clipsal, Cabac, Trader, Hager, Electra Cables, MM, GO.
        Top 5 wholesalers. Schnieder, Clipsal, Cabac, Trader, Hager, Electra Cables, MM, GO. (TLE partners crucial priority)
        Dimensions. Installation-relevant dimensions only: height, width, depth, diameter, cut-out, mounting centres, bend radius, overall length, roll length, etc.
        Compatibility. ✓ Compatible products, ranges, systems, accessories, covers, mechanisms, or components. ✗ Known incompatibilities. dont use •
        (Rules. Keep under 100 words where practical. Use concise trade-focused language; omit marketing/promotional claims. Use ✓/✗ only under Compatibility. Prefer official manufacturer information; use reputable industry sources only if needed. If dimensions, compatibility, or replacement data cannot be verified, state Not specified by the manufacturer. Do not guess. Apply this format consistently to every product. Use ** for new headings and add a new line. Use • when needed.)`
    } else {
        prompt = `For product ${man} ${part}, provide a concise, trade-focused reference. Prioritise compatibility, installation, and technical data over marketing content. Use these exact headings:
        Description. One-line product description.
        Type. Product type (e.g. Complete Assembly, Mechanism, Accessory, Cable, Circuit Breaker, RCBO, Contactor, Conduit, Fitting, Sensor).
        Key Specs. List only defining specs, 3–5 (e.g. current, voltage, poles, conductor size, IP rating, colour, mounting, material).
        Compatibility. ✓ Compatible products, ranges, systems, accessories, covers, mechanisms, or components. ✗ Known incompatibilities.
        Dimensions. Installation-relevant dimensions only: height, width, depth, diameter, cut-out, mounting centres, bend radius, overall length, roll length, etc.
        Replacement / Equivalent. Is it discontinued? Current replacement, predecessor, successor, equivalent, manufacturer part numbers, supplier codes, or alternative references, where available.
        Installation Notes. Important information for electricians/installers only. Use N/A if none.
        (Rules. Keep under 100 words where practical. Use concise trade-focused language; omit marketing/promotional claims. Use ✓/✗ only under Compatibility. Use N/A where a section is not applicable. Prefer official manufacturer information; use reputable industry sources only if needed. If dimensions, compatibility, or replacement data cannot be verified, state Not specified by the manufacturer. Do not guess. Apply this format consistently to every product. only use one asterix for headings and then new line. Use one • an item in a list.)`
    }
    
    let cleanPrompt = prompt.trim()
    return cleanPrompt
}

export default Prompt