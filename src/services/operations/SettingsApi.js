import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { settingsEndpoints } from "../apis";
import { setUser } from "../../slices/profileSlice";
import { logout } from "./authApi";

const {
  UPDATE_PROFILE_API,
  UPDATE_PASSWORD_API,
  DELETE_PROFILE_API,
  UPDATE_DISPLAY_PICTURE_API,
  REMOVE_DISPLAY_PICTURE_API,
} = settingsEndpoints;

export function updateProfile(token, formData) {
  return async (dispatch) => {
    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
        Authorization: `Bearer ${token}`,
      });

      console.log("UPDATE PROFILE API RESPONSE: ", response);

      const userUpdatedImage = response?.data?.updatedUser?.image
        ? response?.data?.updatedUser?.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.updatedUser.firstname} ${response.data.updatedUser.lastnsame}`;

      const userData = {
        ...response.data.updatedUser,
        image: userUpdatedImage,
      };

      dispatch(setUser(userData));

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", JSON.stringify(token));

      if (!response.data.success) {
        throw new Error(response.error.message);
      }

      toast.success("Profile Update Successful");
    } catch (error) {
      console.log("UPDATE PROFILE API ERROR: ", error);
      toast.error("Failed to update");
    }
  };
}

export function updatePassword(formData, token) {
  return async (dispatch) => {
    console.log("UPDATE FORM DATA:", formData);

    try {
      const response = await apiConnector(
        "PUT",
        UPDATE_PASSWORD_API,
        formData,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      console.log("UPDATE PASSWORD RESPONSE:", response);

      if (!response.data.success) {
        throw new Error(response.error.message);
      }

      toast.success("Password Updated");
    } catch (error) {
      if (formData.newPassword !== formData.confirmNewPassword) {
        toast.error("Match the password");
      } else {
        console.log("UPDATED PASSWORD API ERROR:", error);
        toast.error("Failed to update password");
      }
    }
  };
}

export function deleteAccount(token, navigate) {
  return async (dispatch) => {
    toast.success("Request Initiated For Acoount Delete");
    try {
      const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
        Authorization: `Bearer ${token}`,
      });

      console.log("DELTE ACCOUNT REPONSE:", response);

      if (!response.data.success) {
        throw new Error(response.error.message);
      }

      dispatch(logout(navigate));
    } catch (error) {
      console.log("DELETE ACCOUNT API ERROR:", error);
      toast.error("Unable To Delete Account");
    }
  };
}

export function updateDisplayPicture(selectedFile, token) {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.set("displayPicture", selectedFile);

      const response = await apiConnector(
        "PUT",
        UPDATE_DISPLAY_PICTURE_API,
        formData,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.error.message);
      }

      const updatedImage = response?.data?.data?.image
        ? response?.data?.data?.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`;

      const userData = { ...response.data.data, image: updatedImage };
      dispatch(setUser(userData));

      localStorage.setItem("user", JSON.stringify(userData));

      console.log("RESPONSE:", response);
      toast.success("Profile Updated Successful");
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Unable to update the profile");
    }
  };
}

export function removeDisplayPicture(imageId, token) {
  return async (dispatch) => {
    try {
      console.log("API MAI IMAGEID:", imageId);
      const response = await apiConnector(
        "PUT",
        REMOVE_DISPLAY_PICTURE_API,
        imageId,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.error.message);
      }

      const updatedImage = `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`;

      const userData = { ...response.data.data, image: updatedImage };
      dispatch(setUser(userData));

      localStorage.setItem("user", JSON.stringify(userData));

      console.log("RESPONSE:", response);
      toast.success("Profile Picture Removed");
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Unable To Remove Profile");
    }
  };
}
