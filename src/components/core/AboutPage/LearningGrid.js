import React from "react";
import { LearningGridArray } from "../../../data/learning-grid";
import HighlightText from "../HomePage/HighlightText";
import CTAButton from "../HomePage/Button";

const LearningGrid = () => {
  return (
    <section className=" bg-richblack-900  py-[90px]">
      <div className=" w-11/12 max-w-maxContent mx-auto ">
        <div className="grid mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {LearningGridArray.map((card, index) => {
            return (
              <div
                key={index}
                className={`${index === 0 && "lg:col-span-2"}
                ${
                  card.order % 2 === 0
                    ? "bg-richblack-800"
                    : " bg-richblack-700"
                }
                
                ${card.order === 3 && " lg:col-start-2"}
                ${card.order < 0 && " bg-richblack-900"}
                
                `}
              >
                {card.order === -1 ? (
                  <div className="flex flex-col gap-3 pb-10 lg:pb-0  ">
                    <div>
                      <h2 className="font-semibold text-[36px] leading-[44px] tracing-[0.75px] text-richblue-5">
                        {card.heading}
                      </h2>
                      <HighlightText text={card.highlightText}></HighlightText>
                    </div>
                    <p className=" text-richblack-300 font-medium text-base w-[90%]">
                      {card.description}
                    </p>

                    <div className="flex mt-6">
                      <CTAButton linkto={card.BtnLink} active={true}>
                        {card.BtnText}
                      </CTAButton>
                    </div>
                  </div>
                ) : (
                  <div className=" flex flex-col p-8 gap-8 h-[250px] lg:h-[294px]">
                    <div className=" text-richblack-5 text-xl font-medium w-[90%]">
                      {card.heading}
                    </div>
                    <div className="text-richblack-100 text-base font-normal">
                      {card.description}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LearningGrid;
