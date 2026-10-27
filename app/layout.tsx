import type { Metadata, Viewport } from "next";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";
import { company } from "@/model/data/company";
import { layoutContent } from "@/model/pages/layout";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: {
    default: "ConnectBud – remonty i wykończenia wnętrz",
    template: "%s | ConnectBud",
  },
  description: "Remonty i wykończenia wnętrz w Warszawie i okolicach. Bez stresu. Na czas. Pod klucz.",
};

export const viewport: Viewport = {
  themeColor: "#12171a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${fontVariables} h-full`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#tresc"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-white focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-dark"
        >
          {layoutContent.skipLink}
        </a>
        <Header />
        <main id="tresc" className="flex-1">
          {children}
        </main>
        <Footer />
        <MobileCtaBar />
      </body>
    </html>
  );
}
