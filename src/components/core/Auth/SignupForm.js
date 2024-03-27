import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Tab from "./Tab";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import { useDispatch } from "react-redux";
import { setSignupData } from "../../../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { sendOtp } from "../../../services/operations/authApi";

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  function changeHandler(event) {
    const { name, type, value, checked } = event.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  function submitHandler(event) {
    event.preventDefault();
    if (formData.password !== formData.confirmpassword) {
      toast.error("Password does not match ");
      return;
    }

    const signupData = {
      ...formData,
      accountType,
    };

    console.log(signupData);
    dispatch(setSignupData(signupData));
    dispatch(sendOtp(signupData.email, navigate)); //check

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmpassword: "",
    });

    setAccountType(ACCOUNT_TYPE.STUDENT);
  }

  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ];

  return (
    <div>
      {/* Tab */}

      <Tab
        tabData={tabData}
        field={accountType}
        setField={setAccountType}
      ></Tab>

      {/* Form */}
      <form
        action=""
        onSubmit={submitHandler}
        className="mt-[23px] flex  flex-col gap-y-4 "
      >
        <div className="flex flex-col sm:flex-row gap-y-4 sm:gap-y-0 gap-x-4 justify-between">
          {/* First Name */}
          <div className="flex flex-col w-full sm:w-[48%] ">
            <label
              htmlFor=""
              className="text-[0.875rem] leading-[1.375rem] text-richblack-5"
            >
              First Name <sup className=" text-pink-200">*</sup>
            </label>
            <input
              required
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Enter first name"
              value={formData.firstName}
              onChange={changeHandler}
              className="p-[12px] rounded-[8px] bg-richblack-800  shadow-[1px_1.5px_0px_0px_rgba(255,255,255,0.18)] focus:outline-none"
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col w-full sm:w-[48%]">
            <label
              htmlFor=""
              className="text-[0.875rem] leading-[1.375rem] text-richblack-5"
            >
              Last Name <sup className=" text-pink-200">*</sup>
            </label>
            <input
              required
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Enter last name"
              value={formData.lastName}
              onChange={changeHandler}
              className="p-[12px] rounded-[8px] bg-richblack-800  shadow-[1px_1.5px_0px_0px_rgba(255,255,255,0.18)] focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-[6px] w-full">
          <label
            htmlFor=""
            className="text-[0.875rem] leading-[1.375rem] text-richblack-5"
          >
            Email Address <sup className=" text-pink-200">*</sup>
          </label>
          <input
            required
            type="email"
            name="email"
            id="email"
            placeholder="Enter email address"
            value={formData.email}
            onChange={changeHandler}
            className="p-[12px] rounded-[8px] bg-richblack-800  shadow-[1px_1.5px_0px_0px_rgba(255,255,255,0.18)] focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-y-4 sm:flex-row sm:gap-y-4 gap-x-4">
          {/* Password */}
          <div className="flex flex-col w-full   sm:w-[48%] relative">
            <label
              htmlFor=""
              className="text-[0.875rem] leading-[1.375rem] text-richblack-5 "
            >
              Create Password <sup className=" text-pink-200">*</sup>
            </label>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={changeHandler}
              className="p-[12px] rounded-[8px] bg-richblack-800  shadow-[1px_1.5px_0px_0px_rgba(255,255,255,0.18)] focus:outline-none"
            />
            <span
              className=" absolute right-4 bottom-[11px] cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword === true ? (
                <AiOutlineEye className="w-[24px] h-[24px]"></AiOutlineEye>
              ) : (
                <AiOutlineEyeInvisible className="w-[24px] h-[24px]"></AiOutlineEyeInvisible>
              )}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col w-full  sm:w-[48%] relative">
            <label
              htmlFor=""
              className="text-[0.875rem] leading-[1.375rem] text-richblack-5 "
            >
              Confirm Password <sup className=" text-pink-200">*</sup>
            </label>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmpassword"
              id="confirmpassword"
              placeholder="Confirm Password"
              value={formData.confirmpassword}
              onChange={changeHandler}
              className="p-[12px] rounded-[8px] bg-richblack-800  shadow-[1px_1.5px_0px_0px_rgba(255,255,255,0.18)] focus:outline-none"
            />
            <span
              className=" absolute right-4 bottom-[11px] cursor-pointer"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword === true ? (
                <AiOutlineEye className="w-[24px] h-[24px]"></AiOutlineEye>
              ) : (
                <AiOutlineEyeInvisible className="w-[24px] h-[24px]"></AiOutlineEyeInvisible>
              )}
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full text-richblack-900 flex justify-center items-center bg-yellow-50 rounded-[8px]
          p-3 font-semibold text-base mt-9 hover:bg-yellow-25 transition-all duration-200 shadow-[1px_1px_rgba(255,255,255,0.8)]
          "
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
