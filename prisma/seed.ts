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
  // (Kosong untuk mode production, agar diisi melalui panel Admin)
  if (await prisma.agendaEvent.count() === 0) {
    console.log("No Agenda Events seeded (production ready)");
  }

  // 4. Create Tourism
  // (Kosong untuk mode production, agar diisi melalui panel Admin)
  if (await prisma.tourismSpot.count() === 0) {
    console.log("No Tourism Spots seeded (production ready)");
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
