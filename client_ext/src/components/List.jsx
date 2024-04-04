import React, { useEffect, useState } from "react";
import { Character } from "./Character";
import { Dialogue } from "./Dialogue";
import Counter from "./Counter";
import { getDatabase, ref, onValue, set, get, child } from "firebase/database";

const assets = [
  {
    url: "https://res.cloudinary.com/dz9smi3nc/image/upload/v1712055911/twitch_api_to_take_roll/tumblr_ordp3ujo2O1w1kerio1_400_vr1mvn.gif",
    size: "normal",
  },
  {
    url: "https://res.cloudinary.com/dz9smi3nc/image/upload/v1712053824/twitch_api_to_take_roll/064f6460-d877-4ed5-a0ab-bd100a7f6da1_za0x8x.gif",
    size: "medium",
  },
  {
    url: "https://res.cloudinary.com/dz9smi3nc/image/upload/v1712055880/twitch_api_to_take_roll/deaglxp-62d26a34-2e65-4b92-a018-63c916cc5b53_bsuk3k.gif",
    size: "normal",
  },
  {
    url: "https://res.cloudinary.com/dz9smi3nc/image/upload/v1712056645/twitch_api_to_take_roll/dgcj0b1-247ba9bb-cba5-4e9a-aa64-3033538559a5_cy6cky.gif",
    size: "big",
  },
  {
    url: "https://res.cloudinary.com/dz9smi3nc/image/upload/v1712056646/twitch_api_to_take_roll/tumblr_or9824qkg01w1kerio2_400_ge7sop.gif",
    size: "medium",
  },
];

export const List = () => {
  const queryParams = new URLSearchParams(location.search);
  const editMode = queryParams.get("edit");

  const imgSize = (widht) => {
    switch (widht) {
      case "normal":
        return "11rem";
      case "medium":
        return "14rem";
      case "big":
        return "24rem";
      default:
        return "15rem";
    }
  };

  const [imageToAppear, setImageToAppear] = React.useState(assets[0].url);
  const [size, setSize] = React.useState("11rem");

  React.useEffect(() => {
    const interval = setInterval(() => {
      const asset = assets[Math.floor(Math.random() * assets.length)];
      setImageToAppear(asset.url);
      setSize(imgSize(asset.size));
    }, 90000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const assetsSwitch = [
    {
      brenda_img:
        "https://res.cloudinary.com/dz9smi3nc/image/upload/v1712043366/twitch_api_to_take_roll/bren-2_bao2kv.gif",
      other_img:
        "https://res.cloudinary.com/dz9smi3nc/image/upload/v1712044273/twitch_api_to_take_roll/sonic_xabxu7.gif",
    },
    {
      brenda_img:
        "https://res.cloudinary.com/dz9smi3nc/image/upload/v1712221495/twitch_api_to_take_roll/bren-3_c4hxc8.gif",
      other_img:
        "https://res.cloudinary.com/dz9smi3nc/image/upload/v1712223340/twitch_api_to_take_roll/ad46ea795ed5_Chocobo_nb4rcz.gif",
    },
  ];

  const [fantasy, setFantasy] = useState(false);

  function getFantasy() {
    const db = getDatabase();
    const fantasyRef = ref(db, "fantasy");

    onValue(fantasyRef, (snapshot) => {
      const data = snapshot.val();
      setFantasy(data);
    });
  }

  useEffect(() => {
    getFantasy();
  }, []);

  const [rewardList, setRewardList] = React.useState([]);

  React.useEffect(() => {
    const db = getDatabase();
    const rewardListRef = ref(db, "rewardList");

    onValue(rewardListRef, (snapshot) => {
      const data = snapshot.val();
      setRewardList(data);
    });
  }, []);
  console.log(rewardList);
  const incrementTime = async (index) => {
    const updatedReward = {
      ...rewardList[index],
      time: rewardList[index].time + 1,
    };
    const db = getDatabase();
    await set(ref(db, `rewardList/${index}`), updatedReward);
  };

  const decrementTime = async (index) => {
    if (rewardList[index].time > 0) {
      const updatedReward = {
        ...rewardList[index],
        time: rewardList[index].time - 1,
      };
      const db = getDatabase();
      await set(ref(db, `rewardList/${index}`), updatedReward);
    }
  };

  return (
    <div className={`list_container ${fantasy ? "fantasy" : ""}`}>
      <div className={`header_container ${fantasy ? "fantasy" : ""}`}>
        <div className={`wrap_container ${fantasy ? "fantasy" : ""}`}>
          <div className={`wrap ${fantasy ? "fantasy" : ""}`}></div>
        </div>
        <div className={`header ${fantasy ? "fantasy" : ""}`}>
          <div className={`bren_img ${fantasy ? "fantasy" : ""}`}>
            <img
              src={
                !fantasy
                  ? assetsSwitch[0].brenda_img
                  : assetsSwitch[1].brenda_img
              }
              alt="brenda"
            />
          </div>
          <p>EXTENSIBLE - SUBS & BITS</p>
          <div className={`other_img ${fantasy ? "fantasy" : ""}`}>
            <img
              src={
                !fantasy ? assetsSwitch[0].other_img : assetsSwitch[1].other_img
              }
              style={
                fantasy
                  ? { padding: "1.4rem 0rem 0 1rem", transform: "scaleX(-1)" }
                  : {}
              }
              alt="charizard"
            />
          </div>
        </div>
      </div>
      <div className={`list ${fantasy ? "fantasy" : ""}`}>
        <img
          className={`eggman_img ${fantasy ? "fantasy" : ""}`}
          src={imageToAppear}
          alt=""
          style={{ width: size }}
        />

        {rewardList.map((reward, index) => {
          return (
            <div
              key={index}
              className={`item ${index % 2 !== 0 ? "black_item" : ""} ${
                fantasy ? "fantasy" : ""
              }`}
            >
              <p>{reward.sub}</p>
              <p>{reward.time} {reward.metric}</p>
              {editMode === "yes" && (
                <div className="buttons">
                  <button
                    style={{
                      backgroundColor: "rgb(56, 179, 91)",
                      borderRadius: "50%",
                      marginRight: "0.5rem",
                      textAlign: "center",
                      border: " 1px solid rgb(27, 27, 27)",
                    }}
                    onClick={() => incrementTime(index)}
                  >
                    +
                  </button>
                  <button
                    style={{
                      backgroundColor: "rgb(174, 27, 27)",
                      borderRadius: "50%",
                      textAlign: "center",
                      border: " 1px solid rgb(27, 27, 27)",
                    }}
                    onClick={() => decrementTime(index)}
                  >
                    -
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {/* <div className={`item ${fantasy ? "fantasy" : ""}`}>
          <p>1 sub</p> <p>5 min</p>
        </div>
        <div className={`item black_item`}>
          <p>2 sub</p> <p>10 min</p>
        </div>
        <div className={`item ${fantasy ? "fantasy" : ""}`}>
          <p>3 sub</p> <p>15 min</p>
        </div>
        <div className={`item black_item`}>
          <p>100 bits</p> <p>3 min</p>
        </div>
        <div className={`item ${fantasy ? "fantasy" : ""}`}>
          <p>1000 bits</p> <p>20 min</p>
        </div>
        <div className={`item black_item`}>
          <p>5000 bits</p> <p>120 min</p>
        </div>
        <div className={`item ${fantasy ? "fantasy" : ""}`}>
          <p>10000 bits</p> <p>1 día</p>
        </div> */}
      </div>
      <Counter fantasy={fantasy} />
    </div>
  );
};
