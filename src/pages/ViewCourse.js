import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { getFullDetailsOfCourse } from "../services/operations/courseDetailApi";
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice";
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar";
import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal";

const ViewCourse = () => {
  const [reviewModal, setReviewModal] = useState(false);
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setCourseSpecificDetails = async () => {
      setLoading(true);
      const courseData = await getFullDetailsOfCourse(courseId, token);
      console.log("View Course Mai Response:", courseData);
      dispatch(setCourseSectionData(courseData?.courseDetails?.courseContent));
      dispatch(setEntireCourseData(courseData?.courseDetails));
      dispatch(setCompletedLectures(courseData?.completedVideos));

      let lectures = 0;

      courseData?.courseDetails?.courseContent.forEach((sec) => {
        lectures += sec.subSection.length;
      });

      dispatch(setTotalNoOfLectures(lectures));
      setLoading(false);
    };
    setCourseSpecificDetails();
  }, []);

  return (
    <div className="relative min-h-[calc(100vh-3.5rem)] ">
      {loading ? (
        <div className=" spinner absolute left-[50%] top-[40vh]"></div>
      ) : (
        <div className="flex min-h-[calc(100vh-3.5rem)] ">
          <VideoDetailsSidebar setReviewModal={setReviewModal} />

          <div className="min-h-[calc(100vh-3.5rem)] w-full ">
            <div className=" mx-6 py-2">
              <Outlet />
            </div>
          </div>
        </div>
      )}
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </div>
  );
};

export default ViewCourse;
