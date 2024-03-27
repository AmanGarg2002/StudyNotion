import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEnrolledCourses } from "../../../services/operations/profileApi";
import ProgressBar from "@ramonak/react-progress-bar";
import { calculateTotalDuration } from "../../../utils/calculateTotalDuration";
import { useNavigate } from "react-router-dom";
import { getRandomColor } from "../../../utils/color";

const EnrolledCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [enrolledCourses, setEnrolledCourses] = useState(null);

  const getEnrollCourses = async () => {
    try {
      const res = await getEnrolledCourses(token);

      setEnrolledCourses(res);

      console.log("RESPONSE HU MAI SABKA:", res);
    } catch (error) {
      console.log("Could not fetch enrolled courses.");
    }
  };

  useEffect(() => {
    getEnrollCourses();
  }, []);

  return (
    <div className=" relative flex flex-col text-richblack-5 gap-8 min-h-[calc(100%-3.5rem)]  ">
      <h1 className=" text-3xl font-medium ">Enrolled Courses</h1>
      {!enrolledCourses ? (
        <div className=" absolute left-[50%] top-[30vh] spinner"></div>
      ) : !enrolledCourses.length ? (
        <p className=" w-full grid place-content-center text-richblack-5 h-[10vh] ">
          You have not enrolled in any course yet.
        </p>
      ) : (
        <div>
          <div className="lg:flex lg:gap-8 hidden justify-center lg:flex-row rounded-t-lg p-4 bg-richblack-700 text-sm font-medium text-richblack-50 ">
            <p className=" lg:w-[48%] items-center">Course Name</p>
            <p className=" w-1/4 text-center">Durations</p>
            <p className=" w-1/4 text-center">Progress</p>
          </div>

          {/* Cards */}
          <div className=" flex flex-col justify-center  ">
            {enrolledCourses.map((course, index, arr) => {
              return (
                <div key={index}>
                  <div
                    className={`border flex lg:block w-full md:w-full   border-richblack-700 ${
                      index === arr.length - 1
                        ? " rounded-b-lg"
                        : " rounded-none"
                    } `}
                  >
                    <div className="flex flex-col w-full lg:flex-row md:w-full justify-center p-4 gap-3 lg:gap-8">
                      {/* 1st Part */}
                      <div
                        className=" flex flex-col group  w-full sm:flex-row items-center md:w-full lg:w-[48%] gap-5 cursor-pointer"
                        onClick={() => {
                          navigate(
                            `/view-course/${course?._id}/section/${course?.courseContent?.[0]?._id}/sub-section/${course?.courseContent?.[0].subSection?.[0]?._id}`
                          );
                        }}
                      >
                        <div className=" w-full h-full group-hover:shadow-blue-200  group-hover:shadow rounded-lg transition-all duration-200 ">
                          <img
                            src={course.thumbnail}
                            alt="ThumbnailImage"
                            loading="lazy"
                            className=" w-full h-full  object-center  rounded-[8px] "
                          />
                        </div>
                        <div className=" flex flex-col items-start justify-between gap-1 w-full h-full">
                          <p className=" text-richblack-5 text-base font-medium">
                            {course.courseName.length > 45
                              ? course.courseName.slice(0, 45) + "..."
                              : course.courseName}
                          </p>
                          <p className=" text-richblack-300 font-normal text-base">
                            {course.courseDescription.length > 50
                              ? course.courseDescription.slice(0, 50) + ".."
                              : course.courseDescription.length}
                          </p>
                        </div>
                      </div>

                      {/* 2nd Part */}
                      <div className=" lg:w-1/4 text-richblack-50 text-base lg:text-center font-medium">
                        {calculateTotalDuration(course)}
                      </div>

                      {/* 3rd Part */}
                      <div className="flex flex-col  lg:w-1/4 gap-2">
                        <p className=" text-xs font-semibold text-richblack-50">
                          Progress {course.progressPercentage || 0}%
                        </p>
                        <div className="  lg:w-full">
                          <ProgressBar
                            completed={course.progressPercentage || 0}
                            height="8px"
                            isLabelVisible={false}
                            bgColor={getRandomColor()}
                            labelColor=""
                            transitionTimingFunction="ease-in"
                            animateOnRender
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
