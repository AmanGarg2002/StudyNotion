const { resetLink } = require("../mail/templates/resetPasswordLink");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");

//resetPasswordToken
exports.resetPasswordToken = async (req, res) => {
  try {
    const email = req.body.email;

    if (!email) {
      return res.status(401).json({
        success: false,
        message: "Kindly enter the Registered Email",
      });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Your Email is not registered",
      });
    }

    const token = crypto.randomUUID();

    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 5 * 60 * 1000,
      },
      { new: true }
    );

    const url = `http://localhost:3000/update-password/${token}`;

    await mailSender(email, "Password Reset Link", resetLink(url));

    return res.status(200).json({
      success: true,
      message:
        "Email sent successfully for reset password,please check email and change password",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while sending reset password mail",
    });
  }
};

//resetPassword
exports.resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body;

    if (!password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Fill All Required Details in the Reset Password Page",
      });
    }

    if (password !== confirmPassword) {
      return res.status(401).json({
        success: false,
        message:
          "Password is not matching with confirm password.Kindly try again.",
      });
    }

    const userDetails = await User.findOne({ token: token });
    if (!userDetails) {
      return res.status(403).json({
        succes: false,
        message: "Token is invalid",
      });
    }
    if (userDetails.resetPasswordExpires < Date.now()) {
      return res.status(401).json({
        success: false,
        message:
          "Token is expired. Please regenerate your token for resetting the password",
      });
    }

    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          "Unable to hash the password in the resetPassword page. Kindly try again",
      });
    }
    await User.findOneAndUpdate(
      { token: token },
      { password: hashedPassword },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Password has been reset Successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message:
        "Something went wrong while resetting/Changing the password.Kindly try again",
    });
  }
};
