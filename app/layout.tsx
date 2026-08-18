import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono, Bungee_Shade } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CampaignChrome } from "@/components/campaign/CampaignChrome";

const spaceGrotesk = Space_Grotesk({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
});

const bungeeShade = Bungee_Shade({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bungee-shade",
});

export const metadata: Metadata = {
  title: {
    default: "People's Media Record",
    template: "%s | People's Media Record",
  },
  description:
    "Community archive preserving movement media, oral histories, and independent journalism.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} ${bungeeShade.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-pmr-teal font-sans text-pmr-dark">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Header />
        <CampaignChrome />
        <main id="main-content" tabIndex={-1} className="relative z-10 flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

