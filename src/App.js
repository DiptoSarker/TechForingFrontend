// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "../src/Components/SignUp";
import SignIn from "../src/Components/SignIn";
import Home from "../src/Components/Home";
import AddJob from "../src/Components/Adding"; // Import the AddJob component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add-job" element={<AddJob />} />
      </Routes>
    </Router>
  );
}

export default App;
