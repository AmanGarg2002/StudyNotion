const express = require("express");
const router = express.Router();

//import Course Handler
const {
  createCourse, //done
  getAllCourses,
  getCourseDetails,
  editCourse, //done
  getInstructorCourses, //done
  deleteCourse, //done
  getFullCourseDetails,
} = require("../controllers/Course");

//import Category Handler
const {
  createCategory,
  showAllCategory,
  categoryPageDetails,
} = require("../controllers/Category");

//import Section Handler
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section");

//import SubSection Handler
const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/Subsection");

//import RatingAndReview Handler
const {
  createRating,
  getAverageRating,
  getAllRating,
} = require("../controllers/RatingAndReview");

const { updateCourseProgress } = require("../controllers/courseProgress");

//middlewares Import
const {
  auth,
  isStudent,
  isInstructor,
  isAdmin,
} = require("../middlewares/auth");

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

//course can be created by the instructor only
router.post("/createCourse", auth, isInstructor, createCourse); //verified
router.put("/editCourse", auth, isInstructor, editCourse);
router.delete("/deleteCourse", auth, isInstructor, deleteCourse);

router.post("/addSection", auth, isInstructor, createSection); //verified
router.put("/updateSection", auth, isInstructor, updateSection); //verified
router.delete("/deleteSection", auth, isInstructor, deleteSection); //verified(body ya params checkkarliyo)

router.post("/addSubSection", auth, isInstructor, createSubSection); //verified
router.put("/updateSubSection", auth, isInstructor, updateSubSection); //verified
router.delete("/deleteSubSection", auth, isInstructor, deleteSubSection); //verified

router.post("/createRating", auth, isStudent, createRating);
// router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRating);

router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses);
router.post("/getFullCourseDetails", auth, getFullCourseDetails);

router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************

//category can be created by admin only
router.post("/createCategory", auth, isAdmin, createCategory); //verified

// ********************************************************************************************************
//                                      Normal routes
// ********************************************************************************************************

//get all courses
router.get("/getAllCourses", getAllCourses); //verified
//get specific course detail
router.post("/getCourseDetails", getCourseDetails); //verified

//get all Category
router.get("/showAllCategories", showAllCategory); //verified

//get specific category Page detail
router.post("/getCategoryPageDetails", categoryPageDetails);

module.exports = router;
