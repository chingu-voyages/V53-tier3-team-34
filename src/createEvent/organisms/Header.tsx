import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { Peralta } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const peralta = Peralta({
  weight: "400",
  subsets: ["latin"],
});

const Header = () => {
  const { data: session } = useSession();
  return (
    <header className="flex justify-between items-center bg-red-600 p-2 md:py-9 md:px-16">
      <Link href="/" className="flex items-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Partiyo Logo"
          width={56}
          height={56}
          className="w-[40px] h-[40px] md:w-[56px] md:h-[56px]"
        />
        <h1
          className={`text-white pl-2 text-2xl md:text-4xl font-normal ${peralta.className} leading-tight`}
        >
          Partiyo
        </h1>
      </Link>
      {!session && (
        <Link href="/register">
          <Button
            className="px-6 py-2 h-16 bg-[#084be7] text-white text-center text-base font-bold leading-normal w-max inline self-end rounded-none"
            type="button"
          >
            Sign In
          </Button>
        </Link>
      )}
    </header>
  );
};

export default Header;
