import type React from "react";
import { Suspense } from "react";
import Header from "../../home/organisms/Header";
import Banner from "../organisms/Banner";
import EventSearchNavigation from "../organisms/EventSearchNavigation";
import QueryChipBar from "../organisms/QueryChipBar";

const PublicEvent: React.FC = () => {
  return (
    <main className="bg-black px-16 text-white min-h-screen space-y-10">
      <Header />
      <QueryChipBar />
      <Banner />
      <Suspense fallback={<div>Loading events...</div>}>
        <EventSearchNavigation />
      </Suspense>
    </main>
  );
};

export default PublicEvent;
