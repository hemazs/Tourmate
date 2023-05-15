import React from "react";

const LargeSpinner = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="w-14 h-14 border-4 border-dotted rounded-full animate-spin border-gray-200"></div>
    </div>
  );
};

export default LargeSpinner;
