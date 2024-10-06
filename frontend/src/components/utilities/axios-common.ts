import axios from "axios";

export const publicRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTZhMzkzZGM3YmY0OTI0MjBiMDM1ZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcyODIxMDQ5MSwiZXhwIjoxNzI4NDY5NjkxfQ.di_NdqUI1RCZdEDmZAY7Q72llbKcZx5fOXwMBIjQizM";

export const userRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
