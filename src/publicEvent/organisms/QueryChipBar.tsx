"use client";

import { queryChips } from "@/app/(pages)/events/public/queryChipList";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function QueryChipBar() {
  const [chipText, setChipText] = useState("");
  const router = useRouter();

  function handleClick(text: string) {
    setChipText(text);
    router.push(`/events/public?title=${chipText}`);
  }

  return (
    <div className="">
      <div className="flex justify-between w-full relative overflow-hidden mask">
        {/* Toggle left button */}
        <button type="button" className="absolute top-1/2 -translate-y-1/2">
          <Image
            src="/assets/chipIcons/left.svg"
            alt="Left icon"
            width={29}
            height={29}
          />
        </button>

        {queryChips.map((chip) => (
          <button
            type="button"
            key={chip.text}
            onClick={() => handleClick(chip.text)}
            className="bg-dimGray p-3 min-w-20 flex flex-col bg-opacity-30"
          >
            <Image
              src={chip.chipIconUrl}
              alt={`${chip.text} logo`}
              width={24}
              height={24}
            />
            <p>{chip.text}</p>
          </button>
        ))}

        {/* Toggle right button */}
        <button
          type="button"
          className="absolute right-0 top-1/2 -translate-y-1/2"
        >
          <Image
            src="/assets/chipIcons/right.svg"
            alt="Right icon"
            width={29}
            height={29}
          />
        </button>
      </div>
    </div>
  );
}
