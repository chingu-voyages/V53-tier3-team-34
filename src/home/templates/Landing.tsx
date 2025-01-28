import React from "react";
import Footer from "../organisms/Footer";
import Header from "../organisms/Header";
import Hero1 from "../organisms/Hero1";
import Hero2 from "../organisms/Hero2";
import Hero3 from "../organisms/Hero3";
import TrendingEvents from "../organisms/TrendingEvents";

const Home = () => {
  return (
    <>
      <Header />
      <Hero1 />
      <Hero2 />
      <TrendingEvents />
      <Hero3 />
      <Footer />
    </>
  );
};

export default Home;
