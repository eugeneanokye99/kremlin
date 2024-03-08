import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/HomePage/HomePage";
import Login from "./components/Login/Login";

function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route index element={<Login />} />
        <Route path="home" element={<Home />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App