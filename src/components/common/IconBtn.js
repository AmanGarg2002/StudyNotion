import React from "react";

const IconBtn = ({
  text,
  onclick,
  children,
  type,
  disabled,
  customClasses,
  outline = false,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onclick}
      className={` py-2 px-4 flex items-center gap-2 text-richblack-900  transition-all 
      border duration-200 font-semibold  rounded-md  ${
        outline
          ? " bg-transparent border border-yellow-50 text-yellow-50"
          : "bg-yellow-50  hover:bg-yellow-25  "
      } ${customClasses} `}
    >
      {children ? (
        <>
          <span>{text}</span>

          {children}
        </>
      ) : (
        text
      )}
    </button>
  );
};

export default IconBtn;
