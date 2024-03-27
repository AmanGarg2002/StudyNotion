import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { TiArrowLeft } from "react-icons/ti";
import { setProtectRoute } from "../slices/authSlice";

const ResetComplete = ({ setProgress }) => {
  const { loading, protectRoute } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    setProgress(10);
    if (!protectRoute) {
      navigate("/login");
    }

    setTimeout(() => {
      setProgress(100);
    }, 1000);
  }, []);

  function changeHandler() {
    setProtectRoute(false);
  }

  return (
    <div className="w-11/12 max-w-maxContent flex flex-col items-center justify-center mx-auto  min-h-[calc(100vh-3.5rem)]">
      {loading ? (
        <div className="spinner  absolute top-[45vh] left-[50vw]"></div>
      ) : (
        <div className="sm:w-[500px] w-[375px] p-8 flex flex-col justify-center gap-9 ">
          <div className="gap-4 flex flex-col">
            <h1 className=" text-richblack-5 text-3xl font-semibold">
              Reset complete!
            </h1>
            <p className=" text-richblack-100  font-normal text-[1.125rem] leading-[1.625rem]">
              All done! We have sent an email to confirm
            </p>
            <Link to={"/login"} onClick={changeHandler}>
              <button
                type="submit"
                className="w-full text-richblack-900 flex justify-center items-center bg-yellow-50 rounded-[8px]
                p-3 font-semibold text-base  hover:bg-yellow-25 transition-all duration-200 shadow-[1px_1px_rgba(255,255,255,0.8)]"
              >
                Return to login
              </button>
            </Link>
            <div className="flex gap-2 p-3 text-richblack-5 flex-row items-center ">
              <Link
                to={"/login"}
                className="flex items-center gap-2 "
                onClick={changeHandler}
              >
                <TiArrowLeft className="w-[18px] h-[18px]" />
                <p>Back to Login</p>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetComplete;
