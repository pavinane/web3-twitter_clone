import React, { useState, useRef, useEffect } from "react";
import { Input } from "web3uikit";
import pfp1 from "../images/pfp1.png";
import pfp2 from "../images/pfp2.png";
import pfp3 from "../images/pfp3.png";
import pfp4 from "../images/pfp4.png";
import pfp5 from "../images/pfp5.png";
import { defaultImgs } from "../Data/defaultImg";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";

import "./Setting.css";

const Setting = () => {
  const [pfps, setPfps] = useState([]);
  const inputFile = useRef(null);
  const [selectedPFP, setSelectedPFP] = useState();
  const [selectedFile, setSelectedFile] = useState(defaultImgs[1]);
  const [username, setUsername] = useState();
  const [bio, setBio] = useState();
  const [theFile, setTheFile] = useState();
  const { Moralis, isAuthenticated, account } = useMoralis();
  const Web3Api = useMoralisWeb3Api;

  const resolveLink = (url) => {
    if (!url || !url.includes("ipfs://")) return url;
    return url.replace("ipfs://", "https://gateway.ipfs.io/ipfs/");
  };

  useEffect(() => {
    const fetchNFTs = async () => {
      const options = {
        chain: "mumbai",
        address: account,
      };

      const mumbaiNFTs = await Web3Api.account.getNFTs(options);
      const images = mumbaiNFTs.result.map((e) =>
        resolveLink(JSON.parse(e.metadata)?.image)
      );
      setPfps(images);
    };

    fetchNFTs();
  }, [isAuthenticated, account]);

  const onBannerClick = () => {
    inputFile.current.click();
  };

  const changeHandler = (event) => {
    const img = event.target.files[0];
    setTheFile(img);
    setSelectedFile(URL.createObjectURL(img));
  };

  const saveEdits = async () => {
    const User = Moralis.Object.extend("_User");
    const query = new Moralis.Query(User);
    const myDetails = await query.first();

    if (bio) {
      myDetails.set("bio", bio);
    }

    if (selectedPFP) {
      myDetails.set("pfp", selectedPFP);
    }

    if (username) {
      myDetails.set("username", username);
    }

    if (theFile) {
      const data = theFile;
      const file = new Moralis.File(data.name, data);
      await file.saveIPFS();
      myDetails.set("banner", file.ipfs());
    }

    await myDetails.save();
    window.location.reload();
  };

  return (
    <>
      <div className="pageIdentify">Setting</div>
      <div className="settingsPage">
        <Input
          label="Name"
          name="NameChange"
          width="100%"
          labelBgColor="#141d26"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          label="Bio"
          name="bioChange"
          width="100%"
          labelBgColor="#141d26"
          onChange={(e) => setBio(e.target.value)}
        />
        <div className="pfp">
          Profile Image (Your NFTs)
          <div className="pfpOptions">
            {pfps.map((e, i) => {
              return (
                <>
                  <img
                    key={i}
                    src={e}
                    alt=""
                    className={
                      selectedPFP === e ? "pfpOptionSelected" : "pfpOption"
                    }
                    onClick={() => {
                      setSelectedPFP(pfps[i]);
                    }}
                  ></img>
                </>
              );
            })}
          </div>
        </div>
        <div className="pfp">
          Profile Banner
          <div className="pfpOptions">
            <img
              src={selectedFile}
              onClick={onBannerClick}
              className="banner"
            ></img>
            <input
              type="file"
              name="file"
              ref={inputFile}
              onChange={changeHandler}
              style={{ display: "none" }}
            />
          </div>
        </div>
        <div className="save" onClick={() => saveEdits()}>
          Save
        </div>
      </div>
    </>
  );
};

export default Setting;
