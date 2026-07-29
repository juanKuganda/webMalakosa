import React from "react";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import { getServerCMSData } from "@/lib/cms-server";
import { CMSProvider } from "@/lib/cms-store";

export const dynamic = "force-dynamic";

export default async function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cmsData = await getServerCMSData();

  return (
    <CMSProvider initialData={cmsData}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 w-full">
          {children}
        </main>
        <Footer />
      </div>
    </CMSProvider>
  );
}
