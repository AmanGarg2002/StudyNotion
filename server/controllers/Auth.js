const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const mailSender = require("../utils/mailSender");
const { passwordChangeTemplate } = require("../mail/templates/passwordUpdate");
const validator = require("validator");


//sendOTP
exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format. Please provide a valid email address",
      });
    }

    //checks user already exists
    const checkUserPresent = await User.findOne({ email });
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User Already Exists",
      });
    }

    //OTP Generator
    var otp = otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
      digits: true,
    });
    console.log("OTP Generated:", otp);

    //unique otp check or not
    let result = await OTP.findOne({ otp: otp });

    while (result) {
      otp = otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
        digits: true,
      });
      result = await OTP.findOne({ otp: otp });
    }

    const otpPayload = { email, otp };

    //DB entry for the OTP
    const otpBody = await OTP.create(otpPayload);
    console.log("otpBody:", otpBody);

    res.status(200).json({
      success: true,
      message: "OTP Sent Successfully",
      otp,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//signup
exports.signUp = async (req, res) => {
  try {
    //Fetching Data
    const {
      firstName,
      lastName,
      email,
      password,
      confirmpassword,
      accountType,
      otp,
    } = req.body;

    //Validation For Data
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmpassword ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        message: "Please Fill All The Details Carefully",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format. Please provide a valid email address",
      });
    }

    //Validation For Both Password
    if (password !== confirmpassword) {
      return res.status(400).json({
        success: false,
        message:
          "Password and Confirm Password Does Not Match,Please Try Again",
      });
    }

    //Validation For Email
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "User is already regisetred.Please Signu with other email",
      });
    }

    //Fetching Most Recent OTP
    const recentOtp = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);

    console.log("RecentOTP:", recentOtp);

    if (recentOtp.length === 0) {
      return res.status(400).json({
        success: false,
        message: "OTP Not Found",
      });
    } else if (recentOtp[0].otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "OTP is Invalid",
      });
    }

    //Hashing Password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Error While Hashing The Password",
      });
    }

    //check kariyo iski need thi kyuki baad mai isko bhi findbyid karke kare sakte the(done)
    const profileDetails = await Profile.create({
      // gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
      countryCode: null,
    });

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    return res.status(200).json({
      success: true,
      message: "User is Registered Successfully.Congratulations...",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User cannot Registered.Please try again",
    });
  }
};

//login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "All Fields Are Required",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format. Please provide a valid email address",
      });
    }

    let user = await User.findOne({ email: email })
      .populate("additionalDetails")
      .exec();
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered with Us.Please Signup to Continue..",
      });
    }

    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "Logged In Successfully",
      });
    } else {
      return res.status(401).json({
        success: false,
        meassage: "Password is Incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Login Failure.Please try again later.",
    });
  }
};

// change password iska mtb user logged in hoga phle hi toh niche code change hoga
exports.changePassword = async (req, res) => {
  try {
    const id = req.user.id;

    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    //Validation
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the details carefully",
      });
    }

    //Validation for Id
    const user = await User.findById(id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User Data Not Found.",
      });
    }

    if (await bcrypt.compare(oldPassword, user.password)) {
      if (newPassword !== confirmNewPassword) {
        return res.status(400).json({
          success: false,
          message:
            "NewPassword and ConfirmNewPassword does not match. Kindly Enter again",
        });
      }

      let hashedPassword;

      try {
        hashedPassword = await bcrypt.hash(newPassword, 10);
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: "Unable to hash the password.Kindly try again",
        });
      }

      const userDetails = await User.findByIdAndUpdate(
        { _id: id },
        { password: hashedPassword },
        { new: true }
      );

      await mailSender(
        userDetails.email,
        "Account Password Changed Successfully",
        passwordChangeTemplate(userDetails.firstName, userDetails.email)
      );

      return res.status(200).json({
        success: true,
        message: "Password has been successfully changed",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "OldPassword does not match.Kindly try again",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Unable to change the password.Kindly try it again",
    });
  }
};

