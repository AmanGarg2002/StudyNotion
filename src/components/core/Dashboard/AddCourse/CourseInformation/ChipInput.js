import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdClose } from "react-icons/md";

const ChipInput = ({
  label,
  register,
  placeholder,
  setValue,
  errors,
  getValues,
  name,
  id,
}) => {
  const { course, editCourse } = useSelector((state) => state.course);

  const [chips, setChips] = useState([]);

  useEffect(() => {
    if (editCourse) {
      setChips((course?.tag));
    }
    register(name, { required: true });
  }, []);

  useEffect(() => {
    setValue(name, chips);
  }, [chips]);

  const handleDeleteChip = (chipIndex) => {
    const newChips = chips.filter((_, index) => index !== chipIndex);
    setChips(newChips);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      const chipValue = event.target.value.trim();

      if (chipValue && !chips.includes(chipValue)) {
        const newChips = [...chips, chipValue];
        setChips(newChips);
        event.target.value = "";
      }
    }
  };

  return (
    <div className=" flex flex-col gap-[6px]">
      {/* Label Part */}
      <label htmlFor={name} className=" text-richblack-5 text-sm font-normal">
        {label} <sup className=" text-pink-200">*</sup>
      </label>

      <div className=" w-full flex flex-wrap gap-y-2">
        {chips.map((chip, index) => (
          <div
            key={index}
            className=" m-1 flex rounded-full items-center bg-yellow-400 px-2 py-1  text-sm text-richblack-5"
          >
            {chip}

            <button
              type="button"
              onClick={() => handleDeleteChip(index)}
              className="ml-2 focus:outline-none"
            >
              <MdClose className=" text-sm" />
            </button>
          </div>
        ))}

        <input
          type="text"
          id={id}
          name={name}
          placeholder={placeholder}
          className="w-full p-3 rounded-[8px] bg-richblack-700 focus:outline-none text-richblack-25 shadow-[1px_1px_0px_0px_rgba(255,255,255,0.5)] "
          onKeyDown={handleKeyDown}
        />
      </div>
      {errors[name] && (
        <span className=" text-yellow-25 text-sm font-normal">
          {label} is Required
        </span>
      )}
    </div>
  );
};

export default ChipInput;
