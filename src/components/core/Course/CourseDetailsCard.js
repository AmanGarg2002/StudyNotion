import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoMdShareAlt } from "react-icons/io";
import { PiCursorClickLight } from "react-icons/pi";
import { FaShareSquare } from "react-icons/fa";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import { addToCart } from "../../../slices/cartSlice";

const CourseDetailsCard = ({
  course,
  setConfirmationModal,
  handleBuyCourse,
}) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    console.log("CLICKED YO");
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an instructor, you cant buy the course");
      return;
    }
    if (token) {
      dispatch(addToCart(course));
      return;
    }
    setConfirmationModal({
      text1: "You are not logged In",
      text2: "Please login to add course to cart ",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  const handleShare = () => {
    copy(window.location.href);
    toast.success("Link Copied To Clipboard");
  };

  return (
    <div className=" w-full rounded-lg flex flex-col items-center">
      <img
        src={course?.thumbnail}
        alt="CourseThumbNail"
        loading="lazy"
        className=" rounded-t-lg max-h-[300px] w-full object-cover min-h-[180px]"
      />

      <div className=" p-6 bg-richblack-700 flex flex-col gap-4 w-full">
        <p className=" text-richblack-5 text-3xl font-bold">
          Rs. {course?.price}
        </p>

        <div className=" w-full flex flex-col gap-3">
          {!course?.studentsEnrolled.includes(user?._id) && (
            <button
              onClick={handleAddToCart}
              className=" px-6 text-center py-3 rounded-lg hover:bg-yellow-25 transition-all duration-200 bg-yellow-50 text-richblack-900 text-base font-semibold "
            >
              Add to Cart
            </button>
          )}
          <button
            onClick={
              user && course?.studentsEnrolled.includes(user?._id)
                ? () => navigate("/dashboard/enrolled-courses")
                : handleBuyCourse
            }
            className=" px-6 text-center py-3 rounded-lg shadow-[1.5px_1.5px_0px_0px_rgba(255,255,255,0.18)] bg-richblack-900 text-base font-semibold  text-richblack-5  "
          >
            {user && course?.studentsEnrolled.includes(user?._id)
              ? "Go to Course"
              : "Buy Now"}
          </button>

          <p className=" text-center text-sm  text-richblack-25 font-normal">
            30-Day Money-Back Guarantee
          </p>
        </div>

        <div className=" flex flex-col justify-center gap-2">
          <p className=" text-richblack-5 text-base font-medium">
            This course includes:
          </p>
          <div className="  text-caribbeangreen-100 ">
            {course?.instructions.map((instruction, index) => (
              <p
                key={index}
                className=" flex w-full gap-2 text-sm items-center font-medium"
              >
                <IoMdShareAlt />
                <span className=" w-full truncate">{instruction}</span>
              </p>
            ))}
          </div>
        </div>

        <div className="text-center w-full flex mx-auto  justify-center items-center text-yellow-100 ">
          <div
            onClick={handleShare}
            className=" flex  items-center cursor-pointer  gap-2 "
          >
            <FaShareSquare className=" text-center text-base font-medium " />
            <button className=" text-center text-base font-medium">
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsCard;
