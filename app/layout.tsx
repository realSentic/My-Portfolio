import type { Metadata } from "next";
import { Archivo, Archivo_Black, Kumbh_Sans } from "next/font/google";
import "./globals.css";

const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-archivo-black",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const kumbhSans = Kumbh_Sans({
  subsets: ["latin"],
  variable: "--font-kumbh-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Syiam Fortunado | Portfolio",
  description: "This is a portfolio website for Syiam Fortunado, a full-stack developer based in Roxas City, Philippines.",
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`bg-[#171717] ${archivoBlack.variable} ${archivo.variable} ${kumbhSans.variable}`} style={{ colorScheme: "dark" }}>
      <body>{children}</body>
    </html>
  );
}