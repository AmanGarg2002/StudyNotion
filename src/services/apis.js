const BASE_URL = process.env.REACT_APP_BASE_URL;

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
};

// SETTINGS PAGE API
export const settingsEndpoints = {
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  UPDATE_PASSWORD_API: BASE_URL + "/auth//changePassword",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
  REMOVE_DISPLAY_PICTURE_API: BASE_URL + "/profile/removeDisplayPicture",
};

// STUDENTS ENDPOINTS
export const studentEndpoints = {
  COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
  COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
  SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
  CREATE_INVOICE_API: BASE_URL + "/payment/createInvoice",
};

// PROFILE ENDPOINTS
export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
  GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
  GET_INSTRUCTOR_DATA_API: BASE_URL + "/profile/instructorDashboard",
};

// COURSE ENDPOINTS
export const courseEndpoints = {
  COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",

  CREATE_COURSE_API: BASE_URL + "/course/createCourse",
  EDIT_COURSE_API: BASE_URL + "/course/editCourse",
  DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",

  CREATE_SECTION_API: BASE_URL + "/course/addSection",
  CREATE_SUBSECTION_API: BASE_URL + "/course/addSubSection",
  UPDATE_SECTION_API: BASE_URL + "/course/updateSection",

  UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
  DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
  DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",

  GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",
  GET_FULL_COURSE_DETAILS_AUTHENTICATED:
    BASE_URL + "/course/getFullCourseDetails",

  CREATE_RATING_API: BASE_URL + "/course/createRating",

  LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",

  COURSE_CATEGORIES_API: BASE_URL + "/course/showAllCategories",
};

// RATINGS AND REVIEWS
export const ratingsEndpoints = {
  REVIEWS_DETAILS_API: BASE_URL + "/course/getReviews",
};

// CATAGORIES API
export const categories = {
  CATEGORIES_API: BASE_URL + "/course/showAllCategories",
};

// CATALOG PAGE DATA
export const catalogData = {
  CREATE_CATEGORY_API: BASE_URL + "/course/createCategory",
  CATALOG_PAGE_DATA_API: BASE_URL + "/course/getCategoryPageDetails",
};

//CONTACT US API
export const contactUsEndpoint = {
  CONTACT_US_API: BASE_URL + "/reach/contactUsForm",
};
