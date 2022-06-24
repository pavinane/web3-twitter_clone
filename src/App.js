import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Setting from "./pages/Setting";
import "./App.css";
import Sidebar from "./Component/Sidebar";
import Rightbar from "./Component/Rightbar";
import { useMoralis } from "react-moralis";
import { ConnectButton, Icon } from "web3uikit";

function App() {
  const { isAuthenticated, Moralis } = useMoralis();

  return (
    <>
      {isAuthenticated ? (
        <div className="page">
          <div className="sideBar">
            <Sidebar />
            <div
              className="logout"
              onClick={() => {
                Moralis.User.logOut().then(() => {
                  window.location.reload();
                });
              }}
            >
              Logout
            </div>
          </div>
          <div className="mainWindow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/setting" element={<Setting />} />
            </Routes>
          </div>
          <div className="rightBar">
            <Rightbar />
          </div>
        </div>
      ) : (
        <div className="loginPage">
          <Icon fill="#ffffff" size={40} svg="twitter" />
          <ConnectButton />
        </div>
      )}
    </>
  );
}

export default App;
