import React from "react";
import HighlightText from "../components/core/HomePage/HighlightText";
import banner1 from "../assets/Images/aboutus1.webp";
import banner2 from "../assets/Images/aboutus2.webp";
import banner3 from "../assets/Images/aboutus3.webp";
import TextOrange from "../components/core/AboutPage/TextOrange";
import { useEffect } from "react";
import Footer from "../components/common/Footer";
import FoundingStory from "../assets/Images/FoundingStory.png";
import Quote from "../components/core/AboutPage/Quote";
import StatsComponent from "../components/core/AboutPage/StatsComponent";
import LearningGrid from "../components/core/AboutPage/LearningGrid";
import ContactFormSection from "../components/core/AboutPage/ContactFormSection";
import ReviewSlider from "../components/common/ReviewSlider";

const About = ({ setProgress }) => {
  useEffect(() => {
    setProgress(67);

    setTimeout(() => {
      setProgress(100);
    }, 900);
  }, []);

  return (
    <div>
      <div>
        {/* Section -1 */}
        <section className="  bg-richblack-800  flex flex-col items-center  py-[80px] gap-12 ">
          <div className=" w-11/12 max-w-maxContent flex flex-col gap-[32px]">
            <div className="   flex flex-col items-center mx-auto gap-4 ">
              <header className=" font-semibold text-[36px] leading-[44px] w-full text-center text-richblack-5 tracking-[0.75px]">
                Driving Innovation in Online Education for a{" "}
                <div>
                  {" "}
                  <HighlightText text={"Brighter Future"} />
                </div>
              </header>

              <p className=" w-full lg:w-[65%] font-inter text-richblack-300  text-center font-semibold">
                Studynotion is at the forefront of driving innovation in online
                education. We're passionate about creating a brighter future by
                offering cutting-edge courses, leveraging emerging technologies,
                and nurturing a vibrant learning community.
              </p>
            </div>

            <div className="  top-[60%] flex flex-row justify-center flex-wrap w-[100%] mx-auto  gap-11">
              <img
                src={banner1}
                alt="BannerImage1"
                loading="lazy"
                className=" shadow-blue-200 shadow-[0px_0px_15px_1px]"
              />
              <img
                src={banner2}
                alt="BannerImage2"
                loading="lazy"
                className=" shadow-blue-200 shadow-[0px_0px_15px_1px]"
              />
              <img
                src={banner3}
                alt="BannerImage3"
                loading="lazy"
                className=" shadow-blue-200 shadow-[0px_0px_15px_1px]"
              />
            </div>
          </div>
        </section>

        {/* Section-2 */}
        <Quote />

        <div className="  bg-richblack-700 w-full h-[1px] mt-[90px]"></div>

        {/* Section -3 */}
        <section className=" bg-richblack-900 flex flex-col items-center gap-[180px] mx-auto  py-[90px]">
          <div className=" w-11/12 max-w-maxContent text-richblack-300 gap-[100px]  items-center flex flex-col lg:flex-row justify-between ">
            {/* Left Part */}
            <div className="flex flex-col gap-6 w-full lg:w-[40%] text-justify">
              <p
                className=" text-3xl md:text-4xl font-semibold bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] text-transparent
                 bg-clip-text 
              "
              >
                Our Founding Story
              </p>

              <p className=" text-base font-medium">
                Our e-learning platform was born out of a shared vision and
                passion for transforming education. It all began with a group of
                educators, technologists, and lifelong learners who recognized
                the need for accessible, flexible, and high-quality learning
                opportunities in a rapidly evolving digital world.
              </p>

              <p className=" text-base font-medium">
                As experienced educators ourselves, we witnessed firsthand the
                limitations and challenges of traditional education systems. We
                believed that education should not be confined to the walls of a
                classroom or restricted by geographical boundaries. We
                envisioned a platform that could bridge these gaps and empower
                individuals from all walks of life to unlock their full
                potential.
              </p>
            </div>

            {/* Right Part */}
            <div>
              <img
                src={FoundingStory}
                alt="FoundingStory"
                loading="lazy"
                className="shadow-[0px_0px_24px_0px] shadow-[#FC6767]  "
              />
            </div>
          </div>

          <div className=" w-11/12 max-w-maxContent text-richblack-300 mx-auto flex  gap-[100px]  flex-col lg:flex-row items-center justify-between ">
            {/* Left Part */}
            <div className="flex flex-col gap-[30px] w-full lg:w-[40%] text-justify">
              <TextOrange text={"Our Vision"} active={false}></TextOrange>
              <p className=" text-base font-medium">
                With this vision in mind, we set out on a journey to create an
                e-learning platform that would revolutionize the way people
                learn. Our team of dedicated experts worked tirelessly to
                develop a robust and intuitive platform that combines
                cutting-edge technology with engaging content, fostering a
                dynamic and interactive learning experience.
              </p>
            </div>

            {/* Right Part */}
            <div className="flex flex-col gap-[30px] w-full lg:w-[40%] text-justify">
              <HighlightText text={"Our Mission"}></HighlightText>
              <p className=" text-base font-medium ">
                Our mission goes beyond just delivering courses online. We
                wanted to create a vibrant community of learners, where
                individuals can connect, collaborate, and learn from one
                another. We believe that knowledge thrives in an environment of
                sharing and dialogue, and we foster this spirit of collaboration
                through forums, live sessions, and networking opportunities.
              </p>
            </div>
          </div>
        </section>

        {/* Section -4 */}
        <StatsComponent />

        {/* Section -5 */}
        <LearningGrid />

        {/* Form Part */}
        <ContactFormSection />

        {/* Section -6 */}
        <section
          className="w-11/12 max-w-maxContent mx-auto flex flex-col py-[70px] gap-[52px] pb-[100px] justify-between
        bg-richblack-900 text-white"
        >
          <h2 className=" text-center text-[36px] font-semibold  text-richblack-5">
            Reviews from other learners
          </h2>
          <ReviewSlider />
        </section>
      </div>

      {/* Footer */}
      <div className="w-full bg-richblack-800">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default About;
