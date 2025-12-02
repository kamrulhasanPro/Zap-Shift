import React from "react";

const LoadingSpinner = ({ className }) => {
  return (
    <div className={`flex items-center justify-center w-full ${className}`}>
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
};

export default LoadingSpinner;
