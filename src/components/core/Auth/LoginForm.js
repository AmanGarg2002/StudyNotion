import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../services/operations/authApi";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formData;

  function changeHandler(event) {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }
  function submitHandler(event) {
    event.preventDefault();
    dispatch(login(email, password, navigate));
  }
  return (
    <div>
      <form
        action=""
        onSubmit={submitHandler}
        className="mt-[23px] flex flex-col gap-y-4"
      >
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

        <div className="relative">
          <div className="flex flex-col gap-[6px] w-full">
            <label
              htmlFor=""
              className="text-[0.875rem] leading-[1.375rem] text-richblack-5 "
            >
              Password <sup className=" text-pink-200">*</sup>
            </label>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={formData.password}
              onChange={changeHandler}
              placeholder="Enter password"
              className=" p-[12px] rounded-[8px] bg-richblack-800 shadow-[1px_1.5px_0px_0px_rgba(255,255,255,0.18)] focus:outline-none"
            />
          </div>
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

        <Link to="/forget-password">
          <div className=" text-xs font-normal text-blue-100 text-right -mt-2 cursor-pointer">
            Forget Password
          </div>
        </Link>

        <button
          type="submit"
          className="w-full text-richblack-900 flex justify-center items-center bg-yellow-50 rounded-[8px]
           p-3 font-semibold text-base mt-[20px] hover:bg-yellow-25 transition-all duration-200 shadow-[1px_1px_rgba(255,255,255,0.8)]
          "
        >
          Sign in
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
