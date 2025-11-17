import React from "react";

const Tab = ({children, tabName, defaultChecked}) => {
  return (
    <>
      {/* story */}
      <input
        type="radio"
        name="my_tabs_2"
        className="tab text-xl font-extrabold p-0 pr-5"
        aria-label={tabName}
        defaultChecked={defaultChecked || false}
      />
      <div className="tab-content text-secondary-content mt-4">
        {children}
      </div>
    </>
  );
};

export default Tab;
