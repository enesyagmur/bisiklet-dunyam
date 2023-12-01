import React, { useState } from "react";
import "../styles/login.css";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../Firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import toast from "react-hot-toast";

const Login = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [openPasswordReset, setOpenPasswordReset] = useState(false);
  const [inputEmailForReset, setInputEmailForReset] = useState("");
  const navigate = useNavigate();

  const loginFunc = () => {
    signInWithEmailAndPassword(auth, inputEmail, inputPassword)
      .then((userCredential) => {
        const user = userCredential.user;

        if (user) {
          navigate("/");
        } else {
          toast.error(`Giriş başarısız.`, {
            style: {
              border: "1px solid #b12718",
              padding: "16px",
              color: "#b12718",
            },
            iconTheme: {
              primary: "#b12718",
              secondary: "#e6e6e5",
            },
          });
        }
      })
      .catch((err) => {
        toast.error(err, {
          style: {
            border: "1px solid #b12718",
            padding: "16px",
            color: "#b12718",
          },
          iconTheme: {
            primary: "#b12718",
            secondary: "#e6e6e5",
          },
        });
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

  const passwordResetFunc = () => {
    if (inputEmailForReset) {
      sendPasswordResetEmail(auth, inputEmailForReset)
        .then(() => {
          toast("sıfırlama linki gönderiliyor");
          setOpenPasswordReset(false);
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      toast.error(`Mail adresi boş bırakılamaz.`, {
        style: {
          border: "1px solid #b12718",
          padding: "16px",
          color: "#b12718",
        },
        iconTheme: {
          primary: "#b12718",
          secondary: "#e6e6e5",
        },
      });
    }
  };

  const goRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login">
      <div className={openPasswordReset ? "inactive" : "login-main"}>
        <BiArrowBack className="back-button" onClick={() => navigate("/")} />
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
