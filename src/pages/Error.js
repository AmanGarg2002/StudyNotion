import React from "react";
import ErrorImage from "../assets/Images/e1.png";
import CTAButton from "../components/core/HomePage/Button";
import { useEffect } from "react";

const Error = ({ setProgress }) => {
  useEffect(() => {
    setProgress(30);

    setTimeout(() => {
      setProgress(100);
    }, 500);
  }, []);

  return (
    <div className="w-11/12 max-w-maxContent flex flex-col gap-6 shadow-blue-200 shadow-lg items-center justify-center text-richblack-25 mx-auto  min-h-[calc(100vh-3.5rem)]">
      <img src={ErrorImage} alt="ErrorImage" loading="lazy" />
      <CTAButton active={true} linkto={"/"}>
        Home
      </CTAButton>
    </div>
  );
};

export default Error;
