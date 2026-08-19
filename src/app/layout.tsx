import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Providers } from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: {
    default: "Homelab Service - O teu homelab pessoal, sem complicação",
    template: "%s | Homelab Service",
  },
  description:
    "Serviço de instalação e manutenção de homelabs em Portugal. Nextcloud, Jellyfin, Home Assistant e mais, com setup profissional e suporte contínuo.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "pt_PT",
    siteName: "Homelab Service",
    title: "Homelab Service - O teu homelab pessoal, sem complicação",
    description:
      "Serviço de instalação e manutenção de homelabs em Portugal. Nextcloud, Jellyfin, Home Assistant e mais, com setup profissional e suporte contínuo.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Homelab Service - O teu homelab pessoal, sem complicação",
    description:
      "Serviço de instalação e manutenção de homelabs em Portugal. Nextcloud, Jellyfin, Home Assistant e mais, com setup profissional e suporte contínuo.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
