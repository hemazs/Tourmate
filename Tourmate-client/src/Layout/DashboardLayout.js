import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";

const DashboardLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="grid grid-cols-1 sm:grid-cols-3 w-screen h-screen">
          <div className="m-4 flex flex-col justify-between rounded-xl bg-gray-700 p-4 sm:p-8">
            <ul className="space-y-3">
              <NavLink to="/dashboard/editcost" className="inline-block w-full">
                <li className="flex font-medium text-gray-50 p-3 rounded-lg bg-gray-900 ">
                  Update cost
                </li>
              </NavLink>
              <NavLink
                to="/dashboard/addcountry"
                className="inline-block w-full"
              >
                <li className="flex font-medium text-gray-50 p-3 rounded-lg bg-gray-900 ">
                  Add country
                </li>
              </NavLink>
              <NavLink
                to="/dashboard/removecountry"
                className="inline-block w-full"
              >
                <li className="flex font-medium text-gray-50 p-3 rounded-lg bg-gray-900 ">
                  Remove country
                </li>
              </NavLink>
            </ul>
          </div>

          <div className="m-4 col-span-1 sm:col-span-2 p-6 bg-gray-700 rounded-xl flex justify-start">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
