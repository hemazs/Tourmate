import { useAuth0 } from "@auth0/auth0-react";
import { Transition } from "@headlessui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import LargeSpinner from "../Spinner/LargeSpinner";

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);

  // Authenication
  const { loginWithPopup } = useAuth0();
  const { isAuthenticated, isLoading } = useAuth0();
  const { logout, user } = useAuth0();
  const { admin, setAdmin } = useContext(AuthContext);

  // Admin Authenication
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`https://tourmate-beige.vercel.app/admin?email=${user?.email}`)
        .then((res) => {
          setAdmin(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [setAdmin, user?.email]);

  // While Authenication it will be loading
  if (isLoading) {
    return <LargeSpinner />;
  }

  // Navbar Links
  const navbarLinks = (
    <>
      <li className="transition duration-300 hover:text-red-500">
        <NavLink
          className={({ isActive }) => (isActive ? "text-red-500" : undefined)}
          to="/home"
        >
          Home
        </NavLink>
      </li>
      {isAuthenticated ? (
        <>
          <li className="transition duration-300 hover:text-red-500">
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-red-500" : undefined
              }
              to="/tool1"
            >
              By Budget
            </NavLink>
          </li>
          <li className="transition duration-300 hover:text-red-500">
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-red-500" : undefined
              }
              to="/tool2"
            >
              By Country
            </NavLink>
          </li>
          {admin && (
            <li className="transition duration-300 hover:text-red-500">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-red-500" : undefined
                }
                to="/dashboard"
              >
                Dashboard
              </NavLink>
            </li>
          )}
          <li className="transition duration-300 hover:text-red-500">
            <button
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
            >
              Logout
            </button>
          </li>
        </>
      ) : (
        <li className="transition duration-300 hover:text-red-500">
          <button onClick={() => loginWithPopup()}>Login</button>
        </li>
      )}
    </>
  );
  return (
    <nav
      className="w-full z-50 bg-gray-900/50 py-1 mb-6 lg:mb-0 shadow sticky top-0 border-b border-gray-700"
      style={{ backdropFilter: "blur(8px)" }}
    >
      <div className="justify-between px-8 lg:px-14 py-3 mx-auto md:items-center lg:grid grid-cols-2">
        <div className="flex items-center justify-between py-2">
          <Link to="/" className="flex items-center">
            <h2 className="text-xl sm:text-2xl font-semibold pl-3">
              TourMate
              <span className="font-bold text-red-600 text-2xl sm:text-4xl inline-block">
                .
              </span>
            </h2>
          </Link>
          <div className="lg:hidden">
            <button
              className="p-2 rounded-md outline-none focus:border-gray-600 focus:border"
              onClick={() => setNavbar(!navbar)}
            >
              {navbar ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div>
          <div className="hidden lg:block">
            <div className="flex md:flex-row justify-end items-end md:items-center pb-3 mt-8 md:pb-0 md:mt-0">
              <ul className="font-medium text-xl items-center justify-center space-y-6 md:flex md:space-x-11 md:space-y-0">
                {navbarLinks}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Transition
        show={navbar}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        {() => (
          <div className="block lg:hidden">
            <div className="flex justify-between items-end px-6 pb-6 mt-10">
              <ul className="flex flex-col text-lg font-medium justify-center space-y-8">
                {navbarLinks}
              </ul>
            </div>
          </div>
        )}
      </Transition>
    </nav>
  );
};

export default Navbar;
