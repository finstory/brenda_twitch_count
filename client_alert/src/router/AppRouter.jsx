import { Route, Routes } from "react-router-dom";

import { Dashboard } from "../pages/Dashboard";


export const AppRouter = () => {
  // const videoRef = useRef(null);

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
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </>
  );
};
