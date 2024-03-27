const express = require("express");
const router = express.Router();
const { auth, isStudent, isInstructor } = require("../middlewares/auth");

//import Profile Handler
const {
  updateProfile,
  deleteAccount,
  getAllUserDetails,
  updateDisplayPicture,
  removeDisplayPicture,
  getEnrolledCourses,
  instructorDashboard,
} = require("../controllers/Profile");

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************

router.put("/updateProfile", auth, updateProfile); //verified
router.delete("/deleteProfile", auth, deleteAccount); //verified
router.get("/getUserDetails", auth, getAllUserDetails); //verified
router.put("/updateDisplayPicture", auth, updateDisplayPicture); //verified
router.put("/removeDisplayPicture", auth, removeDisplayPicture);
router.get("/getEnrolledCourses", auth, isStudent, getEnrolledCourses);
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard);

module.exports = router;
