const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();

exports.createSubSection = async (req, res) => {
  try {
    const { sectionId, title, description } = req.body;
    const video = req.files.videoFile;

    if (!sectionId || !title || !description || !video) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Required",
      });
    }

    const uploadDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    );

    //check the value by only passing titlt,td,desc,videourl below
    const subSectionDetails = await SubSection.create({
      title: title,
      timeDuration: `${uploadDetails.duration}`,
      description: description,
      videoUrl: uploadDetails.secure_url,
    });

    //check the value by removing _id is it same or different
    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $push: { subSection: subSectionDetails._id },
      },
      { new: true }
    )
      .populate("subSection")
      .exec(); //check for error

    //below hw clg is the homework
    console.log("Updated Section in the Subsection:", updatedSection);

    return res.status(200).json({
      success: true,
      message: "Sub Section Created Successfully",
      data: updatedSection,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      messgae: "Unable to create the SubSection, Please try Again",
      error: error.message,
    });
  }
};

exports.updateSubSection = async (req, res) => {
  try {
    const { title, description, subSectionId, sectionId } = req.body;

    const video = req.files?.videoFile;
    let uploadDetails;

    if (video) {
      uploadDetails = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_NAME
      );
    }

    // updated subsection is below
    const subSection = await SubSection.findByIdAndUpdate(
      { _id: subSectionId },
      {
        title: title,
        timeDuration: uploadDetails ? `${uploadDetails.duration}` : undefined,
        description: description,
        videoUrl: uploadDetails ? uploadDetails.secure_url : undefined,
      },
      { new: true }
    );

    const updatedSection = await Section.findById(sectionId)
      .populate("subSection")
      .exec();

    return res.status(200).json({
      success: true,
      data: updatedSection,
      message: "SubSection Updated Successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Unable to Update the SubSection. Please try Again",
    });
  }
};

exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId } = req.body;

    //TODO shall we need to delete the subsectionid from the section array or not
    await Section.findByIdAndUpdate(sectionId, {
      $pull: { subSection: subSectionId },
    });

    await SubSection.findByIdAndDelete({ _id: subSectionId });

    const updatedSection = await Section.findById(sectionId)
      .populate("subSection")
      .exec();

    return res.status(200).json({
      success: true,
      data: updatedSection,
      message: "SubSection Deleted Successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message:
        "Something went wrong will deleting the SubSection , Please try Again",
    });
  }
};
