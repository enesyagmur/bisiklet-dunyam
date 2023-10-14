import "../styles/components-style/scrollbutton.css";
import { BsArrowUp } from "react-icons/bs";

const ScrollButton = () => {
  const scroollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="scrollbutton" onClick={scroollUp}>
      <BsArrowUp />
    </div>
  );
};

export default ScrollButton;
