import { d as createLucideIcon, u as useAppStore, r as reactExports, j as jsxRuntimeExports, N as Newspaper, X, e as cn, h as AnimatePresence, m as motion } from "./index-jNE18aF1.js";
import { P as PageHeader } from "./PageHeader-DealqQgJ.js";
import { F as Fuse } from "./fuse-COjfAQ4a.js";
import { S as Search } from "./search-BWXeYnpj.js";
import { E as ExternalLink } from "./external-link-BA28ywWb.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
      key: "vktsd0"
    }
  ],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
];
const Tag = createLucideIcon("tag", __iconNode);
const newsItems = [
  // ── FUSION ──────────────────────────────────────────────────────────────────
  {
    id: "nif-ignition-2022",
    title: "NIF Achieves Fusion Ignition: First Net Energy Gain in History",
    summary: "On December 5, 2022, scientists at Lawrence Livermore National Laboratory's National Ignition Facility produced 3.15 megajoules of fusion energy using only 2.05 MJ of laser energy—crossing the ignition threshold for the first time. This milestone, decades in the making, demonstrates that controlled thermonuclear fusion can yield more energy than the driver delivers to the fuel capsule. The result was independently validated and published in Physical Review Letters in February 2023.",
    date: "2022-12",
    category: "fusion",
    source: "Nature / Physical Review Letters",
    url: "https://www.nature.com/articles/d41586-022-04440-7",
    tags: ["NIF", "ignition", "inertial confinement", "laser fusion", "LLNL"],
    audience: "public",
    highlighted: true
  },
  {
    id: "nif-second-ignition-2023",
    title: "NIF Repeats Fusion Ignition with Higher Yield in 2023",
    summary: "Following the December 2022 breakthrough, Lawrence Livermore repeated fusion ignition in July 2023 with an improved yield of approximately 3.88 MJ, further confirming reproducibility. Researchers modified the capsule geometry and laser pulse shape to reduce hydrodynamic instabilities. The successive successes have strengthened scientific confidence in inertial confinement fusion as a path toward future energy.",
    date: "2023-08",
    category: "fusion",
    source: "DOE / LLNL",
    url: "https://www.energy.gov/science/articles/department-energy-national-nuclear-security-administration-achieve-fusion-ignition",
    tags: ["NIF", "ignition", "inertial confinement", "reproducibility", "DOE"],
    audience: "student"
  },
  {
    id: "iter-magnet-2022",
    title: "ITER Completes First-of-Kind Central Solenoid Module Assembly",
    summary: "ITER's central solenoid—often called 'the world's most powerful pulsed superconducting electromagnet'—saw its first module installed in 2022, with full six-module assembly progressing through 2023. The solenoid, manufactured in the United States, will induce the plasma current of 15 MA that ITER requires. Each module is cooled to 4 K using supercritical helium and carries roughly 70,000 A of current.",
    date: "2022-05",
    category: "fusion",
    source: "ITER Organization",
    url: "https://www.iter.org/newsline/-/3695",
    tags: ["ITER", "solenoid", "superconducting magnet", "tokamak", "plasma"],
    audience: "student"
  },
  {
    id: "iter-2024-schedule",
    title: "ITER Revises First Plasma Timeline to 2034",
    summary: "The ITER Council announced in June 2024 that COVID-19 delays, supply chain disruptions, and engineering challenges have pushed the first plasma date from 2025 to 2034, with deuterium-tritium experiments now expected around 2039. The revised baseline, called the Updated ITER Project Schedule, includes design modifications to the vacuum vessel sectors and enhanced seismic supports. Despite the delay, ITER remains the world's largest fusion experiment and a critical step toward demonstration power plants.",
    date: "2024-06",
    category: "fusion",
    source: "ITER Organization",
    url: "https://www.iter.org/newsline/-/4108",
    tags: ["ITER", "schedule", "tokamak", "international", "plasma"],
    audience: "public"
  },
  {
    id: "commonwealth-fusion-2022",
    title: "Commonwealth Fusion Sciences Demonstrates Record High-Temperature Superconducting Magnet",
    summary: "In September 2022, Commonwealth Fusion Sciences (CFS) and MIT's PSFC successfully tested a 20-tesla REBCO high-temperature superconducting (HTS) magnet—the strongest of its type ever built. This proof-of-concept underpins the SPARC compact tokamak design, which aims to achieve net energy fusion in a device far smaller than ITER. CFS raised $1.8 billion in Series B funding in late 2021 to advance toward a commercial fusion plant called ARC.",
    date: "2022-09",
    category: "fusion",
    source: "MIT PSFC / Nature",
    url: "https://www.nature.com/articles/s41586-024-07199-x",
    tags: ["HTS magnet", "SPARC", "compact tokamak", "MIT", "CFS"],
    audience: "researcher"
  },
  // ── TECHNOLOGY / SMRs ────────────────────────────────────────────────────────
  {
    id: "nuscale-smr-certification-2023",
    title: "NuScale Receives First-Ever NRC Standard Design Approval for SMR",
    summary: "The U.S. Nuclear Regulatory Commission issued the first Standard Design Approval (SDA) for a small modular reactor to NuScale Power in January 2023, for a 50 MWe light-water SMR module. The approval followed seven years of review and is a landmark regulatory milestone for the SMR industry. The SDA certifies the design's safety basis and simplifies licensing for future plants.",
    date: "2023-01",
    category: "technology",
    source: "NRC",
    url: "https://www.nrc.gov/reactors/new-reactors/smrs/nuscale.html",
    tags: [
      "NuScale",
      "SMR",
      "NRC",
      "design certification",
      "light-water reactor"
    ],
    audience: "public",
    highlighted: true
  },
  {
    id: "nuscale-utah-withdrawal-2023",
    title: "NuScale and UAMPS Cancel Utah SMR Project Amid Cost Increases",
    summary: "In November 2023, NuScale Power and the Utah Associated Municipal Power Systems (UAMPS) announced the cancellation of the Carbon Free Power Project—a planned six-module, 462 MWe SMR plant in Idaho. Rising estimated costs (from $58/MWh to over $89/MWh) and insufficient subscriber commitments led to the decision. The cancellation highlighted the economic challenges facing first-of-a-kind advanced reactor projects, though NuScale continues to pursue international deployments.",
    date: "2023-11",
    category: "technology",
    source: "NuScale / WNA",
    url: "https://www.world-nuclear-news.org/Articles/UAMPS-and-NuScale-agree-to-end-Carbon-Free-Power-P",
    tags: ["NuScale", "SMR", "UAMPS", "economics", "cancellation"],
    audience: "public"
  },
  {
    id: "terrapower-natrium-2023",
    title: "TerraPower Breaks Ground on Natrium Sodium-Cooled Demo Reactor",
    summary: "TerraPower, co-founded by Bill Gates, broke ground on its Natrium demonstration reactor in Kemmerer, Wyoming in June 2023. The 345 MWe sodium-cooled fast reactor paired with a molten-salt thermal energy storage system is designed to provide flexible power output. DOE awarded TerraPower up to $2 billion through the Advanced Reactor Demonstration Program (ARDP); first power is targeted for the early 2030s.",
    date: "2023-06",
    category: "technology",
    source: "DOE / TerraPower",
    url: "https://www.energy.gov/ne/articles/terrapower-breaks-ground-natrium-nuclear-demonstration-reactor",
    tags: ["TerraPower", "Natrium", "sodium fast reactor", "SMR", "Wyoming"],
    audience: "public"
  },
  {
    id: "xenergy-triso-2024",
    title: "X-energy Advances TRISO Fuel Production for Xe-100 High-Temperature Reactor",
    summary: "X-energy announced in 2024 that its TRISO-X fuel fabrication facility in Oak Ridge, Tennessee received NRC license approval and began producing TRISO (Tristructural Isotropic) fuel pebbles for its Xe-100 pebble-bed high-temperature gas reactor. TRISO fuel's robust ceramic coating makes it highly resistant to meltdown and radiation damage. DOE supports the Xe-100 under ARDP with up to $1.2 billion in funding.",
    date: "2024-03",
    category: "technology",
    source: "DOE / X-energy",
    url: "https://www.energy.gov/ne/articles/doe-announces-x-energy-fuel-facility-receives-nrc-license",
    tags: ["X-energy", "TRISO", "HTGR", "pebble bed", "advanced reactor"],
    audience: "student"
  },
  {
    id: "vogtle-unit3-2023",
    title: "Vogtle Unit 3 Enters Commercial Operation — First New US Reactor in 30+ Years",
    summary: "Georgia Power's Vogtle Unit 3, a Westinghouse AP1000 pressurized water reactor, reached commercial operation in July 2023—the first new nuclear unit to come online in the United States since Watts Bar Unit 1 in 1996. The 1,117 MWe unit provides clean baseload power to Georgia. Unit 4 followed in early 2024, completing the plant's expansion.",
    date: "2023-07",
    category: "technology",
    source: "Georgia Power / NRC",
    url: "https://www.nrc.gov/reactors/operating/licensing/new-reactor/new-plant-status/vogtle-3-4.html",
    tags: [
      "Vogtle",
      "AP1000",
      "commercial operation",
      "Georgia Power",
      "US nuclear"
    ],
    audience: "public",
    highlighted: true
  },
  {
    id: "vogtle-unit4-2024",
    title: "Vogtle Unit 4 Achieves Commercial Operation, Completing US Nuclear Renaissance Plant",
    summary: "Georgia Power's Vogtle Unit 4 (AP1000) entered commercial operation in April 2024, making Vogtle the largest nuclear power facility in the United States at ~2,234 MWe combined. The project, despite significant delays and cost overruns, represents the culmination of the post-2005 'nuclear renaissance' licensing process and provides a regulatory blueprint for future US nuclear projects. The two units together supply electricity to about 500,000 homes.",
    date: "2024-04",
    category: "technology",
    source: "Georgia Power",
    url: "https://www.nrc.gov/reactors/operating/licensing/new-reactor/new-plant-status/vogtle-3-4.html",
    tags: [
      "Vogtle",
      "AP1000",
      "commercial operation",
      "US nuclear",
      "Georgia Power"
    ],
    audience: "public"
  },
  {
    id: "barakah-unit3-2023",
    title: "UAE Barakah Plant Unit 3 Begins Commercial Operation",
    summary: "The UAE's Barakah Nuclear Energy Plant Unit 3 (APR1400) reached commercial operation in February 2023, making Barakah the Arab world's first multi-unit nuclear power plant. Korea Electric Power Corporation (KEPCO) constructed all four APR1400 units; Units 1 and 2 were already operational. When all four units are fully operational they will provide roughly 25% of the UAE's electricity needs and significantly reduce carbon emissions.",
    date: "2023-02",
    category: "technology",
    source: "ENEC / WNA",
    url: "https://www.world-nuclear-news.org/Articles/Barakah-3-enters-commercial-operation",
    tags: ["Barakah", "APR1400", "UAE", "KEPCO", "South Korea export"],
    audience: "public"
  },
  {
    id: "cfr600-china-2023",
    title: "China's CFR-600 Sodium-Cooled Fast Reactor Achieves First Criticality",
    summary: "China National Nuclear Corporation (CNNC) announced that the CFR-600, a 600 MWt/200 MWe sodium-cooled fast reactor, achieved its first criticality in 2023 at Xiapu, Fujian Province. CFR-600 is a key step in China's three-step fast reactor development program leading to CFR-1000 commercial plants. Fast reactors can breed new fissile material and also transmute long-lived minor actinides from spent nuclear fuel.",
    date: "2023-11",
    category: "technology",
    source: "CNNC / WNA",
    url: "https://www.world-nuclear-news.org/Articles/China-s-CFR-600-achieves-first-criticality",
    tags: ["CFR-600", "China", "fast reactor", "sodium-cooled", "breeding"],
    audience: "researcher"
  },
  // ── MEDICINE ────────────────────────────────────────────────────────────────
  {
    id: "lu177-dotatate-cancer-2022",
    title: "Lutetium-177 DOTATATE Expands Use as Targeted Radiotherapy for Neuroendocrine Tumors",
    summary: "Lutetium-177 DOTATATE (Lutathera®) received expanded indications following the NETTER-2 Phase III trial results published in 2023, demonstrating progression-free survival improvement in well-differentiated gastroenteropancreatic neuroendocrine tumors. The therapy exploits somatostatin receptor overexpression on tumor cells to deliver the beta-emitting Lu-177 directly to cancer sites with minimal damage to surrounding tissue. It represents one of the most successful applications of targeted radionuclide therapy (TART) in clinical oncology.",
    date: "2023-06",
    category: "medicine",
    source: "NEJM / FDA",
    url: "https://www.nejm.org/doi/10.1056/NEJMoa2309272",
    tags: [
      "Lu-177",
      "DOTATATE",
      "neuroendocrine tumors",
      "targeted therapy",
      "radiopharmaceutical"
    ],
    audience: "student",
    highlighted: true
  },
  {
    id: "f18-flortaucipir-alzheimers-2022",
    title: "FDA Approves Flortaucipir F-18 PET Imaging for Alzheimer's Disease Tau Pathology",
    summary: "The FDA approved flortaucipir F-18 (Tauvid®) as the first PET imaging agent to detect tau neurofibrillary tangles associated with Alzheimer's disease in living patients. The radiopharmaceutical binds to tau aggregates in the brain and enables non-invasive diagnosis that previously required autopsy confirmation. Its approval accelerates clinical trials of tau-targeting therapeutics and enables earlier intervention in the disease course.",
    date: "2022-07",
    category: "medicine",
    source: "FDA",
    url: "https://www.fda.gov/drugs/drug-approvals-and-databases/nda-213636",
    tags: [
      "F-18",
      "flortaucipir",
      "Alzheimer's",
      "PET imaging",
      "tau",
      "FDA approval"
    ],
    audience: "public"
  },
  {
    id: "ac225-radiotherapy-2023",
    title: "Actinium-225 Targeted Alpha Therapy Gains Momentum in Prostate Cancer Trials",
    summary: "Actinium-225 labeled PSMA-617 (⁂Ac-PSMA-617) demonstrated striking efficacy in Phase II trials for metastatic castration-resistant prostate cancer in 2023, building on the success of Lu-177-PSMA-617 (Pluvicto). Alpha particles from Ac-225 deposit energy over a far shorter range than beta emitters, potentially limiting off-target damage. The IAEA's coordinated research projects are supporting Ac-225 production scale-up globally.",
    date: "2023-09",
    category: "medicine",
    source: "IAEA / Clinical Cancer Research",
    url: "https://www.iaea.org/topics/research/coordinated-research-activities",
    tags: [
      "Ac-225",
      "alpha therapy",
      "prostate cancer",
      "PSMA",
      "radiopharmaceutical"
    ],
    audience: "researcher"
  },
  {
    id: "lu177-psma617-fda-2022",
    title: "FDA Approves Lutetium-177 PSMA-617 (Pluvicto) for Prostate Cancer",
    summary: "In March 2022, the FDA approved lutetium-177 vipivotide tetraxetan (Pluvicto, formerly Novartis's PSMA-617) for metastatic castration-resistant prostate cancer. The VISION trial showed a 38% reduction in risk of death and 60% reduction in progression risk. Pluvicto represents the first PSMA-targeted radioligand therapy and marks a paradigm shift in how radiopharmaceuticals are used in oncology.",
    date: "2022-03",
    category: "medicine",
    source: "FDA / NEJM",
    url: "https://www.fda.gov/drugs/drug-approvals-and-databases/nda-215435",
    tags: ["Lu-177", "PSMA-617", "Pluvicto", "prostate cancer", "FDA approval"],
    audience: "public"
  },
  // ── SAFETY ──────────────────────────────────────────────────────────────────
  {
    id: "iaea-safety-review-2023",
    title: "IAEA Conducts Record Number of Nuclear Safety Review Missions in 2023",
    summary: "The International Atomic Energy Agency conducted a record 138 safety review missions in 2023, including OSART (Operational Safety Review Team) and IRRS (Integrated Regulatory Review Service) missions to 40 member states. Reviews covered operating reactors, regulatory frameworks, and radiation source security. The increased mission pace reflects growing global interest in nuclear safety culture strengthening ahead of a planned nuclear capacity expansion.",
    date: "2023-12",
    category: "safety",
    source: "IAEA",
    url: "https://www.iaea.org/topics/nuclear-safety",
    tags: [
      "IAEA",
      "OSART",
      "safety review",
      "regulatory",
      "nuclear safety culture"
    ],
    audience: "student"
  },
  {
    id: "atf-chromia-fuel-2023",
    title: "Accident-Tolerant Fuel with Chromia-Doped UO₂ Pellets Completes Lead Test Assemblies",
    summary: "Framatome and Westinghouse both completed in-reactor lead test assemblies of accident-tolerant fuel (ATF) designs in 2023, including chromia-doped uranium dioxide pellets and FeCrAl cladding variants. Chromia doping increases fuel pellet strength and creep resistance, reducing pellet-cladding interaction failures. Post-irradiation examinations at the 2023 milestone confirmed expected performance improvements, with commercial deployment targeted before 2030.",
    date: "2023-07",
    category: "safety",
    source: "DOE / NRC",
    url: "https://www.energy.gov/ne/articles/doe-accident-tolerant-fuel-program",
    tags: [
      "ATF",
      "chromia",
      "accident-tolerant fuel",
      "FeCrAl",
      "fuel performance"
    ],
    audience: "researcher"
  },
  {
    id: "zaporizhzhia-iaea-2022",
    title: "IAEA Establishes Continuous Presence at Zaporizhzhia Nuclear Plant During Conflict",
    summary: "Following Russia's occupation of the Zaporizhzhia Nuclear Power Plant (ZNPP) — Europe's largest nuclear facility — the IAEA Director General led the first mission to the plant in September 2022 and established a permanent monitoring presence. All six units were subsequently placed in cold shutdown. The IAEA called for a nuclear safety and security protection zone around the plant and issued regular reports on plant status throughout 2022–2024.",
    date: "2022-09",
    category: "safety",
    source: "IAEA",
    url: "https://www.iaea.org/zaporizhzhia",
    tags: [
      "Zaporizhzhia",
      "ZNPP",
      "conflict zone",
      "nuclear safety",
      "IAEA monitoring"
    ],
    audience: "public",
    highlighted: true
  },
  {
    id: "nrc-digital-i&c-2024",
    title: "NRC Issues New Rule Facilitating Digital Instrumentation & Control Modernization",
    summary: "The U.S. NRC in 2024 issued a rule updating requirements for digital instrumentation and control (I&C) systems in nuclear plants, reducing licensing uncertainty that had stalled fleet-wide modernization for over a decade. Modern digital I&C improves reliability and reduces maintenance costs versus aging analog systems. The rule provides a streamlined licensing path that resolves long-standing questions about common-cause failure analysis.",
    date: "2024-02",
    category: "safety",
    source: "NRC",
    url: "https://www.nrc.gov/reactors/operating/ops-experience/i-and-c.html",
    tags: [
      "NRC",
      "digital I&C",
      "instrumentation",
      "modernization",
      "regulation"
    ],
    audience: "researcher"
  },
  // ── POLICY ──────────────────────────────────────────────────────────────────
  {
    id: "iaea-net-zero-nuclear-2023",
    title: "IAEA Report: Nuclear Energy Critical for Net-Zero by 2050",
    summary: "The IAEA's 2023 'Nuclear Energy for a Net Zero World' report found that reaching net-zero carbon emissions by 2050 requires at least a doubling of global nuclear capacity—from ~390 GWe today to ~890 GWe. The analysis shows nuclear provides firm, dispatchable, low-carbon power that complements intermittent renewables. The report underpins the '22 governments' pledge at COP28 (December 2023) to triple nuclear capacity by 2050.",
    date: "2023-09",
    category: "policy",
    source: "IAEA",
    url: "https://www.iaea.org/publications/15521/nuclear-energy-for-a-net-zero-world",
    tags: ["net zero", "climate", "IAEA", "energy policy", "decarbonization"],
    audience: "public",
    highlighted: true
  },
  {
    id: "cop28-nuclear-pledge-2023",
    title: "22 Nations Pledge to Triple Nuclear Capacity by 2050 at COP28",
    summary: "At the COP28 climate summit in Dubai (December 2023), 22 countries — including the United States, France, UK, Canada, Japan, South Korea, and UAE — signed a declaration to triple global nuclear energy capacity by 2050 relative to 2020 levels. The declaration aligns with IAEA and IEA net-zero scenarios. Signatories committed to supporting new nuclear construction, life extension of existing plants, and small modular reactor deployment.",
    date: "2023-12",
    category: "policy",
    source: "COP28 / IAEA",
    url: "https://www.iaea.org/newscenter/news/at-cop28-countries-make-historic-commitment-to-triple-nuclear-energy-capacity",
    tags: [
      "COP28",
      "net zero",
      "nuclear tripling",
      "climate policy",
      "international"
    ],
    audience: "public"
  },
  {
    id: "inflation-reduction-act-nuclear-2022",
    title: "US Inflation Reduction Act Provides $30B+ in Nuclear Energy Tax Credits",
    summary: "The Inflation Reduction Act (IRA), signed in August 2022, includes a Production Tax Credit (PTC) for existing nuclear plants (approximately $15/MWh), preventing premature closures that were driven by low electricity prices. The IRA also provides Investment Tax Credits for new nuclear construction and advanced nuclear R&D funding. Analysts estimate the existing-plant PTC alone could prevent closure of up to 60 GWe of US nuclear capacity through the 2030s.",
    date: "2022-08",
    category: "policy",
    source: "DOE / Congressional Research Service",
    url: "https://www.energy.gov/articles/inflation-reduction-act-guidebook",
    tags: [
      "IRA",
      "tax credit",
      "US policy",
      "nuclear economics",
      "clean energy"
    ],
    audience: "public"
  },
  {
    id: "finland-onkalo-hls-2023",
    title: "Finland's Onkalo Deep Geological Repository Licensed for High-Level Waste Disposal",
    summary: "Finland's Radiation and Nuclear Safety Authority (STUK) approved the construction license for Onkalo, the world's first operational deep geological repository for high-level nuclear waste, in 2023. The KBS-3 design encapsulates spent fuel in copper canisters surrounded by bentonite clay, buried 400 m deep in stable bedrock. Waste emplacement is planned to begin in the 2020s, offering a tested model for permanent nuclear waste disposal.",
    date: "2023-04",
    category: "safety",
    source: "STUK / Posiva",
    url: "https://www.posiva.fi/en/index/disposal.html",
    tags: [
      "Onkalo",
      "deep geological repository",
      "HLW",
      "Finland",
      "nuclear waste"
    ],
    audience: "student"
  },
  {
    id: "ukraine-nuclear-energy-2024",
    title: "Ukraine Approves Plans for 20 New Nuclear Reactors to Achieve Energy Independence",
    summary: "Ukraine's parliament in 2024 approved a framework plan to build 20 new nuclear reactor units by 2050, diversifying away from Russian fuel supply and maximizing the country's nuclear expertise. The plan includes AP1000 reactors from Westinghouse plus small modular reactors. Ukraine operates 15 reactors across four sites and generates roughly 50–55% of its electricity from nuclear power, making it one of the most nuclear-dependent countries globally.",
    date: "2024-01",
    category: "policy",
    source: "WNA / Energoatom",
    url: "https://www.world-nuclear.org/information-library/country-profiles/countries-t-z/ukraine.aspx",
    tags: [
      "Ukraine",
      "new build",
      "energy independence",
      "AP1000",
      "European nuclear"
    ],
    audience: "public"
  },
  // ── RESEARCH ────────────────────────────────────────────────────────────────
  {
    id: "neutron-scattering-materials-2023",
    title: "Neutron Scattering Reveals Quantum Spin Liquids in Frustrated Magnets",
    summary: "Researchers using neutron scattering facilities at Oak Ridge National Laboratory (ORNL) and ILL Grenoble published landmark 2023 results identifying genuine quantum spin liquid behavior in frustrated kagome-lattice magnets. Neutrons are uniquely sensitive to magnetic structures due to their spin, making nuclear reactor–based neutron sources irreplaceable for this class of materials science. The findings have implications for topological quantum computing.",
    date: "2023-05",
    category: "research",
    source: "Nature Physics / ORNL",
    url: "https://www.nature.com/articles/s41567-023-01994-5",
    tags: [
      "neutron scattering",
      "quantum spin liquid",
      "materials science",
      "ORNL",
      "research reactor"
    ],
    audience: "researcher"
  },
  {
    id: "nuclear-waste-transmutation-2022",
    title: "Advances in Minor Actinide Transmutation Using Fast Reactors",
    summary: "A 2022 joint study by CEA, ANL, and JAEA demonstrated via Monte Carlo neutronics simulations that fast reactor cores loaded with 5–10% minor actinide fuel (americium, curium) can achieve transmutation rates sufficient to reduce the radiotoxicity timeline of HLW from 300,000 years to under 1,000 years. Key challenges remain in remote fuel fabrication and cladding compatibility. The findings inform strategic plans for France's Astrid successor and the US Versatile Test Reactor program.",
    date: "2022-10",
    category: "research",
    source: "Nuclear Engineering and Design / CEA",
    url: "https://doi.org/10.1016/j.nucengdes.2022.111830",
    tags: [
      "transmutation",
      "minor actinides",
      "fast reactor",
      "HLW",
      "partitioning"
    ],
    audience: "researcher"
  },
  {
    id: "nuclear-desalination-iaea-2023",
    title: "IAEA Promotes Nuclear Desalination as Freshwater Solution for Water-Stressed Nations",
    summary: "The IAEA's 2023 nuclear desalination update highlighted that 22 countries are actively studying nuclear desalination pairing, with South Korea's SMART reactor demonstrating co-generation of electricity and potable water. Nuclear plants' low-cost thermal energy can drive multi-effect distillation (MED) or reverse osmosis processes economically. The IAEA coordinated research program involves pilot studies in Saudi Arabia, China, and the UAE.",
    date: "2023-06",
    category: "research",
    source: "IAEA",
    url: "https://www.iaea.org/topics/non-electric-applications/nuclear-desalination",
    tags: ["desalination", "SMART reactor", "non-electric", "water", "IAEA"],
    audience: "public"
  },
  {
    id: "hydrogen-production-htgr-2023",
    title: "High-Temperature Gas Reactors Advance as Hydrogen Production Platforms",
    summary: "JAEA's High Temperature Engineering Test Reactor (HTTR) in Japan demonstrated stable hydrogen production via the iodine-sulfur (IS) thermochemical cycle in 2023 coupled tests, producing hydrogen at over 850°C without greenhouse gas emissions. The DOE also funded multiple projects under its Nuclear Hydrogen Initiative pairing advanced HTGRs with steam methane reforming and solid-oxide electrolysis. Nuclear hydrogen could decarbonize steel, ammonia, and heavy transport sectors.",
    date: "2023-03",
    category: "research",
    source: "JAEA / DOE",
    url: "https://www.energy.gov/ne/nuclear-hydrogen-initiative",
    tags: ["hydrogen", "HTGR", "thermochemical", "HTTR", "decarbonization"],
    audience: "student"
  },
  {
    id: "molten-salt-reactor-2024",
    title: "Kairos Power Breaks Ground on First US Molten-Salt Reactor Demonstration",
    summary: "Kairos Power began construction of its Hermes molten fluoride salt–cooled reactor demonstration plant in Oak Ridge, Tennessee in 2024, becoming the first non-water-cooled reactor to receive an NRC construction permit in over 50 years. Hermes is a non-power demonstration unit rated at 35 MWt that will qualify the fluoride salt coolant and TRISO fuel combination. Commercial plants of this type could operate at lower pressure than water-cooled designs, improving inherent safety.",
    date: "2024-01",
    category: "technology",
    source: "NRC / Kairos Power",
    url: "https://www.nrc.gov/reactors/new-reactors/advanced/kairos.html",
    tags: [
      "Kairos Power",
      "molten salt",
      "TRISO",
      "Hermes",
      "advanced reactor"
    ],
    audience: "student"
  },
  // ── HISTORY ─────────────────────────────────────────────────────────────────
  {
    id: "cp1-80th-anniversary-2022",
    title: "80th Anniversary of Chicago Pile-1: The World's First Artificial Nuclear Reactor",
    summary: "December 2, 2022 marked the 80th anniversary of Chicago Pile-1 (CP-1) achieving the world's first self-sustaining nuclear chain reaction under the west stands of Stagg Field at the University of Chicago. Enrico Fermi and a team of 49 scientists operated the graphite-moderated, natural uranium reactor for 28 minutes at a power of about 0.5 W. The event validated nuclear fission theory and directly enabled both the Manhattan Project and the later development of civilian nuclear power.",
    date: "2022-12",
    category: "history",
    source: "ANL / University of Chicago",
    url: "https://www.anl.gov/cp1",
    tags: [
      "CP-1",
      "Enrico Fermi",
      "chain reaction",
      "Manhattan Project",
      "history",
      "anniversary"
    ],
    audience: "public"
  },
  {
    id: "three-mile-island-restart-2024",
    title: "Three Mile Island Unit 1 to Restart as 'Crane Clean Energy Center'",
    summary: "In September 2023, Microsoft and Constellation Energy announced a 20-year power purchase agreement to restart Three Mile Island Unit 1 (which operated 1974–2019 and is separate from the Unit 2 that had the 1979 accident), renamed the Crane Clean Energy Center. The 837 MWe plant is expected to return to service in 2028, supplying carbon-free electricity for Microsoft's data centers. The deal exemplifies a new trend of tech companies driving nuclear power demand.",
    date: "2023-09",
    category: "history",
    source: "Constellation Energy / Microsoft",
    url: "https://www.constellationenergy.com/newsroom/2023/constellation-to-launch-crane-clean-energy-center.html",
    tags: [
      "Three Mile Island",
      "Crane Clean Energy",
      "Microsoft",
      "restart",
      "power purchase"
    ],
    audience: "public"
  },
  {
    id: "chernobyl-exclusion-zone-research-2023",
    title: "New Research Maps Chernobyl Exclusion Zone Wildlife Recovery After 37 Years",
    summary: "A comprehensive 2023 study in Environmental Science & Technology using drone surveys and camera traps documented thriving populations of wolves, bears, lynx, and rare Przewalski's horses in the Chernobyl Exclusion Zone (CEZ), where human activity has been largely absent since 1986. While some animals show chronic DNA damage markers, populations are higher than in comparable inhabited regions. The findings contribute to ongoing debate about the net impact of radiation versus human disturbance on ecosystem recovery.",
    date: "2023-04",
    category: "history",
    source: "Environmental Science & Technology",
    url: "https://doi.org/10.1021/acs.est.3c01538",
    tags: [
      "Chernobyl",
      "exclusion zone",
      "wildlife",
      "ecology",
      "radiation effects"
    ],
    audience: "public"
  },
  // ── ADDITIONAL RESEARCH/TECHNOLOGY ──────────────────────────────────────────
  {
    id: "versatile-test-reactor-2023",
    title: "DOE Advances Versatile Test Reactor for Fast-Neutron Fuel and Materials Testing",
    summary: "The DOE's Versatile Test Reactor (VTR) project, hosted at Idaho National Laboratory, completed Phase 1 conceptual design in 2023 for a sodium-cooled fast-neutron research reactor. The VTR would be the first US fast-spectrum test reactor since EBR-II shut down in 1994, enabling irradiation testing of advanced fuels and structural materials at higher neutron flux than current thermal test reactors. Congressional funding debates continued through 2024.",
    date: "2023-02",
    category: "research",
    source: "DOE / INL",
    url: "https://www.energy.gov/ne/articles/doe-announces-versatile-test-reactor-completes-key-design-milestone",
    tags: ["VTR", "fast neutron", "INL", "fuel testing", "research reactor"],
    audience: "researcher"
  },
  {
    id: "nuclear-ai-ops-2024",
    title: "Nuclear Operators Begin Piloting AI-Assisted Monitoring for Plant Operations",
    summary: "Several US and French nuclear plant operators in 2024 began pilot programs using machine learning models to monitor plant sensor data for early anomaly detection, predictive maintenance alerts, and thermal efficiency optimization. Oak Ridge National Laboratory and EDF published results showing AI models can identify degrading pumps and heat exchanger fouling weeks before traditional alarm thresholds would trigger. Regulatory frameworks for AI in safety-critical systems are being developed by the NRC and IRSN.",
    date: "2024-05",
    category: "technology",
    source: "ORNL / EDF / NRC",
    url: "https://www.ornl.gov/research/nuclear-energy",
    tags: [
      "AI",
      "machine learning",
      "predictive maintenance",
      "plant operations",
      "digital twin"
    ],
    audience: "researcher"
  },
  {
    id: "smr-poland-2023",
    title: "Poland Signs Agreement for First Nuclear Plant Using BWRX-300 SMR Technology",
    summary: "Poland's state energy company Orlen Synthos Green Energy signed a framework agreement with GE Hitachi in 2023 to deploy up to six BWRX-300 boiling water small modular reactors, targeting first power by 2033. Poland aims to phase out coal (which supplies ~70% of its electricity) and achieve nuclear energy independence from Russian gas. The BWRX-300 design claims 50% lower capital cost than conventional BWRs due to passive safety systems and factory-built modules.",
    date: "2023-05",
    category: "policy",
    source: "GE Hitachi / WNA",
    url: "https://www.world-nuclear-news.org/Articles/Orlen-Synthos-Green-Energy-signs-up-for-six-BWRX-3",
    tags: ["Poland", "BWRX-300", "SMR", "GE Hitachi", "coal phase-out"],
    audience: "public"
  },
  {
    id: "nuclear-medicine-supply-chain-2022",
    title: "New Mo-99 Production Agreements Secure Global Medical Radioisotope Supply Chain",
    summary: "Following supply chain vulnerabilities exposed during COVID-19, the IAEA and Nuclear Security Summit process facilitated new multi-supplier agreements for Molybdenum-99 (Mo-99) production in 2022. Mo-99 decays to Technetium-99m, used in 85% of nuclear medicine diagnostic procedures (~40 million per year). New non-reactor cyclotron-based and accelerator-based production pathways were certified at facilities in the Netherlands, Canada, and Belgium to reduce dependence on aging research reactors.",
    date: "2022-06",
    category: "medicine",
    source: "IAEA / OECD NEA",
    url: "https://www.iaea.org/topics/mo-99-tc-99m-supply",
    tags: ["Mo-99", "Tc-99m", "medical radioisotopes", "supply chain", "IAEA"],
    audience: "student"
  },
  {
    id: "generation-iv-progress-2023",
    title: "Generation IV International Forum Reports Progress Across Six Advanced Reactor Designs",
    summary: "The Generation IV International Forum (GIF) 2023 Annual Report documented significant advances across all six Gen IV concepts: sodium fast reactors (CFR-600 criticality), molten salt reactors (Kairos permit), gas-cooled fast reactors (early design work), lead-cooled fast reactors (ALFRED design), very high temperature reactors (HTTR hydrogen trials), and supercritical water reactors (conceptual design). GIF unites 14 countries sharing R&D costs under joint project agreements.",
    date: "2023-12",
    category: "research",
    source: "GIF / OECD NEA",
    url: "https://www.gen-4.org/gif/jcms/c_9271/annual-reports",
    tags: [
      "Gen IV",
      "advanced reactors",
      "GIF",
      "international",
      "next generation"
    ],
    audience: "student"
  }
];
const CATEGORY_CONFIG = {
  research: {
    label: "Research",
    color: "text-cyan-300",
    bg: "bg-cyan-950/40",
    border: "border-cyan-700/50"
  },
  policy: {
    label: "Policy",
    color: "text-violet-300",
    bg: "bg-violet-950/40",
    border: "border-violet-700/50"
  },
  technology: {
    label: "Technology",
    color: "text-emerald-300",
    bg: "bg-emerald-950/40",
    border: "border-emerald-700/50"
  },
  safety: {
    label: "Safety",
    color: "text-amber-300",
    bg: "bg-amber-950/40",
    border: "border-amber-700/50"
  },
  medicine: {
    label: "Medicine",
    color: "text-rose-300",
    bg: "bg-rose-950/40",
    border: "border-rose-700/50"
  },
  fusion: {
    label: "Fusion",
    color: "text-orange-300",
    bg: "bg-orange-950/40",
    border: "border-orange-700/50"
  },
  history: {
    label: "History",
    color: "text-sky-300",
    bg: "bg-sky-950/40",
    border: "border-sky-700/50"
  }
};
const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "category", label: "By Category" }
];
const fuse = new Fuse(newsItems, {
  keys: [
    { name: "title", weight: 0.5 },
    { name: "summary", weight: 0.3 },
    { name: "tags", weight: 0.2 }
  ],
  threshold: 0.35,
  includeScore: true
});
function CategoryBadge({ category }) {
  const cfg = CATEGORY_CONFIG[category];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border",
        cfg.bg,
        cfg.color,
        cfg.border
      ),
      children: cfg.label
    }
  );
}
function AudienceChip({ audience }) {
  const labels = {
    public: "General",
    student: "Student",
    researcher: "Researcher"
  };
  const styles = {
    public: "bg-muted text-muted-foreground border-border",
    student: "bg-primary/10 text-primary border-primary/30",
    researcher: "bg-accent/10 text-accent border-accent/30"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs border",
        styles[audience]
      ),
      children: labels[audience]
    }
  );
}
function NewsCard({
  item,
  index
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.article,
    {
      "data-ocid": `news.item.${index + 1}`,
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -10 },
      transition: { duration: 0.25, delay: Math.min(index * 0.04, 0.4) },
      className: "flex flex-col gap-3 rounded-xl border border-border bg-card p-5 shadow-card hover:border-primary/30 hover:shadow-glow-accent transition-all duration-200",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryBadge, { category: item.category }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceChip, { audience: item.audience }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-xs text-muted-foreground flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3 w-3", "aria-hidden": "true" }),
            item.date
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-semibold leading-snug text-foreground line-clamp-3", children: item.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed line-clamp-4 flex-1", children: item.summary }),
        item.tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: item.tags.slice(0, 5).map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: "inline-flex items-center gap-0.5 rounded-md bg-muted px-1.5 py-0.5 text-xs text-muted-foreground",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "h-2.5 w-2.5", "aria-hidden": "true" }),
              tag
            ]
          },
          tag
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-1 border-t border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground", children: item.source }),
          item.url && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: item.url,
              target: "_blank",
              rel: "noopener noreferrer",
              "data-ocid": `news.source_link.${index + 1}`,
              className: "inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors",
              "aria-label": `Open source for ${item.title} (opens in new tab)`,
              children: [
                "View Source",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3 w-3", "aria-hidden": "true" })
              ]
            }
          )
        ] })
      ]
    }
  );
}
function HeroCard({ item }) {
  const cfg = CATEGORY_CONFIG[item.category];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.article,
    {
      "data-ocid": "news.featured_card",
      initial: { opacity: 0, y: 24 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4 },
      className: cn(
        "relative overflow-hidden rounded-2xl border bg-card p-6 md:p-8 shadow-card mb-8",
        cfg.border
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "pointer-events-none absolute inset-0 opacity-10 blur-3xl",
              cfg.bg
            ),
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: cn(
                  "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider border",
                  cfg.bg,
                  cfg.color,
                  cfg.border
                ),
                children: "★ Featured"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryBadge, { category: item.category }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AudienceChip, { audience: item.audience }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-xs text-muted-foreground flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3 w-3", "aria-hidden": "true" }),
              item.date
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl md:text-2xl font-bold text-foreground leading-snug", children: item.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm md:text-base text-muted-foreground leading-relaxed", children: item.summary }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: item.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "inline-flex items-center gap-0.5 rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "h-2.5 w-2.5", "aria-hidden": "true" }),
                tag
              ]
            },
            tag
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-2 border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground", children: item.source }),
            item.url && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "a",
              {
                href: item.url,
                target: "_blank",
                rel: "noopener noreferrer",
                "data-ocid": "news.featured_source_link",
                className: "inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors font-medium",
                "aria-label": `Open source for ${item.title} (opens in new tab)`,
                children: [
                  "View Source",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3.5 w-3.5", "aria-hidden": "true" })
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function NuclearNewsFeed() {
  const { audienceLevel } = useAppStore();
  const [search, setSearch] = reactExports.useState("");
  const [activeCategory, setActiveCategory] = reactExports.useState(
    "all"
  );
  const [sortBy, setSortBy] = reactExports.useState("newest");
  const [audienceFilter, setAudienceFilter] = reactExports.useState("all");
  const latestDate = newsItems.reduce((a, b) => a.date > b.date ? a : b).date;
  const categoryCount = new Set(newsItems.map((n) => n.category)).size;
  const filteredItems = reactExports.useMemo(() => {
    let base = search.trim().length > 1 ? fuse.search(search).map((r) => r.item) : [...newsItems];
    if (activeCategory !== "all") {
      base = base.filter((n) => n.category === activeCategory);
    }
    if (audienceFilter !== "all") {
      base = base.filter((n) => n.audience === audienceFilter);
    }
    const audiencePriority = {
      public: 0,
      student: 1,
      researcher: 2
    };
    const preferredLevel = audiencePriority[audienceLevel] ?? 0;
    return base.sort((a, b) => {
      if (sortBy === "newest") return b.date.localeCompare(a.date);
      if (sortBy === "oldest") return a.date.localeCompare(b.date);
      if (sortBy === "category") {
        const catCmp = a.category.localeCompare(b.category);
        if (catCmp !== 0) return catCmp;
        return b.date.localeCompare(a.date);
      }
      const aPrio = Math.abs(audiencePriority[a.audience] - preferredLevel);
      const bPrio = Math.abs(audiencePriority[b.audience] - preferredLevel);
      return aPrio - bPrio;
    });
  }, [search, activeCategory, audienceFilter, sortBy, audienceLevel]);
  const featuredItems = filteredItems.filter((n) => n.highlighted);
  const regularItems = filteredItems.filter((n) => !n.highlighted);
  const categories = [
    "all",
    "fusion",
    "technology",
    "research",
    "medicine",
    "safety",
    "policy",
    "history"
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-4 py-8 md:py-12", "data-ocid": "news.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Nuclear News & Research",
        subtitle: "A curated educational feed of significant nuclear science and engineering developments from 2022–2024, drawn from peer-reviewed literature, IAEA reports, and authoritative news sources."
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "mb-8 flex flex-wrap gap-4 rounded-xl border border-border bg-muted/30 px-5 py-4",
        "data-ocid": "news.stats_bar",
        "aria-label": "Feed statistics",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Newspaper, { className: "h-4 w-4 text-primary", "aria-hidden": "true" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: newsItems.length }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "curated articles" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4 text-accent", "aria-hidden": "true" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Latest:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: latestDate })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "h-4 w-4 text-secondary", "aria-hidden": "true" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: categoryCount }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "topic categories" })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex flex-col gap-4", "data-ocid": "news.controls", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Search,
          {
            className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground",
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "search",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            placeholder: "Search articles, tags, summaries…",
            "data-ocid": "news.search_input",
            "aria-label": "Search news articles",
            className: "w-full rounded-lg border border-input bg-card pl-9 pr-10 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
          }
        ),
        search && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setSearch(""),
            "data-ocid": "news.search_clear",
            "aria-label": "Clear search",
            className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4", "aria-hidden": "true" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { className: "flex flex-wrap gap-2 border-0 m-0 p-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { className: "sr-only", children: "Filter by category" }),
        categories.map((cat) => {
          const isActive = activeCategory === cat;
          const cfg = cat !== "all" ? CATEGORY_CONFIG[cat] : null;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setActiveCategory(cat),
              "data-ocid": `news.category_filter.${cat}`,
              "aria-pressed": isActive,
              className: cn(
                "rounded-full px-3 py-1 text-xs font-medium border transition-all duration-150",
                isActive ? cfg ? cn(cfg.bg, cfg.color, cfg.border, "shadow-sm") : "bg-primary/15 text-primary border-primary/40" : "bg-muted/50 text-muted-foreground border-border hover:border-primary/30 hover:text-foreground"
              ),
              children: cat === "all" ? "All Topics" : CATEGORY_CONFIG[cat].label
            },
            cat
          );
        })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { className: "flex items-center gap-1 rounded-lg border border-border bg-muted/30 p-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { className: "sr-only", children: "Filter by audience" }),
          ["all", "public", "student", "researcher"].map(
            (lvl) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setAudienceFilter(lvl),
                "data-ocid": `news.audience_filter.${lvl}`,
                "aria-pressed": audienceFilter === lvl,
                className: cn(
                  "rounded-md px-2.5 py-1 text-xs font-medium transition-all duration-150 capitalize",
                  audienceFilter === lvl ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                ),
                children: lvl === "all" ? "All Levels" : lvl.charAt(0).toUpperCase() + lvl.slice(1)
              },
              lvl
            )
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "news-sort",
              className: "text-xs text-muted-foreground whitespace-nowrap",
              children: "Sort by:"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              id: "news-sort",
              value: sortBy,
              onChange: (e) => setSortBy(e.target.value),
              "data-ocid": "news.sort_select",
              className: "rounded-lg border border-input bg-card px-3 py-1.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring",
              children: SORT_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: opt.value, children: opt.label }, opt.value))
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "output",
      {
        className: "mb-5 block text-sm text-muted-foreground",
        "aria-live": "polite",
        "aria-atomic": "true",
        children: filteredItems.length === newsItems.length ? `Showing all ${newsItems.length} articles` : `${filteredItems.length} of ${newsItems.length} articles`
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "sync", children: featuredItems.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.section,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        "aria-label": "Featured articles",
        "data-ocid": "news.featured_section",
        children: featuredItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(HeroCard, { item }, item.id))
      },
      "featured"
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "sync", children: filteredItems.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0 },
        "data-ocid": "news.empty_state",
        className: "flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border bg-muted/20 py-20 text-center",
        "aria-label": "No articles match your filters",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Newspaper,
            {
              className: "h-12 w-12 text-muted-foreground/40",
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "No articles found" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Try different keywords, adjust the category filter, or clear your search." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => {
                setSearch("");
                setActiveCategory("all");
                setAudienceFilter("all");
              },
              "data-ocid": "news.reset_filters_button",
              className: "rounded-lg border border-border bg-card px-4 py-2 text-sm text-foreground hover:border-primary/40 hover:text-primary transition-colors",
              children: "Reset all filters"
            }
          )
        ]
      },
      "empty"
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: "grid grid-cols-1 gap-4 md:grid-cols-2",
        "data-ocid": "news.grid",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "popLayout", children: regularItems.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(NewsCard, { item, index: idx }, item.id)) })
      },
      "grid"
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "footer",
      {
        className: "mt-12 rounded-xl border border-border bg-muted/20 px-5 py-4 text-xs text-muted-foreground leading-relaxed",
        "data-ocid": "news.disclaimer",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Educational Disclaimer:" }),
          " ",
          "This is a curated educational feed. Content is based on publicly available sources including IAEA reports, peer-reviewed literature, and reputable news outlets. Summaries are written for educational purposes and may omit technical nuance. Always verify information through official primary sources before citing or acting on it. No classified, restricted, or export-controlled information is included."
        ]
      }
    )
  ] });
}
export {
  NuclearNewsFeed as default
};
