import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/core/Dashboard/Sidebar";
import { useEffect } from "react";

const Dashboard = ({ setProgress }) => {
  const location = useLocation();
  const [active, setActive] = useState("");

  const path = location.pathname.split("/").at(2);
  const newPath = path.split("-").join(" ");
  useEffect(() => {
    setProgress(14);
    setActive(newPath);
    setTimeout(() => {
      setProgress(100);
    }, 600);
  }, [location.pathname]);

  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading } = useSelector((state) => state.profile);

  if (profileLoading || authLoading) {
    <div className="spinner absolute top-[45vh] left-[50vw] "></div>;
  }

  return (
    <div className=" relative flex min-h-[calc(100vh-3.5rem)] ">
      <Sidebar />
      <div className="min-h-[calc(100vh-3.5rem)] w-full  ">
        <div className="w-11/12  max-w-[1000px] mx-auto py-10">
          <div className="mb-2 text-sm font-normal text-richblack-300 flex flex-row gap-2 items-center">
            <span>Home</span>
            <span>/</span>
            <span>Dashboard</span>
            <span>/</span>
            <span
              className={`capitalize ${
                active === newPath
                  ? " text-yellow-50 font-medium"
                  : "text-richblack-300"
              }`}
            >
              {active}
            </span>
          </div>

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
