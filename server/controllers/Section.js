const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async (req, res) => {
  try {
    const { sectionName, courseId } = req.body;

    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "All fields are Required",
      });
    }

    const newSection = await Section.create({
      sectionName: sectionName,
    });

    const updatedCourseDetails = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: { courseContent: newSection._id },
      },
      { new: true }
    )
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: "Section Created Successfully",
      updatedCourseDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to create the Section, please try again ",
      error: error.message,
    });
  }
};

exports.updateSection = async (req, res) => {
  try {
    const { sectionName, sectionId, courseId } = req.body;

    if (!sectionName || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "All fields are Required",
      });
    }

    //neeed to check wether we need to update the data in course array to aur not but it has the object id in it(done no need)
    const section = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true }
    );

    const updatedCourseDetails = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    return res.status(200).json({
      success: true,
      updatedCourseDetails,
      message: "Section updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,

      message: "Unable to update the Section, please try again",
    });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    //assuming that we are send params here
    //parmas se nhi hua
    const { sectionId, courseId } = req.body;
    await Section.findByIdAndDelete(sectionId);
    //TODO shall we need to delete the sectionid from the course array or not(done no need)

    const updatedCourseDetails = await Course.findById(courseId, { new: true })
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    return res.status(200).json({
      success: true,
      updatedCourseDetails,
      message: "Section Deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to delete the Section, please try again",
    });
  }
};
