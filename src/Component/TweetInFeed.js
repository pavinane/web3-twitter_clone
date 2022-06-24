import React from "react";
import golf from "../images/golf.png";
import canoe from "../images/canoe.png";
import { defaultImgs } from "../Data/defaultImg";
import { Icon } from "web3uikit";
import "./TweetInFeed.css";

const TweetInFeed = () => {
  return (
    <>
      <div className="feedTweet">
        <img src={defaultImgs[0]} alt="" className="profilePic"></img>
        <div className="completeTweet">
          <div className="who">
            pavinane
            <div className="accWhen">0x222... 1h</div>
          </div>
          <div className="tweetContent">
            this is my first tweet
            <img src={golf} className="tweetImg" alt=""></img>
          </div>
          <div className="interactions">
            <div className="interactionNums">
              <Icon fill="#3f3f3f" size={20} svg="messageCircle" />
            </div>
            <div className="interactionNums">
              <Icon fill="#3f3f3f" size={20} svg="star" />
              12
            </div>
            <div className="interactionNums">
              <Icon fill="#3f3f3f" size={20} svg="matic" />
            </div>
          </div>
        </div>
      </div>
      <div className="feedTweet"></div>
    </>
  );
};

export default TweetInFeed;
