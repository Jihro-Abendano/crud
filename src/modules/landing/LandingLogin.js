import React, { useState, useRef, useEffect, useContext } from "react";
import { Form, Input, Button } from "reactstrap";
import styles from "./LandingLogin.module.scss";
import axios from "../../api/axios";
import Cookies from "universal-cookie";
import { useNavigate, Link } from "react-router-dom";

const LandingLogin = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();

  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/auth/login",
        JSON.stringify({ email: email, password: password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response));
      const token = response.data.data.token;

      cookies.set("token", token, {
        path: "/",
        secure: true,
        sameSite: "none",
        maxAge: 10,
      });

      cookies.set("firstName", response.data.data.firstName);
      cookies.set("lastName", response.data.data.lastName);

      navigate("/home");

      setEmail("");
      setPassword("");
    } catch (err) {
      if (!err?.response) {
        errMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Pasword");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }

      errRef.current.focus();
    }
  };

  return (
    <section className={styles["login"]}>
      <div className={styles["login-container"]}>
        <p
          ref={errRef}
          className={`${
            errMsg
              ? styles["login-container-error-msg"]
              : styles["login-container-error-msg-offscreen"]
          }`}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1 className={styles["login-container-title"]}>Login</h1>
        <Form
          onSubmit={handleSubmit}
          className={styles["login-container-form"]}
        >
          <label
            htmlFor="email"
            className={styles["login-container-form-label"]}
          >
            Email:{" "}
          </label>
          <Input
            type="text"
            id="email"
            ref={emailRef}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles["login-container-form-input"]}
          />

          <label
            htmlFor="password"
            className={styles["login-container-form-label"]}
          >
            Password:{" "}
          </label>
          <Input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles["login-container-form-input"]}
          />
          <Button className={styles["login-container-form-button"]}>
            Log In
          </Button>
        </Form>

        <p className={styles["login-container-signup-text"]}>
          No Account?
          <Link to="/signup" className={styles["login-container-signup-link"]}>
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default LandingLogin;
