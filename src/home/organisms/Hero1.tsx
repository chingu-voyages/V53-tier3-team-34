import Link from "next/link";
import type React from "react";

const Hero1: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <div className="flex flex-col items-center justify-center gap-14">
        <p className="md:w-3/4 text-center text-black text-6xl font-semibold leading-[75px]">
          Host private events in seconds
        </p>
        <p className="md:w-3/4 text-center text-[#4d4d4d] text-2xl font-semibold leading-loose">
          Spend less time on logistics and more time enjoying your event. Host
          private events in seconds with our easy-to-use Partiyo
        </p>
        <div className="flex flex-col items-center justify-center gap-2">
          <Link href="/events/create">
            <button
              className="px-6 py-2 bg-black rounded-3xl text-center text-white text-base font-bold leading-normal"
              type="button"
            >
              Create Event
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero1;
