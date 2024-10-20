import axios from "axios";

export const publicRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTZhMzkzZGM3YmY0OTI0MjBiMDM1ZCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcyOTI2MzMwOCwiZXhwIjoxNzI5NTIyNTA4fQ.Y9hxXzXFt2GEhvdO4ogW566iD-GseAT_a5EO-o8wHnQ";

export const userRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Authorization: `Bearer sk_test_51MoMrsGaELn9C10k1EL9A0yTNDYkHOGvRGGaNJ5xE2lzjeCofMJU2PgP3XQQcK7oBDxrsi2w2poZ1MNdtvQUbIn70096exvJif`,
  },
});
