export type ReferenceType =
  | "iaea"
  | "nndc"
  | "nist"
  | "paper"
  | "book"
  | "wna"
  | "regulatory"
  | "unscear"
  | "oecd";

export interface Reference {
  id: number;
  authors: string;
  title: string;
  source: string;
  year: number;
  url: string;
  type: ReferenceType;
}

export const references: Reference[] = [
  // ── IAEA ────────────────────────────────────────────────────────────────────
  {
    id: 1,
    authors: "IAEA",
    title: "Nuclear Safety and Security",
    source: "International Atomic Energy Agency",
    year: 2023,
    url: "https://www.iaea.org/topics/nuclear-safety-and-security",
    type: "iaea",
  },
  {
    id: 2,
    authors: "IAEA",
    title: "Nuclear Power Reactors in the World — Reference Data Series No. 2",
    source: "IAEA-RDS-2/43, Vienna",
    year: 2023,
    url: "https://www.iaea.org/publications/15210/nuclear-power-reactors-in-the-world",
    type: "iaea",
  },
  {
    id: 3,
    authors: "IAEA",
    title:
      "Radiation Protection and Safety of Radiation Sources: International Basic Safety Standards",
    source: "IAEA Safety Standards Series No. GSR Part 3",
    year: 2014,
    url: "https://www.iaea.org/publications/8930/radiation-protection-and-safety-of-radiation-sources-international-basic-safety-standards",
    type: "iaea",
  },
  {
    id: 19,
    authors: "IAEA Nuclear Data Section",
    title: "Live Chart of Nuclides",
    source: "IAEA-NDS, Vienna",
    year: 2024,
    url: "https://nds.iaea.org/relnsd/vcharthtml/VChartHTML.html",
    type: "iaea",
  },
  {
    id: 24,
    authors: "IAEA",
    title: "Safety of Nuclear Power Plants: Design",
    source: "IAEA Safety Standards Series No. SSR-2/1 (Rev. 1)",
    year: 2016,
    url: "https://www.iaea.org/publications/10884/safety-of-nuclear-power-plants-design",
    type: "iaea",
  },
  {
    id: 25,
    authors: "IAEA",
    title: "Classification of Radioactive Waste",
    source: "GSG-1, International Atomic Energy Agency, Vienna",
    year: 2009,
    url: "https://www.iaea.org/publications/8154/classification-of-radioactive-waste",
    type: "iaea",
  },
  {
    id: 26,
    authors: "IAEA",
    title: "Nuclear Power Reactor Information System (PRIS)",
    source: "International Atomic Energy Agency",
    year: 2022,
    url: "https://pris.iaea.org",
    type: "iaea",
  },
  {
    id: 27,
    authors: "IAEA",
    title:
      "INES: The International Nuclear and Radiological Event Scale User's Manual, 2013 Edition",
    source: "International Atomic Energy Agency, Vienna",
    year: 2013,
    url: "https://www.iaea.org/publications/8901/ines",
    type: "iaea",
  },
  {
    id: 36,
    authors: "IAEA",
    title:
      "Radiation Protection and Safety of Radiation Sources: International Basic Safety Standards",
    source: "GSR Part 3, International Atomic Energy Agency",
    year: 2014,
    url: "https://www.iaea.org/publications/8930/radiation-protection-and-safety-of-radiation-sources-international-basic-safety-standards",
    type: "iaea",
  },
  {
    id: 47,
    authors: "INSAG-12",
    title: "Basic Safety Principles for Nuclear Power Plants",
    source: "IAEA Safety Series, International Nuclear Safety Advisory Group",
    year: 1999,
    url: "https://www.iaea.org/publications/3664/basic-safety-principles-for-nuclear-power-plants",
    type: "iaea",
  },
  {
    id: 48,
    authors: "INSAG-4",
    title: "Safety Culture",
    source: "Safety Series No. 75-INSAG-4, International Atomic Energy Agency",
    year: 1991,
    url: "https://www.iaea.org/publications/3734/safety-culture",
    type: "iaea",
  },
  // ── NNDC / Nuclear Data ─────────────────────────────────────────────────────
  {
    id: 4,
    authors: "Browne E. and Tuli J. K.",
    title: "Nuclear Data Sheets for A = 99 (ENSDF)",
    source: "Nuclear Data Sheets, Elsevier",
    year: 2015,
    url: "https://www.nndc.bnl.gov/nudat3/",
    type: "nndc",
  },
  {
    id: 5,
    authors: "National Nuclear Data Center",
    title: "Evaluated Nuclear Structure Data File (ENSDF)",
    source: "Brookhaven National Laboratory",
    year: 2024,
    url: "https://www.nndc.bnl.gov/ensdf/",
    type: "nndc",
  },
  {
    id: 6,
    authors: "National Nuclear Data Center",
    title: "Chart of Nuclides — NuDat 3",
    source: "Brookhaven National Laboratory",
    year: 2024,
    url: "https://www.nndc.bnl.gov/nudat3/",
    type: "nndc",
  },
  {
    id: 18,
    authors: "IAEA Nuclear Data Section",
    title: "EXFOR — Experimental Nuclear Reaction Data Library",
    source: "IAEA Nuclear Data Services, Vienna",
    year: 2024,
    url: "https://www-nds.iaea.org/exfor/",
    type: "nndc",
  },
  // ── NIST ────────────────────────────────────────────────────────────────────
  {
    id: 9,
    authors: "NIST",
    title:
      "Atomic Weights and Isotopic Compositions with Relative Atomic Masses",
    source: "National Institute of Standards and Technology",
    year: 2023,
    url: "https://physics.nist.gov/cgi-bin/Compositions/stand_alone.pl",
    type: "nist",
  },
  {
    id: 10,
    authors: "NIST",
    title: "X-Ray Mass Attenuation Coefficients (XCOM)",
    source: "National Institute of Standards and Technology",
    year: 2023,
    url: "https://physics.nist.gov/PhysRefData/Xcom/html/xcom1.html",
    type: "nist",
  },
  // ── Books ────────────────────────────────────────────────────────────────────
  {
    id: 11,
    authors: "Krane K. S.",
    title: "Introductory Nuclear Physics",
    source: "John Wiley & Sons",
    year: 1988,
    url: "https://www.wiley.com/en-us/Introductory+Nuclear+Physics-p-9780471805533",
    type: "book",
  },
  {
    id: 12,
    authors: "Lamarsh J. R. and Baratta A. J.",
    title: "Introduction to Nuclear Engineering (3rd ed.)",
    source: "Prentice Hall",
    year: 2001,
    url: "https://www.pearson.com/us/higher-education/program/Lamarsh-Introduction-to-Nuclear-Engineering-3rd-Edition/PGM101529.html",
    type: "book",
  },
  {
    id: 13,
    authors: "Duderstadt J. J. and Hamilton L. J.",
    title: "Nuclear Reactor Analysis",
    source: "John Wiley & Sons",
    year: 1976,
    url: "https://www.wiley.com/en-us/Nuclear+Reactor+Analysis-p-9780471223634",
    type: "book",
  },
  {
    id: 20,
    authors: "Heyde K.",
    title: "Basic Ideas and Concepts in Nuclear Physics (3rd ed.)",
    source: "Institute of Physics Publishing",
    year: 2004,
    url: "https://doi.org/10.1887/0750309806",
    type: "book",
  },
  {
    id: 29,
    authors: "Glasstone S. and Sesonske A.",
    title: "Nuclear Reactor Engineering (4th ed.)",
    source: "Springer",
    year: 1994,
    url: "https://www.springer.com/gp/book/9780412985317",
    type: "book",
  },
  {
    id: 30,
    authors: "Knoll G. F.",
    title: "Radiation Detection and Measurement (4th ed.)",
    source: "John Wiley & Sons",
    year: 2010,
    url: "https://www.wiley.com/en-us/Radiation+Detection+and+Measurement%2C+4th+Edition-p-9780470131480",
    type: "book",
  },
  // ── Peer-reviewed Papers ─────────────────────────────────────────────────────
  {
    id: 7,
    authors: "Huang W. J. et al.",
    title: "The AME 2020 atomic mass evaluation (I)",
    source: "Chinese Physics C 45, 030002",
    year: 2021,
    url: "https://doi.org/10.1088/1674-1137/abddb0",
    type: "paper",
  },
  {
    id: 8,
    authors: "Wang M. et al.",
    title: "The AME 2020 atomic mass evaluation (II)",
    source: "Chinese Physics C 45, 030003",
    year: 2021,
    url: "https://doi.org/10.1088/1674-1137/abddaf",
    type: "paper",
  },
  {
    id: 17,
    authors: "Brown D. A. et al.",
    title:
      "ENDF/B-VIII.0: The 8th Major Release of the Nuclear Reaction Data Library",
    source: "Nuclear Data Sheets 148, 1–142",
    year: 2018,
    url: "https://doi.org/10.1016/j.nds.2018.02.001",
    type: "paper",
  },
  {
    id: 21,
    authors: "Chadwick J.",
    title: "Possible Existence of a Neutron",
    source: "Nature 129, 312",
    year: 1932,
    url: "https://doi.org/10.1038/129312a0",
    type: "paper",
  },
  {
    id: 22,
    authors: "Hahn O. and Strassmann F.",
    title:
      "Über den Nachweis und das Verhalten der bei der Bestrahlung des Urans mittels Neutronen entstehenden Erdalkalimetalle",
    source: "Naturwissenschaften 27(1), 11–15",
    year: 1939,
    url: "https://doi.org/10.1007/BF01488241",
    type: "paper",
  },
  {
    id: 38,
    authors: "Meitner L. and Frisch O. R.",
    title:
      "Disintegration of uranium by neutrons: a new type of nuclear reaction",
    source: "Nature 143, 239–240",
    year: 1939,
    url: "https://doi.org/10.1038/143239a0",
    type: "paper",
  },
  {
    id: 39,
    authors: "NIF Team",
    title:
      "Achievement of target gain larger than unity in an inertial fusion experiment",
    source: "Nature 601(7891), 542–548",
    year: 2022,
    url: "https://doi.org/10.1038/s41586-021-04183-x",
    type: "paper",
  },
  {
    id: 40,
    authors: "ICRP",
    title:
      "The 2007 Recommendations of the International Commission on Radiological Protection",
    source: "ICRP Publication 103, Ann. ICRP 37(2-4)",
    year: 2007,
    url: "https://www.icrp.org/publication.asp?id=ICRP%20Publication%20103",
    type: "paper",
  },
  // ── WNA ─────────────────────────────────────────────────────────────────────
  {
    id: 14,
    authors: "World Nuclear Association",
    title: "Nuclear Power Reactors — Information Library",
    source: "World Nuclear Association",
    year: 2024,
    url: "https://world-nuclear.org/information-library/nuclear-fuel-cycle/nuclear-power-reactors/nuclear-power-reactors.aspx",
    type: "wna",
  },
  {
    id: 15,
    authors: "World Nuclear Association",
    title: "Radiation and Health",
    source: "World Nuclear Association",
    year: 2024,
    url: "https://world-nuclear.org/information-library/safety-and-security/radiation-and-health/radiation-and-health.aspx",
    type: "wna",
  },
  {
    id: 35,
    authors: "World Nuclear Association",
    title: "Nuclear Power Economics",
    source: "World Nuclear Association",
    year: 2024,
    url: "https://www.world-nuclear.org/information-library/economic-aspects/economics-of-nuclear-power.aspx",
    type: "wna",
  },
  // ── UNSCEAR ─────────────────────────────────────────────────────────────────
  {
    id: 16,
    authors: "UNSCEAR",
    title:
      "Sources, Effects and Risks of Ionizing Radiation — Annex A: Radiation exposures from electricity generation",
    source:
      "United Nations Scientific Committee on the Effects of Atomic Radiation",
    year: 2020,
    url: "https://www.unscear.org/publications",
    type: "unscear",
  },
  {
    id: 32,
    authors: "UNSCEAR",
    title: "Report on Health Effects of the Fukushima Accident",
    source:
      "United Nations Scientific Committee on the Effects of Atomic Radiation",
    year: 2021,
    url: "https://www.unscear.org/publications",
    type: "unscear",
  },
  {
    id: 33,
    authors: "UNSCEAR",
    title: "Health Effects Due to Radiation from the Chernobyl Accident",
    source:
      "United Nations Scientific Committee on the Effects of Atomic Radiation",
    year: 2008,
    url: "https://www.unscear.org/unscear/en/publications/2008_2.html",
    type: "unscear",
  },
  // ── Regulatory ──────────────────────────────────────────────────────────────
  {
    id: 23,
    authors: "NRC",
    title: "Pressurized Water Reactors — Nuclear Regulatory Commission",
    source: "U.S. Nuclear Regulatory Commission",
    year: 2023,
    url: "https://www.nrc.gov/reactors/pwrs.html",
    type: "regulatory",
  },
  {
    id: 28,
    authors: "U.S. NRC",
    title:
      "Title 10 Code of Federal Regulations Part 50: Domestic Licensing of Production and Utilization Facilities",
    source: "U.S. Nuclear Regulatory Commission",
    year: 2024,
    url: "https://www.nrc.gov/reading-rm/doc-collections/cfr/part050/",
    type: "regulatory",
  },
  {
    id: 42,
    authors: "Sargent & Lundy",
    title: "Advanced Nuclear Technology: Small Modular Reactor Cost Estimates",
    source: "U.S. Department of Energy",
    year: 2020,
    url: "https://www.energy.gov/ne/advanced-nuclear",
    type: "regulatory",
  },
  // ── OECD / NEA / IEA ────────────────────────────────────────────────────────
  {
    id: 31,
    authors: "NEA/OECD",
    title: "Uranium Resources, Production and Demand: Red Book",
    source: "OECD Nuclear Energy Agency",
    year: 2022,
    url: "https://www.oecd-nea.org/jcms/pl_15791/uranium-2022-resources-production-and-demand",
    type: "oecd",
  },
  {
    id: 43,
    authors: "IPCC",
    title:
      "AR6 Climate Change 2022: Mitigation of Climate Change — Chapter 6: Energy Systems",
    source: "Intergovernmental Panel on Climate Change",
    year: 2022,
    url: "https://www.ipcc.ch/report/ar6/wg3/",
    type: "oecd",
  },
  {
    id: 44,
    authors: "IEA",
    title: "World Energy Outlook 2023",
    source: "International Energy Agency",
    year: 2023,
    url: "https://www.iea.org/reports/world-energy-outlook-2023",
    type: "oecd",
  },
];
