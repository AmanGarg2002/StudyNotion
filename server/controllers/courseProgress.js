const CourseProgress = require("../models/CourseProgress");
const SubSection = require("../models/SubSection");

exports.updateCourseProgress = async (req, res) => {
  const { courseId, subSectionId } = req.body;
  const userId = req.user.id;

  try {
    const subSection = await SubSection.findById(subSectionId);
    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "Invalid SubSection",
      });
    }
    if (!userId) {
      console.log("USER NHI HAI");
    }
    console.log("COURSEID:", courseId);
    console.log("subSectionId:", subSectionId);
    console.log("userId:", userId);

    let courseProgress = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    });

    console.log("ALL GOOD");
    console.log("HAI KYA TERPE:", courseProgress);

    if (!courseProgress) {
      return res.status(404).json({
        success: false,
        message: "Course Progress does not exists",
      });
    } else {
      if (courseProgress.completedVideos.includes(subSectionId)) {
        return res.status(400).json({
          success: false,
          error: "SubSection is already Completed",
        });
      }

      courseProgress.completedVideos.push(subSectionId);
    }

    await courseProgress.save();
    return res.status(200).json({
      success: true,
      message: "Course Progress Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
