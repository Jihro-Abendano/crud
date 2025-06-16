import React, { useState, useRef, useEffect, useContext } from "react";
import { Form, Input, Button } from "reactstrap";
import styles from "./LandingLogin.module.scss";
import axios from "../../api/axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

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
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email: </label>
        <input
          type="text"
          id="email"
          ref={emailRef}
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button>Log In</button>
      </form>

      <p>
        No Account?
        <a href="#">Sign up</a>
      </p>
    </section>
  );
};

export default LandingLogin;
