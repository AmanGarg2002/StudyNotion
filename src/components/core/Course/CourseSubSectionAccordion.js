import React, { useState } from "react";
import { HiOutlineVideoCamera } from "react-icons/hi";
import { AiOutlineDown } from "react-icons/ai";

const CourseSubSectionAccordion = ({ subSec }) => {
  const [open, setOpen] = useState(false);

  return (
    <div onClick={() => setOpen((prev) => !prev)} className="cursor-pointer">
      <div className=" flex justify-between py-2">
        <div className=" flex items-center gap-2">
          <span>
            <HiOutlineVideoCamera className=" text-richblack-50 text-lg" />
          </span>
          <p className=" text-richblack-5 text-sm font-medium capitalize">
            {" "}
            {subSec?.title}
          </p>
          <AiOutlineDown
            className={` text-richblack-50  ${
              !open ? " rotate-0" : " rotate-180"
            } `}
          />
        </div>
      </div>
      <div
        className={`ml-7 flex justify-between`}
        style={{
          height: open ? "30px" : 0,
          overflow: open ? "visible" : "hidden",
          transition: "height 0.35s ease",
        }}
      >
        {open && (
          <p className=" text-richblack-50 text-xs font-normal truncate">
            {subSec?.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default CourseSubSectionAccordion;
