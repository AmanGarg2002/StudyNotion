import React from "react";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../../common/IconBtn";
import { buyCourse } from "../../../../services/operations/studentFeaturesApi";
import { useNavigate } from "react-router-dom";

const RenderTotalAmoun = () => {
  const { total, cart } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id);
    console.log("BOUGHT THESE COURSES:", courses);

    buyCourse(token, courses, user, navigate, dispatch);
  };

  return (
    <div
      className=" w-[300px] lg:w-[250px] h-[196px] lg:p-3     p-6 rounded-lg border border-richblack-700 bg-richblack-800 flex flex-col
   gap-4 
   "
    >
      <div className=" flex flex-col gap-1">
        <p className=" text-lg text-richblack-200 font-semibold">Total:</p>
        <p className=" text-yellow-50 text-3xl font-semibold">Rs. {total}</p>
        <p className=" text-richblack-300 text-sm line-through">
          Rs. {total + 3000}
        </p>
      </div>

      <IconBtn
        text="Buy Now"
        onclick={handleBuyCourse}
        customClasses={"w-full justify-center"}
      />
    </div>
  );
};

export default RenderTotalAmoun;
