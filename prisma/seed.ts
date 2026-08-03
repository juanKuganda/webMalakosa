import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 [DB SEED] Menyiapkan data awal sistem Desa Malakosa...");

  // 1. Ensure Default Admin User exists
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
    console.log("👤 [ADMIN] Default Admin User dibuat: username: 'admin' / password: 'admin123'");
  } else {
    console.log("👤 [ADMIN] Admin user sudah terdaftar di sistem.");
  }

  // 2. Canonical CMS Settings
  const baselineSettings = {
    heroTitle: "DESA MALAKOSA",
    heroTagline: "Malakosa - Harmoni Alam dan Tradisi",
    heroDescription:
      "Membangun masa depan digital yang berakar pada nilai-nilai agraris dan keberlanjutan lingkungan Sulawesi Tengah.",
    visionTitle: "Pilar Desa: Alam, Sejarah, Sosial",
    visionDescription:
      "Masyarakat Desa Malakosa didominasi oleh Suku Kaili dengan tradisi gotong royong agraris peninggalan Kerajaan Balinggi.",
    population: 2343,
    dusunCount: 9,
    dusunList: JSON.stringify([
      "PANTE",
      "KAILI JAYA",
      "SINTUVU",
      "UNA-UNA",
      "KALBA",
      "MADURATNA",
      "INDRA PRASTA",
      "TAMAN BALI",
      "TAMASOVO",
    ]),
    kkCount: 730,
    religionCount: 4,
    productiveLandArea: 42,
    productiveActivePercent: 75,
    growthRate: "Berdasarkan Data Juni 2026",
  };

  const existingSettings = await prisma.cmsSettings.findFirst();
  if (!existingSettings) {
    await prisma.cmsSettings.create({
      data: baselineSettings,
    });
    console.log("📊 [SETTINGS] Pengaturan statistik Desa Malakosa berhasil diinisialisasi.");
  } else {
    await prisma.cmsSettings.update({
      where: { id: existingSettings.id },
      data: {
        population: 2343,
        dusunCount: 9,
        dusunList: baselineSettings.dusunList,
        kkCount: 730,
        religionCount: 4,
        productiveLandArea: 42,
        productiveActivePercent: 75,
        growthRate: "Berdasarkan Data Juni 2026",
      },
    });
    console.log("📊 [SETTINGS] Pengaturan statistik Desa Malakosa disinkronkan.");
  }

  console.log("✨ [DB SEED SELESAI] Admin dan konfigurasi statistik siap untuk data produksi!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Error saat seeding database:", e);
    await prisma.$disconnect();
    process.exit(1);
  });