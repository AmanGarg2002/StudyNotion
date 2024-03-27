import React from "react";

const TextOrange = ({ text, active }) => {
  return (
    <span
      className={`font-inter font-semibold text-4xl ${
        active
          ? "bg-gradient-to-t from-[#FF512F] to-[#F09819]"
          : " bg-gradient-to-br from-[#E65C00] to-[#F9D423]"
      }
       text-transparent bg-clip-text`}
    >
      {text}
    </span>
  );
};

export default TextOrange;
