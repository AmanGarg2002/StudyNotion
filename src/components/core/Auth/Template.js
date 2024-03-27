import React from "react";
import Frame from "../../../assets/Images/frame.png";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useSelector } from "react-redux";

const Template = ({ title, description1, description2, formType, image }) => {
  const { loading } = useSelector((state) => state.auth);

  return (
    <div className="relative w-screen">
      {loading ? (
        <div className="spinner absolute top-[45vh] left-[50vw] "></div>
      ) : (
        <div className="w-11/12 max-w-maxContent  flex flex-col-reverse gap-9 md:flex-row  mx-auto py-[31px]  gap-x-12  md:justify-between">
          <div className="w-11/12 max-w-maxContent flex flex-col  items-center md:items-start  text-white">
            {/* Left Part */}

            <div className="w-11/12 max-w-[450px] py-2  md:mt-0  gap-3">
              <h2 className=" text-[1.875rem] leading-[2.375rem] font-semibold text-richblack-5">
                {title}
              </h2>

              <p className=" mt-4 text-[1.125rem] leading-[1.625rem]">
                <span className=" text-richblack-100">{description1} </span>
                <span className=" text-blue-100 font-bold italic">
                  {description2}
                </span>
              </p>

              {formType === "signup" ? <SignupForm /> : <LoginForm />}
            </div>
          </div>

          {/* Right Part */}

          <div className=" flex relative mx-auto max-w-[558px] items-center md:items-start w-11/12 mt-10 md:mt-0 ">
            <img
              src={Frame}
              alt="FrameImage"
              loading="lazy"
              className=" md:absolute md:top-4 md:-right-4  "
            />
            <img
              src={image}
              alt="ImageOverFrame"
              loading="lazy"
              className=" absolute shadow-[-14px_-14px_39px_-14px] shadow-blue-200 -top-4 right-4 md:top-0 md:right-0"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Template;
