

export function formatDateToIndonesian(dateString: string) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString; // fallback
  const months = [
    "JANUARI", "FEBRUARI", "MARET", "APRIL", "MEI", "JUNI",
    "JULI", "AGUSTUS", "SEPTEMBER", "OKTOBER", "NOVEMBER", "DESEMBER"
  ];
  const day = String(date.getDate()).padStart(2, '0');
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

export interface VillageStats {
  population: number;
  dusunCount: number;
  kkCount: number;
  connectivityIndex: number;
  productiveLandArea: number;
  productiveActivePercent: number;
  growthRate: string;
}

export interface AgendaEvent {
  id: string;
  date: string;
  title: string;
  desc: string;
  location: string;
}

export interface TourismSpot {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl?: string;
  content?: string;
  visitorCount: number;
  status: string;
}

export interface Testimony {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
}

export interface VillageCMSData {
  heroTitle: string;
  heroTagline: string;
  heroDescription: string;
  visionTitle: string;
  visionDescription: string;
  dusunList: string[];
  stats: VillageStats;
  agenda: AgendaEvent[];
  tourism: TourismSpot[];
  testimonies: Testimony[];
}

export const DEFAULT_CMS_DATA: VillageCMSData = {
  heroTitle: "DESA MALAKOSA",
  heroTagline: "Digital Village Excellence",
  heroDescription:
    "Harmoni Alam dan Tradisi: Membangun masa depan digital yang berakar pada nilai-nilai agraris dan keberlanjutan lingkungan Sulawesi Tengah.",
  visionTitle: "Visi Masa Depan Digital",
  visionDescription:
    "Menjadi pionir desa digital di Indonesia Timur yang mengintegrasikan teknologi blockchain untuk transparansi desa dan AI untuk efisiensi agrikultur.",
  dusunList: [
    "PANTE", "KAILI JAYA", "SINTUVU", "UNA-UNA", "KALBA",
    "MADURATNA", "INDRA PRASTA", "TAMAN BALI", "TAMASOVO"
  ],
  stats: {
    population: 1248,
    dusunCount: 9,
    kkCount: 312,
    connectivityIndex: 98,
    productiveLandArea: 42,
    productiveActivePercent: 75,
    growthRate: "+2.4% Pertumbuhan Tahun Ini",
  },
  agenda: [],
  tourism: [],
  testimonies: [],
};

export { CMSProvider, useCMSData } from "./cms-provider";
