import "./App.css";
import { Routes, Route } from "react-router-dom";

import LandingRoute from "./views/landing/index.js";
import Signup from "./modules/signup/Signup";
import Home from "./modules/home/Home";
import Posts from "./modules/posts/posts";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingRoute />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </>
  );
};

export default App;
