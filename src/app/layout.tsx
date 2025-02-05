import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";

import { AppSessionProvider } from "@/providers/AppSessionProvider";
import { ThemeProvider } from "@/providers/themeProvider";

const monoSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: "Partiyo",
  description: "Created by Chingu Voyagers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${monoSans.className} antialiased`}>
        <AppSessionProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </AppSessionProvider>
      </body>
    </html>
  );
}
