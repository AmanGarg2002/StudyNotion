const Course = require("../models/Course");
const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const CourseProgress = require("../models/CourseProgress");
const RatingAndReview = require("../models/RatingAndReview");
const Section = require("../models/Section");
const cloudinary = require("cloudinary").v2;
const schedule = require("node-schedule");
require("dotenv").config();

exports.updateProfile = async (req, res) => {
  try {
    const {
      gender,
      dateOfBirth,
      about,
      contactNumber,
      firstname,
      lastname,
      countrycode,
    } = req.body;
    const id = req.user.id;

    const userDetails = await User.findById(id);
    const profileId = userDetails.additionalDetails;
    // let profileDetails = await Profile.findById(profileId);

    await Profile.findByIdAndUpdate(
      profileId,
      {
        dateOfBirth: dateOfBirth || Profile.dateOfBirth,
        gender: gender || Profile.gender,
        about: about || Profile.about,
        contactNumber: contactNumber || Profile.contactNumber,
        countryCode: countrycode || Profile.countryCode,
      },
      { new: true }
    );

    const updatedUser = await User.findByIdAndUpdate(
      { _id: id },
      {
        firstName: firstname,
        lastName: lastname,
      },
      { new: true }
    )
      .populate("additionalDetails")
      .exec();

    // profileDetails.dateOfBirth = dateOfBirth || profileDetails.dateOfBirth;
    // profileDetails.gender = gender || profileDetails.gender;
    // profileDetails.about = about || profileDetails.about;
    // profileDetails.contactNumber =
    //   contactNumber || profileDetails.contactNumber;
    // profileDetails.countryCode = countrycode || profileDetails.countryCode;

    // await profileDetails.save();

    return res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to update the User Profile Data,Kindly try again",
      error: error.message,
    });
  }
};

exports.deleteAccount = async (req, res) => {
  const currentdate = Date.now();
  const threeDaysLater = new Date(currentdate + 3 * 24 * 60 * 60 * 1000);

  const job = schedule.scheduleJob(threeDaysLater, async function () {
    try {
      const id = req.user.id;
      const userDetails = await User.findById(id);
      if (!userDetails) {
        return res.status(404).json({
          success: falsse,
          message: "User Not Data Found",
        });
      }

      await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });

      //Enrolled student ke array se bhi delete karna hoga
      for (const courseId of userDetails.courses) {
        await Course.findByIdAndUpdate(courseId, {
          $pull: { studentsEnrolled: id },
        });
      }

      await RatingAndReview.deleteMany({ user: id });

      await User.findByIdAndDelete({ _id: id });

      await CourseProgress.deleteMany({ userId: id });

      return res.status(200).json({
        success: true,
        message: "User Deleted Successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Unable to Delete the Account",
        error: error.message,
      });
    }
  });
};

exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture;
    const userId = req.user.id;

    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    );

    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    )
      .populate("additionalDetails")
      .exec();

    res.status(200).json({
      success: true,
      message: "Updated Profile Successfully",
      data: updatedProfile,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.removeDisplayPicture = async (req, res) => {
  try {
    const imageId = req.body;
    console.log("BACKEND IMAGE:", imageId);
    const userId = req.user.id;
    if (!imageId) {
      return res.status(400).json({
        success: false,
        message: "Image Id is required to remove",
      });
    }

    const result = await cloudinary.uploader.destroy(imageId);
    console.log("BACKEND RESULT:", result);

    const updatedProfile = await User.findByIdAndUpdate(
      {
        _id: userId,
      },
      { $set: { image: "" } },
      { new: true }
    )
      .populate("additionalDetails")
      .exec();

    console.log("BACKEND USER:", updatedProfile);
    res.status(200).json({
      success: true,
      message: "Removed Profile Successfully",
      data: updatedProfile,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Unable to remove the Profile Picture ",
    });
  }
};

exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;

    let userDetails = await User.findOne({ _id: userId })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec();
    userDetails = userDetails.toObject();
    console.log("USER DETAILS:", userDetails);
    var subSectionLength = 0;
    for (var i = 0; i < userDetails.courses.length; i++) {
      subSectionLength = 0;
      for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
        subSectionLength +=
          userDetails.courses[i].courseContent[j].subSection.length;
      }
      console.log("TOTAL LECTURES IS:", subSectionLength);
      let courseProgressCount = await CourseProgress.findOne({
        courseID: userDetails.courses[i]._id,
        userId: userId,
      });
      console.log("COURSE ID:", courseProgressCount);
      courseProgressCount = courseProgressCount?.completedVideos.length;
      console.log("Completed video length:", courseProgressCount);
      if (subSectionLength === 0) {
        console.log("NO LECTURES THERE");
        userDetails.courses[i].progressPercentage = 100;
      } else {
        const multipier = Math.pow(10, 2);
        userDetails.courses[i].progressPercentage =
          Math.round(
            (courseProgressCount / subSectionLength) * 100 * multipier
          ) / multipier;
      }
    }

    if (!userDetails) {
      return res.status(500).json({
        success: false,
        message: "No User Found",
      });
    }

    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
      message: "Unable to get the enrolled courses",
    });
  }
};

exports.getAllUserDetails = async (req, res) => {
  try {
    const id = req.user.id;

    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .populate({
        path: "invoices",
        options: { sort: { createdAt: -1 } },
      })
      .exec();
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: "User Data Not Found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User Data Fetched Successfully",
      userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching all users details",
      error: error.message,
    });
  }
};

exports.instructorDashboard = async (req, res) => {
  try {
    const courseDetails = await Course.find({ instructor: req.user.id });

    if (!courseDetails || courseDetails.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Data Found",
      });
    }

    const courseData = await Promise.all(
      courseDetails.map(async (course) => {
        const totalStudentsEnrolled = course.studentsEnrolled.length;
        const totalAmountGenerated = totalStudentsEnrolled * course.price;

        //Extra logic trying for students progress data to get in instructor dashboard

        //Paticular course, students enrolled getting their id's
        let allStudentData = [];
        if (totalStudentsEnrolled > 0) {
          const getAllStudentIdsInSpecificCourse = course.studentsEnrolled;

          console.log("ALL STUDENT IDS:", getAllStudentIdsInSpecificCourse);

          //studentdata and usne complete kya kiya uska object ka array

          for (const studentId of getAllStudentIdsInSpecificCourse) {
            //finding data for particular student

            try {
              const studentData = await User.findById({
                _id: studentId,
              }).populate("courseProgress");

              //Finding Only that course progress
              const particularCourseProgress = await CourseProgress.findOne({
                courseID: course._id,
                userId: studentData._id,
              }).populate("completedVideos");

              let totalLectureAviable = 0;
              const sectionIds = course.courseContent;
              for (const sectionId of sectionIds) {
                const section = await Section.findById({ _id: sectionId });
                totalLectureAviable += section.subSection.length;
              }

              let completedVideosDataOfStudent =
                particularCourseProgress.completedVideos.length;
              allStudentData.push({
                studentData,
                completedVideosDataOfStudent,
                totalLectureAviable,
              });
            } catch (error) {
              console.log("ERROR WHILE FINDING DATA FOR STUDENT", error);
            }
          }
        }

        //creating new object with the additional data
        const courseDataWithStats = {
          _id: course._id,
          courseName: course.courseName,
          courseDescription: course.courseDescription,
          totalAmountGenerated,
          totalStudentsEnrolled,
          allStudentData,
        };
        return courseDataWithStats;
      })
    );

    return res.status(200).json({
      success: true,
      message: "Data Feteched Successfully",
      courses: courseData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
