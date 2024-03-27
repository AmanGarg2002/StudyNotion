import React from "react";
import { FaUserFriends } from "react-icons/fa";
import { FaChartSimple } from "react-icons/fa6";

const CourseCard = ({ cardData, currentCard, setCurrentCard }) => {
  return (
    <div
      className={`sm:w-[360px] gap-[12px] lg:mt-0
     ${
       currentCard === cardData.heading
         ? " bg-white shadow-[12px_12px_0px_0px] shadow-yellow-50 text-black  "
         : "bg-richblack-800 text-richblack-25"
     }
      cursor-pointer transition-all duration-200
    `}
      onClick={() => setCurrentCard(cardData.heading)}
    >
      <div className=" h-[240px] border-b-[2px] border-dashed px-[24px] border-richblack-300 pt-[24px] pb-[76px] flex flex-col gap-[12px]">
        <div className=" text-[20px] font-inter font-semibold ">
          {cardData.heading}
        </div>
        <div className="text-[16px] font-inter font-normal leading-6 text-richblack-400">
          {cardData.description}
        </div>
      </div>

      <div
        className={`flex flex-row items-center justify-between pl-[24px] py-[16px] pr-[10px]
       ${
         currentCard === cardData.heading
           ? " text-blue-500"
           : " text-richblack-300"
       }
      `}
      >
        <div className="flex flex-row items-center justify-center gap-[8px]">
          <FaUserFriends className="w-[20px] h-[20px]" />
          <p className="text-base font-medium">{cardData.level}</p>
        </div>
        <div className="flex flex-row items-center gap-[8px] w-[110px]">
          <div>
            <FaChartSimple className="w-[20px] h-[20px]" />
          </div>

          <div>
            <p className="text-base font-medium">
              {cardData.lessionNumber} Lession
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
