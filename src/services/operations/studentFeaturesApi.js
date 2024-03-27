import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import rzpLogo from "../../assets/Logo/rzp_logo.png";
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";

const { studentEndpoints } = require("../apis");

const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
  CREATE_INVOICE_API,
} = studentEndpoints;

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
}

export async function buyCourse(
  token,
  courses,
  userDetails,
  navigate,
  dispatch
) {
  const toastId = toast.loading("Loading...");
  try {
    //load the script
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      toast.error("Razorpay SDK Failed To Load");
      return;
    }

    //inititate the order
    const orderResponse = await apiConnector(
      "POST",
      COURSE_PAYMENT_API,
      {
        courses,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!orderResponse.data.success) {
      throw new Error(orderResponse.data.message);
    }

    console.log("ORDER RESPONSE:", orderResponse);

    //options
    const options = {
      key: process.env.RAZORPAY_KEY,
      currency: orderResponse.data.data.currency,
      amount: `${orderResponse.data.data.amount}`,
      order_id: orderResponse.data.data.id,
      name: "StudyNotion",
      description: "Thank You For Purchasing The Course",
      image: rzpLogo,
      prefill: {
        name: `${userDetails.firstName} ${userDetails.lastName}`,
        email: userDetails.email,
      },
      handler: function (response) {
        console.log("PRINTING HANDLER RESPONSE IN THE PAYEMNT ONE:", response);
        //mail send
        sendPaymentSuccessEmail(
          response,
          orderResponse.data.data.amount,
          token
        );

        //verify payment
        verifyPayment({ ...response, courses }, token, navigate, dispatch);

        const paymentData = {
          response,
          amount: orderResponse.data.data.amount,
        };
        createInvoice(paymentData, token);
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", function (response) {
      toast.error("Oops! Payment Failed");
      console.error(response.error);
    });
  } catch (error) {
    console.log("COURSE_PAYMENT_API ERROR:", error);
    toast.error("Could Not Make Payment");
  }
  toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response, amount, token) {
  try {
    await apiConnector(
      "POST",
      SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
  } catch (error) {
    console.log("SEND_PAYMENT_SUCCESS_EMAIL_API ERROR: ", error);
  }
}

async function verifyPayment(bodyData, token, navigate, dispatch) {
  const toastId = toast.loading("Verifying Payment...");
  dispatch(setPaymentLoading(true));
  try {
    const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Payment Successful");
    navigate("/dashboard/enrolled-courses");
    dispatch(resetCart());
  } catch (error) {
    console.log("COURSE_VERIFY_API ERROR:", error);
    toast.error("Could Not Verify Payment");
  }
  toast.dismiss(toastId);
  dispatch(setPaymentLoading(false));
}

async function createInvoice(bodyData, token) {
  try {
    const res = await apiConnector("POST", CREATE_INVOICE_API, bodyData, {
      Authorization: `Bearer ${token}`,
    });

    if (!res.data.success) {
      throw new Error("Unable to Create Invoice of payment");
    }
  } catch (error) {
    console.log("CREATE_INVOICE_API ERROR: ", error);
  }
}
