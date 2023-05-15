import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Link } from "react-router-dom";
import homeImg from "../../Assets/home.jpg";

const Home = () => {
  // For checking if user is logged in or not
  const { isAuthenticated } = useAuth0();

  return (
    <section>
      <div className="relative">
        <section className="overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-stretch lg:min-h-[800px]">
            <div className="relative flex items-center justify-center w-full lg:order-2 lg:w-7/12">
              <div className="relative px-4 pb-16 text-center sm:px-6 md:px-24 2xl:px-32 lg:pb-24 lg:text-left">
                <h1 className="text-4xl font-bold sm:text-6xl xl:text-6xl">
                  Plan your <br className="my-2 inline-block" />
                  adventure easily.
                </h1>
                <p className="mt-8 text-xl">
                  This tool streamlines trip planning. Food, culture, cost,
                  weather and all deatils in one place. Perfect for any type of
                  traveler.
                </p>
                {!isAuthenticated ? (
                  <button className="bg-gradient-to-r from-red-600 to-red-800 px-6 py-2 mt-8 rounded inline-block font-semibold">
                    Login First
                  </button>
                ) : (
                  <Link
                    to="/tool1"
                    className="bg-gradient-to-r from-red-600 to-red-800 px-6 py-2 mt-8 rounded inline-block font-semibold"
                  >
                    Let's Go
                  </Link>
                )}
              </div>
            </div>

            <div className="relative w-full overflow-hidden lg:order-1 h-96 lg:h-auto lg:w-5/12">
              <div className="absolute inset-0">
                <img
                  className="object-cover w-full h-full"
                  src={homeImg}
                  alt=""
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

              <div className="absolute bottom-0 left-0">
                <div className="p-4 sm:p-6 lg:p-8">
                  <div className="flex items-center">
                    <svg
                      className="w-10 h-10 sm:w-12 sm:h-12 text-red-600"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <h2 className="font-bold text-white text-3xl sm:text-4xl md:text-5xl ml-2.5">
                      Instant Plan
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Home;
