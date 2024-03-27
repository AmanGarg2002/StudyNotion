import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { markLectureAsComplete } from "../../../services/operations/courseDetailApi";
import { updateCompletedLectures } from "../../../slices/viewCourseSlice";
import { Player, BigPlayButton, ControlBar } from "video-react";
import "video-react/dist/video-react.css";
import IconBtn from "../../common/IconBtn";

const VideoDetails = ({ setProgress }) => {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const playerRef = useRef();
  const { token } = useSelector((state) => state.auth);
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse);
  const location = useLocation();

  const [videoData, setVideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setProgress(23);
    const setVideoSpecificDetails = async () => {
      if (!courseSectionData.length) {
        return;
      }

      if (!courseId || !sectionId || !subSectionId) {
        navigate("/dashboard/enrolled-courses");
      } else {
        const filteredData = courseSectionData?.filter(
          (course) => course._id === sectionId
        );

        const filteredVideoData = filteredData?.[0]?.subSection.filter(
          (data) => data._id === subSectionId
        );

        setVideoData(filteredVideoData[0]);
        setVideoEnded(false);
      }
    };
    setVideoSpecificDetails();
    setTimeout(() => {
      setProgress(100);
    }, 900);
  }, [courseSectionData, courseEntireData, location.pathname]);

  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData?.findIndex(
      (data) => data._id === sectionId
    );

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ]?.subSection?.findIndex((data) => data._id === subSectionId);

    if (currentSectionIndex === 0 && currentSubSectionIndex === 0) {
      return true;
    } else {
      return false;
    }
  };
  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData?.findIndex(
      (data) => data._id === sectionId
    );

    const noOfSubSections =
      courseSectionData[currentSectionIndex]?.subSection?.length;

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ]?.subSection?.findIndex((data) => data._id === subSectionId);

    if (
      currentSectionIndex === courseSectionData.length - 1 &&
      currentSubSectionIndex === noOfSubSections - 1
    ) {
      return true;
    } else {
      return false;
    }
  };

  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData?.findIndex(
      (data) => data._id === sectionId
    );

    const noOfSubSections =
      courseSectionData[currentSectionIndex]?.subSection?.length;

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ]?.subSection?.findIndex((data) => data._id === subSectionId);

    if (currentSubSectionIndex !== noOfSubSections - 1) {
      //same section next video
      const nextSubSectionId =
        courseSectionData[currentSectionIndex]?.subSection[
          currentSubSectionIndex + 1
        ]?._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      );
    } else {
      //next section first video
      const nextSectionId = courseSectionData[currentSectionIndex + 1];
      const firstSubSectionId =
        courseSectionData[currentSectionIndex + 1]?.subSection[0]?._id;
      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${firstSubSectionId}`
      );
    }
  };
  const gotToPrevVideo = () => {
    const currentSectionIndex = courseSectionData?.findIndex(
      (data) => data._id === sectionId
    );

    const noOfSubSections =
      courseSectionData[currentSectionIndex]?.subSection?.length;

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ]?.subSection?.findIndex((data) => data._id === subSectionId);

    if (currentSubSectionIndex !== 0) {
      //same section previous video
      const prevSubSectionId =
        courseSectionData[currentSectionIndex].subSection[
          currentSubSectionIndex - 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
      );
    } else {
      //previous section last video
      const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
      const prevSubSectionLength =
        courseSectionData[currentSectionIndex - 1].subSection.length;
      const prevSubSectionId =
        courseSectionData[currentSectionIndex - 1].subSection[
          prevSubSectionLength - 1
        ]._id;

      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
      );
    }
  };

  const handleLectureCompletion = async () => {
    setLoading(true);

    const res = await markLectureAsComplete(
      {
        courseId: courseId,
        subSectionId: subSectionId,
      },
      token
    );
    if (res) {
      dispatch(updateCompletedLectures(subSectionId));
    }

    setLoading(false);
  };
  return (
    <div className=" relative w-full pb-[100px]">
      {!videoData ? (
        <div className=" text-center text-3xl text-richblack-100">
          No Lecture Found
        </div>
      ) : (
        <Player
          ref={playerRef}
          aspectRatio="16:9"
          playsInline
          onEnded={() => setVideoEnded(true)}
          src={videoData?.videoUrl}
        >
          <BigPlayButton position="center" />
          <ControlBar autoHide={false} className="my-class  sm:z-10" />

          {videoEnded && (
            <div
              style={{
                backgroundImage:
                  "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
              }}
              className="  left-0  z-[1]  full absolute inset-0  grid h-full place-content-center font-inter"
            >
              {!completedLectures.includes(subSectionId) && (
                <IconBtn
                  disabled={loading}
                  customClasses={"text-xl max-w-max px-4 mx-auto"}
                  text={!loading ? "Mark As Completed" : "Loading..."}
                  onclick={() => handleLectureCompletion()}
                />
              )}

              <IconBtn
                disabled={loading}
                onclick={() => {
                  if (playerRef?.current) {
                    playerRef.current?.seek(0);
                    playerRef.current?.play();
                    setVideoEnded(false);
                  }
                }}
                text="Rewatch"
                customClasses={"text-xl max-w-max px-4 mx-auto mt-2"}
              />

              <div className=" mt-2 sm:mt-8 flex min-w-[250px] justify-center gap-x-4 text-xl">
                {!isFirstVideo() && (
                  <button
                    disabled={loading}
                    onClick={gotToPrevVideo}
                    className=" px-5 py-2 text-richblack-5 bg-richblack-800 cursor-pointer rounded-md font-semibold"
                  >
                    Prev
                  </button>
                )}
                {!isLastVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToNextVideo}
                    className=" px-5 py-2 text-richblack-5 bg-richblack-800 cursor-pointer rounded-md font-semibold"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </Player>
      )}
      <h1 className=" text-richblack-5 text-2xl font-semibold mt-4">
        {videoData?.title}
      </h1>
      <p className=" text-richblack-50 text-sm font-medium mt-2 ">
        {videoData?.description}
      </p>
    </div>
  );
};

export default VideoDetails;
