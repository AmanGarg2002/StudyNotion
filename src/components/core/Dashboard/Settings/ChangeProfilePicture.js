import React, { useRef, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  removeDisplayPicture,
  updateDisplayPicture,
} from "../../../../services/operations/SettingsApi";
import { FiUpload } from "react-icons/fi";

const ChangeProfilePicture = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const [fileState, setFileState] = useState(false);

  const fileInputRef = useRef(null);

  const handleFileChange = () => {
    const fileInput = fileInputRef.current;

    if (fileInput && fileInput.files.length > 0) {
      setFileState(true);
    } else {
      setFileState(false);
    }
  };

  const dispatch = useDispatch();

  const handleClick = async () => {
    const fileInput = fileInputRef.current;
    console.log("User data:", user);

    if (fileInput && fileInput.files.length > 0) {
      const selectedFile = fileInput.files[0];
      setLoading(true);
      try {
        await dispatch(updateDisplayPicture(selectedFile, token));
      } catch (error) {
        console.log("ERROR IN UPDATE", error);
      }

      setLoading(false);
    }
    setFileState(false);
  };

  const imageUrl = user.image;
  const imageId = imageUrl.split("/").at(-1).split(".");

  const handleRemove = async () => {
    console.log("USER KI DETAILS OF IMAGE:", imageId[0]);
    setLoading(true);
    try {
      await dispatch(removeDisplayPicture(imageId[0], token));
    } catch (error) {
      console.log("ERROR IN Remove Profile", error);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-6  w-[85%] justify-between items-center mx-auto p-6 border rounded-lg border-richblack-700 bg-richblack-800">
      <div className=" relative flex justify-between w-full items-center mx-auto min-h-[100px] ">
        {loading ? (
          <div className="spinner absolute left-[50%]"></div>
        ) : (
          <div className="  flex flex-row justify-between sm:justify-start gap-6 items-center">
            <img
              src={user?.image}
              alt={`profile-${user?.firstName}`}
              loading="lazy"
              className=" aspect-square w-[78px] rounded-full object-cover border border-richblack-700 "
            />

            <div className="flex flex-col w-full sm:w-fit gap-3">
              <p className=" text-lg font-medium text-richblack-25 capitalize">
                Change Profile Picture
              </p>
              <div className=" flex flex-col sm:flex-row gap-3">
                <label className=" flex items-center gap-1 cursor-pointer py-2 px-3 text-richblack-900   hover:bg-pure-greys-300 transition-all border-richblack-400 border hover:text-richblack-800 duration-200 font-semibold  rounded-md  bg-pure-greys-400">
                  <FiUpload className=" text-base" />
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/jpeg , image/png, image/gif"
                  />
                  {fileState ? "Selected" : "Select"}
                </label>
                <button
                  onClick={handleClick}
                  className=" py-2 px-4 flex items-center gap-2 text-richblack-900  transition-all hover:bg-yellow-25    border duration-200 font-semibold  rounded-md bg-yellow-50"
                >
                  Change
                </button>
                <button
                  onClick={handleRemove}
                  className=" py-[8px] px-3 flex  items-center duration-200 transition-all   text-pink-200 font-semibold flex-row gap-2  rounded-md bg-pink-700 border-pink-600 hover:bg-pink-800"
                >
                  <RiDeleteBinLine className=" text-pink-200" />
                  Remove
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangeProfilePicture;
