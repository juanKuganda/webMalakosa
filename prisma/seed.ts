import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // 1. Create Default Admin
  const adminExists = await prisma.adminUser.findUnique({
    where: { username: "admin" },
  });

  if (!adminExists) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash("admin123", salt);
    await prisma.adminUser.create({
      data: {
        username: "admin",
        passwordHash,
      },
    });
    console.log("Created default admin user: admin / admin123");
  }

  // 2. Create Default CMS Data (if not exists)
  const settingsCount = await prisma.cmsSettings.count();
  if (settingsCount === 0) {
    await prisma.cmsSettings.create({
      data: {
        heroTitle: "DESA MALAKOSA",
        heroTagline: "Malakosa - Harmoni Alam dan Tradisi",
        heroDescription:
          "Membangun masa depan digital yang berakar pada nilai-nilai agraris dan keberlanjutan lingkungan Sulawesi Tengah.",
        visionTitle: "Pilar Desa: Alam, Sejarah, Sosial",
        visionDescription:
          "Masyarakat Desa Malakosa didominasi oleh Suku Kaili dengan tradisi gotong royong agraris peninggalan Kerajaan Balinggi.",
        population: 1248,
        dusunCount: 9,
        dusunList: JSON.stringify(["PANTE", "KAILI JAYA", "SINTUVU", "UNA-UNA", "KALBA", "MADURATNA", "INDRA PRASTA", "TAMAN BALI", "TAMASOVO"]),
        kkCount: 312,
        connectivityIndex: 98,
        productiveLandArea: 42,
        productiveActivePercent: 75,
        growthRate: "+2.4% Pertumbuhan Tahun Ini",
      },
    });
    console.log("Created default CMS Settings");
  }

  // 3. Create Agenda
  if (await prisma.agendaEvent.count() === 0) {
    const agendas = [
      {
        date: "Senin - Jumat",
        title: "Surat Keterangan Usaha (SKU)",
        desc: "Layanan untuk pengurusan SKU warga. Harap membawa KTP dan KK ke kantor desa.",
        location: "Kantor Desa"
      },
      {
        date: "Senin - Jumat",
        title: "Pembuatan KTP & KK Baru",
        desc: "Layanan pengurusan administrasi kependudukan dasar bagi masyarakat.",
        location: "Kantor Desa"
      },
      {
        date: "Sesuai Jadwal",
        title: "Layanan Pertanian & UMKM",
        desc: "Konsultasi produk UMKM dan pendataan hasil panen warga Desa Malakosa.",
        location: "Balai Desa"
      }
    ];

    for (const item of agendas) {
      await prisma.agendaEvent.create({ data: item });
    }
    console.log("Created default Agenda Events");
  }

  // 4. Create Tourism
  if (await prisma.tourismSpot.count() === 0) {
    const spots = [
      {
        title: "Raja Pue Pilingi",
        category: "Sejarah Kerajaan",
        description: "Pue Pilingi adalah pendiri pertahanan dan Magau (Raja) pertama Kerajaan Balinggi yang berkuasa antara tahun 1516 hingga 1593.",
        visitorCount: 1516,
        status: "Bersejarah"
      },
      {
        title: "Pohon Balinggi",
        category: "Asal Usul",
        description: "Cikal bakal nama Balinggi berasal dari sebuah pohon raksasa dengan akar tinggi-tinggi yang terletak di sebelah barat gunung.",
        visitorCount: 1515,
        status: "Leluhur"
      },
      {
        title: "Kepemimpinan Koroma",
        category: "Kepala Kampung",
        description: "Koroma adalah Kepala Kampung Malakosa pertama (1918-1944) dan penerus dari raja terakhir (Pue Siombinanga).",
        visitorCount: 1918,
        status: "Silsilah"
      }
    ];

    for (const item of spots) {
      await prisma.tourismSpot.create({ data: item });
    }
    console.log("Created default Tourism Spots");
  }

}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
