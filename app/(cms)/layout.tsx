import React from "react";
import { getServerCMSData } from "@/lib/cms-server";
import { CMSProvider } from "@/lib/cms-store";

export default async function CmsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cmsData = await getServerCMSData();

  return (
    <CMSProvider initialData={cmsData}>
      {children}
    </CMSProvider>
  );
}
