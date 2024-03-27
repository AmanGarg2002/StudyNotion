import toast from "react-hot-toast";
import { catalogData } from "../apis";
import { apiConnector } from "../apiconnector";

const { CREATE_CATEGORY_API } = catalogData;

export const createCategory = async (data, token) => {
  console.log("DATA:", data);
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", CREATE_CATEGORY_API, data, {
      Authorization: `Bearer ${token}`,
    });

    console.log("CREATE_CATEGORY_API RESPONSE:", response);

    if (!response.data.success) {
      throw new Error("Could Not Create Category");
    }

    toast.success("Category Created");
  } catch (error) {
    console.log("CREATE_CATEGORY_API ERROR:", error);
    toast.error("Unable To Create Category");
  }
  toast.dismiss(toastId);
};
