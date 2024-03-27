import React, { useState } from "react";
import { useForm } from "react-hook-form";
import IconBtn from "../../../common/IconBtn";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { createCategory } from "../../../../services/operations/adminApi";

const AddCategory = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = async (data, e) => {
    console.log("FORM DATA:", data);
    setLoading(true);
    const result = await createCategory(
      {
        name: data.categoryName,
        description: data.categoryDesc,
      },
      token
    );
    setLoading(false);
    setValue("categoryName", "");
    setValue("categoryDesc", "");
    navigate("/dashboard/my-profile");
  };

  return (
    <div className="flex flex-col-reverse items-center lg:items-start space-y-5 lg:space-y-0 lg:flex-row text-richblack-5 lg:space-x-8   ">
      <div className="flex w-full lg:w-[85%] flex-col mt-4 lg:mt-0 text-richblack-5 gap-8  ">
        <div className=" text-3xl font-medium  ">Add Category</div>
        <div className=" w-[100%]   ">
          <form
            action=""
            onSubmit={handleSubmit(onSubmit)}
            className=" p-6 flex flex-col rounded-[8px] border border-richblack-700 bg-richblack-800 gap-[26px] "
          >
            <div className=" flex flex-col gap-[6px]">
              <label
                htmlFor="categoryName"
                className=" text-richblack-5 text-sm font-normal"
              >
                Category Name <sup className=" text-pink-200">*</sup>
              </label>
              <input
                type="text"
                id="categoryName"
                name="categoryName"
                placeholder="Enter Category Name"
                className="w-full p-3 rounded-[8px] bg-richblack-700 focus:outline-none text-richblack-25 shadow-[1px_1px_0px_0px_rgba(255,255,255,0.5)] "
                {...register("categoryName", { required: true })}
              />
              {errors.categoryName && (
                <span className=" text-yellow-25 text-sm font-normal">
                  Category Name is Required
                </span>
              )}
            </div>

            <div className=" flex flex-col gap-[6px]">
              <label
                htmlFor="categoryDesc"
                className=" text-richblack-5 text-sm font-normal"
              >
                Category Description <sup className=" text-pink-200">*</sup>
              </label>
              <textarea
                name="categoryDesc"
                id="categoryDesc"
                cols="30"
                rows="4"
                placeholder="Enter Category Description"
                className="w-full p-3 rounded-[8px] bg-richblack-700 focus:outline-none text-richblack-25 shadow-[1px_1px_0px_0px_rgba(255,255,255,0.5)] "
                {...register("categoryDesc", { required: true })}
              ></textarea>
              {errors.categoryDesc && (
                <span className=" text-yellow-25 text-sm font-normal">
                  Category Description is Required
                </span>
              )}
            </div>
            <div className="  flex justify-end gap-3">
              <button
                onClick={() => navigate("/dashboard/my-profile")}
                className=" py-2 px-3 text-richblack-900   hover:bg-pure-greys-300 transition-all border-richblack-400 border hover:text-richblack-800 duration-200 font-semibold  rounded-md  bg-pure-greys-400"
              >
                Cancel
              </button>

              <IconBtn text={loading ? "Loading..." : "Create"} />
            </div>
          </form>
        </div>
      </div>

      <div className=" max-h-min   p-6 flex flex-col  gap-[19px]  rounded-[8px] border  border-richblack-700 bg-richblack-800 max-w-[400px]">
        <p className=" text-richblack-5 text-lg pl-1">
          ⚡Category Creation Tips
        </p>

        <ol className=" text-richblack-5 list-disc flex flex-col pl-6 text-left gap-[11px]">
          <li className=" text-xs font-medium">
            Define clear and descriptive names for each category.
          </li>

          <li className=" text-xs font-medium">
            Organize categories hierarchically for better navigation.
          </li>

          <li className=" text-xs font-medium">
            Use relevant keywords in category descriptions for SEO optimization.
          </li>

          <li className=" text-xs font-medium">
            Ensure consistency in naming conventions across categories.
          </li>

          <li className=" text-xs font-medium">
            Provide informative and concise category descriptions.
          </li>

          <li className=" text-xs font-medium">
            Regularly review and update categories to reflect changes in
            content.
          </li>

          <li className=" text-xs font-medium">
            Group related categories together to streamline user experience.
          </li>

          <li className=" text-xs font-medium">
            Consider user feedback and analytics to refine category
            organization.
          </li>
        </ol>
      </div>
    </div>
  );
};

export default AddCategory;
