import React, { useEffect, useState } from "react";
import { buyCourse } from "../services/operations/studentFeaturesApi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCourseDetails } from "../services/operations/courseDetailApi";
import toast from "react-hot-toast";
import { GetAvgRating } from "../utils/avgRating";
import Error from "./Error";
import ConfirmationModal from "../components/common/ConfirmationModal";
import RatingStars from "../components/common/RatingStars";
import { TbInfoCircle } from "react-icons/tb";
import { formatDate } from "../services/formatDate";
import { HiOutlineGlobeAlt } from "react-icons/hi2";
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard";
import { GoDotFill } from "react-icons/go";
import { calculateTotalDuration } from "../utils/calculateTotalDuration";
import Footer from "../components/common/Footer";
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar";
import ReviewSlider from "../components/common/ReviewSlider";

const CourseDetails = ({ setProgress }) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.profile);
  const { paymentLoading } = useSelector((state) => state.course);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { courseId } = useParams();

  const [courseData, setCourseData] = useState(null);
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [isActive, setIsActive] = useState(Array(0));

  useEffect(() => {
    const getCourseFullDetails = async () => {
      setProgress(10);
      try {
        const result = await fetchCourseDetails(courseId);
        setCourseData(result);
        console.log("COURSE DATA:", result);
      } catch (error) {
        console.log("Could Not Fecth Course Details");
        toast.error("No Course Found");
      }
    };
    getCourseFullDetails();
  }, [courseId]);

  useEffect(() => {
    const count = GetAvgRating(courseData?.data?.ratingAndReviews);
    setAvgReviewCount(count);
  }, [courseData]);

  useEffect(() => {
    let lectures = 0;
    courseData?.data?.courseContent.forEach((sec) => {
      lectures += sec.subSection.length || 0;
    });
    setTotalNoOfLectures(lectures);
    setTimeout(() => {
      setProgress(100);
    }, 1000);
  }, [courseData]);

  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat(id)
        : isActive.filter((e) => e !== id)
    );
  };

  const handleBuyCourse = () => {
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch);
    } else {
      setConfirmationModal({
        text1: "You are not logged In",
        text2: "Please login to purchase the course",
        btn1Text: "Login",
        btn2Text: "Cancel",
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => setConfirmationModal(null),
      });
    }
  };

  if (loading || !courseData) {
    return (
      <div className=" spinner flex items-center justify-center absolute left-[50%] top-[50%]"></div>
    );
  }

  if (!courseData.success) {
    return (
      <div>
        <Error setProgress={setProgress} />
      </div>
    );
  }

  const {
    _id: course_id,
    courseName,
    courseDescription,
    thumbnail,
    whatYouWillLearn,
    price,
    courseContent,
    ratingAndReviews,
    instructor,
    studentsEnrolled,
    createdAt,
  } = courseData?.data;

  return (
    <div className=" flex w-full relative min-h-[calc(100vh-3.5rem)] ">
      <div className=" w-full">
        {/* Section -1 */}
        <section className="  bg-richblack-800 flex flex-col items-center justify-center mx-auto py-8 ">
          <div className="relative w-11/12 max-w-maxContent flex-col space-y-8 sm:flex sm:flex-row justify-between sm:items-center   items-start ">
            <div className=" flex  flex-col gap-3   lg:justify-center lg:w-[70%] lg:border-r-[2px] border-richblack-700 pr-6 ">
              <p className=" text-richblack-300 text-sm font-normal flex flex-row gap-2">
                <span className=" cursor-pointer" onClick={() => navigate("/")}>
                  Home
                </span>
                <span>/</span>
                <span>Learning</span>
                <span>/</span>
                <span className=" text-yellow-50 text-sm font-medium capitalize">
                  {courseData?.data?.category?.name}
                </span>
              </p>

              <p className=" text-richblack-5 text-3xl font-medium">
                {courseName}
              </p>

              <p className=" text-sm text-richblack-200 font-normal">
                {courseDescription}
              </p>

              <div className=" flex-col md:flex md:flex-row  gap-2 items-center">
                <div className=" flex items-center gap-2">
                  <span className=" text-yellow-100 text-base -mb-[3px] font-semibold">
                    {avgReviewCount || 0}
                  </span>

                  <RatingStars Review_Count={avgReviewCount} Star_Size={16} />
                </div>
                <div className=" flex mt-1 sm:mt-0  items-center gap-2">
                  <span className=" text-richblack-50 text-base font-normal ">
                    {`(${ratingAndReviews.length} ratings)`}
                  </span>

                  <span className=" text-richblack-50 text-base font-normal">
                    {`(${studentsEnrolled?.length} students enrolled)`}
                  </span>
                </div>
              </div>

              <p className=" text-richblack-25 text-base font-normal capitalize">{`Created by ${instructor?.firstName.toLowerCase()} ${instructor?.lastName.toLowerCase()}`}</p>

              <div className=" flex-col space-y-1 md:space-y-0 md:flex md:flex-row items-center gap-3">
                <div className=" flex flex-row text-sm items-center gap-2 text-richblack-25">
                  <TbInfoCircle className=" text-lg" />
                  <span className="">{`Created at ${formatDate(
                    createdAt
                  )}`}</span>
                </div>
                <div className=" flex flex-row items-center gap-2 text-richblack-25 text-sm">
                  <HiOutlineGlobeAlt className=" text-lg" />
                  English
                </div>
              </div>
            </div>

            <div className=" lg:absolute lg:top-0 lg:right-0 md:mx-auto sm:w-[calc(45%)] lg:w-[calc(30%-24px)] ">
              <CourseDetailsCard
                course={courseData?.data}
                setConfirmationModal={setConfirmationModal}
                handleBuyCourse={handleBuyCourse}
              />
            </div>
          </div>
        </section>

        {/* section 2 */}
        <section className="  bg-richblack-900 flex flex-col items-center justify-center mx-auto py-8 pb-11 ">
          <div className=" flex flex-col gap-12 w-11/12 max-w-maxContent ">
            {/* whatYouWillLearn Part */}
            <div className=" flex flex-col gap-3 justify-center lg:w-[70%] border-[1px] border-richblack-700 pr-6 p-8 ">
              <p className=" text-richblack-5 text-3xl font-medium">
                What you'll learn
              </p>
              <div className=" flex flex-col gap-2 text-richblack-50 text-sm font-medium">
                {whatYouWillLearn}
              </div>
            </div>

            {/* Course Content Part */}
            <div className=" flex flex-col  gap-4 justify-center lg:w-[70%]">
              <div className=" flex flex-col gap-2">
                <p className=" text-richblack-5 text-2xl font-semibold">
                  Course content
                </p>

                <div className=" flex  text-sm font-normal text-richblack-50 items-center justify-end sm:justify-between">
                  <div className=" hidden sm:flex flex-row gap-1 items-center">
                    <span>{courseContent?.length} sections</span>
                    <GoDotFill />
                    <span>{totalNoOfLectures} lectures</span>
                    <GoDotFill />
                    <span>{`${calculateTotalDuration(
                      courseData?.data
                    )} duration`}</span>
                  </div>
                  <div>
                    <button
                      className=" text-yellow-50 text-sm font-medium"
                      onClick={() => setIsActive([])}
                    >
                      Collapse all sections
                    </button>
                  </div>
                </div>
              </div>

              <div>
                {courseContent?.map((course, index) => (
                  <CourseAccordionBar
                    key={index}
                    isActive={isActive}
                    handleActive={handleActive}
                    course={course}
                  />
                ))}
              </div>
            </div>

            {/* Author Part */}
            <div className=" flex flex-col  gap-3 justify-center lg:w-[70%]">
              <p className=" text-richblack-5 text-2xl font-semibold">Author</p>
              <div className=" flex flex-row items-center gap-2">
                <img
                  src={
                    instructor?.image
                      ? instructor?.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                  }
                  alt="InstructorProfile"
                  loading="lazy"
                  className=" w-[52px] h-[52px] rounded-full object-cover"
                />

                <p className=" text-richblack-5 text-base font-medium capitalize">{`${instructor?.firstName.toLowerCase()} ${instructor?.lastName.toLowerCase()}`}</p>
              </div>
              <p className=" text-richblack-50 text-sm font-normal text-justify">
                {instructor?.additionalDetails?.about}
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className=" bg-richblack-900 flex flex-col items-center justify-center w-full">
          <div
            className=" w-11/12 max-w-maxContent  flex flex-col py-[70px] pb-[100px] gap-[52px] justify-between
        bg-richblack-900 text-white"
          >
            <h2 className=" text-center text-[36px] font-semibold  text-richblack-5">
              Reviews from other learners
            </h2>
            <ReviewSlider />
          </div>
        </section>

        {/* Footer */}
        <div className="w-full bg-richblack-800">
          <Footer></Footer>
        </div>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default CourseDetails;
