import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode, Autoplay } from "swiper/modules";

import CourseCardCatalog from "./Course_Card";

const CourseSlider = ({ Courses, additonalCourses }) => {
  return (
    <>
      {Courses?.length || additonalCourses?.length ? (
        <Swiper
          loop={true}
          slidesPerView={1}
          spaceBetween={30}
          freeMode={true}
          modules={[Autoplay, FreeMode]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {Courses?.map((course, index) => (
            <SwiperSlide key={index}>
              <CourseCardCatalog course={course} Height="310" />
            </SwiperSlide>
          ))}
          {additonalCourses?.map((course, index) => (
            <SwiperSlide key={index}>
              <CourseCardCatalog course={course} Height="310" />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className=" text-3xl text-center py-4 text-richblack-600">
          No Course Found
        </p>
      )}
    </>
  );
};

export default CourseSlider;
