import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import IconBtn from "../../common/IconBtn";
import { BsChevronDown } from "react-icons/bs";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { TiTick } from "react-icons/ti";

import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { TbLayoutSidebarRightCollapse } from "react-icons/tb";

const VideoDetailsSidebar = ({ setReviewModal }) => {
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");
  const navigate = useNavigate();
  const { sectionId, subSectionId } = useParams();
  const location = useLocation();

  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

  useEffect(() => {
    (() => {
      if (!courseSectionData.length) {
        return;
      }

      const currentSectionIndex = courseSectionData.findIndex(
        (data) => data._id === sectionId
      );

      const currentSubSectionIndex = courseSectionData?.[
        currentSectionIndex
      ]?.subSection.findIndex((data) => data._id === subSectionId);

      const activeSubSectionId =
        courseSectionData[currentSectionIndex]?.subSection?.[
          currentSubSectionIndex
        ]?._id;

      //set current section here
      setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
      //set current sub section here
      setVideoBarActive(activeSubSectionId);
    })();
  }, [courseSectionData, courseEntireData, location.pathname]);

  const handleSectionClick = (sectionId) => {
    setActiveStatus(sectionId);
  };

  //side bar logic part
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1024);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // hidden lg:flex
  return (
    <div
      className={`min-h-[calc(100vh-3.5rem)] ${
        isSmallScreen ? " space-x-1" : ""
      } `}
    >
      {isSmallScreen && !isOpen ? (
        <div
          onClick={() => setIsOpen(!isOpen)}
          className=" absolute pt-4 pl-1 z-[100]  "
        >
          <TbLayoutSidebarRightCollapse className=" text-richblack-300 text-2xl" />
        </div>
      ) : (
        ""
      )}
      <div className=" h-full">
        <div
          className={` h-full  ${isOpen && isSmallScreen && "dashSideBar"} ${
            isOpen === false && isSmallScreen && "dashSideBar1"
          } lg:flex   `}
        >
          <div className="flex flex-col h-full w-[320px] max-w-[350px] border-r-[1px] border-richblack-700 bg-richblack-800">
            <div className="flex flex-col gap-3 mx-5 pt-[10px]">
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
              {/* For Buttons */}
              <div className=" flex justify-between py-2  items-center ">
                {/* Back Button */}
                <div
                  className=" text-richblack-25 gap-1 cursor-pointer flex items-center text-lg"
                  onClick={() => {
                    navigate("/dashboard/enrolled-courses");
                  }}
                >
                  <IoArrowBackOutline className=" text-base" />
                  <p className=" text-base font-normal">Back</p>
                </div>

                {/* Review Button */}
                <div>
                  <IconBtn
                    text="Add Review"
                    onclick={() => setReviewModal(true)}
                  />
                </div>
              </div>

              {/* Heading Part */}
              <div className=" w-full flex flex-col gap-2">
                <p className=" text-richblack-25 text-base font-bold">
                  {courseEntireData?.courseName}
                </p>
                <p
                  className={`text-sm font-semibold  ${
                    totalNoOfLectures === completedLectures?.length
                      ? " text-caribbeangreen-100"
                      : "text-richblack-500"
                  }`}
                >
                  {completedLectures?.length} / {totalNoOfLectures}
                </p>
              </div>

              <div className="h-[1px] w-full bg-richblack-600"></div>

              {/* For Sections And SubSections */}
              <div className=" flex flex-col gap-[10px]">
                {courseSectionData.map((section, index) => (
                  <div
                    key={index}
                    className=" text-richblack-5 text-sm cursor-pointer"
                    onClick={() =>
                      handleSectionClick(
                        section?._id,
                        section?.subSection?.[0]?._id
                      )
                    }
                  >
                    {/* Section */}
                    <div className=" flex flex-row justify-between items-center bg-richblack-600 px-6 py-4">
                      <div className=" font-semibold w-[90%]">
                        {section?.sectionName}
                      </div>
                      <span
                        className={`${
                          activeStatus === section._id
                            ? " rotate-180"
                            : " rotate-0"
                        } transition-all duration-200`}
                      >
                        <BsChevronDown />
                      </span>
                    </div>

                    {/* SubSection */}
                    <div>
                      {activeStatus === section?._id && (
                        <div className=" transition-[height] duration-400 ease mt-1">
                          {section?.subSection.map((topic, index) => (
                            <div
                              key={index}
                              className={`px-6 cursor-pointer relative py-2 gap-2 flex items-center transition-all duration-200 ${
                                videoBarActive === topic?._id
                                  ? " bg-yellow-200 font-semibold text-richblack-800"
                                  : " hover:bg-richblack-900"
                              }`}
                              onClick={() => {
                                console.log("click hua");
                                setVideoBarActive(topic?._id);
                                navigate(
                                  `/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`
                                );
                              }}
                            >
                              <div className=" w-[14px] relative flex items-center">
                                <input
                                  type="checkbox"
                                  name="CompletedLecture"
                                  id="CompletedLecture"
                                  className={` appearance-none object-cover cursor-pointer w-[14px] h-[14px]  text-richblack-500 border-[1px] rounded-sm checked:bg-black  border-richblack-25  transition-all duration-200`}
                                  checked={completedLectures.includes(
                                    topic._id
                                  )}
                                  onChange={() => {}}
                                />
                                {completedLectures.includes(topic._id) && (
                                  <TiTick className="  absolute top-0  text-richblack-25 object-cover  w-[14px] h-[14px] transition-all duration-200" />
                                )}
                              </div>

                              <div className="text-sm flex items-end capitalize">
                                {topic.title}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className=" py-2 px-8 flex items-center"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetailsSidebar;
