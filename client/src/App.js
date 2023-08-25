import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Footer from "./components/Footer.jsx";
import RecipleTemplate from "./pages/RecipeTemplate.js";
import BucketList from "./pages/BucketList.js";
import NavContext from "./components/NavContext.jsx";
import Profile from "./pages/Profile.jsx";
import AboutUs from "./pages/AboutUs.js";
import Advanced from "./pages/Advanced.jsx";
import Searched from "./pages/Searched.js";
import Explore from "./pages/Explore.jsx";

const App = () => {
   const [navOpen, setNavOpen] = useState(true);
   const isLoggedIn = localStorage.getItem("loggedIn");

   return (
      <NavContext.Provider value={{ navOpen, setNavOpen }}>
         <Router>
            <Navbar setSearched />
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/explore" element={<Explore />} />
               <Route path="/login" element={<Login />} />
               <Route path="/register" element={<Register />} />
               <Route path="/profile" element={<Profile />} />
               <Route path="/recipe/:name" element={<RecipleTemplate />} />
               <Route path="/bucket" element={<BucketList />} />
               <Route path="/aboutus" element={<AboutUs />} />
               <Route path="/advanced" element={<Advanced />} />
               <Route path="/searched/:search" element={<Searched />} />
            </Routes>
            <Footer />
         </Router>
      </NavContext.Provider>
   );
};

export default App;
