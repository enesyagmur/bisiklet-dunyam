import React from "react";
import "../styles/login.css";

const Login = () => {
  return (
    <div className="login">
      <div className="login-main">
        <p className="login-title">Giriş Yap</p>
        <input type="email" className="email" placeholder="Email" />
        <input type="password" className="password" placeholder="Şifre" />
        <p className="login-remember-password">Şifremi Unuttum</p>
        <button>Giriş Yap</button>
        <div className="other-login-methods">
          <button>Google ile Giriş</button> <button>Facebook ile Giriş</button>
        </div>
      </div>

      <div className="go-register">
        <p className="go-register-title">Üye Değil Misiniz?</p>
        <button>Üye Ol</button>
      </div>
    </div>
  );
};

export default Login;
