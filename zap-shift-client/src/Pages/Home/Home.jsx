import React from "react";
import { FaArrowRight } from "react-icons/fa";
import Banner from "./Banner/Banner";
import SwiperBanner from "./Banner/SwiperBanner";
import WorkList from "./WorksList/WorkList";
import Service from "./Service/Service";
import Brands from "./Brands/Brands";
import Features from "./Features/Features";
import Merchant from "./Merchant/Merchant";
import Feedback from "./Feedback/Feedback";
import Frequency from "./Frequency/Frequency";

const Home = () => {
  return (
    <section className="space-y-7 md:space-y-16">
      <SwiperBanner />
      <WorkList />
      <Service />
      <Brands />
      <hr className="border-t-2 border-gray-400 border-dashed mt-16" />
      <Features />
      <hr className="border-t-2 border-gray-400 border-dashed mt-16" />
      <Merchant />
      <Feedback />
      <Frequency />
    </section>
  );
};

export default Home;
