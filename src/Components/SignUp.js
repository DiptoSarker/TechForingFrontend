import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "https://dipto-tech-foring-backend.onrender.com";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  authContainer: {
    display: "flex",
    flexDirection: "column",
    border: `1px solid ${theme.palette.primary.main}`,
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
    textAlign: "center",
  },
  signInLink: {
    marginTop: theme.spacing(2),
    cursor: "pointer",
    color: "blue",
    textDecoration: "underline",
  },
  inputField: {
    margin: theme.spacing(1),
  },
  errorText: {
    color: "red",
  },
  button: {
    margin: theme.spacing(2),
  },
}));

const AuthPage = ({ setAuthStatus }) => {
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleSignup = async () => {
    // Frontend email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      return;
    }

    try {
      // Clear previous email validation error
      setEmailError("");

      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.status === 400) {
        // Email already exists in the database
        setEmailError(data.message);
      } else {
        // Handle successful signin navigation...

        setAuthStatus(true);
        navigate("/home");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const navigate = useNavigate();

  const handleNavigate = () => {
    // Use the navigate function to move to the '/signin' route
    navigate("/signin");
  };

  return (
    <div className={classes.container}>
      <div className={classes.authContainer}>
        <Typography variant="h2">Signup</Typography>

        <TextField
          className={classes.inputField}
          type="text"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          className={classes.inputField}
          type="text"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={Boolean(emailError)}
          helperText={emailError}
        />

        <TextField
          className={classes.inputField}
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={handleSignup}
        >
          Sign Up
        </Button>
        <Typography variant="body2">
          Already have an account?{" "}
          <span className={classes.signInLink} onClick={handleNavigate}>
            Signin
          </span>
        </Typography>
      </div>
    </div>
  );
};

export default AuthPage;
