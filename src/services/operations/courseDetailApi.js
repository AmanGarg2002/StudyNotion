import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { courseEndpoints } from "../apis";

const {
  COURSE_DETAILS_API,
  CREATE_COURSE_API,
  EDIT_COURSE_API,
  DELETE_COURSE_API,
  COURSE_CATEGORIES_API,
  CREATE_SECTION_API,
  UPDATE_SECTION_API,
  DELETE_SECTION_API,
  CREATE_SUBSECTION_API,
  UPDATE_SUBSECTION_API,
  DELETE_SUBSECTION_API,
  GET_ALL_INSTRUCTOR_COURSES_API,
  GET_FULL_COURSE_DETAILS_AUTHENTICATED,
  CREATE_RATING_API,
  LECTURE_COMPLETION_API,
} = courseEndpoints;

//Fetch Course Details
export const fetchCourseDetails = async (courseId) => {
  let result = null;
  // const toastId = toast.loading("Loading...");
  try {
    console.log("COURSE API ID:", courseId);
    const response = await apiConnector("POST", COURSE_DETAILS_API, {
      courseId,
    });

    console.log(" COURSE_DETAILS_API RESPONSE:", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    result = response.data;
  } catch (error) {
    console.log(" COURSE_DETAILS_API ERROR:", error);
    result = error.response.data;
  }
  // toast.dismiss(toastId);
  return result;
};

//Create New Course
export const addCourseDetails = async (formData, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  console.log("form data:", formData);
  try {
    const response = await apiConnector("POST", CREATE_COURSE_API, formData, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.error.message);
    }

    console.log("THE REPONSE OF  CREATE_COURSE_API IS: ", response);
    toast.success("Course Details Added Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("CREATE_COURSE_API ERROR", error);
    toast.error("Failed to create course");
  }
  toast.dismiss(toastId);
  return result;
};

//Edit the course Details
export const editCourseDetails = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("PUT", EDIT_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    console.log("EDIT_COURSE_API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error("Could Not Update Course Details");
    }

    toast.success("Course Details Updated Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log(" EDIT_COURSE_API ERROR: ", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

//Delete Course
export const deleteCourse = async (data, token) => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("DELETE", DELETE_COURSE_API, data, {
      Authorization: `Bearer ${token}`,
    });

    console.log("DELETE_COURSE_API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error("Could Not Delete Course");
    }

    toast.success("Course Deleted");
  } catch (error) {
    console.log("DELETE_COURSE_API ERROR:", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
};

//Create Section
export const createSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", CREATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error("Could Not Create Section");
    }
    toast.success("Course Section Created");
    console.log("CREATE SECTION API RESPONSE:", response);
    result = response?.data?.updatedCourseDetails;
  } catch (error) {
    console.log("CREATE_SECTION_API ERROR: ", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

//Update Section
export const updateSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("PUT", UPDATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error("Could Not Update Section");
    }
    toast.success("Course Section Updated");
    console.log("UPDATE_SECTION_API RESPONSE:", response);
    result = response?.data?.updatedCourseDetails;
  } catch (error) {
    console.log("UPDATE_SECTION_API ERROR: ", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

//Delete Section
export const deleteSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("DELETE", DELETE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error("Could Not Delete Section");
    }
    toast.success("Course Section Deleted");
    console.log("DELETE_SECTION_API RESPONSE", response);
    result = response?.data?.updatedCourseDetails;
  } catch (error) {
    console.log("DELETE_SECTION_API ERROR", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

//Create Sub Section
export const createSubSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error("Could Not Add Lecture");
    }
    toast.success("Lecture Added");
    console.log("CREATE SUB SECTION API RESPONSE:", response);
    result = response?.data?.data;
  } catch (error) {
    console.log("CREATE_SUBSECTION_API ERROR: ", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

//Update Sub Section
export const updateSubSection = async (data, token) => {
  console.log("FORM DATA:", data);
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("PUT", UPDATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error("Could Not Update Lecture");
    }
    toast.success("Lecture Updated");
    console.log(" UPDATE_SUBSECTION_API RESPONSE:", response);
    result = response?.data?.data;
  } catch (error) {
    console.log("UPDATE_SECTION_API ERROR: ", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

//Delete Sub Section
export const deleteSubSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("DELETE", DELETE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error("Could Not Delete Lecture");
    }
    toast.success("Lecture Deleted");
    console.log("DELETE_SUBSECTION_API RESPONSE", response);
    result = response?.data?.data;
  } catch (error) {
    console.log("DELETE_SUBSECTION_API ERROR", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

//Fetching the all courses of specific instructor
export const fetchInstructorCourses = async (token) => {
  let result = [];
  // const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector(
      "GET",
      GET_ALL_INSTRUCTOR_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log(
      "GET_ALL_INSTRUCTOR_COURSES_API RESPONSE............",
      response
    );

    if (!response.data.success) {
      throw new Error("Could Not Fetch Instructor Courses");
    }

    result = response?.data?.data;
  } catch (error) {
    console.log("GET_ALL_INSTRUCTOR_COURSES_API ERROR:", error);
    toast.error(error.message);
  }
  // toast.dismiss(toastId);
  return result;
};

//Fetching the avilable course categories
export const fetchCourseCategories = async () => {
  let result = [];

  try {
    const response = await apiConnector("GET", COURSE_CATEGORIES_API);
    console.log("COURSE_CATEGORIES_API RESPONSE:", response);

    if (!response?.data?.success) {
      throw new Error(response.error.message);
    }

    result = response?.data?.allcategory;
  } catch (error) {
    console.log(
      " COURSE_CATEGORIES_API UNABLE TO FETCH COURSE CATEGORIES:",
      error
    );
    toast.error("Failed to fetch course categories");
  }
  return result;
};

//Get Full Course Details
export const getFullDetailsOfCourse = async (courseId, token) => {
  let result = null;
  // const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector(
      "POST",
      GET_FULL_COURSE_DETAILS_AUTHENTICATED,
      { courseId },
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("GET_FULL_COURSE_DETAILS_AUTHENTICATED RESPONSE:", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("GET_FULL_COURSE_DETAILS_AUTHENTICATED ERROR:", error);
    result = error.response.data;
  }
  // toast.dismiss(toastId);
  return result;
};

//Create Rating For Course
export const createRating = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let success = false;
  try {
    const response = await apiConnector("POST", CREATE_RATING_API, data, {
      Authorization: `Bearer ${token}`,
    });

    console.log("CREATE_RATING_API RESPONSE:", response);
    if (!response.data.success) {
      throw new Error("Could Not Create Rating");
    }

    toast.success("Rating Created");
    success = true;
  } catch (error) {
    success = false;
    console.log("CREATE_RATING_API ERROR:", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return success;
};

//mark lecture as complete
export const markLectureAsComplete = async (data, token) => {
  const toastId = toast.loading("Loading...");
  let result = null;
  try {
    console.log("Api mai hu");
    const response = await apiConnector("POST", LECTURE_COMPLETION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("API KE BAAD");

    console.log("LECTURE_COMPLETION_API RESPONSE:", response);
    if (!response.data.success) {
      throw new Error(response.data.error);
    }

    toast.success("Lecture Completed");
    result = true;
  } catch (error) {
    result = false;
    console.log("LECTURE_COMPLETION_API ERROR:", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};
