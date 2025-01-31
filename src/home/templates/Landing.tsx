import type React from "react";
import Footer from "../organisms/Footer";
import Header from "../organisms/Header";
import Hero1 from "../organisms/Hero1";
import Hero2 from "../organisms/Hero2";
import Hero3 from "../organisms/Hero3";
import Hero4 from "../organisms/Hero4";
import TrendingEvents from "../organisms/TrendingEvents";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col overflow-x-hidden">
      <Header />
      <Hero1 />
      <Hero2 />
      <TrendingEvents />
      <Hero3 />
      <Hero4 />
      <Footer />
    </div>
  );
};

export default Home;
