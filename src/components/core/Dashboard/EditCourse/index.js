import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import RenderSteps from "../AddCourse/RenderSteps";
import { getFullDetailsOfCourse } from "../../../../services/operations/courseDetailApi";
import { setCourse, setEditCourse } from "../../../../slices/courseSlice";
import { FaChevronLeft } from "react-icons/fa";

const EditCourse = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { course } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const populateCourseDetails = async () => {
      setLoading(true);
      const result = await getFullDetailsOfCourse(courseId, token);
      if (result?.courseDetails) {
        dispatch(setEditCourse(true));
        dispatch(setCourse(result?.courseDetails));
      }
      setLoading(false);
    };
    populateCourseDetails();
  }, []);

  if (loading) {
    return (
      <div className=" py-10 mt-4 text-center text-3xl font-medium text-richblack-100">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col text-richblack-5 gap-8 pb-[300px]  ">
      <div className=" flex flex-col gap-3">
        <div
          className="flex flex-row items-center gap-1 text-richblack-300 cursor-pointer"
          onClick={() => navigate("/dashboard/my-courses")}
        >
          <FaChevronLeft className=" h-[12px] w-[12px]" />

          <p className=" text-sm">Back to My Courses</p>
        </div>
        <h1 className=" text-3xl font-medium ">Edit Course</h1>
      </div>

      <div className=" w-[95%] md:w-[90%] lg:w-[75%] mx-auto">
        {course ? (
          <RenderSteps />
        ) : (
          <p className=" text-center text-2xl font-medium text-richblack-100">
            Course Not Found
          </p>
        )}
      </div>
    </div>
  );
};

export default EditCourse;
