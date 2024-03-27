import React, { useEffect, useState } from "react";
import { getInstructorData } from "../../../../services/operations/profileApi";
import { useSelector } from "react-redux";
import { fetchInstructorCourses } from "../../../../services/operations/courseDetailApi";
import { Link } from "react-router-dom";
import InstructorChart from "./InstructorChart";

const Instructor = () => {
  const [loading, setLoading] = useState(false);
  const [instructorData, setInstructorData] = useState(null);
  const [courses, setCourses] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  useEffect(() => {
    const getCourseDataWithStats = async () => {
      setLoading(true);
      const instructorApiData = await getInstructorData(token);

      const result = await fetchInstructorCourses(token);

      console.log("instructorApiData", instructorApiData);
      console.log("result", result);

      if (instructorApiData.length) {
        setInstructorData(instructorApiData);
      }
      if (result) {
        setCourses(result.sort(() => 0.5 - Math.random()));
      }
      setLoading(false);
    };
    getCourseDataWithStats();
  }, []);

  const totalAmount = instructorData?.reduce(
    (acc, curr) => acc + curr.totalAmountGenerated,
    0
  );

  const totalStudents = instructorData?.reduce(
    (acc, curr) => acc + curr.totalStudentsEnrolled,
    0
  );

  return (
    <div className=" relative flex flex-col min-h-[calc[100vh-3.5rem]]  text-richblack-5 gap-8">
      <div className=" space-y-2 mt-2">
        <h2 className=" text-2xl font-bold text-richblack-5">
          Hi {user?.firstName} 👋
        </h2>
        <p className=" font-medium text-richblack-200">
          Let's start something new
        </p>
      </div>

      {loading ? (
        <div className=" absolute spinner left-[50%] top-[40vh]"></div>
      ) : courses.length > 0 ? (
        <div className=" w-full flex flex-col gap-5 ">
          <div className="flex flex-col  xl:flex-row  space-y-5   xl:space-y-0 xl:space-x-4">
            {/* Render chart / graph */}
            {totalAmount > 0 || totalStudents > 0 ? (
              <div className=" w-full xl:w-[70%] min-h-[550px] ">
                <InstructorChart courses={instructorData}></InstructorChart>
              </div>
            ) : (
              <div className=" flex-1 rounded-md bg-richblack-800 p-6">
                <p className=" text-2xl font-bold text-richblack-5">
                  Visualize
                </p>
                <p className=" mt-4 text-xl font-medium text-richblack-50">
                  Not Enough Data To Visualize
                </p>
              </div>
            )}
            {/* Total Statistics */}
            <div className=" w-full xl:w-[30%]   flex flex-col rounded-md bg-richblack-800 p-6">
              <p className=" text-lg font-bold text-richblack-5">Statistics</p>

              <div className=" mt-4 space-y-4">
                <div>
                  <p className=" text-lg text-richblack-200">Total Courses</p>
                  <p className=" text-3xl  font-semibold text-richblack-50">
                    {courses.length}
                  </p>
                </div>

                <div>
                  <p className=" text-lg text-richblack-200">Total Students</p>
                  <p className=" text-3xl  font-semibold text-richblack-50">
                    {totalStudents}
                  </p>
                </div>

                <div>
                  <p className=" text-lg text-richblack-200">Total Income</p>
                  <p className=" text-3xl  font-semibold text-richblack-50">
                    Rs. {totalAmount}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className=" rounded-md bg-richblack-800 w-full p-6">
            <div className=" flex items-center justify-between">
              <p className=" text-lg font-bold text-richblack-5">
                Your Courses
              </p>
              <Link to={"/dashboard/my-courses"}>
                <p className=" text-xs font-semibold text-yellow-50 cursor-pointer">
                  View All
                </p>
              </Link>
            </div>

            <div className=" my-4 flex xl:flex-row flex-col items-center space-y-6 xl:space-y-0  xl:items-start xl:gap-x-4  ">
              {courses.slice(0, 3).map((course) => (
                <div
                  key={course?._id}
                  className=" xl:w-1/3 xl:border-none   xl:pb-0 border-richblack-600  pb-3 border-b w-full "
                >
                  <div className=" w-full flex flex-col items-center =">
                    <img
                      src={course?.thumbnail}
                      alt={course?.courseName}
                      loading="lazy"
                      className=" xl:h-[201px] w-full sm:w-9/12  h-[300px]  rounded-md xl:w-full object-center"
                    />
                  </div>

                  <div className=" mt-3 flex flex-col sm:items-center xl:items-start  w-full ">
                    <di className=" text-left text-sm font-medium text-richblack-50 ">
                      {course?.courseName}
                    </di>

                    <div className=" flex mt-1 items-center space-x-2">
                      <p className=" text-xs font-medium text-richblack-50">
                        {course.studentsEnrolled.length} students
                      </p>
                      <p className="text-xs font-medium text-richblack-300">
                        |
                      </p>
                      <p className="text-xs font-medium text-richblack-300">
                        Rs. {course?.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className=" mt-20  rounded-md bg-richblack-800 p-6 py-20">
          <p className=" text-center text-2xl font-bold text-richblack-5">
            You have not created any courses yet
          </p>
          <Link to={"/dashboard/add-course"}>
            <p className=" mt-1 text-lg text-center font-semibold text-yellow-50">
              Create a Course
            </p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Instructor;
