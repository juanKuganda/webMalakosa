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
  population: number | string;
  dusunCount: number;
  kkCount: number | string;
  religionCount: number | string;
  productiveLandArea: number | string;
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
  visitorCount: number | string;
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
  heroTagline: "Malakosa - Harmoni Alam dan Tradisi",
  heroDescription:
    "Membangun masa depan digital yang berakar pada nilai-nilai agraris dan keberlanjutan lingkungan Sulawesi Tengah.",
  visionTitle: "Pilar Desa: Alam, Sejarah, Sosial",
  visionDescription:
    "Masyarakat Desa Malakosa didominasi oleh Suku Kaili dengan tradisi gotong royong agraris peninggalan Kerajaan Balinggi.",
  dusunList: [
    "PANTE", "KAILI JAYA", "SINTUVU", "UNA-UNA", "KALBA",
    "MADURATNA", "INDRA PRASTA", "TAMAN BALI", "TAMASOVO"
  ],
  stats: {
    population: 2343,
    dusunCount: 9,
    kkCount: 730,
    religionCount: 4,
    productiveLandArea: 42,
    productiveActivePercent: 75,
    growthRate: "Berdasarkan Data Juni 2026",
  },
  agenda: [],
  tourism: [],
  testimonies: [],
};

export { CMSProvider, useCMSData } from "./cms-provider";