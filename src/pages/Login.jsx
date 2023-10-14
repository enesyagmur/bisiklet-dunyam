import React, { useState } from "react";
import "../styles/login.css";
import Header from "../components/Header";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { GoogleAuthProvider } from "firebase/auth";

import { auth } from "../Firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const navigate = useNavigate();

  const loginFunc = () => {
    signInWithEmailAndPassword(auth, inputEmail, inputPassword)
      .then((userCredential) => {
        const user = userCredential.user;

        if (user) {
          if (inputEmail === "yakup@gmail.com" && inputPassword === "123456") {
            navigate("/adminorders");
          } else {
            navigate("/");
          }
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
  const provider = new GoogleAuthProvider();
  const loginGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        if (user) {
          navigate("/");
        }
      })
      .catch((err) => {
        alert(err);
      });
  };
  const goRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login">
      <div className="login-main">
        <p className="login-title">Giriş Yap</p>
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
        <p className="login-remember-password">Şifremi Unuttum</p>
        <button className="login-btn" onClick={loginFunc}>
          Giriş Yap
        </button>
        <div className="other-login-methods">
          <button onClick={loginGoogle}>
            <FcGoogle />
          </button>
          <button>
            <BsFacebook />
          </button>
        </div>
      </div>

      <p className="go-register-title" onClick={goRegister}>
        Üye Değil Misiniz?
      </p>
    </div>
  );
};

export default Login;
