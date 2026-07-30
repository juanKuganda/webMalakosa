import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting Database Reset (Production Mode)...");

  // Delete all content tables
  await prisma.testimony.deleteMany({});
  console.log("Deleted all testimonies.");
  
  await prisma.tourismSpot.deleteMany({});
  console.log("Deleted all tourism spots.");
  
  await prisma.agendaEvent.deleteMany({});
  console.log("Deleted all agenda events.");
  
  await prisma.cmsSettings.deleteMany({});
  console.log("Deleted all CMS settings.");

  console.log("Database reset complete. AdminUser was preserved.");
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
