import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import AirAccomMeal from "../Tool2/AirAccomMeal";
import Foods from "../Tool2/Foods";
import Currency from "./Currency";
import Weather from "./Weather";

const SingleCountry = () => {
  const [foodDetails, setFoodDetails] = useState([]);
  const [weatherDetails, setWeatherDetails] = useState({});
  const [loading, setLoading] = useState(false);

  // Getting date from localStorage
  const date = localStorage.getItem("date");
  const currentDate = new Date().toISOString().slice(0, 10);
  const dateDifference = Math.round(
    (Date.parse(date) - Date.parse(currentDate)) / (24 * 60 * 60 * 1000)
  );

  const {
    accommodation_cost,
    airfare_cost,
    capital_name,
    country_name,
    cuisine,
    currency_code,
    meals_cost,
  } = useLoaderData();

  useEffect(() => {
    setLoading(true);

    // Fetching food data from MealDB API
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${cuisine}`)
      .then((res) => {
        setFoodDetails(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

    // Fetching weather data from OpenWeatherMap API
    if (dateDifference >= -4 && dateDifference <= 4) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${capital_name}&units=metric&appid=a634b6dd9c10c6cc0ab44d374af5d9a8`
        )
        .then((res) => {
          // Filtering weather data for the selected date
          const filteredData = res?.data?.list?.filter((data) => {
            return data.dt_txt.includes(date);
          });
          setWeatherDetails(filteredData[0]);
          setLoading(false);
          return;
        });
    } else {
      return setWeatherDetails({});
    }
  }, [capital_name, cuisine, date, dateDifference]);

  return (
    <div className="px-8 lg:px-14 py-10 mx-auto">
      <h2
        className="font-semibold text-3xl p-4 mb-16 border-2 border-rose-700 text-center rounded-lg "
        style={{
          boxShadow:
            "rgba(255, 255, 255, 0.19) 0px 10px 20px, rgba(255, 255, 255, 0.23) 0px 6px 6px",
        }}
      >
        {country_name}
      </h2>
      <AirAccomMeal
        countryDetails={{ accommodation_cost, airfare_cost, meals_cost }}
      />
      <Foods foodDetails={foodDetails} loading={loading} />
      <Weather weatherDetails={weatherDetails} capital_name={capital_name} />
      <Currency currency_code={currency_code} />
    </div>
  );
};

export default SingleCountry;
