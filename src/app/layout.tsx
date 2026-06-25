import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import StoreChrome from "@/components/StoreChrome";
import { SHOP, IMAGES } from "@/lib/constants";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${SHOP.name} | Premium Jewellery in Rohru`,
  description: `${SHOP.name} — ${SHOP.tagline}. Gold, diamond & bridal jewellery at ${SHOP.address}.`,
  icons: {
    icon: IMAGES.logo,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${playfair.variable} h-full`}>
      <body className="flex min-h-full flex-col font-sans antialiased">
        <StoreChrome>{children}</StoreChrome>
      </body>
    </html>
  );
}
