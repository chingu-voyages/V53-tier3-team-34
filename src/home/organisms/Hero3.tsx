import { Inter, Mona_Sans } from "next/font/google";
import BlueButton from "../molecules/BlueButton";
const inter = Inter({ weight: "600", subsets: ["latin"] });
const monaSans = Mona_Sans({ weight: "600", subsets: ["latin"] });
const EventHero = () => {
  return (
    <div className="bg-black py-40 px-16 flex items-center justify-between gap-16">
      {/* biome-ignore lint: This video doesn't need captions*/}
      <video className="rounded-2xl" autoPlay loop style={{ height: "700px" }}>
        <source src="/assets/videos/hero3.mp4" type="video/mp4" />
      </video>
      <div className="w-1/2 flex flex-col items-center gap-8 text-white text-center">
        <h1 className={`text-6xl leading-tight ${monaSans.className}`}>
          Your one-piece adventure awaits. Discover your activities now.
        </h1>

        <p className={`text-2xl leading-tight ${inter.className}`}>
          Attending the same events and sharing the same interests
        </p>

        <BlueButton text="Browse Events" href="/events" />
      </div>
    </div>
  );
};

export default EventHero;
