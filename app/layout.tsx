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

export const metadata: Metadata = {
  title: {
    default: "Desa Malakosa - Harmoni Alam dan Tradisi",
    template: "%s | Desa Malakosa"
  },
  description: "Portal Resmi Desa Malakosa, Kabupaten Parigi Moutong. Menjelajahi keindahan wisata alam, wisata bahari, agenda kegiatan desa, budaya, pertanian, dan layanan publik digital yang inovatif di Sulawesi Tengah.",
  keywords: [
    "Desa Malakosa", 
    "Malakosa", 
    "Wisata Bahari", 
    "Wisata Alam Sulawesi Tengah",
    "Digital Village", 
    "Desa Digital",
    "Sulawesi Tengah", 
    "Sulteng",
    "Parigi Moutong", 
    "Kabupaten Parigi Moutong",
    "Harmoni Alam", 
    "Desa Agraris",
    "Pariwisata Malakosa",
    "Layanan Publik Desa",
    "Profil Desa Malakosa"
  ],
  authors: [{ name: "Pemerintah Desa Malakosa" }],
  creator: "Pemerintah Desa Malakosa",
  publisher: "Desa Malakosa",
  alternates: {
    canonical: "https://www.malakosa.web.id/",
  },
  openGraph: {
    title: "Portal Resmi Desa Malakosa - Harmoni Alam dan Tradisi",
    description: "Membangun masa depan digital yang berakar pada nilai-nilai agraris dan keberlanjutan lingkungan di Desa Malakosa, Parigi Moutong, Sulawesi Tengah.",
    url: "https://www.malakosa.web.id/",
    siteName: "Portal Resmi Desa Malakosa",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Desa Malakosa - Harmoni Alam dan Tradisi",
    description: "Jelajahi keindahan wisata, budaya, dan potensi Desa Malakosa, Kabupaten Parigi Moutong, Sulawesi Tengah.",
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
  icons: {
    icon: "/favicon.ico",
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

