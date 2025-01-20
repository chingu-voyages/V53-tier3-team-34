import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/utils/themeContext";
import DesktopHeader from "@/components/header/DesktopHeader";

const monoSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
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
        <ThemeProvider>
          <DesktopHeader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
