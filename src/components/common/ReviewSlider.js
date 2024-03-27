import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode, Autoplay } from "swiper/modules";
import RatingStars from "./RatingStars";
import { apiConnector } from "../../services/apiconnector";
import { ratingsEndpoints } from "../../services/apis";

const ReviewSlider = () => {
  const [reviews, setReviews] = useState([]);
  const truncateWords = 15;

  useEffect(() => {
    const fetchAllReviews = async () => {
      const { data } = await apiConnector(
        "GET",
        ratingsEndpoints.REVIEWS_DETAILS_API
      );

      console.log("LOGGOING DATA:", data);

      if (data?.success) {
        setReviews(data?.data.sort(() => 0.5 - Math.random()));
      }
      console.log("REVIEWS:", reviews);
    };
    fetchAllReviews();
  }, []);

  return (
    <div className=" text-white">
      <div className=" h-[190px] max-w-maxContentTab  lg:max-w-maxContent mx-auto">
        {reviews.length === 0 ? (
          <p className=" text-center text-3xl text-richblack-400">
            No Reviews Given By Learners
          </p>
        ) : (
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            freeMode={true}
            modules={[Autoplay, FreeMode]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            allowSlidePrev={true}
            allowSlideNext={true}
            grabCursor={false}
            onSwiper={(swiper) => {
              swiper.allowTouchMove = false;
            }}
            className=" w-full"
          >
            {reviews.map(
              (review) =>
                review?.user && (
                  <SwiperSlide key={review._id}>
                    <div className=" flex flex-col gap-3 bg-richblack-800 p-3 text-sm text-richblack-25 rounded-md">
                      <div className=" flex items-center gap-4">
                        <img
                          src={
                            review?.user?.image
                              ? review?.user?.image
                              : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                          }
                          alt="Profile Picture"
                          loading="lazy"
                          className=" h-9 w-9 rounded-full object-cover"
                        />

                        <div className=" flex flex-col">
                          <h2 className=" font-semibold text-richblack-5 truncate capitalize">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h2>
                          <h2 className=" text-richblack-200 font-medium text-xs truncate">
                            {review?.user?.email}
                          </h2>
                        </div>
                      </div>

                      <div
                        className="course-name-container  text-xs text-richblack-200 capitalize"
                        style={{ maxHeight: "32px", overflow: "hidden" }}
                      >
                        {review?.course?.courseName}
                      </div>

                      <div
                        className="  font-medium text-xs text-richblack-100 overflow-hidden capitalize "
                        style={{
                          height: "64px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 4,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {`" ${review?.review}`}
                      </div>
                      <div className=" flex items-center gap-2 -mt-1">
                        <h3 className=" text-yellow-100 font-semibold text-lg mt-1">
                          {review?.rating.toFixed(1)}
                        </h3>
                        <RatingStars Review_Count={review?.rating} />
                      </div>
                    </div>
                  </SwiperSlide>
                )
            )}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default ReviewSlider;
