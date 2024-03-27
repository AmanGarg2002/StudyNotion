import React from "react";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";
import PublishCourse from "./PublishCourse";

const RenderSteps = () => {
  const { step } = useSelector((state) => state.course);

  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish",
    },
  ];

  return (
    <div className=" flex flex-col items-center gap-8">
      <div className=" flex flex-row w-full">
        {steps.map((item, index) => (
          <div className="w-full flex flex-col gap-2" key={index}>
            <div className=" relative flex flex-row gap-1 items-center justify-center w-full">
              <div className=" flex flex-col justify-between h-[45px] w-[45px] ">
                <div
                  className={`${
                    step === item.id
                      ? " bg-yellow-900 text-yellow-50 border-yellow-50"
                      : " text-richblack-300 bg-richblack-800 border-richblack-700 "
                  } ${
                    step > item.id ? " bg-yellow-50 text-richblack-800" : ""
                  } rounded-full border p-2  transition-all object-cover duration-200 aspect-square  flex justify-center items-center  h-full text-center mx-auto `}
                >
                  {step > item.id ? (
                    <FaCheck className="   " />
                  ) : (
                    <p className=" font-bold text-xl">{item.id}</p>
                  )}
                </div>
              </div>

              {item.id !== steps.length && (
                <span
                  className={` absolute sm:left-[64%]  h-1 border-dashed left-[70%] w-[50%] sm:w-[72%] border-t-2  sm:mx-auto ${
                    step > item.id ? " border-yellow-50" : "border-[#424854]"
                  } `}
                ></span>
              )}
            </div>
            <div className=" w-[100%] text-center">
              {
                <p
                  className={`text-sm font-normal ${
                    step === item.id
                      ? " text-richblack-5"
                      : " text-richblack-500"
                  }`}
                >
                  {item.title}
                </p>
              }
            </div>
          </div>
        ))}
      </div>

      <div className=" w-full">
        {step === 1 && <CourseInformationForm />}
        {step === 2 && <CourseBuilderForm />}
        {step === 3 && <PublishCourse />}
      </div>
    </div>
  );
};

export default RenderSteps;
