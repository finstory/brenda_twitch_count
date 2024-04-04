import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppRouter } from "./AppRouter";

export const AppMain = () => {
  return (
    <BrowserRouter basename="/brenda_twitch_count">
      <Routes>
        <Route path="/*" element={<AppRouter />} />
      </Routes>
    </BrowserRouter>
  );
};
