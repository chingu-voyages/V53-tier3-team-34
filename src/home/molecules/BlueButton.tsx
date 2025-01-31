import { Button } from "@/components/ui/button";
import { Mona_Sans } from "next/font/google";
import Link from "next/link";
import type React from "react";

interface BlueButtonProps {
  text: string;
  href: string;
  ref?: React.Ref<HTMLButtonElement>;
}

const monaSans = Mona_Sans({ weight: "500", subsets: ["latin"] });

const BlueButton: React.FC<BlueButtonProps> = ({ text, href, ref }) => {
  return (
    <Link href={href}>
      <Button
        ref={ref}
        className={`h-16 px-6 py-2 bg-[#084be7] text-center text-white text-base leading-normal rounded-none ${monaSans.className}`}
      >
        {text}
      </Button>
    </Link>
  );
};

export default BlueButton;
