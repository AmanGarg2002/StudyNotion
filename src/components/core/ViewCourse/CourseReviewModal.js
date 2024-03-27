import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoCloseSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import ReactStars from "react-stars";
import IconBtn from "../../common/IconBtn";
import { createRating } from "../../../services/operations/courseDetailApi";

const CourseReviewModal = ({ setReviewModal }) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { courseEntireData } = useSelector((state) => state.viewCourse);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("courseExperience", "");
    setValue("courseRating", 0);
  }, []);

  const ratingChanged = (newRating) => {
    setValue("courseRating", newRating);
  };
  const onSubmit = async (data) => {
    await createRating(
      {
        courseId: courseEntireData._id,
        rating: data.courseRating,
        review: data.courseExperience,
      },
      token
    );
    setReviewModal(false);
  };

  return (
    <div className=" absolute top-[40vh]  w-full z-[110]  flex items-center justify-center transition-all duration-200 ease-out ">
      <div className=" fixed  inset-0 bg-richblack-400 backdrop-blur-sm bg-opacity-30 "></div>
      <div className=" w-[75%] absolute    lg:w-[665px]  bg-richblack-800   flex flex-col   rounded-xl">
        {/* Modal Header */}
        <div className=" flex items-center justify-between  py-4 px-6 bg-richblack-700 border-b-[2px] border-richblack-25  rounded-tr-xl rounded-tl-xl ">
          <p className=" text-lg font-semibold text-white">Add Review</p>
          <button
            className=" w-[24px] h-[24px] outline-none"
            onClick={() => setReviewModal(false)}
          >
            <IoCloseSharp className=" w-[24px] h-[24px] text-richblack-50" />
          </button>
        </div>

        {/* Moodal Body */}
        <div className=" p-8 flex flex-col gap-6">
          <div className=" flex items-center gap-3 justify-center">
            <img
              src={user?.image}
              alt="ProfileImage"
              className=" rounded-full aspect-square h-[52px] w-[52px] object-cover"
            />
            <div className=" flex flex-col gap-[2px]">
              <p className=" text-richblack-5 text-base font-semibold capitalize">
                {user?.firstName} {user?.lastName}
              </p>
              <p className=" text-richblack-5 text-xs font-normal">
                Posting Publicly
              </p>
            </div>
          </div>

          <form
            action=""
            onSubmit={handleSubmit(onSubmit)}
            className=" flex flex-col gap-6"
          >
            <ReactStars
              count={5}
              size={30}
              onChange={ratingChanged}
              activeColor="#ffd700"
              className=" mx-auto"
            />

            <div className=" flex w-full flex-col gap-[6px]">
              <label
                htmlFor="courseExperience"
                className=" text-richblack-5 text-sm font-normal"
              >
                Add Your Experience <sup className=" text-pink-200">*</sup>
              </label>
              <textarea
                name="courseExperience"
                id="courseExperience"
                cols="30"
                rows="4"
                placeholder="Share Details of your own experience for this course"
                className="w-full p-3 rounded-[8px] bg-richblack-700 max-h-[150px] focus:outline-none text-richblack-25 shadow-[1px_1px_0px_0px_rgba(255,255,255,0.5)] "
                {...register("courseExperience", { required: true })}
              ></textarea>
              {errors.courseExperience && (
                <span className=" text-yellow-25 text-sm font-normal">
                  Course Experience is Required
                </span>
              )}
            </div>

            <div className=" flex flex-col sm:flex-row justify-end gap-5 items-center mt-4">
              <button
                onClick={() => setReviewModal(false)}
                className=" py-2 px-4 rounded-md bg-richblack-700 hover:bg-richblack-600 transition-all duration-200 text-richblack-5 text-base font-medium shadow-[1.5px_1.5px_0px_0px_rgba(255,255,255,0.18)]"
              >
                Cancel
              </button>

              <IconBtn text="Save Edits" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseReviewModal;
