const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const CourseProgress = require("../models/CourseProgress");
const mongoose = require("mongoose");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const RatingAndReview = require("../models/RatingAndReview");

require("dotenv").config();

exports.createCourse = async (req, res) => {
  try {
    let {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      category,
      instructions: _instructions,
      tag: _tag,
      status,
    } = req.body; //category ko categoryId likh dena chaiye jaise section ke case mai userId likha hai

    const thumbnail = req.files.thumbnailImage;

    const tag = JSON.parse(_tag);
    const instructions = JSON.parse(_instructions);

    console.log("tag", tag);
    console.log("instructions", instructions);

    //Validation
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !category ||
      !thumbnail ||
      !tag.length
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields are required while creating the course",
      });
    }

    if (!status || status === undefined) {
      status = "Draft";
    }

    //try only to use UserId not the instructorDetails
    const userId = req.user.id;
    const instructorDetails = await User.findById(userId);
    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor Details Not Found",
      });
    }

    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category Details Not Found",
      });
    }

    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn,
      price,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
      tag: tag,
      instructions: instructions,
      status: status,
    });

    //updating the User courses Array
    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      {
        $push: { courses: newCourse._id },
      },
      { new: true }
    );

    // updating the category course Array
    const updatedCategoryDetails = await Category.findByIdAndUpdate(
      { _id: categoryDetails._id },
      { $push: { courses: newCourse._id } },
      { new: true }
    );
    // .populate("course")
    // .exec();

    return res.status(200).json({
      success: true,
      message: "Course Created Successfully",
      data: newCourse,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create Course",
      error: error.message,
    });
  }
};

exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const updates = req.body;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "No Course Found",
      });
    }

    if (req.files) {
      console.log("UPDATE THUMBNAIL");
      const thumbnail = req.files.thumbnailImage;
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      );

      course.thumbnail = thumbnailImage.secure_url;
    }

    console.log("UPDATES HU MAI:", updates);
    console.log("UPDATED CATEGORY:", updates.category);

    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        if (key === "tag" || key === "instructions") {
          course[key] = JSON.parse(updates[key]);
        } else if (key === "category") {
          if (updates[key]) {
            const newCategoryId = updates.category;
            if (newCategoryId && newCategoryId !== course.category.toString()) {
              if (course.category) {
                await Category.updateOne(
                  { _id: course.category },
                  { $pull: { courses: courseId } },
                  { new: true }
                );
              }

              course.category = new mongoose.Types.ObjectId(newCategoryId);
              await Category.updateOne(
                { _id: newCategoryId },
                { $push: { courses: courseId } },
                { new: true }
              );
            }
          }
        } else {
          course[key] = updates[key];
        }
      }
    }

    await course.save();

    const updatedCourse = await Course.findOne({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();
    console.log("UPDATED COURSE HU MAI :", updatedCourse);
    console.log("NEW CATEGORY:", updatedCourse.category);
    return res.status(200).json({
      success: true,
      data: updatedCourse,
      message: "Course updated successfully",
    });
  } catch (error) {
    console.error(error);
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal SServer Error",
      error: error.message,
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const studentsEnrolled = course.studentsEnrolled;
    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      });
    }

    for (const studentId of studentsEnrolled) {
      const courseProgress = await CourseProgress.find({
        courseID: courseId,
        userId: studentId,
      });
      const courseProgressIds = courseProgress.map((progress) => progress._id);
      await User.findByIdAndUpdate(studentId, {
        $pull: { courseProgress: { $in: courseProgressIds } },
      });
    }

    //check
    await User.findByIdAndUpdate(
      userId,
      {
        $pull: { courses: courseId },
      },
      { new: true }
    );
    const courseSections = course.courseContent;
    for (const sectionId of courseSections) {
      const section = await Section.findById(sectionId);
      if (section) {
        const subSections = section.subSection;
        for (const subSectionId of subSections) {
          await SubSection.findByIdAndDelete(subSectionId);
        }
      }

      await Section.findByIdAndDelete(sectionId);
    }

    await Course.findByIdAndDelete(courseId);

    const categoryId = course.category;
    await Category.findByIdAndUpdate(categoryId, {
      $pull: { courses: courseId },
    });

    await CourseProgress.deleteMany({ courseID: courseId });

    await RatingAndReview.deleteMany({ course: courseId });

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

exports.getInstructorCourses = async (req, res) => {
  try {
    const instructorId = req.user.id;

    const instructorCourses = await Course.find({
      instructor: instructorId,
    })
      .sort({ createdAt: -1 })
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .populate({
        path: "studentsEnrolled",
        populate: {
          path: "courseProgress",
        },
      });

    if (!instructorCourses) {
      return res.status(404).json({
        success: false,
        message: "No Course Found",
      });
    }
    return res.status(200).json({
      success: true,
      data: instructorCourses,
      message: "All Courses Feteched Successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Failed to retrieve instructor courses",
    });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    //TODO:change the below statement vahi differnt multiple conditon joh dete hai
    const allCourses = await Course.find({});

    return res.status(200).json({
      success: true,
      message: "Data for all Courses fetched Successfully",
      allCourses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Cannot Fetch the all courses Data",
      error: error.message,
    });
  }
};

exports.getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Field is Required",
      });
    }

    const courseDetails = await Course.findById(courseId)
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("ratingAndReviews")
      .populate("category")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find the course with ${courseId} `,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Course Details fetched successfully ",
      data: courseDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching the Course Details",
    });
  }
};

exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    const courseDetails = await Course.findOne({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      });
    }
    console.log("CONTROLLER KE UNDER COURSE DEATILS:", courseDetails);

    let courseProgressCount = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    });

    console.log("COURSEID:", courseId);
    console.log("userId:", userId);
    console.log("courseProgressCount : ", courseProgressCount);

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount?.completedVideos
          : [],
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
