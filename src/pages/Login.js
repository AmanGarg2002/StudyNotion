import React from "react";
import Template from "../components/core/Auth/Template";
import loginImg from "../assets/Images/login.webp";
import { useEffect } from "react";

const Login = ({ setProgress }) => {
  useEffect(() => {
    setProgress(88);

    setTimeout(() => {
      setProgress(100);
    }, 700);
  }, []);

  return (
    <Template
      title="Welcome Back"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={loginImg}
      formType="login"
    ></Template>
  );
};

export default Login;
