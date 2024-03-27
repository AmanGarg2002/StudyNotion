import React from "react";
import InstructorImage from "../../../assets/Images/Instructor.png";
import HighlightText from "./HighlightText";
import CTAButton from "./Button";
import { FaArrowRight } from "react-icons/fa";

const InstructorSection = () => {
  return (
    <div className=" mt-4 mb-[35px]">
      <div className="flex flex-col justify-center items-center lg:flex-row gap-20">
        <div className="lg:w-[50%] shadow-[-20px_-20px]">
          <img
            src={InstructorImage}
            alt="InstructorImage"
            loading="lazy"
            className=" object-cover shadow-blue-200 shadow-[10px_10px_38px_-10px]"
          />
        </div>
        <div className="lg:w-[45%] flex flex-col gap-[38px] items-start justify-center">
          <div className="font-semibold text-[36px] leading-[44px] w-[50%]">
            Become an
            <HighlightText text={"instructor"} />
          </div>
          <p className="text-richblack-300 text-[17px] w-[100%]">
            Instructors from around the world teach millions of students on
            StudyNotion. We provide the tools and skills to teach what you love.
          </p>

          <div>
            <CTAButton active={true} linkto={"/signup"}>
              <div className="flex flex-row gap-3 items-center justify-center">
                Start Teaching Today
                <FaArrowRight />
              </div>
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorSection;
