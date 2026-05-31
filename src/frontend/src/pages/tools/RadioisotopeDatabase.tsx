import { PageHeader } from "@/components/PageHeader";
import { SectionCard } from "@/components/SectionCard";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type Category = "All" | "Medical" | "Industrial" | "Research" | "Energy";

interface Isotope {
  symbol: string;
  name: string;
  halfLife: string;
  cat: Category;
  uses: string;
  detail: string;
}

const isotopes: Isotope[] = [
  {
    symbol: "Tc-99m",
    name: "Technetium-99m",
    halfLife: "6h",
    cat: "Medical",
    uses: "SPECT imaging, bone scans, thyroid imaging",
    detail:
      "Most widely used medical radioisotope. ~40M procedures/year worldwide. Produced in Mo-99/Tc-99m generators.",
  },
  {
    symbol: "I-131",
    name: "Iodine-131",
    halfLife: "8d",
    cat: "Medical",
    uses: "Thyroid cancer therapy, hyperthyroidism treatment",
    detail:
      "Beta emitter used to destroy thyroid tissue. Also used in diagnostic thyroid imaging.",
  },
  {
    symbol: "F-18",
    name: "Fluorine-18",
    halfLife: "110min",
    cat: "Medical",
    uses: "PET scanning, FDG-PET for oncology and neurology",
    detail:
      "Used in FDG (fluorodeoxyglucose) for glucose metabolism imaging. Cyclotron-produced.",
  },
  {
    symbol: "Ga-67",
    name: "Gallium-67",
    halfLife: "78h",
    cat: "Medical",
    uses: "Tumor detection, infection/inflammation imaging",
    detail:
      "Gamma emitter used for lymphoma and soft tissue tumor scintigraphy.",
  },
  {
    symbol: "In-111",
    name: "Indium-111",
    halfLife: "67h",
    cat: "Medical",
    uses: "White blood cell labeling, infection imaging, neuroendocrine tumors",
    detail: "Used with antibodies and peptides for targeted imaging.",
  },
  {
    symbol: "Tl-201",
    name: "Thallium-201",
    halfLife: "73h",
    cat: "Medical",
    uses: "Cardiac stress testing, myocardial perfusion imaging",
    detail:
      "Used to assess coronary artery disease and heart muscle viability.",
  },
  {
    symbol: "Y-90",
    name: "Yttrium-90",
    halfLife: "64h",
    cat: "Medical",
    uses: "Liver cancer radioembolization (TARE), radioimmunotherapy",
    detail:
      "Pure beta emitter. Used in SIR-Spheres and TheraSphere for hepatocellular carcinoma.",
  },
  {
    symbol: "Lu-177",
    name: "Lutetium-177",
    halfLife: "7d",
    cat: "Medical",
    uses: "Prostate cancer (PSMA-targeted therapy), neuroendocrine tumors",
    detail:
      "Theranostic agent - same chelator used for imaging (Ga-68) and therapy (Lu-177).",
  },
  {
    symbol: "Ra-223",
    name: "Radium-223",
    halfLife: "11d",
    cat: "Medical",
    uses: "Bone metastases from prostate cancer (Xofigo)",
    detail:
      "Alpha emitter that targets bone metastases. Approved FDA drug with survival benefit.",
  },
  {
    symbol: "Am-241",
    name: "Americium-241",
    halfLife: "432y",
    cat: "Industrial",
    uses: "Smoke detectors, moisture/density gauges, well logging",
    detail:
      "Alpha emitter in ionization chamber smoke detectors. ~500M devices worldwide.",
  },
  {
    symbol: "Cs-137",
    name: "Caesium-137",
    halfLife: "30y",
    cat: "Industrial",
    uses: "Industrial gauges, calibration sources, irradiators, food irradiation",
    detail:
      "Gamma emitter used in level gauges, density meters, and radiation therapy calibration.",
  },
  {
    symbol: "Co-60",
    name: "Cobalt-60",
    halfLife: "5.3y",
    cat: "Industrial",
    uses: "Food and medical device sterilization, cancer radiotherapy (Gamma Knife)",
    detail:
      "High-energy gamma emitter. Major source for irradiation facilities and teletherapy units.",
  },
  {
    symbol: "Ir-192",
    name: "Iridium-192",
    halfLife: "74d",
    cat: "Industrial",
    uses: "Industrial radiography (weld/pipe inspection), brachytherapy",
    detail:
      "Used to inspect welds in pipelines, pressure vessels, and aircraft. Also used in HDR brachytherapy.",
  },
  {
    symbol: "Se-75",
    name: "Selenium-75",
    halfLife: "120d",
    cat: "Industrial",
    uses: "Industrial radiography for light alloys and thin materials",
    detail:
      "Lower-energy gamma source, preferred over Ir-192 for thinner or lower-density materials.",
  },
  {
    symbol: "Cf-252",
    name: "Californium-252",
    halfLife: "2.6y",
    cat: "Industrial",
    uses: "Neutron moisture gauges, startup neutron sources, neutron activation analysis",
    detail:
      "Spontaneous fission neutron source. Used for reactor startups and neutron radiography.",
  },
  {
    symbol: "Pu-238",
    name: "Plutonium-238",
    halfLife: "87.7y",
    cat: "Energy",
    uses: "Radioisotope thermoelectric generators (RTGs) for spacecraft",
    detail:
      "Powers Voyager 1&2, Cassini, New Horizons. 0.54W/g heat output from alpha decay.",
  },
  {
    symbol: "Sr-90",
    name: "Strontium-90",
    halfLife: "29y",
    cat: "Energy",
    uses: "RTGs, beta radiation sources, remote power supplies",
    detail:
      "High-power beta emitter used in SNAP RTGs and remote power units in Arctic lighthouses.",
  },
  {
    symbol: "C-14",
    name: "Carbon-14",
    halfLife: "5730y",
    cat: "Research",
    uses: "Radiocarbon dating, biochemical tracer, metabolic studies",
    detail:
      "Produced by cosmic ray interactions. Foundation of archaeological and geological dating.",
  },
  {
    symbol: "H-3",
    name: "Tritium",
    halfLife: "12.3y",
    cat: "Research",
    uses: "Radiolabeled biochemical tracers, self-luminous devices, fusion research",
    detail:
      "Beta emitter used as biochemical tracer. Also fuel for thermonuclear fusion (D-T reaction).",
  },
  {
    symbol: "P-32",
    name: "Phosphorus-32",
    halfLife: "14d",
    cat: "Research",
    uses: "DNA labeling, molecular biology tracers, biochemistry",
    detail:
      "High-energy beta emitter widely used in gel electrophoresis and DNA/RNA studies.",
  },
  {
    symbol: "S-35",
    name: "Sulfur-35",
    halfLife: "87d",
    cat: "Research",
    uses: "Protein and amino acid labeling, metabolic studies",
    detail:
      "Low-energy beta emitter used to label methionine and cysteine in proteomics.",
  },
  {
    symbol: "Na-24",
    name: "Sodium-24",
    halfLife: "15h",
    cat: "Research",
    uses: "Tracer for blood flow, hydrological studies, leak detection",
    detail:
      "Gamma emitter used to trace water flow in industrial systems and rivers.",
  },
  {
    symbol: "Xe-133",
    name: "Xenon-133",
    halfLife: "5.2d",
    cat: "Medical",
    uses: "Lung ventilation imaging, cerebral blood flow studies",
    detail:
      "Inert gas inhaled for lung SPECT imaging. Also used for cerebral perfusion studies.",
  },
  {
    symbol: "Kr-81m",
    name: "Krypton-81m",
    halfLife: "13s",
    cat: "Medical",
    uses: "Lung ventilation imaging (superior to Xe-133 for regional studies)",
    detail:
      "Very short half-life allows multiple sequential studies. Produced from Rb-81 generator.",
  },
  {
    symbol: "Mo-99",
    name: "Molybdenum-99",
    halfLife: "66h",
    cat: "Medical",
    uses: "Parent of Tc-99m generator, most critical nuclear medicine supply chain isotope",
    detail:
      "Produced in research reactors (NRU, BR2, HFR). Global supply ~critical. Shortage in 2009-2010.",
  },
  {
    symbol: "Pd-103",
    name: "Palladium-103",
    halfLife: "17d",
    cat: "Medical",
    uses: "Prostate cancer brachytherapy seeds",
    detail:
      "Low-energy photon emitter. Implanted permanently for prostate cancer treatment.",
  },
  {
    symbol: "I-125",
    name: "Iodine-125",
    halfLife: "60d",
    cat: "Medical",
    uses: "Prostate cancer brachytherapy, radioimmunoassay, DNA labeling",
    detail:
      "Low-energy photon emitter. Most common permanent implant for prostate brachytherapy.",
  },
  {
    symbol: "Re-188",
    name: "Rhenium-188",
    halfLife: "17h",
    cat: "Medical",
    uses: "Bone pain palliation, endovascular therapy",
    detail:
      "Beta emitter produced from W-188/Re-188 generator. Used for bone metastasis palliation.",
  },
  {
    symbol: "Sm-153",
    name: "Samarium-153",
    halfLife: "46.3h",
    cat: "Medical",
    uses: "Bone pain palliation (Lexidronam/Quadramet)",
    detail:
      "Beta emitter that targets bone metastases. Approved for pain relief in osteoblastic bone lesions.",
  },
  {
    symbol: "Ac-225",
    name: "Actinium-225",
    halfLife: "10d",
    cat: "Medical",
    uses: "Targeted alpha therapy, prostate cancer (225Ac-PSMA)",
    detail:
      "Alpha-emitting therapeutic radionuclide. Supply limited but growing for cancer therapy.",
  },
];

const categories: Category[] = [
  "All",
  "Medical",
  "Industrial",
  "Research",
  "Energy",
];

const catColors: Record<string, string> = {
  Medical: "bg-emerald-900/40 text-emerald-200 border-emerald-700/40",
  Industrial: "bg-blue-900/40 text-blue-200 border-blue-700/40",
  Research: "bg-purple-900/40 text-purple-200 border-purple-700/40",
  Energy: "bg-amber-900/40 text-amber-200 border-amber-700/40",
};

export default function RadioisotopeDatabase() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category>("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = isotopes.filter((iso) => {
    const matchesCat = category === "All" || iso.cat === category;
    const q = search.toLowerCase();
    const matchesSearch =
      iso.symbol.toLowerCase().includes(q) ||
      iso.name.toLowerCase().includes(q) ||
      iso.uses.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Radioisotope Applications Database"
        subtitle="Comprehensive database of radioisotopes used in medicine, industry, research, and energy applications."
      />

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search isotopes, uses, or applications..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary glow-focus"
          data-ocid="isotope.search_input"
        />
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all glow-focus",
              category === c
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40",
            )}
            data-ocid={`isotope.filter_${c.toLowerCase()}_tab`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((iso) => {
            const isExpanded = expanded === iso.symbol;
            return (
              <motion.div
                key={iso.symbol}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  type="button"
                  className={cn(
                    "cursor-pointer transition-all rounded-xl border border-border bg-card p-6 shadow-card w-full text-left",
                    isExpanded && "border-primary/30 shadow-glow-accent",
                  )}
                  onClick={() => setExpanded(isExpanded ? null : iso.symbol)}
                  data-ocid={`isotope.card.${iso.symbol}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-2xl font-display font-bold text-primary">
                        {iso.symbol}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {iso.name}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={cn("text-xs", catColors[iso.cat])}
                    >
                      {iso.cat}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    Half-life: {iso.halfLife}
                  </p>
                  <p className="text-sm text-foreground line-clamp-2">
                    {iso.uses}
                  </p>

                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-4 pt-4 border-t border-border"
                    >
                      <p className="text-sm text-foreground mb-3">
                        {iso.detail}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <a
                          href={`/visualizations/decay-chain?isotope=${iso.symbol}`}
                          className="text-xs text-primary hover:underline"
                          data-ocid={`isotope.link_decay_${iso.symbol}`}
                        >
                          View in Decay Chain Explorer →
                        </a>
                        <a
                          href={`/visualizations/nuclide-chart?isotope=${iso.symbol}`}
                          className="text-xs text-primary hover:underline"
                          data-ocid={`isotope.link_chart_${iso.symbol}`}
                        >
                          View in Chart of Nuclides →
                        </a>
                      </div>
                    </motion.div>
                  )}
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div
          className="text-center py-12 text-muted-foreground"
          data-ocid="isotope.empty_state"
        >
          No isotopes match your search.
        </div>
      )}
    </div>
  );
}
