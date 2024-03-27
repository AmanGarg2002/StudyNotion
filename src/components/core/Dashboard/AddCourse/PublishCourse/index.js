import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { TiTick } from "react-icons/ti";
import { MdKeyboardArrowLeft } from "react-icons/md";
import IconBtn from "../../../../common/IconBtn";
import { resetCourseState, setStep } from "../../../../../slices/courseSlice";
import { COURSE_STATUS } from "../../../../../utils/constants";
import { useNavigate } from "react-router-dom";
import { editCourseDetails } from "../../../../../services/operations/courseDetailApi";

const PublishCourse = () => {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  const goBack = () => {
    dispatch(setStep(2));
  };

  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true);
      setIsChecked(true);
    } else {
      setValue("public", false);
      setIsChecked(false);
    }
  }, []);

  const handlerDraft = () => {
    console.log("CLICKED", course?.status);
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      if (!isChecked) {
        setValue("public", false);
        setIsChecked(false);
        handleCoursePublish();
      }
    }
    if (course?.status === COURSE_STATUS.DRAFT) {
      if (!isChecked) {
        handleCoursePublish();
      }
    }
  };

  const goToCourses = () => {
    dispatch(resetCourseState());
    navigate("/dashboard/my-courses");
  };

  const handleCoursePublish = async () => {
    //if form not updated
    if (
      (course?.status === COURSE_STATUS.PUBLISHED &&
        getValues("public") === true) ||
      (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
    ) {
      goToCourses();
      return;
    }

    //if form updated
    const formData = new FormData();
    formData.append("courseId", course._id);
    const courseStatus = getValues("public")
      ? COURSE_STATUS.PUBLISHED
      : COURSE_STATUS.DRAFT;
    formData.append("status", courseStatus);

    setLoading(true);

    const result = await editCourseDetails(formData, token);

    if (result) {
      goToCourses();
    }

    setLoading(false);
  };

  const onSubmit = () => {
    handleCoursePublish();
  };

  return (
    <div className=" p-6 flex flex-col rounded-[8px] border border-richblack-700 bg-richblack-800 gap-[26px]">
      <h2 className=" text-richblack-5 font-medium text-2xl">
        Publish Settings
      </h2>

      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className=" flex flex-col gap-[26px]"
      >
        <div className=" relative flex flex-row gap-[10px] items-center group">
          <input
            type="checkbox"
            name="public"
            id="public"
            {...register("public", { required: true })}
            onChange={(e) => setIsChecked(e.target.checked)}
            checked={isChecked}
            className={` appearance-none cursor-pointer w-[20px] h-[20px] text-richblack-500 border-[2px] rounded-md checked:bg-yellow-50 checked:border-black transition-all duration-200`}
          />

          {isChecked && (
            <TiTick
              className="  absolute text-black w-[20px] h-[20px] transition-all duration-200"
              onClick={() => {
                setIsChecked(false);
              }}
            />
          )}

          <label
            htmlFor="public"
            className=" text-richblack-400 text-base font-medium font-inter"
          >
            Make this Course Public
          </label>
        </div>

        <div className=" flex flex-col xl:flex-row justify-between gap-3">
          <button
            disabled={loading}
            onClick={goBack}
            className=" flex items-center w-fit gap-1 py-2 px-3 text-richblack-900   hover:bg-pure-greys-300 transition-all border-richblack-400 border hover:text-richblack-800 duration-200 font-semibold  rounded-md  bg-pure-greys-400"
          >
            <MdKeyboardArrowLeft />
            Back
          </button>

          <div className=" flex justify-end gap-4">
            <button
              disabled={isChecked}
              onClick={handlerDraft}
              className=" rounded-md py-2 px-4 text-richblack-5 bg-richblack-900 flex items-center
               gap-2  shadow-[1px_1px_0px_0px_rgba(255,255,255,0.18)]  transition-all  duration-200 font-semibold outline-none  
               "
            >
              Save As Draft
            </button>

            <IconBtn disabled={loading} text="Save and Publish"></IconBtn>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PublishCourse;
