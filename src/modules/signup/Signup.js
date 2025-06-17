import React from "react";
import styles from "./Signup.module.scss";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Link } from "react-router-dom";
import useSignup from "./useSignup";

const Signup = () => {
  const {
    email,
    firstName,
    lastName,
    pwd,
    matchPwd,
    validEmail,
    validPwd,
    validMatch,
    emailRef,
    errRef,
    emailFocus,
    pwdFocus,
    matchFocus,
    errMsg,
    setEmail,
    setFirstName,
    setLastName,
    setPwd,
    setMatchPwd,
    setEmailFocus,
    setPwdFocus,
    setMatchFocus,
    handleSubmit,
  } = useSignup();

  return (
    <section className={styles["signup"]}>
      <div className={styles["signup-container"]}>
        <p
          ref={errRef}
          className={
            errMsg
              ? styles["signup-container-error-msg"]
              : styles["signup-container-error-msg-offscreen"]
          }
          aria-live="assertive"
        >
          {errMsg}
        </p>

        <h1 className={styles["signup-container-title"]}>Sign Up</h1>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="text"
              id="email"
              ref={emailRef}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={validEmail ? "false" : "true"}
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
          </FormGroup>

          <FormGroup>
            <Label for="firstName">First Name</Label>
            <Input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label for="lastName">Last Name</Label>
            <Input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              required
              aria-invalid={validPwd ? "false" : "true"}
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
          </FormGroup>

          <FormGroup>
            <Label for="confirm_pwd">Confirm Password</Label>
            <Input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              required
              aria-invalid={validMatch ? "false" : "true"}
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
          </FormGroup>

          <Button className={styles["signup-container-button"]}>Sign Up</Button>
        </Form>

        <p className={styles["signup-container-login-text"]}>
          Already registered?
          <Link to="/" className={styles["signup-container-login-link"]}>
            Log In
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Signup;
