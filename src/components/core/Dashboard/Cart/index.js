import React from "react";
import { useSelector } from "react-redux";
import RenderCartC from "./RenderCartC";
import RenderTotalAmoun from "./RenderTotalAmoun";

const Cart = () => {
  const { total, totalItems } = useSelector((state) => state.cart);

  return (
    <div className="flex flex-col text-richblack-5 gap-8  ">
      <h1 className=" text-3xl font-medium ">My Cart</h1>
      <p className=" border-b border-richblack-400  pb-2 font-semibold text-richblack-400">
        {totalItems} Courses in Cart
      </p>
      {total > 0 ? (
        <div className=" flex flex-col-reverse items-center gap-y-4 lg:items-start justify-between  gap-x-10 lg:flex-row">
          <RenderCartC />
          <RenderTotalAmoun />
        </div>
      ) : (
        <div className=" text-center text-3xl text-richblack-100">
          Your cart is empty
        </div>
      )}
    </div>
  );
};

export default Cart;
