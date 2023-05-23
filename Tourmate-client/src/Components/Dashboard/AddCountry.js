import axios from "axios";
import React from "react";
import { toast } from "react-hot-toast";

const AddCountry = () => {
  const cuisines = [
    { strArea: "American" },
    { strArea: "British" },
    { strArea: "Canadian" },
    { strArea: "Chinese" },
    { strArea: "Croatian" },
    { strArea: "Dutch" },
    { strArea: "Egyptian" },
    { strArea: "Filipino" },
    { strArea: "French" },
    { strArea: "Greek" },
    { strArea: "Indian" },
    { strArea: "Irish" },
    { strArea: "Italian" },
    { strArea: "Jamaican" },
    { strArea: "Japanese" },
    { strArea: "Kenyan" },
    { strArea: "Malaysian" },
    { strArea: "Mexican" },
    { strArea: "Moroccan" },
    { strArea: "Polish" },
    { strArea: "Portuguese" },
    { strArea: "Russian" },
    { strArea: "Spanish" },
    { strArea: "Thai" },
    { strArea: "Tunisian" },
    { strArea: "Turkish" },
    { strArea: "Unknown" },
    { strArea: "Vietnamese" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const country_name = document.getElementById("countryName").value;
    const capital_name = document.getElementById("capitalName").value;
    const currency_code = document.getElementById("currencyCode").value;
    const cuisine = document.getElementById("cuisine").value;
    const airfare_cost = parseInt(document.getElementById("airfareCost").value);
    const accommodation_cost = parseInt(
      document.getElementById("accommodationCost").value
    );
    const meals_cost = parseInt(document.getElementById("mealsCost").value);
    const total_cost = airfare_cost + accommodation_cost + meals_cost;

    if (cuisine === "") {
      alert("Please select a cuisine");
    }
    const newCountry = {
      country_name,
      capital_name,
      currency_code,
      cuisine,
      airfare_cost,
      accommodation_cost,
      meals_cost,
      total_cost,
    };

    // Add new country to database
    axios
      .post(`https://tourmate-server.vercel.app/addcountry`, newCountry)
      .then((res) => {
        if (res.data.insertedId !== null) {
          toast.success("Country added successfully");

          // clear input fields
          document.getElementById("countryName").value = "";
          document.getElementById("capitalName").value = "";
          document.getElementById("currencyCode").value = "";
          document.getElementById("cuisine").value = "";
          document.getElementById("airfareCost").value = "";
          document.getElementById("accommodationCost").value = "";
          document.getElementById("mealsCost").value = "";
        } else {
          toast.error("Country not added");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div>
      <h1 className="font-bold text-2xl pb-4 text-red-500/95"> Add Country</h1>
      <form onSubmit={handleSubmit} className="mx-auto mt-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="inline-block text-gray-50 text-sm sm:text-base mb-2">
              Country name
            </label>
            <input
              placeholder="Enter country name"
              type="text"
              id="countryName"
              required
              className="w-full bg-gray-900 text-gray-50 rounded outline-none transition duration-100 p-3"
            />
          </div>

          <div>
            <label className="inline-block text-gray-50 text-sm sm:text-base mb-2">
              Capital name
            </label>
            <input
              placeholder="Enter capital name"
              type="text"
              id="capitalName"
              required
              className="w-full bg-gray-900 text-gray-50 rounded outline-none transition duration-100 p-3"
            />{" "}
          </div>

          <div>
            <label className="inline-block text-gray-50 text-sm sm:text-base mb-2">
              Currency code
            </label>
            <input
              placeholder="Enter currency code"
              type="text"
              id="currencyCode"
              required
              className="w-full bg-gray-900 text-gray-50 rounded outline-none transition duration-100 p-3"
            />
          </div>

          <div>
            <label className="inline-block text-gray-50 text-sm sm:text-base mb-2">
              Cuisine
            </label>
            <select
              id="cuisine"
              className="w-full bg-gray-900 text-gray-50 rounded outline-none transition duration-100 p-3"
            >
              <option value="" selected disabled>
                Enter the cuisine
              </option>
              {cuisines.map((cuisine, i) => (
                <option key={i} value={cuisine.strArea}>
                  {cuisine.strArea}
                </option>
              ))}
            </select>{" "}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-5">
          <div>
            <label className="inline-block text-gray-50 text-sm sm:text-base mb-2">
              Airfare cost
            </label>
            <input
              placeholder="Enter airfare cost"
              type="number"
              required
              id="airfareCost"
              className="w-full bg-gray-900 text-gray-50 rounded outline-none transition duration-100 p-3"
            />{" "}
          </div>

          <div>
            <label className="inline-block text-gray-50 text-sm sm:text-base mb-2">
              Accommodation cost
            </label>
            <input
              placeholder="Enter accommodation cost"
              type="number"
              id="accommodationCost"
              required
              className="w-full bg-gray-900 text-gray-50 rounded outline-none transition duration-100 p-3"
            />{" "}
          </div>

          <div>
            <label className="inline-block text-gray-50 text-sm sm:text-base mb-2">
              Meals cost
            </label>
            <input
              placeholder="Enter meals cost"
              type="number"
              id="mealsCost"
              required
              className="w-full bg-gray-900 text-gray-50 rounded outline-none transition duration-100 p-3"
            />{" "}
          </div>
        </div>

        <div className="sm:col-span-2 flex justify-between items-center mt-4">
          <button className="inline-block bg-gradient-to-r from-red-600 to-red-800  text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCountry;
