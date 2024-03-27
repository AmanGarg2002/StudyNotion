const express = require("express");
const router = express.Router();

const { contactFormDetails } = require("../controllers/ContactUs");

router.post("/contactUsForm", contactFormDetails);

module.exports = router;
