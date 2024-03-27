import React, { useEffect, useRef, useState } from "react";
import { NavbarLinks } from "../../../data/navbar-links";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { TfiHome } from "react-icons/tfi";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { TiMessages } from "react-icons/ti";
import { GoStack } from "react-icons/go";

const HamburgerMenu = ({ subLinks, matchRoute }) => {
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const hamburgerRef = useRef(false);

  const handleMenuToggle = () => {
    setIsMenuClicked((prev) => !prev);
    console.log("MENU STATUS:", isMenuClicked);
  };

  useEffect(() => {
    let handler = (e) => {
      if (!hamburgerRef.current.contains(e.target)) {
        setIsMenuClicked(false);
        return;
      }
    };

    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    document.addEventListener("scroll", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
      document.removeEventListener("scroll", handler);
    };
  }, []);

  return (
    <div
      className="relative block md:hidden cursor-pointer"
      onClick={() => handleMenuToggle()}
      ref={hamburgerRef}
    >
      {!isMenuClicked ? (
        <GiHamburgerMenu className="w-[24px]  h-[24px] text-richblack-25" />
      ) : (
        <RxCross2
          className={`w-[24px]  h-[24px] text-richblack-25 ${
            isMenuClicked ? "hambRotate" : ""
          } transition-all`}
        />
      )}

      <div
        id={isMenuClicked ? "slide" : "slide1"}
        className=" min-h-[calc(100vh-3.5rem)] w-[250px] pl-6  overflow-x-hidden  flex justify-center  mx-auto  rounded-bl-md rounded-tl-md top-[40px] border-l-[0.5px] border-b-[0.5px] border-richblack-600 backdrop-blur-lg pt-9 pb-4  bg-black bg-opacity-30 shadow-[rgba(157, 157, 157, 0.2)_0px_4px_10px]  "
      >
        <ul className=" z-[501] w-full mx-auto flex flex-col gap-y-5  text-richblack-50">
          {NavbarLinks.map((link, i) => {
            return (
              <li key={i} className=" ">
                {link.title === "Catalog" ? (
                  <div className=" relative group font-medium flex flex-col  gap-2   z-[10]  ">
                    <div className=" flex gap-3 items-center">
                      <p className=" flex items-center text-2xl gap-3">
                        <GoStack />
                        {link.title}
                      </p>

                      <MdOutlineKeyboardArrowDown />
                    </div>

                    <div className=" w-full">
                      <div className="flex flex-col gap-1 w-full ">
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
                                  className=" py-2 pl-2  rounded-md transition-all duration-200"
                                >
                                  <p className=" text-richblack-50 font-medium text-xl capitalize">
                                    {link.name.toLowerCase()}
                                  </p>
                                </Link>
                              ))}
                            {subLinks.filter(
                              (sublink) => sublink?.courses?.length > 0
                            ).length === 0 && (
                              <p className="text-richblack-50  text-xl font-bold flex justify-center text-center">
                                No Courses Found
                              </p>
                            )}
                          </>
                        ) : (
                          <p className=" text-richblack-50 text-xl font-bold flex justify-center text-center    ">
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
                          ? "  text-yellow-100 font-semibold underline"
                          : " text-richblack-50"
                      } transition-all duration-200 text-2xl font-medium flex items-center text-center mx-auto gap-3`}
                    >
                      {link.id === 1 && <TfiHome className=" text-[23px]" />}
                      {link.id === 3 && (
                        <HiOutlineUserGroup className=" text-[23px]" />
                      )}
                      {link.id === 4 && <TiMessages className=" text-[23px]" />}

                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default HamburgerMenu;
