import React, { useEffect, useState } from "react";
import icon from "../../../assets/customer-top.png";
import { Swiper, SwiperSlide } from "swiper/react";
import FeedbackCard from "./FeedbackCard";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { FaArrowRight } from "react-icons/fa";

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  useEffect(() => {
    fetch("/reviews.json")
      .then((res) => res.json())
      .then((data) => setFeedbacks(data));
  }, []);
  return (
    <section>
      {/* title */}
      <div className="flex flex-col items-center justify-center gap-1 text-center">
        <img src={icon} alt="" />
        <h3 className="text-2xl lg:text-4xl font-extrabold text-secondary">
          What our customers are sayings
        </h3>
        <p className="font-medium text-secondary-content">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, and strengthen your body
          with ease!
        </p>
      </div>

      {/* feedback */}
      
      <Swiper
        effect={"coverflow"}
        // grabCursor={true}
        modules={[EffectCoverflow, Navigation, Pagination, Autoplay]}
        centeredSlides={false}
        loop={false}
        // slidesPerView={3}
        breakpoints={
          {
            480:{slidesPerView: 1},
            800:{slidesPerView: 3},
            // 1080:{slidesPerView: 3},
          }
        }
        coverflowEffect={{
          // rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          scale: 0.75,
          // slideShadows: true,
        }}
        pagination={{ clickable: true, el: ".custom-pagination", dynamicMainBullets: true}}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        // Navigation arrows
        navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
        className="mt-5"
      >
        {feedbacks.map((feedback) => (
          <SwiperSlide key={feedback.id}>
            <FeedbackCard feedback={feedback} />
          </SwiperSlide>
        ))}

        <div className="custom-pagination flex items-center justify-center gap-2 mt-5"></div>
      </Swiper>
        {/* pagination */}
        
        
        <div className="flex items-center justify-center gap-10 mt-4">
          <div className="custom-prev bg-base-200 hover:bg-primary transition rounded-full text-secondary p-2 cursor-pointer inline-block">
          <FaArrowRight className="rotate-180" />
        </div>
        <div className="custom-next bg-base-200 hover:bg-primary transition rounded-full text-secondary p-2 cursor-pointer inline-block">
          <FaArrowRight />
        </div>
        </div>
    </section>
  );
};

export default Feedback;
