import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useForm } from "react-hook-form";
import IconBtn from "../../../common/IconBtn";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../../../services/operations/SettingsApi";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewConfirmPassword, setShowNewConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const UpdatePasswordForm = async (data) => {
    setLoading(true);
    try {
      await dispatch(updatePassword(data, token));
    } catch (error) {
      console.log("ERROR MESSAGE: ", error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-6  w-[85%] justify-between items-center mx-auto p-6 pb-0 border rounded-lg border-richblack-700 bg-richblack-800">
      <div className="flex flex-col  w-full gap-5 ">
        <h2 className="text-lg font-semibold text-richblack-5">Password</h2>

        <div className="w-full relative min-h-[250px] ">
          {loading ? (
            <div className="spinner absolute left-[50%] top-[50%]"></div>
          ) : (
            <form
              action=""
              onSubmit={handleSubmit(UpdatePasswordForm)}
              className=" lg:p-8 pb-4 flex flex-col gap-6"
            >
              <div className=" flex flex-col lg:flex-row justify-between gap-6 lg:gap-10">
                <div className="flex flex-col gap-[6px] lg:w-[50%]">
                  <label
                    htmlFor="oldPassword"
                    className="text-[0.875rem] leading-[1.375rem] text-richblack-5"
                  >
                    Current Password <sup className=" text-pink-200">*</sup>
                  </label>

                  <div className=" relative">
                    <input
                      type={showOldPassword ? "text" : "password"}
                      name="oldPassword"
                      id="oldPassword"
                      className="  w-full p-3  rounded-[8px] bg-richblack-700 focus:outline-none text-richblack-300 shadow-[1px_1px_0px_0px_rgba(255,255,255,0.5)] "
                      {...register("oldPassword", { required: true })}
                      placeholder="************"
                    />

                    <span
                      className=" absolute  right-4 bottom-[11px] cursor-pointer"
                      onClick={() => {
                        setShowOldPassword((prev) => !prev);
                      }}
                    >
                      {showOldPassword === true ? (
                        <AiOutlineEye className="w-[24px] h-[24px] text-richblack-300"></AiOutlineEye>
                      ) : (
                        <AiOutlineEyeInvisible className="w-[24px] h-[24px] text-richblack-300"></AiOutlineEyeInvisible>
                      )}
                    </span>
                  </div>

                  {errors.oldPassword && (
                    <span className=" text-yellow-25 text-sm font-normal">
                      Please enter your old password
                    </span>
                  )}
                </div>
                <div className="  flex flex-col gap-[6px] lg:w-[50%]">
                  <label
                    htmlFor="newPassword"
                    className="text-[0.875rem] leading-[1.375rem] text-richblack-5"
                  >
                    New Password <sup className=" text-pink-200">*</sup>
                  </label>

                  <div className=" relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      name="newPassword"
                      id="newPassword"
                      className="  w-full p-3 rounded-[8px] bg-richblack-700 focus:outline-none text-richblack-300 shadow-[1px_1px_0px_0px_rgba(255,255,255,0.5)] "
                      {...register("newPassword", { required: true })}
                      placeholder="************"
                    />

                    <span
                      className=" absolute  right-4 bottom-[11px] cursor-pointer"
                      onClick={() => {
                        setShowNewPassword((prev) => !prev);
                      }}
                    >
                      {showNewPassword === true ? (
                        <AiOutlineEye className="w-[24px] h-[24px] text-richblack-300"></AiOutlineEye>
                      ) : (
                        <AiOutlineEyeInvisible className="w-[24px] h-[24px] text-richblack-300"></AiOutlineEyeInvisible>
                      )}
                    </span>
                  </div>

                  {errors.newPassword && (
                    <span className=" text-yellow-25 text-sm font-normal">
                      Please enter your new password
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col  lg:flex-row justify-between gap-6 lg:gap-10">
                <div className="  flex flex-col gap-[6px] lg:w-[47%]">
                  <label
                    htmlFor="confirmNewPassword"
                    className="text-[0.875rem] leading-[1.375rem] text-richblack-5"
                  >
                    Confirm New Password <sup className=" text-pink-200">*</sup>
                  </label>

                  <div className="relative">
                    <input
                      type={showNewConfirmPassword ? "text" : "password"}
                      name="confirmNewPassword"
                      id="confirmNewPassword"
                      className="  w-full p-3 rounded-[8px] bg-richblack-700 focus:outline-none text-richblack-300 shadow-[1px_1px_0px_0px_rgba(255,255,255,0.5)] "
                      {...register("confirmNewPassword", { required: true })}
                      placeholder="************"
                    />

                    <span
                      className=" absolute  right-4 bottom-[11px] cursor-pointer"
                      onClick={() => {
                        setShowNewConfirmPassword((prev) => !prev);
                      }}
                    >
                      {showNewConfirmPassword === true ? (
                        <AiOutlineEye className="w-[24px] h-[24px] text-richblack-300"></AiOutlineEye>
                      ) : (
                        <AiOutlineEyeInvisible className="w-[24px] h-[24px] text-richblack-300"></AiOutlineEyeInvisible>
                      )}
                    </span>
                  </div>

                  {errors.confirmNewPassword && (
                    <span className=" text-yellow-25 text-sm font-normal">
                      Please enter your confirm new password
                    </span>
                  )}
                </div>

                <div className="flex flex-row justify-end lg:items-end gap-4">
                  <IconBtn text="Update" type="submit" />
                  <button
                    type="submit"
                    className=" py-2 px-4 text-richblack-900   hover:bg-pure-greys-300 transition-all border-richblack-400 border hover:text-richblack-800 duration-200 font-semibold  rounded-md  bg-pure-greys-400"
                    onClick={() => {
                      navigate("/dashboard/my-profile");
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
