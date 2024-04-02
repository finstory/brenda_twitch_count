import React, { useEffect, useRef, useState } from "react";
import { List } from "../components/List";
import { app } from "../firebase/firebase";
export const Dashboard = () => {
  return (
    <div className="dashboard">
      <div
        className=""
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "auto",
          backgroundColor: "rgba(0,0,0,0.8)",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          zIndex: "1000",
          fontSize: "2rem",
          color: "red",
        }}
      >
        <p>
          Cuidado Bren!, La ventana en "modo edición" (la que tiene los botones)
          no podes cerrarla y solo podes abrir 1 sola de edición al mismo
          tiempo, sino te mide mal el tiempo.
        </p>
      </div>
      <List />
    </div>
  );
};
