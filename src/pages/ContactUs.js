import React from "react";
import ContactUsForm from "../components/ContactPage/ContactUsForm";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { FaGlobeAmericas } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import Footer from "../components/common/Footer";
import { useEffect } from "react";
import ReviewSlider from "../components/common/ReviewSlider";

const ContactUs = ({ setProgress }) => {
  useEffect(() => {
    setProgress(66);

    setTimeout(() => {
      setProgress(100);
    }, 400);
  }, []);

  return (
    <div className="">
      <div className="w-11/12 max-w-maxContent flex flex-col items-center mx-auto py-[80px]">
        {/* section -1 */}
        <div className="flex flex-col items-center lg:items-start lg:flex-row w-full  gap-[52px] justify-between">
          {/* Left Part */}
          <div className="w-[90%] sm:w-[40%] h-max  flex flex-col gap-6 p-8 rounded-[12px] bg-richblack-800 text-richblack-200">
            {/* Chat on us Part */}
            <div className="flex flex-col gap-1">
              <div className="flex flex-row gap-[12px]">
                <HiChatBubbleLeftRight className="w-[25px] h-[25px]" />
                <h2 className=" text-lg text-richblack-5 font-bold">
                  Chat on us
                </h2>
              </div>

              <div className="flex flex-col gap-[2px]">
                <h2 className=" font-semibold text-sm text-richblack-200">
                  Our friendly team is here to help.
                </h2>
                <h2 className=" font-semibold text-sm text-richblack-200">
                  info@Studynotion.com
                </h2>
              </div>
            </div>

            {/* Visit Us Part */}
            <div className="flex flex-col gap-1">
              <div className="flex flex-row gap-[12px]">
                <FaGlobeAmericas className="w-[25px] h-[25px]" />
                <h2 className=" text-lg text-richblack-5 font-bold">
                  Visit us
                </h2>
              </div>

              <div className="flex flex-col gap-[2px]">
                <h2 className="  font-semibold  text-sm text-richblack-200">
                  Come and say hello at our office HQ.
                </h2>
                <h2 className="  font-semibold  text-sm text-richblack-200">
                  Rohini , Sector-16 , F-block ,
                </h2>
                <h2 className="  font-semibold  text-sm text-richblack-200">
                  New Delhi-110089
                </h2>
              </div>
            </div>

            {/* Call Part */}
            <div className="flex flex-col gap-1">
              <div className="flex flex-row gap-[12px]">
                <IoCall className="w-[25px] h-[25px]" />
                <h2 className=" text-lg text-richblack-5 font-bold">Call us</h2>
              </div>

              <div className="flex flex-col gap-[2px]">
                <h2 className=" font-semibold text-sm text-richblack-200">
                  Mon - Fri From 8am to 5pm
                </h2>
                <h2 className=" font-semibold text-sm text-richblack-200">
                  +123 456 7890
                </h2>
              </div>
            </div>
          </div>

          {/* Right Part */}

          <div className=" w-[100%] md:w-[82%]  lg:w-[55%] flex flex-col gap-8 rounded-[12px] border border-richblack-600  p-2 lg:p-14  ">
            <div className="flex flex-col gap-3 ">
              <h2 className="text-4xl font-bold text-richblack-5">
                Got a Idea? We’ve got the skills. Let’s team up
              </h2>
              <h2 className=" text-richblack-300 font-semibold text-base">
                Tell us more about yourself and what you’re got in mind.
              </h2>
            </div>
            <div className=" -mt-6 w-full ">
              <ContactUsForm></ContactUsForm>
            </div>
          </div>
        </div>

        <section
          className="flex w-full flex-col py-[70px] pb-[20px] gap-[52px] justify-between
        bg-richblack-900 text-white
      "
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

export default ContactUs;
