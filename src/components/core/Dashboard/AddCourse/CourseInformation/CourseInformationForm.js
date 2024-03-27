import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseCategories } from "../../../../../services/operations/courseDetailApi";
import { HiOutlineCurrencyRupee } from "react-icons/hi2";
import ChipInput from "./ChipInput";
import Upload from "../Upload";
import RequirementField from "./RequirementField";
import { setCourse, setStep } from "../../../../../slices/courseSlice";
import { MdNavigateNext } from "react-icons/md";
import IconBtn from "../../../../common/IconBtn";
import toast from "react-hot-toast";
import { COURSE_STATUS } from "../../../../../utils/constants";
import { addCourseDetails } from "../../../../../services/operations/courseDetailApi";
import { editCourseDetails } from "../../../../../services/operations/courseDetailApi";

const CourseInformationForm = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);

      const categories = await fetchCourseCategories();

      if (categories.length > 0) {
        setCourseCategories(categories);
      }
      setLoading(false);
    };

    if (editCourse) {
      console.log("EDIT KARNE AAYA HU CHECK KAR RAHA HU:", course);

      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenifits", course.whatYouWillLearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirments", course.instructions);
      setValue("courseImage", course.thumbnail);
    }

    getCategories();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const isFormUpdated = () => {
    const currentValues = getValues();
    console.log("changes after editing form values:", currentValues);
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenifits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseRequirments.toString() !==
        course.instructions.toString() ||
      currentValues.courseImage !== course.thumbnail
    ) {
      return true;
    } else {
      return false;
    }
  };

  const onSubmit = async (data) => {
    if (editCourse) {
      const currentValues = getValues();
      console.log("changes after editing form values:", currentValues);
      console.log("now course:", course);
      console.log("Has Form Changed:", isFormUpdated());
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();

        formData.append("courseId", course._id);

        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle);
        }

        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc);
        }

        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice);
        }

        if (currentValues.courseTags.toString() !== course.tag.toString()) {
          formData.append("tag", JSON.stringify(data.courseTags));
        }

        if (currentValues.courseBenifits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenifits);
        }

        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory);
        }

        if (
          currentValues.courseRequirments.toString() !==
          course.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirments)
          );
        }

        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnailImage", data.courseImage);
        }

        setLoading(true);
        const result = await editCourseDetails(formData, token);
        console.log("EDIT HONE KI API KE BAAD VALA:", result);

        if (result) {
          dispatch(setStep(2));
          dispatch(setCourse(result));
        }
        setLoading(false);
      } else {
        toast.error("No change made to the form details");
      }
      return;
    }

    //create new course
    const formData = new FormData();

    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseShortDesc);
    formData.append("price", data.coursePrice);
    formData.append("tag", JSON.stringify(data.courseTags));
    formData.append("whatYouWillLearn", data.courseBenifits);
    formData.append("category", data.courseCategory);
    formData.append("instructions", JSON.stringify(data.courseRequirments));
    formData.append("thumbnailImage", data.courseImage);
    formData.append("status", COURSE_STATUS.DRAFT);
    console.log("printing the data", data);
    console.log("printing the form function  data", formData);

    setLoading(true);
    const result = await addCourseDetails(formData, token);
    console.log("RESULT AA RAHA HAI:", result);
    if (result) {
      dispatch(setStep(2));
      dispatch(setCourse(result));
    }
    setLoading(false);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        action=""
        className=" p-6 flex flex-col rounded-[8px] border border-richblack-700 bg-richblack-800 gap-[26px] "
      >
        <div className=" flex flex-col gap-[6px]">
          <label
            htmlFor="courseTitle"
            className=" text-richblack-5 text-sm font-normal"
          >
            Course Title <sup className=" text-pink-200">*</sup>
          </label>
          <input
            type="text"
            id="courseTitle"
            name="courseTitle"
            placeholder="Enter Course Title"
            className="w-full p-3 rounded-[8px] bg-richblack-700 focus:outline-none text-richblack-25 shadow-[1px_1px_0px_0px_rgba(255,255,255,0.5)] "
            {...register("courseTitle", { required: true })}
          />
          {errors.courseTitle && (
            <span className=" text-yellow-25 text-sm font-normal">
              Course Title is Required
            </span>
          )}
        </div>

        <div className=" flex flex-col gap-[6px]">
          <label
            htmlFor="courseShortDesc"
            className=" text-richblack-5 text-sm font-normal"
          >
            Course Short Description <sup className=" text-pink-200">*</sup>
          </label>
          <textarea
            name="courseShortDesc"
            id="courseShortDesc"
            cols="30"
            rows="4"
            placeholder="Enter Description"
            className="w-full p-3 rounded-[8px] bg-richblack-700 focus:outline-none text-richblack-25 shadow-[1px_1px_0px_0px_rgba(255,255,255,0.5)] "
            {...register("courseShortDesc", { required: true })}
          ></textarea>
          {errors.courseShortDesc && (
            <span className=" text-yellow-25 text-sm font-normal">
              Course Description is Required
            </span>
          )}
        </div>

        <div className=" flex flex-col gap-[6px]">
          <label
            htmlFor="coursePrice"
            className=" text-richblack-5 text-sm font-normal"
          >
            Price <sup className=" text-pink-200">*</sup>
          </label>
          <div className="relative">
            <input
              type="text"
              id="coursePrice"
              name="coursePrice"
              placeholder="Enter Price"
              className="w-full p-3 px-[45px] rounded-[8px] bg-richblack-700 focus:outline-none text-richblack-25 shadow-[1px_1px_0px_0px_rgba(255,255,255,0.5)] "
              {...register("coursePrice", {
                required: {
                  value: true,
                  message: " Course Price is Required",
                },
                valueAsNumber: true,
                pattern: {
                  value: /^[0-9]+(\.[0-9]{1,2})?$/,
                  message: "Invalid price format",
                },
              })}
            />
            <HiOutlineCurrencyRupee className="  absolute top-[12px] left-[10px] w-[22px] h-[22px]  text-richblack-500" />
          </div>
          {errors.coursePrice && (
            <span className=" text-yellow-25 text-sm font-normal">
              {errors.coursePrice.message}
            </span>
          )}
        </div>

        <div className=" flex flex-col gap-[6px]">
          <label
            htmlFor="courseCategory"
            className=" text-richblack-5 text-sm font-normal"
          >
            Category <sup className=" text-pink-200">*</sup>
          </label>

          <select
            name="courseCategory"
            id="courseCategory"
            className="w-full cursor-pointer p-4  rounded-[8px] capitalize bg-richblack-700 focus:outline-none text-richblack-25 shadow-[1px_1px_0px_0px_rgba(255,255,255,0.5)] "
            {...register("courseCategory", { required: true })}
          >
            <option value="" disabled>
              {/* {editCourse
                ? `Your Category is ${
                    course?.category?.name ||
                    courseCategories.find(
                      (cat) => cat._id === getValues("courseCategory")
                    )?.name ||
                    "Choose your category"
                  }`
                : "Choose your category"} */}
              Choose your category
            </option>
            {!loading &&
              courseCategories?.map((category, index) => (
                <option
                  key={index}
                  value={category?._id}
                  className=" capitalize"
                >
                  {category?.name}
                </option>
              ))}
          </select>
          {errors.courseCategory && (
            <span className=" text-yellow-25 text-sm font-normal">
              Course Category is Required
            </span>
          )}
        </div>

        <div>
          <ChipInput
            label="Tags"
            register={register}
            setValue={setValue}
            placeholder="Choose a Tag"
            errors={errors}
            getValues={getValues}
            name="courseTags"
            id="courseTags"
          />
        </div>

        <div>
          <Upload
            label="Course Thumbnail"
            register={register}
            setValue={setValue}
            errors={errors}
            name="courseImage"
            id="courseImage"
            editData={editCourse ? course?.thumbnail : null}
          />
        </div>

        <div className=" flex flex-col gap-[6px]">
          <label
            htmlFor="courseBenifits"
            className=" text-richblack-5 text-sm font-normal"
          >
            Benefits of the course <sup className=" text-pink-200">*</sup>
          </label>
          <textarea
            name="courseBenifits"
            id="courseBenifits"
            cols="30"
            rows="4"
            placeholder="Enter Benefits of the course"
            className="w-full p-3 rounded-[8px] bg-richblack-700 focus:outline-none text-richblack-25 shadow-[1px_1px_0px_0px_rgba(255,255,255,0.5)] "
            {...register("courseBenifits", { required: true })}
          ></textarea>
          {errors.courseBenifits && (
            <span className=" text-yellow-25 text-sm font-normal">
              Course Benefits is Required
            </span>
          )}
        </div>

        <div>
          <RequirementField
            label="Requirements/Instructions"
            placeholder="Enter Instructions of the course"
            name="courseRequirments"
            id="courseRequirments"
            errors={errors}
            register={register}
            setValue={setValue}
            getValues={getValues}
          />
        </div>
        {/* Button */}
        <div className=" flex justify-end gap-3">
          {editCourse && (
            <button
              onClick={() => dispatch(setStep(2))}
              className=" py-2 px-3 text-richblack-900   hover:bg-pure-greys-300 transition-all border-richblack-400 border hover:text-richblack-800 duration-200 font-semibold  rounded-md  bg-pure-greys-400"
            >
              Continue Without Saving
            </button>
          )}

          <IconBtn text={!editCourse ? "Next" : "Save Changes"}>
            <MdNavigateNext className=" font-extrabold" />
          </IconBtn>
        </div>
      </form>
    </div>
  );
};

export default CourseInformationForm;
