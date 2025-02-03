import BlueButton from "@/home/molecules/BlueButton";
import Image from "next/image";

export default function EventNotFound() {
  return (
    <div className="flex justify-between w-[1068px] py-[240px]">
      <div className="flex flex-col space-y-[24px] items-center w-[477px]">
        <h1 className="text-6xl">No events found</h1>
        <p className="text-dimGray text-2xl text-center">
          Why not explore our trending events instead
        </p>
        <BlueButton text="Join Now" href="#" />
      </div>
      <Image
        src="/assets/images/notFOundImage.png"
        alt="Not found image"
        width={543}
        height={370}
      />
    </div>
  );
}
