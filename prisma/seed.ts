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
        heroTagline: "Digital Village Excellence",
        heroDescription:
          "Harmoni Alam dan Tradisi: Membangun masa depan digital yang berakar pada nilai-nilai agraris dan keberlanjutan lingkungan Sulawesi Tengah.",
        visionTitle: "Visi Masa Depan Digital",
        visionDescription:
          "Menjadi pionir desa digital di Indonesia Timur yang mengintegrasikan teknologi blockchain untuk transparansi desa dan AI untuk efisiensi agrikultur.",
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
