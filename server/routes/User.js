const express = require("express");
const router = express.Router();

//import Auth Handler
const {
  sendOTP,
  signUp,
  login,
  changePassword,
} = require("../controllers/Auth");

//import ResetPassword Handler
const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/ResetPassword");

//middlewares Import
const { auth } = require("../middlewares/auth");

// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************

router.post("/sendotp", sendOTP); //verified
router.post("/signup", signUp); //verified
router.post("/login", login); //verified

// ********************************************************************************************************
//                                      Reset Password
// ********************************************************************************************************

router.post("/reset-password-token", resetPasswordToken); //verified
router.post("/reset-password", resetPassword); //verified

// ********************************************************************************************************
//                                      Update Password
// ********************************************************************************************************
router.put("/changePassword", auth, changePassword);

// ********************************************************************************************************
//                                      Contact/About Page
// ********************************************************************************************************

module.exports = router;
