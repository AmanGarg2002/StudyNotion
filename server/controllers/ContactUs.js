const { contactTemplate } = require("../mail/templates/contactUsTemplate");
const mailSender = require("../utils/mailSender");
const validator = require("validator");

exports.contactFormDetails = async (req, res) => {
  try {
    const { firstname, lastname, message, email, phoneNo, countrycode } =
      req.body;

    //validation
    if (
      !firstname ||
      !lastname ||
      !message ||
      !email ||
      !phoneNo ||
      !countrycode
    ) {
      res.status(400).json({
        success: false,
        message: "Please Fill All The Details Carefully",
      });
    }

    if (!validator.isEmail(email)) {
      res.status(401).json({
        success: false,
        message: "Please Enter The valid Email Address",
      });
    }

    await mailSender(
      email,
      "Questions about Our Company's Background",
      contactTemplate(firstname, lastname, countrycode, phoneNo)
    );

    res.status(200).json({
      success: true,
      message: "Mail Send Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong in sending the contact form details",
      message: error.message,
    });
  }
};
