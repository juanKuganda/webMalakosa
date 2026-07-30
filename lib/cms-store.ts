

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
    population: 1248,
    dusunCount: 9,
    kkCount: 312,
    connectivityIndex: 98,
    productiveLandArea: 42,
    productiveActivePercent: 75,
    growthRate: "+2.4% Pertumbuhan Tahun Ini",
  },
  agenda: [
    {
      id: "lyn-1",
      date: "Senin - Jumat",
      title: "Surat Keterangan Usaha (SKU)",
      desc: "Layanan untuk pengurusan SKU warga. Harap membawa KTP dan KK ke kantor desa.",
      location: "Kantor Desa"
    },
    {
      id: "lyn-2",
      date: "Senin - Jumat",
      title: "Pembuatan KTP & KK Baru",
      desc: "Layanan pengurusan administrasi kependudukan dasar bagi masyarakat.",
      location: "Kantor Desa"
    },
    {
      id: "lyn-3",
      date: "Sesuai Jadwal",
      title: "Layanan Pertanian & UMKM",
      desc: "Konsultasi produk UMKM dan pendataan hasil panen warga Desa Malakosa.",
      location: "Balai Desa"
    }
  ],
  tourism: [
    {
      id: "sjr-1",
      title: "Raja Pue Pilingi",
      category: "Sejarah Kerajaan",
      description: "Pue Pilingi adalah pendiri pertahanan dan Magau (Raja) pertama Kerajaan Balinggi yang berkuasa antara tahun 1516 hingga 1593.",
      visitorCount: 1516,
      status: "Bersejarah"
    },
    {
      id: "sjr-2",
      title: "Pohon Balinggi",
      category: "Asal Usul",
      description: "Cikal bakal nama Balinggi berasal dari sebuah pohon raksasa dengan akar tinggi-tinggi yang terletak di sebelah barat gunung.",
      visitorCount: 1515,
      status: "Leluhur"
    },
    {
      id: "sjr-3",
      title: "Kepemimpinan Koroma",
      category: "Kepala Kampung",
      description: "Koroma adalah Kepala Kampung Malakosa pertama (1918-1944) dan penerus dari raja terakhir (Pue Siombinanga).",
      visitorCount: 1918,
      status: "Silsilah"
    }
  ],
  testimonies: [],
};

export { CMSProvider, useCMSData } from "./cms-provider";
