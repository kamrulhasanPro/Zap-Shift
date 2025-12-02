import React from 'react';

const FeatureCard = ({feature}) => {
    const {icon, title, description} = feature
    return (
        <div>
            <div className="bg-base-200 rounded-2xl p-8 flex flex-col gap-1 md:flex-row items-center">
        <figure className="pr-5">
          <img src={icon} alt="" />
        </figure>

        <div className="border-s border-dashed border-secondary pl-5 space-y-2">
          <h5 className="text-2xl font-extrabold text-secondary">
            {title}
          </h5>
          <p className="font-medium text-secondary-content">
            {description}
          </p>
        </div>
      </div>
        </div>
    );
};

export default FeatureCard;