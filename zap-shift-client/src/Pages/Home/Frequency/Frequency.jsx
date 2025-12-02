import React from "react";
import FrequencyCard from "./FrequencyCard";
import ArrowIcon from "../../../Components/ArrowIcon";

const Frequency = () => {
  const questionAnswer = [
    {
      question: "How does this posture corrector work?",
      answer:
        "The posture corrector gently aligns your shoulders and upper back by applying light tension. When you start slouching, the straps encourage your body to return to a natural, healthier posture.",
    },
    {
      question: "Is it suitable for all ages and body types?",
      answer:
        "Yes, the posture corrector is designed with adjustable straps so it can fit a wide range of ages and body types. However, children or people with medical conditions should use it under guidance.",
    },
    {
      question: "Does it really help with back pain and posture improvement?",
      answer:
        "Consistent use can reduce mild back discomfort and support better posture habits. It works best when combined with proper sitting habits, stretching, and strengthening exercises.",
    },
    {
      question: "Does it have smart features like vibration alerts?",
      answer:
        "Some versions include smart sensors that vibrate when you slouch, while the basic model uses a non-smart strap system. Check the product variant to confirm which one you're purchasing.",
    },
    {
      question: "How will I be notified when the product is back in stock?",
      answer:
        "You can sign up with your email or phone number on the product page. Our system will send you an automatic notification the moment the item becomes available again.",
    },
  ];

  return (
    <section>
      {/* title */}
      <div className="flex flex-col items-center justify-center gap-1 text-center mb-10">
        <h3 className="text-2xl lg:text-4xl font-extrabold text-secondary">
          Frequently Asked Question (FAQ){" "}
        </h3>
        <p className="font-medium text-secondary-content">
          Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!
        </p>
      </div>

      {/* frequency */}
      <div>
        {questionAnswer.map((item, i) => (
          <FrequencyCard item={item} key={i} />
        ))}
      </div>

      {/* button */}
      <div className="flex gap-1 justify-center mt-7">
        <button className="my_btn">See More FAQ’s</button>
        <ArrowIcon/>
      </div>
    </section>
  );
};

export default Frequency;
