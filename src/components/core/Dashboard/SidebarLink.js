import React from "react";
import * as Icons from "react-icons/vsc";
import { NavLink, matchPath, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const SidebarLink = ({ link, iconName }) => {
  const Icon = Icons[iconName];
  const loaction = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const matchRoute = (route) => {
    return matchPath({ path: route }, loaction.pathname);
  };

  return (
    <NavLink
      to={link.path}
      className={` relative ${
        matchRoute(link?.path)
          ? " bg-yellow-800   text-yellow-50  "
          : " bg-transparent text-richblack-300"
      } py-2 px-8 text-sm font-medium transition-all duration-200 `}
    >
      <span
        className={`absolute top-0 left-0 h-full w-[0.2rem] bg-yellow-50
      ${
        matchRoute(link?.path) ? " opacity-100" : " opacity-0"
      } transition-all duration-200
      `}
      ></span>

      <div className="flex flex-row gap-3 items-center ">
        <Icon className=" text-lg" />
        <p>{link?.name}</p>
      </div>
    </NavLink>
  );
};

export default SidebarLink;
