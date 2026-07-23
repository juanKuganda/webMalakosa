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
        heroImageUrl:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAiumhETyJOqy-tu6f72izosxebktepHeRY2qE9gqK6sKGGw_eDBNyb76dEehOR-hLTHyQc0rgjJ3iVwFyaIrtdZ6-Xwrxlyy68EnJ0Xu-RVHG78xMzob9r-x6L5rTK1Z2FLrIW9i0A02MNAtbD34Ycxj2IVh42ptj4rg52XECfb3UfaidzLqc39D0VSFzz35Cvn4BYBf-rr-c2TffETrOOVNEBxESzBSDvNxoLaHv812tx4V2dBwhL2A",
        visionTitle: "Visi Masa Depan Digital",
        visionDescription:
          "Menjadi pionir desa digital di Indonesia Timur yang mengintegrasikan teknologi blockchain untuk transparansi desa dan AI untuk efisiensi agrikultur.",
        population: 1248,
        dusunCount: 5,
        kkCount: 312,
        connectivityIndex: 98,
        agriculturalLand: 42,
        agriculturalActivePercent: 75,
        growthRate: "+2.4% Pertumbuhan Tahun Ini",
      },
    });
    console.log("Created default CMS Settings");
  }

  // 3. Create Agenda Events
  const agendaCount = await prisma.agendaEvent.count();
  if (agendaCount === 0) {
    await prisma.agendaEvent.createMany({
      data: [
        {
          id: "ev-1",
          date: "15 MEI 2026",
          title: "Festival Panen Raya",
          desc: "Syukuran hasil bumi dengan pameran teknologi pertanian terbaru desa.",
          location: "Balai Desa Malakosa",
          borderClass: "border-l-secondary",
          tagColor: "text-secondary",
        },
        {
          id: "ev-2",
          date: "22 JUNI 2026",
          title: "Workshop Coding Remaja",
          desc: "Pelatihan pengembangan aplikasi mobile untuk anak muda desa.",
          location: "Digital Hub Malakosa",
          borderClass: "border-l-primary",
          tagColor: "text-primary",
        },
        {
          id: "ev-3",
          date: "05 JULI 2026",
          title: "Malakosa Eco-Beach Day",
          desc: "Aksi bersih pantai dan penanaman mangrove bersama wisatawan.",
          location: "Pesisir Barat Pantai",
          borderClass: "border-l-on-secondary-container",
          tagColor: "text-on-secondary-container",
        },
      ],
    });
    console.log("Created default Agenda Events");
  }

  // 4. Create Tourism Spots
  const tourismCount = await prisma.tourismSpot.count();
  if (tourismCount === 0) {
    await prisma.tourismSpot.createMany({
      data: [
        {
          id: "tour-1",
          title: "Pantai Pasir Putih Malakosa",
          category: "Wisata Bahari",
          description: "Pemandangan sunset eksotis dengan konservasi terumbu karang digital.",
          visitorCount: 1420,
          status: "Buka Setiap Hari",
        },
        {
          id: "tour-2",
          title: "Hutan Mangrove Eco-Park",
          category: "Ekowisata",
          description: "Jalur wooden walkway sepanjang 1.2 km menyusuri ekosistem mangrove asli.",
          visitorCount: 850,
          status: "Buka Setiap Hari",
        },
      ],
    });
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
