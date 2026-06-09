// Mind map data: domains with positions, leaves, and full detail content
window.MM_DOMAINS = [
  {
    key: "analytical",
    id: "CAP,01 / ANALYTICAL",
    title: "Lab Operations",
    sub: "SINCE 2018 · 7+ INSTR.",
    side: "left", row: 0,
    leaves: [
      { id: "ANALYTICAL,01", title: "HPLC & GC", desc: "High performance liquid and gas chromatography, trace analysis across polymer and specialty streams." },
      { id: "ANALYTICAL,02", title: "FTIR & UV/Vis", desc: "Infrared and ultraviolet spectroscopy for compositional verification and impurity screening." },
      { id: "ANALYTICAL,03", title: "Colorimetry", desc: "Optical color grading and APHA checks against release specs for glycols and finished product." },
      { id: "ANALYTICAL,04", title: "Melt Index & X-ray", desc: "Rheology and XRF testing on polymers for flow rate, density, and elemental composition." }
    ],
    overview: "Day to day analytical work across polymer, glycol, and hydrocarbon streams. Running instrumentation, troubleshooting method drift, and releasing results against customer and internal specs.",
    scope: "Operated 7+ analytical instruments across four plants. Contributed to method validations, LIMS entry, and bench QA audits.",
    listItems: [ ["HPLC · GC","Daily"],["FTIR · UV/Vis","Daily"],["Colorimetry","Release"],["Melt Index · XRF","Polymer"],["LIMS entry","All shifts"] ],
    stamp: "FILE · AH,2026 / DOMAIN,01"
  },
  {
    key: "cs",
    id: "CAP,06 / IN PROGRESS",
    title: "CS & AI/ML",
    sub: "WGU · TARGET 2028",
    side: "left", row: 1,
    inprog: true,
    leaves: [
      { id: "CS,01", title: "Programming", desc: "Python and JavaScript coursework through WGU, building toward industrial tooling and automation." },
      { id: "CS,02", title: "AI & ML", desc: "Predictive quality models and anomaly detection, targeted at lab and process data." },
      { id: "CS,03", title: "Data Systems", desc: "Relational databases, ETL, and LIMS integration for plant and lab datasets." }
    ],
    overview: "Active computer science degree through WGU, focus on AI, ML, and data systems. Bridging a decade of plant and lab floor context into predictive quality and industrial software.",
    scope: "Coursework under way in programming, data structures, AI, and data systems. Portfolio projects target plant and lab data.",
    listItems: [ ["Programming","Py · JS"],["AI · ML","Coursework"],["Data Systems","SQL · ETL"],["Portfolio","In build"],["Target","2028"] ],
    stamp: "FILE · AH,2026 / DOMAIN,06"
  },
  {
    key: "liaison",
    id: "CAP,05 / LIAISON",
    title: "Leadership",
    sub: "POC · PERMITS · STEP-UP",
    side: "left", row: 2,
    leaves: [
      { id: "LIAISON,01", title: "Night-Shift POC", desc: "Single point of contact for nights, coordinating across operations, safety, and contractors." },
      { id: "LIAISON,02", title: "Step-Up Supervisor", desc: "Fills in as supervisor during turnarounds and outages, handling crew direction and sign-offs." },
      { id: "LIAISON,03", title: "Permit Writing", desc: "Hot work, confined space, and LOTO permits written and verified against job plans." },
      { id: "LIAISON,04", title: "Safety Coach", desc: "Peer coaching on behavior-based safety, near miss reporting, and stop-work authority." }
    ],
    overview: "Trusted to run the shift when supervisors are off site. Single point of contact on nights, writes and verifies permits, coordinates between operations, safety, and contractors.",
    scope: "Night-shift POC for a multi-unit site. Step-up supervisor on turnarounds. Trained peers on permit writing and behavior-based safety.",
    listItems: [ ["Night POC","Standing"],["Step-up Sup.","TAR"],["Permits","Hot · CS · LOTO"],["Safety Coach","Peer"],["Contractor IF","Daily"] ],
    stamp: "FILE · AH,2026 / DOMAIN,05"
  },
  {
    key: "quality",
    id: "CAP,02 / QUALITY",
    title: "Product Grading",
    sub: "POLYMERS · GLYCOLS · FUEL",
    side: "right", row: 0,
    leaves: [
      { id: "QUALITY,01", title: "Polymer QA", desc: "Release testing on polyethylene and polypropylene grades against customer and internal specs." },
      { id: "QUALITY,02", title: "Glycol Grading", desc: "MEG, DEG, TEG grading for fiber, PET, and industrial customers with tight color and water specs." },
      { id: "QUALITY,03", title: "Crude · ULSD · Jet", desc: "Hydrocarbon product grading across crude, ultra low sulfur diesel, gasoline, and jet fuel." },
      { id: "QUALITY,04", title: "Custody Transfer", desc: "Third-party inspection on tanker and barge loadings, sealing samples and issuing custody documents." }
    ],
    overview: "Grading finished product against release specs. Polymer QA on polyethylene and polypropylene grades, glycol grading for fiber and industrial customers, hydrocarbon grading across crude and finished fuels.",
    scope: "Graded product for tens of thousands of barrels per shift across fuels, plus multi-tonne polymer and glycol lots.",
    listItems: [ ["Polymer QA","PE · PP"],["Glycol","MEG · DEG"],["Fuel","Crude · ULSD"],["Custody","3rd party"],["Spec vs release","Daily"] ],
    stamp: "FILE · AH,2026 / DOMAIN,02"
  },
  {
    key: "response",
    id: "CAP,03 / RESPONSE",
    title: "Safety & ER",
    sub: "NREMT · HAZMAT · FIRE",
    side: "right", row: 1, emph: true,
    leaves: [
      { id: "RESPONSE,01", title: "NREMT", desc: "National registry emergency medical technician, credentialed and current, patient care and triage.", sig: true },
      { id: "RESPONSE,02", title: "HazMat Ops", desc: "Hazardous materials operations level, containment, decon, and air monitoring in hot zone ops.", sig: true },
      { id: "RESPONSE,03", title: "Fire & Rescue", desc: "Industrial fire brigade, structural and rope rescue, confined space and high-angle evacuations.", sig: true },
      { id: "RESPONSE,04", title: "Air Monitoring", desc: "Four-gas meters, PID, colorimetric tubes for LEL, H2S, benzene, and toxic screens.", sig: true }
    ],
    overview: "The current signal branch. Credentialed emergency medical technician and industrial responder, trained for refinery fire, hazmat, confined space rescue, and medical standby on hot work.",
    scope: "Active member of the plant emergency response team. Drills monthly, live response on medical and gas release events.",
    listItems: [ ["NREMT","Current"],["HazMat Ops","Level II"],["Fire & Rescue","Brigade"],["Air monitoring","4-gas · PID"],["CS Rescue","Standby"] ],
    stamp: "FILE · AH,2026 / DOMAIN,03"
  },
  {
    key: "field",
    id: "CAP,04 / FIELD",
    title: "Field & Flight",
    sub: "PART 107 · 6+ PLATFORMS",
    side: "right", row: 2,
    leaves: [
      { id: "FIELD,01", title: "FAA Part 107", desc: "Certified remote pilot, inspection and photogrammetry missions around plant structures." },
      { id: "FIELD,02", title: "Forklift · Skid", desc: "Certified on forklift, skid steer, and material handling equipment across multiple lift classes." },
      { id: "FIELD,03", title: "Scissor · Man Lift", desc: "Aerial work platform certified, scissor, boom, and articulated man lifts for elevated work." },
      { id: "FIELD,04", title: "Blasting · Fireproof", desc: "Abrasive blasting and intumescent fireproofing, prep and QA on structural steel." }
    ],
    overview: "Hands on field work, mobile equipment, aerial inspection. Part 107 remote pilot for drone inspections of structures and elevated assets; certified on multiple material handling and lift platforms.",
    scope: "Six certified platforms. Flew inspection missions on heaters, flares, and tank farms. Supported turnarounds with lift and blasting work.",
    listItems: [ ["Part 107","Remote pilot"],["Forklift · Skid","Certified"],["AWP","Scissor · Boom"],["Blasting","Structural"],["TAR support","Multi-yr"] ],
    stamp: "FILE · AH,2026 / DOMAIN,04"
  }
];
