import React from "react";

const Tab = ({ tabData, field, setField }) => {
  return (
    <div
      className="flex items-center py-[4px] justify-between rounded-full bg-richblack-800 text-center
      shadow-[1px_1.5px_0px_0px_rgba(255,255,255,0.18)]
      w-[200px] mt-[10px] px-[3px] "
    >
      {tabData.map((tab, id) => (
        <button
          key={id}
          onClick={() => setField(tab.type)}
          className={`${
            field === tab.type
              ? "  bg-richblack-900 text-richblack-5 "
              : " bg-transparent text-richblack-200"
          }
          py-[6px] px-[10px] w-[90px]  duration-200 rounded-full text-center`}
        >
          <p
            className="text-base
           
          "
          >
            {tab.tabName}
          </p>
        </button>
      ))}
    </div>
  );
};

export default Tab;
