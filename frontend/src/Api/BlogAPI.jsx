import axios from "axios";
import { API_URL_BASE } from "../utils/apiURL";

export const getBlogPage = async () => {
  try {
    let result = await axios(`https://jsonplaceholder.typicode.com/posts`, {
      method: "GET",
    });
    return result;
  } catch (error) {
    return error;
  }
};

export const getAllBlogs = async () => {
  try {
    let result = await axios(`http://localhost:5174/getAllBlogs`, {
      method: "GET",
    });
    return result;
  } catch (error) {
    return error;
  }
};

export const getBlogs = async (
  page,
  limit,
  sortBy,
  sortOrder,
  filterdata
) => {
  try {
    let result = await axios(
      `http://localhost:5174/getBlogs?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}&filterdata=${filterdata}`,
      {
        method: "GET",
      }
    );
    return result;
  } catch (error) {
    return error;
  }
};

export const addPost = async (data) => {
  try {
    console.log(data);
    let result = await axios(`http://localhost:5174/addBlog`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //"Content-Type": "multipart/form-data",
        // Authorization: `Bearer ${token}`,
      },
      //withCredentials: true,
      data: data,
    });
    return result;
  } catch (error) {
    return error;
  }
};

export const searchBlog = async (titleDescriptionFilter) => {
  try {
    let result = await axios(`http://localhost:5174/searchBlog`, {
      method: "GET",
      params: {
        titleDescriptionFilter,
      },
    });
    return result;
  } catch (error) {
    return error;
  }
};
