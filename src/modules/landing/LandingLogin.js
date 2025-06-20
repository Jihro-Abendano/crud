import React from "react";
import styles from "./LandingLogin.module.scss";
import { Form, Input, Label, Button, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import useLogin from "./useLogin";

const LandingLogin = () => {
  const {
    email,
    password,
    errMsg,
    emailRef,
    errRef,
    setEmail,
    setPassword,
    handleSubmit,
  } = useLogin();

  return (
    <section className={styles["login"]}>
      <div className={styles["login-container"]}>
        {errMsg && (
          <p
            ref={errRef}
            className={styles["login-container-error-msg"]}
            aria-live="assertive"
          >
            {errMsg}
          </p>
        )}

        <h1 className={styles["login-container-title"]}>Login</h1>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              id="email"
              innerRef={emailRef}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="off"
            />
          </FormGroup>

          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormGroup>

          <Button className={styles["login-container-button"]} type="submit">
            Log In
          </Button>
        </Form>

        <p className={styles["login-container-or"]}>Or</p>

        <p className={styles["login-container-signup-text"]}>
          No Account?
          <Link to="/signup" className={styles["login-container-signup-link"]}>
            {" "}
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default LandingLogin;
