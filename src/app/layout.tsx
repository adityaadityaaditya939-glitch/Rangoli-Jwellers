import type { Metadata, Viewport } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { Analytics } from "@vercel/analytics/react";
import StoreChrome from "@/components/StoreChrome";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { SHOP } from "@/lib/constants";
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
    icon: "/images/Favicon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${playfair.variable} h-full`}>
      <body className="flex min-h-full flex-col font-sans antialiased">
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <StoreChrome>{children}</StoreChrome>
        <Analytics />
      </body>
    </html>
  );
}
