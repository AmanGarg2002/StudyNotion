import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RatingStars from "../../common/RatingStars";
import { GetAvgRating } from "../../../utils/avgRating";

const CourseCardCatalog = ({ course, Height }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(course?.ratingAndReviews);
    setAvgReviewCount(count);
  }, [course]);

  return (
    <div>
      <Link to={`/courses/${course._id}`}>
        <div className=" flex flex-col  gap-5">
          <div className={`h-[310px]`}>
            <img
              src={`${course?.thumbnail}`}
              alt="CourseThumbnail"
              loading="lazy"
              className={`rounded-xl w-full h-full`}
            />
          </div>

          <div className=" flex flex-col  gap-[9px]">
            <div className=" flex flex-col  gap-2">
              <p className=" text-richblack-5 text-xl font-medium capitalize truncate">
                {course?.courseName}
              </p>
              <p className=" text-richblack-300 text-base font-normal capitalize">
                {course?.instructor?.firstName?.toLowerCase()}{" "}
                {course?.instructor?.lastName?.toLowerCase()}
              </p>
            </div>

            <div className=" flex flex-row gap-2">
              <span className=" text-yellow-100 text-base font-semibold">
                {avgReviewCount || 0}
              </span>
              <RatingStars Review_Count={avgReviewCount} />
              <span className=" text-richblack-400 text-base font-normal">
                ( {course?.ratingAndReviews?.length} Ratings )
              </span>
            </div>

            <p className=" text-richblack-5  text-xl font-semibold">
              Rs. {course?.price}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CourseCardCatalog;
