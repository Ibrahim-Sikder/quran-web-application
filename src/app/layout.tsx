/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { SettingsProvider } from "@/context/SettingsContext";
import { Navbar } from "@/components/shared/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Al-Quran | The Holy Quran",
  description:
    "Experience the beauty of the Holy Quran with premium reading experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${poppins.variable}`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Scheherazade+New:wght@400;500;600;700&family=Noto+Naskh+Arabic:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <SettingsProvider>
          <Navbar />
          {children}
        </SettingsProvider>
      </body>
    </html>
  );
}
