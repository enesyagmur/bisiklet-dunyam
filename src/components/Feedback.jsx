import React, { useEffect, useState } from "react";
import "../styles/components-style/feedback.css";
import { BsChevronLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import { AiTwotoneStar } from "react-icons/ai";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase";

const Feedback = () => {
  const [sliderCount, setSliderCount] = useState(0);
  const [comments, setComments] = useState([]);

  const collectionCommentsRef = collection(db, "comments");

  const getAllCommentsFromDbFunc = async () => {
    const data = await getDocs(collectionCommentsRef);
    const commentsData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setComments(commentsData);
  };

  //slider arttırma func
  const sliderCountIncrease = () => {
    if (sliderCount === 4) {
      setSliderCount(0);
    } else {
      setSliderCount(sliderCount + 1);
    }
  };
  //slider azaltma func
  const sliderCountDecrease = () => {
    if (sliderCount === 0) {
      setSliderCount(4);
    } else {
      setSliderCount(sliderCount - 1);
    }
  };

  useEffect(() => {
    getAllCommentsFromDbFunc();
  }, []);

  return (
    <div className="feedback">
      <div className="feedback-left-btn">
        <BsChevronLeft onClick={sliderCountDecrease} />
      </div>
      <div className="feedback-right-btn">
        <BsChevronRight onClick={sliderCountIncrease} />
      </div>
      <p className="feedback-title">GERİ BİLDİRİM</p>
      <div className="comment-list">
        {comments[sliderCount] ? (
          <>
            <div className="comment">
              <p className="user-comment">
                {comments[sliderCount].commentContent}
              </p>
              <p className="product-info">
                {comments[sliderCount].comentedProduct}
              </p>
              <div className="user-info">
                <BiUser className="user-icon" />
                <p className="user-name">{comments[sliderCount].userName}</p>
                <p className="user-point">
                  {comments[sliderCount].userPoint}/<AiTwotoneStar />
                  <AiTwotoneStar />
                  <AiTwotoneStar />
                  <AiTwotoneStar />
                  <AiTwotoneStar />
                </p>
              </div>
            </div>
            <div className="comment">
              <p className="user-comment">
                {comments[sliderCount + 1].commentContent}
              </p>
              <p className="product-info">
                {comments[sliderCount + 1].comentedProduct}
              </p>
              <div className="user-info">
                <BiUser className="user-icon" />
                <p className="user-name">
                  {comments[sliderCount + 1].userName}
                </p>
                <p className="user-point">
                  {comments[sliderCount + 1].userPoint}/<AiTwotoneStar />
                  <AiTwotoneStar />
                  <AiTwotoneStar />
                  <AiTwotoneStar />
                  <AiTwotoneStar />
                </p>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Feedback;
