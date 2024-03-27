import React from "react";
import HighlightText from "./HighlightText";
import know_your_progress from "../../../assets/Images/Know_your_progress.png";
import Compare_with_others from "../../../assets/Images/Compare_with_others.png";
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.png";
import CTAButton from "./Button";

const LearningLanguageSection = () => {
  return (
    <div>
      <div className="flex flex-col">
        <div className="font-semibold text-[36px] leading-[50px] text-center  text-richblack-7  00">
          Your swiss knife for
          <HighlightText text={"learning any language"} />
        </div>
        <div className="mt-[8px] text-[17px] leading-7 text-richblack-900 text-center mx-auto w-[70%]">
          Using spin making learning multiple languages easy. with 20+ languages
          realistic voice-over, progress tracking, custom schedule and more.
        </div>
        <div className="flex lg:flex-row flex-col items-center justify-center  mx-auto ">
          <img
            src={know_your_progress}
            loading="lazy"
            alt="KnowYourProgressImage"
            className=" object-contain  mt-[30px] -mb-[42px] lg:-mt-[40px]"
          />
          <img
            src={Compare_with_others}
            loading="lazy"
            alt="CompareWithOthersImage"
            className=" object-contain -mr-[30px] -mb-[68px] lg:-mr-[145px] lg:-ml-[135px]  "
          />
          <img
            src={Plan_your_lessons}
            loading="lazy"
            alt="PlanYouLessonsImage"
            className=" object-contain lg:-mt-[65px]"
          />
        </div>

        <div className="flex items-center  justify-center -mt-3 lg:mt-12">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>
        </div>
      </div>
    </div>
  );
};

export default LearningLanguageSection;
