import { apiConnector } from "../apiconnector";
import { toast } from "react-hot-toast";
import { setLoading, setToken } from "../../slices/authSlice";
import { contactUsEndpoint, endpoints } from "../apis";
import { setProtectRoute } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";
// import { resetCart } from "../../slices/cartSlice";

const {
  RESETPASSTOKEN_API,
  SENDOTP_API,
  RESETPASSWORD_API,
  SIGNUP_API,
  LOGIN_API,
} = endpoints;

const { CONTACT_US_API } = contactUsEndpoint;

// ********************************************************************************************************
//                                      Authentication API
// ********************************************************************************************************

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
      });

      console.log("OTP SEND RESPONSE.......", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("OTP Sent Successfully");
      navigate("/verify-email");
    } catch (error) {
      console.log("UNABLE TO SEND THE OTP", error);
      toast.error("Could Not Send OTP");
    }
    dispatch(setLoading(false));
  };
}

export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmpassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmpassword,
        otp,
      });

      console.log("SIGNUP API RESPONSE............", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Signup Successful");
      navigate("/login");
    } catch (error) {
      console.log("SIGNUP API ERROR:", error);
      toast.error("Signup Failed");
      navigate("/signup");
    }
    dispatch(setLoading(false));
  };
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      console.log("LOGIN IN RESPONSE...", response);

      if (!response.data.success) {
        throw new Error(response.error.message);
      }

      toast.success("Login Successful");
      dispatch(setToken(response.data.token));

      console.log("user data in login part:", response);

      const userImage = response?.data.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;

      const userData = { ...response.data.user, image: userImage };
      dispatch(setUser(userData));
      localStorage.setItem("user", JSON.stringify(userData));

      localStorage.setItem("token", JSON.stringify(response.data.token));
      navigate("/dashboard/my-profile");
    } catch (error) {
      console.log("ERROR IN LOGIN", error);
      toast.error("Login Failed");
    }
    dispatch(setLoading(false));
  };
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setLoading(true));
    try {
      dispatch(setToken(null));
      localStorage.removeItem("token");
      dispatch(setUser(null));
      localStorage.removeItem("user");
      toast.success("Logged Out");
      navigate("/");
    } catch (error) {
      console.log("Failed in logged out", error);
      toast.error("Failed to Logged Out");
    }
    dispatch(setLoading(false));
  };
}

// ********************************************************************************************************
//                                      Reset API
// ********************************************************************************************************

export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {
        email,
      });

      console.log("RESET PASSWORD TOKEN MAIL SENT RESPONSE.......", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Reset Email Sent");
      setEmailSent(true);
      dispatch(setProtectRoute(true));
    } catch (error) {
      console.log("RESET PASSWORD TOKEN ERROR");
      toast.error("Failed to Send Mail");
    }
    dispatch(setLoading(false));
  };
}

export function resetPassword(password, confirmPassword, token, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password,
        confirmPassword,
        token,
      });

      if (!response.data.success) {
        throw new Error("Unable to update the password");
      }

      console.log("UPDATE PASSWORD RESPONSE", response);
      toast.success("Password Updated");
      dispatch(setProtectRoute(true));

      if (response.data.success) {
        navigate("/reset-complete");
      }

      // navigate("/login");
    } catch (error) {
      console.log("Unable to update Password:", error);
      {
        password !== confirmPassword && toast.error("Password Not Match");
      }
      {
        password === confirmPassword &&
          toast.error("Unable to update Password");
      }
    }
    dispatch(setLoading(false));
  };
}

// ********************************************************************************************************
//                                      Contact Us/About API
// ********************************************************************************************************

export function contactUsMail(formData) {
  return async (dispatch) => {
    console.log("LOGGING FORM DATA:", formData);
    try {
      const response = await apiConnector("POST", CONTACT_US_API, formData);

      if (!response.data.success) {
        throw new Error(response.error.message);
      }

      console.log("LOGGING RESPONSE:", response);

      toast.success("Message send successful");
    } catch (error) {
      console.log("ERROR IN SEND MAIL OF CONTACT/ABOUT PAGE:", error);
      toast.error("Failed to send message");
    }
  };
}
