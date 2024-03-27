import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/operations/authApi";
import { Link } from "react-router-dom";
import { TiArrowLeft } from "react-icons/ti";
import greenTick from "../assets/Images/check-circle.svg";

const UpdatePassword = ({ setProgress }) => {
  const { loading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setShowConfirmShowPassword] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const [isValidUuid, setIsValidUuid] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setProgress(48);
    const userIdentifier = location.pathname.split("/").pop();

    const uuidPattern =
      /^[a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i;
    setTimeout(() => {
      setProgress(100);
    }, 900);

    if (uuidPattern.test(userIdentifier)) {
      setIsValidUuid(true);
    } else {
      navigate("/login");
    }
  }, [location.pathname]);

  function handleOnChange(event) {
    setFormData((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  }

  const { password, confirmPassword } = formData;

  function handleOnSubmit(event) {
    event.preventDefault();
    const token = location.pathname.split("/").at(-1);
    dispatch(resetPassword(password, confirmPassword, token, navigate));
  }

  return (
    isValidUuid && (
      <div className="w-11/12 max-w-maxContent flex flex-col items-center justify-center mx-auto  min-h-[calc(100vh-3.5rem)]">
        {loading ? (
          <div className="spinner absolute top-[45vh] left-[50vw] "></div>
        ) : (
          <div className="sm:w-[500px] w-[380px] p-8 flex flex-col justify-center gap-9 ">
            <div className="gap-4 flex flex-col">
              <h1 className=" text-richblack-5 text-3xl font-semibold">
                Choose new Password
              </h1>

              <p className=" text-richblack-100  font-normal text-[1.125rem] leading-[1.625rem]">
                Almost done. Enter your new password and you are all set.
              </p>

              <form
                onSubmit={handleOnSubmit}
                action=""
                className="flex flex-col gap-9 w-full"
              >
                <div className="relative flex flex-col gap-[6px] w-full">
                  <label
                    htmlFor=""
                    className="text-[0.875rem] leading-[1.375rem] text-richblack-5"
                  >
                    New Password <sup className=" text-pink-200">*</sup>
                  </label>
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleOnChange}
                    placeholder="********"
                    className="p-[12px]  text-richblack-5 rounded-[8px] bg-richblack-800  shadow-[1px_1.5px_0px_0px_rgba(255,255,255,0.18)] focus:outline-none"
                  />
                  <span
                    className=" absolute right-4 bottom-[11px] cursor-pointer text-richblack-200"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword === true ? (
                      <AiOutlineEye className="w-[24px] h-[24px]"></AiOutlineEye>
                    ) : (
                      <AiOutlineEyeInvisible className="w-[24px] h-[24px]"></AiOutlineEyeInvisible>
                    )}
                  </span>
                </div>

                <div className="relative flex flex-col gap-[6px] w-full -mt-[20px]">
                  <label
                    htmlFor=""
                    className="text-[0.875rem] leading-[1.375rem] text-richblack-5"
                  >
                    Confirm New Password <sup className=" text-pink-200">*</sup>
                  </label>
                  <input
                    required
                    type={showconfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    id="confirmPassword"
                    onChange={handleOnChange}
                    value={formData.confirmPassword}
                    placeholder="********"
                    className="p-[12px]  text-richblack-5 rounded-[8px] bg-richblack-800  shadow-[1px_1.5px_0px_0px_rgba(255,255,255,0.18)] focus:outline-none"
                  />
                  <span
                    className=" absolute right-4 bottom-[11px] cursor-pointer text-richblack-200"
                    onClick={() => setShowConfirmShowPassword((prev) => !prev)}
                  >
                    {showconfirmPassword === true ? (
                      <AiOutlineEye className="w-[24px] h-[24px]"></AiOutlineEye>
                    ) : (
                      <AiOutlineEyeInvisible className="w-[24px] h-[24px]"></AiOutlineEyeInvisible>
                    )}
                  </span>
                </div>

                <div className="w-full -mt-[12px] -mb-[12px] flex flex-row justify-between">
                  <div className="flex flex-col gap-2 w-[45%] ">
                    <div className="flex gap-[6px] items-center justify-start">
                      <img
                        src={greenTick}
                        alt="greenTickImage"
                        className=" w-[16px] h-[16px]"
                      />
                      <p className=" text-xs text-caribbeangreen-300 font-normal">
                        one lowercase character
                      </p>
                    </div>

                    <div className="flex gap-[6px] items-center justify-start">
                      <img
                        src={greenTick}
                        alt="greenTickImage"
                        className=" w-[16px] h-[16px]"
                      />
                      <p className=" text-xs text-caribbeangreen-300 font-normal">
                        one uppercase character
                      </p>
                    </div>

                    <div className="flex gap-[6px] items-center justify-start">
                      <img
                        src={greenTick}
                        alt="greenTickImage"
                        className=" w-[16px] h-[16px]"
                      />
                      <p className=" text-xs text-caribbeangreen-300 font-normal">
                        one number
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 w-[45%] ">
                    <div className="flex gap-[6px] items-center justify-start">
                      <img
                        src={greenTick}
                        alt="greenTickImage"
                        className=" w-[16px] h-[16px]"
                      />
                      <p className=" text-xs text-caribbeangreen-300 font-normal">
                        one special character
                      </p>
                    </div>

                    <div className="flex gap-[6px] items-center justify-start">
                      <img
                        src={greenTick}
                        alt="greenTickImage"
                        className=" w-[16px] h-[16px]"
                      />
                      <p className=" text-xs text-caribbeangreen-300 font-normal">
                        8 character minimum
                      </p>
                    </div>
                    <div className="flex gap-[6px] items-center justify-start">
                      <img
                        src={greenTick}
                        alt="greenTickImage"
                        className=" w-[16px] h-[16px]"
                      />
                      <p className=" text-xs text-caribbeangreen-300 font-normal">
                        mix character
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full text-richblack-900 flex justify-center items-center bg-yellow-50 rounded-[8px]
                p-3 font-semibold text-base  hover:bg-yellow-25 transition-all duration-200 shadow-[1px_1px_rgba(255,255,255,0.8)]"
                >
                  Reset Password
                </button>
              </form>
            </div>

            <div className="flex gap-2 p-3 text-richblack-5 flex-row items-center -mt-[30px]">
              <Link to={"/login"} className="flex items-center gap-2 ">
                <TiArrowLeft className="w-[18px] h-[18px]" />
                <p>Back to Login</p>
              </Link>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default UpdatePassword;
