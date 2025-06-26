import axios from "axios";

export default axios.create({
  baseURL: "https://react-testing-server.onrender.com/api/v1",
});
