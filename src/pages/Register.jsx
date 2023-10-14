import React, { useState } from "react";
import "../styles/register.css";
import Header from "../components/Header";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const navigate = useNavigate();

  const registerFunc = () => {
    createUserWithEmailAndPassword(auth, inputEmail, inputPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          goLogin();
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  const goLogin = () => {
    navigate("/login");
  };
  return (
    <div className="register">
      <div className="register-main">
        <p className="register-title">Üye Ol</p>
        <input
          type="email"
          className="email"
          placeholder="Email"
          onChange={(e) => setInputEmail(e.target.value)}
        />
        <input
          type="password"
          className="password"
          placeholder="Şifre"
          onChange={(e) => setInputPassword(e.target.value)}
        />
        <button className="register-btn" onClick={registerFunc}>
          Üye ol
        </button>
        <div className="other-register-methods">
          <button>
            <FcGoogle />
          </button>
          <button>
            <BsFacebook />
          </button>
        </div>
      </div>

      <p className="go-register-title" onClick={goLogin}>
        Zaten Üye Misiniz?
      </p>
    </div>
  );
};

export default Register;
