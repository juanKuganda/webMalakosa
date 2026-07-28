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
  title: "Malakosa - Harmoni Alam dan Tradisi",
  description: "Portal Desa Malakosa: Membangun masa depan digital yang berakar pada nilai-nilai agraris dan keberlanjutan lingkungan Sulawesi Tengah.",
  keywords: ["Desa Malakosa", "Wisata Bahari", "Digital Village", "Sulawesi Tengah", "Parigi Moutong"],
  openGraph: {
    title: "Malakosa - Harmoni Alam dan Tradisi",
    description: "Portal Resmi Desa Malakosa. Menjelajahi keindahan wisata, agenda kegiatan, dan layanan publik yang inovatif.",
    url: "https://malakosa.desa.id",
    siteName: "Desa Malakosa",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Malakosa - Harmoni Alam dan Tradisi",
    description: "Portal Resmi Desa Malakosa. Menjelajahi keindahan wisata, agenda kegiatan, dan layanan publik yang inovatif.",
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

