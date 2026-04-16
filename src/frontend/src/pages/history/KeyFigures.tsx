import { Badge } from "@/components/ui/badge";
import {
  Atom,
  Award,
  BookOpen,
  ChevronDown,
  ChevronRight,
  FlaskConical,
  Globe,
  Microscope,
  Shield,
  Zap,
} from "lucide-react";
import { useState } from "react";

interface Figure {
  id: string;
  name: string;
  years: string;
  nationality: string;
  level: "beginner" | "intermediate" | "advanced";
  tagline: string;
  icon: React.ReactNode;
  accentColor: string;
  overview: string;
  born: string;
  education: string;
  keyContributions: { title: string; detail: string }[];
  publications: { citation: string; note?: string }[];
  awards: string[];
  legacy: string;
  quote?: string;
  quoteSource?: string;
}

const figures: Figure[] = [
  {
    id: "becquerel",
    name: "Henri Becquerel",
    years: "1852–1908",
    nationality: "French",
    level: "beginner",
    tagline: "Discoverer of radioactivity",
    icon: <Atom className="w-5 h-5" />,
    accentColor: "text-yellow-500",
    overview:
      "On a cloudy February day in 1896, Becquerel accidentally left uranium-bearing crystals on a wrapped photographic plate. When he developed the plate days later, he found a dark patch — uranium had exposed the film without any sunlight. That accidental discovery revealed that matter could emit radiation spontaneously, without any external trigger. He had found radioactivity.",
    born: "Paris, France. Son and grandson of distinguished physicists — the Becquerel family occupied the same chair at the Muséum National d'Histoire Naturelle across three generations.",
    education:
      "École Polytechnique (1872) and École des Ponts et Chaussées; appointed professor at the Muséum National d'Histoire Naturelle (1892) and at the École Polytechnique (1895).",
    keyContributions: [
      {
        title: "Discovery of radioactivity (26 February 1896)",
        detail:
          "While investigating whether uranium salts could store and re-emit sunlight as X-rays (discovered by Röntgen weeks earlier), Becquerel placed wrapped photographic plates beneath uranium-potassium sulfate crystals. Cloudy weather meant the planned exposure never happened — but the plates were fogged regardless. Uranium was emitting radiation entirely on its own. He published his finding to the Académie des Sciences in March 1896.",
      },
      {
        title: "Becquerel rays",
        detail:
          "Initially called 'uranic rays' or 'Becquerel rays,' the emitted radiation was later identified as a mixture of beta particles (fast electrons from ²³⁴Pa in the U-238 decay chain) and gamma rays. The SI unit of radioactivity, the becquerel (Bq), is defined as one nuclear disintegration per second.",
      },
      {
        title: "Biological effect",
        detail:
          "In 1901 Becquerel accidentally burned his skin by carrying a radium sample (given by Pierre Curie) in his waistcoat pocket for six hours — the first recorded evidence of radiation-induced skin injury in a person.",
      },
    ],
    publications: [
      {
        citation:
          "Becquerel, H. (1896). Sur les radiations émises par phosphorescence. Comptes Rendus, 122, 420–421.",
        note: "First announcement of the discovery.",
      },
      {
        citation:
          "Becquerel, H. (1896). Sur les radiations invisibles émises par les corps phosphorescents. Comptes Rendus, 122, 501–503.",
      },
    ],
    awards: [
      "Nobel Prize in Physics 1903 (shared with Pierre and Marie Curie)",
      "Rumford Medal, Royal Society (1900)",
      "Helmholtz Medal, Berlin Academy (1901)",
    ],
    legacy:
      "Becquerel's accidental discovery launched the field of nuclear physics and — combined with the Curies' follow-on work — fundamentally overturned the classical view that matter was inert and unchanging. The becquerel (Bq), the SI unit of radioactivity, ensures his name persists in every radiation measurement made worldwide.",
  },
  {
    id: "marie-curie",
    name: "Marie Curie",
    years: "1867–1934",
    nationality: "Polish-French",
    level: "beginner",
    tagline: "Discoverer of polonium & radium; pioneer of radioactivity",
    icon: <FlaskConical className="w-5 h-5" />,
    accentColor: "text-pink-500",
    overview:
      'Born Maria Skłodowska in Warsaw when Poland was under Russian imperial occupation, Curie overcame systematic barriers to become the most decorated scientist of the 20th century. She coined the term "radioactivity," discovered two new elements, and became the only person ever to win Nobel Prizes in two different sciences. She also died of the work she loved — her notebooks remain radioactively contaminated to this day.',
    born: "Warsaw, Poland (then Russian Empire), 7 November 1867. Her father was a physics and mathematics teacher; her mother ran a boarding school. Both parents were Polish nationalists who raised their children with fierce intellectual pride.",
    education:
      "Educated secretly in Warsaw's underground 'Flying University' (Polish underground education movement, illegal under Russian rule). Moved to Paris in 1891 to study at the Sorbonne. Earned degrees in physics (1893, top of her class) and mathematics (1894). First woman to earn a PhD in physics in France (1903). First female professor at the Sorbonne (1906).",
    keyContributions: [
      {
        title: "Coining of 'radioactivity' (1898)",
        detail:
          "Curie introduced the term 'radioactivity' (from Latin radius, ray) to describe the property of spontaneous radiation emission she observed in uranium and thorium. This conceptual framing — radioactivity as an atomic property, not a chemical reaction — was her key theoretical insight and directed all subsequent research.",
      },
      {
        title: "Discovery of polonium (July 1898)",
        detail:
          "By systematically measuring the electrical conductivity of air near different uranium ores (using an electrometer designed by Pierre), Curie found that pitchblende was four times more radioactive than could be explained by its uranium content alone. This implied an unknown, more intensely radioactive element. After months of processing tonnes of pitchblende residue, she and Pierre isolated a new element, which she named polonium (Po, Z=84) after her occupied homeland.",
      },
      {
        title: "Discovery of radium (December 1898)",
        detail:
          "Analysis of the remaining pitchblende fractions revealed a second unknown element, radium (Ra, Z=88), 900 times more radioactive than uranium per unit mass. The Curies processed roughly 10 tonnes of pitchblende ore in a leaky shed to isolate ~100 mg of radium chloride by 1902. The isolation of pure radium metal was completed in 1910.",
      },
      {
        title: "World War I — Les petites Curies (1914–1918)",
        detail:
          "Curie recognized that X-ray imaging could save lives by locating bullets and shrapnel without surgery. She designed 20 mobile radiography units mounted in vehicles — quickly dubbed 'petites Curies' by soldiers. She drove them herself to field hospitals and personally trained approximately 150 women as X-ray operators. An estimated 1 million men were examined using these units during the war.",
      },
      {
        title: "Establishment of the Radium Institute (1914)",
        detail:
          "Curie founded the Institut du Radium in Paris (now the Institut Curie), still one of the world's leading cancer research and treatment centers, and a sister institute in Warsaw (1932).",
      },
    ],
    publications: [
      {
        citation:
          "Curie, P., & Curie, M. (1898). Sur une substance nouvelle radio-active, contenue dans la pechblende. Comptes Rendus, 127, 175–178.",
        note: "Announcement of polonium.",
      },
      {
        citation:
          "Curie, P., Curie, M., & Bémont, G. (1898). Sur une nouvelle substance fortement radio-active, contenue dans la pechblende. Comptes Rendus, 127, 1215–1217.",
        note: "Announcement of radium.",
      },
      {
        citation:
          "Curie, M. (1903). Recherches sur les substances radioactives. PhD Thesis, University of Paris.",
        note: "Considered the most significant PhD thesis in the history of science.",
      },
    ],
    awards: [
      "Nobel Prize in Physics 1903 (shared with Pierre Curie and Henri Becquerel)",
      "Nobel Prize in Chemistry 1911 (sole winner)",
      "Davy Medal, Royal Society (1903, with Pierre)",
      "Matteucci Medal (1904)",
      "Elliott Cresson Medal (1909)",
    ],
    legacy:
      "Curie's legacy is multidimensional: as a scientist (two Nobel Prizes in two disciplines), as a symbol of persistence against institutional sexism and political oppression, and as a public health pioneer through her wartime radiography work. Her personal notebooks and even her cookbook are still radioactive (they emit ~10× background radiation) and are stored in lead-lined boxes at the Bibliothèque nationale de France — visitors must sign a waiver to view them. Curium (Cm, Z=96) is named after Pierre and Marie jointly.",
    quote:
      "Nothing in life is to be feared, it is only to be understood. Now is the time to understand more, so that we may fear less.",
    quoteSource: "Marie Curie",
  },
  {
    id: "rutherford",
    name: "Ernest Rutherford",
    years: "1871–1937",
    nationality: "New Zealander / British",
    level: "intermediate",
    tagline: "Father of nuclear physics",
    icon: <Atom className="w-5 h-5" />,
    accentColor: "text-blue-500",
    overview:
      "A farm boy from New Zealand who won a scholarship to Cambridge, Rutherford dismantled the Victorian atom and rebuilt it as a miniature solar system. His alpha-scattering experiment in 1909 revealed the nuclear model of the atom. His 1919 bombardment of nitrogen produced the first artificial nuclear transmutation. He predicted the neutron in 1920. Every neutron detected in every nuclear reactor today fulfills a prophecy he made at his Nobel lecture.",
    born: "Spring Grove (now Brightwater), Nelson, New Zealand, 30 August 1871. Fourth of 12 children of a flax-farmer and a schoolteacher. Won a scholarship to Nelson Collegiate School, then a Senior Scholarship to Canterbury College, Christchurch. Won the 1851 Exhibition Science Scholarship that funded his move to Cambridge in 1895.",
    education:
      "Canterbury College, University of New Zealand (BA, MA, BSc). Cavendish Laboratory, Cambridge, under J.J. Thomson (PhD equivalent, 1898). Professor at McGill University, Montreal (1898–1907). Professor at University of Manchester (1907–1919). Director, Cavendish Laboratory, Cambridge (1919–1937). Created Baron Rutherford of Nelson (1931).",
    keyContributions: [
      {
        title: "Classification of alpha and beta radiation (1899)",
        detail:
          "Working at the Cavendish Laboratory, Rutherford used magnetic and electric fields to show that Becquerel's 'uranic rays' were actually two distinct components: 'alpha rays' (stopped by a thin sheet of paper or a few centimetres of air; later shown to be ⁴He nuclei) and 'beta rays' (more penetrating; later identified as fast electrons). Gamma radiation was named and identified as electromagnetic radiation by Paul Villard in 1900.",
      },
      {
        title: "Radioactive half-life (1900)",
        detail:
          "Rutherford discovered that the rate of radioactive decay follows an exponential law and introduced the concept of half-life (T½) — the time after which half of any given quantity of a radionuclide has decayed. This was the first quantitative law of nuclear decay:\nN(t) = N₀ · e^(−λt),  where λ = ln2 / T½.",
      },
      {
        title: "Transmutation theory (1902, with Soddy)",
        detail:
          "Rutherford and Frederick Soddy showed that radioactive decay involved the actual transformation of one element into another — directly contradicting the fundamental chemical belief in the immutability of elements. Their paper 'The Cause and Nature of Radioactivity' won Rutherford the 1908 Nobel Prize.",
      },
      {
        title: "Gold foil (Geiger–Marsden) experiment (1909–1911)",
        detail:
          "Rutherford directed Hans Geiger and Ernest Marsden to fire alpha particles at gold foil, expecting only small deflections. Instead, about 1 in 8,000 alpha particles bounced almost directly back. Rutherford said it was 'as if you fired a 15-inch shell at tissue paper and it came back and hit you.' This could only be explained if almost all the atom's mass was concentrated in a tiny, dense, positively charged nucleus (~10⁻¹⁵ m diameter), with electrons orbiting at relatively enormous distances (~10⁻¹⁰ m). He published the nuclear model of the atom in 1911.",
      },
      {
        title: "First artificial nuclear transmutation (1919)",
        detail:
          "Rutherford bombarded nitrogen gas with alpha particles from radium and observed the emission of protons and the production of oxygen-17:\n⁴He + ¹⁴N → ¹⁷O + ¹H\nThis was the first time a nuclear reaction had been deliberately induced — the first artificial transmutation in history, fulfilling the alchemists' dream by scientific means.",
      },
      {
        title: "Prediction of the neutron (1920)",
        detail:
          "In his 1920 Bakerian Lecture to the Royal Society, Rutherford proposed the existence of a neutral particle with approximately the mass of a proton — the neutron. He reasoned that atomic masses exceed proton counts (e.g., helium has 2 protons but mass ≈ 4) and suggested neutral proton-electron combinations might exist in the nucleus. James Chadwick (his student) confirmed the neutron experimentally in 1932.",
      },
    ],
    publications: [
      {
        citation:
          "Rutherford, E. (1899). Uranium radiation and the electrical conduction produced by it. Philosophical Magazine, 47, 109–163.",
        note: "Identifies alpha and beta radiation.",
      },
      {
        citation:
          "Rutherford, E., & Soddy, F. (1902). The Cause and Nature of Radioactivity. Philosophical Magazine, 4(21), 370–396.",
      },
      {
        citation:
          "Rutherford, E. (1911). The scattering of α and β particles by matter and the structure of the atom. Philosophical Magazine, 21(125), 669–688.",
        note: "Nuclear model of the atom.",
      },
      {
        citation:
          "Rutherford, E. (1919). Collision of α particles with light atoms. IV. An anomalous effect in nitrogen. Philosophical Magazine, 37, 581–587.",
      },
    ],
    awards: [
      "Nobel Prize in Chemistry 1908",
      "Rumford Medal, Royal Society (1905)",
      "Knighted (1914)",
      "Order of Merit (1925)",
      "Created Baron Rutherford of Nelson (1931)",
    ],
    legacy:
      "Rutherford's laboratory produced more Nobel laureates than almost any other in history — Geiger, Chadwick, Bohr, Hahn, and many others trained under him. Rutherfordium (Rf, Z=104) is named in his honor. His nuclear model remains the foundation of all modern nuclear physics and chemistry.",
    quote: "All science is either physics or stamp collecting.",
    quoteSource: "Ernest Rutherford",
  },
  {
    id: "bohr",
    name: "Niels Bohr",
    years: "1885–1962",
    nationality: "Danish",
    level: "intermediate",
    tagline: "Founder of quantum atomic theory; fission theorist",
    icon: <Atom className="w-5 h-5" />,
    accentColor: "text-cyan-500",
    overview:
      "Bohr arrived in Cambridge in 1911 and left with a new model of the atom. His quantum theory of atomic structure, which correctly predicted the hydrogen spectrum, set the agenda for quantum mechanics for the next 20 years. He also provided the theoretical explanation of nuclear fission in 1939 — correctly identifying U-235, not U-238, as the isotope responsible for thermal neutron fission. He spent the last years of his life campaigning for the international control of nuclear weapons.",
    born: "Copenhagen, Denmark, 7 October 1885. His father Christian Bohr was a professor of physiology; his mother Ellen Adler came from a prominent Jewish banking family. His brother Harald became an equally distinguished mathematician.",
    education:
      "University of Copenhagen (MSc and PhD in physics, 1911). Studied under J.J. Thomson at the Cavendish Laboratory, Cambridge, then under Rutherford at Manchester (1912). Founded the Institute for Theoretical Physics (later the Niels Bohr Institute) in Copenhagen in 1920, which became the intellectual center of quantum mechanics throughout the 1920s.",
    keyContributions: [
      {
        title: "Bohr model of the hydrogen atom (1913)",
        detail:
          "Bohr postulated that electrons occupy discrete quantized orbits around the nucleus, and that radiation is emitted or absorbed only when electrons transition between orbits. The energy of a photon emitted in a transition from orbit n₂ to n₁ is given by:\nE = hcR_∞(1/n₁² − 1/n₂²)\nwhere R_∞ is the Rydberg constant. This model correctly reproduced the entire hydrogen emission spectrum (Lyman, Balmer, Paschen series) from first principles — a breakthrough that could not be explained by classical physics.",
      },
      {
        title: "Copenhagen Interpretation of quantum mechanics (1927)",
        detail:
          "Working with Werner Heisenberg at the Copenhagen institute (1926–1927), Bohr formulated the epistemological interpretation of quantum mechanics: wavefunctions represent probability amplitudes, and measurement causes wavefunction collapse. His concept of complementarity — that particles and waves are mutually exclusive descriptions of the same object — remains the dominant interpretation of quantum mechanics taught worldwide.",
      },
      {
        title: "Theory of compound nucleus (1936)",
        detail:
          "Bohr proposed that when a neutron is captured by a nucleus, the energy is rapidly shared among all nucleons, forming a 'compound nucleus' in an excited state that decays independently of how it was formed. This model successfully explains nuclear reactions at low to intermediate energies.",
      },
      {
        title: "Theory of nuclear fission (1939, with Wheeler)",
        detail:
          "After hearing from Otto Frisch (Lise Meitner's nephew) about the Hahn–Strassmann barium result, Bohr travelled to the US in January 1939 and immediately recognized the theoretical significance. With John Wheeler at Princeton, he published the liquid drop model of fission, deriving the fission barrier height as a function of the fissility parameter Z²/A. Crucially, Bohr correctly predicted that U-235 (not the far more abundant U-238) was responsible for slow-neutron fission, because U-235 has an odd neutron number and lower fission barrier: E_f(²³⁵U) ≈ 6.5 MeV vs binding energy of captured neutron ≈ 6.8 MeV → fission spontaneous; E_f(²³⁸U) ≈ 6.5 MeV vs ≈ 4.8 MeV → threshold ~1 MeV needed.",
      },
      {
        title: "Escape from occupied Denmark and Manhattan Project (1943)",
        detail:
          "After German occupation of Denmark, Bohr was warned his arrest was imminent. In September 1943 he escaped by fishing boat to neutral Sweden; from there, the RAF flew him to Scotland in the unpressurised bomb bay of a de Havilland Mosquito. His head was too large for the standard oxygen helmet; he lost consciousness from hypoxia during the flight but survived. He joined the Manhattan Project under the alias 'Nicholas Baker,' contributing theoretical guidance at Los Alamos.",
      },
    ],
    publications: [
      {
        citation:
          "Bohr, N. (1913). On the constitution of atoms and molecules. Philosophical Magazine, 26(151), 1–25.",
        note: "The Bohr model.",
      },
      {
        citation:
          "Bohr, N., & Wheeler, J.A. (1939). The mechanism of nuclear fission. Physical Review, 56(5), 426–450.",
        note: "Liquid drop model of fission; identifies U-235 as the fissile isotope.",
      },
      {
        citation:
          "Bohr, N. (1950). Open Letter to the United Nations. Copenhagen.",
        note: "Plea for international openness and control of nuclear weapons.",
      },
    ],
    awards: [
      "Nobel Prize in Physics 1922",
      "Hughes Medal, Royal Society (1921)",
      "Franklin Medal (1926)",
      "Copley Medal, Royal Society (1938)",
      "Atoms for Peace Award (1957)",
    ],
    legacy:
      "The Niels Bohr Institute in Copenhagen remains one of the world's premier theoretical physics institutions. Bohrium (Bh, Z=107) is named in his honor. His framework for thinking about the relationship between observation and physical reality has influenced philosophy of science as much as physics itself.",
    quote:
      "An expert is a person who has made all the mistakes that can be made in a very narrow field.",
    quoteSource: "Niels Bohr",
  },
  {
    id: "meitner",
    name: "Lise Meitner",
    years: "1878–1968",
    nationality: "Austrian-Swedish",
    level: "intermediate",
    tagline: "Mother of nuclear fission",
    icon: <Microscope className="w-5 h-5" />,
    accentColor: "text-violet-500",
    overview:
      "Lise Meitner spent 30 years as Otto Hahn's scientific partner in Berlin, making fundamental contributions to radioactive decay chains, beta spectra, and nuclear isomers. Forced to flee Nazi Germany in 1938, she was in Swedish exile when Hahn wrote to tell her he had found barium in a uranium bombardment experiment. Over Christmas, she and her nephew Otto Frisch worked out the explanation — a nucleus splitting in two, releasing ~200 MeV. They named the process 'nuclear fission.' Meitner was unjustly excluded from the 1944 Nobel Prize that went to Hahn alone.",
    born: "Vienna, Austria, 7 November 1878. One of eight children of a Jewish lawyer father and musically gifted mother. Schooling was unavailable to Austrian girls beyond age 14 — she was privately tutored and passed the Matura (university entrance exam) in 1901, one of the first women to do so in Austria.",
    education:
      "University of Vienna (PhD in physics, 1906 — only the second woman to earn a physics PhD there). Studied under Ludwig Boltzmann. Moved to Berlin in 1907 to study under Max Planck; collaborated with Hahn for three decades at the Kaiser Wilhelm Institute for Chemistry. Professor of physics, University of Berlin (1926) — the first female physics professor at a German university.",
    keyContributions: [
      {
        title: "Co-discovery of protactinium-231 (1918, with Hahn)",
        detail:
          "Meitner and Hahn identified protactinium (Pa, Z=91) as the long-lived parent of actinium in the actinium decay series, completing the understanding of the three natural radioactive series (U-238, U-235/actinium, and Th-232).",
      },
      {
        title:
          "Beta decay spectra — establishing the neutrino problem (1922–1927)",
        detail:
          "Meitner showed through painstaking measurements that beta decay produces a continuous energy spectrum, not discrete lines. This was in apparent contradiction with energy conservation — a paradox resolved only by Pauli's 1930 neutrino hypothesis. Her precise measurements were essential data that forced the community to take the problem seriously.",
      },
      {
        title: "Discovery of nuclear isomerism (1936)",
        detail:
          "Meitner discovered that an atomic nucleus can exist in a metastable excited state (same Z and A as the ground state, but with different spin or energy) — nuclear isomerism. This is the basis for modern nuclear medicine: ⁹⁹ᵐTc, the most widely used medical imaging radioisotope, is a nuclear isomer.",
      },
      {
        title:
          "Theoretical explanation of nuclear fission (December 1938 – February 1939)",
        detail:
          "After receiving Hahn's letter describing inexplicable barium (Z=56) from uranium (Z=92) bombardment, Meitner and her nephew Otto Frisch (a physicist working in Copenhagen) met over Christmas 1938 in Kungälv, Sweden. Using the liquid drop model and Einstein's mass-energy equivalence, Meitner calculated that when a uranium nucleus elongates and splits, the electrostatic repulsion overcomes the surface tension energy. The mass deficit:\nΔm = M(²³⁵U) + m_n − M(⁹⁶Kr) − M(¹³⁷Ba)\napproximately 0.2 u, giving Q ≈ 0.2 × 931.5 MeV ≈ 186 MeV — about 200 MeV in practice. She confirmed this was energetically plausible and physically consistent. Frisch coined the term 'fission' by analogy with biological cell division.",
      },
      {
        title: "Publication and the discovery's impact (1939)",
        detail:
          'Meitner and Frisch published their explanation in Nature on 11 February 1939: "Disintegration of Uranium by Neutrons: A New Type of Nuclear Reaction." Within weeks, physicists worldwide were reproducing the result. Bohr, hearing the news, called it "the most important discovery of the century."',
      },
    ],
    publications: [
      {
        citation:
          "Meitner, L., & Frisch, O.R. (1939). Disintegration of uranium by neutrons: a new type of nuclear reaction. Nature, 143, 239–240.",
        note: "The fission paper.",
      },
      {
        citation:
          "Hahn, O., & Meitner, L. (1918). Die Muttersubstanz des Actiniums, ein neues radioaktives Element von langer Lebensdauer. Physikalische Zeitschrift, 19, 208.",
        note: "Discovery of protactinium.",
      },
    ],
    awards: [
      "Enrico Fermi Award (1966, US AEC — shared with Hahn and Strassmann)",
      "Otto Hahn Prize (1955)",
      "Wilhelm Exner Medal (1960)",
      "Austrian Decoration for Science and Art (1967)",
      "Nominated for Nobel Prize 48 times — never awarded",
    ],
    legacy:
      "Meitnerium (Mt, Z=109) is named in her honor — one of the few elements named exclusively after a woman. Albert Einstein called her 'the German Marie Curie.' Her exclusion from the 1944 Nobel Prize is widely regarded as one of the greatest injustices in the history of science. The Swedish Physical Society named their highest award the Lise Meitner Medal. She refused to join the Manhattan Project, stating: 'I will have nothing to do with a bomb.'",
    quote: "I will have nothing to do with a bomb.",
    quoteSource: "Lise Meitner (on the Manhattan Project)",
  },
  {
    id: "fermi",
    name: "Enrico Fermi",
    years: "1901–1954",
    nationality: "Italian-American",
    level: "intermediate",
    tagline: "Architect of the nuclear age; builder of CP-1",
    icon: <Zap className="w-5 h-5" />,
    accentColor: "text-orange-500",
    overview:
      "Fermi was arguably the last physicist equally at home in theory and experiment. He built the statistical framework for quantum particles, worked out the theory of beta decay, discovered that slow neutrons dramatically increase reaction rates, and then — in a squash court beneath a Chicago football stadium — directed the world's first self-sustaining nuclear chain reaction. His chain reaction telegram remains one of the most cryptic dispatches in scientific history.",
    born: "Rome, Italy, 29 September 1901. The youngest of three children of a railroad inspector. Largely self-taught in advanced mathematics and physics by reading 19th-century texts found at a local market.",
    education:
      "Scuola Normale Superiore, Pisa (PhD in physics, 1922, age 20). Studied under Paul Ehrenfest in Leiden and under Max Born in Göttingen (1923). Professor of theoretical physics, University of Rome (1927–1938) — the youngest person to hold such a chair in Italy. Accepted Nobel Prize in Stockholm (December 1938); emigrated directly to the United States with his Jewish wife Laura, never returning to Fascist Italy.",
    keyContributions: [
      {
        title: "Fermi–Dirac statistics (1926)",
        detail:
          "Fermi (and independently Dirac) derived the quantum statistics governing identical half-integer spin particles (fermions). The Fermi–Dirac distribution function:\nf(E) = 1 / [exp((E − μ)/k_BT) + 1]\ndescribes the occupation probability of quantum states and underlies the physics of electrons in metals, white dwarf stars, and nuclear matter. The Fermi level (μ at T=0) determines electrical conductivity, thermoelectric properties, and the behavior of degenerate matter.",
      },
      {
        title: "Theory of beta decay (1934)",
        detail:
          "Fermi developed the first complete theory of beta decay, treating the weak nuclear force as a contact interaction between four fermions (the 'four-fermion' or 'Fermi contact interaction'). His theory correctly predicted the shape of the electron energy spectrum and introduced the concept of the 'Fermi coupling constant' G_F ≈ 1.166 × 10⁻⁵ GeV⁻². Though superseded by electroweak theory, the Fermi interaction remains a valid low-energy approximation.",
      },
      {
        title: "Slow neutron effect (1934)",
        detail:
          "In Rome, Fermi's group systematically bombarded all elements with neutrons. An accidental observation — that reaction rates were 100× higher on a wooden lab bench than on marble — led Fermi to insert a paraffin block between source and target. Hydrogen in paraffin moderated (slowed) neutrons to thermal energies (~0.025 eV), and slow neutrons have dramatically larger capture cross-sections. This discovery (thermal neutron moderation) is the physical principle underlying every light-water reactor. Fermi received the 1938 Nobel Prize for this work.",
      },
      {
        title:
          "Chicago Pile-1 (CP-1): first self-sustaining chain reaction (2 December 1942)",
        detail:
          "Under the codename 'Metallurgical Laboratory,' Fermi designed and oversaw construction of CP-1 beneath the west stands of Stagg Field at the University of Chicago. The pile comprised 57 layers alternating graphite blocks (49,000 blocks, ~385 tonnes) and uranium metal/oxide slugs (~5.5 tonnes of uranium metal + ~40 tonnes of uranium oxide), moderated by graphite and controlled by cadmium strips. On the afternoon of December 2, Fermi withdrew control rods incrementally, measuring neutron flux with ionization chambers. At 3:25 PM, with k_eff > 1, the pile went self-sustaining. Fermi allowed it to run for 28 minutes at 200 W before reinserting the rods. The coded telegram sent to Washington: 'The Italian navigator has just landed in the new world.'",
      },
      {
        title: "Fermi paradox and contributions to Big Science",
        detail:
          "Fermi made foundational contributions at Los Alamos (implosion diagnostics, Trinity test analysis). In 1950 he posed the 'Fermi Paradox': given the age and size of the galaxy, intelligent life should be detectable — where is everybody? This question continues to drive astrobiology and SETI research.",
      },
    ],
    publications: [
      {
        citation:
          "Fermi, E. (1926). Sulla quantizzazione del gas perfetto monoatomico. Rendiconti Lincei, 3, 145–149.",
        note: "Fermi–Dirac statistics.",
      },
      {
        citation:
          "Fermi, E. (1934). Versuch einer Theorie der β-Strahlen. Zeitschrift für Physik, 88, 161–177.",
        note: "Theory of beta decay (submitted to Nature — rejected as 'too speculative').",
      },
      {
        citation:
          "Fermi, E. et al. (1934). Radioactività provocata da bombardamento di neutroni. La Ricerca Scientifica, 5, 283.",
      },
      {
        citation:
          "Fermi, E. (1947). Nuclear Physics: A Course Given by Enrico Fermi at the University of Chicago. University of Chicago Press.",
        note: "Compiled lecture notes; still used as a graduate text.",
      },
    ],
    awards: [
      "Nobel Prize in Physics 1938",
      "Congressional Medal of Merit (1946)",
      "Franklin Medal (1947)",
      "Rumford Premium (1953)",
      "First Enrico Fermi Award (1954, posthumously by AEC)",
    ],
    legacy:
      "The Fermi unit (1 fm = 10⁻¹⁵ m, the typical size of a nucleus), Fermi level, Fermi surface, Fermi gas model, Fermilab (the US national particle accelerator laboratory), and element Fermium (Fm, Z=100) are all named in his honor. Fermi died at 53 of stomach cancer — almost certainly radiation-related from his years of neutron work without adequate protection.",
    quote:
      "Whatever Nature has in store for mankind, unpleasant as it may be, men must accept, for ignorance is never better than knowledge.",
    quoteSource: "Enrico Fermi",
  },
  {
    id: "oppenheimer",
    name: "J. Robert Oppenheimer",
    years: "1904–1967",
    nationality: "American",
    level: "intermediate",
    tagline: "Director, Los Alamos; father of the atomic bomb",
    icon: <Shield className="w-5 h-5" />,
    accentColor: "text-red-500",
    overview:
      "Oppenheimer was one of the 20th century's most gifted theoretical physicists — a man who read Sanskrit in his spare time and contributed to quantum field theory before he was 30. Between 1943 and 1945 he directed the scientific effort that built the atomic bomb, managing 6,000 scientists and engineers at Los Alamos. He then spent the rest of his life grappling with the consequences, campaigning against the hydrogen bomb, and watching his security clearance revoked by McCarthyite paranoia. Officially rehabilitated — posthumously — by the US government in 2022.",
    born: "New York City, 22 April 1904. Son of a German-Jewish immigrant textile importer and a painter mother. Grew up in Manhattan; childhood interests included mineralogy, Greek, Latin, and Sanskrit.",
    education:
      "Harvard College (summa cum laude, chemistry, 1925 — completed in three years). University of Göttingen (PhD in physics under Max Born, 1927, age 22). Postdoctoral work with Paul Ehrenfest in Leiden and with Pauli in Zürich. Professor at UC Berkeley and Caltech (1929–1943). Director, Los Alamos Laboratory (1943–1945). Director, Institute for Advanced Study, Princeton (1947–1966).",
    keyContributions: [
      {
        title:
          "Contributions to quantum mechanics and quantum field theory (1927–1942)",
        detail:
          "Oppenheimer made significant contributions to Born-Oppenheimer approximation (separating nuclear and electron motion in molecular systems, fundamental to quantum chemistry), quantum tunnelling, the theory of cosmic ray showers, neutron star structure (Oppenheimer-Volkoff limit: maximum mass of a neutron star ~0.7 M_sun in GR, now known to be ~2–3 M_sun), and early work on gravitational collapse (with Snyder, 1939 — predicting what we now call black holes).",
      },
      {
        title: "Direction of the Manhattan Project, Los Alamos (1943–1945)",
        detail:
          "General Leslie Groves appointed Oppenheimer scientific director of Los Alamos despite (or because of) his previous left-wing political associations. Oppenheimer proved an extraordinary leader — he had the intellectual range to converse expertly with specialists across all disciplines, the diplomatic skill to manage competitive prima donnas, and the moral seriousness the project demanded. Under his direction, two weapon designs (gun-type U-235 and implosion Pu-239) were developed, tested, and deployed within 27 months.",
      },
      {
        title: "Trinity test, Jornada del Muerto, New Mexico (16 July 1945)",
        detail:
          'The first test of an implosion nuclear device (the "Gadget," a plutonium implosion design identical to the later Fat Man bomb) detonated at 5:29:45 AM local time. Yield: 21 kilotons of TNT equivalent. Oppenheimer, watching from the control bunker, later recalled a passage from the Bhagavad Gita: "Now I am become Death, the destroyer of worlds." The fireball reached 8 km altitude; the pressure wave shattered windows 160 km away.',
      },
      {
        title:
          "Post-war policy work and the hydrogen bomb controversy (1945–1954)",
        detail:
          "As chairman of the AEC General Advisory Committee (1947–1952), Oppenheimer argued against the development of the hydrogen (thermonuclear) bomb on both ethical and strategic grounds. His opposition, combined with allegations of Communist sympathies, led to a security hearing before the AEC Personnel Security Board in 1954. Despite no finding of disloyalty, his security clearance was revoked 'by a single vote' — effectively ending his government advisory role. The hearing is widely viewed as a politically motivated travesty.",
      },
    ],
    publications: [
      {
        citation:
          "Born, M., & Oppenheimer, J.R. (1927). Zur Quantentheorie der Molekeln. Annalen der Physik, 389(20), 457–484.",
        note: "Born-Oppenheimer approximation.",
      },
      {
        citation:
          "Oppenheimer, J.R., & Volkoff, G.M. (1939). On Massive Neutron Cores. Physical Review, 55(4), 374–381.",
        note: "Oppenheimer-Volkoff limit for neutron stars.",
      },
      {
        citation:
          "Oppenheimer, J.R., & Snyder, H. (1939). On Continued Gravitational Contraction. Physical Review, 56(5), 455–459.",
        note: "First rigorous prediction of black hole formation.",
      },
    ],
    awards: [
      "Enrico Fermi Award (1963, from President Kennedy; presented by President Johnson)",
      "Max Planck Medal (1962)",
      "Security clearance revoked (1954); officially restored (2022, posthumously, US DOE)",
    ],
    legacy:
      "Oppenheimer set the template for Big Science: large interdisciplinary teams working under unified scientific leadership to solve problems once thought impossible. Los Alamos and all subsequent national laboratories follow the model he established. His personal tragedy — the man who built the bomb spending his life warning against its use — remains one of the defining moral narratives of the nuclear age.",
    quote: "Now I am become Death, the destroyer of worlds.",
    quoteSource:
      "J. Robert Oppenheimer (after Trinity test, recalling Bhagavad Gita, XI.32)",
  },
  {
    id: "seaborg",
    name: "Glenn Seaborg",
    years: "1912–1999",
    nationality: "American",
    level: "intermediate",
    tagline: "Discoverer of plutonium and 9 other transuranium elements",
    icon: <FlaskConical className="w-5 h-5" />,
    accentColor: "text-emerald-500",
    overview:
      "Glenn Seaborg discovered or co-discovered more elements than any other person in history — 10 in all, from plutonium (Z=94) through nobelium (Z=102). His actinide concept reorganized the periodic table by correctly placing the heaviest elements in their own series. He then helped shape US nuclear policy for three decades as chairman of the Atomic Energy Commission. He is the only living person to have had an element named after him — seaborgium (Z=106).",
    born: "Ishpeming, Michigan, 19 April 1912. Son of Swedish immigrants. Grew up in Home Gardens, California; first in his family to attend college. Entered UCLA, transferred to UC Berkeley.",
    education:
      "UC Berkeley (AB in chemistry, 1934; PhD in nuclear chemistry under Gilbert Lewis, 1937). Instructor, then Associate Professor at UC Berkeley. Worked under Arthur Compton at the Metallurgical Laboratory, Chicago (1942–1946). Chancellor, UC Berkeley (1958–1961). Chairman, US Atomic Energy Commission (1961–1971).",
    keyContributions: [
      {
        title: "Discovery of plutonium (December 1940 – February 1941)",
        detail:
          "Working with Edwin McMillan, Joseph Kennedy, and Arthur Wahl at the 60-inch cyclotron at UC Berkeley, Seaborg's team bombarded uranium-238 with deuterons, producing neptunium-238 (²³⁸Np), which beta-decayed to plutonium-238 (²³⁸Pu). They subsequently produced and identified plutonium-239 (²³⁹Pu) via neutron capture on U-238:\n²³⁸U + n → ²³⁹U → ²³⁹Np + β⁻ → ²³⁹Pu + β⁻\nThey then confirmed that ²³⁹Pu was fissile — that it could sustain a chain reaction with thermal neutrons — making it a weapon-grade material and critical to the Manhattan Project.",
      },
      {
        title: "Actinide concept and periodic table reorganization (1944)",
        detail:
          "Before Seaborg's insight, chemists placed the heaviest known elements (Ac through U) in the d-block transition metals of the periodic table. Seaborg recognized that the elements from actinium (Z=89) through lawrencium (Z=103) actually constituted an f-block series analogous to the lanthanides — the actinide series. This was initially met with skepticism but proved entirely correct; it is now the accepted configuration of the periodic table.",
      },
      {
        title:
          "Co-discovery of americium (Am, Z=95) and curium (Cm, Z=96) (1944)",
        detail:
          "Seaborg's group produced americium by bombarding plutonium-239 with neutrons (neutron capture followed by beta decay) and curium by bombarding plutonium-239 with helium-4 ions. Both were discovered secretly as part of the Manhattan Project and not announced until 1945 — famously first revealed by Seaborg on a children's radio show ('Quiz Kids') before the formal scientific announcement.",
      },
      {
        title: "Further transuranium discoveries (1949–1958)",
        detail:
          "Seaborg's group at Berkeley subsequently co-discovered: berkelium (Bk, Z=97, 1949), californium (Cf, Z=98, 1950), einsteinium (Es, Z=99, 1952 — found in fallout from the first thermonuclear test, Ivy Mike), fermium (Fm, Z=100, 1952 — also in Ivy Mike fallout), mendelevium (Md, Z=101, 1955), nobelium (No, Z=102, 1958).",
      },
      {
        title:
          "AEC chairmanship and Partial Nuclear Test Ban Treaty (1961–1971)",
        detail:
          "As Chairman of the Atomic Energy Commission under Presidents Kennedy and Johnson, Seaborg pushed for the Partial Nuclear Test Ban Treaty (PTBT), signed in Moscow on 5 August 1963. The treaty banned nuclear tests in the atmosphere, underwater, and in outer space (underground tests continued). Seaborg personally signed the treaty on behalf of the United States in the Treaty Room of the White House.",
      },
    ],
    publications: [
      {
        citation:
          "McMillan, E., & Seaborg, G.T. (1951). Nobel Prize in Chemistry Lecture: The Transuranium Elements. Nobel Foundation, Stockholm.",
      },
      {
        citation:
          "Seaborg, G.T. (1963). Man-Made Transuranium Elements. Prentice-Hall.",
      },
      {
        citation:
          "Seaborg, G.T., & Loveland, W.D. (1990). The Elements Beyond Uranium. Wiley.",
      },
    ],
    awards: [
      "Nobel Prize in Chemistry 1951 (shared with Edwin McMillan)",
      "Fermi Award (1959)",
      "National Medal of Science (1991)",
      "Priestley Medal, American Chemical Society (1979)",
    ],
    legacy:
      "Seaborgium (Sg, Z=106) was named in his honor in 1997 — the only time an element has been officially named after a living person. Seaborg holds the Guinness record for the longest entry in Who's Who in America. The actinide series he identified is foundational to nuclear fuel cycle chemistry, reactor physics, and nuclear waste management.",
    quote:
      "There is an amazingly close working relationship, both in the laboratory and in policy discussions, between those who work on the weapons and those who work on peaceful applications.",
    quoteSource: "Glenn Seaborg",
  },
  {
    id: "rickover",
    name: "Admiral Hyman Rickover",
    years: "1900–1986",
    nationality: "American (Polish-born)",
    level: "intermediate",
    tagline:
      "Father of the nuclear navy; architect of US civilian nuclear power",
    icon: <Globe className="w-5 h-5" />,
    accentColor: "text-sky-500",
    overview:
      "Rickover had no training in nuclear physics — he was a naval engineer. But his absolute insistence on safety culture, engineering rigor, and accountability built the most reliable nuclear program in history. The US Navy's nuclear fleet, which he essentially created from nothing, has operated for over 70 years with zero reactor accidents. The civilian PWR design that dominates world nuclear power today descended directly from his submarine reactor program.",
    born: "Makow Mazowiecki, Congress Poland (then Russian Empire), 27 January 1900. Immigrated to the United States as a young child; grew up in Chicago. His family were Jewish immigrants fleeing Czarist repression.",
    education:
      "US Naval Academy, Annapolis (BS, 1922). University of Chicago (MS in electrical engineering, 1929). Studied nuclear technology at Oak Ridge National Laboratory (1946–1947) — the turning point in his career. Never held a PhD but is credited with creating the nuclear engineering discipline as a practical profession.",
    keyContributions: [
      {
        title: "Creation of Naval Reactors program and USS Nautilus (SSN-571)",
        detail:
          "In 1946–1947 Rickover attended the Oak Ridge nuclear training program and came away convinced that nuclear propulsion for submarines was achievable. Despite institutional resistance from senior naval officers, he maneuvered his way to dual authority over nuclear propulsion — simultaneously within the Navy (Naval Reactors Branch) and the civilian AEC. He selected Westinghouse as the contractor for the submarine thermal reactor (STR/S2W design: 15,000 shaft hp, HEU fuel, pressurized water moderated and cooled). USS Nautilus (SSN-571) was commissioned on 30 September 1954. On 17 January 1955 at 11:00 AM, Nautilus transmitted the message: 'Underway on nuclear power' — the ship's first nuclear-powered voyage. She completed the first submerged transit of the North Pole on 3 August 1958 (Operation Sunshine).",
      },
      {
        title: "Safety culture and the Rickover standard",
        detail:
          "Rickover instituted a culture of responsibility that was then unprecedented in large engineering programs: every officer who commanded a nuclear vessel was personally interviewed by Rickover; every contractor who built naval reactor components faced his direct scrutiny. His standard: if a system could fail, it must be designed so that failure is obvious, reported, and learned from. The US Navy nuclear program has logged over 6,200 reactor-years of operation with zero reactor accidents.",
      },
      {
        title: "Shippingport Atomic Power Station (1958)",
        detail:
          "Rickover oversaw the adaptation of the naval reactor design for civilian power at Shippingport, Pennsylvania (Pennsylvania Electric Company / AEC joint project). The Shippingport reactor (60 MWe, pressurized water design, capacity factor ~60%) came online on 26 May 1958 — the first full-scale civilian nuclear power plant in the United States and the world's first commercial PWR. Its design directly influenced all subsequent PWR construction worldwide.",
      },
      {
        title: "Nuclear submarine fleet and strategic deterrence",
        detail:
          "Under Rickover's oversight, the US Navy built a fleet of nuclear-powered submarines that included the first SSBNs (ballistic missile submarines): USS George Washington (SSBN-598, 1959), armed with Polaris A-1 missiles. This force became the most survivable leg of the US nuclear triad, operating continuously on deterrence patrol for decades. The engineering standards Rickover imposed made these vessels reliable enough for extended submerged deployment.",
      },
    ],
    publications: [
      {
        citation:
          "Rockwell, T. (1992). The Rickover Effect: How One Man Made a Difference. Naval Institute Press.",
        note: "Definitive biography by Rickover's long-time technical director.",
      },
      {
        citation:
          "Rickover, H.G. (1953). Naval Reactors: The Making of Nuclear Naval Power. US Government Printing Office.",
      },
    ],
    awards: [
      "Congressional Gold Medal (1982)",
      "Presidential Medal of Freedom (1980)",
      "Special Congressional Gold Medal — 'Father of the Nuclear Navy'",
      "Promoted to full Admiral (4-star) by Act of Congress (1973)",
      "Served on active duty for 63 years — longest-serving US naval officer",
    ],
    legacy:
      "The pressurized water reactor design Rickover commissioned for Nautilus became the template for the majority of the world's nuclear power stations. His safety culture philosophy — that engineering decisions must be owned by named individuals, not committees — influenced nuclear regulation worldwide. The US Navy nuclear program remains the proof-of-concept that nuclear power can be operated with near-perfect safety when engineering and accountability standards are uncompromised.",
    quote:
      "The more you sweat in peace, the less you bleed in war. And the more you sweat over safety, the less you'll bleed in an accident.",
    quoteSource: "Admiral Hyman Rickover",
  },
];

const levelColors: Record<string, string> = {
  beginner: "bg-emerald-500/15 text-emerald-600 border-emerald-500/30",
  intermediate: "bg-blue-500/15 text-blue-600 border-blue-500/30",
  advanced: "bg-violet-500/15 text-violet-600 border-violet-500/30",
};

function FigureCard({ figure }: { figure: Figure }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-muted/40 transition-colors"
        aria-expanded={open}
        data-ocid={`keyfigures.${figure.id}.toggle`}
      >
        <span className={`shrink-0 ${figure.accentColor}`}>{figure.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-0.5">
            <span className="font-semibold text-foreground font-display">
              {figure.name}
            </span>
            <span className="text-muted-foreground text-sm">
              ({figure.years})
            </span>
            <Badge
              variant="outline"
              className={`text-xs capitalize ${levelColors[figure.level]}`}
            >
              {figure.level}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground truncate">
            {figure.tagline}
          </p>
        </div>
        <span className="shrink-0 text-muted-foreground ml-2">
          {open ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </span>
      </button>

      {open && (
        <div className="px-5 pb-6 pt-2 border-t border-border space-y-6">
          {/* Overview */}
          <div>
            <p className="text-foreground leading-relaxed">{figure.overview}</p>
          </div>

          {/* Quote */}
          {figure.quote && (
            <blockquote className="border-l-4 border-primary/40 pl-4 py-1">
              <p className="italic text-foreground/80 text-sm leading-relaxed">
                "{figure.quote}"
              </p>
              <footer className="mt-1 text-xs text-muted-foreground">
                — {figure.quoteSource}
              </footer>
            </blockquote>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {/* Born & Education */}
            <div className="space-y-4">
              <div>
                <h4 className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-1">
                  Born
                </h4>
                <p className="text-sm text-foreground leading-relaxed">
                  {figure.born}
                </p>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-1">
                  Education &amp; Career
                </h4>
                <p className="text-sm text-foreground leading-relaxed">
                  {figure.education}
                </p>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-1">
                  Awards &amp; Honours
                </h4>
                <ul className="space-y-1">
                  {figure.awards.map((award) => (
                    <li
                      key={award}
                      className="flex items-start gap-2 text-sm text-foreground"
                    >
                      <Award className="w-3.5 h-3.5 mt-0.5 shrink-0 text-secondary-foreground/70" />
                      {award}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Key Contributions */}
            <div>
              <h4 className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2">
                Key Contributions
              </h4>
              <div className="space-y-4">
                {figure.keyContributions.map((contrib) => (
                  <div
                    key={contrib.title}
                    className="bg-muted/40 rounded-md p-3"
                  >
                    <p className="text-sm font-semibold text-foreground mb-1">
                      {contrib.title}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                      {contrib.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Publications */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-2">
              Key Publications
            </h4>
            <ul className="space-y-2">
              {figure.publications.map((pub) => (
                <li key={pub.citation} className="flex gap-2 text-sm">
                  <BookOpen className="w-3.5 h-3.5 mt-0.5 shrink-0 text-primary/60" />
                  <span>
                    <span className="text-foreground/90 leading-relaxed">
                      {pub.citation}
                    </span>
                    {pub.note && (
                      <span className="ml-1 text-muted-foreground italic">
                        — {pub.note}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Legacy */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-1">
              Legacy
            </h4>
            <p className="text-sm text-foreground leading-relaxed">
              {figure.legacy}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function KeyFigures() {
  return (
    <div
      className="max-w-4xl mx-auto px-4 py-10 space-y-8"
      data-ocid="keyfigures.page"
    >
      {/* Page header — always visible */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>History</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground">Key Figures</span>
        </div>
        <h1 className="text-4xl font-bold font-display text-foreground tracking-tight">
          Key Figures in Nuclear Science
        </h1>
        <div className="prose prose-sm max-w-none text-muted-foreground space-y-2">
          <p>
            Nuclear science was shaped by a remarkable concentration of
            scientific genius in the first half of the 20th century. Between
            Becquerel's accidental 1896 discovery of radioactivity and Fermi's
            1942 chain reaction, the entire theoretical and experimental
            foundation of nuclear physics was constructed — in less than 50
            years — by a surprisingly small number of interconnected scientists
            working across Europe and America.
          </p>
          <p>
            This page profiles nine scientists whose discoveries made nuclear
            energy, nuclear medicine, and modern nuclear policy possible. Each
            profile covers their background, key contributions (with equations
            and primary sources), major publications, awards, and enduring
            legacy. Sections are collapsed by default — expand any figure to
            read the full profile.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {(["beginner", "intermediate"] as const).map((level) => (
              <span
                key={level}
                className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border font-medium capitalize ${levelColors[level]}`}
              >
                {level}
              </span>
            ))}
            <span className="text-xs text-muted-foreground self-center ml-1">
              — content depth indicators
            </span>
          </div>
        </div>
      </div>

      {/* Timeline summary */}
      <div className="bg-muted/30 border border-border rounded-lg p-4">
        <h2 className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-3">
          Timeline of key discoveries
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-6 text-sm">
          {[
            ["1896", "Becquerel discovers radioactivity"],
            ["1898", "Curies discover polonium and radium"],
            ["1899", "Rutherford identifies alpha and beta radiation"],
            ["1908", "Rutherford — Nobel Prize (transmutation)"],
            ["1911", "Rutherford proposes nuclear model of the atom"],
            ["1913", "Bohr model of quantized atomic orbits"],
            ["1919", "Rutherford: first artificial nuclear transmutation"],
            ["1920", "Rutherford predicts the neutron"],
            ["1926", "Fermi-Dirac statistics"],
            ["1932", "Chadwick confirms the neutron"],
            ["1934", "Fermi discovers slow neutron enhancement"],
            ["1936", "Meitner discovers nuclear isomerism"],
            ["1938", "Meitner and Frisch explain nuclear fission"],
            ["1939", "Bohr and Wheeler — liquid drop model of fission"],
            ["1940", "Seaborg co-discovers plutonium"],
            ["1942", "Fermi — CP-1, first chain reaction (Dec 2)"],
            ["1943–45", "Oppenheimer directs Los Alamos"],
            ["1945", "Trinity test; first nuclear weapon detonated"],
            ["1954", "USS Nautilus — nuclear propulsion (Rickover)"],
            ["1958", "Shippingport — first US civilian nuclear power"],
          ].map(([year, event]) => (
            <div key={year} className="flex gap-2">
              <span className="text-primary font-mono text-xs w-16 shrink-0 pt-0.5">
                {year}
              </span>
              <span className="text-foreground/80">{event}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Figure profiles */}
      <div className="space-y-3" data-ocid="keyfigures.list">
        {figures.map((figure, i) => (
          <div key={figure.id} data-ocid={`keyfigures.item.${i + 1}`}>
            <FigureCard figure={figure} />
          </div>
        ))}
      </div>

      {/* Sources */}
      <div className="bg-muted/20 border border-border rounded-lg p-4 text-sm text-muted-foreground">
        <h2 className="text-xs uppercase tracking-widest font-semibold mb-2 text-foreground/60">
          Primary sources &amp; further reading
        </h2>
        <ul className="space-y-1 leading-relaxed">
          <li>
            NNDC/BNL — Evaluated Nuclear Structure Data File (ENSDF),{" "}
            <span className="font-mono text-xs">
              https://www.nndc.bnl.gov/ensdf/
            </span>
          </li>
          <li>
            Nobel Prize Foundation — Physics and Chemistry Nobel Lectures,{" "}
            <span className="font-mono text-xs">
              https://www.nobelprize.org
            </span>
          </li>
          <li>
            Rhodes, R. (1986). <em>The Making of the Atomic Bomb</em>. Simon
            &amp; Schuster. ISBN 978-0-684-81378-3.
          </li>
          <li>
            Sime, R.L. (1996). <em>Lise Meitner: A Life in Physics</em>.
            University of California Press.
          </li>
          <li>
            Rockwell, T. (1992). <em>The Rickover Effect</em>. Naval Institute
            Press.
          </li>
          <li>
            Seaborg, G.T., &amp; Loveland, W.D. (1990).{" "}
            <em>The Elements Beyond Uranium</em>. Wiley.
          </li>
          <li>
            Bird, K., &amp; Sherwin, M.J. (2005).{" "}
            <em>
              American Prometheus: The Triumph and Tragedy of J. Robert
              Oppenheimer
            </em>
            . Knopf.
          </li>
        </ul>
      </div>
    </div>
  );
}
