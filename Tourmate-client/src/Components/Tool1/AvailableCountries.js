import React from "react";
import { Link } from "react-router-dom";
import LargeSpinner from "../Spinner/LargeSpinner";

const AvailableCountries = ({ allCountryDetails, loading }) => {
  return (
    <div>
      {Object.keys(allCountryDetails).length === 0 ? (
        <h1 className="font-semibold text-3xl h-[50vh] flex justify-center items-center">
          {loading ? <LargeSpinner /> : "Please enter the budget & date!"}
        </h1>
      ) : (
        <>
          {Object.keys(allCountryDetails).length === 1 &&
          allCountryDetails[0].country_name === "No country found" ? (
            <h1 className="font-semibold text-3xl h-[50vh] flex justify-center items-center">
              {allCountryDetails[0].country_name}
            </h1>
          ) : (
            <div>
              <h2 className="font-semibold text-3xl underline decoration-rose-600 pt-8 pb-5 underline-offset-4">
                Budget Countries:
              </h2>

              <div className="relative grid gap-8 row-gap-5 mb-8 md:row-gap-8 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
                {allCountryDetails.map((country) => (
                  <div
                    key={country._id}
                    className="max-w-xs overflow-hidden  rounded-lg shadow-lg bg-gray-800"
                  >
                    <div className="px-4 py-2">
                      <h1 className="text-xl font-bold  uppercase text-white">
                        {country?.country_name}
                      </h1>
                    </div>

                    <img
                      className="object-cover w-full h-56 mt-2"
                      src={country?.flag}
                      alt="country flag"
                    />

                    <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
                      <h1 className="text-lg font-bold text-white">
                        ${country?.total_cost}
                      </h1>
                      <Link
                        to={`/country/${country?.country_name}`}
                        className="px-2 py-1 text-xs font-bold text-gray-900 uppercase transition-colors duration-300 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none flex"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AvailableCountries;
