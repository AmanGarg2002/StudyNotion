const Invoice = require("../models/Invoice");
const User = require("../models/User");

exports.createInvoice = async (req, res) => {
  try {
    console.log("REQUEST KI BODY", req.body);
    const razorpay_order_id = req.body?.response?.razorpay_order_id;
    const razorpay_payment_id = req.body?.response?.razorpay_payment_id;
    const { amount } = req.body;
    const userId = req.user.id;

    if (!razorpay_order_id || !razorpay_payment_id || !userId || !amount) {
      return res.status(400).json({
        success: false,
        message: "Data is incomplete",
      });
    }

    const invoiceData = await Invoice.create({
      amount: amount,
      orderId: razorpay_order_id,
      paymentId: razorpay_order_id,
    });

    const userData = await User.findByIdAndUpdate(
      userId,
      {
        $push: { invoices: invoiceData._id },
      },
      { new: true }
    )

      .populate({
        path: "invoices",
      })
      .exec();

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "No User Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Invoice Created Successfully",
      data: { userData, invoiceData },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in creating the invoice for the payment",
    });
  }
};
