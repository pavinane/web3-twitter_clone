import React, { useState, useEffect } from "react";
// import golf from "../images/golf.png";
// import canoe from "../images/canoe.png";
import { defaultImgs } from "../Data/defaultImg";
import { Icon } from "web3uikit";
import { useMoralis } from "react-moralis";
import "./TweetInFeed.css";

const TweetInFeed = ({ profile }) => {
  const [tweetArr, setTweetArr] = useState();
  const { Moralis, account } = useMoralis();

  useEffect(() => {
    async function getTweets() {
      try {
        const Tweets = Moralis.Object.extend("Tweets");
        const query = new Moralis.Query(Tweets);
        if (profile) {
          query.equalTo("tweeterAcc", account);
        }
        const results = await query.find();

        setTweetArr(results);
        // console.log(results);
      } catch (error) {
        // console.error(error);
      }
    }
    getTweets();
  }, [Moralis.Object, Moralis.Query, account, profile]);

  return (
    <>
      {tweetArr
        ?.map((e) => {
          return (
            <>
              <div className="feedTweet">
                <img
                  src={
                    e.attributes.tweeterPfp
                      ? e.attributes.tweeterPfp
                      : defaultImgs[0]
                  }
                  alt=""
                  className="profilePic"
                ></img>
                <div className="completeTweet">
                  <div className="who">
                    {e.attributes.tweeterUserName}
                    {/* <div className="accWhen">
                    {`${e.attributes.ethAddress.slice(
                      0,
                      4
                    )}... ${e.attributes.ethAddress.slice(38)}.
                    ${e.attributes.createdAt.toLocalString("en-us", {
                      month: "short",
                    })}
                    ${e.attributes.createdAt.toLocalString("en-us", {
                      day: "numeric",
                    })}
                    
                    `}
                  </div> */}
                    <div className="accWhen">
                      {/* ${e.attributes.tweeterAcc.slice(
                      0,
                      4
                    )}...${e.attributes.tweeterAcc.slice(38)} ·  */}
                      {`${e.attributes.tweeterAcc}.
                        ${e.attributes.createdAt.toLocaleString("en-us", {
                          month: "short",
                        })}  
                        ${e.attributes.createdAt.toLocaleString("en-us", {
                          day: "numeric",
                        })}
                        `}
                    </div>
                  </div>
                  <div className="tweetContent">
                    {e.attributes.tweetTxt}

                    {e.attributes.tweetImg && (
                      <img
                        src={e.attributes.tweetImg}
                        className="tweetImg"
                        alt=""
                      ></img>
                    )}
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
            </>
          );
        })
        .reverse()}
      {/* <div className="feedTweet">
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
      <div className="feedTweet"></div> */}
    </>
  );
};

export default TweetInFeed;
