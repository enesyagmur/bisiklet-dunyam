import React, { useState } from "react";
import "../styles/login.css";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { GoogleAuthProvider, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../Firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [openPasswordReset, setOpenPasswordReset] = useState(false);
  const [inputEmailForReset, setInputEmailForReset] = useState("");
  const navigate = useNavigate();

  //giriş func
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

  //google ile giriş func
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

  //password reset func
  const passwordResetFunc = () => {
    if (inputEmailForReset) {
      sendPasswordResetEmail(auth, inputEmailForReset)
        .then(() => {
          alert("sıfırlama linki gönderiliyor");
          setOpenPasswordReset(false);
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      alert("Mail adresinizi giriniz");
    }
  };

  const goRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login">
      <div className={openPasswordReset ? "inactive" : "login-main"}>
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
        <p
          className="login-remember-password"
          onClick={() => setOpenPasswordReset(true)}
        >
          Şifremi Unuttum
        </p>
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

      <div className={openPasswordReset ? "password-reset" : "inactive"}>
        <p className="password-reset-title">Şifre Sıfırlama</p>
        <input
          type="text"
          placeholder="Mail Adresinizi Giriniz"
          onChange={(e) => setInputEmailForReset(e.target.value)}
        />
        <button className="login-btn" onClick={passwordResetFunc}>
          Sıfırlama Linki Gönder
        </button>
        <p onClick={() => setOpenPasswordReset(false)}>Giriş Yap</p>
      </div>

      <p className="go-register-title" onClick={goRegister}>
        Üye Değil Misiniz?
      </p>
    </div>
  );
};

export default Login;
