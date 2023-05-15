import React from "react";
import weatherImg from "../../Assets/weather.jpg";

const Weather = ({ weatherDetails }) => {
  return (
    <div className="pt-4">
      <h2 className="font-semibold text-3xl underline decoration-rose-600 pb-4 underline-offset-4">
        Weather:
      </h2>
      <div className="max-w-md overflow-hidden rounded-lg shadow-lg bg-gray-800/90 text-gray-100">
        <div
          className="flex items-end justify-end h-32 p-4 dark:bg-gray-500 bg-center bg-cover"
          style={{ backgroundImage: `url(${weatherImg})` }}
        >
          <p className="px-2 py-1 text-sm tracking-widest dark:text-gray-100 uppercase dark:bg-gray-800 bg-opacity-75 rounded shadow-lg">
            {weatherDetails?.name}
          </p>
        </div>
        <div className="flex justify-between p-4">
          <div className="flex flex-col flex-1 gap-4">
            <div className="flex justify-between">
              <div className="flex gap-2">
                <span className="text-5xl font-semibold">
                  {weatherDetails?.main?.temp.toFixed(0)}°C
                </span>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-12 h-12 dark:text-yellow-400 fill-current shrink-0"
              >
                <path d="M256,104c-83.813,0-152,68.187-152,152s68.187,152,152,152,152-68.187,152-152S339.813,104,256,104Zm0,272A120,120,0,1,1,376,256,120.136,120.136,0,0,1,256,376Z"></path>
                <rect width="32" height="48" x="240" y="16"></rect>
                <rect width="32" height="48" x="240" y="448"></rect>
                <rect width="48" height="32" x="448" y="240"></rect>
                <rect width="48" height="32" x="16" y="240"></rect>
                <rect
                  width="32"
                  height="45.255"
                  x="400"
                  y="393.373"
                  transform="rotate(-45 416 416)"
                ></rect>
                <rect
                  width="32.001"
                  height="45.255"
                  x="80"
                  y="73.373"
                  transform="rotate(-45 96 96)"
                ></rect>
                <rect
                  width="45.255"
                  height="32"
                  x="73.373"
                  y="400"
                  transform="rotate(-45.001 96.002 416.003)"
                ></rect>
                <rect
                  width="45.255"
                  height="32.001"
                  x="393.373"
                  y="80"
                  transform="rotate(-45 416 96)"
                ></rect>
              </svg>
            </div>
            <p className="text-sm">
              Mostly {weatherDetails?.weather?.[0]?.main} throughout the day.
              <br />
              {weatherDetails?.wind?.speed} MPS winds.
            </p>
          </div>
          <div className="text-sm leading-loose">
            <div className="flex items-center"></div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-8 p-4 border-t dark:text-gray-400 dark:border-gray-700">
          <div className="flex items-center space-x-1">
            <span className="font-bold">
              {weatherDetails?.main?.feels_like.toFixed(0)}°
            </span>
            <span className="text-sm">Feels like</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="font-bold">{weatherDetails?.main?.humidity}%</span>
            <span className="text-sm">Humidity</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
