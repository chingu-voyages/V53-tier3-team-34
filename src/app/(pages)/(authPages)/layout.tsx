import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "../../../app/globals.css";
import Footer from "@/home/organisms/Footer";
import Header from "@/home/organisms/Header";

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
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
