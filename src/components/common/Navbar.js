import React, { useEffect, useState } from "react";
import { Link, matchPath } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "../../utils/constants";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import HamburgerMenu from "./Navbar/HamburgerMenu";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const [subLinks, setSubLinks] = useState([]);

  async function fetchSubLinks() {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      console.log("Sublinks Are:", result);
      console.log(result.data.allcategory);
      setSubLinks(result.data.allcategory);
    } catch (error) {
      console.log("Could not fetch the category list");
    }
  }
  useEffect(() => {
    fetchSubLinks();
  }, []); //dependcy may be of chanfing sublinks(error aa raha hai)

  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const bgPath = location.pathname.split("/").at(-1);

  const bgChecker = () => {
    if (bgPath === "about" || bgPath === "" || bgPath === "contact") {
      return "bg-richblack-900";
    }
    return "bg-richblack-800";
  };

  return (
    <div
      className={`w-full flex h-14 mx-auto  items-center justify-center  border-b-[1px] border-richblack-700 ${bgChecker()}`}
    >
      <div className="w-11/12 max-w-maxContent flex items-center justify-between">
        {/* Logo */}
        <Link to={"/"}>
          <img
            src={logo}
            alt="NavLogo"
            className="w-[100px]  sm:w-[160px] h-32px"
            loading="lazy"
          />
        </Link>

        {/* Nav Link */}
        <nav className=" hidden md:block">
          <ul className="flex flex-row gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, i) => {
              return (
                <li key={i}>
                  {link.title === "Catalog" ? (
                    <div className=" relative group  flex items-center gap-1 z-[10]  ">
                      <p>{link.title}</p>

                      <MdOutlineKeyboardArrowDown />

                      <div
                        className=" absolute invisible opacity-0   left-[50%] top-[55%] lg:top-[50%] flex flex-col rounded-lg bg-richblack-5
                      p-3 text-richblack-900 transition-all duration-200  group-hover:visible group-hover:opacity-100
                      lg:w-[300px] translate-x-[-44%] translate-y-[10%] w-[150px] md:w-[175px] "
                      >
                        <div
                          className=" absolute left-[56%] top-[5%] lg:left-[50%] lg:top-[0%] h-6 w-6 rotate-45 bg-richblack-5 rounded 
                      translate-y-[-20%] -z-[1]"
                        ></div>

                        <div className="flex flex-col gap-[2px] ">
                          {subLinks.length ? (
                            <>
                              {subLinks
                                ?.filter(
                                  (sublink) => sublink?.courses?.length > 0
                                )
                                ?.map((link, index) => (
                                  <Link
                                    key={index}
                                    to={`/catalog/${link.name
                                      .toLowerCase()
                                      .split(" ")
                                      .join("-")}`}
                                    className=" hover:bg-richblack-100 py-2 pl-2 lg:py-4 lg:pl-4 rounded-[10px] transition-all duration-200"
                                  >
                                    <p className=" text-richblack-900 font-medium text-[18px] capitalize">
                                      {link.name.toLowerCase()}
                                    </p>
                                  </Link>
                                ))}
                              {subLinks.filter(
                                (sublink) => sublink?.courses?.length > 0
                              ).length === 0 && (
                                <p className="text-richblack-900 font-medium text-[16px] flex justify-center text-center">
                                  No Courses Found
                                </p>
                              )}
                            </>
                          ) : (
                            <p className="  text-richblack-900 font-medium text-[16px] flex justify-center text-center    ">
                              No Courses Found
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link to={link?.path}>
                      <p
                        className={`${
                          matchRoute(link?.path)
                            ? "text-yellow-25"
                            : "text-richblack-25"
                        } transition-all duration-200`}
                      >
                        {link.title}
                      </p>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Login/Signup/Dashboard/Logout Button */}
        <div className=" navVisible flex flex-row items-center gap-x-4">
          {token !== null &&
            user &&
            user.accountType !== ACCOUNT_TYPE.INSTRUCTOR &&
            user.accountType !== ACCOUNT_TYPE.ADMIN && (
              <Link
                to={"/dashboard/cart"}
                className="relative flex flex-row items-center"
              >
                <AiOutlineShoppingCart className="w-[20px] h-[20px] text-richblack-200" />
                {totalItems > 0 && (
                  <span className=" bg-caribbeangreen-300 absolute -right-[9px] -top-[4px] text-richblack-5 rounded-full w-[13px] h-[13px] font-bold animate-bounce transition-all duration-200 text-center text-[10px]">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}

          {token === null && (
            <Link
              to={"/login"}
              className="flex items-center justify-center px-[10px] py-[5px] text-[8px] sm:px-[12px] sm:py-[8px] sm:text-[16px] rounded-[8px] border-richblack-700
               hover:bg-richblack-700 hover:text-richblack-5 border-[1px] transition-all duration-200"
            >
              <button className="font-medium text-base text-richblack-25 ">
                Log in
              </button>
            </Link>
          )}

          {token === null && (
            <Link
              to={"/signup"}
              className=" flex items-center justify-center px-[10px] py-[5px] text-[8px] sm:text-[16px]  sm:px-[12px] sm:py-[8px] rounded-[8px] border-richblack-700
               hover:bg-richblack-700 hover:text-richblack-5 border-[1px] transition-all duration-200"
            >
              <button className="font-medium text-base text-richblack-25 ">
                Sign up
              </button>
            </Link>
          )}

          {token !== null && <ProfileDropDown></ProfileDropDown>}

          {/* Hamburger */}
          <HamburgerMenu subLinks={subLinks} matchRoute={matchRoute} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
