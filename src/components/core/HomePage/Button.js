import React from "react";
import { Link } from "react-router-dom";

const Button = ({ children, active, linkto }) => {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <Link to={linkto} onClick={handleClick}>
      <div
        className={` CTAButton text-center text-[16px] md:px-[24px] md:py-[12px] py-[12px] px-[12px] rounded-lg font-bold
      ${
        active ? "bg-yellow-50 text-black font-bold" : "bg-richblack-800"
      } hover:scale-95 transition-all duration-200 md:px-[24px] md:py-[12px] px-[12px] py-[12px]  `}
      >
        {children}
      </div>
    </Link>
  );
};

export default Button;
