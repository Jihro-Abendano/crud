import "./App.css";
import { Routes, Route } from "react-router-dom";

import LandingRoute from "./views/landing/index.js";
import Signup from "./modules/signup/Signup";
import Home from "./modules/home/Home";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingRoute />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
