import { React, useState } from "react";
import styles from "./Signup.module.scss";
import { Form, Input, Button } from "reactstrap";
import { api } from "../../api/axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prevalue) => {
      return {
        ...prevalue,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/signup", formData);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });

      console.log(response);
    } catch (e) {
      console.log("Error in creating user: ", e);
    }
  };

  return (
    <div className={styles["signup"]}>
      <div className={styles["signup-container"]}>
        <div className={styles["signup-container-form"]}>
          <h1 className={styles["signup-container-form-text"]}>Sign up</h1>
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />

            <div className={styles["signup-container-form-actions"]}>
              <Button type="submit" color="primary">
                Sign up
              </Button>
              <a href="/" className={styles["signup-container-form-create"]}>
                Log in
              </a>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
