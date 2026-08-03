import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function clean() {
  console.log("🧹 [DB CLEAN] Memulai pembersihan data dinamis database...");

  try {
    // 1. Clean dynamic content
    const deletedAgendas = await prisma.agendaEvent.deleteMany({});
    console.log(`✅ Dihapus: ${deletedAgendas.count} Agenda Kegiatan`);

    const deletedTourism = await prisma.tourismSpot.deleteMany({});
    console.log(`✅ Dihapus: ${deletedTourism.count} Destinasi Wisata`);

    const deletedTestimonies = await prisma.testimony.deleteMany({});
    console.log(`✅ Dihapus: ${deletedTestimonies.count} Testimoni`);

    // 2. Reset CMS Settings to canonical baseline
    const existingSettings = await prisma.cmsSettings.findFirst();
    const baselineData = {
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

    if (existingSettings) {
      await prisma.cmsSettings.update({
        where: { id: existingSettings.id },
        data: baselineData,
      });
      console.log("✅ Reset: Pengaturan CMS dikembalikan ke data default Desa Malakosa.");
    } else {
      await prisma.cmsSettings.create({
        data: baselineData,
      });
      console.log("✅ Dibuat: Pengaturan CMS baru default.");
    }

    console.log("✨ [DB CLEAN SELESAI] Database bersih dan siap untuk data produksi baru.");
  } catch (error) {
    console.error("❌ Error saat membersihkan database:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

clean();
