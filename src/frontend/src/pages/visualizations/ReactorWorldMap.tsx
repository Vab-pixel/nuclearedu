import { AnimatePresence, motion } from "framer-motion";
import {
  Filter,
  Globe,
  Info,
  RadioTower,
  Search,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import type React from "react";
import { useCallback, useMemo, useState } from "react";

interface NuclearPlant {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  type:
    | "PWR"
    | "BWR"
    | "CANDU"
    | "VVER"
    | "RBMK"
    | "Fast"
    | "AGR"
    | "SMR"
    | "Other";
  capacity: number;
  units: number;
  startYear: number;
  status: "operating" | "construction" | "planned" | "shutdown";
  notes?: string;
}

const PLANTS: NuclearPlant[] = [
  {
    id: "1",
    name: "Palo Verde",
    country: "USA",
    lat: 33.39,
    lng: -112.86,
    type: "PWR",
    capacity: 3937,
    units: 3,
    startYear: 1985,
    status: "operating",
  },
  {
    id: "2",
    name: "Diablo Canyon",
    country: "USA",
    lat: 35.21,
    lng: -120.85,
    type: "PWR",
    capacity: 2256,
    units: 2,
    startYear: 1985,
    status: "operating",
  },
  {
    id: "3",
    name: "Vogtle",
    country: "USA",
    lat: 33.14,
    lng: -81.76,
    type: "PWR",
    capacity: 4400,
    units: 4,
    startYear: 1987,
    status: "operating",
  },
  {
    id: "4",
    name: "South Texas Project",
    country: "USA",
    lat: 28.8,
    lng: -96.05,
    type: "PWR",
    capacity: 2700,
    units: 2,
    startYear: 1988,
    status: "operating",
  },
  {
    id: "5",
    name: "Point Lepreau",
    country: "Canada",
    lat: 45.06,
    lng: -66.45,
    type: "CANDU",
    capacity: 660,
    units: 1,
    startYear: 1983,
    status: "operating",
  },
  {
    id: "6",
    name: "Bruce",
    country: "Canada",
    lat: 44.33,
    lng: -81.6,
    type: "CANDU",
    capacity: 6384,
    units: 8,
    startYear: 1977,
    status: "operating",
  },
  {
    id: "7",
    name: "Pickering",
    country: "Canada",
    lat: 43.82,
    lng: -79.07,
    type: "CANDU",
    capacity: 3100,
    units: 4,
    startYear: 1971,
    status: "operating",
  },
  {
    id: "8",
    name: "Darlington",
    country: "Canada",
    lat: 43.87,
    lng: -78.72,
    type: "CANDU",
    capacity: 3512,
    units: 4,
    startYear: 1990,
    status: "operating",
  },
  {
    id: "9",
    name: "Gravelines",
    country: "France",
    lat: 51.01,
    lng: 2.13,
    type: "PWR",
    capacity: 5460,
    units: 6,
    startYear: 1980,
    status: "operating",
  },
  {
    id: "10",
    name: "Paluel",
    country: "France",
    lat: 49.86,
    lng: 0.63,
    type: "PWR",
    capacity: 5320,
    units: 4,
    startYear: 1985,
    status: "operating",
  },
  {
    id: "11",
    name: "Flamanville",
    country: "France",
    lat: 49.53,
    lng: -1.88,
    type: "PWR",
    capacity: 4170,
    units: 3,
    startYear: 1986,
    status: "operating",
  },
  {
    id: "12",
    name: "Cattenom",
    country: "France",
    lat: 49.4,
    lng: 6.22,
    type: "PWR",
    capacity: 5200,
    units: 4,
    startYear: 1987,
    status: "operating",
  },
  {
    id: "13",
    name: "Bugey",
    country: "France",
    lat: 45.8,
    lng: 5.27,
    type: "PWR",
    capacity: 3540,
    units: 4,
    startYear: 1978,
    status: "operating",
  },
  {
    id: "14",
    name: "Chinon",
    country: "France",
    lat: 47.23,
    lng: 0.17,
    type: "PWR",
    capacity: 3560,
    units: 4,
    startYear: 1987,
    status: "operating",
  },
  {
    id: "15",
    name: "Civaux",
    country: "France",
    lat: 46.46,
    lng: 0.65,
    type: "PWR",
    capacity: 2850,
    units: 2,
    startYear: 1999,
    status: "operating",
  },
  {
    id: "16",
    name: "Zaporizhzhia",
    country: "Ukraine",
    lat: 47.51,
    lng: 34.59,
    type: "VVER",
    capacity: 6000,
    units: 6,
    startYear: 1985,
    status: "operating",
  },
  {
    id: "17",
    name: "Khmelnitsky",
    country: "Ukraine",
    lat: 50.3,
    lng: 26.65,
    type: "VVER",
    capacity: 2000,
    units: 2,
    startYear: 1987,
    status: "operating",
  },
  {
    id: "18",
    name: "Tianwan",
    country: "China",
    lat: 34.7,
    lng: 119.46,
    type: "VVER",
    capacity: 6660,
    units: 6,
    startYear: 2007,
    status: "operating",
  },
  {
    id: "19",
    name: "Hongyanhe",
    country: "China",
    lat: 39.8,
    lng: 121.5,
    type: "PWR",
    capacity: 6090,
    units: 6,
    startYear: 2013,
    status: "operating",
  },
  {
    id: "20",
    name: "Fuqing",
    country: "China",
    lat: 25.43,
    lng: 119.42,
    type: "PWR",
    capacity: 6090,
    units: 6,
    startYear: 2014,
    status: "operating",
  },
  {
    id: "21",
    name: "Haiyang",
    country: "China",
    lat: 36.76,
    lng: 121.36,
    type: "PWR",
    capacity: 2500,
    units: 2,
    startYear: 2018,
    status: "operating",
  },
  {
    id: "22",
    name: "Yangjiang",
    country: "China",
    lat: 21.71,
    lng: 111.97,
    type: "PWR",
    capacity: 6060,
    units: 6,
    startYear: 2014,
    status: "operating",
  },
  {
    id: "23",
    name: "Taishan",
    country: "China",
    lat: 21.97,
    lng: 112.77,
    type: "PWR",
    capacity: 3400,
    units: 2,
    startYear: 2018,
    status: "operating",
  },
  {
    id: "24",
    name: "Ulchin",
    country: "South Korea",
    lat: 37.09,
    lng: 129.38,
    type: "PWR",
    capacity: 5900,
    units: 6,
    startYear: 1988,
    status: "operating",
  },
  {
    id: "25",
    name: "Shin-Hanul",
    country: "South Korea",
    lat: 37.1,
    lng: 129.4,
    type: "PWR",
    capacity: 2800,
    units: 2,
    startYear: 2022,
    status: "operating",
  },
  {
    id: "26",
    name: "Kori",
    country: "South Korea",
    lat: 35.32,
    lng: 129.29,
    type: "PWR",
    capacity: 3137,
    units: 4,
    startYear: 1978,
    status: "operating",
  },
  {
    id: "27",
    name: "Hanbit",
    country: "South Korea",
    lat: 35.41,
    lng: 126.42,
    type: "PWR",
    capacity: 5875,
    units: 6,
    startYear: 1986,
    status: "operating",
  },
  {
    id: "28",
    name: "Hanul",
    country: "South Korea",
    lat: 37.1,
    lng: 129.4,
    type: "PWR",
    capacity: 5900,
    units: 6,
    startYear: 1988,
    status: "operating",
  },
  {
    id: "29",
    name: "Kashiwazaki-Kariwa",
    country: "Japan",
    lat: 37.43,
    lng: 138.62,
    type: "BWR",
    capacity: 8212,
    units: 7,
    startYear: 1985,
    status: "shutdown",
  },
  {
    id: "30",
    name: "Tomari",
    country: "Japan",
    lat: 43.05,
    lng: 140.53,
    type: "PWR",
    capacity: 2070,
    units: 3,
    startYear: 1989,
    status: "shutdown",
  },
  {
    id: "31",
    name: "Ohi",
    country: "Japan",
    lat: 35.54,
    lng: 135.65,
    type: "PWR",
    capacity: 4710,
    units: 4,
    startYear: 1979,
    status: "shutdown",
  },
  {
    id: "32",
    name: "Kudankulam",
    country: "India",
    lat: 8.17,
    lng: 77.71,
    type: "VVER",
    capacity: 2000,
    units: 2,
    startYear: 2013,
    status: "operating",
  },
  {
    id: "33",
    name: "Tarapur",
    country: "India",
    lat: 19.84,
    lng: 72.65,
    type: "BWR",
    capacity: 1400,
    units: 4,
    startYear: 1969,
    status: "operating",
  },
  {
    id: "34",
    name: "Rajasthan",
    country: "India",
    lat: 26.91,
    lng: 76.48,
    type: "CANDU",
    capacity: 1180,
    units: 6,
    startYear: 1973,
    status: "operating",
  },
  {
    id: "35",
    name: "Leningrad",
    country: "Russia",
    lat: 59.83,
    lng: 29.11,
    type: "RBMK",
    capacity: 4000,
    units: 4,
    startYear: 1974,
    status: "operating",
  },
  {
    id: "36",
    name: "Novovoronezh",
    country: "Russia",
    lat: 51.28,
    lng: 39.22,
    type: "VVER",
    capacity: 3565,
    units: 5,
    startYear: 1964,
    status: "operating",
  },
  {
    id: "37",
    name: "Balakovo",
    country: "Russia",
    lat: 52.08,
    lng: 47.96,
    type: "VVER",
    capacity: 4000,
    units: 4,
    startYear: 1986,
    status: "operating",
  },
  {
    id: "38",
    name: "Rostov",
    country: "Russia",
    lat: 47.59,
    lng: 42.18,
    type: "VVER",
    capacity: 4000,
    units: 4,
    startYear: 2001,
    status: "operating",
  },
  {
    id: "39",
    name: "Kalinin",
    country: "Russia",
    lat: 57.87,
    lng: 35.08,
    type: "VVER",
    capacity: 4000,
    units: 4,
    startYear: 1985,
    status: "operating",
  },
  {
    id: "40",
    name: "Beloyarsk",
    country: "Russia",
    lat: 56.84,
    lng: 61.32,
    type: "Fast",
    capacity: 600,
    units: 2,
    startYear: 1980,
    status: "operating",
  },
  {
    id: "41",
    name: "Sizewell",
    country: "UK",
    lat: 52.21,
    lng: 1.62,
    type: "PWR",
    capacity: 2558,
    units: 2,
    startYear: 1995,
    status: "operating",
  },
  {
    id: "42",
    name: "Hinkley Point C",
    country: "UK",
    lat: 51.21,
    lng: -3.13,
    type: "PWR",
    capacity: 3200,
    units: 2,
    startYear: 2027,
    status: "construction",
  },
  {
    id: "43",
    name: "Dungeness",
    country: "UK",
    lat: 50.91,
    lng: 0.96,
    type: "AGR",
    capacity: 1110,
    units: 2,
    startYear: 1965,
    status: "shutdown",
  },
  {
    id: "44",
    name: "Flamanville EPR",
    country: "France",
    lat: 49.53,
    lng: -1.88,
    type: "PWR",
    capacity: 1650,
    units: 1,
    startYear: 2024,
    status: "operating",
  },
  {
    id: "45",
    name: "Forsmark",
    country: "Sweden",
    lat: 60.41,
    lng: 18.17,
    type: "BWR",
    capacity: 3069,
    units: 3,
    startYear: 1980,
    status: "operating",
  },
  {
    id: "46",
    name: "Ringhals",
    country: "Sweden",
    lat: 57.26,
    lng: 12.11,
    type: "PWR",
    capacity: 3623,
    units: 4,
    startYear: 1975,
    status: "operating",
  },
  {
    id: "47",
    name: "Olkiluoto",
    country: "Finland",
    lat: 61.24,
    lng: 21.45,
    type: "BWR",
    capacity: 4400,
    units: 3,
    startYear: 1979,
    status: "operating",
  },
  {
    id: "48",
    name: "Loviisa",
    country: "Finland",
    lat: 60.41,
    lng: 26.36,
    type: "VVER",
    capacity: 1000,
    units: 2,
    startYear: 1977,
    status: "operating",
  },
  {
    id: "49",
    name: "Cernavoda",
    country: "Romania",
    lat: 44.32,
    lng: 28.06,
    type: "CANDU",
    capacity: 1400,
    units: 2,
    startYear: 1996,
    status: "operating",
  },
  {
    id: "50",
    name: "Kozloduy",
    country: "Bulgaria",
    lat: 43.8,
    lng: 23.78,
    type: "VVER",
    capacity: 2000,
    units: 2,
    startYear: 1974,
    status: "operating",
  },
  {
    id: "51",
    name: "Paks",
    country: "Hungary",
    lat: 46.57,
    lng: 18.86,
    type: "VVER",
    capacity: 2000,
    units: 4,
    startYear: 1983,
    status: "operating",
  },
  {
    id: "52",
    name: "Temelin",
    country: "Czech Republic",
    lat: 49.08,
    lng: 14.37,
    type: "VVER",
    capacity: 2160,
    units: 2,
    startYear: 2002,
    status: "operating",
  },
  {
    id: "53",
    name: "Dukovany",
    country: "Czech Republic",
    lat: 49.09,
    lng: 16.15,
    type: "VVER",
    capacity: 2040,
    units: 4,
    startYear: 1985,
    status: "operating",
  },
  {
    id: "54",
    name: "Mochovce",
    country: "Slovakia",
    lat: 48.37,
    lng: 18.53,
    type: "VVER",
    capacity: 2040,
    units: 4,
    startYear: 2023,
    status: "operating",
  },
  {
    id: "55",
    name: "Beznau",
    country: "Switzerland",
    lat: 47.52,
    lng: 8.12,
    type: "PWR",
    capacity: 730,
    units: 2,
    startYear: 1969,
    status: "operating",
  },
  {
    id: "56",
    name: "Gosgen",
    country: "Switzerland",
    lat: 47.37,
    lng: 7.97,
    type: "PWR",
    capacity: 1060,
    units: 1,
    startYear: 1979,
    status: "operating",
  },
  {
    id: "57",
    name: "Leibstadt",
    country: "Switzerland",
    lat: 47.6,
    lng: 8.18,
    type: "BWR",
    capacity: 1245,
    units: 1,
    startYear: 1984,
    status: "operating",
  },
  {
    id: "58",
    name: "Trillo",
    country: "Spain",
    lat: 40.69,
    lng: -2.59,
    type: "PWR",
    capacity: 1066,
    units: 1,
    startYear: 1988,
    status: "operating",
  },
  {
    id: "59",
    name: "Cofrentes",
    country: "Spain",
    lat: 39.25,
    lng: -1.07,
    type: "BWR",
    capacity: 1092,
    units: 1,
    startYear: 1984,
    status: "operating",
  },
  {
    id: "60",
    name: "Barakah",
    country: "UAE",
    lat: 23.96,
    lng: 52.23,
    type: "PWR",
    capacity: 5600,
    units: 4,
    startYear: 2021,
    status: "operating",
  },
  {
    id: "61",
    name: "El-Dabaa",
    country: "Egypt",
    lat: 31.04,
    lng: 28.43,
    type: "VVER",
    capacity: 4800,
    units: 4,
    startYear: 2025,
    status: "construction",
  },
  {
    id: "62",
    name: "Akkuyu",
    country: "Turkey",
    lat: 36.14,
    lng: 33.55,
    type: "VVER",
    capacity: 4800,
    units: 4,
    startYear: 2027,
    status: "construction",
  },
  {
    id: "63",
    name: "Chernobyl",
    country: "Ukraine",
    lat: 51.39,
    lng: 30.1,
    type: "RBMK",
    capacity: 0,
    units: 4,
    startYear: 1977,
    status: "shutdown",
  },
  {
    id: "64",
    name: "Three Mile Island",
    country: "USA",
    lat: 40.15,
    lng: -76.73,
    type: "PWR",
    capacity: 0,
    units: 2,
    startYear: 1974,
    status: "shutdown",
  },
  {
    id: "65",
    name: "Fukushima Daiichi",
    country: "Japan",
    lat: 37.42,
    lng: 141.03,
    type: "BWR",
    capacity: 0,
    units: 6,
    startYear: 1971,
    status: "shutdown",
  },
  {
    id: "66",
    name: "Davis-Besse",
    country: "USA",
    lat: 41.6,
    lng: -83.08,
    type: "PWR",
    capacity: 900,
    units: 1,
    startYear: 1978,
    status: "operating",
  },
  {
    id: "67",
    name: "Wolf Creek",
    country: "USA",
    lat: 38.24,
    lng: -96.07,
    type: "PWR",
    capacity: 1200,
    units: 1,
    startYear: 1985,
    status: "operating",
  },
  {
    id: "68",
    name: "Catawba",
    country: "USA",
    lat: 35.07,
    lng: -81.07,
    type: "PWR",
    capacity: 2200,
    units: 2,
    startYear: 1985,
    status: "operating",
  },
  {
    id: "69",
    name: "Angra",
    country: "Brazil",
    lat: -23.01,
    lng: -44.46,
    type: "PWR",
    capacity: 3990,
    units: 3,
    startYear: 1985,
    status: "operating",
  },
  {
    id: "70",
    name: "Embalse",
    country: "Argentina",
    lat: -32.23,
    lng: -64.44,
    type: "CANDU",
    capacity: 648,
    units: 1,
    startYear: 1984,
    status: "operating",
  },
  {
    id: "71",
    name: "Metsamor",
    country: "Armenia",
    lat: 40.18,
    lng: 44.11,
    type: "VVER",
    capacity: 375,
    units: 1,
    startYear: 1980,
    status: "operating",
  },
  {
    id: "72",
    name: "Bohunice",
    country: "Slovakia",
    lat: 48.49,
    lng: 17.67,
    type: "VVER",
    capacity: 0,
    units: 4,
    startYear: 1978,
    status: "shutdown",
  },
];

const TYPE_COLORS: Record<string, string> = {
  PWR: "#3b82f6",
  BWR: "#22c55e",
  CANDU: "#eab308",
  VVER: "#f97316",
  RBMK: "#ef4444",
  Fast: "#a855f7",
  AGR: "#ec4899",
  SMR: "#06b6d4",
  Other: "#6b7280",
};

const STATUS_OPACITY: Record<string, number> = {
  operating: 1,
  construction: 0.85,
  planned: 0.5,
  shutdown: 0.35,
};

const MAP_WIDTH = 960;
const MAP_HEIGHT = 540;

const VERT_LINES = Array.from({ length: 19 }, (_, i) => i * (MAP_WIDTH / 18));
const HORIZ_LINES = Array.from({ length: 10 }, (_, i) => i * (MAP_HEIGHT / 9));

function latLngToXY(lat: number, lng: number) {
  const x = ((lng + 180) / 360) * MAP_WIDTH;
  const y = ((90 - lat) / 180) * MAP_HEIGHT;
  return { x, y };
}

const CONTINENTS = [
  {
    name: "North America",
    path: "M 120,60 L 280,60 L 320,120 L 300,200 L 250,280 L 200,300 L 150,280 L 100,200 L 80,120 Z",
  },
  {
    name: "South America",
    path: "M 220,320 L 300,320 L 320,400 L 300,500 L 260,540 L 220,520 L 200,440 L 200,360 Z",
  },
  {
    name: "Europe",
    path: "M 420,60 L 520,60 L 540,120 L 520,160 L 480,180 L 440,160 L 420,120 Z",
  },
  {
    name: "Africa",
    path: "M 420,200 L 520,200 L 560,280 L 540,400 L 480,460 L 420,400 L 400,300 L 400,240 Z",
  },
  {
    name: "Asia",
    path: "M 540,60 L 800,60 L 880,120 L 900,200 L 860,280 L 780,320 L 680,300 L 600,240 L 560,160 L 540,120 Z",
  },
  {
    name: "Australia",
    path: "M 760,380 L 860,380 L 880,440 L 860,500 L 780,500 L 740,440 Z",
  },
];

export default function ReactorWorldMap() {
  const [search, setSearch] = useState("");
  const [selectedPlant, setSelectedPlant] = useState<NuclearPlant | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set());
  const [selectedStatuses, setSelectedStatuses] = useState<Set<string>>(
    new Set(),
  );
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const allTypes = useMemo(
    () => Array.from(new Set(PLANTS.map((p) => p.type))),
    [],
  );
  const allStatuses = useMemo(
    () => Array.from(new Set(PLANTS.map((p) => p.status))),
    [],
  );

  const filteredPlants = useMemo(() => {
    return PLANTS.filter((plant) => {
      const matchesSearch =
        !search ||
        plant.name.toLowerCase().includes(search.toLowerCase()) ||
        plant.country.toLowerCase().includes(search.toLowerCase());
      const matchesType =
        selectedTypes.size === 0 || selectedTypes.has(plant.type);
      const matchesStatus =
        selectedStatuses.size === 0 || selectedStatuses.has(plant.status);
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [search, selectedTypes, selectedStatuses]);

  const stats = useMemo(() => {
    const operating = filteredPlants.filter((p) => p.status === "operating");
    const totalCapacity = operating.reduce((sum, p) => sum + p.capacity, 0);
    return {
      total: filteredPlants.length,
      operating: operating.length,
      capacity: totalCapacity,
    };
  }, [filteredPlants]);

  const toggleType = useCallback((type: string) => {
    setSelectedTypes((prev) => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  }, []);

  const toggleStatus = useCallback((status: string) => {
    setSelectedStatuses((prev) => {
      const next = new Set(prev);
      if (next.has(status)) next.delete(status);
      else next.add(status);
      return next;
    });
  }, []);

  const handleZoomIn = useCallback(
    () => setZoom((z) => Math.min(z * 1.2, 4)),
    [],
  );
  const handleZoomOut = useCallback(
    () => setZoom((z) => Math.max(z / 1.2, 0.5)),
    [],
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    },
    [pan],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    },
    [isDragging, dragStart],
  );

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Globe className="w-6 h-6 text-primary" />
          <h1 className="text-xl font-bold">Global Nuclear Power Map</h1>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <RadioTower className="w-4 h-4 text-green-500" />
            {stats.operating} Operating
          </span>
          <span>{(stats.capacity / 1000).toFixed(1)} GWe Total</span>
        </div>
      </div>

      <div className="flex h-[calc(100vh-64px)]">
        {/* Left Filter Panel */}
        <div className="w-72 bg-card border-r border-border p-4 overflow-y-auto">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-4 h-4" />
            <h2 className="font-semibold">Filters</h2>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search plants or countries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="w-3 h-3 text-muted-foreground" />
              </button>
            )}
          </div>

          {/* Type Filters */}
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Reactor Type</h3>
            <div className="space-y-1">
              {allTypes.map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-2 cursor-pointer hover:bg-muted/50 rounded px-2 py-1"
                >
                  <input
                    type="checkbox"
                    checked={selectedTypes.has(type)}
                    onChange={() => toggleType(type)}
                    className="rounded border-input"
                  />
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: TYPE_COLORS[type] || "#6b7280" }}
                  />
                  <span className="text-sm">{type}</span>
                  <span className="text-xs text-muted-foreground ml-auto">
                    {PLANTS.filter((p) => p.type === type).length}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Status Filters */}
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Status</h3>
            <div className="space-y-1">
              {allStatuses.map((status) => (
                <label
                  key={status}
                  className="flex items-center gap-2 cursor-pointer hover:bg-muted/50 rounded px-2 py-1 capitalize"
                >
                  <input
                    type="checkbox"
                    checked={selectedStatuses.has(status)}
                    onChange={() => toggleStatus(status)}
                    className="rounded border-input"
                  />
                  <span className="text-sm capitalize">{status}</span>
                  <span className="text-xs text-muted-foreground ml-auto">
                    {PLANTS.filter((p) => p.status === status).length}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-6 pt-4 border-t border-border">
            <h3 className="text-sm font-medium mb-2">Legend</h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span>Operating</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                <span>Under Construction</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400 opacity-50" />
                <span>Planned</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gray-500" />
                <span>Shutdown</span>
              </div>
            </div>
          </div>
        </div>

        {/* Map Area */}
        <div
          className="flex-1 relative bg-[#0a1628] overflow-hidden"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label="Global nuclear power plant map"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              transformOrigin: "center center",
              cursor: isDragging ? "grabbing" : "grab",
            }}
          >
            {/* Ocean */}
            <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill="#0a1628" />

            {/* Grid lines */}
            {VERT_LINES.map((x) => (
              <line
                key={`vl-${x}`}
                x1={x}
                y1={0}
                x2={x}
                y2={MAP_HEIGHT}
                stroke="#1e3a5f"
                strokeWidth={0.5}
                opacity={0.3}
              />
            ))}
            {HORIZ_LINES.map((y) => (
              <line
                key={`hl-${y}`}
                x1={0}
                y1={y}
                x2={MAP_WIDTH}
                y2={y}
                stroke="#1e3a5f"
                strokeWidth={0.5}
                opacity={0.3}
              />
            ))}

            {/* Continents */}
            {CONTINENTS.map((continent) => (
              <path
                key={continent.name}
                d={continent.path}
                fill="#1a2744"
                stroke="#2a4060"
                strokeWidth={1}
              />
            ))}

            {/* Plant markers */}
            {filteredPlants.map((plant) => {
              const { x, y } = latLngToXY(plant.lat, plant.lng);
              const color = TYPE_COLORS[plant.type] || "#6b7280";
              const opacity = STATUS_OPACITY[plant.status] || 1;
              const isSelected = selectedPlant?.id === plant.id;

              return (
                <g key={plant.id}>
                  {/* Pulse effect for operating plants */}
                  {plant.status === "operating" && (
                    <circle cx={x} cy={y} r={8} fill={color} opacity={0.2}>
                      <animate
                        attributeName="r"
                        values="6;12;6"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.4;0;0.4"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}

                  {/* Main marker */}
                  <button
                    type="button"
                    onClick={() => setSelectedPlant(plant)}
                    className="cursor-pointer transition-all duration-200"
                    style={{
                      position: "absolute",
                      left: x - (isSelected ? 7 : 5),
                      top: y - (isSelected ? 7 : 5),
                      width: isSelected ? 14 : 10,
                      height: isSelected ? 14 : 10,
                      borderRadius: "50%",
                      backgroundColor: color,
                      opacity,
                      border: isSelected ? "2px solid #fff" : "none",
                      padding: 0,
                    }}
                    data-ocid={`map.plant.${plant.id}`}
                    aria-label={`${plant.name} ${plant.type} reactor in ${plant.country}`}
                  />

                  {/* Plant label on hover or selection */}
                  {isSelected && (
                    <g>
                      <rect
                        x={x + 10}
                        y={y - 20}
                        width={140}
                        height={40}
                        rx={4}
                        fill="rgba(0,0,0,0.8)"
                        stroke={color}
                        strokeWidth={1}
                      />
                      <text
                        x={x + 15}
                        y={y - 8}
                        fill="#fff"
                        fontSize={10}
                        fontWeight="bold"
                      >
                        {plant.name}
                      </text>
                      <text x={x + 15} y={y + 6} fill="#aaa" fontSize={9}>
                        {plant.type} · {plant.capacity} MW
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Zoom Controls */}
          <div className="absolute bottom-4 right-4 flex flex-col gap-2">
            <button
              type="button"
              onClick={handleZoomIn}
              className="p-2 bg-card border border-border rounded-lg hover:bg-muted transition-colors"
              data-ocid="map.zoom_in.button"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleZoomOut}
              className="p-2 bg-card border border-border rounded-lg hover:bg-muted transition-colors"
              data-ocid="map.zoom_out.button"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
          </div>

          {/* Stats overlay */}
          <div className="absolute top-4 left-4 bg-card/90 backdrop-blur border border-border rounded-lg p-3">
            <div className="text-sm font-medium">
              {stats.total} Plants Shown
            </div>
            <div className="text-xs text-muted-foreground">
              {stats.operating} operating · {(stats.capacity / 1000).toFixed(1)}{" "}
              GWe
            </div>
          </div>
        </div>

        {/* Detail Panel */}
        <AnimatePresence>
          {selectedPlant && (
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="w-80 bg-card border-l border-border p-5 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">{selectedPlant.name}</h2>
                <button
                  type="button"
                  onClick={() => setSelectedPlant(null)}
                  className="p-1 hover:bg-muted rounded"
                  data-ocid="detail.close.button"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span
                    className="px-2 py-1 rounded text-xs font-medium text-white"
                    style={{ backgroundColor: TYPE_COLORS[selectedPlant.type] }}
                  >
                    {selectedPlant.type}
                  </span>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium capitalize ${
                      selectedPlant.status === "operating"
                        ? "bg-green-500/20 text-green-400"
                        : selectedPlant.status === "construction"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : selectedPlant.status === "planned"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-gray-500/20 text-gray-400"
                    }`}
                  >
                    {selectedPlant.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-muted/50 rounded p-2">
                    <div className="text-xs text-muted-foreground">Country</div>
                    <div className="font-medium">{selectedPlant.country}</div>
                  </div>
                  <div className="bg-muted/50 rounded p-2">
                    <div className="text-xs text-muted-foreground">
                      Capacity
                    </div>
                    <div className="font-medium">
                      {selectedPlant.capacity.toLocaleString()} MW
                    </div>
                  </div>
                  <div className="bg-muted/50 rounded p-2">
                    <div className="text-xs text-muted-foreground">Units</div>
                    <div className="font-medium">{selectedPlant.units}</div>
                  </div>
                  <div className="bg-muted/50 rounded p-2">
                    <div className="text-xs text-muted-foreground">
                      Start Year
                    </div>
                    <div className="font-medium">{selectedPlant.startYear}</div>
                  </div>
                </div>

                <div className="bg-muted/50 rounded p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Location</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Lat: {selectedPlant.lat.toFixed(2)}°, Lng:{" "}
                    {selectedPlant.lng.toFixed(2)}°
                  </div>
                </div>

                {selectedPlant.notes && (
                  <div className="bg-muted/50 rounded p-3">
                    <div className="text-sm text-muted-foreground">
                      {selectedPlant.notes}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
