import React from "react";
import quote1 from "../../../assets/Images/quote1.svg";
import quote2 from "../../../assets/Images/quote2.svg";
import HighlightText from "../HomePage/HighlightText";
import TextOrange from "./TextOrange";

const Quote = () => {
  return (
    <section className="bg-richblack-900">
      <div className="  mt-[100px] lg:-mt-[190px] lg:pt-[167px] relative   sm:w-11/12 max-w-maxContent flex flex-col items-center mx-auto gap-4">
        <img
          src={quote1}
          alt="quote1"
          loading="lazy"
          className=" absolute invisible md:visible md:-top-[30px] lg:top-[138px]  xl:top-[50%] xl:-left-[40px]"
        />

        <header className=" w-[95%] text-left sm:w-full   sm:text-center text-richblack-100 font-inter font-semibold text-4xl tracing-[0.75px] leading-[52px]">
          We are passionate about revolutionizing the way we learn. Our
          innovative platform <HighlightText text={"combines technology"} />
          ,
        
          <TextOrange text={"expertise"} active={true} />, and community to
          create an{" "}
          <TextOrange
            text={"unparalleled educational experience."}
            active={false}
          ></TextOrange>
        </header>

        <img
          src={quote2}
          alt="quote2"
          loading="lazy"
          className=" absolute invisible md:visible md:-bottom-[30px]  xl:right-[22%] xl:bottom-[9%]"
        />
      </div>
    </section>
  );
};

export default Quote;
