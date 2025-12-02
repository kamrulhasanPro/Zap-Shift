import React from "react";

const FrequencyCard = ({item}) => {
    const {question, answer} = item
  return (
    <div
      tabIndex={0}
      className="collapse collapse-arrow bg-base-200 border-gray-200 focus:border-secondary/60 border transition-all focus:bg-[#E6F2F3] mb-2"
    >
      <div className="collapse-title font-bold">
        {question}
      </div>
      <div className="collapse-content text-sm ">
        <div className="h-px bg-gray-300 w-full mb-3 text-secondary-content"></div>
        {answer}
      </div>
    </div>
  );
};

export default FrequencyCard;
