import React from "react";
import LargeSpinner from "../Spinner/LargeSpinner";

const Foods = ({ foodDetails, loading }) => {
  return (
    <div className="pt-4">
      <h2 className="font-semibold text-3xl underline decoration-rose-600 pb-4 underline-offset-4">
        Foods:
      </h2>
      {loading ? (
        <LargeSpinner />
      ) : (
        <div className="grid gap-8 row-gap-5 mb-8 md:row-gap-8 lg:grid-cols-3 sm:grid-cols-2">
          {foodDetails?.meals?.map((food) => (
            <div
              key={food.idMeal}
              className="relative block overflow-hidden rounded-xl bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${food?.strMealThumb})` }}
            >
              <div className="absolute inset-0 bg-black/25"></div>
              <div className="relative flex items-start justify-between p-4 sm:p-6 lg:p-8">
                <div className="sm:pt-18 pt-12 text-white lg:pt-24">
                  <h3 className="text-xl font-bold sm:text-2xl">
                    {food?.strMeal}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Foods;
