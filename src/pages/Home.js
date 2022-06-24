import React, { useState, useRef } from "react";
import { defaultImgs } from "../Data/defaultImg";
import { TextArea, Icon } from "web3uikit";
import TweetInFeed from "../Component/TweetInFeed";
// import { useMoralis } from "react-moralis";
import "./Home.css";

const Home = () => {
  // const { Moralis } = useMoralis();
  // const user = Moralis.User.current()
  const inputFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState();

  const onImageClick = () => {
    inputFile.current.click();
  };

  const changeHandler = (e) => {
    const img = e.target.files[0];
    setSelectedFile(URL.createObjectURL(img));
  };

  return (
    <>
      <div className="pageIdentify">Home</div>
      <div className="mainContent">
        <div className="profileTweet">
          <img src={defaultImgs[0]} alt="" className="profilePic"></img>
          <div className="tweetBox">
            <TextArea
              label=""
              name="tweetTextArea"
              value="GM World"
              type="text"
              width="95%"
            ></TextArea>
            {selectedFile && (
              <img src={selectedFile} alt="" className="tweetImg"></img>
            )}
            <div className="imgOrTweet">
              <div className="imgDiv" onClick={onImageClick}>
                <input
                  type="file"
                  name="file"
                  ref={inputFile}
                  onChange={changeHandler}
                  style={{ display: "none" }}
                />
                <Icon fill="#1DA1f2" size={20} svg="image" />
              </div>
              <div className="tweetOptions">
                <div className="tweet">Tweet</div>
                <div className="tweet" style={{ backgroundColor: "#8247e5" }}>
                  <Icon fill="#ffffff" size={20} svg="matic" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <TweetInFeed profile={false} />
      </div>
    </>
  );
};

export default Home;
