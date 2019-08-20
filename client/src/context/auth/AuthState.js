import React, { useReducer } from "react";
import authReducer from "./authReducer";
import AuthContext from "./authContext";
import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from "../types";

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    error: null,
    user: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load

  // Register
  const register = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    console.log("formData", formData);
    try {
      const res = await axios.post("api/users", formData, config);
      console.log("res", res);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  // Login
  const login = params => {
    console.log("login");
  };

  // Logout
  const logout = params => {
    console.log("logout");
  };

  // Clear Errors
  const clearErrors = () => {
    dispatch({
      type: CLEAR_ERRORS
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        user: state.user,
        register,
        login,
        logout,
        clearErrors
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
