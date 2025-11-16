import React from "react";
// import bannerImg1 from "../../assets/big-deliveryman.png";
import ArrowIcon from "../../../Components/ArrowIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Banner from "./Banner";

const SwiperBanner = () => {
  const slideNumber = 5;
  const bannerSlide = [
    {
      title:
        'We Make Sure Your Parcel Arrives On Time – No Fuss.',
      description:
        "Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.",
    bannerImg: 'https://i.postimg.cc/qBnXTCRS/big-deliveryman.png'
    },
    {
      title:
        'Fastest Delivery & Easy Pickup',
      description:
        "Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.",
    bannerImg: 'https://i.postimg.cc/Xvdd0RNx/10256550-18149902-1.png'
    },
    {
      title:
        'Delivery in 30 Minutes at your doorstep',
      description:
        "Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.",
    bannerImg: 'https://i.postimg.cc/Xvdd0RNx/10256550-18149902-1.png'
    },
  ];
  return (
    <div>
      <Swiper
        modules={[Autoplay, Pagination]}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        slidesPerView={1}
        speed={1500}
        pagination={{ clickable: true, dynamicBullets: false }}
        className="rounded-2xl bg-base-200 relative"
      >
        {bannerSlide.map((item) => (
          <SwiperSlide>
            <Banner item={item}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperBanner;
