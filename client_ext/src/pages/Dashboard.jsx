import React, { useEffect, useRef, useState } from "react";
import { List } from "../components/List";
import { app } from "../firebase/firebase";
export const Dashboard = () => {
  return (
    <div className="dashboard">
      <List />
    </div>
  );
};
