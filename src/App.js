// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "../src/Components/SignUp";
import SignIn from "../src/Components/SignIn";
import Home from "../src/Components/Home";
import AddJob from "../src/Components/Adding";
import PrivateRoute from "./Components/PrivateRoute";
//import authenticateJWT from "./middleware/authMiddleware";

const App = () => {
  const [auth, setAuth] = useState(false);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp setAuthStatus={setAuth} />} />
        <Route path="/signin" element={<SignIn setAuthStatus={setAuth} />} />
        <Route
          path="/home"
          element={
            <PrivateRoute auth={auth}>
              {" "}
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-job"
          element={
            <PrivateRoute auth={auth}>
              <AddJob />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
