import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OtpInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import { TiArrowLeft } from "react-icons/ti";
import clock from "../assets/Images/ttimeclock.svg";
import { sendOtp } from "../services/operations/authApi";
import { signUp } from "../services/operations/authApi";

const VerifyEmail = ({ setProgress }) => {
  const { loading } = useSelector((state) => state.auth);
  const { signupData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  useEffect(() => {
    setProgress(15);

    if (!signupData) {
      navigate("/signup");
    }
    setTimeout(() => {
      setProgress(100);
    }, 800);
  }, []);

  function handleOnSubmit(event) {
    event.preventDefault();

    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmpassword,
    } = signupData;

    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmpassword,
        otp,
        navigate
      )
    );
  }

  return (
    <div className="w-11/12 max-w-maxContent flex flex-col items-center justify-center mx-auto  min-h-[calc(100vh-3.5rem)]">
      {loading ? (
        <div className="spinner absolute top-[45vh] left-[50vw] "></div>
      ) : (
        <div className="sm:w-[500px] w-[380px]  p-8 flex flex-col justify-center gap-9 ">
          <div className="gap-4 flex flex-col">
            <h1 className=" text-richblack-5 text-3xl font-semibold">
              Verify email
            </h1>

            <p className=" text-richblack-100  font-normal text-[1.125rem] leading-[1.625rem]">
              A verification code has been sent to you. Enter the code below
            </p>

            <form
              action=""
              onSubmit={handleOnSubmit}
              className="flex flex-col gap-9 w-full"
            >
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                containerStyle=" flex justify-between items-center"
                renderInput={(props) => (
                  <input
                    {...props}
                    placeholder="-"
                    style={{ width: "50px", textAlign: "center" }}
                    className=" bg-richblack-800 rounded-[8px]  focus:outline-yellow-25   text-richblack-5 shadow-[1px_1px_rgba(255,255,255,0.18)] outline-none  py-[12px]"
                  />
                )}
              ></OtpInput>

              <button
                type="submit"
                className="w-full text-richblack-900 flex justify-center items-center bg-yellow-50 rounded-[8px]
                p-3 font-semibold text-base  hover:bg-yellow-25 transition-all duration-200 shadow-[1px_1px_rgba(255,255,255,0.8)]"
              >
                Verify email
              </button>
            </form>

            <div className="flex flex-row justify-between items-center">
              <div className="flex gap-2 p-3 text-richblack-5 flex-row items-center">
                <Link to={"/login"} className="flex items-center gap-2 ">
                  <TiArrowLeft className="w-[18px] h-[18px]" />
                  <p>Back to Login</p>
                </Link>
              </div>
              <button
                className="flex flex-row gap-2 group cursor-pointer items-center"
                onClick={() => dispatch(sendOtp(signupData.email, navigate))}
              >
                <img
                  src={clock}
                  alt="TimeClockImage"
                  loading="lazy"
                  className=" cursor-pointer"
                />
                <p className=" text-blue-100 font-medium text-medium  cursor-pointer">
                  Resend it
                </p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
