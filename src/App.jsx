import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage";
import ShowPage from "./components/ShowPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="/:id" element={<ShowPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
