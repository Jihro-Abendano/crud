// src/hooks/useLogin.js
import { useState, useEffect, useRef } from "react";
import axios from "../../api/axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();

  const emailRef = useRef(null);
  const errRef = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/auth/login",
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const { token, firstName, lastName } = response.data.data;

      cookies.set("token", token, {
        path: "/",
        secure: true,
        sameSite: "none",
        maxAge: 3600,
      });

      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);

      navigate("/home");

      setEmail("");
      setPassword("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response.status === 400) {
        setErrMsg("Missing Email or Password");
      } else if (err.response.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }

      errRef.current?.focus();
    }
  };

  return {
    email,
    password,
    errMsg,
    emailRef,
    errRef,
    setEmail,
    setPassword,
    handleSubmit,
  };
};

export default useLogin;
