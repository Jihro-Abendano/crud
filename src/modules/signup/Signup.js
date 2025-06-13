import React from "react";
import styles from "./Signup.module.scss";
import { Form, Input, Button } from "reactstrap";

const Signup = () => {
  return (
    <div className={styles["signup"]}>
      <div className={styles["signup-container"]}>
        <div className={styles["signup-container-form"]}>
          <h1 className={styles["signup-container-form-text"]}>Sign up</h1>
          <Form>
            <Input type="text" name="firstname" placeholder="First Name" />
            <Input type="text" name="lastname" placeholder="Last Name" />
            <Input type="email" name="email" placeholder="Email" />
            <Input type="password" name="password" placeholder="Password" />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
