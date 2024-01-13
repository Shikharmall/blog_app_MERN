import axios from "axios";
import { API_URL_BASE } from "../utils/apiURL";


export const getAllBlogs = async () => {
  try {
    let result = await axios(`${API_URL_BASE}/getAllBlogs`, {
      method: "GET",
    });
    return result;
  } catch (error) {
    return error;
  }
};

export const getSingleBlog = async (blog_id) => {
  try {
    let result = await axios(
      `${API_URL_BASE}/getSingleBlog/?blog_id=${blog_id}`,
      {
        method: "GET",
      }
    );
    return result;
  } catch (error) {
    return error;
  }
};

export const getBlogs = async (page, limit, sortBy, sortOrder, filterdata) => {
  try {
    let result = await axios(
      `${API_URL_BASE}/getBlogs?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}&filterdata=${filterdata}`,
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
    let result = await axios(`${API_URL_BASE}/addBlog`, {
      method: "POST",
      headers: {
        //"Content-Type": "application/json",
        "Content-Type": "multipart/form-data",
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
export const updateViewAPI = async (data) => {
  try {
    let result = await axios(`${API_URL_BASE}/updateView`, {
      method: "PATCH",
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

/*
export const searchBlog = async (titleDescriptionFilter) => {
  try {
    let result = await axios(`${API_URL_BASE}/searchBlog`, {
      method: "GET",
      params: {
        titleDescriptionFilter,
      },
    });
    return result;
  } catch (error) {
    return error;
  }
};*/

export const topThreeBlogAPI = async () => {
  try {
    let result = await axios(`${API_URL_BASE}/topThreeBlog`, {
      method: "GET",
    });
    return result;
  } catch (error) {
    return error;
  }
};

export const getBlogTagsAPI = async (blog_id) => {
  try {
    let result = await axios(`${API_URL_BASE}/getTags?blog_id=${blog_id}`, {
      method: "GET",
    });
    return result;
  } catch (error) {
    return error;
  }
};
