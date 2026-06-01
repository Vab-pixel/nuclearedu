import { AudienceBadge } from "@/components/AudienceBadge";
import { PageHeader } from "@/components/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { IsotopeRecord } from "@/types/isotopes";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

// ─── Static element data ────────────────────────────────────────────────────
interface ElementInfo {
  z: number;
  symbol: string;
  name: string;
  block: "s" | "p" | "d" | "f";
  group: number;
  period: number;
}

const ELEMENTS: ElementInfo[] = [
  { z: 1, symbol: "H", name: "Hydrogen", block: "s", group: 1, period: 1 },
  { z: 2, symbol: "He", name: "Helium", block: "s", group: 18, period: 1 },
  { z: 3, symbol: "Li", name: "Lithium", block: "s", group: 1, period: 2 },
  { z: 4, symbol: "Be", name: "Beryllium", block: "s", group: 2, period: 2 },
  { z: 5, symbol: "B", name: "Boron", block: "p", group: 13, period: 2 },
  { z: 6, symbol: "C", name: "Carbon", block: "p", group: 14, period: 2 },
  { z: 7, symbol: "N", name: "Nitrogen", block: "p", group: 15, period: 2 },
  { z: 8, symbol: "O", name: "Oxygen", block: "p", group: 16, period: 2 },
  { z: 9, symbol: "F", name: "Fluorine", block: "p", group: 17, period: 2 },
  { z: 10, symbol: "Ne", name: "Neon", block: "p", group: 18, period: 2 },
  { z: 11, symbol: "Na", name: "Sodium", block: "s", group: 1, period: 3 },
  { z: 12, symbol: "Mg", name: "Magnesium", block: "s", group: 2, period: 3 },
  { z: 13, symbol: "Al", name: "Aluminium", block: "p", group: 13, period: 3 },
  { z: 14, symbol: "Si", name: "Silicon", block: "p", group: 14, period: 3 },
  { z: 15, symbol: "P", name: "Phosphorus", block: "p", group: 15, period: 3 },
  { z: 16, symbol: "S", name: "Sulfur", block: "p", group: 16, period: 3 },
  { z: 17, symbol: "Cl", name: "Chlorine", block: "p", group: 17, period: 3 },
  { z: 18, symbol: "Ar", name: "Argon", block: "p", group: 18, period: 3 },
  { z: 19, symbol: "K", name: "Potassium", block: "s", group: 1, period: 4 },
  { z: 20, symbol: "Ca", name: "Calcium", block: "s", group: 2, period: 4 },
  { z: 21, symbol: "Sc", name: "Scandium", block: "d", group: 3, period: 4 },
  { z: 22, symbol: "Ti", name: "Titanium", block: "d", group: 4, period: 4 },
  { z: 23, symbol: "V", name: "Vanadium", block: "d", group: 5, period: 4 },
  { z: 24, symbol: "Cr", name: "Chromium", block: "d", group: 6, period: 4 },
  { z: 25, symbol: "Mn", name: "Manganese", block: "d", group: 7, period: 4 },
  { z: 26, symbol: "Fe", name: "Iron", block: "d", group: 8, period: 4 },
  { z: 27, symbol: "Co", name: "Cobalt", block: "d", group: 9, period: 4 },
  { z: 28, symbol: "Ni", name: "Nickel", block: "d", group: 10, period: 4 },
  { z: 29, symbol: "Cu", name: "Copper", block: "d", group: 11, period: 4 },
  { z: 30, symbol: "Zn", name: "Zinc", block: "d", group: 12, period: 4 },
  { z: 31, symbol: "Ga", name: "Gallium", block: "p", group: 13, period: 4 },
  { z: 32, symbol: "Ge", name: "Germanium", block: "p", group: 14, period: 4 },
  { z: 33, symbol: "As", name: "Arsenic", block: "p", group: 15, period: 4 },
  { z: 34, symbol: "Se", name: "Selenium", block: "p", group: 16, period: 4 },
  { z: 35, symbol: "Br", name: "Bromine", block: "p", group: 17, period: 4 },
  { z: 36, symbol: "Kr", name: "Krypton", block: "p", group: 18, period: 4 },
  { z: 37, symbol: "Rb", name: "Rubidium", block: "s", group: 1, period: 5 },
  { z: 38, symbol: "Sr", name: "Strontium", block: "s", group: 2, period: 5 },
  { z: 39, symbol: "Y", name: "Yttrium", block: "d", group: 3, period: 5 },
  { z: 40, symbol: "Zr", name: "Zirconium", block: "d", group: 4, period: 5 },
  { z: 41, symbol: "Nb", name: "Niobium", block: "d", group: 5, period: 5 },
  { z: 42, symbol: "Mo", name: "Molybdenum", block: "d", group: 6, period: 5 },
  { z: 43, symbol: "Tc", name: "Technetium", block: "d", group: 7, period: 5 },
  { z: 44, symbol: "Ru", name: "Ruthenium", block: "d", group: 8, period: 5 },
  { z: 45, symbol: "Rh", name: "Rhodium", block: "d", group: 9, period: 5 },
  { z: 46, symbol: "Pd", name: "Palladium", block: "d", group: 10, period: 5 },
  { z: 47, symbol: "Ag", name: "Silver", block: "d", group: 11, period: 5 },
  { z: 48, symbol: "Cd", name: "Cadmium", block: "d", group: 12, period: 5 },
  { z: 49, symbol: "In", name: "Indium", block: "p", group: 13, period: 5 },
  { z: 50, symbol: "Sn", name: "Tin", block: "p", group: 14, period: 5 },
  { z: 51, symbol: "Sb", name: "Antimony", block: "p", group: 15, period: 5 },
  { z: 52, symbol: "Te", name: "Tellurium", block: "p", group: 16, period: 5 },
  { z: 53, symbol: "I", name: "Iodine", block: "p", group: 17, period: 5 },
  { z: 54, symbol: "Xe", name: "Xenon", block: "p", group: 18, period: 5 },
  { z: 55, symbol: "Cs", name: "Caesium", block: "s", group: 1, period: 6 },
  { z: 56, symbol: "Ba", name: "Barium", block: "s", group: 2, period: 6 },
  { z: 57, symbol: "La", name: "Lanthanum", block: "f", group: 3, period: 6 },
  { z: 58, symbol: "Ce", name: "Cerium", block: "f", group: 4, period: 6 },
  {
    z: 59,
    symbol: "Pr",
    name: "Praseodymium",
    block: "f",
    group: 5,
    period: 6,
  },
  { z: 60, symbol: "Nd", name: "Neodymium", block: "f", group: 6, period: 6 },
  { z: 61, symbol: "Pm", name: "Promethium", block: "f", group: 7, period: 6 },
  { z: 62, symbol: "Sm", name: "Samarium", block: "f", group: 8, period: 6 },
  { z: 63, symbol: "Eu", name: "Europium", block: "f", group: 9, period: 6 },
  { z: 64, symbol: "Gd", name: "Gadolinium", block: "f", group: 10, period: 6 },
  { z: 65, symbol: "Tb", name: "Terbium", block: "f", group: 11, period: 6 },
  { z: 66, symbol: "Dy", name: "Dysprosium", block: "f", group: 12, period: 6 },
  { z: 67, symbol: "Ho", name: "Holmium", block: "f", group: 13, period: 6 },
  { z: 68, symbol: "Er", name: "Erbium", block: "f", group: 14, period: 6 },
  { z: 69, symbol: "Tm", name: "Thulium", block: "f", group: 15, period: 6 },
  { z: 70, symbol: "Yb", name: "Ytterbium", block: "f", group: 16, period: 6 },
  { z: 71, symbol: "Lu", name: "Lutetium", block: "f", group: 17, period: 6 },
  { z: 72, symbol: "Hf", name: "Hafnium", block: "d", group: 4, period: 6 },
  { z: 73, symbol: "Ta", name: "Tantalum", block: "d", group: 5, period: 6 },
  { z: 74, symbol: "W", name: "Tungsten", block: "d", group: 6, period: 6 },
  { z: 75, symbol: "Re", name: "Rhenium", block: "d", group: 7, period: 6 },
  { z: 76, symbol: "Os", name: "Osmium", block: "d", group: 8, period: 6 },
  { z: 77, symbol: "Ir", name: "Iridium", block: "d", group: 9, period: 6 },
  { z: 78, symbol: "Pt", name: "Platinum", block: "d", group: 10, period: 6 },
  { z: 79, symbol: "Au", name: "Gold", block: "d", group: 11, period: 6 },
  { z: 80, symbol: "Hg", name: "Mercury", block: "d", group: 12, period: 6 },
  { z: 81, symbol: "Tl", name: "Thallium", block: "p", group: 13, period: 6 },
  { z: 82, symbol: "Pb", name: "Lead", block: "p", group: 14, period: 6 },
  { z: 83, symbol: "Bi", name: "Bismuth", block: "p", group: 15, period: 6 },
  { z: 84, symbol: "Po", name: "Polonium", block: "p", group: 16, period: 6 },
  { z: 85, symbol: "At", name: "Astatine", block: "p", group: 17, period: 6 },
  { z: 86, symbol: "Rn", name: "Radon", block: "p", group: 18, period: 6 },
  { z: 87, symbol: "Fr", name: "Francium", block: "s", group: 1, period: 7 },
  { z: 88, symbol: "Ra", name: "Radium", block: "s", group: 2, period: 7 },
  { z: 89, symbol: "Ac", name: "Actinium", block: "f", group: 3, period: 7 },
  { z: 90, symbol: "Th", name: "Thorium", block: "f", group: 4, period: 7 },
  {
    z: 91,
    symbol: "Pa",
    name: "Protactinium",
    block: "f",
    group: 5,
    period: 7,
  },
  { z: 92, symbol: "U", name: "Uranium", block: "f", group: 6, period: 7 },
  { z: 93, symbol: "Np", name: "Neptunium", block: "f", group: 7, period: 7 },
  { z: 94, symbol: "Pu", name: "Plutonium", block: "f", group: 8, period: 7 },
  { z: 95, symbol: "Am", name: "Americium", block: "f", group: 9, period: 7 },
  { z: 96, symbol: "Cm", name: "Curium", block: "f", group: 10, period: 7 },
  { z: 97, symbol: "Bk", name: "Berkelium", block: "f", group: 11, period: 7 },
  {
    z: 98,
    symbol: "Cf",
    name: "Californium",
    block: "f",
    group: 12,
    period: 7,
  },
  {
    z: 99,
    symbol: "Es",
    name: "Einsteinium",
    block: "f",
    group: 13,
    period: 7,
  },
  { z: 100, symbol: "Fm", name: "Fermium", block: "f", group: 14, period: 7 },
  {
    z: 101,
    symbol: "Md",
    name: "Mendelevium",
    block: "f",
    group: 15,
    period: 7,
  },
  { z: 102, symbol: "No", name: "Nobelium", block: "f", group: 16, period: 7 },
  {
    z: 103,
    symbol: "Lr",
    name: "Lawrencium",
    block: "f",
    group: 17,
    period: 7,
  },
  {
    z: 104,
    symbol: "Rf",
    name: "Rutherfordium",
    block: "d",
    group: 4,
    period: 7,
  },
  { z: 105, symbol: "Db", name: "Dubnium", block: "d", group: 5, period: 7 },
  { z: 106, symbol: "Sg", name: "Seaborgium", block: "d", group: 6, period: 7 },
  { z: 107, symbol: "Bh", name: "Bohrium", block: "d", group: 7, period: 7 },
  { z: 108, symbol: "Hs", name: "Hassium", block: "d", group: 8, period: 7 },
  { z: 109, symbol: "Mt", name: "Meitnerium", block: "d", group: 9, period: 7 },
  {
    z: 110,
    symbol: "Ds",
    name: "Darmstadtium",
    block: "d",
    group: 10,
    period: 7,
  },
  {
    z: 111,
    symbol: "Rg",
    name: "Roentgenium",
    block: "d",
    group: 11,
    period: 7,
  },
  {
    z: 112,
    symbol: "Cn",
    name: "Copernicium",
    block: "d",
    group: 12,
    period: 7,
  },
  { z: 113, symbol: "Nh", name: "Nihonium", block: "p", group: 13, period: 7 },
  { z: 114, symbol: "Fl", name: "Flerovium", block: "p", group: 14, period: 7 },
  { z: 115, symbol: "Mc", name: "Moscovium", block: "p", group: 15, period: 7 },
  {
    z: 116,
    symbol: "Lv",
    name: "Livermorium",
    block: "p",
    group: 16,
    period: 7,
  },
  {
    z: 117,
    symbol: "Ts",
    name: "Tennessine",
    block: "p",
    group: 17,
    period: 7,
  },
  { z: 118, symbol: "Og", name: "Oganesson", block: "p", group: 18, period: 7 },
];

// ─── Static fallback isotope data ────────────────────────────────────────────
const FALLBACK_ISOTOPES: Record<number, IsotopeRecord[]> = {
  6: [
    {
      z: 6,
      n: 6,
      symbol: "C",
      name: "Carbon",
      halfLifeSeconds: -1,
      decayModes: ["stable"],
      qValueMeV: 0,
      bindingEnergyPerNucleon: 7.68,
      massExcessKeV: 0,
      atomicMassAMU: 12.0,
      abundance: 98.93,
      branchingRatios: [1],
      lastUpdated: new Date().toISOString(),
      sourceUri: "local",
    },
    {
      z: 6,
      n: 7,
      symbol: "C",
      name: "Carbon",
      halfLifeSeconds: -1,
      decayModes: ["stable"],
      qValueMeV: 0,
      bindingEnergyPerNucleon: 7.47,
      massExcessKeV: 3353,
      atomicMassAMU: 13.003355,
      abundance: 1.07,
      branchingRatios: [1],
      lastUpdated: new Date().toISOString(),
      sourceUri: "local",
    },
    {
      z: 6,
      n: 8,
      symbol: "C",
      name: "Carbon",
      halfLifeSeconds: 1.81e11,
      decayModes: ["β−"],
      qValueMeV: 0.156,
      bindingEnergyPerNucleon: 7.52,
      massExcessKeV: 3241,
      atomicMassAMU: 14.003242,
      abundance: 0,
      branchingRatios: [1],
      lastUpdated: new Date().toISOString(),
      sourceUri: "local",
    },
  ],
  27: [
    {
      z: 27,
      n: 32,
      symbol: "Co",
      name: "Cobalt",
      halfLifeSeconds: -1,
      decayModes: ["stable"],
      qValueMeV: 0,
      bindingEnergyPerNucleon: 8.768,
      massExcessKeV: -62227,
      atomicMassAMU: 58.933195,
      abundance: 100,
      branchingRatios: [1],
      lastUpdated: new Date().toISOString(),
      sourceUri: "local",
    },
    {
      z: 27,
      n: 33,
      symbol: "Co",
      name: "Cobalt",
      halfLifeSeconds: 1.66e8,
      decayModes: ["β−", "γ"],
      qValueMeV: 2.824,
      bindingEnergyPerNucleon: 8.747,
      massExcessKeV: -61649,
      atomicMassAMU: 59.93382,
      abundance: 0,
      branchingRatios: [0.999, 0.999],
      lastUpdated: new Date().toISOString(),
      sourceUri: "local",
    },
    {
      z: 27,
      n: 34,
      symbol: "Co",
      name: "Cobalt",
      halfLifeSeconds: 5.27,
      decayModes: ["EC", "β+"],
      qValueMeV: 4.566,
      bindingEnergyPerNucleon: 8.7,
      massExcessKeV: -61319,
      atomicMassAMU: 60.932479,
      abundance: 0,
      branchingRatios: [0.86, 0.14],
      lastUpdated: new Date().toISOString(),
      sourceUri: "local",
    },
  ],
  43: [
    {
      z: 43,
      n: 56,
      symbol: "Tc",
      name: "Technetium",
      halfLifeSeconds: 2.163e4,
      decayModes: ["IT", "γ"],
      qValueMeV: 0.143,
      bindingEnergyPerNucleon: 8.622,
      massExcessKeV: -87183,
      atomicMassAMU: 98.906255,
      abundance: 0,
      branchingRatios: [0.8812, 0.8812],
      lastUpdated: new Date().toISOString(),
      sourceUri: "local",
    },
    {
      z: 43,
      n: 56,
      symbol: "Tc",
      name: "Technetium",
      halfLifeSeconds: 1.88e13,
      decayModes: ["β−"],
      qValueMeV: 0.294,
      bindingEnergyPerNucleon: 8.622,
      massExcessKeV: -87323,
      atomicMassAMU: 98.906254,
      abundance: 0,
      branchingRatios: [1],
      lastUpdated: new Date().toISOString(),
      sourceUri: "local",
    },
  ],
  53: [
    {
      z: 53,
      n: 74,
      symbol: "I",
      name: "Iodine",
      halfLifeSeconds: -1,
      decayModes: ["stable"],
      qValueMeV: 0,
      bindingEnergyPerNucleon: 8.434,
      massExcessKeV: -88984,
      atomicMassAMU: 126.904473,
      abundance: 100,
      branchingRatios: [1],
      lastUpdated: new Date().toISOString(),
      sourceUri: "local",
    },
    {
      z: 53,
      n: 78,
      symbol: "I",
      name: "Iodine",
      halfLifeSeconds: 6.953e5,
      decayModes: ["β−", "γ"],
      qValueMeV: 0.971,
      bindingEnergyPerNucleon: 8.418,
      massExcessKeV: -88441,
      atomicMassAMU: 130.906126,
      abundance: 0,
      branchingRatios: [1, 0.812],
      lastUpdated: new Date().toISOString(),
      sourceUri: "local",
    },
  ],
  55: [
    {
      z: 55,
      n: 78,
      symbol: "Cs",
      name: "Caesium",
      halfLifeSeconds: -1,
      decayModes: ["stable"],
      qValueMeV: 0,
      bindingEnergyPerNucleon: 8.403,
      massExcessKeV: -88071,
      atomicMassAMU: 132.905452,
      abundance: 100,
      branchingRatios: [1],
      lastUpdated: new Date().toISOString(),
      sourceUri: "local",
    },
    {
      z: 55,
      n: 82,
      symbol: "Cs",
      name: "Caesium",
      halfLifeSeconds: 9.499e8,
      decayModes: ["β−", "γ"],
      qValueMeV: 1.176,
      bindingEnergyPerNucleon: 8.39,
      massExcessKeV: -86895,
      atomicMassAMU: 136.90709,
      abundance: 0,
      branchingRatios: [1, 0.9499],
      lastUpdated: new Date().toISOString(),
      sourceUri: "local",
    },
  ],
  92: [
    {
      z: 92,
      n: 143,
      symbol: "U",
      name: "Uranium",
      halfLifeSeconds: 2.2e16,
      decayModes: ["α"],
      qValueMeV: 4.27,
      bindingEnergyPerNucleon: 7.591,
      massExcessKeV: 36914,
      atomicMassAMU: 235.04393,
      abundance: 0.72,
      branchingRatios: [1],
      lastUpdated: new Date().toISOString(),
      sourceUri: "local",
    },
    {
      z: 92,
      n: 146,
      symbol: "U",
      name: "Uranium",
      halfLifeSeconds: 1.41e17,
      decayModes: ["α"],
      qValueMeV: 4.27,
      bindingEnergyPerNucleon: 7.6,
      massExcessKeV: 40921,
      atomicMassAMU: 238.050788,
      abundance: 99.27,
      branchingRatios: [1],
      lastUpdated: new Date().toISOString(),
      sourceUri: "local",
    },
  ],
  94: [
    {
      z: 94,
      n: 145,
      symbol: "Pu",
      name: "Plutonium",
      halfLifeSeconds: 7.25e11,
      decayModes: ["α", "SF"],
      qValueMeV: 5.157,
      bindingEnergyPerNucleon: 7.56,
      massExcessKeV: 45970,
      atomicMassAMU: 238.04956,
      abundance: 0,
      branchingRatios: [1, 1.8e-7],
      lastUpdated: new Date().toISOString(),
      sourceUri: "local",
    },
    {
      z: 94,
      n: 146,
      symbol: "Pu",
      name: "Plutonium",
      halfLifeSeconds: 7.76e11,
      decayModes: ["α", "SF"],
      qValueMeV: 5.244,
      bindingEnergyPerNucleon: 7.568,
      massExcessKeV: 48590,
      atomicMassAMU: 239.052163,
      abundance: 0,
      branchingRatios: [1, 3e-10],
      lastUpdated: new Date().toISOString(),
      sourceUri: "local",
    },
  ],
};

// ─── Energy levels for key isotopes ──────────────────────────────────────────
interface EnergyLevel {
  energyMeV: number;
  spinParity: string;
  halfLife?: string;
  decayMode?: string;
}

const ENERGY_LEVELS: Record<string, EnergyLevel[]> = {
  "Co-60": [
    { energyMeV: 0, spinParity: "5+", halfLife: "5.27 y", decayMode: "β−" },
    { energyMeV: 0.0586, spinParity: "2+" },
    {
      energyMeV: 1.3325,
      spinParity: "2+",
      halfLife: "10.47 min",
      decayMode: "IT",
    },
    { energyMeV: 2.1585, spinParity: "4+" },
    { energyMeV: 2.5057, spinParity: "2+" },
    { energyMeV: 2.8236, spinParity: "4+" },
  ],
  "I-131": [
    { energyMeV: 0, spinParity: "7/2+", halfLife: "8.02 d", decayMode: "β−" },
    { energyMeV: 0.0801, spinParity: "5/2+" },
    { energyMeV: 0.1773, spinParity: "5/2+" },
    { energyMeV: 0.3645, spinParity: "3/2+" },
    { energyMeV: 0.6368, spinParity: "1/2+" },
  ],
  "Cs-137": [
    { energyMeV: 0, spinParity: "7/2+", halfLife: "30.17 y", decayMode: "β−" },
    {
      energyMeV: 0.6617,
      spinParity: "11/2−",
      halfLife: "2.55 min",
      decayMode: "IT",
    },
    { energyMeV: 1.176, spinParity: "3/2+" },
  ],
  "Tc-99m": [
    {
      energyMeV: 0,
      spinParity: "9/2+",
      halfLife: "2.11×10⁵ y",
      decayMode: "β−",
    },
    {
      energyMeV: 0.1427,
      spinParity: "1/2−",
      halfLife: "6.01 h",
      decayMode: "IT/γ",
    },
  ],
  "U-235": [
    {
      energyMeV: 0,
      spinParity: "7/2−",
      halfLife: "7.04×10⁸ y",
      decayMode: "α",
    },
    { energyMeV: 0.04635, spinParity: "5/2−" },
    { energyMeV: 0.1635, spinParity: "9/2−" },
    { energyMeV: 0.1854, spinParity: "7/2−" },
    { energyMeV: 0.2057, spinParity: "3/2−" },
  ],
  "U-238": [
    { energyMeV: 0, spinParity: "0+", halfLife: "4.47×10⁹ y", decayMode: "α" },
    { energyMeV: 0.04491, spinParity: "2+" },
    { energyMeV: 0.1484, spinParity: "4+" },
    { energyMeV: 0.3074, spinParity: "6+" },
  ],
  "Pu-239": [
    {
      energyMeV: 0,
      spinParity: "1/2+",
      halfLife: "2.41×10⁴ y",
      decayMode: "α",
    },
    { energyMeV: 0.00775, spinParity: "3/2+" },
    { energyMeV: 0.05705, spinParity: "5/2+" },
    { energyMeV: 0.07567, spinParity: "7/2+" },
    { energyMeV: 0.16449, spinParity: "9/2+" },
  ],
  "C-14": [
    { energyMeV: 0, spinParity: "0+", halfLife: "5730 y", decayMode: "β−" },
    { energyMeV: 6.5897, spinParity: "1−" },
    { energyMeV: 6.9027, spinParity: "0−" },
    { energyMeV: 7.341, spinParity: "2−" },
  ],
  "Sr-90": [
    { energyMeV: 0, spinParity: "0+", halfLife: "28.8 y", decayMode: "β−" },
    { energyMeV: 0.3883, spinParity: "2+" },
    { energyMeV: 0.8268, spinParity: "4+" },
    { energyMeV: 1.6581, spinParity: "6+" },
  ],
  "Ra-226": [
    { energyMeV: 0, spinParity: "0+", halfLife: "1600 y", decayMode: "α" },
    { energyMeV: 0.0673, spinParity: "2+" },
    { energyMeV: 0.2225, spinParity: "4+" },
    { energyMeV: 0.4456, spinParity: "6+" },
  ],
};

// ─── Nuclear applications data ────────────────────────────────────────────────
const APPLICATIONS: Record<string, string[]> = {
  "Tc-99m": [
    "SPECT imaging (bone, cardiac, brain, thyroid)",
    "Most widely used medical radioisotope",
    "Produced from Mo-99 in hospital generators",
  ],
  "I-131": [
    "Thyroid cancer treatment (radioiodine therapy)",
    "Hyperthyroidism treatment",
    "Thyroid imaging (diagnostic)",
  ],
  "Co-60": [
    "External beam radiotherapy for cancer",
    "Industrial gamma radiography (weld inspection)",
    "Food irradiation sterilization",
    "Medical instrument sterilization",
  ],
  "Cs-137": [
    "Brachytherapy (gynecological cancer)",
    "Industrial gauging (thickness/density)",
    "Calibration source for detectors",
  ],
  "U-235": [
    "Nuclear fuel for light water reactors",
    "Naval propulsion reactors",
    "Research reactors",
  ],
  "U-238": [
    "Fertile material for Pu-239 production",
    "Depleted uranium armor-piercing projectiles",
    "Radiation shielding (high density)",
  ],
  "Pu-239": [
    "Mixed oxide (MOX) nuclear fuel",
    "Radioisotope thermoelectric generators (RTGs)",
  ],
  "C-14": [
    "Radiocarbon dating of organic materials",
    "Metabolic pathway tracing in biochemistry",
    "Drug metabolism studies",
  ],
  "Sr-90": [
    "Radioisotope thermoelectric generators (RTGs)",
    "Industrial thickness gauges",
    "Cancer bone pain palliation (palliative)",
  ],
  "Ra-226": [
    "Historical cancer brachytherapy (now replaced)",
    "Luminous paint (historical)",
  ],
};

// ─── Utility helpers ──────────────────────────────────────────────────────────
function formatHalfLife(seconds: number): string {
  if (seconds < 0) return "Stable";
  if (seconds === 0) return "< 1 ns";
  const units: [number, string][] = [
    [3.156e7 * 1e9, "Gy"],
    [3.156e7 * 1e6, "My"],
    [3.156e7 * 1e3, "ky"],
    [3.156e7, "y"],
    [(86400 * 365.25) / 12, "mo"],
    [86400, "d"],
    [3600, "h"],
    [60, "min"],
    [1, "s"],
    [1e-3, "ms"],
    [1e-6, "μs"],
    [1e-9, "ns"],
  ];
  for (const [val, unit] of units) {
    if (seconds >= val) {
      const n = seconds / val;
      return `${n >= 1000 ? n.toExponential(3) : n.toPrecision(4)} ${unit}`;
    }
  }
  return `${seconds.toExponential(3)} s`;
}

function blockColor(block: ElementInfo["block"]): string {
  switch (block) {
    case "s":
      return "bg-blue-900/60 border-blue-700/40 hover:bg-blue-800/80";
    case "p":
      return "bg-emerald-900/60 border-emerald-700/40 hover:bg-emerald-800/80";
    case "d":
      return "bg-amber-900/60 border-amber-700/40 hover:bg-amber-800/80";
    case "f":
      return "bg-purple-900/60 border-purple-700/40 hover:bg-purple-800/80";
  }
}

function decayBadgeColor(mode: string): string {
  switch (mode) {
    case "stable":
      return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    case "α":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    case "β−":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    case "β+":
      return "bg-pink-500/20 text-pink-400 border-pink-500/30";
    case "EC":
      return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
    case "IT":
      return "bg-orange-500/20 text-orange-400 border-orange-500/30";
    case "γ":
      return "bg-violet-500/20 text-violet-400 border-violet-500/30";
    case "SF":
      return "bg-red-500/20 text-red-400 border-red-500/30";
    default:
      return "bg-muted/50 text-muted-foreground border-border";
  }
}

// ─── IAEA API fetch ───────────────────────────────────────────────────────────
interface IAEAGroundState {
  z?: string | number;
  n?: string | number;
  symbol?: string;
  atomic_mass?: string | number;
  half_life?: string | number;
  half_life_sec?: string | number;
  decay_modes?: string;
  abundance?: string | number;
  binding_en_per_nuc?: string | number;
  mass_excess?: string | number;
  jpi?: string;
  discovery_year?: string | number;
}

function parseIAEARecords(
  data: IAEAGroundState[],
  elementInfo: ElementInfo,
): IsotopeRecord[] {
  return data.map((d) => {
    const z = Number(d.z ?? elementInfo.z);
    const n = Number(d.n ?? 0);
    const rawHL = d.half_life_sec ?? d.half_life ?? -1;
    const hlSec = rawHL === "STABLE" || rawHL === "stable" ? -1 : Number(rawHL);
    const rawModes = (d.decay_modes ?? "").toString();
    const decayModes = rawModes
      ? rawModes
          .split(";")
          .map((s) => s.trim())
          .filter(Boolean)
      : ["stable"];
    return {
      z,
      n,
      symbol: (d.symbol ?? elementInfo.symbol).toString(),
      name: elementInfo.name,
      halfLifeSeconds: Number.isNaN(hlSec) ? -1 : hlSec,
      decayModes,
      qValueMeV: 0,
      bindingEnergyPerNucleon: Number(d.binding_en_per_nuc ?? 0),
      massExcessKeV: Number(d.mass_excess ?? 0),
      atomicMassAMU: Number(d.atomic_mass ?? 0),
      abundance: Number(d.abundance ?? 0),
      branchingRatios: [1],
      lastUpdated: new Date().toISOString(),
      sourceUri: `https://nds.iaea.org/relnsd/v1/data?nuclides=${z}-${elementInfo.symbol}&fields=ground_states`,
    };
  });
}

async function fetchFromIAEA(el: ElementInfo): Promise<IsotopeRecord[]> {
  const url = `https://nds.iaea.org/relnsd/v1/data?nuclides=${el.z}-${el.symbol}&fields=ground_states`;
  const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
  if (!res.ok) throw new Error(`IAEA API ${res.status}`);
  const data: IAEAGroundState[] = await res.json();
  if (!Array.isArray(data) || data.length === 0)
    throw new Error("Empty response");
  return parseIAEARecords(data, el);
}

// ─── Sub-components ────────────────────────────────────────────────────────────
function PeriodicGrid({
  selected,
  onSelect,
  searchZ,
}: {
  selected: ElementInfo | null;
  onSelect: (el: ElementInfo) => void;
  searchZ: number | null;
}) {
  const grid: (ElementInfo | null)[][] = Array.from({ length: 10 }, () =>
    Array(18).fill(null),
  );
  const lanthanides: ElementInfo[] = [];
  const actinides: ElementInfo[] = [];

  for (const el of ELEMENTS) {
    if (el.z >= 57 && el.z <= 71) {
      lanthanides.push(el);
      continue;
    }
    if (el.z >= 89 && el.z <= 103) {
      actinides.push(el);
      continue;
    }
    const row = el.period - 1;
    const col = el.group - 1;
    if (row >= 0 && row < 8 && col >= 0 && col < 18) grid[row][col] = el;
  }

  const renderCell = (el: ElementInfo | null, idx: number) => {
    if (!el) return <div key={idx} />;
    const isSelected = selected?.z === el.z;
    const isHighlighted = searchZ === el.z;
    return (
      <button
        key={el.z}
        type="button"
        data-ocid={`nuclide-db.element.${el.z}`}
        onClick={() => onSelect(el)}
        title={`${el.name} (Z=${el.z})`}
        className={`relative flex flex-col items-center justify-center rounded text-[9px] leading-none border transition-all duration-150 p-0.5 min-h-[32px]
          ${blockColor(el.block)}
          ${isSelected ? "ring-2 ring-primary scale-105 z-10 shadow-lg shadow-primary/30" : ""}
          ${isHighlighted && !isSelected ? "ring-2 ring-yellow-400 scale-105 z-10" : ""}
        `}
      >
        <span className="font-bold text-foreground text-[10px]">
          {el.symbol}
        </span>
        <span className="text-muted-foreground text-[7px]">{el.z}</span>
      </button>
    );
  };

  return (
    <div className="space-y-0.5">
      {/* Main grid rows 1-7 */}
      {grid.slice(0, 7).map((row, ri) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: static layout grid
          key={`grid-row-${ri}`}
          className="grid grid-cols-18 gap-0.5"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(18, minmax(0, 1fr))",
            gap: "2px",
          }}
        >
          {row.map((el, ci) => renderCell(el, ri * 18 + ci))}
        </div>
      ))}
      {/* Gap + lanthanide/actinide rows */}
      <div className="h-2" />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(18, minmax(0, 1fr))",
          gap: "2px",
        }}
      >
        {[0, 1, 2].map((gapIdx) => (
          <div key={`gap-l-${gapIdx}`} />
        ))}
        {lanthanides.map((el) => renderCell(el, el.z))}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(18, minmax(0, 1fr))",
          gap: "2px",
        }}
      >
        {[0, 1, 2].map((gapIdx) => (
          <div key={`gap-a-${gapIdx}`} />
        ))}
        {actinides.map((el) => renderCell(el, el.z))}
      </div>
      {/* Legend */}
      <div className="flex gap-3 mt-2 flex-wrap">
        {(["s", "p", "d", "f"] as const).map((b) => (
          <div key={b} className="flex items-center gap-1">
            <div className={`w-3 h-3 rounded-sm border ${blockColor(b)}`} />
            <span className="text-[10px] text-muted-foreground">{b}-block</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function IsotopeTable({
  isotopes,
  selectedNuclide,
  onSelect,
}: {
  isotopes: IsotopeRecord[];
  selectedNuclide: IsotopeRecord | null;
  onSelect: (iso: IsotopeRecord) => void;
}) {
  return (
    <div className="overflow-auto max-h-72 rounded-lg border border-border">
      <table className="w-full text-xs">
        <thead className="sticky top-0 bg-card border-b border-border">
          <tr>
            {[
              "A",
              "N",
              "Half-life",
              "Decay",
              "Abundance (%)",
              "Mass (AMU)",
            ].map((h) => (
              <th
                key={h}
                className="px-3 py-2 text-left text-muted-foreground font-medium"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isotopes.map((iso, idx) => {
            const A = iso.z + iso.n;
            const isSelected =
              selectedNuclide?.z === iso.z && selectedNuclide?.n === iso.n;
            return (
              <motion.tr
                key={`${iso.z}-${iso.n}-${idx}`}
                data-ocid={`nuclide-db.isotope-row.${idx + 1}`}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.03 }}
                onClick={() => onSelect(iso)}
                className={`cursor-pointer border-b border-border/40 transition-colors ${
                  isSelected ? "bg-primary/10" : "hover:bg-muted/40"
                }`}
              >
                <td className="px-3 py-2 font-bold text-foreground">{A}</td>
                <td className="px-3 py-2 text-muted-foreground">{iso.n}</td>
                <td className="px-3 py-2">
                  <span
                    className={
                      iso.halfLifeSeconds < 0
                        ? "text-emerald-400"
                        : "text-foreground"
                    }
                  >
                    {formatHalfLife(iso.halfLifeSeconds)}
                  </span>
                </td>
                <td className="px-3 py-2">
                  <div className="flex gap-1 flex-wrap">
                    {iso.decayModes.map((m) => (
                      <span
                        key={m}
                        className={`px-1.5 py-0.5 rounded text-[10px] border ${decayBadgeColor(m)}`}
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-3 py-2 text-right tabular-nums">
                  {iso.abundance > 0 ? iso.abundance.toFixed(3) : "—"}
                </td>
                <td className="px-3 py-2 text-right tabular-nums text-muted-foreground">
                  {iso.atomicMassAMU > 0 ? iso.atomicMassAMU.toFixed(6) : "—"}
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function EnergyLevelDiagram({ nuclideKey }: { nuclideKey: string }) {
  const levels = ENERGY_LEVELS[nuclideKey];
  if (!levels)
    return (
      <div className="text-center py-8 text-muted-foreground text-sm">
        Energy level data not available for this nuclide.
        <p className="text-xs mt-1">
          Detailed level data available for: Co-60, I-131, Cs-137, Tc-99m,
          U-235, U-238, Pu-239, C-14, Sr-90, Ra-226
        </p>
      </div>
    );

  const maxE = Math.max(...levels.map((l) => l.energyMeV));
  const svgH = 260;
  const svgW = 400;
  const padT = 20;
  const padB = 30;
  const padL = 60;
  const padR = 80;
  const innerH = svgH - padT - padB;
  const getY = (e: number) =>
    padT + innerH - (maxE > 0 ? (e / maxE) * innerH : 0);

  return (
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground">
        Nuclear energy levels for{" "}
        <strong className="text-foreground">{nuclideKey}</strong> (ENSDF / NNDC)
      </p>
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${svgW} ${svgH}`}
          className="w-full max-w-md mx-auto"
          aria-label={`Energy level diagram for ${nuclideKey}`}
        >
          <title>Energy level diagram</title>
          {/* Y-axis */}
          <line
            x1={padL}
            y1={padT}
            x2={padL}
            y2={svgH - padB}
            stroke="currentColor"
            strokeOpacity={0.3}
            strokeWidth={1}
          />
          <text
            x={10}
            y={svgH / 2}
            transform={`rotate(-90 10 ${svgH / 2})`}
            fontSize={10}
            fill="currentColor"
            fillOpacity={0.6}
            textAnchor="middle"
          >
            Energy (MeV)
          </text>

          {/* Levels */}
          {levels.map((lvl, i) => {
            const y = getY(lvl.energyMeV);
            const isGround = lvl.energyMeV === 0;
            return (
              // biome-ignore lint/suspicious/noArrayIndexKey: static energy level list
              <g key={i}>
                <line
                  x1={padL + 10}
                  y1={y}
                  x2={svgW - padR}
                  y2={y}
                  stroke={
                    isGround ? "oklch(0.65 0.18 140)" : "oklch(0.7 0.14 250)"
                  }
                  strokeWidth={isGround ? 2.5 : 1.5}
                  strokeDasharray={isGround ? "" : "4 2"}
                />
                {/* Energy label */}
                <text
                  x={padL + 4}
                  y={y - 3}
                  fontSize={9}
                  fill="currentColor"
                  fillOpacity={0.8}
                  textAnchor="end"
                >
                  {lvl.energyMeV.toFixed(3)}
                </text>
                {/* Spin/parity + half-life */}
                <text
                  x={svgW - padR + 4}
                  y={y + 3}
                  fontSize={9}
                  fill={
                    isGround ? "oklch(0.65 0.18 140)" : "oklch(0.7 0.14 250)"
                  }
                  textAnchor="start"
                >
                  {lvl.spinParity}
                  {lvl.halfLife ? ` (${lvl.halfLife})` : ""}
                </text>
                {/* Decay arrow */}
                {lvl.decayMode && i > 0 && (
                  <line
                    x1={padL + (svgW - padL - padR) * 0.5}
                    y1={y}
                    x2={padL + (svgW - padL - padR) * 0.5}
                    y2={getY(levels[0].energyMeV)}
                    stroke="oklch(0.65 0.22 30)"
                    strokeWidth={1}
                    strokeDasharray="2 2"
                    markerEnd="url(#arrow)"
                    opacity={0.5}
                  />
                )}
              </g>
            );
          })}

          {/* Arrow marker */}
          <defs>
            <marker
              id="arrow"
              markerWidth="6"
              markerHeight="6"
              refX="3"
              refY="3"
              orient="auto"
            >
              <path
                d="M0,0 L6,3 L0,6 Z"
                fill="oklch(0.65 0.22 30)"
                opacity={0.7}
              />
            </marker>
          </defs>

          {/* Ground state label */}
          <text
            x={padL + 10}
            y={svgH - padB + 14}
            fontSize={9}
            fill="oklch(0.65 0.18 140)"
            fontWeight="bold"
          >
            Ground state (0 MeV)
          </text>
        </svg>
      </div>
    </div>
  );
}

function NuclideDetailPanel({
  nuclide,
  element,
}: {
  nuclide: IsotopeRecord;
  element: ElementInfo | null;
}) {
  const A = nuclide.z + nuclide.n;
  const _nuclideKey = `${element?.name?.split("")[0]}${element?.symbol}-${A}`;
  const appKey = Object.keys(APPLICATIONS).find(
    (k) => k === `${nuclide.symbol}-${A}`,
  );
  const levelKey = Object.keys(ENERGY_LEVELS).find(
    (k) => k === `${nuclide.symbol}-${A}`,
  );

  const beData =
    nuclide.bindingEnergyPerNucleon > 0
      ? [
          { name: "Volume", value: +(15.835 - 0.01 * A).toFixed(3) },
          {
            name: "Surface",
            value: +(-18.33 * A ** (-1 / 3)).toFixed(3),
          },
          {
            name: "Coulomb",
            value: +(
              (-0.714 * nuclide.z * (nuclide.z - 1) * A ** (-1 / 3)) /
              A
            ).toFixed(3),
          },
          {
            name: "Asymmetry",
            value: +((-23.2 * (nuclide.n - nuclide.z) ** 2) / (A * A)).toFixed(
              3,
            ),
          },
          {
            name: "Total B/A",
            value: +nuclide.bindingEnergyPerNucleon.toFixed(3),
          },
        ]
      : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center justify-center w-16 h-16 rounded-xl border-2 border-primary/60 bg-primary/10 shadow-lg shadow-primary/20">
            <span className="font-display text-2xl font-bold text-primary leading-none">
              {nuclide.symbol}
            </span>
            <span className="text-xs text-muted-foreground">{A}</span>
          </div>
          <div>
            <h3 className="font-display text-xl font-bold text-foreground">
              {nuclide.name}-{A}
            </h3>
            <p className="text-sm text-muted-foreground">
              Z={nuclide.z} · N={nuclide.n} · A={A}
            </p>
            <div className="flex gap-1 mt-1 flex-wrap">
              {nuclide.decayModes.map((m) => (
                <span
                  key={m}
                  className={`px-2 py-0.5 rounded-full text-xs border ${decayBadgeColor(m)}`}
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            asChild
            data-ocid="nuclide-db.view-decay-chain"
          >
            <Link
              to="/visualizations/decay-chain"
              search={{ z: nuclide.z, a: A } as never}
            >
              🔗 Decay Chain
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            asChild
            data-ocid="nuclide-db.view-nucleus-visualizer"
          >
            <Link
              to="/visualizations/nucleus"
              search={{ z: nuclide.z, a: A } as never}
            >
              ⚛ Nucleus Visualizer
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="properties">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="properties" data-ocid="nuclide-db.tab-properties">
            Properties
          </TabsTrigger>
          <TabsTrigger value="decay" data-ocid="nuclide-db.tab-decay">
            Decay
          </TabsTrigger>
          <TabsTrigger value="levels" data-ocid="nuclide-db.tab-levels">
            Energy Levels
          </TabsTrigger>
          <TabsTrigger
            value="applications"
            data-ocid="nuclide-db.tab-applications"
          >
            Applications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="properties" className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              { label: "Protons (Z)", value: nuclide.z.toString(), unit: "" },
              { label: "Neutrons (N)", value: nuclide.n.toString(), unit: "" },
              { label: "Mass number (A)", value: A.toString(), unit: "" },
              {
                label: "Atomic mass",
                value:
                  nuclide.atomicMassAMU > 0
                    ? nuclide.atomicMassAMU.toFixed(6)
                    : "—",
                unit: "AMU",
              },
              {
                label: "Mass excess",
                value:
                  nuclide.massExcessKeV !== 0
                    ? nuclide.massExcessKeV.toFixed(1)
                    : "—",
                unit: "keV",
              },
              {
                label: "Binding energy / A",
                value:
                  nuclide.bindingEnergyPerNucleon > 0
                    ? nuclide.bindingEnergyPerNucleon.toFixed(3)
                    : "—",
                unit: "MeV",
              },
              {
                label: "Natural abundance",
                value:
                  nuclide.abundance > 0 ? nuclide.abundance.toFixed(4) : "—",
                unit: "%",
              },
              {
                label: "Half-life",
                value: formatHalfLife(nuclide.halfLifeSeconds),
                unit: "",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-lg bg-muted/30 border border-border p-3"
              >
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="font-mono text-sm font-semibold text-foreground mt-0.5">
                  {item.value}
                  {item.unit && (
                    <span className="text-muted-foreground ml-1 text-xs">
                      {item.unit}
                    </span>
                  )}
                </p>
              </div>
            ))}
          </div>

          {beData.length > 0 && (
            <div className="rounded-lg border border-border bg-muted/20 p-3">
              <p className="text-xs text-muted-foreground mb-2 font-medium">
                Bethe-Weizsäcker Binding Energy Terms (MeV)
              </p>
              <ResponsiveContainer width="100%" height={120}>
                <BarChart
                  data={beData}
                  margin={{ top: 4, right: 12, bottom: 0, left: -10 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="oklch(0.3 0 0 / 0.3)"
                  />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 10, fill: "oklch(0.7 0 0)" }}
                  />
                  <YAxis tick={{ fontSize: 9, fill: "oklch(0.7 0 0)" }} />
                  <RechartsTooltip
                    contentStyle={{
                      background: "oklch(0.15 0.02 260)",
                      border: "1px solid oklch(0.3 0.05 260)",
                      borderRadius: 8,
                      fontSize: 11,
                    }}
                    formatter={(v: number) => [`${v} MeV`, ""]}
                  />
                  <Bar dataKey="value" radius={[3, 3, 0, 0]}>
                    {beData.map((entry, i) => (
                      <Cell
                        // biome-ignore lint/suspicious/noArrayIndexKey: static chart data
                        key={`be-cell-${i}`}
                        fill={
                          entry.value >= 0
                            ? "oklch(0.6 0.18 140)"
                            : "oklch(0.55 0.2 30)"
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </TabsContent>

        <TabsContent value="decay" className="space-y-4 mt-4">
          {nuclide.halfLifeSeconds < 0 ? (
            <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-4 text-center">
              <span className="text-emerald-400 font-semibold text-lg">
                Stable Nuclide
              </span>
              <p className="text-sm text-muted-foreground mt-1">
                This isotope does not undergo radioactive decay.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="rounded-lg bg-muted/30 border border-border p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Half-life
                  </span>
                  <span className="font-mono text-sm font-semibold">
                    {formatHalfLife(nuclide.halfLifeSeconds)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Q-value</span>
                  <span className="font-mono text-sm">
                    {nuclide.qValueMeV > 0
                      ? `${nuclide.qValueMeV.toFixed(3)} MeV`
                      : "—"}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                {nuclide.decayModes.map((mode, i) => (
                  <div
                    // biome-ignore lint/suspicious/noArrayIndexKey: static decay mode list
                    key={`decay-mode-${i}`}
                    className="flex items-center justify-between rounded-lg bg-muted/20 border border-border p-3"
                  >
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs border ${decayBadgeColor(mode)}`}
                    >
                      {mode}
                    </span>
                    <span className="text-sm tabular-nums">
                      {nuclide.branchingRatios[i] != null
                        ? `BR: ${(nuclide.branchingRatios[i] * 100).toFixed(2)}%`
                        : "BR: —"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="levels" className="mt-4">
          <EnergyLevelDiagram
            nuclideKey={levelKey ?? `${nuclide.symbol}-${A}`}
          />
        </TabsContent>

        <TabsContent value="applications" className="mt-4">
          {appKey ? (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Known applications of{" "}
                <strong className="text-foreground">
                  {nuclide.symbol}-{A}
                </strong>
                :
              </p>
              <ul className="space-y-2">
                {APPLICATIONS[appKey].map((app, i) => (
                  <li
                    // biome-ignore lint/suspicious/noArrayIndexKey: static applications list
                    key={`app-item-${i}`}
                    className="flex items-start gap-2 rounded-lg bg-muted/20 border border-border p-3"
                  >
                    <span className="text-primary mt-0.5">▸</span>
                    <span className="text-sm">{app}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="text-center py-6 text-muted-foreground text-sm">
              No specific applications data available for {nuclide.symbol}-{A}.
              <p className="text-xs mt-1">
                Applications data available for: Co-60, I-131, Cs-137, Tc-99m,
                U-235, U-238, Pu-239, C-14, Sr-90, Ra-226
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}

function ComparisonTable({ nuclides }: { nuclides: IsotopeRecord[] }) {
  if (nuclides.length < 2)
    return (
      <div
        className="text-center py-8 text-muted-foreground text-sm"
        data-ocid="nuclide-db.comparison-empty"
      >
        Select 2–3 nuclides from the isotope table to compare them side-by-side.
      </div>
    );

  const rows: { label: string; getValue: (iso: IsotopeRecord) => string }[] = [
    { label: "Z (protons)", getValue: (iso) => iso.z.toString() },
    { label: "N (neutrons)", getValue: (iso) => iso.n.toString() },
    { label: "A (mass number)", getValue: (iso) => (iso.z + iso.n).toString() },
    {
      label: "Half-life",
      getValue: (iso) => formatHalfLife(iso.halfLifeSeconds),
    },
    { label: "Decay modes", getValue: (iso) => iso.decayModes.join(", ") },
    {
      label: "Q-value (MeV)",
      getValue: (iso) => (iso.qValueMeV > 0 ? iso.qValueMeV.toFixed(3) : "—"),
    },
    {
      label: "Binding E/A (MeV)",
      getValue: (iso) =>
        iso.bindingEnergyPerNucleon > 0
          ? iso.bindingEnergyPerNucleon.toFixed(3)
          : "—",
    },
    {
      label: "Mass excess (keV)",
      getValue: (iso) =>
        iso.massExcessKeV !== 0 ? iso.massExcessKeV.toFixed(1) : "—",
    },
    {
      label: "Atomic mass (AMU)",
      getValue: (iso) =>
        iso.atomicMassAMU > 0 ? iso.atomicMassAMU.toFixed(6) : "—",
    },
    {
      label: "Abundance (%)",
      getValue: (iso) => (iso.abundance > 0 ? iso.abundance.toFixed(4) : "—"),
    },
  ];

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm" data-ocid="nuclide-db.comparison-table">
        <thead>
          <tr className="bg-card border-b border-border">
            <th className="px-4 py-3 text-left text-muted-foreground font-medium">
              Property
            </th>
            {nuclides.map((iso, i) => (
              <th
                // biome-ignore lint/suspicious/noArrayIndexKey: static comparison header
                key={`cmp-hdr-${i}`}
                className="px-4 py-3 text-center font-semibold text-foreground"
              >
                {iso.symbol}-{iso.z + iso.n}
              </th>
            ))}
            {nuclides.length === 2 && (
              <th className="px-4 py-3 text-center text-muted-foreground font-medium">
                Δ (1→2)
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => {
            const vals = nuclides.map(row.getValue);
            const numVals = vals.map((v) => Number.parseFloat(v));
            const allNum = numVals.every((n) => !Number.isNaN(n));
            const delta =
              allNum && nuclides.length === 2
                ? (numVals[1] - numVals[0]).toFixed(3)
                : null;
            return (
              <tr
                // biome-ignore lint/suspicious/noArrayIndexKey: static comparison table rows
                key={`cmp-row-${ri}`}
                className={`border-b border-border/40 ${ri % 2 === 0 ? "bg-muted/10" : ""}`}
              >
                <td className="px-4 py-2 text-muted-foreground text-xs font-medium">
                  {row.label}
                </td>
                {vals.map((v, i) => (
                  <td
                    // biome-ignore lint/suspicious/noArrayIndexKey: static comparison cells
                    key={`cmp-cell-${i}`}
                    className="px-4 py-2 text-center font-mono text-xs"
                  >
                    {v}
                  </td>
                ))}
                {nuclides.length === 2 && (
                  <td
                    className={`px-4 py-2 text-center font-mono text-xs ${
                      delta !== null && Number.parseFloat(delta) > 0
                        ? "text-emerald-400"
                        : delta !== null && Number.parseFloat(delta) < 0
                          ? "text-rose-400"
                          : "text-muted-foreground"
                    }`}
                  >
                    {delta !== null
                      ? Number.parseFloat(delta) > 0
                        ? `+${delta}`
                        : delta
                      : "—"}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function NuclideDatabase() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedElement, setSelectedElement] = useState<ElementInfo | null>(
    null,
  );
  const [isotopes, setIsotopes] = useState<IsotopeRecord[]>([]);
  const [loadStatus, setLoadStatus] = useState<
    "idle" | "loading" | "live" | "cache" | "error"
  >("idle");
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [selectedNuclide, setSelectedNuclide] = useState<IsotopeRecord | null>(
    null,
  );
  const [compareList, setCompareList] = useState<IsotopeRecord[]>([]);
  const [activeTab, setActiveTab] = useState("detail");
  const searchRef = useRef<HTMLInputElement>(null);

  // ── Resolve search to element ──
  const searchResult = useMemo((): ElementInfo | null => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return null;
    const byZ = ELEMENTS.find((e) => e.z === Number.parseInt(q));
    if (byZ) return byZ;
    const bySymbol = ELEMENTS.find((e) => e.symbol.toLowerCase() === q);
    if (bySymbol) return bySymbol;
    return ELEMENTS.find((e) => e.name.toLowerCase().includes(q)) ?? null;
  }, [searchQuery]);

  const highlightZ = searchResult?.z ?? null;

  // ── Load isotopes when element selected ──
  const loadIsotopes = useCallback(async (el: ElementInfo) => {
    setSelectedElement(el);
    setSelectedNuclide(null);
    setCompareList([]);
    setLoadStatus("loading");
    setIsotopes([]);

    try {
      const live = await fetchFromIAEA(el);
      setIsotopes(live);
      setLoadStatus("live");
      setLastRefresh(new Date());
    } catch {
      const fallback = FALLBACK_ISOTOPES[el.z];
      if (fallback) {
        setIsotopes(fallback);
        setLoadStatus("cache");
      } else {
        // Generate minimal placeholder from element Z
        const placeholder: IsotopeRecord[] = [
          {
            z: el.z,
            n: Math.round(el.z * 1.2),
            symbol: el.symbol,
            name: el.name,
            halfLifeSeconds: -1,
            decayModes: ["unknown"],
            qValueMeV: 0,
            bindingEnergyPerNucleon: 0,
            massExcessKeV: 0,
            atomicMassAMU: 0,
            abundance: 0,
            branchingRatios: [1],
            lastUpdated: new Date().toISOString(),
            sourceUri: "local",
          },
        ];
        setIsotopes(placeholder);
        setLoadStatus("error");
      }
    }
  }, []);

  // ── When search resolves, auto-select ──
  useEffect(() => {
    if (searchResult && searchResult.z !== selectedElement?.z) {
      loadIsotopes(searchResult);
    }
  }, [searchResult, selectedElement, loadIsotopes]);

  // ── Toggle compare selection ──
  const toggleCompare = useCallback((iso: IsotopeRecord) => {
    setCompareList((prev) => {
      const exists = prev.find((p) => p.z === iso.z && p.n === iso.n);
      if (exists) return prev.filter((p) => !(p.z === iso.z && p.n === iso.n));
      if (prev.length >= 3) return [...prev.slice(1), iso];
      return [...prev, iso];
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <PageHeader
        title="Nuclide Database"
        subtitle="Browse 3000+ nuclides with live IAEA data — nuclear properties, decay modes, energy levels, and applications."
        audienceLevel="advanced"
        readTimeMin={5}
      />

      {/* Search + data source indicator */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-64">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
            🔍
          </span>
          <Input
            ref={searchRef}
            data-ocid="nuclide-db.search-input"
            placeholder="Search by name, symbol, Z number, or decay mode…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        {loadStatus !== "idle" && (
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border ${
              loadStatus === "live"
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                : loadStatus === "cache"
                  ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                  : loadStatus === "loading"
                    ? "bg-blue-500/10 border-blue-500/30 text-blue-400"
                    : "bg-rose-500/10 border-rose-500/30 text-rose-400"
            }`}
            data-ocid="nuclide-db.data-source-indicator"
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                loadStatus === "live"
                  ? "bg-emerald-400 animate-pulse"
                  : loadStatus === "cache"
                    ? "bg-amber-400"
                    : loadStatus === "loading"
                      ? "bg-blue-400 animate-spin"
                      : "bg-rose-400"
              }`}
            />
            <span>
              {loadStatus === "live"
                ? "Live · IAEA"
                : loadStatus === "cache"
                  ? "Local cache"
                  : loadStatus === "loading"
                    ? "Fetching…"
                    : "API unavailable"}
            </span>
            {lastRefresh && (
              <span className="text-muted-foreground">
                · {lastRefresh.toLocaleTimeString()}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-6">
        {/* Left column: Periodic table + isotope list */}
        <div className="space-y-5">
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
                <span>⚛</span> Element Selector
                {selectedElement && (
                  <Badge variant="secondary" className="ml-auto font-mono">
                    {selectedElement.symbol} — {selectedElement.name} (Z=
                    {selectedElement.z})
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PeriodicGrid
                selected={selectedElement}
                onSelect={loadIsotopes}
                searchZ={highlightZ}
              />
            </CardContent>
          </Card>

          {/* Isotope table */}
          <AnimatePresence mode="wait">
            {loadStatus === "loading" ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-2"
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton loader
                  <Skeleton key={i} className="h-9 w-full rounded-lg" />
                ))}
              </motion.div>
            ) : isotopes.length > 0 ? (
              <motion.div
                key="table"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-foreground">
                    {selectedElement?.name} isotopes
                    <span className="ml-2 text-muted-foreground text-xs">
                      ({isotopes.length} nuclides)
                    </span>
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    Click row to inspect · Shift+click to compare
                  </span>
                </div>
                <IsotopeTable
                  isotopes={isotopes}
                  selectedNuclide={selectedNuclide}
                  onSelect={(iso) => {
                    setSelectedNuclide(iso);
                    setActiveTab("detail");
                  }}
                />
                {selectedNuclide && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      data-ocid="nuclide-db.add-to-compare"
                      onClick={() => {
                        toggleCompare(selectedNuclide);
                        setActiveTab("compare");
                      }}
                      className="text-xs h-7"
                    >
                      + Add to comparison ({compareList.length}/3)
                    </Button>
                    {compareList.length >= 2 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        data-ocid="nuclide-db.view-compare-tab"
                        onClick={() => setActiveTab("compare")}
                        className="text-xs h-7"
                      >
                        View comparison →
                      </Button>
                    )}
                  </div>
                )}
              </motion.div>
            ) : selectedElement ? (
              <div
                className="text-center py-8 text-muted-foreground text-sm"
                data-ocid="nuclide-db.isotopes-empty"
              >
                No isotope data available for {selectedElement.name}.
              </div>
            ) : (
              <div
                className="text-center py-12 rounded-xl border border-dashed border-border bg-muted/10"
                data-ocid="nuclide-db.element-prompt"
              >
                <p className="text-muted-foreground text-sm">
                  Click an element in the periodic table above to browse its
                  isotopes.
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Or search by name, symbol, or atomic number.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Right column: detail / comparison */}
        <div>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger
                value="detail"
                data-ocid="nuclide-db.panel-tab-detail"
              >
                Nuclide Detail
              </TabsTrigger>
              <TabsTrigger
                value="compare"
                data-ocid="nuclide-db.panel-tab-compare"
              >
                Compare
                {compareList.length > 0 && (
                  <span className="ml-1.5 text-[10px] bg-primary/20 text-primary rounded-full px-1.5">
                    {compareList.length}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="detail" className="mt-4">
              <AnimatePresence mode="wait">
                {selectedNuclide ? (
                  <NuclideDetailPanel
                    key={`${selectedNuclide.z}-${selectedNuclide.n}`}
                    nuclide={selectedNuclide}
                    element={selectedElement}
                  />
                ) : (
                  <div
                    className="text-center py-16 rounded-xl border border-dashed border-border bg-muted/10"
                    data-ocid="nuclide-db.nuclide-prompt"
                  >
                    <div className="text-4xl mb-3">⚛</div>
                    <p className="text-muted-foreground text-sm">
                      Select a nuclide from the isotope table to view its full
                      nuclear data sheet.
                    </p>
                  </div>
                )}
              </AnimatePresence>
            </TabsContent>

            <TabsContent value="compare" className="mt-4">
              <div className="space-y-3">
                {compareList.length > 0 && (
                  <div className="flex flex-wrap gap-2 items-center">
                    {compareList.map((iso) => (
                      <Badge
                        key={`${iso.z}-${iso.n}`}
                        variant="secondary"
                        className="cursor-pointer"
                        data-ocid={`nuclide-db.compare-badge.${iso.z}-${iso.n}`}
                        onClick={() => toggleCompare(iso)}
                      >
                        {iso.symbol}-{iso.z + iso.n} ✕
                      </Badge>
                    ))}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setCompareList([])}
                      data-ocid="nuclide-db.clear-compare"
                      className="text-xs h-6"
                    >
                      Clear all
                    </Button>
                  </div>
                )}
                <ComparisonTable nuclides={compareList} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Citations */}
      <Separator />
      <div className="text-xs text-muted-foreground space-y-1">
        <p className="font-medium text-foreground">Data Sources</p>
        <p>
          Live data:{" "}
          <a
            href="https://nds.iaea.org/relnsd/vcharthtml/VChartHTML.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            IAEA Live Chart of Nuclides
          </a>{" "}
          · API:{" "}
          <code className="bg-muted/50 px-1 rounded">
            nds.iaea.org/relnsd/v1/data
          </code>
        </p>
        <p>
          Nuclear data: ENSDF (Evaluated Nuclear Structure Data File) · AME2020
          (Atomic Mass Evaluation) · NNDC/BNL
        </p>
        <p>
          Energy levels: ENSDF via National Nuclear Data Center (nndc.bnl.gov)
        </p>
      </div>
    </div>
  );
}
