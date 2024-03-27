import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiMiniPencil } from "react-icons/hi2";
import DropdownMenu from "../../../../../assets/Images/fi-bs-interlining.svg";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TiArrowSortedDown } from "react-icons/ti";
import { FaPlus } from "react-icons/fa";
import SubSectionModal from "./SubSectionModal";
import ConfirmationModal from "../../../../common/ConfirmationModal";
import {
  deleteSection,
  deleteSubSection,
} from "../../../../../services/operations/courseDetailApi";
import { setCourse } from "../../../../../slices/courseSlice";

const NestedView = ({ handleChangeEditSectionName }) => {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleDeleteSection = async (sectionId) => {
    const result = await deleteSection(
      {
        sectionId,
        courseId: course._id,
      },
      token
    );

    if (result) {
      dispatch(setCourse(result));
    }
    setConfirmationModal(null);
  };

  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    const result = await deleteSubSection(
      {
        subSectionId,
        sectionId,
      },
      token
    );

    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === sectionId ? result : section
      );
      const updatedCourse = { ...course, courseContent: updatedCourseContent };

      dispatch(setCourse(updatedCourse));
    }
    setConfirmationModal(null);
  };

  return (
    <div className=" relative">
      <div className=" bg-richblack-700 px-6 py-1 pb-4  rounded-lg border border-richblack-600 flex flex-col justify-center ">
        {course?.courseContent?.map((section) => (
          <details key={section._id} open>
            <summary className=" flex justify-between items-center py-3 border-b-[2px] border-richblack-600">
              <div className=" flex items-center truncate gap-x-3">
                <img
                  src={DropdownMenu}
                  alt="DropdownMenu"
                  loading="lazy"
                  className=" w-[20px] h-[20px]"
                />
                <p className=" text-richblack-50 font-semibold text-base capitalize">
                  {section.sectionName}
                </p>
              </div>

              <div className=" text-richblack-400 flex items-center gap-3">
                <button
                  onClick={() =>
                    handleChangeEditSectionName(
                      section._id,
                      section.sectionName
                    )
                  }
                >
                  <HiMiniPencil className=" w-[20px] h-[20px] hover:text-blue-200 transition-all duration-200" />
                </button>

                <button
                  onClick={() => {
                    setConfirmationModal({
                      text1: "Delete this Section ?",
                      text2: "All the lectures in this section will be deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () => handleDeleteSection(section._id),
                      btn2Handler: () => setConfirmationModal(null),
                    });
                  }}
                >
                  <RiDeleteBin6Line className=" w-[20px] h-[20px] hover:text-pink-600 transition-all duration-200" />
                </button>

                <div className=" w-[3px] h-[20px] bg-richblack-400 "></div>

                <TiArrowSortedDown className=" w-[20px] h-[20px] cursor-pointer" />
              </div>
            </summary>

            <div>
              {section?.subSection?.map((data) => (
                <div
                  key={data?._id}
                  onClick={() => setViewSubSection(data)}
                  className=" flex justify-between items-center   py-3 border-b-[2px] border-richblack-600 pl-6"
                >
                  <div className=" flex items-center truncate gap-x-3">
                    <img
                      src={DropdownMenu}
                      alt="DropdownMenu"
                      loading="lazy"
                      className=" w-[20px] h-[20px]"
                    />
                    <p className=" text-richblack-50 font-semibold text-base capitalize truncate">
                      {data.title}
                    </p>
                  </div>

                  <div
                    className=" text-richblack-400 flex items-center gap-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() =>
                        setEditSubSection({ ...data, sectionId: section._id })
                      }
                    >
                      <HiMiniPencil className=" w-[20px] h-[20px] hover:text-blue-200 transition-all duration-200" />
                    </button>

                    <button
                      onClick={() => {
                        setConfirmationModal({
                          text1: "Delete this Sub Section ?",
                          text2: "Selected lecture will be deleted",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handler: () =>
                            handleDeleteSubSection(data._id, section._id),
                          btn2Handler: () => setConfirmationModal(null),
                        });
                      }}
                    >
                      <RiDeleteBin6Line className=" w-[20px] h-[20px] hover:text-pink-600 transition-all duration-200" />
                    </button>
                  </div>
                </div>
              ))}

              <button
                className=" py-4 flex justify-end  text-base gap-1 items-center font-medium text-yellow-50"
                onClick={() => setAddSubSection(section._id)}
              >
                <FaPlus />
                <p className=" text-base">Add Lecture</p>
              </button>
            </div>
          </details>
        ))}
      </div>

      {addSubSection ? (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubSection}
          add={true}
        />
      ) : viewSubSection ? (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      ) : editSubSection ? (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      ) : (
        <div></div>
      )}

      {confirmationModal ? (
        <ConfirmationModal modalData={confirmationModal} />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default NestedView;
