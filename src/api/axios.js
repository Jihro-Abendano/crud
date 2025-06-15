import axios from "axios";

export const api = axios.create({
  baseURL: "https://react-testing-server.onrender.com/api/v1",
  withCredentials: true, // optional
});
