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

export const metadata: Metadata = {
  title: "Homelab Service - O teu homelab pessoal, sem complicação",
  description:
    "Serviço de instalação e manutenção de homelabs em Portugal. Nextcloud, Jellyfin, Home Assistant e mais, com setup profissional e suporte contínuo.",
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
        {/* Providers envolve toda a app com o contexto de sessão do NextAuth */}
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
