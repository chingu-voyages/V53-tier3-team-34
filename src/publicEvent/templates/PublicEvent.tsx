import Footer from "@/home/organisms/Footer";
import Image from "next/image";
import type React from "react";
import { Suspense } from "react";
import Header from "../../home/organisms/Header";
import Banner from "../organisms/Banner";
import EventSearchNavigation from "../organisms/EventSearchNavigation";
import QueryChipBar from "../organisms/QueryChipBar";

const PublicEvent: React.FC = () => (
  <main className="bg-black px-16 text-white min-h-screen space-y-10">
    <Header />
    <Suspense
      fallback={
        <Image
          src="/assets/images/spinner.svg"
          width={40}
          height={40}
          alt="Loading"
        />
      }
    >
      <QueryChipBar />
    </Suspense>
    <Banner />
    <Suspense
      fallback={
        <Image
          src="/assets/images/spinner.svg"
          width={40}
          height={40}
          alt="Loading"
        />
      }
    >
      <EventSearchNavigation />
    </Suspense>
    <Footer />
  </main>
);

export default PublicEvent;
