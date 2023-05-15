import React from "react";

const AirAccomMeal = ({ countryDetails }) => {
  return (
    <div>
      <h2 className="font-semibold text-3xl underline decoration-rose-600 pb-4 underline-offset-4">
        Costs:
      </h2>

      <div className="relative grid gap-8 row-gap-5 mb-8 md:row-gap-8 lg:grid-cols-3 sm:grid-cols-2">
        <div className="p-5 flex flex-col justify-center duration-300 transform bg-white border rounded shadow-sm hover:-translate-y-2">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xl text-gray-900 font-bold leading-5">
              Airfare Cost ✈️
            </p>
          </div>
          <p className="text-4xl pt-2 font-semibold text-rose-800">
            ${countryDetails.airfare_cost}
          </p>
        </div>
        <div className="p-5 flex flex-col justify-center duration-300 transform bg-white border rounded shadow-sm hover:-translate-y-2">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xl text-gray-900 font-bold leading-5">
              Accommodation Cost 🛏️
            </p>
          </div>
          <p className="text-4xl pt-2 font-semibold text-rose-800">
            ${countryDetails.accommodation_cost}
          </p>
        </div>
        <div className="p-5 flex flex-col justify-center duration-300 transform bg-white border rounded shadow-sm hover:-translate-y-2">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xl text-gray-900 font-bold leading-5">
              Meals Cost 🍴
            </p>
          </div>
          <p className="text-4xl pt-2 font-semibold text-rose-800">
            ${countryDetails.meals_cost}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AirAccomMeal;
