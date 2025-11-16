import React from "react";
import Marquee from "react-fast-marquee";
import amazon from "../../../assets/brands/amazon.png";
import amazon_vector from "../../../assets/brands/amazon_vector.png";
import casio from "../../../assets/brands/casio.png";
import moonstar from "../../../assets/brands/moonstar.png";
import randstad from "../../../assets/brands/randstad.png";
import star from "../../../assets/brands/star.png";
import start_people from "../../../assets/brands/start_people.png";

const Brands = () => {
  const brands = [
    amazon,
    amazon_vector,
    casio,
    moonstar,
    randstad,
    star,
    start_people,
  ];
  return (
    <section>
      {/* title */}
      <h3 className="text-3xl font-extrabold text-center text-secondary mb-10">
        We've helped thousands of sales teams
      </h3>

      {/* img */}
      <Marquee>
        <figure className="flex gap-9 grayscale-100">
          {brands.map((brand, i) => (
            <img key={i} src={brand} />
          ))}
        </figure>
      </Marquee>
    </section>
  );
};

export default Brands;
