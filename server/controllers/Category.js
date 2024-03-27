const mongoose = require("mongoose");
const Category = require("../models/Category");
const Course = require("../models/Course");

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

//Create category Handler
exports.createCategory = async (req, res) => {
  try {
    console.log("REQUEST BODY", req);
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All Fields Are Required",
      });
    }

    const categoryDetails = await Category.create({
      name: name,
      description: description,
    });
    console.log(categoryDetails);

    return res.status(200).json({
      success: true,
      message: "Category Created Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



exports.showAllCategory = async (req, res) => {
  try {
    const allcategory = await Category.find(
      {},
      { name: true, description: true }
    ).populate("courses");
    res.status(200).json({
      success: true,
      message: "All Category Returned Successfully",
      allcategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;

    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: [{ path: "ratingAndReviews" }, { path: "instructor" }],
      })

      .exec();

    if (!selectedCategory) {
      return res.status(400).json({
        success: false,
        message: "Invalid Category Data Not Found",
      });
    }

    const differntCategory = await Category.find({
      _id: { $ne: categoryId },
    })
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: [{ path: "ratingAndReviews" }, { path: "instructor" }],
      })
      .exec();
      

    const oneDifferntCategory = await Category.findOne(
      differntCategory[getRandomInt(differntCategory?.length)]._id
    ).populate({
      path: "courses",
      match: { status: "Published" },
      populate: { path: "instructor" },
    });

    //top selling courses

    const topSellingCourses = await Course.find({ status: "Published" })
      .limit(10)
      .sort({ studentsEnrolled: -1 })
      .populate({
        path: "instructor",
      })
      .populate("ratingAndReviews");

    return res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differntCategory,
        topSellingCourses,
        oneDifferntCategory,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
