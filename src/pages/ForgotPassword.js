import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TiArrowLeft } from "react-icons/ti";
import { getPasswordResetToken } from "../services/operations/authApi";
import { useEffect } from "react";

const ForgotPassword = ({ setProgress }) => {
  useEffect(() => {
    setProgress(75);

    setTimeout(() => {
      setProgress(100);
    }, 1000);
  }, []);

  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const { loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleOnSubmit = (event) => {
    event.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
  };

  return (
    <div className="w-11/12 max-w-maxContent flex flex-col items-center justify-center mx-auto  min-h-[calc(100vh-3.5rem)]">
      {loading ? (
        <div className="spinner absolute top-[45vh] left-[50vw] "></div>
      ) : (
        <div className="sm:w-[500px] w-[375px] p-8 flex flex-col justify-center gap-9 ">
          <div className="gap-4 flex flex-col">
            <h1 className=" text-richblack-5 text-3xl font-semibold">
              {emailSent ? "Check email " : "Reset Your Password"}
            </h1>
            <p className=" text-richblack-100  font-normal text-[1.125rem] leading-[1.625rem]">
              {emailSent ? (
                <span>
                  We have sent the reset email to<br></br>
                  {email}
                </span>
              ) : (
                "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
              )}
            </p>
          </div>

          <form
            onSubmit={handleOnSubmit}
            action=""
            className="flex flex-col gap-9 w-full"
          >
            {!emailSent && (
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="p-[12px]  text-richblack-5 rounded-[8px] bg-richblack-800  shadow-[1px_1.5px_0px_0px_rgba(255,255,255,0.18)] focus:outline-none"
                />
              </div>
            )}
            <button
              type="submit"
              className="w-full text-richblack-900 flex justify-center items-center bg-yellow-50 rounded-[8px]
              p-3 font-semibold text-base  hover:bg-yellow-25 transition-all duration-200 shadow-[1px_1px_rgba(255,255,255,0.8)]
                "
            >
              {emailSent ? "Resend Email" : "Reset Password"}
            </button>
          </form>
          <div className="flex gap-2 p-3 text-richblack-5 flex-row items-center -mt-[30px]">
            <Link to={"/login"} className="flex items-center gap-2 ">
              <TiArrowLeft className="w-[18px] h-[18px]" />
              <p>Back to Login</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
