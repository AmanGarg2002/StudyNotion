import React from "react";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import TimeLineImage from "../../../assets/Images/TimelineImage.png";

const timeline = [
  {
    Logo: Logo1,
    Heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    Logo: Logo2,
    Heading: "Responsibility",
    Description: "Students will always be our top priority",
  },
  {
    Logo: Logo3,
    Heading: "Flexibility",
    Description: "The ability to switch is an important skills",
  },
  {
    Logo: Logo4,
    Heading: "Solve the problem",
    Description: "Code your way to a solution",
  },
];

const TimelineSection = () => {
  return (
    <div className="mt-[20px] pb-[80px]">
      <div className="flex lg:flex-row flex-col items-center gap-[76px]">
        <div className="xl:w-[45%] flex flex-col ">
          {timeline.map((element, index) => {
            return (
              <div className="flex flex-col " key={index}>
                <div className="lg:-mb-[20px] xl:mb-0">
                  <div className="flex flex-row  gap-6 lg:gap-6 lg:py-[10px] lg:px-[41px]   ">
                    <div className="flex justify-center items-center rounded-full  bg-white p-1 h-[52px] w-[52px] shadow-[0px_0px_62px_0px rgba(0, 0, 0, 0.12)]">
                      <img
                        src={element.Logo}
                        alt="TimelineLogo"
                        loading="lazy"
                      />
                    </div>

                    <div className=" flex flex-col gap-[2px] font-inter">
                      <h2 className=" font-semibold leading-[27px] text-lg">
                        {element.Heading}
                      </h2>
                      <p className=" font-normal text-[#2C333F]  text-[17px] ">
                        {element.Description}
                      </p>
                    </div>
                  </div>
                </div>
                {index < 3 && (
                  <div className=" lg:h-[74px] lg:px-[30px] invisible lg:visible w-[1px] xl:h-16 px-[3px] h-[70px] -mt-2 xl:py-[14px] xl:px-[33px]  border-r-2 border-richblack-200   border-dotted"></div>
                )}
              </div>
            );
          })}
        </div>

        <div className=" relative shadow-blue-200 shadow-[-10px_-10px_37px_-12px] h-fit">
          <img
            src={TimeLineImage}
            alt="TimeLineImage"
            loading="lazy"
            className="  object-cover h-fit shadow-[17px_17px] shadow-white"
          />
          <div className=" invisible sm:visible absolute left-0 top-0 py-[30px] flex-col px-[10px] sm:top-[100%]   sm:left-[50%] sm:-translate-x-[50%] sm:-translate-y-[50%] bg-caribbeangreen-700 flex sm:flex-row text-richblack-5 uppercase sm:p-[38px] sm:items-center sm:justify-center">
            <div className="flex items-center justify-between sm:gap-6 ">
              <p className="text-3xl font-bold">10</p>
              <p className="text-[14px] text-caribbeangreen-300 font-medium">
                Years <br />
                experiences
              </p>
            </div>
            <div className="ml-[52px] mr-[52px] w-[1px] h-[44px] bg-caribbeangreen-500 invisible sm:visible "></div>
            <div className="flex items-center gap-6">
              <p className="text-3xl font-bold">250</p>
              <p className="text-[14px] text-caribbeangreen-300 font-medium">
                types of <br/>courses
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;
