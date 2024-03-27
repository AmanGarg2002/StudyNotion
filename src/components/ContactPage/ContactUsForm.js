import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CountryCode from "../../data/countrycode.json";
import { useDispatch } from "react-redux";
import { contactUsMail } from "../../services/operations/authApi";

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const submitContactForm = async (data) => {
    try {
      setLoading(true);
      await dispatch(contactUsMail(data));
      setLoading(false);
    } catch (error) {
      console.log("ERROR:", error);
      setLoading(false);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        firstname: "",
        lastname: "",
        email: "",
        phoneNo: "",
        message: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <div className=" relative min-h-[200px]">
      {loading ? (
        <div className="spinner absolute left-[50%] top-[50%]"></div>
      ) : (
        <form
          action=""
          onSubmit={handleSubmit(submitContactForm)}
          className=" p-8 flex flex-col gap-6"
        >
          <div className="flex flex-col sm:flex-row justify-between gap-10">
            {/* First Name */}
            <div className="flex flex-col gap-[6px] w-full sm:w-[50%]">
              <label
                htmlFor="firstname"
                className=" text-richblack-5 text-sm font-normal"
              >
                First Name
              </label>
              <input
                className="w-full p-3 rounded-[8px] bg-richblack-700 focus:outline-none text-richblack-25 shadow-[1px_1px_0px_0px_rgba(255,255,255,0.5)] "
                type="text"
                name="firstname"
                id="firstname"
                placeholder="Enter first name"
                {...register("firstname", { required: true })}
              />
              {errors.firstname && (
                <span className=" text-yellow-25 text-sm font-normal">
                  Please enter your first name
                </span>
              )}
            </div>

            {/* Last Name */}
            <div className="flex flex-col gap-[6px] w-full sm:w-[50%]">
              <label
                htmlFor="lastname"
                className=" text-richblack-5 text-sm font-normal"
              >
                Last Name
              </label>
              <input
                className="w-full p-3 rounded-[8px] bg-richblack-700 focus:outline-none text-richblack-25 shadow-[1px_1px_0px_0px_rgba(255,255,255,0.5)] "
                type="text"
                name="lastname"
                id="lastname"
                placeholder="Enter last name"
                {...register("lastname")}
              />
            </div>
          </div>

          {/* Email  */}
          <div>
            <div className="flex flex-col gap-[6px] ">
              <label
                htmlFor="email"
                className=" text-richblack-5 text-sm font-normal"
              >
                Email Address
              </label>
              <input
                className="w-full p-3 rounded-[8px] bg-richblack-700 focus:outline-none text-richblack-25 shadow-[1px_1px_0px_0px_rgba(255,255,255,0.5)] "
                type="email"
                name="email"
                id="email"
                placeholder="Enter email address"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className=" text-yellow-25 text-sm font-normal">
                  Please enter your email
                </span>
              )}
            </div>
          </div>

          {/* Phone No */}

          <div className="flex flex-col sm:flex-row  gap-6">
            {/* Country Code */}
            <div className="flex flex-col gap-[6px] w-full sm:w-[25%] md:w-[25%] lg:w-[35%] xl:w-[35%]">
              <label
                htmlFor="phonenumber"
                className=" text-richblack-5 text-sm font-normal"
              >
                Phone Number
              </label>

              {/* DropDown  */}
              <div className="">
                <select
                  className=" w-full sm:w-[90%] px-[10px]  py-3 rounded-[8px] bg-richblack-700 focus:outline-none text-richblack-25 shadow-[1px_1px_0px_0px_rgba(255,255,255,0.5)] "
                  name="dropdown"
                  id="dropdown"
                  {...register("countrycode", { required: true })}
                >
                  {CountryCode.map((element, index) => {
                    return (
                      <option className="" value={element.code} key={index}>
                        {element.code} - {element.country}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            {/* PhoneNo input */}
            <div className="flex flex-col gap-[6px] w-full justify-end">
              <input
                type="number"
                name="phonenumber"
                id="phonenumber"
                placeholder="12345 67890"
                {...register("phoneNo", {
                  required: {
                    value: true,
                    message: "Please Enter Phone Number",
                  },
                  maxLength: { value: 10, message: "Invalid Phone Number" },
                  minLength: { value: 8, message: "Invalid Phone Number" },
                })}
                className=" appearance-none w-full px-3 py-[10px]  rounded-[8px] bg-richblack-700 focus:outline-none text-richblack-25 shadow-[1px_1px_0px_0px_rgba(255,255,255,0.5)] "
              />
            </div>
          </div>
          {errors.phoneNo && (
            <span className="-mt-[18px] text-yellow-25 text-sm font-normal">
              {errors.phoneNo.message}
            </span>
          )}

          {/* message */}
          <div>
            <div className="flex flex-col gap-[6px]">
              <label
                htmlFor="message"
                className=" text-richblack-5 text-sm font-normal"
              >
                Message
              </label>

              <textarea
                className="w-full p-3 rounded-[8px] bg-richblack-700 focus:outline-none text-richblack-25 shadow-[1px_1px_0px_0px_rgba(255,255,255,0.5)] "
                name="message"
                id="message"
                cols="30"
                rows="7"
                placeholder="Enter your message here"
                {...register("message", { required: true })}
              ></textarea>
              {errors.message && (
                <span className=" text-yellow-25 text-sm font-normal">
                  Please enter your message.
                </span>
              )}
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full text-richblack-900 flex justify-center items-center bg-yellow-50 rounded-[8px]
          p-3 font-semibold text-base mt-3  hover:bg-yellow-25 transition-all duration-200 shadow-[1px_1px_rgba(255,255,255,0.8)]
          "
          >
            Send Message
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactUsForm;
