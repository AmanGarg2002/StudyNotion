import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import CountryCode from "../../../../data/countrycode.json";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../../../services/operations/SettingsApi";

const EditProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const genders = [
    "Male",
    "Female",
    "Non-Binary",
    "Prefer not to say",
    "Other",
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitProfileForm = async (data) => {
    console.log("DATA:", data);
    setLoading(true);
    try {
      await dispatch(updateProfile(token, data));
    } catch (error) {
      console.log("ERROR MESSAGE: ", error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-6  w-[85%] justify-between items-center mx-auto p-6 pb-0 border rounded-lg border-richblack-700 bg-richblack-800">
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-row gap-5">
          <h2 className="text-lg font-semibold text-richblack-5">
            Personal Details
          </h2>
        </div>
      </div>

      <div className="w-full relative min-h-[250px]">
        {loading ? (
          <div className="spinner absolute left-[50%] top-[35%]"></div>
        ) : (
          <form
            action=""
            onSubmit={handleSubmit(submitProfileForm)}
            className=" lg:p-8 flex flex-col pb-4 gap-6 lg:gap-6"
          >
            <div className="flex flex-col lg:flex-row justify-between gap-6 lg:gap-10">
              {/* First Name */}
              <div className="flex flex-col gap-[6px] w-full lg:w-[50%]">
                <label
                  htmlFor="firstname"
                  className=" text-richblack-5 text-sm font-normal"
                >
                  First Name
                </label>
                <input
                  className="w-full p-3 rounded-[8px] bg-richblack-700 capitalize focus:outline-none text-richblack-300 shadow-[1px_1px_0px_0px_rgba(255,255,255,0.5)] "
                  type="text"
                  name="firstname"
                  id="firstname"
                  placeholder="Enter first name"
                  {...register("firstname", { required: true })}
                  defaultValue={user?.firstName}
                />
                {errors.firstname && (
                  <span className=" text-yellow-25 text-sm font-normal">
                    Please enter your first name
                  </span>
                )}
              </div>

              {/* Last Name */}
              <div className="flex flex-col gap-[6px] w-full lg:w-[50%]">
                <label
                  htmlFor="lastname"
                  className=" text-richblack-5 text-sm font-normal"
                >
                  Last Name
                </label>
                <input
                  className="w-full p-3 rounded-[8px] capitalize bg-richblack-700 focus:outline-none text-richblack-300 shadow-[1px_1px_0px_0px_rgba(255,255,255,0.5)] "
                  type="text"
                  name="lastname"
                  id="lastname"
                  placeholder="Enter last name"
                  {...register("lastname")}
                  defaultValue={user?.lastName}
                />
                {errors.lastname && (
                  <span className=" text-yellow-25 text-sm font-normal">
                    Please enter your last name
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between gap-6 lg:gap-10">
              {/* Date Of Birth */}
              <div className="flex flex-col gap-[6px] w-full lg:w-[50%]">
                <label
                  htmlFor="dateOfBirth"
                  className=" text-richblack-5 text-sm font-normal"
                >
                  Date of Birth
                </label>

                <input
                  type="date"
                  name="dateOfBirth"
                  id="dateOfBirth"
                  className="w-full  p-3 rounded-[8px] bg-richblack-700    focus:outline-none text-richblack-300 shadow-[1px_1px_0px_0px_rgba(255,255,255,0.5)] "
                  {...register("dateOfBirth", {
                    required: {
                      value: true,
                      message: " Please enter your Date of Birth",
                    },
                    max: {
                      value: new Date().toISOString().split("T")[0],
                      message: "Please enter the valid Date of Birth",
                    },
                  })}
                />
                {errors.dateOfBirth && (
                  <span className=" text-yellow-25 text-sm font-normal">
                    {errors.dateOfBirth.message}
                  </span>
                )}
              </div>

              {/* Gender */}
              <div className="flex flex-col gap-[6px] w-full lg:w-[50%]">
                <label
                  htmlFor="gender"
                  className=" text-richblack-5 text-sm font-normal"
                >
                  Gender <sup className=" text-pink-200">*</sup>
                </label>

                <select
                  name="gender"
                  id="gender"
                  className="w-full   p-4 rounded-[8px] bg-richblack-700    focus:outline-none text-richblack-300 shadow-[1px_1px_0px_0px_rgba(255,255,255,0.5)] "
                  {...register("gender", { required: true })}
                >
                  {genders.map((element, index) => {
                    return (
                      <option key={index} value={element}>
                        {element}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row justify-between gap-6 lg:gap-10">
              <div className="flex flex-col lg:w-[50%] ">
                <div className="flex flex-col gap-[6px] w-full  ">
                  <label
                    htmlFor="contactNumber"
                    className=" text-richblack-5 text-sm font-normal"
                  >
                    Phone Number
                  </label>

                  <div className="flex flex-col  lg:flex-row lg:h-[50px] lg:items-center justify-center gap-6  lg:gap-[6px] w-full ">
                    {/* Country Code */}
                    <div className="flex flex-col gap-[6px]  w-full  lg:w-[45%] xl:w-[35%]">
                      {/* DropDown  */}
                      <div className="">
                        <select
                          className=" w-[100%] lg:w-[90%] px-[11px]  py-3 rounded-[8px] bg-richblack-700 focus:outline-none text-richblack-300 shadow-[1px_1px_0px_0px_rgba(255,255,255,0.5)] "
                          name="dropdown"
                          id="dropdown"
                          {...register("countrycode", { required: true })}
                        >
                          {CountryCode.map((element, index) => {
                            return (
                              <option
                                className=""
                                value={element.code}
                                key={index}
                              >
                                {element.code} - {element.country}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>

                    {/* PhoneNo input */}
                    <div className="flex flex-col gap-[6px] w-full justify-end ">
                      <input
                        type="number"
                        name="contactNumber"
                        id="contactNumber"
                        placeholder="12345 67890"
                        {...register("contactNumber", {
                          required: {
                            value: true,
                            message: "Please Enter Phone Number",
                          },
                          maxLength: {
                            value: 10,
                            message: "Invalid Phone Number",
                          },
                          minLength: {
                            value: 8,
                            message: "Invalid Phone Number",
                          },
                        })}
                        className=" appearance-none w-full px-3 py-[10px]  rounded-[8px] bg-richblack-700 focus:outline-none text-richblack-25 shadow-[1px_1px_0px_0px_rgba(255,255,255,0.5)] "
                      />
                    </div>
                  </div>
                  {errors.contactNumber && (
                    <span className=" text-yellow-25 text-sm font-normal">
                      {errors.contactNumber.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-[6px] w-full lg:w-[50%]">
                <label
                  htmlFor="about"
                  className=" text-richblack-5 text-sm font-normal"
                >
                  About
                </label>
                <input
                  className="w-full p-3 rounded-[8px] bg-richblack-700 focus:outline-none text-richblack-300 shadow-[1px_1px_0px_0px_rgba(255,255,255,0.5)] "
                  type="text"
                  name="about"
                  id="about"
                  placeholder="Enter Bio details"
                  {...register("about", { required: true })}
                  defaultValue={user?.additionalDetails?.about}
                />
                {errors.about && (
                  <span className=" text-yellow-25 text-sm font-normal">
                    Please enter your bio details
                  </span>
                )}
              </div>
            </div>

            {/* Button */}
            <div className="flex flex-row justify-end items-center gap-4">
              <button
                type="submit"
                className=" text-richblack-900 flex justify-center items-center bg-yellow-50 rounded-[8px]
              py-2 px-4 font-semibold text-base   hover:bg-yellow-25 transition-all duration-200 shadow-[1px_1px_rgba(255,255,255,0.8)]
            "
              >
                Save
              </button>

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
          </form>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
