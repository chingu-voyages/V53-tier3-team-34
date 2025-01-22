import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";

const monoSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
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
      <body className={`${monoSans.className} antialiased`}>{children}</body>
    </html>
  );
}
