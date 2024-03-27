import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import "video-react/dist/video-react.css";
import { Player } from "video-react";

const Upload = ({
  label,
  register,
  setValue,
  errors,
  name,
  id,
  video = false,
  viewData = null,
  editData = null,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  );

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    const file = acceptedFiles[0];
    console.log(file);
    if (file) {
      previewFile(file);
      setSelectedFile(file);
    }
  }, []);

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: !video
      ? { "image/*": [".jpeg", ".jpg", ".png"] }
      : { "video/*": [".mp4"] },
    onDrop,
  });

  useEffect(() => {
    register(name, { required: true });
  }, []);

  useEffect(() => {
    setValue(name, selectedFile);
  }, [selectedFile, setValue]);

  return (
    <div className=" flex flex-col space-y-2">
      <label htmlFor={name} className=" text-richblack-5 text-sm font-normal">
        {label} {!viewData && <sup className=" text-pink-200">*</sup>}
      </label>
      <div
        className={`${
          isDragActive ? "bg-richblack-600" : "bg-richblack-700"
        } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}
      >
        {previewSource ? (
          <div className=" w-full flex flex-col p-6">
            {!video ? (
              <img
                src={previewSource}
                alt="Preview"
                className=" h-full w-full rounded-md object-cover"
              />
            ) : (
              <Player playsInline aspectRatio="16:9" src={previewSource} />
            )}
            {!viewData && (
              <button
                type="button"
                className=" mt-3 text-richblack-400 underline"
                onClick={() => {
                  setPreviewSource(null);
                  setSelectedFile(null);
                  setValue(name, null);
                }}
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          <div
            {...getRootProps()}
            className=" relative w-full flex flex-col items-center p-6 h-full"
          >
            <div className=" grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
              <FiUploadCloud className="text-2xl text-yellow-50" />
            </div>

            <p className=" mt-2 max-w-[205px] text-center text-xs text-richblack-200">
              Drag and drop an {!video ? "image" : "video"}, or{" "}
              <span className=" font-semibold text-yellow-50">Browse</span> Max
              6MB each (12MB for videos)
            </p>

            <ul className="mt-10  flex list-disc justify-between space-x-12 text-center text-xs text-richblack-200">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>
          </div>
        )}
      </div>
      {errors[name] && (
        <span className=" text-yellow-25 text-sm font-normal">
          {label} is Required
        </span>
      )}
    </div>
  );
};

export default Upload;
