import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const RequirementField = ({
  label,
  placeholder,
  name,
  id,
  errors,
  register,
  setValue,
  getValues,
}) => {
  const [requirement, setRequirement] = useState("");
  const [requirementsList, setRequirementsList] = useState([]);

  const { editCourse, course } = useSelector((state) => state.course);

  useEffect(() => {
    if (editCourse) {
      setRequirementsList(course?.instructions);
    }

    register(name, { required: true });
  }, []);

  useEffect(() => {
    setValue(name, requirementsList);
  }, [requirementsList]);

  const handleAddRequirement = (e) => {
    e.preventDefault();
    if (requirement) {
      setRequirementsList([...requirementsList, requirement]);
      setRequirement("");
      console.log(requirementsList);
    }
  };

  const handleRemoveRequirement = (index, e) => {
    e.preventDefault();
    const updatedRequirements = [...requirementsList];
    updatedRequirements.splice(index, 1);
    setRequirementsList(updatedRequirements);
  };

  return (
    <div className=" flex flex-col gap-[6px]">
      <label htmlFor={name} className=" text-richblack-5 text-sm font-normal">
        {label} <sup className=" text-pink-200">*</sup>
      </label>
      <input
        type="text"
        placeholder={placeholder}
        name={name}
        id={id}
        value={requirement}
        onChange={(e) => setRequirement(e.target.value)}
        className="w-full p-3 rounded-[8px] bg-richblack-700 focus:outline-none text-richblack-25 shadow-[1px_1px_0px_0px_rgba(255,255,255,0.5)] "
      />
      {errors[name] && (
        <span className=" text-yellow-25 text-sm font-normal">
          {label} is Required
        </span>
      )}
      <button
        className=" text-yellow-50 font-bold text-base text-left mt-[4px] cursor-pointer "
        onClick={handleAddRequirement}
      >
        Add
      </button>
      {requirementsList.length > 0 && (
        <ul className=" flex flex-col list-inside  list-disc">
          {requirementsList.map((requirement, index) => (
            <li key={index}>
              <span className=" capitalize text-richblack-5">
                {requirement}
              </span>
              <button
                className=" ml-2 text-xs text-pure-greys-300 "
                onClick={(e) => handleRemoveRequirement(index, e)}
              >
                Clear
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RequirementField;
