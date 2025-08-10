import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import ChatBot from "../components/ChatBot";
const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/chat-bot" element={<ChatBot />}></Route>
    </Routes>
  );
};

export default MainRoutes;
