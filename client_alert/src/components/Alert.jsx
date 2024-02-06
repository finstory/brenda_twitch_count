import React from "react";
import { Character } from "./Character";
import { Dialogue } from "./Dialogue";

export const Alert = () => {
  return (
    <div className="incoming_alert_container">
      <div className="wrap"></div>
      <div className="incoming_alert">
        <div className="top_img">
          <Character />
        </div>
        <Dialogue />
      </div>
    </div>
  );
};
