import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../../services/formatDate";
import { HiClock } from "react-icons/hi";
import { FaCheck } from "react-icons/fa";
import { HiMiniPencil } from "react-icons/hi2";
import { RiDeleteBin6Line } from "react-icons/ri";
import { COURSE_STATUS } from "../../../../utils/constants";
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../../services/operations/courseDetailApi";
import ConfirmationModal from "../../../common/ConfirmationModal";

const CourseGrid = ({ courses, setCourses }) => {
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const [confirmationModal, setConfirmationModal] = useState(null);
  const handleCourseDelete = async (courseId) => {
    setLoading(true);

    await deleteCourse({ courseId: courseId }, token);
    const result = await fetchInstructorCourses(token);
    if (result) {
      setCourses(result);
    }
    setConfirmationModal(null);
    setLoading(false);
  };

  const calculateTotalDuration = (course) => {
    let totalDuration = 0;

    course?.courseContent?.forEach((section) => {
      section?.subSection?.forEach((subSection) => {
        const duration = Number(subSection?.timeDuration);
        if (!isNaN(duration)) {
          totalDuration += duration;
        }
      });
    });

    const hours = Math.floor(totalDuration / 3600);
    const minutes = Math.floor((totalDuration % 3600) / 60);
    const seconds = Math.floor(totalDuration % 60);

    return `${hours}hr ${minutes}min ${seconds}sec`;
  };

  return (
    <div className="">
      {courses.length === 0 ? (
        <div className="py-10 text-center text-2xl font-medium text-richblack-100">
          No Courses Found
        </div>
      ) : (
        <div className=" grid grid-cols-1  md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-7  ">
          {courses.map((course) => (
            <div
              key={course?._id}
              className=" flex flex-col gap-3 border-richblack-800 border rounded-lg pb-4   shadow-blue-100 shadow transition-all duration-200"
            >
              <div className=" h-[250px]  xl:h-[200px] border-b border-richblack-800  ">
                <img
                  src={course?.thumbnail}
                  alt={course?.thumbnail}
                  className=" rounded-t-lg h-[250px] xl:h-[200px] w-full  "
                />
              </div>

              <div className=" flex flex-col gap-3 px-2">
                <div className="  text-lg font-semibold text-richblack-25 truncate ">
                  {course.courseName}
                </div>

                <div className=" text-sm font-normal text-richblack-100">
                  {course?.courseDescription &&
                    `${course.courseDescription
                      .split(" ")
                      .slice(0, 20)
                      .join(" ")}` + "..."}
                </div>

                <div className=" text-richblack-100 text-sm font-medium truncate ">
                  Created: {formatDate(course?.createdAt)}
                </div>
              </div>

              <div className=" flex flex-row-reverse items-center justify-between px-2">
                {course?.status === COURSE_STATUS.DRAFT ? (
                  <p className="flex   flex-row w-28 justify-center items-center  gap-2 rounded-full bg-richblack-700 px-[2px] py-[2px] text-xs  font-medium text-pink-100 ">
                    <span className="flex rounded-full justify-center items-center">
                      <HiClock size={20} />
                    </span>
                    Drafted
                  </p>
                ) : (
                  <p className="flex flex-row w-28 justify-center items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px]  font-medium  text-yellow-100 ">
                    <span className=" h-3 w-3 flex justify-center rounded-full items-center bg-yellow-100 text-richblack-700">
                      <FaCheck size={8} />
                    </span>
                    Published
                  </p>
                )}
                <p className=" text-yellow-100 text-lg font-medium ">
                  ₹{course?.price}
                </p>
              </div>

              <div className=" px-2">
                <p className=" text-richblack-100 text-base font-medium truncate">
                  Duration: {calculateTotalDuration(course)}
                </p>
              </div>

              <div className=" flex items-center justify-end px-2">
                <div className=" flex items-center gap-5">
                  <button
                    disabled={loading}
                    onClick={() =>
                      navigate(`/dashboard/edit-course/${course._id}`)
                    }
                  >
                    <HiMiniPencil className=" w-[20px] h-[20px] hover:text-blue-200 transition-all duration-200" />
                  </button>

                  <button
                    disabled={loading}
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Do you want to delete this course?",
                        text2:
                          "All the data related to this course will be deleted",
                        btn1Text: loading ? "Loading..." : "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: !loading
                          ? () => handleCourseDelete(course._id)
                          : () => {},
                        btn2Handler: !loading
                          ? () => setConfirmationModal(null)
                          : () => {},
                      });
                    }}
                  >
                    <RiDeleteBin6Line className=" w-[20px] h-[20px] hover:text-pink-600 transition-all duration-200" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default CourseGrid;
