import "./App.css";
import { Routes, Route } from "react-router-dom";

import LandingRoute from "./views/landing/index.js";
import Signup from "./modules/signup/Signup";
import Home from "./modules/home/Home";

import RequireAuth from "./components/RequireAuth.js";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingRoute />} />

        <Route element={<RequireAuth />}>
          <Route path="/home" element={<Home />} />
        </Route>

        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};

export default App;
