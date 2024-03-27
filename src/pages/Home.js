import React, { useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import InstructorSection from "../components/core/HomePage/InstructorSection";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import Footer from "../components/common/Footer";
import ReviewSlider from "../components/common/ReviewSlider";
import Image from "../assets/Images/TimelineImage.png";

const Home = ({ setProgress }) => {
  useEffect(() => {
    setProgress(40);

    setTimeout(() => {
      setProgress(100);
    }, 1000);
  }, []);

  return (
    <div>
      {/* Section-1 */}
      <div className=" relative mx-auto flex flex-col w-11/12 items-center max-w-maxContent text-white justify-between gap-[38px]">
        <Link to={"/signup"}>
          <div
            className="group btn1  mt-16 mx-auto rounded-full bg-richblack-800  text-richblack-200 font-bold 
             transition-all duration-200 hover:scale-95  p-1 w-fit 
            flex justify-center items-center"
          >
            <div
              className="flex flex-row  gap-[10px] items-center  rounded-full  px-10 py-[5px] group-hover:bg-richblack-900
              transition-all duration-200"
            >
              <span className=" ">Become an Instructor</span>
              <FaArrowRight className="h-[16px] w-[16px]" />
            </div>
          </div>
        </Link>

        <div className=" font-semibold text-[36px] leading-[44px] w-full text-center text-richblack-5 -space-x-[0.72px]">
          Empower Your Future with
          <HighlightText text={"Coding Skills"}></HighlightText>
        </div>

        <div className="w-[90%] -mt-6 leading-8 text-richblack-300 text-[19px] text-center font-bold">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        <div className="flex flex-row gap-[24px] mt-1 ">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>
          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>

        <div className=" h-auto max-w-full mx-3 my-7  shadow-blue-200 shadow-[10px_-5px_50px_-5px] ">
          <video
            autoPlay
            muted
            loop
            poster={Image}
            className=" shadow-[19px_19px]"
          >
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        {/* Code Section-1 */}
        <div className="py-[70px]">
          <CodeBlocks
            position={"lg:flex-row flex-col"}
            heading={
              <div className=" font-bold text-[36px] leading-[44px] w-full text-left text-richblack-5 -space-x-[0.72px]">
                Unlock your
                <HighlightText text={"coding potential"}></HighlightText> with
                our online courses.
              </div>
            }
            subheading={`Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.`}
            ctabtn1={{
              btnText: "Try it Yourself",
              active: true,
              linkto: "/signup",
            }}
            ctabtn2={{
              btnText: "Learn More",
              active: false,
              linkto: "/login",
            }}
            backGroundGradient="from-[#8A2BE2] via-[#FFA500] to-[#F8F8FF]"
            code={`<!DOCTYPE html>
                   <html lang="en"> 
                   <head>
                   <title> This is myPage </title>
                   </head> 
                   <body>
                   <h1> <a href="/"> Header </a> </h1> <nav>
                   <a href="/one"> One </a> 
                   <a href="/two"> Two </a> <a href="/three"> Three </a>
                   </nav> </body>`}
            Color={"text-yellow-25"}
          ></CodeBlocks>
        </div>

        {/* Code Section-2 */}
        <div className="sm:py-[70px] sm:mb-[44px]  ">
          <CodeBlocks
            position={"lg:flex-row-reverse  flex-col"}
            heading={
              <div className=" font-bold text-[36px] leading-[44px] w-full text-left text-richblack-5 -space-x-[0.72px]">
                Start
                <HighlightText text={"coding in"}></HighlightText>
                <br></br>
                <HighlightText text={"seconds"}></HighlightText>
              </div>
            }
            subheading={`Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.`}
            ctabtn1={{
              btnText: "Continue Lesson",
              active: true,
              linkto: "/signup",
            }}
            ctabtn2={{
              btnText: "Learn More",
              active: false,
              linkto: "/login",
            }}
            backGroundGradient="from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]"
            code={`import React from "react";
                  import CTAButton from "./Button";
                  import TypeAnimation from "react-type";
                  import { FaArrowRight } from "react-icons/fa";

                  const Home = () => {
                  return (
                  <div>Home</div>
                  )
                  }
                  export default Home;`}
            Color={"text-richblack-5"}
          ></CodeBlocks>
        </div>

        <ExploreMore />
      </div>

      {/* Section-2 */}
      <div className=" -mt-[100px] bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg w-[100vw] ">
          <div className="w-11/12 max-w-maxContent mx-auto flex items-center justify-center h-[320px]">
            <div className="text-white flex flex-row gap-[24px]">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex flex-row items-center justify-center gap-[8px]">
                  Explore Full Catalog
                  <FaArrowRight></FaArrowRight>
                </div>
              </CTAButton>

              <CTAButton active={false} linkto={"/signup"}>
                Learn More
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="w-11/12 max-w-maxContent mx-auto flex flex-col py-[70px] gap-[52px] pb-[20px]">
          {/* Job Demand Section */}
          <div className="flex flex-col lg:flex-row gap-[32px] lg:gap-[12px]  justify-between">
            {/* Left Part */}
            <div className="font-semibold text-[36px] leading-[44px]  lg:w-[48%]">
              Get the skills you need for a
              <HighlightText text={"job that is in demand."}></HighlightText>
            </div>

            {/* Right Part */}
            <div className="flex flex-col gap-[36px] lg:w-[40%] items-start">
              <span className=" font-medium text-[17px] font-inter leading-6 text-richblack-700">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </span>

              <CTAButton active={true} linkto={"/signup"}>
                Learn More
              </CTAButton>
            </div>
          </div>

          <TimelineSection />
        </div>

        <div className="w-11/12 max-w-maxContent mx-auto flex flex-col py-[70px] gap-[52px] pb-[90px]">
          <LearningLanguageSection />
        </div>
      </div>

      {/* Section-3*/}
      <div
        className="w-11/12 max-w-maxContent mx-auto flex flex-col py-[70px] gap-[52px] pb-[100px] justify-between
        bg-richblack-900 text-white
      "
      >
        <InstructorSection />

        <h2 className=" text-center text-[36px] font-semibold mt-10">
          Reviews from other learners
        </h2>
        <ReviewSlider />
      </div>

      {/* Footer */}
      <div className="w-full bg-richblack-800">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Home;
