import React, { useState, useRef } from "react";
import { defaultImgs } from "../Data/defaultImg";
import { TextArea, Icon } from "web3uikit";
import TweetInFeed from "../Component/TweetInFeed";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import "./Home.css";

const Home = () => {
  const { Moralis } = useMoralis();
  const user = Moralis.User.current();
  const contractProcessor = useWeb3ExecuteFunction();

  const [theFile, setThefile] = useState();
  const [tweet, setTweet] = useState();

  async function maticTweet() {
    if (!tweet) return;

    let img;

    if (theFile) {
      const data = theFile;
      const file = new Moralis.File(data.name, data);
      await file.saveIPFS();
      img = file.ipfs();
    } else {
      img = "No Img";
    }

    let options = {
      contractAddress: "0xCbc5Fe7BCa917e5560D07A0a5AC7520EA99Ca099",
      functionName: "AddTweet",
      abi: "",
    };
  }

  const inputFile = useRef(null);
  const [selectedFile, setSelectedFile] = useState();

  async function saveTweet() {
    if (!tweet) return;

    const Tweets = Moralis.Object.extend("Tweets");

    const newTweets = new Tweets();

    newTweets.set("tweetTxt", tweet);
    newTweets.set("tweeterPfp", user.attributes.pfp);
    newTweets.set("tweeterAcc", user.attributes.ethAddress);
    newTweets.set("tweeterUserName", user.attributes.username);

    if (theFile) {
      const data = theFile;
      const file = new Moralis.File(data.name, data);
      await file.saveIPFS();
      newTweets.set("tweetImg", file.ipfs());
    }

    await newTweets.save();
    window.location.reload();
  }

  const onImageClick = () => {
    inputFile.current.click();
  };

  const changeHandler = (e) => {
    const img = e.target.files[0];
    setThefile(img);
    setSelectedFile(URL.createObjectURL(img));
  };

  return (
    <>
      <div className="pageIdentify">Home</div>
      <div className="mainContent">
        <div className="profileTweet">
          <img
            src={user.attributes.pfp ? user.attributes.pfp : defaultImgs[0]}
            alt=""
            className="profilePic"
          ></img>
          <div className="tweetBox">
            <TextArea
              label=""
              name="tweetTextArea"
              value="GM World"
              type="text"
              onChange={(e) => setTweet(e.target.value)}
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
                <div className="tweet" onClick={saveTweet}>
                  Tweet
                </div>
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
