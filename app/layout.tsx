import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Work_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

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
        "h-full",
        "antialiased",
        plusJakartaSans.variable,
        workSans.variable,
        jetbrainsMono.variable
      )}
    >
      <body className="min-h-full flex flex-col bg-background text-on-surface">
        {children}
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

