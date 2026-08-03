import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Work_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import SmoothScrolling from "@/components/smooth-scrolling";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

import { OrganizationJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.malakosa.web.id"),
  title: {
    default: "Website Resmi Desa Malakosa - Kec. Balinggi, Parigi Moutong",
    template: "%s | Pemdes Malakosa"
  },
  description: "Portal informasi resmi pemerintahan, potensi alam, sejarah Kerajaan Balinggi, dan layanan masyarakat Desa Malakosa, Kecamatan Balinggi, Kabupaten Parigi Moutong, Sulawesi Tengah.",
  keywords: [
    "Desa Malakosa", 
    "Sejarah Malakosa", 
    "Balinggi", 
    "Parigi Moutong",
    "Pue Pilingi", 
    "Kerajaan Balinggi",
    "KKN Untad", 
    "Potensi Desa Malakosa",
    "Profil Desa Malakosa",
    "Desa Digital Malakosa",
    "Pemerintahan Desa Malakosa",
    "Informasi Desa Malakosa",
    "Wisata Alam Parigi Moutong",
    "Pantai Malakosa Indah",
    "Sulawesi Tengah",
    "Sulteng",
    "Desa Agraris"
  ],
  authors: [{ name: "Pemerintah Desa Malakosa", url: "https://www.malakosa.web.id" }],
  creator: "Pemerintah Desa Malakosa",
  publisher: "Desa Malakosa",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/icon.png",
  },
  openGraph: {
    title: "Website Resmi Desa Malakosa - Kec. Balinggi, Parigi Moutong",
    description: "Portal informasi resmi pemerintahan, potensi alam, sejarah Kerajaan Balinggi, dan layanan masyarakat Desa Malakosa.",
    url: "https://www.malakosa.web.id",
    siteName: "Pemdes Malakosa",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "Logo Resmi Desa Malakosa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Website Resmi Desa Malakosa - Kec. Balinggi",
    description: "Portal informasi resmi pemerintahan, potensi alam, sejarah Kerajaan Balinggi, dan layanan masyarakat Desa Malakosa.",
    images: ["/icon.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={cn(
        "antialiased",
        plusJakartaSans.variable,
        workSans.variable,
        jetbrainsMono.variable
      )}
    >
      <head>
        <OrganizationJsonLd />
      </head>
      <body className="flex flex-col bg-background text-on-surface">
        <SmoothScrolling>
          {children}
        </SmoothScrolling>
        <Toaster position="top-center" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then(function(registrations) {
                  for(let registration of registrations) {
                    registration.unregister();
                  }
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}

