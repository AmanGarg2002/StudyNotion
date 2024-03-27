import React from "react";
import CTAButton from "./Button";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

const CodeBlocks = ({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  backGroundGradient,
  code,
  Color,
}) => {
  return (
    <div className={`flex ${position} justify-between`}>
      {/* Section-1 */}
      <div className="lg:w-[47%] flex flex-col gap-[12px]">
        {heading}

        <div className="leading-8 text-richblack-300 text-[16px] text-left font-bold w-[90%]">
          {subheading}
        </div>

        <div className="flex flex-row gap-[24px] mt-[45px] ">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className="flex flex-row gap-[8px] justify-center items-center">
              {ctabtn1.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>

          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            {ctabtn2.btnText}
          </CTAButton>
        </div>
      </div>

      {/* Section-2*/}
      <div className=" relative lg:w-[480px] mt-[40px] lg:mt-0 ">
        <div
          className={` absolute ${backGroundGradient} h-[257.054px]
        w-[372.949px] blur-[40px]  rounded-full opacity-20  -top-[40px] left-[3.2px] bg-gradient-to-br 
        `}
        ></div>

        <div
          className="flex flex-row gap-[8px] sm:gap-[24px] lg:gap-4 w-full text-[10px]  sm:text-[15px] py-[12px] px-[5px] sm:pl-4 sm:px-2  border-[1px] 
        border-[rgba(255,255,255,0.22)] backdrop-blur-xl codeBlockBg"
        >
          <div className="text-center flex flex-col font-mono text-richblack-400 font-bold">
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
          </div>

          <div
            className={`w-[90%] flex flex-col font-bold font-mono ${Color} gap-[0.5px]`}
          >
            <TypeAnimation
              sequence={[code, 2000, ""]}
              repeat={Infinity}
              cursor={true}
              style={{
                whiteSpace: "pre-line",
                display: "block",
              }}
              omitDeletionAnimation={true}
            ></TypeAnimation>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;
