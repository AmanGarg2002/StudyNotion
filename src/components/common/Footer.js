import React from "react";
import LogoLight from "../../assets/Logo/Logo-Full-Light.png";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FooterLink2 } from "../../data/footer-links";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Company = ["About", "Careers", "Affiliates"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const Footer = () => {
  return (
    <div className=" w-11/12  max-w-maxContent mx-auto  bg-richblack-800  pt-[30px] pb-[52px] flex flex-col items-center gap-[32px]">
      <div className=" flex lg:flex-row w-full flex-col lg:gap-[12px] gap-[50px]">
        {/* Left Part */}
        <div className="lg:w-[50%] w-[100%] lg:border-r-[2px] lg:border-richblack-700 ">
          <div className=" grid md:grid-cols-3 w-full grid-cols-2  gap-[12px]">
            {/* Logo Part */}
            <div className="flex flex-col gap-[12px] items-start">
              <Link to={"/"}>
                <img
                  src={LogoLight}
                  alt="LogoLight"
                  loading="lazy"
                  className=" text-richblack-50 h-[32px] text-left object-contain  "
                />
              </Link>
              <h2 className=" text-richblack-100 text-base font-semibold font-inter mb-[3px]">
                Company
              </h2>

              <div className="flex flex-col gap-[15px] text-[14px] font-normal">
                {Company.map((element, index) => {
                  return (
                    <Link
                      to={element.toLowerCase()}
                      key={index}
                      className=" text-richblack-400 hover:text-richblack-100 transition-all duration-200"
                    >
                      {element}
                    </Link>
                  );
                })}
              </div>

              <div className="flex flex-row gap-[12px] text-richblack-400 items-center ">
                <Link to={"https://www.facebook.com"}>
                  <FaFacebook className="w-[20px] h-[20px]" />
                </Link>
                <Link to={"https://www.google.com"}>
                  <FaGoogle className="w-[20px] h-[20px]" />
                </Link>
                <Link to={"https://twitter.com"}>
                  <FaTwitter className="w-[20px] h-[20px]" />
                </Link>
                <Link to={"https://www.youtube.com"}>
                  <FaYoutube className="w-[20px] h-[20px]" />
                </Link>
              </div>
            </div>

            {/* Resources Part */}
            <div className="flex flex-col  items-start gap-[15px] mt-1 md:pl-[10px]">
              <h2 className=" text-richblack-100 text-base font-semibold font-inter">
                Resources
              </h2>
              <div className="flex flex-col gap-[15px] text-[14px] font-normal ">
                {Resources.map((element, index) => {
                  return (
                    <a
                      key={index}
                      to={element.toLowerCase().replace(" ", "-")}
                      className=" text-richblack-400 hover:text-richblack-100 transition-all duration-200"
                    >
                      {element}
                    </a>
                  );
                })}
              </div>

              <h2 className=" text-richblack-100 text-base font-semibold font-inter mt-[21px]">
                Support
              </h2>

              <Link
                to={"/help-center"}
                className=" text-richblack-400 hover:text-richblack-100 transition-all duration-200"
              >
                Help Center
              </Link>
            </div>

            {/* Plans Parts */}
            <div className="flex flex-col  items-start gap-[15px] md:mt-1 -mt-[190px]">
              <h2 className=" text-richblack-100 text-base font-semibold font-inter">
                Plans
              </h2>
              <div className="flex flex-col gap-[15px] text-[14px] font-normal ">
                {Plans.map((element, index) => {
                  return (
                    <Link
                      key={index}
                      to={element.toLowerCase().replace(" ", "-")}
                      className=" text-richblack-400 hover:text-richblack-100 transition-all duration-200"
                    >
                      {element}
                    </Link>
                  );
                })}
              </div>

              <h2 className=" text-richblack-100 text-base font-semibold font-inter mt-[21px]">
                Community
              </h2>
              <div className="flex flex-col gap-[15px] text-[14px] font-normal ">
                {Community.map((element, index) => {
                  return (
                    <Link
                      key={index}
                      to={element.toLowerCase().replace(" ", "-")}
                      className=" text-richblack-400 hover:text-richblack-100 transition-all duration-200"
                    >
                      {element}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Part */}
        <div className="lg:w-[50%] w-full md:pl-[20px] mt-1 ">
          <div className=" grid md:grid-cols-3 grid-cols-2 lg:gap-[40px] ">
            {FooterLink2.map((element, index) => {
              return (
                <div key={index}>
                  <h2
                    className={`${
                      index < 2
                        ? "text-richblack-100 text-base font-semibold font-inter mb-[3px] "
                        : " lg:mt-1 md:mt-1 mt-10 text-richblack-100 text-base font-semibold font-inter mb-[3px]"
                    } `}
                  >
                    {element.title}
                  </h2>
                  <div className="flex flex-col  text-[14px] font-normal ">
                    {element.links.map((link, index) => {
                      return (
                        <div key={index} className="mt-[10px]">
                          <Link
                            to={link.link}
                            className=" text-richblack-400 hover:text-richblack-100 transition-all duration-200"
                          >
                            {link.title}
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="h-[2px] bg-richblack-700 w-11/12 max-w-maxContent"></div>
      <div className="w-11/12 max-w-maxContent flex flex-col gap-2 lg:flex-row justify-center items-center lg:justify-between">
        <div className="flex flex-row gap-[8px] ">
          {BottomFooter.map((element, index) => {
            return (
              <div key={index} className="flex gap-[8px] items-center">
                <Link
                  to={element.replace(" ", "-").toLowerCase()}
                  className=" text-richblack-400 hover:text-richblack-100 transition-all duration-200"
                >
                  {element}
                </Link>
                {index < 2 && (
                  <div className=" w-[1px] h-full  bg-richblack-300"></div>
                )}
              </div>
            );
          })}
        </div>
        <div className=" text-base lg:text-[14px] font-medium text-richblack-300">
          Made with <span className=" text-pink-200">♥</span> Aman Garg © 2024
          StudyNotion
        </div>
      </div>
    </div>
  );
};

export default Footer;
