import "../styles/home.css";
import Header from "../components/Header";
import Category from "../components/Category";
import Slider from "../components/Slider";

import Map from "../components/Map";
import Footer from "../components/Footer";
import WishList from "../components/WishList";
import AdviceProducts from "../components/AdviceProducts";
import ScrollButton from "../components/ScrollButton";

const Home = () => {
  return (
    <div className="home">
      <Header />
      <Slider />
      <Category />
      <AdviceProducts />
      <WishList />
      <Map />
      <ScrollButton />
      <Footer />
    </div>
  );
};

export default Home;
