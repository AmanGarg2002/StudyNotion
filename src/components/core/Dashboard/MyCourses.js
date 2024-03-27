import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchInstructorCourses } from "../../../services/operations/courseDetailApi";
import IconBtn from "../../common/IconBtn";
import { FiPlusCircle } from "react-icons/fi";
import CourseGrid from "./InstructorCourses/CourseGrid";

const MyCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      const result = await fetchInstructorCourses(token);

      if (result) {
        setCourses(result);
      }
      setLoading(false);
    };
    fetchCourses();
  }, []);

  return (
    <div className=" relative flex flex-col text-richblack-5 gap-9  ">
      <div className=" flex flex-row justify-between">
        <h1 className=" text-3xl font-medium ">My Courses</h1>
        <IconBtn
          text="New"
          customClasses={" flex-row-reverse"}
          onclick={() => navigate("/dashboard/add-course")}
        >
          <FiPlusCircle className=" w-[18px] h-[18px] text-richblack-900 font-bold" />
        </IconBtn>
      </div>
      {loading ? (
        <div className=" spinner absolute left-[45%] top-[32vh]"></div>
      ) : (
        <>
          {courses && <CourseGrid courses={courses} setCourses={setCourses} />}
        </>
      )}
    </div>
  );
};

export default MyCourses;
