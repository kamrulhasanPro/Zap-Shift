import React, { useEffect, useState } from "react";
import icon from "../../../assets/customer-top.png";
import { Swiper, SwiperSlide } from "swiper/react";
import FeedbackCard from "./FeedbackCard";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

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
      effect={'coverflow'}
        // grabCursor={true}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        centeredSlides={true}
        loop={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
        //   slideShadows: true,
        }}
        pagination={{clickable: true}}
        autoplay={{delay: 1500}}
      
      >
        {feedbacks.map((feedback) => (
            <SwiperSlide key={feedback.id}>
                <FeedbackCard feedback={feedback} />
            </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Feedback;
