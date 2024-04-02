import React from "react";
import { Character } from "./Character";
import { Dialogue } from "./Dialogue";
import Counter from "./Counter";

export const List = () => {
  return (
    <div className="list_container">
      <div className="header_container">
        <div className="wrap_container">
          <div className="wrap"></div>
        </div>
        <div className="header">
          <div className="bren_img">
            <img
              src="https://res.cloudinary.com/dz9smi3nc/image/upload/v1712043366/twitch_api_to_take_roll/bren-2_bao2kv.gif"
              alt="brenda"
            />
          </div>
          <p>EXTENSIBLE - SUBS & BITS</p>
          <div className="other_img">
            <img
              src="https://res.cloudinary.com/dz9smi3nc/image/upload/v1712044273/twitch_api_to_take_roll/sonic_xabxu7.gif"
              alt="charizard"
            />
          </div>
        </div>
      </div>
      <div className="list">
        <div className="item">
          <p>1 sub</p> <p>5 min</p>
        </div>
        <div className="item black_item">
          <p>2 sub</p> <p>10 min</p>
        </div>
        <div className="item">
          <p>3 sub</p> <p>15 min</p>
        </div>
        <div className="item black_item">
          <p>100 bits</p> <p>3 min</p>
        </div>
        <div className="item">
          <p>1000 bits</p> <p>20 min</p>
        </div>
        <div className="item black_item">
          <p>5000 bits</p> <p>120 min</p>
        </div>
        <div className="item">
          <p>10000 bits</p> <p>1 día</p>
        </div>
      </div>
      <Counter />
    </div>
  );
};
