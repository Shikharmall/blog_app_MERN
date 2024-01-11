import axios from "axios";
import { API_URL_BASE } from "../utils/apiURL";

export const getBlogs = async () => {
  try {
    let result = await axios(`https://jsonplaceholder.typicode.com/posts`, {
      method: "GET"
    });
    return result;
  } catch (error) {
    return error;
  }
};

export const getBlogPage = async (id) => {
  try {
    let result = await axios(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "GET"
    });
    return result;
  } catch (error) {
    return error;
  }
};