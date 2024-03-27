import React, { useState, useEffect } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authApi";
import { useDispatch, useSelector } from "react-redux";
import { VscSignOut } from "react-icons/vsc";
import SidebarLink from "./SidebarLink";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../common/ConfirmationModal";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { TbLayoutSidebarRightCollapse } from "react-icons/tb";

const Sidebar = () => {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const { loading: authLoading } = useSelector((state) => state.auth);

  const [confirmationModal, setConfirmationModal] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 800);
  const [isOpen, setIsOpen] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (profileLoading || authLoading) {
    <div className="spinner absolute top-[45vh] left-[50vw] "></div>;
  }

  //side bar display logic
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 800);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="min-h-[calc(100vh-3.5rem)]">
      {isSmallScreen && !isOpen ? (
        <div
          onClick={() => setIsOpen(!isOpen)}
          className=" absolute pt-3 pl-4 "
        >
          <TbLayoutSidebarRightCollapse className=" text-richblack-300 text-2xl" />
        </div>
      ) : (
        ""
      )}
      <div
        className={` h-full  ${isOpen && isSmallScreen && "dashSideBar"} ${
          isOpen === false && isSmallScreen && "dashSideBar1"
        } sm:flex   `}
      >
        <div className="flex flex-col h-full min-w-[222px] border-r-[1px] border-richblack-700 bg-richblack-800">
          {isSmallScreen && (
            <div
              onClick={() => setIsOpen(!isOpen)}
              className=" pt-3 w-full flex items-center justify-end pr-3 cursor-pointer"
            >
              {isOpen ? (
                <TbLayoutSidebarLeftCollapse className=" text-richblack-300 text-2xl" />
              ) : (
                ""
              )}
            </div>
          )}
          <div
            className={`flex flex-col ${isSmallScreen ? "pt-3" : "pt-[30px]"} `}
          >
            {sidebarLinks.map((link) => {
              if (link.type && user?.accountType !== link.type) return null;

              return (
                link.id !== 3 &&
                link.id !== 4 && (
                  <SidebarLink link={link} iconName={link.icon} key={link.id} />
                )
              );
            })}
          </div>
          <div className=" h-[1.5px] w-[90%] mx-auto px-4  bg-[#424854] mt-[10px] mb-[10px] "></div>
          {user.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <div className=" flex flex-col">
              <p className=" text-richblack-50 text-sm font-semibold  px-8 pt-[2px] pb-[2px]">
                {" "}
                Instructor
              </p>
              {sidebarLinks.map((link) => {
                if (link.type && user?.accountType !== link.type) return null;

                return (
                  (link.id === 3 || link.id === 4) && (
                    <SidebarLink
                      link={link}
                      iconName={link.icon}
                      key={link.id}
                    />
                  )
                );
              })}
              <div className=" h-[1.5px] w-[90%] mx-auto px-4  bg-[#424854] mt-[10px] mb-[10px] "></div>
            </div>
          )}

          <div className="flex flex-col">
            {
              <SidebarLink
                link={{ name: "Settings", path: "/dashboard/settings" }}
                iconName="VscSettingsGear"
              />
            }

            <button
              onClick={() =>
                setConfirmationModal({
                  text1: "Are you sure ?",
                  text2: "You will be logged out of your Account",
                  btn1Text: "Logout",
                  btn2Text: "Cancel",
                  btn1Handler: () => dispatch(logout(navigate)),
                  btn2Handler: () => setConfirmationModal(null),
                })
              }
              className="py-2 px-8  flex items-center text-sm font-medium text-richblack-300"
            >
              <div className="flex flex-row gap-3 items-center">
                <VscSignOut className=" text-lg" />
                <span>Logout</span>
              </div>
            </button>
          </div>
        </div>

        {confirmationModal && (
          <ConfirmationModal modalData={confirmationModal} />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
