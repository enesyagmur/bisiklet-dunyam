import React, { useState } from "react";
import "../styles/contact.css";

const ContactForm = () => {
  const [formStatus, setFormStatus] = useState("");
  const [key, setKey] = useState(0);

  const formLink = `https://formspree.io/f/${process.env.REACT_APP_FORM_KEY}`;

  const resetKey = () => {
    setTimeout(() => {
      setKey((prevKey) => prevKey + 1);
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const response = await fetch(formLink, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      setFormStatus("Success");
      resetKey();
    } else {
      setFormStatus("Error");
      resetKey();
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit} key={key}>
      <p className="contact-form-title">Bize Ulaşın</p>
      <div className="contact-form-user-info">
        <input
          type="text"
          placeholder="Konu Başlığı"
          className="contact-form-subject"
          name="subject"
          required
        />
        <input
          type="text"
          placeholder="İsim"
          className="contact-form-name"
          name="name"
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="contact-form-email"
          name="email"
          required
        />
      </div>
      <input
        type="text"
        placeholder="Message"
        className="contact-form-message"
        name="message"
        required
      />
      <div className="contact-form-agrement">
        <input type="checkbox" name="" id="" required />
        <div className="contact-form-agrement-explain">
          Bu formu doldurarak bilgilerinizin bu web sitesi tarafından
          saklanmasını kabul etmiş olursunuz.
        </div>
      </div>
      <button className="contact-form-btn" type="submit">
        Gönder
      </button>
      {formStatus === "Success" && (
        <p className="result-success">Mesajınız başarıyla gönderildi!</p>
      )}
      {formStatus === "Error" && (
        <p className="result-error">
          Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.
        </p>
      )}
    </form>
  );
};

export default ContactForm;
