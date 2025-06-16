import React, { useEffect } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const firstName = cookies.get("firstName");
  const lastName = cookies.get("lastName");

  const navigate = useNavigate();

  return (
    <div>
      Hello {firstName || "User"} {lastName || ""}
    </div>
  );
};

export default Home;
