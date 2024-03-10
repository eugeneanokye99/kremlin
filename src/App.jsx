import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/HomePage/HomePage";
import Login from "./components/Login/Login";
import Register from './components/Register/Register';
import ScanPage from './components/ScanPage/ScanPage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/scan" element={<ScanPage />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App