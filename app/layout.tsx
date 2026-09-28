import type { Metadata, Viewport } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
});

export const metadata: Metadata = {
  title: "Monis Workspace Designer — Build Your Perfect Workspace",
  description: "Design your ideal workspace in Bali and rent everything you need from Monis.",
  applicationName: "Monis Workspace Designer",
  openGraph: {
    title: "Monis Workspace Designer — Build Your Perfect Workspace",
    description: "Design your ideal workspace in Bali and rent everything you need from Monis.",
    siteName: "monis.rent",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#F6F2EC",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${instrumentSerif.variable} antialiased`}>
      <body className="min-h-dvh overflow-x-clip bg-canvas font-sans text-ink">{children}</body>
    </html>
  );
}
