import React from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import RenderSteps from "./RenderSteps";
import { useSelector } from "react-redux";

export default function AddCourse() {
  const { step } = useSelector((state) => state.course);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col-reverse space-y-5 lg:space-y-0 items-center lg:items-start lg:flex-row lg:justify-between gap-6  text-richblack-5 min-h-[calc(100vh-3.5rem)] pb-[250px] ">
      <div className=" flex flex-col space-y-5 lg:space-y-0 lg:gap-3 w-full">
        <div
          className="flex flex-row items-center gap-1 text-richblack-300 cursor-pointer"
          onClick={() => {
            navigate("/dashboard/instructor");
          }}
        >
          <FaChevronLeft className=" h-[12px] w-[12px]" />

          <p className=" text-sm">Back to Dashboard</p>
        </div>

        {step === 1 && <h1 className=" text-3xl font-medium ">Add Course</h1>}

        <div className=" mt-1">
          <RenderSteps />
        </div>
      </div>

      <div className=" max-h-fit  p-6 flex flex-col  gap-[19px]  rounded-[8px] border  border-richblack-700 bg-richblack-800 max-w-[384px]">
        <p className=" text-richblack-5 text-lg pl-1">⚡Course Upload Tips</p>

        <ol className=" text-richblack-5 list-disc flex flex-col pl-6 text-left gap-[11px]">
          <li className=" text-xs font-medium">
            Set the Course Price option or make it free.
          </li>

          <li className=" text-xs font-medium">
            Standard size for the course thumbnail is 1024x576.
          </li>

          <li className=" text-xs font-medium">
            Video section controls the course overview video.
          </li>

          <li className=" text-xs font-medium">
            Course Builder is where you create & organize a course.
          </li>

          <li className=" text-xs font-medium">
            Add Topics in the Course Builder section to create lessons, quizzes,
            and assignments.
          </li>

          <li className=" text-xs font-medium">
            Information from the Additional Data section shows up on the course
            single page.
          </li>

          <li className=" text-xs font-medium">
            Make Announcements to notify any important.
          </li>

          <li className=" text-xs font-medium">
            Notes to all enrolled students at once.
          </li>
        </ol>
      </div>
    </div>
  );
}
