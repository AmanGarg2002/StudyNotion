import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import ReactStars from "react-stars";
import { GoDotFill } from "react-icons/go";
import { RiDeleteBinLine } from "react-icons/ri";
import { removeFromCart } from "../../../../slices/cartSlice";
import { GetAvgRating } from "../../../../utils/avgRating";
import RatingStars from "../../../common/RatingStars";

const RenderCartC = () => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const totalLectures = (course) => {
    let lectures = 0;
    console.log("course hu mai:", course);
    course?.courseContent.forEach((sec) => {
      lectures += sec.subSection.length;
    });
    return `Total Lectures :${lectures}`;
  };

  return (
    <div className=" w-full lg:w-[70%] ">
      {cart.map((course, index, arr) => {
        return (
          <div
            className={`flex flex-row w-[100%]  ${
              index !== arr.length - 1
                ? "border-b border-richblack-700"
                : "border-none"
            } 
            ${index === 0 ? "pt-0 pb-8" : "py-8"}
            `}
            key={index}
          >
            <div className=" flex flex-col lg:h-[250px]  items-center lg:items-start  lg:flex-row  gap-5 w-[100%]">
              <div className=" w-full h-full">
                <img
                  src={course?.thumbnail}
                  alt="ThumbnailImage"
                  loading="lazy"
                  className="rounded-[8px] w-[100%] h-[350px] lg:h-full   object-center"
                />
              </div>

              <div className=" flex flex-col justify-between  w-full h-full">
                <div className=" flex flex-col gap-2 flex-1">
                  <p className=" text-lg font-medium text-richblack-5">
                    {course?.courseName}
                  </p>
                  <p className=" text-base font-normal text-richblack-300 capitalize">
                    {course?.category?.name}
                  </p>

                  {/* Rating and review Part */}
                  <div className="flex flex-row gap-2 items-center">
                    {/* API CALL HOGI YAHA AVERAGE RATING KE LIYE MAKE SURE TO CHANGE */}
                    <span className=" text-yellow-100 text-base font-semibold -mb-[3px]">
                      {GetAvgRating(course?.ratingAndReviews)}
                    </span>
                    {/* Verify Karna hai */}
                    {/* <ReactStars
                    count={5}
                    size={20}
                    edit={false}
                    activeColor="#ffd700"
                    color2="#ffd700"
                  /> */}
                    <RatingStars
                      Review_Count={GetAvgRating(course?.ratingAndReviews)}
                    />

                    <span className=" text-base font-normal text-richblack-400">
                      {`(${course?.ratingAndReviews.length} ratings)`}{" "}
                    </span>
                  </div>

                  <div className=" flex  items-center gap-1 text-sm text-richblack-300 font-medium">
                    <span>{totalLectures(course)}</span>
                    <p>|</p>
                    <span className=" capitalize">
                      {course?.instructor?.firstName.toLowerCase()}{" "}
                      {course?.instructor?.lastName.toLowerCase()}
                    </span>
                  </div>
                </div>

                <div className=" flex lg:flex-row-reverse lg:items-center flex-row-reverse    lg:gap-2 lg:mt-0  mt-2 items-end gap-5">
                  <button
                    onClick={() => dispatch(removeFromCart(course._id))}
                    className=" p-3  border border-richblack-700 flex items-center justify-end text-pink-200 text-center text-base font-medium flex-row gap-2  rounded-[8px] bg-richblack-800"
                  >
                    <div className=" flex justify-end">
                      <RiDeleteBinLine className="w-[18px] h-[18px]  text-pink-200 " />
                    </div>
                    Remove
                  </button>
                  <div className=" w-full ">
                    <p className=" text-yellow-50 text-2xl font-normal ">
                      Rs.{course?.price}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RenderCartC;
