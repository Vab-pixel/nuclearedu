import { e as createLucideIcon, j as jsxRuntimeExports, b as Badge, A as Atom, Z as Zap, S as Shield, r as reactExports, a as ChevronDown, C as ChevronRight } from "./index-D72vKdFv.js";
import { G as Globe } from "./globe-BtNp8mwp.js";
import { R as Rocket } from "./rocket-B5Iu1jQh.js";
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
      d: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",
      key: "96xj49"
    }
  ]
];
const Flame = createLucideIcon("flame", __iconNode);
function CollapsibleEra({ era }) {
  const [open, setOpen] = reactExports.useState(false);
  const levelColors = {
    Beginner: "bg-chart-2/20 text-chart-2 border-chart-2/30",
    Intermediate: "bg-primary/15 text-primary border-primary/30",
    Advanced: "bg-accent/15 text-accent border-accent/30"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-xl overflow-hidden bg-card shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        className: "w-full flex items-center gap-4 p-5 text-left hover:bg-muted/40 transition-colors duration-200 group",
        onClick: () => setOpen((v) => !v),
        "aria-expanded": open,
        "data-ocid": `timeline.era_${era.id}.toggle`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${era.color}`,
              children: era.icon
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-base text-foreground truncate", children: era.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-mono", children: era.range }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: `text-xs ${levelColors[era.level]}`,
                  children: era.level
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground line-clamp-1", children: era.summary })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0 text-muted-foreground group-hover:text-foreground transition-colors", children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5" }) })
        ]
      }
    ),
    open && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "border-t border-border bg-background px-5 pb-6 pt-4",
        "data-ocid": `timeline.era_${era.id}.content`,
        children: [
          era.safetyNote && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 rounded-lg border border-secondary/40 bg-secondary/10 px-4 py-3 text-sm text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-secondary-foreground", children: [
              "⚠ Content Note:",
              " "
            ] }),
            era.safetyNote
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "relative border-l-2 border-border ml-4 space-y-0", children: era.events.map((ev) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "li",
            {
              className: "pl-6 pb-7 relative last:pb-0",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `absolute -left-[9px] top-[5px] w-4 h-4 rounded-full border-2 flex-shrink-0 ${ev.isMilestone ? "border-primary bg-primary" : "border-border bg-card"}`
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-baseline gap-2 mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded", children: ev.year }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-sm text-foreground", children: ev.title })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: ev.description }),
                ev.detail && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground italic border-l-2 border-primary/30 pl-2 mt-2", children: ev.detail }),
                ev.citation && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-xs text-muted-foreground/60", children: [
                  "[",
                  ev.citation,
                  "]"
                ] })
              ]
            },
            ev.year + ev.title
          )) })
        ]
      }
    )
  ] });
}
const ERAS = [
  {
    id: "discovery",
    title: "The Age of Discovery",
    range: "1896–1938",
    level: "Beginner",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Atom, { className: "w-5 h-5" }),
    color: "bg-chart-2/20 text-chart-2",
    summary: "Radioactivity, the nuclear atom, and the road to fission — 42 years that rewrote physics.",
    events: [
      {
        year: "1896",
        title: "Becquerel Discovers Radioactivity",
        description: "Henri Becquerel (Paris) discovers that uranium salts emit penetrating radiation spontaneously, without any external energy source — the discovery of radioactivity. He wins the Nobel Prize in Physics in 1903, shared with the Curies.",
        detail: "Becquerel initially thought the emission required prior exposure to sunlight. Overcast days in Paris led him to store his experiment in a drawer — yet the photographic plate was still fogged, proving the radiation was intrinsic to uranium.",
        citation: "Nobel Prize in Physics, 1903",
        isMilestone: true
      },
      {
        year: "1898",
        title: "Curie Discovers Polonium and Radium",
        description: "Marie and Pierre Curie (Paris) isolate polonium (named after Marie's homeland) and radium from pitchblende ore, demonstrating that radioactivity is an atomic property. Marie Curie wins Nobel Prizes in Physics (1903) and Chemistry (1911) — the only person to win in two different sciences.",
        detail: "Isolating one gram of radium required processing roughly one tonne of pitchblende. Marie Curie coined the term 'radioactivity.' Her notebooks remain too radioactive to handle without protection and are stored in lead-lined boxes at the Bibliothèque nationale de France.",
        citation: "Nobel Prize Physics 1903; Chemistry 1911",
        isMilestone: true
      },
      {
        year: "1905",
        title: "Einstein Publishes E = mc²",
        description: "Albert Einstein (Berlin) derives the mass–energy equivalence E = mc² as a consequence of special relativity, published in Annalen der Physik. The equation quantifies the enormous energy latent in matter and underpins all nuclear energy calculations.",
        detail: "The paper, 'Does the Inertia of a Body Depend Upon Its Energy Content?' was just three pages long. Einstein himself did not immediately foresee its nuclear applications — the energy released in a single fission event (≈200 MeV) corresponds to a mass loss of only ~3.5 × 10⁻²⁵ kg.",
        citation: "Einstein, Annalen der Physik 18, 639 (1905)",
        isMilestone: true
      },
      {
        year: "1909",
        title: "Gold Foil Experiment",
        description: "Hans Geiger and Ernest Marsden, working under Ernest Rutherford at the University of Manchester, fire alpha particles at a thin gold foil. Most pass straight through, but a small fraction bounce back at large angles — impossible if Thomson's 'plum pudding' model were correct.",
        detail: "Rutherford described it: 'It was as though you fired a 15-inch shell at tissue paper and it came back and hit you.' The experiment established that atoms are mostly empty space with a tiny, dense, positively charged nucleus.",
        citation: "Geiger & Marsden, Proc. Roy. Soc. A 82 (1909)"
      },
      {
        year: "1911",
        title: "Rutherford's Nuclear Model",
        description: "Ernest Rutherford publishes the nuclear model of the atom: a tiny, massive, positive nucleus surrounded by orbiting electrons. This remains the basis of atomic structure understanding today.",
        citation: "Rutherford, Phil. Mag. 21 (1911)"
      },
      {
        year: "1913",
        title: "Bohr's Planetary Model",
        description: "Niels Bohr (Copenhagen) proposes quantized electron orbits, explaining the discrete spectral lines of hydrogen for the first time. The model introduces the idea that electrons occupy specific energy levels and emit photons of specific wavelengths when transitioning between them.",
        detail: "Bohr's model introduced the concept of the ground state — the lowest allowed energy level. While superseded by quantum mechanics, it remains pedagogically fundamental and accurately predicts hydrogen's Balmer series.",
        citation: "Bohr, Phil. Mag. 26 (1913); Nobel Prize 1922"
      },
      {
        year: "1919",
        title: "First Artificial Nuclear Reaction",
        description: "Ernest Rutherford (Manchester) achieves the first artificial nuclear transmutation: ¹⁴N + ⁴He → ¹⁷O + ¹H. Alpha particles from radium strike nitrogen gas, producing oxygen-17 and a proton. This is the first time humanity deliberately converts one element into another.",
        detail: "The reaction equation in modern notation: ¹⁴₇N + ⁴₂He → ¹⁷₈O + ¹₁H. The Q-value is approximately −1.19 MeV (endothermic), meaning the alpha particle must carry sufficient kinetic energy.",
        citation: "Rutherford, Phil. Mag. 37 (1919)",
        isMilestone: true
      },
      {
        year: "1932",
        title: "Chadwick Discovers the Neutron",
        description: "James Chadwick (Cambridge) identifies the neutron — a neutral nuclear particle with mass ≈ 1 amu. Previously theorized by Rutherford, its discovery completes the basic picture of nuclear structure and, critically, provides the neutral projectile that can penetrate nuclei without being repelled by Coulomb forces.",
        detail: "The neutron made nuclear fission conceivable: only a neutral particle can approach a heavy nucleus without an energy barrier and trigger its splitting. Without this discovery, the Manhattan Project would have been impossible.",
        citation: "Chadwick, Nature 129 (1932); Nobel Prize 1935",
        isMilestone: true
      },
      {
        year: "1934",
        title: "Fermi's Neutron Bombardment Program",
        description: "Enrico Fermi (Rome) systematically bombards elements with neutrons, discovering that slow (thermal) neutrons are far more effective at inducing nuclear reactions than fast ones. He observes unexplained radioactivity in uranium — which we now know was fission products he didn't recognize as such.",
        detail: "Fermi's key insight: passing neutrons through paraffin or water slows them dramatically (the 'Fermi effect'), increasing reaction cross-sections by orders of magnitude. This principle underlies all thermal reactor designs.",
        citation: "Nobel Prize in Physics 1938"
      },
      {
        year: "1938",
        title: "Hahn and Strassmann Find Barium",
        description: "Otto Hahn and Fritz Strassmann (Berlin) bombard uranium with slow neutrons and identify barium (Z=56) in the products using radiochemistry. Barium is far too light to be a simple transmutation product of uranium (Z=92) — something dramatic must have happened to the nucleus.",
        citation: "Hahn & Strassmann, Naturwissenschaften 27 (1939)",
        isMilestone: true
      },
      {
        year: "1939",
        title: "Meitner and Frisch Explain Fission",
        description: "Lise Meitner and Otto Frisch (Sweden/UK) provide the theoretical explanation for Hahn's barium result: the uranium nucleus splits into two roughly equal fragments. They coin the term 'nuclear fission' by analogy with cell division. Using Einstein's E = mc², they calculate a release of approximately 200 MeV per fission event — roughly 50 million times an ordinary chemical bond.",
        detail: "Meitner's key letter to Frisch, Christmas 1938: 'The uranium nucleus is not spherical but elongated; it can split into two fragments.' She applied the liquid drop model — nuclear surface tension competes with electrostatic repulsion. Meitner was controversially omitted from the Nobel Prize awarded to Hahn alone in 1944.",
        citation: "Meitner & Frisch, Nature 143 (1939)",
        isMilestone: true
      }
    ]
  },
  {
    id: "weapon",
    title: "From Discovery to Weapon",
    range: "1939–1945",
    level: "Intermediate",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-5 h-5" }),
    color: "bg-destructive/15 text-destructive",
    summary: "Six years transformed a physics curiosity into a weapon that ended the deadliest war in history.",
    safetyNote: "These events are historical facts documented by government sources and academic historians. This site provides historical context only and does not describe nuclear weapon technical specifications.",
    events: [
      {
        year: "Jan 1939",
        title: "Bohr–Wheeler Fission Theory",
        description: "Niels Bohr and John Wheeler (Princeton) publish the theoretical basis for fission, predicting that U-235 — not the far more abundant U-238 — is the primary fissile isotope responsible for slow-neutron-induced fission. This insight defined the entire subsequent enrichment and weapon design effort.",
        citation: "Bohr & Wheeler, Phys. Rev. 56 (1939)",
        isMilestone: true
      },
      {
        year: "Aug 1939",
        title: "Einstein–Szilard Letter",
        description: "Leo Szilard drafts a letter, signed by Albert Einstein, to President Franklin D. Roosevelt warning that Nazi Germany may be pursuing a nuclear weapon and urging the U.S. government to fund nuclear chain-reaction research. This letter directly triggers the formation of the Advisory Committee on Uranium and, ultimately, the Manhattan Project.",
        detail: "Einstein later called signing the letter 'the one great mistake of my life.' The irony was profound: Germany's nuclear program (the Uranverein) was actually far behind the Allied effort, partly because Heisenberg's calculations overstated the amount of enriched uranium needed for a weapon.",
        citation: "Einstein–Szilard letter, August 2, 1939; National Archives",
        isMilestone: true
      },
      {
        year: "Dec 2, 1942",
        title: "Chicago Pile-1 — First Controlled Chain Reaction",
        description: "At 3:25 PM in a squash court beneath the University of Chicago's Stagg Field stadium, Enrico Fermi and his team achieve the world's first self-sustaining controlled nuclear chain reaction. CP-1 uses 385 tonnes of uranium and uranium oxide blocks interspersed with graphite moderator layers. Peak power: approximately 200 W.",
        detail: "The success was reported to Washington via coded telegram: 'The Italian navigator has just landed in the new world.' Arthur Compton replied with a bottle of Chianti. The site operated for 28 days before being moved to the Palos Hills Argonne Forest site for safety reasons — the entire experiment was conducted inside a city of 3 million people.",
        citation: "Fermi, CP-1 logbook; US DOE/ANL archives",
        isMilestone: true
      },
      {
        year: "1943–1945",
        title: "Manhattan Project Operations",
        description: "J. Robert Oppenheimer directs the Los Alamos Scientific Laboratory (Project Y), coordinating theoretical and experimental work across 3,000+ scientists and engineers. Parallel industrial sites: Oak Ridge, Tennessee (Y-12 electromagnetic enrichment; X-10 graphite reactor for plutonium research) and Hanford, Washington (B Reactor — world's first full-scale plutonium production reactor, 250 MW thermal).",
        detail: "At peak, the Manhattan Project employed 130,000 people across 30 sites. Total cost: approximately $2 billion (1940s dollars; ~$30 billion today). The B Reactor at Hanford, which produced the plutonium for the Trinity and Fat Man devices, is now a National Historic Landmark and open to visitors.",
        citation: "Rhodes, The Making of the Atomic Bomb (1986); DOE/OpenNet"
      },
      {
        year: "Jul 16, 1945",
        title: "Trinity Test",
        description: "The world's first nuclear explosion detonates at 5:29 AM in the Jornada del Muerto desert, New Mexico. Yield: approximately 21 kilotons TNT equivalent. The 30-meter steel tower is vaporized; the desert sand is fused into a glassy substance later named trinitite. J. Robert Oppenheimer recalls a verse from the Bhagavad Gita: 'Now I am become Death, the destroyer of worlds.'",
        detail: "The explosion was visible from 280 km. A false cover story described a munitions accident. Physicist Kenneth Bainbridge, the test director, told Oppenheimer immediately after: 'Now we are all sons of bitches.'",
        citation: "Oppenheimer testimony, 1954 AEC hearing; Trinity Site, NM (National Historic Landmark)",
        isMilestone: true
      },
      {
        year: "Aug 6 & 9, 1945",
        title: "Hiroshima and Nagasaki",
        description: "Little Boy (uranium-235 gun assembly) is dropped on Hiroshima on August 6 (~15 kt yield); Fat Man (plutonium-239 implosion device) on Nagasaki on August 9 (~21 kt yield). Immediate deaths: approximately 70,000–80,000 in Hiroshima; 40,000 in Nagasaki. Total deaths by end of 1945, including acute radiation syndrome: estimated 130,000–226,000.",
        detail: "The Atomic Bomb Casualty Commission (later the Radiation Effects Research Foundation, RERF) studied survivors (hibakusha) for decades; their data on radiation dose–response forms the empirical basis of modern radiation protection standards. Japan surrendered on August 15, 1945.",
        citation: "RERF Life Span Study; Committee for the Compilation of Materials on Damage Caused by the Atomic Bombs (1981)",
        isMilestone: true
      }
    ]
  },
  {
    id: "atomic-age",
    title: "The Atomic Age Begins",
    range: "1945–1960",
    level: "Intermediate",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-5 h-5" }),
    color: "bg-chart-3/20 text-chart-3",
    summary: "The US monopoly ends, peaceful nuclear power ignites, and international governance takes shape.",
    events: [
      {
        year: "1945–1947",
        title: "UN Atomic Energy Commission & Baruch Plan",
        description: "The United Nations Atomic Energy Commission is established in January 1946. The Baruch Plan (June 1946) proposes international control of all nuclear technology and material, with inspections and sanctions. The Soviet Union rejects it as incompatible with sovereignty; the Cold War nuclear arms race is locked in.",
        citation: "UN General Assembly Resolution 1(I), 1946; Baruch Plan, USAEC archives"
      },
      {
        year: "Aug 29, 1949",
        title: "Soviet Union Tests First Atomic Bomb",
        description: "The USSR detonates 'Joe-1' (RDS-1) at Semipalatinsk, Kazakhstan — a near-copy of the Fat Man design, aided by intelligence from the Manhattan Project. The US nuclear monopoly ends after just four years. President Truman announces it publicly on September 23.",
        detail: "Klaus Fuchs, Theodore Hall, and David Greenglass were among those who passed Manhattan Project secrets to Soviet intelligence, allowing the USSR to skip several years of R&D. The Soviet program was directed by Igor Kurchatov.",
        citation: "CIA declassified assessment; Holloway, Stalin and the Bomb (1994)",
        isMilestone: true
      },
      {
        year: "1952",
        title: "Thermonuclear Weapons & UK Nuclear Test",
        description: "The US detonates the first thermonuclear device, Ivy Mike (October 31), at Enewetak Atoll — a 10.4 megaton explosion, roughly 700× the yield of Little Boy. The UK tests its first atomic bomb (Hurricane) on October 3 at the Monte Bello Islands, becoming the third nuclear-armed state.",
        citation: "DTRA Nuclear Test Database; UK National Archives",
        isMilestone: true
      },
      {
        year: "Dec 8, 1953",
        title: "Atoms for Peace Speech",
        description: "President Dwight D. Eisenhower addresses the UN General Assembly, proposing that nuclear materials and knowledge be shared for peaceful purposes under international oversight. The speech seeds the creation of the International Atomic Energy Agency and the Atoms for Peace Program, which supplied research reactors to 24 countries.",
        citation: "Eisenhower, UN Speech, UNGA 470th Plenary Meeting (1953)",
        isMilestone: true
      },
      {
        year: "Jun 27, 1954",
        title: "Obninsk: First Grid-Connected Nuclear Power",
        description: "The Obninsk Nuclear Power Plant (USSR) begins supplying electricity to the Moscow grid — the world's first civilian nuclear power station. Design: AM-1 (graphite-water reactor); net output: 5 MWe. Decommissioned in 2002; now a museum.",
        citation: "IAEA PRIS; Semenov, Nuclear Power in the Soviet Union (1983)",
        isMilestone: true
      },
      {
        year: "1955",
        title: "First Atoms for Peace Conference",
        description: "The First UN International Conference on the Peaceful Uses of Atomic Energy convenes in Geneva, August 8–20. Some 1,400 scientists from 73 countries attend. Previously classified reactor designs and nuclear data are declassified and shared publicly for the first time. The Soviets reveal their reactor program; the West matches with PWR and BWR disclosures.",
        citation: "UN/IAEA Geneva Conference Proceedings (1955)"
      },
      {
        year: "Jan 17, 1955",
        title: "USS Nautilus — First Nuclear Submarine",
        description: "USS Nautilus (SSN-571) signals 'underway on nuclear power.' Designed under Admiral Hyman Rickover's Naval Reactors program, it uses a pressurized water reactor — the same basic design later adopted by commercial nuclear power plants. In 1958, Nautilus becomes the first vessel to reach the geographic North Pole.",
        detail: "Rickover's insistence on safety culture, rigorous maintenance, and operator training in the naval nuclear program became a model for civilian reactor operations. Many early commercial nuclear operators were trained in Rickover's naval program.",
        citation: "Naval History and Heritage Command; Rockwell, The Rickover Effect (1992)",
        isMilestone: true
      },
      {
        year: "Oct 17, 1956",
        title: "Calder Hall — First Commercial Nuclear Station",
        description: "Calder Hall, Cumberland, UK opens as the world's first nuclear power station connected to a public electricity grid at commercial scale. Magnox design (natural uranium fuel, CO₂ coolant, graphite moderator); Queen Elizabeth II officially opens it. Net capacity: 4 × 45 MWe.",
        citation: "UK DECC; Hinton, Calder Hall (1957)",
        isMilestone: true
      },
      {
        year: "Dec 1957",
        title: "Shippingport — First US Commercial Reactor",
        description: "The Shippingport Atomic Power Station (Pennsylvania) begins commercial operation on December 2 as the first full-scale PWR in the US. 60 MWe; designed under Admiral Rickover and AEC direction. (Note: EBR-I in Arco, Idaho had produced the first electricity from nuclear energy in December 1951.)",
        citation: "NRC Historical Review; IAEA PRIS"
      },
      {
        year: "Jul 29, 1957",
        title: "IAEA Founded",
        description: "The International Atomic Energy Agency formally comes into existence, headquartered in Vienna. Its dual mandate: promote peaceful uses of nuclear energy and verify that civilian nuclear activities are not diverted to weapons purposes (safeguards). Today it has 178 Member States.",
        citation: "IAEA Statute (1956); IAEA History",
        isMilestone: true
      }
    ]
  },
  {
    id: "matures",
    title: "The Nuclear Age Matures",
    range: "1960–1979",
    level: "Intermediate",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-5 h-5" }),
    color: "bg-primary/15 text-primary",
    summary: "Arms control treaties, rapid nuclear build-out, and the first serious reactor accident test the world's relationship with the atom.",
    events: [
      {
        year: "1960s",
        title: "Rapid Nuclear Arsenal Build-Up",
        description: "US and Soviet arsenals grow to tens of thousands of warheads; ICBM technology replaces bombers as the primary delivery vehicle. Mutual Assured Destruction (MAD) doctrine becomes official US and Soviet policy — deterrence through the certainty of retaliatory annihilation.",
        citation: "Bulletin of Atomic Scientists Nuclear Notebook; US DoD archives"
      },
      {
        year: "Aug 5, 1963",
        title: "Partial Test Ban Treaty (PTBT)",
        description: "The US, USSR, and UK sign the PTBT, banning nuclear test explosions in the atmosphere, underwater, and in space — only underground tests remain permitted. Driven by growing public concern over radioactive fallout (especially strontium-90 entering food chains). France and China do not sign.",
        citation: "PTBT, UNODA Treaty Collection (1963)",
        isMilestone: true
      },
      {
        year: "Jul 1, 1968",
        title: "Nuclear Non-Proliferation Treaty (NPT)",
        description: "The NPT opens for signature — the cornerstone of global nuclear non-proliferation architecture. The five recognized nuclear-weapon states (US, USSR, UK, France, China) commit not to transfer weapons; non-nuclear states commit not to acquire them; all parties commit to pursue disarmament. Now has 191 states parties — the most widely adhered-to arms control treaty in history.",
        detail: "The NPT is structured around three pillars: (1) non-proliferation, (2) disarmament, and (3) peaceful use. The IAEA administers safeguards to verify compliance. Review conferences are held every five years; the 2010 conference agreed on a 64-point action plan.",
        citation: "NPT, UNODA Treaty Collection (1968/1970); IAEA Safeguards",
        isMilestone: true
      },
      {
        year: "1969–1979",
        title: "Nuclear Build-Out in the US and France",
        description: "The US adds approximately 50 commercial reactors to the grid through the 1970s, bringing total capacity to ~50 GWe. France launches a standardized 900 MWe PWR program (Électricité de France / FRAMATOME), which by 1980 puts France on track to generating over 75% of its electricity from nuclear — the highest fraction of any nation.",
        citation: "IAEA PRIS; EDF corporate history; NRC Reactor Statistics"
      },
      {
        year: "1975",
        title: "NRC Created — Independent Safety Regulation",
        description: "The US Nuclear Regulatory Commission is established by the Energy Reorganization Act of 1974 (effective 1975), splitting nuclear promotion (ERDA/DOE) from safety regulation (NRC). The Atomic Energy Commission had served both roles simultaneously — an inherent conflict of interest recognized by Congress.",
        citation: "Energy Reorganization Act of 1974, P.L. 93-438; NRC.gov history"
      },
      {
        year: "May 18, 1974",
        title: "India's 'Smiling Buddha' Test",
        description: "India detonates its first nuclear device ('Smiling Buddha,' PNE-1) at Pokhran, Rajasthan. The plutonium was produced in the CIRUS research reactor, supplied by Canada under Atoms for Peace. The test reveals a critical safeguards gap and triggers formation of the Nuclear Suppliers Group (NSG) to control nuclear technology exports.",
        citation: "SIPRI; Perkovich, India's Nuclear Bomb (1999)",
        isMilestone: true
      },
      {
        year: "Mar 28, 1979",
        title: "Three Mile Island Accident (INES-5)",
        description: "A loss-of-coolant accident at TMI Unit 2 (PWR, Pennsylvania) leads to a partial core melt — the worst accident in US commercial nuclear history. The primary containment remains intact; no measurable public health impact from radiation. A Presidential Commission (Kemeny Report) finds the root causes were operator error amplified by regulatory and institutional failures.",
        detail: "The accident was triggered by a stuck-open pilot-operated relief valve (PORV), compounded by operators misreading instruments. The cleanup took 14 years at a cost of ~$1 billion. Public and media reaction fundamentally changed the US nuclear industry: no new reactor orders were placed in the US after 1979 (until 2012).",
        citation: "Kemeny Commission Report (1979); NRC NUREG-0600; INES classification",
        isMilestone: true
      }
    ]
  },
  {
    id: "chernobyl",
    title: "Chernobyl and Its Aftermath",
    range: "1986–2000",
    level: "Intermediate",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-5 h-5" }),
    color: "bg-destructive/15 text-destructive",
    summary: "The worst nuclear accident in history reshapes global safety culture and fuels two decades of debate.",
    events: [
      {
        year: "Apr 26, 1986",
        title: "Chernobyl Unit 4 Explosion (INES-7)",
        description: "Reactor Unit 4 of the Chernobyl Nuclear Power Plant (RBMK-1000, Ukraine/USSR) explodes during a safety test, releasing approximately 400× the radioactivity of the Hiroshima bomb into the environment. Two deaths immediately; 28 early radiation deaths among emergency workers. Root causes: a positive void coefficient design flaw and profound violations of operating procedures.",
        detail: "The RBMK's positive void coefficient meant that as coolant boiled away, reactivity increased — a self-amplifying instability at low power. The operators had disabled multiple safety systems to conduct the test. The graphite moderator fire burned for 10 days. 350,000 people were eventually evacuated from a 2,600 km² exclusion zone.",
        citation: "INSAG-7 (1991); IAEA Chernobyl Forum Report (2005); UNSCEAR 2008 Annex D",
        isMilestone: true
      },
      {
        year: "1987",
        title: "IAEA Safety Culture Concept",
        description: "The International Nuclear Safety Advisory Group (INSAG) publishes INSAG-1, introducing 'safety culture' as a formal concept: 'the assembly of characteristics and attitudes in organizations and individuals which establishes that, as an overriding priority, nuclear plant safety issues receive the attention warranted by their significance.'",
        citation: "INSAG-1, IAEA Safety Series No. 75-INSAG-1 (1988)",
        isMilestone: true
      },
      {
        year: "1991",
        title: "INSAG-7: Institutional Causes of Chernobyl",
        description: "INSAG's revised Chernobyl post-accident report (INSAG-7) concludes that the accident stemmed not merely from operator error but from 'a fundamental lack of safety culture' across the Soviet nuclear establishment — suppression of safety information, inadequate training, and a culture that prioritized production over safety.",
        citation: "INSAG-7, IAEA Safety Series No. 75-INSAG-7 (1991)"
      },
      {
        year: "May 1994",
        title: "Convention on Nuclear Safety",
        description: "The Convention on Nuclear Safety, the first binding international legal instrument on the safety of land-based civilian nuclear power plants, is opened for signature. Enters into force September 1996. States parties must report on their nuclear safety measures at regular review meetings.",
        citation: "IAEA INFCIRC/449 (1994); Convention on Nuclear Safety, IAEA",
        isMilestone: true
      },
      {
        year: "1994–1996",
        title: "ITER Design Phase Begins",
        description: "Under IAEA auspices, the International Thermonuclear Experimental Reactor (ITER) moves from concept to detailed engineering design activity. The US, EU, Japan, and Russia form the initial partnership. ITER aims to demonstrate Q ≥ 10 (fusion power output 10× plasma heating input) in a tokamak at burning plasma conditions.",
        citation: "ITER Organization history; IAEA ITER records"
      },
      {
        year: "Sep 10, 1996",
        title: "Comprehensive Test Ban Treaty (CTBT)",
        description: "The CTBT, banning all nuclear test explosions, opens for signature at the UN. 183 states have signed; 170 have ratified. However, it cannot enter into force until all 44 Annex 2 states (possessing nuclear reactors or research reactors) ratify — eight have not, including the US, China, India, Pakistan, and North Korea.",
        citation: "CTBT, CTBTO; UNODA Treaty Collection (1996)",
        isMilestone: true
      },
      {
        year: "Sep 30, 1999",
        title: "Tokaimura Criticality Accident (INES-4)",
        description: "A criticality accident at a uranium fuel processing facility in Tokaimura, Japan, kills two workers and exposes 119 others to elevated radiation. The accident was caused by workers pouring uranium solution into a precipitation tank using buckets — far exceeding the mass limit — to save time. It exposed severe regulatory and procedural failures in Japan's nuclear fuel cycle operations.",
        citation: "IAEA IRS 99-3; Japan NSC Report (2000); INES classification",
        isMilestone: true
      }
    ]
  },
  {
    id: "renaissance",
    title: "Renaissance, Disasters, and the Fusion Breakthrough",
    range: "2000–2024",
    level: "Intermediate",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Rocket, { className: "w-5 h-5" }),
    color: "bg-accent/15 text-accent",
    summary: "Fukushima halts a nuclear renaissance; fusion ignition is achieved; SMRs and climate urgency drive a new era.",
    events: [
      {
        year: "2001–2009",
        title: "License Renewals and Nuclear Renaissance",
        description: "US NRC begins granting 20-year license extensions to existing plants; nearly all US reactors ultimately receive extensions to 60 years. A 'nuclear renaissance' emerges globally: 50+ new reactors ordered worldwide; the US receives the first new combined construction and operating license (COL) applications in 30 years; China begins its massive build-out (targeting 70+ GWe by 2025).",
        citation: "NRC License Renewal; IAEA PRIS; WNA Reactor Database"
      },
      {
        year: "2006",
        title: "ITER Agreement Signed",
        description: "Seven parties — the EU, India, Japan, China, Russia, South Korea, and the US — sign the ITER Agreement, establishing the organization and 35-nation project to build the world's largest tokamak at Cadarache, France. ITER will use 840 tonnes of superconducting magnets and achieve plasma volumes of 840 m³.",
        citation: "ITER Agreement, 2006; ITER Organization",
        isMilestone: true
      },
      {
        year: "Mar 11, 2011",
        title: "Fukushima Daiichi Accident (INES-7)",
        description: "The magnitude 9.0 Tōhoku earthquake and subsequent 14-meter tsunami disable cooling at Fukushima Daiichi (TEPCO), leading to meltdowns in Units 1, 2, and 3 and hydrogen explosions in Units 1, 3, and 4. Approximately 154,000 residents are evacuated; the exclusion zone is still partially enforced. No acute radiation deaths among the public; one worker death attributed to radiation exposure confirmed in 2018.",
        detail: "The Fukushima accident's primary health impact was stress, displacement, and disruption — not radiation. The UN Scientific Committee on Effects of Atomic Radiation (UNSCEAR 2013) found no discernible increase in cancer rates among the general public. Japan shut down all 50 of its operating reactors post-accident; by 2024, 12 have been restarted.",
        citation: "IAEA Fukushima Daiichi Accident Report (2015); UNSCEAR 2013 Report",
        isMilestone: true
      },
      {
        year: "2011–2015",
        title: "German Energiewende and Phase-Outs",
        description: "Germany accelerates its nuclear phase-out (Atomausstieg) following Fukushima, shutting all 8 oldest plants immediately and mandating closure of all remaining 9 by 2022 (extended to April 2023). Belgium and Switzerland also announce phase-outs. These decisions significantly impact European energy security and carbon trajectories.",
        citation: "German Atomic Energy Act (2011 amendment); Bundesministerium für Wirtschaft und Energie"
      },
      {
        year: "2019",
        title: "AP1000 Units Commissioned in China",
        description: "Sanmen 1&2 and Haiyang 1&2 (four AP1000 pressurized water reactors with passive safety systems) complete commissioning in China — the first AP1000s in commercial operation worldwide. The AP1000 uses passive decay heat removal that requires no pumps or operator action for 72 hours during a loss of coolant accident.",
        citation: "IAEA PRIS; Westinghouse AP1000 Design Certification; NRC"
      },
      {
        year: "Aug 2021",
        title: "NIF Achieves Q ≈ 1 (First Time)",
        description: "The National Ignition Facility (NIF) at Lawrence Livermore National Laboratory achieves approximately Q = 0.7–1.0 in a laser-driven inertial confinement fusion experiment — approaching energy breakeven for the first time in fusion history. Laser energy delivered: 1.9 MJ; fusion yield: ~1.3 MJ.",
        citation: "Zylstra et al., Nature 601 (2022); LLNL NIF Press Release (Aug 2021)",
        isMilestone: true
      },
      {
        year: "Dec 5, 2022",
        title: "NIF Achieves Scientific Fusion Ignition",
        description: "NIF achieves scientific fusion ignition: for the first time in history, a fusion experiment produces more energy than the laser energy delivered to the fuel capsule. Input: 2.05 MJ laser energy; output: 3.15 MJ fusion energy (Q_plasma ≈ 1.54). The result is announced globally and hailed as a 70-year milestone.",
        detail: "The NIF experiment uses 192 laser beams converging on a 2 mm hohlraum (cylindrical gold container) to create X-rays that symmetrically compress a deuterium-tritium ice capsule to 100× the density of lead. Note: wall-plug efficiency of the laser system is ~1%, meaning the overall energy gain from electricity input to output is still far below 1.",
        citation: "Hurricane et al., Phys. Rev. Lett. 132 (2024); DOE/NIF press release Dec 13, 2022; Abu-Shawareb et al., Phys. Rev. Lett. 132 (2024)",
        isMilestone: true
      },
      {
        year: "2022",
        title: "Energy Crisis Reverses Phase-Outs",
        description: "Russia's invasion of Ukraine triggers a European energy security crisis; natural gas prices spike 10×. Belgium reverses its nuclear phase-out decision, extending two Doel reactors by 10 years. The European Parliament and European Commission include nuclear in the EU taxonomy for sustainable finance. The UK announces plans for up to 8 new reactors.",
        citation: "EU Taxonomy Delegated Act (2022); UK Energy Security Strategy (2022); Belgian government press release",
        isMilestone: true
      },
      {
        year: "Jul 2023",
        title: "Vogtle-3: First New US Commercial Reactor in 30 Years",
        description: "Vogtle Unit 3 (AP1000, 1,117 MWe, Georgia Power/Southern Company) achieves commercial operation — the first new US commercial nuclear reactor to come online since Watts Bar Unit 2 in 2016 and the first new US nuclear construction start to reach completion since the 1970s. Vogtle-4 followed in 2024. Combined cost exceeded $35 billion; originally estimated at ~$14 billion.",
        citation: "NRC; Southern Company; Georgia Power earnings releases",
        isMilestone: true
      },
      {
        year: "2022–2024",
        title: "SMR Licensing and Advanced Reactor Development",
        description: "NuScale's 77 MWe SMR (small modular reactor) becomes the first SMR to receive NRC Design Certification approval (Standard Design Approval, 2022). GE-Hitachi's BWRX-300 progresses through licensing in Canada and the US. Kairos Power, X-energy (HTGR), and TerraPower (sodium fast reactor) receive DOE funding. The SMR landscape includes 80+ designs globally.",
        detail: "SMRs aim to reduce nuclear capital costs through factory manufacture, modular construction, and passive safety. However, NuScale's first commercial project (UAMPS, Idaho) was cancelled in 2023 due to rising cost estimates — demonstrating that economic viability remains the central challenge.",
        citation: "NRC; IAEA SMR Technology Assessment (2023); DOE Advanced Reactor Demonstration Program",
        isMilestone: true
      }
    ]
  }
];
function Timeline() {
  const milestoneCount = ERAS.reduce(
    (sum, era) => sum + era.events.filter((e) => e.isMilestone).length,
    0
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            variant: "outline",
            className: "text-xs font-mono bg-primary/10 text-primary border-primary/30",
            children: "1896 – 2024"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Badge,
          {
            variant: "outline",
            className: "text-xs text-muted-foreground border-border",
            children: [
              ERAS.length,
              " Eras"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Badge,
          {
            variant: "outline",
            className: "text-xs text-muted-foreground border-border",
            children: [
              milestoneCount,
              " Milestone Events"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-4", children: "130 Years of Nuclear History" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed", children: "A field that began with Henri Becquerel's curiosity about phosphorescent minerals in 1896 became the most transformative — and controversial — scientific development of the 20th century. Nuclear science shaped world history through weapons, power generation, medicine, and our fundamental understanding of matter." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/40 border border-border px-4 py-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "42 years" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
            " ",
            "from radioactivity discovery to fission"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/40 border border-border px-4 py-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "3 years" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
            " ",
            "from first chain reaction to Hiroshima"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/40 border border-border px-4 py-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "70 years" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
            " ",
            "from first fusion attempt to ignition"
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-4",
        "data-ocid": "timeline.list",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-2", children: "Select an era to expand its events. Milestone events are marked with a filled node on the timeline." }),
          ERAS.map((era) => /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleEra, { era }, era.id))
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 pb-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-muted/30 px-5 py-4 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
        "Sources & Citations:",
        " "
      ] }),
      "All events are sourced from peer-reviewed literature, government documents (IAEA, NRC, DOE, UNSCEAR), and authoritative historical accounts. Inline citations are provided for each event. For full reference list, see the",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/references",
          className: "text-primary underline underline-offset-2 hover:text-primary/80 transition-colors",
          children: "References"
        }
      ),
      " ",
      "page. Casualty and yield figures are from official historical records and may differ from some popular sources."
    ] }) })
  ] });
}
export {
  Timeline as default
};
