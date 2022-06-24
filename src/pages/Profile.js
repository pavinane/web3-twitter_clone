import React from "react";
import { Link } from "react-router-dom";
import TweetInFeed from "../Component/TweetInFeed";
// import { Link } from "react-router-dom";
import { defaultImgs } from "../Data/defaultImg";
import "./Profile.css";

const Profile = () => {
  return (
    <>
      <div className="pageIdentify">Profile</div>
      <img className="profileBanner" src={defaultImgs[1]} alt=""></img>
      <div className="pfpContainer">
        <img className="profilePFP" src={defaultImgs[0]} alt=""></img>
        <div className="profileName">Pavinane</div>
        <div className="profileWallet">0x425r..292u8h</div>
        <Link to="/setting">
          <div className="profileEdit">Edit profile</div>
        </Link>
        <div className="profileBio">FrontEnd Developer</div>
        <div className="profileTabs">
          <div className="profileTab">Your Tweets</div>
        </div>
      </div>
      <TweetInFeed profile={true} />
    </>
  );
};

export default Profile;
