import BlueButton from "@/home/molecules/BlueButton";
import Image from "next/image";
import React from "react";

export default function Banner() {
  return (
    <div className="flex w-full bg-dimGray bg-opacity-50 py-[68px] px-[120px]">
      <div className="flex flex-col mr-52 gap-[39px]">
        <h1 className="text-6xl">
          Discover Events <br /> Through Mutual <br /> Connections
        </h1>
        <BlueButton text="Explore Friends' Events" href="#" />
      </div>
      <Image
        src="/assets/images/clapping.png"
        alt="Banner image"
        width={336.03}
        height={339.08}
      />
    </div>
  );
}
