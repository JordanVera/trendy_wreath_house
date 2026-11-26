import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { MotionRoot } from "@/components/motion/MotionRoot";
import "./globals.css";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const title = "The Trendy Wreath House";
const description =
  "Thoughtfully designed wreaths for every season, every celebration, and every beautiful home.";

export const metadata: Metadata = {
  metadataBase: new URL("https://thetrendywreathhouse.com"),
  title: {
    default: title,
    template: `%s · ${title}`,
  },
  description,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_US",
    siteName: title,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Ivory roses, eucalyptus, and a champagne ribbon arranged for The Trendy Wreath House",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jost.variable} ${cormorant.variable} h-full`}>
      <body className="min-h-full bg-ink text-ivory antialiased">
        <MotionRoot>{children}</MotionRoot>
      </body>
    </html>
  );
}
