import React, { useEffect, useRef } from "react";
import { Carousel } from "../components/Dashboard/Home/Carousel/Carousel";
import { Panel } from "../components/Dashboard/Home/Panel/Panel";
export const Test = () => {

  const videoRef = useRef(null);

  // useEffect(() => {
  //   const videoC = videoRef.current;

  //   const handleLoadedMetadata = () => {
  //     if (videoC) videoC.currentTime = 2;
  //   };
  //   if (videoC) videoC.addEventListener("loadedmetadata", handleLoadedMetadata);

  //   return () => {
  //     if (videoC)
  //       videoC.removeEventListener("loadedmetadata", handleLoadedMetadata);
  //   };
  // }, []);

  return (
    <div className="dashboard">
     <video autoPlay="autoplay" muted loop className="bg_video">
        <source
        src="https://res.cloudinary.com/dmdftmzoy/video/upload/v1701668265/Dashboard/technology_bg_xvv2oh.mp4"
        type="video/mp4"
        />
        Tu navegador no soporta la etiqueta de video.
      </video>
      <div className="home">
        <section>
          <Panel />
        </section>
        <section>{/* <Carousel /> */}</section>
      </div>
    </div>
  );
};
