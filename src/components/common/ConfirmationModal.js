import React from "react";
import IconBtn from "./IconBtn";

const ConfirmationModal = ({ modalData }) => {
  return (
    <div className=" z-[100] fixed top-0 left-0 w-full h-full flex items-center justify-center transition-all duration-200 ease-out">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-richblack-400 backdrop-blur-sm   bg-opacity-30 "></div>

      {/* Modal */}
      <div className=" flex flex-col absolute  translate(-50%, -50%) bg-richblack-900 border rounded-xl border-richblack-500 text-richblack-5 py-6 px-6 ">
        <div className="flex flex-col gap-2 ">
          <p className=" text-2xl text-richblack-50 font-bold">
            {modalData.text1}
          </p>
          <p className=" text-base font-medium text-richblack-400">
            {modalData.text2}
          </p>

          <div className="flex flex-row gap-4 mt-1">
            <IconBtn
              onclick={modalData?.btn1Handler}
              text={modalData?.btn1Text}
            />

            <button
              onClick={modalData?.btn2Handler}
              className=" py-2 px-3 text-richblack-900   hover:bg-pure-greys-300 transition-all border-richblack-400 border hover:text-richblack-800 duration-200 font-semibold  rounded-md  bg-pure-greys-400"
            >
              {modalData?.btn2Text}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
