import axios from "axios";
import React, { useState } from "react";
import SmallSpinner from "../Spinner/SmallSpinner";

const Currency = ({ currency_code }) => {
  const [currencyDetails, setCurrencyDetails] = useState({});
  const [loading, setLoading] = useState(false);

  const handleCurrencyConvert = (e) => {
    e.preventDefault();
    setLoading(true);
    const amount = document.getElementById("amount").value;

    // Fetching currency data from ExchangeRate API
    const myHeaders = {
      apikey: "vIe46YDRgVjRFy7dQP79D9QMwgmmSg4x",
    };
    axios
      .get(
        `https://api.apilayer.com/exchangerates_data/convert?to=EGP&from=${currency_code}&amount=${amount}`,
        { headers: myHeaders }
      )
      .then((response) => {
        setCurrencyDetails(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  return (
    <div className="pt-8">
      <h2 className="font-semibold text-3xl underline decoration-rose-600 pb-4 underline-offset-4">
        Currency converter:
      </h2>
      <div>
        <div className="w-full max-w-md overflow-hidden rounded-lg bg-gray-800/90 shadow-lg">
          <form className="p-5" onSubmit={handleCurrencyConvert}>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <label
                  className="mb-2 block font-medium text-gray-50"
                  htmlFor="from-currency"
                >
                  {" "}
                  From{" "}
                </label>
                <div className="relative">
                  <select
                    className="w-full appearance-none rounded-lg bg-gray-500 text-white px-4 py-2 pr-8 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600"
                    id="from-currency"
                    disabled
                  >
                    <option value="USD">{currency_code}</option>
                  </select>
                </div>
              </div>
              <div>
                <label
                  className="mb-2 block font-medium text-gray-50"
                  htmlFor="to-currency"
                >
                  {" "}
                  To{" "}
                </label>
                <div className="relative">
                  <select
                    disabled
                    className="w-full appearance-none rounded-lg bg-gray-500 text-white px-4 py-2 pr-8 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600"
                    id="to-currency"
                  >
                    <option value="USD">EGP</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label
                className="mb-2 block font-medium text-gray-50"
                htmlFor="amount"
              >
                {" "}
                Amount{" "}
              </label>
              <input
                className="appearance-none w-full rounded-lg px-4 py-3 pr-8 bg-gray-600/90 focus:border-gray-700 focus:outline-none font-semibold"
                type="number"
                id="amount"
                name="amount"
                placeholder="Enter amount"
                required
              />
            </div>
            <button
              className="my-2 rounded-lg bg-gradient-to-r from-red-600 to-red-800 px-4 py-2 font-medium text-white focus:outline-none"
              type="submit"
            >
              Convert
            </button>
          </form>
          <div className="w-full rounded-b-lg  bg-gray-600/30 border-none px-4 py-6 pr-8">
            {loading ? (
              <SmallSpinner />
            ) : (
              <>
                {Object.keys(currencyDetails).length === 0 ? (
                  <h1 className="font-medium text-center text-gray-300">
                    Converted amount will appear here
                  </h1>
                ) : (
                  <h1 className="font-bold text-center text-gray-50 text-3xl">
                    {currencyDetails?.result?.toFixed(2)}£
                  </h1>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Currency;
