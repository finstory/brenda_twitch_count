import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppRouter } from "./AppRouter";

export const AppMain = () => {
  return (
    <BrowserRouter basename="/ext_brenda">
      <Routes>
        <Route path="/*" element={<AppRouter />} />
      </Routes>
    </BrowserRouter>
  );
};
