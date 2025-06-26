import "./App.css";
import { Routes, Route } from "react-router-dom";

import LandingRoute from "./views/landing/index.js";
import Signup from "./modules/signup/Signup";
import Post from "./modules/post/Post";

import RequireAuth from "./components/RequireAuth.js";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingRoute />} />

        <Route element={<RequireAuth />}>
          <Route path="/post" element={<Post />} />
        </Route>

        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};

export default App;
