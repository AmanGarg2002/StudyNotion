import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LuFileEdit } from "react-icons/lu";
import IconBtn from "../../common/IconBtn";

const formatDOB = (dob) => {
  const date = new Date(dob);
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return formattedDate;
};

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col text-richblack-5 gap-8  ">
      <h1 className=" text-3xl font-medium ">My Profile</h1>

      {/* Section-1 */}
      <div className="flex flex-col gap-6  w-[85%] justify-between items-center mx-auto p-6 border rounded-lg border-richblack-700 bg-richblack-800">
        <div className="flex-col  sm:flex sm:flex-row sm:justify-between w-full items-center mx-auto ">
          {/* left Part */}
          <div className="flex  justify-start gap-4 flex-row md:gap-6 items-center truncate">
            <img
              src={user?.image}
              alt={`profile-${user?.firstName}`}
              loading="lazy"
              className=" aspect-square w-[60px] md:w-[78px] rounded-full object-cover border border-richblack-700 "
            />

            <div className="flex flex-col w-full">
              <p className=" text-lg font-semibold text-richblack-5 capitalize">
                {user?.firstName.toLowerCase() +
                  " " +
                  user?.lastName.toLowerCase()}
              </p>

              <p className=" text-richblack-300 text-sm font-normal">
                {user?.email}
              </p>
            </div>
          </div>

          {/* Right Part */}
          <div className="h-[40px] flex justify-end items-center mt-2 sm:mt-0 sm:justify-center">
            <IconBtn
              text="Edit"
              onclick={() => {
                navigate("/dashboard/settings");
              }}
            >
              {/* icon */}
              <LuFileEdit />
            </IconBtn>
          </div>
        </div>
      </div>

      {/* Section -2 */}
      <div className="flex flex-col gap-6  w-[85%] justify-between items-center mx-auto p-6 border rounded-lg border-richblack-700 bg-richblack-800">
        <div className="flex flex-col sm:flex-row justify-between w-full">
          {/* Left Part */}
          <div className="flex flex-row gap-5">
            <h2 className="text-lg font-semibold text-richblack-5">About</h2>
          </div>

          {/* Right Part */}
          <div className="h-[40px] flex mt-2 sm:mt-0 items-center justify-end sm:justify-center">
            <IconBtn
              text="Edit"
              onclick={() => {
                navigate("/dashboard/settings");
              }}
            >
              {/* icon */}
              <LuFileEdit />
            </IconBtn>
          </div>
        </div>

        <div className="w-full flex flex-row items-center gap-2 ">
          <p className="  text-richblack-300 text-sm text-justify font-medium">
            {`${
              user?.additionalDetails?.about ??
              "Write something about yourself "
            }`}
          </p>
        </div>
      </div>

      {/* Section-3 */}
      <div className="flex flex-col gap-6  w-[85%] justify-between items-center mx-auto p-6 border rounded-lg border-richblack-700 bg-richblack-800">
        <div className="flex flex-col sm:flex-row justify-between w-full">
          {/* Left Part */}
          <div className="flex flex-row gap-5">
            <h2 className="text-lg font-semibold text-richblack-5">
              Personal Details
            </h2>
          </div>

          {/* Right Part */}
          <div className="h-[40px] flex items-center mt-2 sm:mt-0 justify-end sm:justify-center">
            <IconBtn
              text="Edit"
              onclick={() => {
                navigate("/dashboard/settings");
              }}
            >
              {/* icon */}
              <LuFileEdit />
            </IconBtn>
          </div>
        </div>

        <div className="w-full flex flex-col  md:flex-row items-start md:items-center gap-2 ">
          <div className="flex flex-col gap-[2px] md:w-[50%]">
            <p className=" text-richblack-600 text-sm font-normal">
              First Name
            </p>
            <p className=" capitalize text-richblack-5 text-sm font-medium">
              {user?.firstName.toLowerCase()}
            </p>
          </div>

          <div className="flex flex-col gap-[2px] md:w-[50%]">
            <p className=" text-richblack-600 text-sm font-normal">Last Name</p>
            <p className=" capitalize text-richblack-5 text-sm font-medium">
              {user?.lastName.toLowerCase()}
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row items-start md:items-center gap-2 ">
          <div className="flex flex-col gap-[2px] md:w-[50%]">
            <p className=" text-richblack-600 text-sm font-normal">Email</p>
            <p className="  text-richblack-5 text-sm font-medium">
              {user?.email}
            </p>
          </div>

          <div className="flex flex-col gap-[2px] md:w-[50%]">
            <p className=" text-richblack-600 text-sm font-normal">
              Phone Number
            </p>
            <p className=" capitalize text-richblack-5 text-sm font-medium">
              ({`${user?.additionalDetails?.countryCode ?? "N/A"}`}){" "}
              {`${
                user?.additionalDetails?.contactNumber ?? "Add a contact number"
              }`}
            </p>
          </div>
        </div>

        <div className="w-full flex flex-col items-start md:flex-row md:items-center gap-2 ">
          <div className="flex flex-col gap-[2px] md:w-[50%]">
            <p className=" text-richblack-600 text-sm font-normal">Gender</p>
            <p className="  text-richblack-5 text-sm font-medium">
              {`${
                user?.additionalDetails?.gender !== null
                  ? `${
                      user?.additionalDetails?.gender === undefined
                        ? "Add your gender"
                        : `${user?.additionalDetails?.gender}`
                    }`
                  : "Add your gender"
              }`}
            </p>
          </div>

          <div className="flex flex-col gap-[2px] md:w-[50%]">
            <p className=" text-richblack-600 text-sm font-normal">
              Date of Birth
            </p>
            <p className=" capitalize text-richblack-5 text-sm font-medium">
              {user?.additionalDetails?.dateOfBirth
                ? formatDOB(user.additionalDetails.dateOfBirth)
                : "Add your date of birth"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
