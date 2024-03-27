const mongoose = require("mongoose");
const { instance } = require("../config/razorpay");
const User = require("../models/User");
const Course = require("../models/Course");
const Invoice = require("../models/Invoice");
const crypto = require("crypto");

const mailSender = require("../utils/mailSender");
const { courseEnrolled } = require("../mail/templates/courseEnrollementEmail");
const {
  paymentSuccessEmail,
} = require("../mail/templates/paymentSuccessEmail");
const CourseProgress = require("../models/CourseProgress");

exports.capturePayment = async (req, res) => {
  try {
    const { courses } = req.body;
    const userId = req.user.id;

    if (courses.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Please provide the valid Course Id",
      });
    }

    let totalAmount = 0;

    for (const course_id of courses) {
      let course;
      try {
        course = await Course.findById(course_id);

        if (!course) {
          return res.status(404).json({
            success: false,
            message: "Could find the course",
          });
        }

        const uid = new mongoose.Types.ObjectId(course_id);
        if (course.studentsEnrolled.includes(uid)) {
          return res.status(400).json({
            success: false,
            message: "Student is already Enrolled",
          });
        }

        totalAmount += course.price;
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    }

    const currency = "INR";
    const options = {
      amount: totalAmount * 100,
      currency,
      receipt: Math.random(Date.now()).toString(),
    };

    try {
      const paymentResponse = await instance.orders.create(options);

      return res.status(200).json({
        success: true,
        data: paymentResponse,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Could not initate the order kindly try again",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while creating order.",
    });
  }
};

exports.verifyPayment = async (req, res) => {
  const razorpay_order_id = req.body?.razorpay_order_id;
  const razorpay_payment_id = req.body?.razorpay_payment_id;
  const razorpay_signature = req.body?.razorpay_signature;
  const courses = req.body?.courses;
  const userId = req.user.id;

  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !courses ||
    !userId
  ) {
    return res.status(400).json({
      success: false,
      message: "Payment Failed",
    });
  }

  let body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    //Enrolling the Student
    await enrollStudents(courses, userId, res);

    //Return Response
    return res.status(200).json({
      success: true,
      message: "Payment Verified",
    });
  }
  return res.status(500).json({
    success: false,
    message: "Payment Failed",
  });
};

const enrollStudents = async (courses, userId, res) => {
  if (!courses || !userId) {
    return res.status(400).json({
      success: false,
      message: "Please Provide Data For Courses Or UserId",
    });
  }

  for (const courseId of courses) {
    try {
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        {
          $push: { studentsEnrolled: userId },
        },
        { new: true }
      );

      if (!enrolledCourse) {
        return res.status(500).json({
          success: false,
          message: "Course Not Found",
        });
      }

      const courseProgress = await CourseProgress.create({
        courseID: courseId,
        userId: userId,
        completedVideos: [],
      });

      const enrolledStudent = await User.findByIdAndUpdate(
        userId,
        {
          $push: { courses: courseId, courseProgress: courseProgress._id },
        },
        { new: true }
      );

      const emailResponse = await mailSender(
        enrolledStudent.email,
        `Congratulation Enrolled Successfully in ${enrolledCourse.courseName}`,
        courseEnrolled(
          enrolledCourse.courseName,
          `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
        )
      );
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
};

exports.sendPaymentSuccessEmail = async (req, res) => {
  try {
    const { orderId, paymentId, amount } = req.body;
    const userId = req.user.id;

    if (!orderId || !paymentId || !amount || !userId) {
      return res.status(400).json({
        success: false,
        message: "Please Provide All The Fields",
      });
    }

    const enrolledStudent = await User.findById(userId);

    if (!enrolledStudent) {
      return res.status(404).json({
        success: false,
        message: "No User Found",
      });
    }

    await mailSender(
      enrolledStudent.email,
      `Payment Recieved`,
      paymentSuccessEmail(
        `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
        amount / 100,
        orderId,
        paymentId
      )
    );
    
    
    
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Sending Payment Success Mail Error",
    });
  }
};

// exports.capturePayment = async (req, res) => {
//   try {
//     const { course_id } = req.body;
//     const userId = req.user.id;

//     if (!course_id) {
//       return res.json({
//         success: false,
//         message: "Please provide the valid Course Id ",
//       });
//     }

//     let course;
//     try {
//       course = await Course.findById(course_id);
//       if (!course) {
//         return res.json({
//           success: false,
//           message: "Could find the course",
//         });
//       }

//       //need to check is it necessary to connvert it
//       const uid = mongoose.Types.ObjectId(userId); //may be error
//       if (course.studentsEnrolled.includes(uid)) {
//         return res.status(400).json({
//           success: false,
//           message: "Student is already enrolled",
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       return res.status(500).json({
//         success: false,
//         message: error.message,
//       });
//     }

//     const amount = course.price;
//     const currency = "INR";

//     const options = {
//       amount: amount * 100,
//       currency,
//       receipt: Math.random(Date.now()).toString(),
//       notes: {
//         courseId: course_id,
//         userId,
//       },
//     };

//     try {
//       const paymentResponse = await instance.orders.create(options);
//       console.log("Payment Response:", paymentResponse);

//       return res.status(200).json({
//         success: true,
//         courseName: course.courseName,
//         courseDescription: course.courseDescription,
//         thumbnail: course.thumbnail,
//         orderId: paymentResponse.id,
//         currceny: paymentResponse.currency,
//         amount: paymentResponse.amount,
//       });
//     } catch (error) {
//       console.log(error);
//       return res.status(500).json({
//         success: false,
//         message: "Could not initate the order kindly try again",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: "Something went wrong while creating order.Please try again",
//     });
//   }
// };

// exports.verifySignature = async (req, res) => {
//   try {
//     const webhookSecret = "12345678";

//     //important
//     const signature = req.header["x-razorpay-signature"];

//     const shasum = crypto.createHmac("sha256", webhookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest("hex");

//     if (signature === digest) {
//       console.log("Payment Authorized");

//       //need to test the path properly while testing
//       const { userId, courseId } = req.body.payload.payment.entity.notes;

//       try {
//         //fullfilling the action

//         //find the course and enroll the student
//         const enrolledCourse = await Course.findOneAndUpdate(
//           { _id: courseId },
//           { $push: { studentsEnrolled: userId } },
//           { new: true }
//         );

//         if (!enrolledCourse) {
//           return res.status(500).json({
//             success: false,
//             message: "Course Not Found",
//           });
//         }

//         console.log("Enrolled Course:", enrolledCourse);

//         const enrolledStudent = await User.findByIdAndUpdate(
//           { _id: userId },
//           { $push: { courses: courseId } },
//           { new: true }
//         );

//         console.log("Enrolled Student", enrolledStudent);

//         const emailResponse = await mailSender(
//           enrolledStudent.email,
//           "Congratulation Enrolled succesfully",
//           courseEnrolled(enrolledStudent.courseName,enrolledStudent.firstName)
//         );
//         return res.status(200).json({
//           success: true,
//           message: "Successfully purchased the course and Verified Signature",
//         });
//       } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//           success: false,
//           message: error.message,
//         });
//       }
//     } else {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid Signature Request",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed in Verifying Signature in whole",
//     });
//   }
// };
