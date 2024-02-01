import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Typography,
  makeStyles,
  Grid,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(4),
  },
  form: {
    width: "80%",
    marginTop: theme.spacing(2),
  },
  input: {
    marginBottom: theme.spacing(2),
  },
  buttonGroup: {
    marginTop: theme.spacing(2),
  },
  addJobButton: {
    marginRight: theme.spacing(1),
  },
}));

const AddJob = ({ onAdd }) => {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleAdd = async () => {
    try {
      const response = await axios.post(
        "https://dipto-tech-foring-backend.onrender.com//jobs",
        {
          title,
          description,
        }
      );

      // Call the onAdd callback to refresh the jobs in the parent component
      onAdd(response.data.job);

      // Reset the form
      setTitle("");
      setDescription("");

      // Navigate to the home page
      navigate("/home");
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  return (
    <div className={classes.container}>
      <Typography variant="h5">Add Job</Typography>
      <form className={classes.form}>
        <TextField
          className={classes.input}
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          className={classes.input}
          label="Description"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Grid container spacing={1} className={classes.buttonGroup}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAdd}
              className={classes.addJobButton}
            >
              Add Job
            </Button>
          </Grid>
          <Grid item>
            <Link to="/home">
              <Button variant="contained">Back</Button>
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddJob;
