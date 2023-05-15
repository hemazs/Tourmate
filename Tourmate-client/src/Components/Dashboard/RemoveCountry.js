import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const RemoveCountry = () => {
  const [allCountryDetails, setAllCountryDetails] = useState([]);

  useEffect(() => {
    // Fetching allCountryDetails data from database
    axios
      .get(`https://tourmate-beige.vercel.app/allcountrydetails`)
      .then((res) => setAllCountryDetails(res.data));
  }, [allCountryDetails]);

  const handleClick = (country_name) => {
    // Deleting country data by country from database
    axios
      .delete(
        `https://tourmate-beige.vercel.app/deletecountry/${country_name}`
      )
      .then((res) => {
        if (res.data.deletedCount > 0) {
          toast.success("Country removed successfully");
        } else {
          toast.error("Country not removed");
        }
      });
  };

  return (
    <div>
      <h1 className="font-bold text-2xl pb-6 text-red-500/95">
        Remove Country
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4 w-full">
        {allCountryDetails.map((country) => (
          <div
            key={country?._id}
            className="flex items-center relative py-4 pl-6 pr-14 w-full bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-md"
          >
            <div className="space-y-1">
              <p className="font-semibold text-lg text-gray-50">
                {country?.country_name}
              </p>
              <p className="text-base font-medium text-gray-100">
                ${country?.total_cost}
              </p>
            </div>
            {/* delete icon */}
            <div
              className="absolute top-0 right-0 pt-2 pr-2"
              onClick={() => handleClick(country?.country_name)}
            >
              <svg
                className="w-6 h-6 text-red-400 cursor-pointer transition  hover:text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RemoveCountry;
