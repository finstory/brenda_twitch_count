import React, { useEffect, useRef, useState } from "react";
import { List } from "../components/List";
import { app } from "../firebase/firebase";
export const Dashboard = () => {
  const queryParams = new URLSearchParams(location.search);
  const editMode = queryParams.get("edit");

  return (
    <div className="dashboard">
      <div
        className=""
        style={{
          position: "absolute",
          display: editMode === "yes" ? "flex" : "none",
          top: "0",
          left: "0",
          width: "100%",
          height: "auto",
          backgroundColor: "rgba(0,0,0,0.8)",
          color: "white",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          zIndex: "1000",
          fontSize: "2rem",
          color: "red",
          padding: "1rem",
        }}
      >
        <p>
        Cuidado Bren!, La ventana "normal" (SIN BOTONES ABAJO DEL TIEMPO) solo podes abrirla en el obs. Si la abrís en cualquier otro lado se bugea el tiempo.'
        </p>
      </div>
      <List />
    </div>
  );
};
