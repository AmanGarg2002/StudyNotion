import React, { useState } from "react";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";
import StudentProgressChart from "./StudentProgressChart";

Chart.register(...registerables);

const InstructorChart = ({ courses }) => {
  const [currChart, setCurrChart] = useState("students");
  const [clickedCourseData, setClickedCourseData] = useState(null);

  const getRandomColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const color = `rgba(${Math.floor(Math.random() * 256)},${Math.floor(
        Math.random() * 256
      )},${Math.floor(Math.random() * 256)})`;
      colors.push(color);
    }
    return colors;
  };

  const chartDataForStudents = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalStudentsEnrolled),
        backgroundColor: getRandomColors(courses.length),
      },
    ],
  };

  const chartDataForIncome = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalAmountGenerated),
        backgroundColor: getRandomColors(courses.length),
      },
    ],
  };

  const handleSegmentClick = (event, chartElements) => {
    if (chartElements && chartElements.length > 0) {
      const clickedElementIndex = chartElements[0].index;
      const clickedCourse = courses[clickedElementIndex];
      console.log("Clicked course:", clickedCourse);
      setClickedCourseData(clickedCourse);
    }
  };

  const options = {
    maintainAspectRatio: false,
    onClick: handleSegmentClick,
  };

  return (
    <div className="flex  flex-col gap-y-10 rounded-md bg-richblack-800 p-6">
      <p className=" text-lg font-bold text-richblack-5">Visualize</p>
      <div className=" space-x-4 font-semibold">
        <button
          onClick={() => {
            setCurrChart("students");
          }}
          className={` rounded-sm p-1 px-3  transition-all duration-200 ${
            currChart === "students"
              ? " bg-richblack-700 text-yellow-50"
              : " text-yellow-400"
          }`}
        >
          Students
        </button>
        <button
          className={` rounded-sm p-1 px-3  transition-all duration-200 ${
            currChart === "income"
              ? " bg-richblack-700 text-yellow-50"
              : " text-yellow-400"
          }`}
          onClick={() => setCurrChart("income")}
        >
          Income
        </button>
      </div>
      <div className=" w-full  min-h-[550px]">
        {clickedCourseData && currChart !== "income" ? (
          <div className=" w-full">
            <StudentProgressChart
              clickedCourseData={clickedCourseData}
              setClickedCourseData={setClickedCourseData}
            />
          </div>
        ) : (
          <Pie
            data={
              currChart === "students"
                ? chartDataForStudents
                : chartDataForIncome
            }
            options={options}
          />
        )}
      </div>
    </div>
  );
};

export default InstructorChart;
