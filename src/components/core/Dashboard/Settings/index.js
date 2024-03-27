import React from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import ChangeProfilePicture from "./ChangeProfilePicture";
import EditProfile from "./EditProfile";
import UpdatePassword from "./UpdatePassword";
import DeleteAccount from "./DeleteAccount";

const Settings = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col text-richblack-5 gap-8  ">
      <div
        className=" flex flex-col gap-3"
        onClick={() => {
          navigate("/dashboard/my-profile");
        }}
      >
        <div className="flex flex-row items-center gap-1 text-richblack-300 cursor-pointer">
          <FaChevronLeft className=" h-[12px] w-[12px]" />

          <p className=" text-sm">Back</p>
        </div>
        <h1 className=" text-3xl font-medium ">Edit Profile</h1>
      </div>

      {/* Section-1 */}
      <ChangeProfilePicture />

      {/* Section-2 */}
      <EditProfile />

      {/* Section-3 */}
      <UpdatePassword />

      {/* Section-4 */}
      <DeleteAccount />
    </div>
  );
};

export default Settings;
