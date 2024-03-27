import React, { useState } from "react";
import { useForm } from "react-hook-form";
import IconBtn from "../../../../common/IconBtn";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { MdNavigateNext } from "react-icons/md";
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../slices/courseSlice";
import toast from "react-hot-toast";
import {
  createSection,
  updateSection,
} from "../../../../../services/operations/courseDetailApi";
import NestedView from "./NestedView";

const CourseBuilderForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [editSectionName, setEditSectionName] = useState(null);
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    let result;

    if (editSectionName) {
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        },
        token
      );
    } else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        },
        token
      );
    }

    if (result) {
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }
    setLoading(false);
  };

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  };

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  };

  const goToNext = () => {
    if (course.courseContent.length === 0) {
      toast.error("Please Add Atleast One Section");
      return;
    }
    if (
      course.courseContent.some((section) => section.subSection.length === 0)
    ) {
      toast.error("Please Add Atleast One Lecture In Each Section");
      return;
    }
    dispatch(setStep(3));
  };

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit();
      return;
    }

    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  };

  return (
    <div className=" p-6 flex flex-col rounded-[8px] border border-richblack-700 bg-richblack-800 gap-[26px] ">
      <h2 className=" text-richblack-5 font-medium text-2xl">Course Bulider</h2>

      <form
        action=""
        className=" flex flex-col gap-[26px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className=" flex flex-col gap-[6px]">
          <label
            htmlFor="sectionName"
            className=" text-richblack-5 text-sm font-normal"
          >
            Section Name <sup className=" text-pink-200">*</sup>
          </label>
          <input
            type="text"
            id="sectionName"
            name="sectionName"
            placeholder="Add a section to build your course"
            className="w-full p-3 rounded-[8px] bg-richblack-700 focus:outline-none text-richblack-25 shadow-[1px_1px_0px_0px_rgba(255,255,255,0.5)] "
            {...register("sectionName", { required: true })}
          />
          {errors.sectionName && (
            <span className=" text-yellow-25 text-sm font-normal">
              Section Name is Required
            </span>
          )}
        </div>
        <div className=" flex flex-row gap-4 items-end">
          <IconBtn
            type="Submit"
            outline="true"
            text={editSectionName ? "Edit Section Name" : "Create Section"}
          >
            <AiOutlinePlusCircle className=" w-[20px] h-[20px]" />
          </IconBtn>
          {editSectionName && (
            <button
              type="button"
              onClick={cancelEdit}
              className=" text-sm text-richblack-300 underline hover:text-richblack-200 transition-all duration-200"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {course?.courseContent?.length > 0 && ( //check karna hoga
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
      )}

      <div className=" flex flex-row  justify-end gap-3">
        <button
          onClick={goBack}
          className=" py-2 px-3 text-richblack-900   hover:bg-pure-greys-300 transition-all border-richblack-400 border hover:text-richblack-800 duration-200 font-semibold  rounded-md  bg-pure-greys-400"
        >
          Back
        </button>

        <IconBtn text="Next" onclick={goToNext}>
          <MdNavigateNext className=" font-extrabold" />
        </IconBtn>
      </div>
    </div>
  );
};

export default CourseBuilderForm;
