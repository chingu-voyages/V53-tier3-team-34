"use client";

import { queryChips } from "@/app/(pages)/events/public/queryChipList";
import Image from "next/image";

export default function QueryChipBar() {
  return (
    <div className="">
      <div className="flex justify-between relative overflow-y-auto">
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
