import { Dispatch } from "@reduxjs/toolkit";
import { publicRequest } from "../components/utilities/axios-common";
import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { AxiosResponse } from "axios";

export const login = async (dispatch: Dispatch, user: any) => {
  dispatch(loginStart());
  try {
    const res: AxiosResponse = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};
