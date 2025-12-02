import React from "react";
import liveTrack from "../../../assets/live-tracking.png";
import dropDelivery from "../../../assets/safe-delivery.png";
import FeatureCard from "./FeatureCard";

const Features = () => {
  const featuresList = [
    {
      icon: liveTrack,
      title: "Live Parcel Tracking",
      description:
        "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    },
    {
      icon: dropDelivery,
      title: "100% Safe Delivery",
      description:
        "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
    },
    {
      icon: dropDelivery,
      title: "24/7 Call Center Support",
      description:
        "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
    },
  ];
  return (
    <section className="space-y-6">
      {
        featuresList.map((feature, i) => (
            <FeatureCard feature={feature} key={i}/>
        ))
      }
    </section>
  );
};

export default Features;
