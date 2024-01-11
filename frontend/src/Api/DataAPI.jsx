import axios from "axios";
import { API_URL_BASE } from "../utils/apiURL";

export const getData = async () => {
  console.log(`${API_URL_BASE}/analyticsdata`);
  try {
    let result = await axios(`${API_URL_BASE}/analyticsdata`, {
      method: "GET"
    });
    return result;
  } catch (error) {
    return error;
  }
};
