import React from "react";
import { Form, Input, Button } from "reactstrap";

import styles from "./LandingLogin.module.scss";

const LandingLogin = () => {
  return (
    <div className={styles["login"]}>
      <div className={styles["login-container"]}>
        <div className={styles["login-container-placeholder"]}></div>
        <div className={styles["login-container-form"]}>
          <div className={styles["login-container-form-text"]}>
            Login to your account
          </div>
          <Form>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Email"
            />
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Password"
            />
          </Form>

          <div className={styles["login-container-form-actions"]}>
            <Button type="submit" color="primary">
              Login
            </Button>
            <a href="/" className={styles["login-container-create"]}>
              Create An Account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingLogin;
