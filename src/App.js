import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

//Yapılanlar----------
// klasor yapısı kuruldu
//router kuruldu
//react icons kuruldu
//header(görünüm) yapıldı

//Yapılacaklar-------
//sayfalalrın planını yapma
//sayfa görünümleri
//auth kurulum
//firestore kurulum
//auth işlemleri giriş kayıt şifre sıfırlama vb
