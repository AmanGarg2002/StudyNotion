import React from "react";

const stats = [
  { count: "5k", label: "Active Students" },
  { count: "10+", label: "Mentors" },
  { count: "200+", label: "Courses" },
  { count: "50+", label: "Awards" },
];
const StatsComponent = () => {
  return (
    <section className=" bg-richblack-700 py-[40px] px-[138px] items-center mx-auto text-center mb-4">
      <div className="flex flex-col gap-8 sm:flex-row justify-center w-11/12 max-w-maxContent mx-auto ">
        {stats.map((stat, index) => {
          return (
            <div
              className="w-full flex flex-col mx-auto justify-between items-center"
              key={index}
            >
              <div className="flex flex-col items-center gap-3 w-[100%]  ">
                <p className=" text-richblack-5 text-3xl font-bold">
                  {stat.count}
                </p>
                <p className=" text-richblack-500 text-base font-semibold">
                  {stat.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default StatsComponent;
