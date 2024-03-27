import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineCaretDown } from "react-icons/ai";
import { IoLibrary } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { RiLogoutBoxLine } from "react-icons/ri";
import { logout } from "../../../services/operations/authApi";

const ProfileDropDown = () => {
  const { user } = useSelector((state) => state.profile);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profileRef = useRef(false);

  useEffect(() => {
    let handler = (e) => {
      if (!profileRef.current.contains(e.target)) {
        setOpen(false);
        return;
      }
    };

    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, []);

  return (
    <button
      onClick={() => setOpen(!open)}
      className="relative z-50"
      ref={profileRef}
    >
      <div className="flex items-center gap-x-1">
        <img
          src={user?.image}
          alt="UserprofileImage"
          loading="lazy"
          className="h-[29px] w-[29px] rounded-full object-cover"
        />
        <AiOutlineCaretDown className="text-sm text-richblack-100"></AiOutlineCaretDown>
      </div>
      {open && (
        <div
          className=" absolute top-[131%] w-[300%]  -right-[80%] bg-richblack-700 rounded-lg  divide-richblack-200 border px-[5px] border-richblack-500 flex flex-col
        
        "
        >
          <Link
            to="/dashboard/my-profile"
            className="flex items-center w-[50%] "
          >
            <div className="flex flex-row gap-[10px] items-center p-[8px] group">
              <IoLibrary className="text-richblack-200 h-[20px] group-hover:text-richblack-5 transition-all duration-200" />
              <p className=" text-richblack-200 font-medium text-base group-hover:text-richblack-5 transition-all duration-200 ">
                Dashboard
              </p>
            </div>
          </Link>

          <div
            className="flex items-center  w-[50%]"
            onClick={() => {
              dispatch(logout(navigate));
            }}
          >
            <div className="flex flex-row gap-[10px] items-center p-[8px] group">
              <RiLogoutBoxLine className="text-richblack-200 h-[25px] w-[18px]  group-hover:text-richblack-5 transition-all duration-200 " />
              <p className=" text-richblack-200 font-medium text-base  group-hover:text-richblack-5 transition-all duration-200">
                Logout
              </p>
            </div>
          </div>
        </div>
      )}
    </button>
  );
};

export default ProfileDropDown;
