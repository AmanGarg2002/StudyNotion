import React, { useState } from "react";
import { Chart, registerables } from "chart.js";
import { IoMdArrowRoundBack } from "react-icons/io";
import { PolarArea } from "react-chartjs-2";
import ProgressBar from "@ramonak/react-progress-bar";
import { getRandomColor } from "../../../../utils/color";

Chart.register(...registerables);

const StudentProgressChart = ({ clickedCourseData, setClickedCourseData }) => {
  const [selectedStudent, setSelectedStudent] = useState(null);

  const getRandomColors = (numColors, opacity) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const color = `rgba(${Math.floor(Math.random() * 256)},${Math.floor(
        Math.random() * 256
      )},${Math.floor(Math.random() * 256)},${opacity})`;
      colors.push(color);
    }
    return colors;
  };

  const progressPercentage =
    (selectedStudent?.completedVideosDataOfStudent /
    selectedStudent?.totalLectureAviable)*10

  const data = {
    labels: [
      "Completed Lectures",
      "Remaining Lectures",
      "Total Lectures",
      "Progress Percentage",
    ],
    datasets: [
      {
        label: "Lectures Progress",
        data: [
          selectedStudent?.completedVideosDataOfStudent,
          selectedStudent?.totalLectureAviable -
            selectedStudent?.completedVideosDataOfStudent,
          selectedStudent?.totalLectureAviable,
          progressPercentage,
        ],
        backgroundColor: getRandomColors(4, 0.8),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,

    maintainAspectRatio: false,
    scales: {
      r: {
        grid: {
          color: "rgba(255, 255, 255, 0.13)",
          circular: true,
        },
        beginAtZero: true,
        suggestedMax: selectedStudent?.totalLectureAviable,
      },
    },
  };

  const backHandler = () => {
    setClickedCourseData(null);
  };

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
  };

  const progressHandler = (student) => {
    const progressPercentage = (
      (student?.completedVideosDataOfStudent / student?.totalLectureAviable) *
      100
    ).toFixed(2);

    return `${progressPercentage}`;
  };

  return (
    <div className="w-full flex gap-y-5 flex-col">
      {selectedStudent ? (
        ""
      ) : (
        <div
          onClick={backHandler}
          className=" flex text-lg items-center gap-2 cursor-pointer text-richblack-50 transition-all duration-200 hover:text-richblack-100"
        >
          <IoMdArrowRoundBack />
          <span>Back</span>
        </div>
      )}

      <div className=" flex flex-col gap-3">
        <h2 className=" text-2xl font-semibold text-richblack-25 capitalize">
          {clickedCourseData.courseName.toLowerCase()}
        </h2>
        <div className="text-sm text-richblack-50 text-leftflex gap-1">
          <p className=" capitalize">
            {clickedCourseData.courseDescription.toLowerCase()}
          </p>
        </div>
        <p className="text-lg text-richblack-50  text-justify">
          <span className=" text-richblack-100">Total Students Enrolled:</span>{" "}
          {clickedCourseData.totalStudentsEnrolled}{" "}
          <span className=" text-sm text-richblack-100">(students)</span>
        </p>
        <p className="text-lg text-richblack-50  text-justify">
          <span className=" text-richblack-100">Total Amount Generated:</span>{" "}
          Rs. {clickedCourseData.totalAmountGenerated}{" "}
          <span className=" text-sm text-richblack-100">(income)</span>
        </p>
      </div>

      {selectedStudent ? (
        <div className=" w-full min-h-[550px]">
          {selectedStudent && (
            <div className=" w-full flex flex-col gap-y-5 h-[475px]">
              <div
                onClick={() => setSelectedStudent(null)}
                className=" flex text-lg items-center gap-2 cursor-pointer text-richblack-50 transition-all duration-200 hover:text-richblack-100"
              >
                <IoMdArrowRoundBack />
                <span>Back</span>
              </div>
              <h2 className=" text-2xl font-semibold text-richblack-50 capitalize underline">
                Progress Chart for {selectedStudent?.studentData?.firstName}{" "}
                {selectedStudent?.studentData?.lastName}
              </h2>
              <PolarArea data={data} options={options} />
            </div>
          )}
        </div>
      ) : (
        <div className=" w-full">
          <div className="flex lg:gap-8  items-center   justify-between flex-row rounded-t-lg p-4 bg-richblack-700 text-sm font-medium text-richblack-50 ">
            <p className=" items-center">Student Name</p>
            <p className="text-center  w-[30vw] sm:w-[200px] ">
              Student Progress
            </p>
          </div>
          {clickedCourseData.allStudentData.map((student, i, arr) => (
            <div
              key={i}
              onClick={() => handleStudentClick(student)}
              className={`${
                i === arr.length - 1 ? "rounded-b-lg" : ""
              }  cursor-pointer hover:bg-richblack-600 transition-all duration-200 `}
            >
              <div
                className={`border py-3 px-4 justify-between  flex  border-richblack-700 ${
                  i === arr.length - 1 ? " rounded-b-lg" : " rounded-none"
                } `}
              >
                <div className=" flex flex-col  sm:flex-row sm:items-center text-richblack-50 gap-2">
                  <div className="h-[30px] w-[30px] ">
                    <img
                      src={
                        student?.studentData?.image
                          ? student?.studentData?.image
                          : `https://api.dicebear.com/5.x/initials/svg?seed=${student?.studentData?.firstName} ${student?.studentData?.lastName}`
                      }
                      alt="StudentProfile"
                      loading="lazy"
                      className=" object-cover h-[30px] w-[30px] rounded-full"
                    />
                  </div>
                  <div className=" flex flex-col">
                    <p className=" capitalize text-base">
                      {student?.studentData?.firstName.toLowerCase()}{" "}
                      {student?.studentData?.lastName.toLowerCase()}
                    </p>
                    <p className=" text-xs"> {student?.studentData?.email}</p>
                  </div>
                </div>

                <div className="flex flex-col w-[30vw] sm:w-[200px] gap-2">
                  <p className=" text-xs font-semibold text-richblack-50">
                    Progress {progressHandler(student) || 0}%
                  </p>
                  <div className="">
                    <ProgressBar
                      completed={progressHandler(student) || 0}
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
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentProgressChart;
