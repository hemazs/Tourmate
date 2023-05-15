import axios from "axios";
import React, { useState } from "react";
import AvailableCountries from "./AvailableCountries";

const Tool1 = () => {
  const [loading, setLoading] = useState(false);
  const [allCountryDetails, setAllCountryDetails] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const budget = document.getElementById("budget").value;
    const date = document.getElementById("date").value;

    // Storing date in localStorage
    localStorage.setItem("date", date);

    // Fetching allCountryDetails data from database
    axios
      .patch(
        `https://tourmate-server.vercel.app/allcountrydetails?budget=${budget}`
      )
      .then((res) => {
        setAllCountryDetails(res.data);
        setLoading(false);

        // Fetching flag from restcountries API and merging with allCountryDetails
        Promise.all(
          res.data.map((country) =>
            axios
              .get(
                `https://restcountries.com/v3.1/name/${country?.country_name}`
              )
              .then((res) => ({
                ...country,
                flag: res.data[0].flags.png,
              }))
          )
        ).then((data) => {
          setAllCountryDetails(data);
          setLoading(false);
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className="px-8 lg:px-14 py-10 mx-auto">
      <form onSubmit={handleSubmit} className="sm:text-center">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              className="block font-medium pb-2 pl-1 text-lg text-left"
              htmlFor="email"
            >
              Budget (USD)
            </label>
            <input
              className="w-full rounded-lg p-3 text-base text-gray-900 font-semibold"
              placeholder="Your Budget for the trip"
              type="number"
              id="budget"
              required
            />
          </div>

          <div>
            <label
              className="block font-medium pb-2 pl-1 text-lg text-left"
              htmlFor="email"
            >
              Date
            </label>
            <input
              className="w-full rounded-lg p-3  text-base text-gray-900 font-semibold"
              placeholder="Your traveling date"
              type="date"
              id="date"
              required
            />
          </div>
        </div>
        <button className="bg-gradient-to-r from-red-600 to-red-800 px-6 py-3 mt-8 rounded inline-block font-semibold">
          Search
        </button>
      </form>
      {/* Available country within budget */}
      <AvailableCountries
        allCountryDetails={allCountryDetails}
        loading={loading}
      />
    </div>
  );
};

export default Tool1;
