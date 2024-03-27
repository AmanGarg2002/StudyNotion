import { apiConnector } from "../apiconnector";
import toast from "react-hot-toast";
import { catalogData } from "../apis";

const { CATALOG_PAGE_DATA_API } = catalogData;

export const getCatalogPageData = async (categoryId) => {
  let result = [];
  // const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", CATALOG_PAGE_DATA_API, {
      categoryId,
    });

    console.log("CATALOG_PAGE_DATA_API RESPONSE:", response);

    if (!response?.data?.success) {
      throw new Error("Could not Fetch Category Page Data");
    }
    result = response?.data?.data;
  } catch (error) {
    console.log("CATALOG_PAGE_DATA_API ERROR:", error);
    result = error?.response?.data;
  }
  // toast.dismiss(toastId);
  return result;
};
