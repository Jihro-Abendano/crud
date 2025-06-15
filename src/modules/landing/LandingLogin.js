import React, { useState } from "react";
import { Form, Input, Button } from "reactstrap";
import styles from "./LandingLogin.module.scss";
import { api } from "../../api/axios";

const LandingLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/login", formData);
      console.log("Login successful:", response.data);
      //token
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className={styles["login"]}>
      <div className={styles["login-container"]}>
        <div className={styles["login-container-placeholder"]}></div>
        <div className={styles["login-container-form"]}>
          <h1 className={styles["login-container-form-text"]}>
            Login to your account
          </h1>

          <Form onSubmit={handleSubmit}>
            <Input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
            />
            <div className={styles["login-container-form-actions"]}>
              <Button type="submit" color="primary">
                Login
              </Button>
              <a href="/signup" className={styles["login-container-create"]}>
                Create An Account
              </a>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LandingLogin;
