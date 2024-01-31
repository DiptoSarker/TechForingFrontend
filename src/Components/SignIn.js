import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:5008";

const useStyles = makeStyles((theme) => ({
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
  inputField: {
    margin: theme.spacing(1),
  },
  errorText: {
    color: "red",
    marginTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(2),
  },
}));

const AuthPage = () => {
  const classes = useStyles();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignin = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Successful sign-in
        navigate("/signin");
      } else {
        // Unsuccessful sign-in
        setError(data.message);
      }
    } catch (error) {
      console.error("Error during signin:", error);
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.authContainer}>
        <Typography variant="h2">Signin</Typography>
        <TextField
          className={classes.inputField}
          type="email"
          label="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          onClick={handleSignin}
        >
          Sign In
        </Button>
        {error && (
          <Typography className={classes.errorText} variant="body1">
            {error}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
