import { React, useState } from "react";
import styles from "./Signup.module.scss";
import { Form, Input, Button } from "reactstrap";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const createUser = async (newUser) => {
    try {
      const response = await axios.post(
        "https://react-testing-server.onrender.com/api/v1",
        newUser
      );
    } catch (error) {
      console.error("Error creating user: ", error);
      throw error;
    }
  };

  return (
    <div className={styles["signup"]}>
      <div className={styles["signup-container"]}>
        <div className={styles["signup-container-form"]}>
          <h1 className={styles["signup-container-form-text"]}>Sign up</h1>
          <Form>
            <Input
              type="text"
              name="firstname"
              placeholder="First Name"
              value={formData.firstName}
            />
            <Input
              type="text"
              name="lastname"
              placeholder="Last Name"
              value={formData.lastName}
            />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
            />
          </Form>

          <div className={styles["signup-container-form-actions"]}>
            <Button type="submit" color="primary">
              Sign up
            </Button>
            <a href="/" className={styles["signup-container-form-create"]}>
              Log in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
