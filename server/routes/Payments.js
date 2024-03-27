const express = require("express");
const router = express.Router();

//import Payments Handler
const {
  capturePayment,
  verifyPayment,
  sendPaymentSuccessEmail,
} = require("../controllers/Payments");

const { createInvoice } = require("../controllers/Invoice");

//middlewares Import
const { auth, isStudent } = require("../middlewares/auth");

router.post("/capturePayment", auth, isStudent, capturePayment);
router.post("/verifyPayment", auth, isStudent, verifyPayment);
router.post(
  "/sendPaymentSuccessEmail",
  auth,
  isStudent,
  sendPaymentSuccessEmail
);
router.post("/createInvoice",auth,isStudent, createInvoice);

module.exports = router;
