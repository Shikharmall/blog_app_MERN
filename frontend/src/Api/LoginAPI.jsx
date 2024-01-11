import axios from "axios";
import { API_URL_BASE } from "../utils/apiURL";

export const getCredentials = async () => {
  try {
    let result = await axios(`${API_URL_BASE}/getcredentials`,{
    method: "GET",
    withCredentials: true
  });
  return result;
  } catch (error) {
    return error
  }

};
  
export const ddLogin = async (data) => {
  try {
    let result = await axios(`${API_URL_BASE}/login`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'mode': 'no-cors'
    },

    data: data,
  });
  return result;
  } catch (error) {
    return error
  }
  
};
