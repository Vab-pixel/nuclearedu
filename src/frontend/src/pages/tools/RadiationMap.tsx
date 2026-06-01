import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Globe, Info, Radiation, X, Zap } from "lucide-react";
import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  Tooltip as RechartsTooltip,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

// ─── UNSCEAR 2008 Dataset ─────────────────────────────────────────────────────
// Values in mSv/year. Breakdown columns: cosmic, terrestrial, radon, internal.
// Source: UNSCEAR 2008 Report, Annex B. World average = 2.4 mSv/y.
type CountryData = {
  code: string;
  name: string;
  total: number;
  cosmic: number;
  terrestrial: number;
  radon: number;
  internal: number;
  population: number; // millions
  notes: string;
};

const RADIATION_DATA: CountryData[] = [
  {
    code: "FI",
    name: "Finland",
    total: 7.8,
    cosmic: 0.38,
    terrestrial: 0.55,
    radon: 6.3,
    internal: 0.29,
    population: 5.5,
    notes: "Granite bedrock causes very high radon levels",
  },
  {
    code: "NO",
    name: "Norway",
    total: 7.1,
    cosmic: 0.42,
    terrestrial: 0.52,
    radon: 5.8,
    internal: 0.29,
    population: 5.4,
    notes: "High elevation + granitic geology",
  },
  {
    code: "SE",
    name: "Sweden",
    total: 4.8,
    cosmic: 0.38,
    terrestrial: 0.48,
    radon: 3.65,
    internal: 0.29,
    population: 10.5,
    notes: "Extensive radon mitigation programs",
  },
  {
    code: "IS",
    name: "Iceland",
    total: 5.2,
    cosmic: 0.36,
    terrestrial: 0.85,
    radon: 3.7,
    internal: 0.29,
    population: 0.37,
    notes: "Volcanic geology, high terrestrial radiation",
  },
  {
    code: "CZ",
    name: "Czechia",
    total: 5.2,
    cosmic: 0.35,
    terrestrial: 0.55,
    radon: 4.0,
    internal: 0.3,
    population: 10.9,
    notes: "High indoor radon from uranium-rich geology",
  },
  {
    code: "AT",
    name: "Austria",
    total: 4.3,
    cosmic: 0.38,
    terrestrial: 0.52,
    radon: 3.1,
    internal: 0.3,
    population: 9.0,
    notes: "Alpine terrain raises cosmic component",
  },
  {
    code: "CH",
    name: "Switzerland",
    total: 4.0,
    cosmic: 0.48,
    terrestrial: 0.5,
    radon: 2.72,
    internal: 0.3,
    population: 8.7,
    notes: "Alpine elevation, moderate radon",
  },
  {
    code: "IN",
    name: "India",
    total: 4.2,
    cosmic: 0.35,
    terrestrial: 1.5,
    radon: 2.0,
    internal: 0.35,
    population: 1400,
    notes: "High terrestrial from monazite sand coasts",
  },
  {
    code: "BR",
    name: "Brazil",
    total: 3.5,
    cosmic: 0.36,
    terrestrial: 0.72,
    radon: 2.1,
    internal: 0.32,
    population: 215,
    notes: "Monazite deposits in Guarapari",
  },
  {
    code: "IR",
    name: "Iran",
    total: 4.7,
    cosmic: 0.37,
    terrestrial: 1.28,
    radon: 2.75,
    internal: 0.3,
    population: 87,
    notes: "Ramsar region — highest natural dose globally",
  },
  {
    code: "DE",
    name: "Germany",
    total: 4.0,
    cosmic: 0.35,
    terrestrial: 0.5,
    radon: 2.85,
    internal: 0.29,
    population: 84,
    notes: "Strict radon regulations since 2017",
  },
  {
    code: "FR",
    name: "France",
    total: 3.5,
    cosmic: 0.36,
    terrestrial: 0.52,
    radon: 2.33,
    internal: 0.29,
    population: 68,
    notes: "Significant radon in Brittany (granite)",
  },
  {
    code: "GB",
    name: "United Kingdom",
    total: 2.7,
    cosmic: 0.35,
    terrestrial: 0.47,
    radon: 1.59,
    internal: 0.29,
    population: 67,
    notes: "Radon hotspots in Cornwall/Devon",
  },
  {
    code: "IE",
    name: "Ireland",
    total: 3.8,
    cosmic: 0.35,
    terrestrial: 0.48,
    radon: 2.67,
    internal: 0.3,
    population: 5.1,
    notes: "Limestone karst raises radon",
  },
  {
    code: "US",
    name: "United States",
    total: 3.1,
    cosmic: 0.33,
    terrestrial: 0.3,
    radon: 2.28,
    internal: 0.29,
    population: 332,
    notes: "High altitude states (CO, NM) have elevated doses",
  },
  {
    code: "CA",
    name: "Canada",
    total: 2.9,
    cosmic: 0.36,
    terrestrial: 0.33,
    radon: 1.92,
    internal: 0.29,
    population: 38,
    notes: "Northern territories higher due to altitude/geology",
  },
  {
    code: "AU",
    name: "Australia",
    total: 1.8,
    cosmic: 0.3,
    terrestrial: 0.4,
    radon: 0.81,
    internal: 0.29,
    population: 26,
    notes: "Low-lying continent, low cosmic dose",
  },
  {
    code: "NZ",
    name: "New Zealand",
    total: 2.4,
    cosmic: 0.34,
    terrestrial: 0.5,
    radon: 1.27,
    internal: 0.29,
    population: 5.1,
    notes: "Volcanic geology in North Island",
  },
  {
    code: "JP",
    name: "Japan",
    total: 2.1,
    cosmic: 0.3,
    terrestrial: 0.46,
    radon: 1.05,
    internal: 0.29,
    population: 125,
    notes: "National average; mountains higher",
  },
  {
    code: "CN",
    name: "China",
    total: 3.1,
    cosmic: 0.34,
    terrestrial: 0.55,
    radon: 1.92,
    internal: 0.3,
    population: 1400,
    notes: "Tibetan plateau significantly increases cosmic dose",
  },
  {
    code: "RU",
    name: "Russia",
    total: 3.7,
    cosmic: 0.38,
    terrestrial: 0.52,
    radon: 2.51,
    internal: 0.29,
    population: 144,
    notes: "Ural mountains, Siberian geology",
  },
  {
    code: "UA",
    name: "Ukraine",
    total: 3.4,
    cosmic: 0.33,
    terrestrial: 0.54,
    radon: 2.24,
    internal: 0.29,
    population: 44,
    notes: "Granite-rich Chernobyl region",
  },
  {
    code: "IT",
    name: "Italy",
    total: 3.9,
    cosmic: 0.35,
    terrestrial: 0.58,
    radon: 2.67,
    internal: 0.29,
    population: 60,
    notes: "Volcanic Latium region; high tuff radon",
  },
  {
    code: "ES",
    name: "Spain",
    total: 3.6,
    cosmic: 0.36,
    terrestrial: 0.55,
    radon: 2.4,
    internal: 0.29,
    population: 47,
    notes: "Galicia region has high granite radon",
  },
  {
    code: "PT",
    name: "Portugal",
    total: 4.1,
    cosmic: 0.35,
    terrestrial: 0.55,
    radon: 2.91,
    internal: 0.29,
    population: 10.3,
    notes: "Uranium-rich geology in Alentejo",
  },
  {
    code: "PL",
    name: "Poland",
    total: 3.3,
    cosmic: 0.33,
    terrestrial: 0.52,
    radon: 2.15,
    internal: 0.3,
    population: 38,
    notes: "Sudety mountains with high radon",
  },
  {
    code: "GR",
    name: "Greece",
    total: 3.4,
    cosmic: 0.36,
    terrestrial: 0.58,
    radon: 2.17,
    internal: 0.29,
    population: 10.7,
    notes: "Aegean islands, marble geology",
  },
  {
    code: "BE",
    name: "Belgium",
    total: 3.2,
    cosmic: 0.33,
    terrestrial: 0.51,
    radon: 2.07,
    internal: 0.29,
    population: 11.6,
    notes: "Ardennes region has elevated radon",
  },
  {
    code: "NL",
    name: "Netherlands",
    total: 2.0,
    cosmic: 0.31,
    terrestrial: 0.4,
    radon: 1.0,
    internal: 0.29,
    population: 17.9,
    notes: "Sea-level, sedimentary geology",
  },
  {
    code: "DK",
    name: "Denmark",
    total: 2.8,
    cosmic: 0.32,
    terrestrial: 0.48,
    radon: 1.71,
    internal: 0.29,
    population: 5.9,
    notes: "Moraine clays increase radon",
  },
  {
    code: "KR",
    name: "South Korea",
    total: 3.0,
    cosmic: 0.3,
    terrestrial: 0.55,
    radon: 1.86,
    internal: 0.29,
    population: 51,
    notes: "Granite basement rock",
  },
  {
    code: "MX",
    name: "Mexico",
    total: 2.6,
    cosmic: 0.33,
    terrestrial: 0.5,
    radon: 1.48,
    internal: 0.29,
    population: 130,
    notes: "Mexico City elevated by altitude",
  },
  {
    code: "AR",
    name: "Argentina",
    total: 2.5,
    cosmic: 0.34,
    terrestrial: 0.46,
    radon: 1.41,
    internal: 0.29,
    population: 46,
    notes: "Andean regions higher",
  },
  {
    code: "ZA",
    name: "South Africa",
    total: 3.5,
    cosmic: 0.3,
    terrestrial: 0.92,
    radon: 1.99,
    internal: 0.29,
    population: 60,
    notes: "Gold/uranium mine regions",
  },
  {
    code: "NG",
    name: "Nigeria",
    total: 2.3,
    cosmic: 0.28,
    terrestrial: 0.52,
    radon: 1.21,
    internal: 0.29,
    population: 220,
    notes: "Basement complex rocks",
  },
  {
    code: "EG",
    name: "Egypt",
    total: 2.2,
    cosmic: 0.28,
    terrestrial: 0.65,
    radon: 0.98,
    internal: 0.29,
    population: 104,
    notes: "Desert phosphate deposits",
  },
  {
    code: "SA",
    name: "Saudi Arabia",
    total: 2.0,
    cosmic: 0.27,
    terrestrial: 0.45,
    radon: 0.99,
    internal: 0.29,
    population: 35,
    notes: "Arid flat terrain",
  },
  {
    code: "TR",
    name: "Turkey",
    total: 3.3,
    cosmic: 0.35,
    terrestrial: 0.62,
    radon: 2.04,
    internal: 0.29,
    population: 85,
    notes: "Anatolian plateau",
  },
  {
    code: "PK",
    name: "Pakistan",
    total: 2.8,
    cosmic: 0.33,
    terrestrial: 0.55,
    radon: 1.63,
    internal: 0.29,
    population: 220,
    notes: "Himalayan foothills",
  },
  {
    code: "BD",
    name: "Bangladesh",
    total: 1.7,
    cosmic: 0.27,
    terrestrial: 0.3,
    radon: 0.84,
    internal: 0.29,
    population: 170,
    notes: "River delta, sedimentary soil",
  },
  {
    code: "TH",
    name: "Thailand",
    total: 2.4,
    cosmic: 0.28,
    terrestrial: 0.55,
    radon: 1.28,
    internal: 0.29,
    population: 72,
    notes: "World average",
  },
  {
    code: "ID",
    name: "Indonesia",
    total: 2.1,
    cosmic: 0.27,
    terrestrial: 0.48,
    radon: 1.06,
    internal: 0.29,
    population: 277,
    notes: "Tropical, sea-level majority",
  },
  {
    code: "PH",
    name: "Philippines",
    total: 2.0,
    cosmic: 0.27,
    terrestrial: 0.45,
    radon: 0.99,
    internal: 0.29,
    population: 112,
    notes: "Archipelago, mostly sea level",
  },
  {
    code: "MY",
    name: "Malaysia",
    total: 2.2,
    cosmic: 0.27,
    terrestrial: 0.52,
    radon: 1.12,
    internal: 0.29,
    population: 33,
    notes: "Tin-bearing granites in peninsula",
  },
  {
    code: "VN",
    name: "Vietnam",
    total: 2.3,
    cosmic: 0.28,
    terrestrial: 0.55,
    radon: 1.18,
    internal: 0.29,
    population: 98,
    notes: "Northern highlands raise average",
  },
  {
    code: "KE",
    name: "Kenya",
    total: 2.8,
    cosmic: 0.3,
    terrestrial: 0.58,
    radon: 1.63,
    internal: 0.29,
    population: 55,
    notes: "East African Rift geology",
  },
  {
    code: "ET",
    name: "Ethiopia",
    total: 3.0,
    cosmic: 0.32,
    terrestrial: 0.62,
    radon: 1.77,
    internal: 0.29,
    population: 126,
    notes: "High elevation plateau",
  },
  {
    code: "GH",
    name: "Ghana",
    total: 2.4,
    cosmic: 0.28,
    terrestrial: 0.55,
    radon: 1.28,
    internal: 0.29,
    population: 32,
    notes: "Basement complex granite",
  },
  {
    code: "MA",
    name: "Morocco",
    total: 2.6,
    cosmic: 0.3,
    terrestrial: 0.6,
    radon: 1.41,
    internal: 0.29,
    population: 37,
    notes: "Atlas Mountains phosphate",
  },
  {
    code: "UA",
    name: "Ukraine",
    total: 3.4,
    cosmic: 0.33,
    terrestrial: 0.54,
    radon: 2.24,
    internal: 0.29,
    population: 44,
    notes: "Granite-rich geology",
  },
  {
    code: "HU",
    name: "Hungary",
    total: 3.8,
    cosmic: 0.33,
    terrestrial: 0.55,
    radon: 2.63,
    internal: 0.29,
    population: 9.7,
    notes: "Uranium-rich geology in Mecsek hills",
  },
  {
    code: "RO",
    name: "Romania",
    total: 3.6,
    cosmic: 0.34,
    terrestrial: 0.55,
    radon: 2.42,
    internal: 0.29,
    population: 19,
    notes: "Carpathian granite, uranium deposits",
  },
  {
    code: "SK",
    name: "Slovakia",
    total: 4.5,
    cosmic: 0.34,
    terrestrial: 0.56,
    radon: 3.3,
    internal: 0.3,
    population: 5.5,
    notes: "High radon similar to Czechia",
  },
  {
    code: "SG",
    name: "Singapore",
    total: 1.6,
    cosmic: 0.26,
    terrestrial: 0.3,
    radon: 0.75,
    internal: 0.29,
    population: 5.9,
    notes: "Sea-level tropical, sedimentary",
  },
  {
    code: "NP",
    name: "Nepal",
    total: 5.1,
    cosmic: 0.68,
    terrestrial: 0.62,
    radon: 3.51,
    internal: 0.29,
    population: 30,
    notes: "Himalayan altitude, 3500m average",
  },
  {
    code: "BO",
    name: "Bolivia",
    total: 4.8,
    cosmic: 0.72,
    terrestrial: 0.52,
    radon: 3.27,
    internal: 0.29,
    population: 12,
    notes: "Altiplano at 3600m average",
  },
  {
    code: "PE",
    name: "Peru",
    total: 3.8,
    cosmic: 0.55,
    terrestrial: 0.55,
    radon: 2.41,
    internal: 0.29,
    population: 33,
    notes: "Andean highlands",
  },
  {
    code: "CO",
    name: "Colombia",
    total: 3.2,
    cosmic: 0.38,
    terrestrial: 0.52,
    radon: 2.01,
    internal: 0.29,
    population: 51,
    notes: "Andean cordillera",
  },
  {
    code: "CL",
    name: "Chile",
    total: 3.5,
    cosmic: 0.5,
    terrestrial: 0.55,
    radon: 2.16,
    internal: 0.29,
    population: 19,
    notes: "Atacama + Andes combination",
  },
  {
    code: "KZ",
    name: "Kazakhstan",
    total: 3.2,
    cosmic: 0.36,
    terrestrial: 0.66,
    radon: 1.89,
    internal: 0.29,
    population: 19,
    notes: "Uranium-rich steppes",
  },
];

type FilterMode = "total" | "cosmic" | "terrestrial" | "radon" | "internal";

const FILTER_LABELS: Record<FilterMode, string> = {
  total: "Total Background",
  cosmic: "Cosmic Rays",
  terrestrial: "Terrestrial (soil/rock)",
  radon: "Radon Gas",
  internal: "Internal (food/water)",
};

const FILTER_COLORS: Record<FilterMode, string> = {
  total: "#60a5fa",
  cosmic: "#a78bfa",
  terrestrial: "#34d399",
  radon: "#fb923c",
  internal: "#f472b6",
};

// Dose context reference levels
const DOSE_CONTEXT = [
  { label: "Dental X-ray", dose: 0.005, color: "#4ade80" },
  { label: "Chest X-ray", dose: 0.02, color: "#86efac" },
  { label: "Transatlantic flight", dose: 0.08, color: "#a3e635" },
  {
    label: "World avg background (annual)",
    dose: 2.4,
    color: "#60a5fa",
    highlight: true,
  },
  { label: "Mammogram", dose: 0.4, color: "#facc15" },
  { label: "CT abdomen", dose: 8.0, color: "#fb923c" },
  { label: "Annual occupational limit (IAEA)", dose: 20, color: "#f87171" },
  { label: "Acute radiation sickness threshold", dose: 1000, color: "#ef4444" },
];

function getDoseColor(dose: number, mode: FilterMode): string {
  const val = mode === "total" ? dose : dose;
  const thresholds =
    mode === "total"
      ? [
          [2, "#4ade80"],
          [3, "#86efac"],
          [4, "#facc15"],
          [5, "#fb923c"],
          [Number.POSITIVE_INFINITY, "#ef4444"],
        ]
      : [
          [0.3, "#4ade80"],
          [0.6, "#86efac"],
          [1.0, "#facc15"],
          [2.0, "#fb923c"],
          [Number.POSITIVE_INFINITY, "#ef4444"],
        ];
  for (const [thresh, color] of thresholds) {
    if (val < (thresh as number)) return color as string;
  }
  return "#ef4444";
}

const PIE_COLORS = ["#a78bfa", "#34d399", "#fb923c", "#f472b6"];

// ─── Simplified SVG World Map paths (equirectangular projection) ───────────────
// Country paths are simplified polygons for illustrative purposes.
// Each entry: [code, svgPath]
const COUNTRY_PATHS: [string, string][] = [
  ["US", "M 80 130 L 200 130 L 210 180 L 180 200 L 90 195 L 75 160 Z"],
  ["CA", "M 80 60 L 215 60 L 215 130 L 200 130 L 80 130 Z"],
  ["MX", "M 90 195 L 180 200 L 170 235 L 145 240 L 120 230 L 105 215 Z"],
  ["CO", "M 145 280 L 190 275 L 195 310 L 150 315 Z"],
  ["PE", "M 150 315 L 195 310 L 190 350 L 155 355 Z"],
  ["BR", "M 190 275 L 255 265 L 265 330 L 230 365 L 190 350 L 195 310 Z"],
  ["AR", "M 155 355 L 190 350 L 200 395 L 175 430 L 155 415 Z"],
  ["BO", "M 155 315 L 190 310 L 195 355 L 155 355 Z"],
  ["CL", "M 148 355 L 155 355 L 175 430 L 163 435 Z"],
  ["GB", "M 380 95 L 395 95 L 398 118 L 378 120 Z"],
  ["IE", "M 368 100 L 380 95 L 378 120 L 366 115 Z"],
  ["IS", "M 340 68 L 368 65 L 365 82 L 338 82 Z"],
  ["NO", "M 400 65 L 435 60 L 440 95 L 405 100 L 400 78 Z"],
  ["SE", "M 420 68 L 440 65 L 445 100 L 430 105 L 418 90 Z"],
  ["FI", "M 440 65 L 475 60 L 480 90 L 450 100 L 440 95 Z"],
  ["DK", "M 412 100 L 430 98 L 428 112 L 410 112 Z"],
  ["NL", "M 395 118 L 412 115 L 412 128 L 395 128 Z"],
  ["BE", "M 395 128 L 412 128 L 412 140 L 395 140 Z"],
  ["DE", "M 412 108 L 445 105 L 450 140 L 412 140 L 412 108 Z"],
  ["FR", "M 380 130 L 412 128 L 412 165 L 385 168 L 375 150 Z"],
  ["ES", "M 375 160 L 412 165 L 410 185 L 388 190 L 368 180 Z"],
  ["PT", "M 368 160 L 375 160 L 370 190 L 362 185 Z"],
  ["IT", "M 412 155 L 435 152 L 440 185 L 425 200 L 415 195 L 410 175 Z"],
  ["GR", "M 440 185 L 460 183 L 462 200 L 442 202 Z"],
  ["AT", "M 430 138 L 458 136 L 460 150 L 430 152 Z"],
  ["CH", "M 408 148 L 428 146 L 428 158 L 408 160 Z"],
  ["CZ", "M 435 128 L 460 126 L 462 140 L 435 140 Z"],
  ["SK", "M 460 128 L 478 126 L 480 138 L 460 140 Z"],
  ["PL", "M 440 110 L 478 108 L 480 128 L 440 130 Z"],
  ["HU", "M 455 148 L 480 146 L 482 160 L 455 162 Z"],
  ["RO", "M 460 155 L 490 152 L 492 175 L 460 177 Z"],
  ["UA", "M 460 130 L 510 126 L 515 160 L 460 162 L 460 150 Z"],
  ["RU", "M 450 60 L 700 58 L 705 135 L 520 140 L 480 110 L 450 100 Z"],
  ["TR", "M 472 182 L 530 178 L 535 200 L 472 202 Z"],
  ["IR", "M 530 175 L 580 170 L 585 210 L 530 215 Z"],
  ["SA", "M 505 215 L 560 210 L 562 252 L 510 255 Z"],
  ["KZ", "M 530 120 L 600 115 L 605 160 L 535 165 Z"],
  ["PK", "M 580 170 L 620 165 L 625 205 L 585 208 Z"],
  ["IN", "M 590 200 L 640 195 L 648 270 L 610 275 L 600 245 L 590 225 Z"],
  ["NP", "M 622 193 L 648 190 L 648 205 L 622 207 Z"],
  ["BD", "M 648 210 L 665 208 L 665 225 L 648 226 Z"],
  ["CN", "M 600 110 L 720 105 L 730 195 L 665 200 L 625 205 L 600 160 Z"],
  ["JP", "M 730 148 L 748 145 L 752 178 L 735 180 Z"],
  ["KR", "M 715 168 L 730 166 L 730 182 L 715 183 Z"],
  ["TH", "M 658 220 L 680 218 L 678 248 L 658 248 Z"],
  ["VN", "M 678 220 L 695 218 L 698 255 L 678 256 Z"],
  ["MY", "M 660 255 L 705 255 L 705 270 L 660 268 Z"],
  ["ID", "M 660 268 L 760 265 L 760 300 L 660 298 Z"],
  ["PH", "M 700 230 L 730 228 L 730 268 L 700 266 Z"],
  ["SG", "M 670 268 L 678 268 L 678 275 L 670 273 Z"],
  ["AU", "M 660 320 L 790 318 L 792 400 L 660 398 Z"],
  ["NZ", "M 800 358 L 820 355 L 822 400 L 800 402 Z"],
  ["ZA", "M 450 330 L 495 328 L 498 380 L 450 378 Z"],
  ["KE", "M 498 268 L 525 266 L 525 300 L 498 300 Z"],
  ["ET", "M 495 248 L 530 245 L 530 268 L 498 268 Z"],
  ["NG", "M 412 268 L 445 266 L 445 300 L 412 298 Z"],
  ["GH", "M 395 268 L 412 266 L 412 298 L 395 296 Z"],
  ["EG", "M 460 200 L 500 198 L 500 235 L 460 237 Z"],
  ["MA", "M 375 195 L 415 192 L 415 228 L 375 230 Z"],
];

export default function RadiationMap() {
  const [filterMode, setFilterMode] = useState<FilterMode>("total");
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(
    null,
  );
  const [hoveredCode, setHoveredCode] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    country: CountryData;
  } | null>(null);

  const dataByCode = useMemo(() => {
    const map: Record<string, CountryData> = {};
    for (const d of RADIATION_DATA) map[d.code] = d;
    return map;
  }, []);

  const getValue = (c: CountryData, mode: FilterMode) => c[mode];

  const WORLD_AVG = 2.4;

  const pieData = selectedCountry
    ? [
        { name: "Cosmic", value: selectedCountry.cosmic },
        { name: "Terrestrial", value: selectedCountry.terrestrial },
        { name: "Radon", value: selectedCountry.radon },
        { name: "Internal", value: selectedCountry.internal },
      ]
    : [
        { name: "Cosmic", value: 0.4 },
        { name: "Terrestrial", value: 0.48 },
        { name: "Radon", value: 1.15 },
        { name: "Internal", value: 0.29 },
      ];

  const barData = [...RADIATION_DATA]
    .sort((a, b) => b.total - a.total)
    .slice(0, 20)
    .map((c) => ({
      name: c.code,
      dose: getValue(c, filterMode),
      full: c.total,
    }));

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <PageHeader
            title="Real-Time Radiation Background Map"
            subtitle="Global natural background radiation levels by country — UNSCEAR 2008 dataset. Values represent annual effective dose from natural sources only (cosmic, terrestrial, radon, internal). Not live monitoring data."
            audienceLevel="intermediate"
          />
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <Badge
              variant="outline"
              className="border-yellow-500/50 text-yellow-400 bg-yellow-500/10"
            >
              <Info className="w-3 h-3 mr-1" />
              Natural Background Only
            </Badge>
            <Badge
              variant="outline"
              className="border-blue-500/50 text-blue-400 bg-blue-500/10"
            >
              <Globe className="w-3 h-3 mr-1" />
              60+ Countries
            </Badge>
            <Badge
              variant="outline"
              className="border-green-500/50 text-green-400 bg-green-500/10"
            >
              <Zap className="w-3 h-3 mr-1" />
              UNSCEAR 2008 Source
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 md:px-8 space-y-8">
        {/* Educational callout */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-950/40 border border-blue-700/40 rounded-xl p-4 md:p-5 flex gap-4"
        >
          <div className="text-blue-400 mt-0.5 shrink-0">
            <Info className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-blue-300">
              About Natural Background Radiation
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Every person on Earth is exposed to natural ionizing radiation
              from four sources:
              <strong className="text-foreground"> cosmic rays</strong> (from
              space, higher at altitude),
              <strong className="text-foreground">
                {" "}
                terrestrial radiation
              </strong>{" "}
              (from soil/rock minerals like uranium and thorium),
              <strong className="text-foreground"> radon gas</strong> (the
              dominant source — a radioactive gas that seeps from the ground
              into buildings), and{" "}
              <strong className="text-foreground">internal radiation</strong>{" "}
              (from K-40 and C-14 in food and water). The world average is{" "}
              <strong className="text-foreground">2.4 mSv/year</strong> (UNSCEAR
              2008). This map shows natural background only — it does NOT show
              real-time or live radiation monitoring data.
            </p>
          </div>
        </motion.div>

        {/* Filter toggle */}
        <div className="flex flex-wrap gap-2">
          {(Object.keys(FILTER_LABELS) as FilterMode[]).map((mode) => (
            <button
              key={mode}
              type="button"
              data-ocid={`radiation.filter.${mode}`}
              onClick={() => setFilterMode(mode)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 ${
                filterMode === mode
                  ? "border-transparent text-background shadow-md"
                  : "bg-muted/30 border-border text-muted-foreground hover:border-border hover:text-foreground"
              }`}
              style={
                filterMode === mode
                  ? { backgroundColor: FILTER_COLORS[mode] }
                  : {}
              }
            >
              {FILTER_LABELS[mode]}
            </button>
          ))}
        </div>

        {/* Main grid: Map + Detail panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* SVG Choropleth Map */}
          <div className="lg:col-span-2 bg-card border border-border rounded-2xl overflow-hidden">
            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">
                Choropleth — {FILTER_LABELS[filterMode]}
              </span>
              <span className="text-xs text-muted-foreground">
                Click country for details
              </span>
            </div>
            <div className="relative" data-ocid="radiation.map">
              <svg
                viewBox="0 0 880 460"
                className="w-full h-auto"
                style={{ background: "oklch(0.14 0.02 240)" }}
                aria-label="Global radiation dose map"
                role="img"
              >
                <title>Global radiation dose map</title>
                {/* Ocean background */}
                <rect width="880" height="460" fill="oklch(0.14 0.02 240)" />
                {/* Grid lines (latitude/longitude suggestion) */}
                {[0, 115, 230, 345, 460].map((y) => (
                  <line
                    key={y}
                    x1="0"
                    y1={y}
                    x2="880"
                    y2={y}
                    stroke="oklch(0.25 0.01 240)"
                    strokeWidth="0.5"
                  />
                ))}
                {[0, 110, 220, 330, 440, 550, 660, 770, 880].map((x) => (
                  <line
                    key={x}
                    x1={x}
                    y1="0"
                    x2={x}
                    y2="460"
                    stroke="oklch(0.25 0.01 240)"
                    strokeWidth="0.5"
                  />
                ))}

                {/* Country paths */}
                {COUNTRY_PATHS.map(([code, path]) => {
                  const country = dataByCode[code];
                  if (!country) return null;
                  const val = getValue(country, filterMode);
                  const fill = getDoseColor(val, filterMode);
                  const isHovered = hoveredCode === code;
                  const isSelected = selectedCountry?.code === code;
                  return (
                    <path
                      key={code}
                      d={path}
                      fill={fill}
                      fillOpacity={isSelected ? 1 : isHovered ? 0.9 : 0.7}
                      stroke={
                        isSelected
                          ? "white"
                          : isHovered
                            ? "rgba(255,255,255,0.6)"
                            : "oklch(0.30 0.01 240)"
                      }
                      strokeWidth={isSelected ? 2 : isHovered ? 1.5 : 0.8}
                      style={{
                        cursor: "pointer",
                        transition: "fill-opacity 0.15s, stroke-width 0.15s",
                      }}
                      onMouseEnter={(e) => {
                        setHoveredCode(code);
                        const rect = (
                          e.currentTarget.ownerSVGElement as SVGSVGElement
                        ).getBoundingClientRect();
                        const svgX = e.clientX - rect.left;
                        const svgY = e.clientY - rect.top;
                        setTooltip({ x: svgX, y: svgY, country });
                      }}
                      onMouseLeave={() => {
                        setHoveredCode(null);
                        setTooltip(null);
                      }}
                      onClick={() => setSelectedCountry(country)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && setSelectedCountry(country)
                      }
                      tabIndex={0}
                      data-ocid={`radiation.country.${code.toLowerCase()}`}
                    />
                  );
                })}

                {/* Country labels for larger regions */}
                {[
                  ["US", 140, 158],
                  ["CA", 145, 100],
                  ["RU", 575, 100],
                  ["CN", 660, 155],
                  ["BR", 220, 315],
                  ["AU", 720, 358],
                  ["IN", 615, 238],
                ].map(([code, x, y]) => {
                  const country = dataByCode[code as string];
                  if (!country) return null;
                  return (
                    <text
                      key={code as string}
                      x={x as number}
                      y={y as number}
                      fontSize="9"
                      fill="rgba(255,255,255,0.75)"
                      textAnchor="middle"
                      pointerEvents="none"
                    >
                      {code as string}
                    </text>
                  );
                })}
              </svg>

              {/* SVG tooltip overlay */}
              <AnimatePresence>
                {tooltip && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="pointer-events-none absolute z-20 bg-popover border border-border rounded-lg px-3 py-2 shadow-xl text-xs"
                    style={{
                      left: tooltip.x + 12,
                      top: tooltip.y - 40,
                      minWidth: 180,
                    }}
                  >
                    <div className="font-semibold text-foreground">
                      {tooltip.country.name}
                    </div>
                    <div className="text-muted-foreground mt-0.5">
                      {filterMode === "total"
                        ? "Total"
                        : FILTER_LABELS[filterMode]}
                      :
                      <span className="ml-1 font-bold text-foreground">
                        {getValue(tooltip.country, filterMode).toFixed(2)} mSv/y
                      </span>
                    </div>
                    {filterMode === "total" && (
                      <div className="text-muted-foreground">
                        vs world avg:
                        <span
                          className={`ml-1 font-semibold ${tooltip.country.total > WORLD_AVG ? "text-orange-400" : "text-green-400"}`}
                        >
                          {tooltip.country.total > WORLD_AVG ? "+" : ""}
                          {(tooltip.country.total - WORLD_AVG).toFixed(2)} mSv/y
                        </span>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Color scale legend */}
            <div className="px-4 py-3 border-t border-border flex flex-wrap items-center gap-4">
              <span className="text-xs text-muted-foreground font-medium">
                Scale (mSv/y):
              </span>
              {[
                { label: "Low (<2)", color: "#4ade80" },
                { label: "Moderate (2–3)", color: "#86efac" },
                { label: "Elevated (3–4)", color: "#facc15" },
                { label: "High (4–5)", color: "#fb923c" },
                { label: "Very High (>5)", color: "#ef4444" },
              ].map(({ label, color }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <div
                    className="w-3 h-3 rounded-sm"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Country detail / source breakdown */}
          <div className="space-y-4">
            <AnimatePresence mode="wait">
              {selectedCountry ? (
                <motion.div
                  key={selectedCountry.code}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-card border border-border rounded-2xl overflow-hidden"
                  data-ocid="radiation.detail_panel"
                >
                  <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                    <div>
                      <span className="text-sm font-bold text-foreground">
                        {selectedCountry.name}
                      </span>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        Population:{" "}
                        {selectedCountry.population >= 100
                          ? `${Math.round(selectedCountry.population)}M`
                          : `${selectedCountry.population.toFixed(1)}M`}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedCountry(null)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      data-ocid="radiation.close_button"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-4 space-y-4">
                    {/* Total dose badge */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Total Background Dose
                      </span>
                      <span
                        className="text-lg font-bold"
                        style={{
                          color: getDoseColor(selectedCountry.total, "total"),
                        }}
                      >
                        {selectedCountry.total.toFixed(1)} mSv/y
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground leading-relaxed">
                      {selectedCountry.notes}
                    </div>

                    {/* Breakdown bars */}
                    <div className="space-y-2">
                      {(
                        ["cosmic", "terrestrial", "radon", "internal"] as const
                      ).map((src, i) => (
                        <div key={src}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-muted-foreground capitalize">
                              {src}
                            </span>
                            <span className="text-foreground font-medium">
                              {selectedCountry[src].toFixed(2)} mSv/y
                            </span>
                          </div>
                          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{
                                width: `${(selectedCountry[src] / selectedCountry.total) * 100}%`,
                              }}
                              transition={{ duration: 0.5, delay: i * 0.08 }}
                              className="h-full rounded-full"
                              style={{ backgroundColor: PIE_COLORS[i] }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Pie chart */}
                    <div className="h-44">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={pieData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={68}
                            paddingAngle={3}
                            label={({ name, percent }) =>
                              `${name} ${(percent * 100).toFixed(0)}%`
                            }
                            labelLine={false}
                          >
                            {pieData.map((entry, idx) => (
                              <Cell
                                key={entry.name ?? String(idx)}
                                fill={PIE_COLORS[idx % PIE_COLORS.length]}
                              />
                            ))}
                          </Pie>
                          <RechartsTooltip
                            contentStyle={{
                              background: "oklch(0.18 0.02 240)",
                              border: "1px solid oklch(0.30 0.01 240)",
                              borderRadius: 8,
                              fontSize: 11,
                            }}
                            formatter={(value: number) => [
                              `${value.toFixed(2)} mSv/y`,
                            ]}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    {/* vs world avg */}
                    <div
                      className={`rounded-lg px-3 py-2 text-xs text-center ${
                        selectedCountry.total > WORLD_AVG
                          ? "bg-orange-950/40 border border-orange-700/30 text-orange-300"
                          : "bg-green-950/40 border border-green-700/30 text-green-300"
                      }`}
                    >
                      {selectedCountry.total > WORLD_AVG
                        ? `${((selectedCountry.total / WORLD_AVG - 1) * 100).toFixed(0)}% above world average (${WORLD_AVG} mSv/y)`
                        : `${((1 - selectedCountry.total / WORLD_AVG) * 100).toFixed(0)}% below world average (${WORLD_AVG} mSv/y)`}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-card border border-border rounded-2xl p-6 text-center"
                  data-ocid="radiation.empty_state"
                >
                  <Globe className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm font-medium text-foreground">
                    Select a Country
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Click any country on the map to see a full radiation source
                    breakdown and comparison to the world average.
                  </p>
                  {/* World avg pie */}
                  <div className="mt-4">
                    <p className="text-xs text-muted-foreground mb-2">
                      World average breakdown (2.4 mSv/y)
                    </p>
                    <div className="h-36">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={pieData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={32}
                            outerRadius={54}
                            paddingAngle={3}
                          >
                            {pieData.map((entry, idx) => (
                              <Cell
                                key={`bar-${entry.name ?? idx}`}
                                fill={PIE_COLORS[idx % PIE_COLORS.length]}
                              />
                            ))}
                          </Pie>
                          <RechartsTooltip
                            contentStyle={{
                              background: "oklch(0.18 0.02 240)",
                              border: "1px solid oklch(0.30 0.01 240)",
                              borderRadius: 8,
                              fontSize: 11,
                            }}
                            formatter={(value: number) => [
                              `${value.toFixed(2)} mSv/y`,
                            ]}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 mt-1">
                      {["Cosmic", "Terrestrial", "Radon", "Internal"].map(
                        (s, i) => (
                          <div key={s} className="flex items-center gap-1">
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: PIE_COLORS[i] }}
                            />
                            <span className="text-xs text-muted-foreground">
                              {s}
                            </span>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Top 20 Countries Bar Chart */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="text-sm font-semibold text-foreground">
              Top 20 Countries by {FILTER_LABELS[filterMode]}
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Sorted descending. World average dashed line.
            </p>
          </div>
          <div className="p-4" style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barData}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(0.25 0.01 240)"
                />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 10, fill: "oklch(0.60 0 0)" }}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "oklch(0.60 0 0)" }}
                  unit=" mSv"
                />
                <RechartsTooltip
                  contentStyle={{
                    background: "oklch(0.18 0.02 240)",
                    border: "1px solid oklch(0.30 0.01 240)",
                    borderRadius: 8,
                    fontSize: 11,
                  }}
                  formatter={(value: number) => [
                    `${value.toFixed(2)} mSv/y`,
                    FILTER_LABELS[filterMode],
                  ]}
                />
                <ReferenceLine
                  y={WORLD_AVG}
                  stroke="#60a5fa"
                  strokeDasharray="4 3"
                  label={{
                    value: "World avg",
                    position: "insideTopRight",
                    fontSize: 10,
                    fill: "#60a5fa",
                  }}
                />
                <Bar dataKey="dose" radius={[3, 3, 0, 0]}>
                  {barData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={
                        selectedCountry?.code === entry.name
                          ? "white"
                          : getDoseColor(entry.dose, filterMode)
                      }
                      fillOpacity={
                        selectedCountry?.code === entry.name ? 1 : 0.85
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Dose Context Scale */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h2 className="text-sm font-semibold text-foreground">
              Dose Reference Scale (ALARA Framework)
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Context for radiation doses. ALARA = As Low As Reasonably
              Achievable.
            </p>
          </div>
          <div className="p-4 md:p-5">
            <div className="space-y-2">
              {DOSE_CONTEXT.map((item) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`flex items-center gap-3 py-2 px-3 rounded-lg ${
                    item.highlight
                      ? "bg-blue-950/40 border border-blue-700/30"
                      : ""
                  }`}
                  data-ocid={`radiation.dose_ref.${item.label.toLowerCase().replace(/[^a-z0-9]+/g, "_")}`}
                >
                  <div
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <span
                      className={`text-sm ${
                        item.highlight
                          ? "font-semibold text-foreground"
                          : "text-muted-foreground"
                      } truncate`}
                    >
                      {item.label}
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <span
                      className="text-sm font-mono font-medium"
                      style={{ color: item.color }}
                    >
                      {item.dose >= 1
                        ? `${item.dose} mSv`
                        : `${(item.dose * 1000).toFixed(1)} μSv`}
                    </span>
                  </div>
                  {/* Log-scale bar */}
                  <div className="w-32 h-2 bg-muted rounded-full overflow-hidden shrink-0">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(100, ((Math.log10(item.dose + 0.001) + 3) / 6) * 100)}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4 leading-relaxed border-t border-border pt-4">
              <strong className="text-foreground">ALARA principle:</strong>{" "}
              Radiation protection follows the ALARA principle — doses should be
              kept As Low As Reasonably Achievable. Natural background radiation
              (world average 2.4 mSv/y) is unavoidable, but occupational and
              medical exposures are optimized to minimize unnecessary risk. The
              Linear No-Threshold (LNT) model used in radiation protection
              conservatively assumes no safe threshold exists, though evidence
              for harm at low doses (&lt;100 mSv) remains limited.
            </p>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-foreground">
                Full Dataset — All Countries
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Source: UNSCEAR 2008 Report, Annex B. Values in mSv/year.
              </p>
            </div>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs" data-ocid="radiation.table">
              <thead>
                <tr className="bg-muted/30 border-b border-border">
                  {[
                    "Country",
                    "Total (mSv/y)",
                    "Cosmic",
                    "Terrestrial",
                    "Radon",
                    "Internal",
                    "Notes",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-2.5 text-left text-muted-foreground font-semibold whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...RADIATION_DATA]
                  .sort((a, b) => b.total - a.total)
                  .map((c, i) => (
                    <tr
                      key={`${c.code}-${i}`}
                      className={`border-b border-border/50 cursor-pointer transition-colors ${
                        selectedCountry?.code === c.code
                          ? "bg-primary/10"
                          : "hover:bg-muted/20"
                      }`}
                      onClick={() => setSelectedCountry(c)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && setSelectedCountry(c)
                      }
                      tabIndex={0}
                      data-ocid={`radiation.table_row.${i + 1}`}
                    >
                      <td className="px-4 py-2 font-medium text-foreground">
                        <span className="inline-flex items-center gap-2">
                          <span className="font-mono text-muted-foreground text-[10px]">
                            {c.code}
                          </span>
                          {c.name}
                        </span>
                      </td>
                      <td
                        className="px-4 py-2 text-right font-bold"
                        style={{ color: getDoseColor(c.total, "total") }}
                      >
                        {c.total.toFixed(1)}
                      </td>
                      <td className="px-4 py-2 text-right text-muted-foreground">
                        {c.cosmic.toFixed(2)}
                      </td>
                      <td className="px-4 py-2 text-right text-muted-foreground">
                        {c.terrestrial.toFixed(2)}
                      </td>
                      <td
                        className="px-4 py-2 text-right"
                        style={{ color: "#fb923c" }}
                      >
                        {c.radon.toFixed(2)}
                      </td>
                      <td className="px-4 py-2 text-right text-muted-foreground">
                        {c.internal.toFixed(2)}
                      </td>
                      <td className="px-4 py-2 text-muted-foreground max-w-xs truncate">
                        {c.notes}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer citation */}
        <div className="text-xs text-muted-foreground border-t border-border pt-6 pb-2 space-y-1">
          <p>
            <strong className="text-foreground">Data source:</strong> UNSCEAR
            2008 Report, Volume I, Annex B: Exposures from natural radiation
            sources. United Nations Scientific Committee on the Effects of
            Atomic Radiation.
          </p>
          <p>
            <strong className="text-foreground">Disclaimer:</strong> This tool
            displays estimated annual average natural background radiation
            levels. Individual doses vary significantly based on altitude,
            building type, diet, and local geology. This is NOT a live radiation
            monitoring system.
          </p>
          <p className="pt-1">
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              className="underline hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
