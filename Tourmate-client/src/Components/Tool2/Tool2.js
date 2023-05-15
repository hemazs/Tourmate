import axios from "axios";
import React, { useEffect, useState } from "react";
import LargeSpinner from "../Spinner/LargeSpinner";
import AirAccomMeal from "./AirAccomMeal";
import Currency from "./Currency";
import Foods from "./Foods";
import Weather from "./Weather";

const Tool2 = () => {
  const [allCountryDetails, setAllCountryDetails] = useState([]);
  const [countryDetails, setCountryDetails] = useState({});
  const [foodDetails, setFoodDetails] = useState([]);
  const [weatherDetails, setWeatherDetails] = useState({});
  const [currencyDetails, setCurrencyDetails] = useState({});
  const [loading, setLoading] = useState(false);

  // Function for clearing currency data
  const clearCurrency = () => {
    setCurrencyDetails({});
    const currencyAmount = document.getElementById("amount");
    if (currencyAmount) {
      currencyAmount.value = "";
    }
  };

  useEffect(() => {
    // Fetching allCountryDetails data from database
    axios
      .get(`https://tourmate-server.vercel.app/allcountrydetails`)
      .then((res) => setAllCountryDetails(res.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const country = document.getElementById("country").value;

    // Checking if country is selected or not
    if (!country) {
      alert("Please select a country");
      return;
    }
    setLoading(true);
    clearCurrency();
    // Fetching country data by country from database
    axios
      .get(`https://tourmate-server.vercel.app/allcountrydetails/${country}`)
      .then((res) => {
        setCountryDetails(res.data);

        // Fetching food data from MealDB API
        axios
          .get(
            `https://www.themealdb.com/api/json/v1/1/filter.php?a=${res?.data?.cuisine}`
          )
          .then((res) => {
            setFoodDetails(res.data);
            setLoading(false);
          });

        // Fetching weather data from OpenWeatherMap API
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?q=${res?.data?.capital_name}&units=metric&appid=a634b6dd9c10c6cc0ab44d374af5d9a8`
          )
          .then((res) => {
            setWeatherDetails(res.data);
            setLoading(false);
          });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div className="px-8 lg:px-14 py-10 mx-auto">
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
              className="w-full rounded-lg p-3  text-base text-gray-900 font-semibold"
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

      <div className="py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl lg:py-20">
        {!countryDetails.country_name ? (
          <h1 className="font-semibold text-3xl h-[50vh] flex justify-center items-center">
            {loading ? <LargeSpinner /> : "Please select a country!"}
          </h1>
        ) : (
          <div>
            {/* Airfare, accommodation and meal cost showcase */}
            <AirAccomMeal countryDetails={countryDetails} />
            {/* Foods */}
            <Foods foodDetails={foodDetails} loading={loading} />
            {/* Weather */}
            <Weather weatherDetails={weatherDetails} />
            {/* Currency converter */}
            <Currency
              currencyDetails={currencyDetails}
              setCurrencyDetails={setCurrencyDetails}
              countryDetails={countryDetails}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Tool2;
