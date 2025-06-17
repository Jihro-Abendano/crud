import React, { useEffect } from "react";
import Cookies from "universal-cookie";
import { useNavigate, Navigate } from "react-router-dom";
import { Button } from "reactstrap";
import styles from "./Home.module.scss";
const Home = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const firstName = cookies.get("firstName");
  const lastName = cookies.get("lastName");

  const navigate = useNavigate();

  const handleLogout = () => {
    cookies.remove("token");
    cookies.remove("firstName");
    cookies.remove("lastName");

    navigate("/");
  };

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return (
    <section className={styles["home"]}>
      <div>
        Hello {firstName || "User"} {lastName || ""}
      </div>

      <Button>Edit profile</Button>
      <Button onClick={handleLogout}>Log out</Button>
    </section>
  );
};

export default Home;
