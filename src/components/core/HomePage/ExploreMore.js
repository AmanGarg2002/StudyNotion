import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import HighlightText from "./HighlightText";
import CourseCard from "./CourseCard";

const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };

  return (
    <div className="flex flex-col items-center w-full mb-6">
      <div className="text-[36px] leading-[44px] font-semibold ">
        Unlock the
        <HighlightText text={"Power of Code"} />
      </div>
      <p className=" text-richblack-300 text-[18px] leading-6 font-bold font-inter mt-1 mb-5">
        Learn to Build Anything You Can Imagine
      </p>

      <div className=" invisible lg:visible flex flex-row shadow-[1px_2px_0px_0px_rgba(255,255,255,0.22)] items-center font-medium rounded-full  bg-richblack-800 mb-5 p-1 gap-5">
        {tabsName.map((element, index) => {
          return (
            <div
              key={index}
              className={`invisible lg:visible text-base flex items-center font-medium py-[7px] px-7
              ${
                currentTab === element
                  ? " bg-richblack-900 text-richblack-5 font-medium"
                  : " text-richblack-200"
              } rounded-full  cursor-pointer transition-all duration-200 hover:bg-richblack-900  hover:text-richblack-5
              `}
              onClick={() => setMyCards(element)}
            >
              {element}
            </div>
          );
        })}
      </div>

      <div className="-mt-20 lg:px-[52px] lg:mt-[30px] md:-mt-14 ">
        <div className="flex  items-center justify-center gap-8 flex-wrap">
          {courses.map((element, index) => {
            return (
              <CourseCard
                key={index}
                cardData={element}
                currentCard={currentCard}
                setCurrentCard={setCurrentCard}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExploreMore;
