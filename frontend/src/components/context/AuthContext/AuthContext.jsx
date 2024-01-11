import { createContext, useReducer } from "react";
import axios from "axios";

import { LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT } from "./authActionTypes";
import { API_URL_BASE } from "../../../utils/apiURL";

axios.defaults.withCredentials = true;

// Auth Context
export const authContext = createContext();

// INITIAL STATE
const INITIAL_STATE = {
  userAuth: JSON.parse(localStorage.getItem("userAuth")),
  profile: null,
  error: null,
  loading: false,
};

// Auth Reducer
const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("userAuth", JSON.stringify(payload));
      return {
        ...state,
        loading: false,
        userAuth: payload,
        error: null,
      };
    case LOGIN_FAILED:
      // remove from storage
      localStorage.removeItem("userAuth");
      return {
        ...state,
        loading: false,
        userAuth: null,
        error: payload,
      };
    // logout
    case LOGOUT:
      // remove from storage
      localStorage.removeItem("userAuth");
      return {
        ...state,
        userAuth: payload,
        error: null,
        loading: false,
        profile: null,
      };
    default:
      return state;
  }
};

// Auth Provider
const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  // Login Action
  const loginUserAction = async (formData, event) => {
    const config = {
      withCredentials: true,
    };
    try {
      // Hide the error message
      const loginErr = document.querySelectorAll(".login-error");
      loginErr.forEach((err) => {
        if (!err.classList.contains("hidden")) {
          err.classList.add("hidden");
        }
      });

      console.log(state?.userAuth);

      const res = await axios.post(
        `${API_URL_BASE}/users/dd/login`,
        formData,
        config
      );

      if (res?.data?.status === "success") {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
        console.log(state?.userAuth);
        // redirect
        window.location.href = "/dashboard";
      }
    } catch (error) {
      dispatch({
        type: LOGIN_FAILED,
        payload: error?.response?.data?.message,
      });
      event.target.parentNode.firstElementChild.lastElementChild.classList.remove(
        "hidden"
      );
    }
  };

  // Logout Action
  const logoutUserAction = () => {
    dispatch({
      type: LOGOUT,
      payload: null,
    });
    // Redirect
    window.location.href = "/";
  };

  // Admin Profile Action
  const fetchAdminProfileAction = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state?.userAuth?.token}`,
      },
    };
    try {
      const res = await axios.get(`${API_URL_ADMIN}/profile`, config);
      if (res?.data?.status === "success") {
        dispatch({
          type: FETCH_PROFILE_SUCCESS,
          payload: res.data.data,
        });
      }
    } catch (error) {
      dispatch({
        type: FETCH_PROFILE_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

  return (
    <authContext.Provider
      value={{
        loginUserAction,
        userAuth: state?.userAuth,
        logoutUserAction,
        fetchAdminProfileAction,
        profile: state?.profile,
        error: state?.error,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
