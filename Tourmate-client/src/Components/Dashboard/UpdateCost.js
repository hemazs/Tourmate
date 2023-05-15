import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const UpdateCost = () => {
  const [allCountryDetails, setAllCountryDetails] = useState([]);
  const [countryDetails, setCountryDetails] = useState({});

  useEffect(() => {
    // Fetching allCountryDetails data from database
    axios
      .get(`https://tourmate-beige.vercel.app/allcountrydetails`)
      .then((res) => setAllCountryDetails(res.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const country = document.getElementById("country").value;

    // Fetching country data by country from database
    axios
      .get(`https://tourmate-beige.vercel.app/allcountrydetails/${country}`)
      .then((res) => {
        setCountryDetails(res.data);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const airfare_cost = parseInt(document.getElementById("airfareCost").value);
    const accommodation_cost = parseInt(
      document.getElementById("accommodationCost").value
    );
    const meals_cost = parseInt(document.getElementById("mealsCost").value);
    const total_cost = airfare_cost + accommodation_cost + meals_cost;

    const updatedCost = {
      airfare_cost,
      accommodation_cost,
      meals_cost,
      total_cost,
    };

    // Updating country data by country from database
    axios
      .patch(
        `https://tourmate-server.vercel.app/updatecost/${countryDetails?.country_name}`,
        updatedCost
      )
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success("Cost updated successfully");
        } else {
          toast.error("Cost not updated");
        }
      });
  };

  return (
    <div className="w-full">
      <h1 className="font-bold text-2xl pb-6 text-red-500/95"> Update Cost</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="country"
              className="block font-medium pb-2 pl-1 text-lg text-left"
            >
              Country
            </label>
            <select
              name="country"
              id="country"
              className="w-full rounded-lg p-3 border-none text-base text-gray-50 bg-gray-900 font-semibold"
              placeholder="Choose a Country"
            >
              <option value="" selected disabled>
                Choose a Country
              </option>
              {allCountryDetails.map((cost) => (
                <option key={cost._id} value={cost.country_name}>
                  {cost.country_name}
                </option>
              ))}
            </select>
          </div>
          <button className="bg-gradient-to-r from-red-600 to-red-800 px-6 py-3 mt-8 rounded inline-block font-semibold">
            Search
          </button>
        </div>
      </form>
      {/* Update input */}
      {Object.keys(countryDetails).length !== 0 && (
        <form className="w-full space-y-3 mx-auto mt-4" onSubmit={handleUpdate}>
          <div>
            <label className="inline-block text-gray-50 text-sm sm:text-base mb-2">
              Airfare cost
            </label>
            <input
              placeholder="Enter Airfare cost"
              type="number"
              id="airfareCost"
              required
              defaultValue={countryDetails?.airfare_cost}
              className="w-full bg-gray-900 text-gray-50 rounded outline-none transition duration-100 p-3"
            />
          </div>
          <div>
            <label className="inline-block text-gray-50 text-sm sm:text-base mb-2">
              Accommodation cost
            </label>
            <input
              placeholder="Enter Accommodation cost"
              type="number"
              id="accommodationCost"
              required
              defaultValue={countryDetails?.accommodation_cost}
              className="w-full bg-gray-900 text-gray-50 rounded outline-none transition duration-100 p-3"
            />
          </div>
          <div>
            <label className="inline-block text-gray-50 text-sm sm:text-base mb-2">
              Meals cost
            </label>
            <input
              placeholder="Enter Meals cost"
              type="number"
              id="mealsCost"
              required
              defaultValue={countryDetails?.meals_cost}
              className="w-full bg-gray-900 text-gray-50 rounded outline-none transition duration-100 p-3"
            />
          </div>

          <div className="sm:col-span-2 flex justify-between items-center">
            <button className="inline-block bg-gradient-to-r from-red-600 to-red-800  text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">
              Update
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateCost;
