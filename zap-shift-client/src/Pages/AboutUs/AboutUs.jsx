import React from "react";
import HeadTitle from "../../Components/HeadTitle";
import Tab from "./Tab";
import MySection from "../../Components/MySection";

const AboutUs = () => {
  return (
    <MySection>
      {/* title */}
      <div>
        <HeadTitle>About Us</HeadTitle>
        <p className="text-secondary-content mt-4">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>

      {/* tabs */}
      <div>
        {/* name of each tab group should be unique */}
        <div className="tabs mt-10">
          {/* story */}
          <Tab defaultChecked={true} tabName={"Story"}>
            We started with a simple promise — to make parcel delivery fast,
            reliable, and stress-free. Over the years, our commitment to
            real-time tracking, efficient logistics, and customer-first service
            has made us a trusted partner for thousands. Whether it's a personal
            gift or a time-sensitive business delivery, we ensure it reaches its
            destination — on time, every time.
          </Tab>

          {/* Mission */}
          <>
            <Tab tabName={"Mission"}>
              Our mission is simple — deliver every parcel with care, speed, and
              transparency. From advanced tracking to smooth doorstep service,
              we are committed to making delivery easier and more dependable for
              everyone across Bangladesh.
              <br /> <br />
              We believe great service begins with trust. That’s why we focus on
              timely delivery, honest communication, and a customer-first
              approach. No matter the distance or urgency, we aim to carry your
              parcels safely, securely, and right on schedule.
              <br /> <br />
              Every delivery tells a story — a gift, a promise, a
              responsibility. Our mission is to connect people with efficiency
              and heart. With nationwide coverage and reliable logistics, we
              ensure your parcel travels smoothly from your hands to theirs.
            </Tab>
          </>

          {/* success */}
          <>
            <Tab tabName={"Success"}>
              From a small local service to a nationwide delivery network — our
              journey has been shaped by dedication, innovation, and the trust
              of thousands. Every successful parcel delivered strengthens our
              commitment to do even better.
              <br /> <br />
              Our success is built on consistency. By combining smart logistics,
              an experienced team, and real-time tracking, we’ve achieved a
              delivery success rate that customers can rely on — day after day,
              district after district.
              <br /> <br />
              Reaching 64 districts wasn’t luck — it was the result of hard
              work, reliable service, and your belief in us. Each milestone,
              each customer smile, and each on-time delivery is a reminder of
              how far we’ve come and how far we’re ready to go.
            </Tab>
          </>

          {/* Terms and other */}
          <>
            <Tab tabName={"Terms & Other"}>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  You must provide accurate contact information when booking a
                  car.
                </li>
                <li>
                  A valid NID/Passport may be required for rental verification.
                </li>
                <li>Booking confirmation depends on vehicle availability.</li>
                <li>
                  Any damage done during the trip must be compensated by the
                  renter.
                </li>
              </ul>

              {/* Other Info */}
              <div className="space-y-3">
                <h3 className="text-xl font-semibold mt-4">Other Information</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>We use your location to provide nearby car services.</li>
                  <li>
                    Your personal information is kept secure & never shared.
                  </li>
                  <li>Prices may vary depending on date, route, and season.</li>
                  <li>
                    For emergency support, you can contact our hotline anytime.
                  </li>
                </ul>
              </div>
            </Tab>
          </>
        </div>
      </div>
    </MySection>
  );
};

export default AboutUs;
