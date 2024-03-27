import React from "react";
import ContactUsForm from "../../ContactPage/ContactUsForm";

const ContactFormSection = () => {
  return (
    <section className=" bg-richblack-900 w-11/12 max-w-maxContent flex flex-col items-center mx-auto  py-[90px] pb-0">
      <div className="flex flex-col lg:w-[47%]  mx-auto gap-8 ">
        <div className="flex flex-col gap-3 text-center">
          <h1 className=" text-richblack-5 font-semibold text-4xl">
            Get in Touch
          </h1>
          <p className=" text-richblack-300 font-medium text-base font-inter">
            We’d love to here for you, Please fill out this form.
          </p>
        </div>

        <div className="flex flex-col justify-start">
          <ContactUsForm></ContactUsForm>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
