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

  // 3. Tourism Spots (Starter Data jika kosong)
  const tourismCount = await prisma.tourismSpot.count();
  if (tourismCount === 0) {
    const starterSpots = [
      {
        id: "pantai-malakosa-indah",
        title: "Pantai Malakosa Indah",
        category: "Wisata Bahari & Pesisir",
        description: "Garis pantai berpasir eksotis dengan panorama matahari terbit dan hembusan angin laut Teluk Tomini yang menenangkan.",
        imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
        visitorCount: 1420,
        status: "Buka Setiap Hari",
        content: `Pantai Malakosa Indah menyajikan keasrian alam pesisir Teluk Tomini di Sulawesi Tengah. Dikelilingi pohon kelapa yang rindang dan air laut jernih, pantai ini menjadi destinasi unggulan untuk rekreasi keluarga, memancing, dan menikmati kuliner laut segar khas lokal.

### Fasilitas Tersedia
- Area Parkir Luas & Aman
- Gazebo Santai di Tepi Pantai
- Warung Kuliner & Kelapa Muda Segar
- Toilet & Musholla Bersih
- Spot Foto Instagramable Matahari Terbit`,
      },
      {
        id: "agrowisata-kebun-malakosa",
        title: "Agrowisata Alam Malakosa",
        category: "Agrowisata & Edukasi",
        description: "Hamparan perkebunan cengkeh, kelapa, dan kakao yang asri dengan latar perbukitan hijau Sulawesi Tengah.",
        imageUrl: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?q=80&w=1200&auto=format&fit=crop",
        visitorCount: 890,
        status: "Buka Setiap Hari",
        content: `Kawasan agrowisata terpadu Desa Malakosa memadukan keindahan lanskap perkebunan tradisional dengan edukasi pertanian modern. Pengunjung dapat mempelajari teknik budidaya tanaman rempah, memetik hasil panen, dan menikmati suasana pedesaan yang sejuk dan asri.`,
      },
    ];

    for (const spot of starterSpots) {
      await prisma.tourismSpot.create({ data: spot });
    }
    console.log(`🏝️ [WISATA] ${starterSpots.length} Destinasi wisata starter berhasil ditambahkan.`);
  } else {
    console.log(`🏝️ [WISATA] ${tourismCount} Destinasi wisata sudah ada di database.`);
  }

  // 4. Agenda Events (Starter Data jika kosong)
  const agendaCount = await prisma.agendaEvent.count();
  if (agendaCount === 0) {
    const starterAgendas = [
      {
        id: "musrenbangdes-2026",
        date: "2026-08-15",
        title: "Musyawarah Perencanaan Desa (Musrenbang)",
        desc: "Forum partisipatif warga desa dan perwakilan 9 dusun untuk merumuskan prioritas pembangunan dan anggaran tahun berjalan.",
        location: "Balai Pertemuan Desa Malakosa",
      },
      {
        id: "posyandu-balita-lansia",
        date: "2026-08-20",
        title: "Layanan Kesehatan Posyandu Terpadu",
        desc: "Pemeriksaan kesehatan gratis, imunisasi balita, dan konsultasi gizi untuk masyarakat dari seluruh wilayah dusun.",
        location: "Puskesdes Dusun Kaili Jaya",
      },
      {
        id: "festival-budaya-kaili",
        date: "2026-09-05",
        title: "Festival Seni & Tradisi Gotong Royong",
        desc: "Perayaan warisan adat suku Kaili dengan penampilan seni tari tradisional, pameran kuliner UMKM, dan lomba antar-dusun.",
        location: "Lapangan Sepak Bola Malakosa",
      },
    ];

    for (const event of starterAgendas) {
      await prisma.agendaEvent.create({ data: event });
    }
    console.log(`📅 [AGENDA] ${starterAgendas.length} Agenda kegiatan starter berhasil ditambahkan.`);
  } else {
    console.log(`📅 [AGENDA] ${agendaCount} Agenda kegiatan sudah ada di database.`);
  }

  // 5. Testimonies (Starter Data jika kosong)
  const testimonyCount = await prisma.testimony.count();
  if (testimonyCount === 0) {
    const starterTestimonies = [
      {
        id: "testimoni-1",
        name: "Bapak Ruslan",
        role: "Tokoh Masyarakat & Petani",
        rating: 5,
        text: "Portal digital desa ini sangat memudahkan kami memantau perkembangan desa dan informasi transparansi hasil pertanian secara langsung.",
      },
      {
        id: "testimoni-2",
        name: "Siti Rahmawati",
        role: "Pelaku UMKM Dusun Pante",
        rating: 5,
        text: "Informasi agenda desa dan promosi wisata pantai sangat membantu usaha kuliner lokal kami semakin dikenal banyak pengunjung.",
      },
      {
        id: "testimoni-3",
        name: "dr. Hendra",
        role: "Pengunjung / Wisatawan",
        rating: 5,
        text: "Keindahan alam pantai dan keramahan warga Desa Malakosa sungguh berkesan. Suasana asri dan informasinya sangat lengkap di website.",
      },
    ];

    for (const test of starterTestimonies) {
      await prisma.testimony.create({ data: test });
    }
    console.log(`💬 [TESTIMONI] ${starterTestimonies.length} Testimoni starter berhasil ditambahkan.`);
  } else {
    console.log(`💬 [TESTIMONI] ${testimonyCount} Testimoni sudah ada di database.`);
  }

  console.log("✨ [DB SEED SELESAI] Seluruh data awal siap untuk production!");
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