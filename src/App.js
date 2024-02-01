// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "../src/Components/SignUp";
import SignIn from "../src/Components/SignIn";
import Home from "../src/Components/Home";
import AddJob from "../src/Components/Adding";
import PrivateRoute from "./Components/PrivateRoute";
//import authenticateJWT from "./middleware/authMiddleware";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              {" "}
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-job"
          element={
            <PrivateRoute>
              <AddJob />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
