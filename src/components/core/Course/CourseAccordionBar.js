import React, { useEffect, useRef, useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import CourseSubSectionAccordion from "./CourseSubSectionAccordion";

const CourseAccordionBar = ({ isActive, handleActive, course }) => {
  const contentEl = useRef(null);

  const [active, setActive] = useState(false);
  useEffect(() => {
    setActive(isActive?.includes(course._id));
  }, [isActive]);

  const [sectionHeight, setSectionHeight] = useState(0);
  useEffect(() => {
    setSectionHeight(active ? contentEl.current.scrollHeight : 0);
  }, [active, course.subSection]);

  return (
    <div className=" overflow-hidden  border border-solid border-richblack-600 bg-richblack-700">
      <div>
        <div
          className={` flex cursor-pointer items-start justify-between bg-opacity-20 px-8  py-4 transition-[0.3s]`}
          onClick={() => handleActive(course._id)}
        >
          <div className=" flex items-center gap-2 text-richblack-200">
            <i
              className={`${
                isActive.includes(course._id) ? " rotate-180" : " rotate-0"
              } `}
            >
              <AiOutlineDown />
            </i>
            <p className=" text-sm text-richblack-5 font-medium capitalize">
              {course?.sectionName}
            </p>
          </div>

          <div className=" space-x-4">
            <span className=" text-yellow-50 font-normal text-sm">{`${
              course?.subSection.length || 0
            } lectures`}</span>
          </div>
        </div>
      </div>

      <div
        ref={contentEl}
        className={` relative bg-richblack-900  transition-[height]  duration-[0.35s] ease-[ease] `}
        style={{
          height: sectionHeight,
        }}
      >
        <div className=" flex flex-col py-4 px-8 gap-3 font-medium">
          {course?.subSection.map((subSec, i, arr) => {
            return (
              <div
                key={i}
                style={i === arr.length - 1 ? { marginBottom: "9px" } : {}}
              >
                <CourseSubSectionAccordion subSec={subSec} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CourseAccordionBar;
