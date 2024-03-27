import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  createSubSection,
  updateSubSection,
} from "../../../../../services/operations/courseDetailApi";
import { setCourse } from "../../../../../slices/courseSlice";
import { IoCloseSharp } from "react-icons/io5";
import Upload from "../Upload";
import IconBtn from "../../../../common/IconBtn";

const SubSectionModal = ({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);

  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData.title);
      setValue("lectureDesc", modalData.description);
      setValue("lectureVideo", modalData.videoUrl);
    }
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();

    if (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleEditSubSection = async () => {
    const currentValues = getValues();

    const formData = new FormData();

    formData.append("sectionId", modalData.sectionId);
    formData.append("subSectionId", modalData._id);

    if (currentValues.lectureTitle !== modalData.title) {
      formData.append("title", currentValues.lectureTitle);
    }

    if (currentValues.lectureDesc !== modalData.description) {
      formData.append("description", currentValues.lectureDesc);
    }

    if (
      currentValues.lectureVideo !== null &&
      currentValues.lectureVideo !== undefined &&
      currentValues.lectureVideo !== modalData.videoUrl
    ) {
      formData.append("videoFile", currentValues.lectureVideo); //check
    }

    setLoading(true);

    const result = await updateSubSection(formData, token);

    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData.sectionId ? result : section
      );
      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
    }
    setModalData(null);
    setLoading(false);
  };

  const onSubmit = async (data) => {
    if (view) {
      return;
    }

    if (edit) {
      if (!isFormUpdated()) {
        toast.error("No Changes Made To The Form");
      } else {
        handleEditSubSection();
      }
      return;
    }

    const formData = new FormData();
    formData.append("sectionId", modalData);
    formData.append("title", data.lectureTitle);
    formData.append("description", data.lectureDesc);
    formData.append("videoFile", data.lectureVideo);

    setLoading(true);

    const result = await createSubSection(formData, token);

    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData ? result : section
      );
      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
    }
    setModalData(null);
    setLoading(false);
  };

  return (
    <div className=" absolute w-full top-[2vh] lg:left-[20%] xl:left-0   pb-[300px]  z-[100] flex items-center justify-center transition-all duration-200 ease-out  ">
      {/* Backdrop */}
      <div className=" fixed inset-0 bg-richblack-400 backdrop-blur-sm bg-opacity-30 "></div>

      <div className=" w-[110%] absolute  lg:w-[665px] bg-richblack-800   flex flex-col  rounded-xl">
        <div className=" flex flex-row justify-between items-center py-4 px-6 bg-richblack-700 border-b-[2px] border-richblack-600  rounded-tr-xl rounded-tl-xl">
          <p className=" text-lg font-semibold text-white">
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
          </p>

          <button
            onClick={() => (!loading ? setModalData(null) : {})}
            className=" w-[24px] h-[24px] outline-none"
          >
            <IoCloseSharp className=" w-[24px] h-[24px] text-richblack-50" />
          </button>
        </div>

        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-[24px] p-8 "
        >
          <Upload
            name="lectureVideo"
            id="lectureVideo"
            label="Lecture Video"
            register={register}
            errors={errors}
            setValue={setValue}
            video="true"
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null}
          />

          <div className=" flex flex-col gap-[6px]">
            <label
              htmlFor="lectureTitle"
              className=" text-richblack-5 text-sm font-normal"
            >
              Lecture Title <sup className=" text-pink-200">*</sup>
            </label>
            <input
              type="text"
              id="lectureTitle"
              name="lectureTitle"
              placeholder="Enter Lecture Title"
              className="w-full p-3 rounded-[8px] bg-richblack-700 focus:outline-none text-richblack-25 shadow-[1px_1px_0px_0px_rgba(255,255,255,0.5)] "
              {...register("lectureTitle", { required: true })}
            />
            {errors.lectureTitle && (
              <span className=" text-yellow-25 text-sm font-normal">
                Lecture Title is Required
              </span>
            )}
          </div>

          <div className=" flex flex-col gap-[6px]">
            <label
              htmlFor="lectureDesc"
              className=" text-richblack-5 text-sm font-normal"
            >
              Lecture Description <sup className=" text-pink-200">*</sup>
            </label>
            <textarea
              name="lectureDesc"
              id="lectureDesc"
              cols="30"
              rows="4"
              placeholder="Enter Lecture Description"
              className="w-full p-3 rounded-[8px] bg-richblack-700 max-h-[150px] focus:outline-none text-richblack-25 shadow-[1px_1px_0px_0px_rgba(255,255,255,0.5)] "
              {...register("lectureDesc", { required: true })}
            ></textarea>
            {errors.lectureDesc && (
              <span className=" text-yellow-25 text-sm font-normal">
                Lecture Description is Required
              </span>
            )}
          </div>

          <div className=" flex items-center justify-end">
            {!view && (
              <IconBtn
                disabled={loading}
                text={loading ? "Loading" : edit ? "Save Changes" : "Save"}
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubSectionModal;
