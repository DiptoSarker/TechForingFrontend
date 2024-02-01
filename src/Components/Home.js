import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core//Paper";
import Button from "@material-ui/core//Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  jobContainer: {
    width: "70%",
    margin: "10px auto",
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.grey[200],
    "&:hover": {
      backgroundColor: theme.palette.grey[300],
    },
  },
  jobTitle: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginBottom: theme.spacing(1),
  },
  jobDescription: {
    fontSize: "1rem",
    marginBottom: theme.spacing(-4),
  },
  deleteButton: {
    marginTop: "0px",
    fontSize: "0.7rem",
    alignSelf: "flex-end",
  },
  addJobButton: {
    marginTop: "60px",
    padding: "10px 60px",
    fontSize: "1rem",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
      cursor: "pointer",
    },
  },
  headerText: {
    textAlign: "center",
    fontSize: "2rem",
    fontWeight: "bold",
    marginTop: "40px",
  },
  descText: {
    textAlign: "center",
    fontSize: "1rem",
    marginBottom: "30px",
  },
}));

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    // Fetch jobs when the component mounts
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      // Make a GET request to your server endpoint to fetch jobs
      const response = await axios.get(
        "https://dipto-tech-foring-backend.onrender.com/jobs"
      );

      // Update the state with the fetched jobs
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handleDelete = async (jobId) => {
    // Implement delete functionality
    try {
      await axios.delete(
        `https://dipto-tech-foring-backend.onrender.com/jobs/${jobId}`
      );

      // Refresh jobs after deleting
      fetchJobs();
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const handleAdd = (newJob) => {
    // Update the state with the newly added job
    setJobs([...jobs, newJob]);
  };

  return (
    <div className={classes.container}>
      <Typography className={classes.headerText}>
        BROWSE OPEN POSITIONS BY CATEGORY
      </Typography>
      <Typography className={classes.descText}>
        We are always on the lookout for talanted people
      </Typography>
      {jobs.map((job) => (
        <Paper key={job._id} className={classes.jobContainer} elevation={3}>
          <Typography className={classes.jobTitle}>{job.title}</Typography>
          <Typography className={classes.jobDescription}>
            {job.description}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            className={classes.deleteButton}
            onClick={() => handleDelete(job._id)}
          >
            Delete
          </Button>
        </Paper>
      ))}
      <Link to="/add-job">
        <Button className={classes.addJobButton} onAdd={handleAdd}>
          Add Job
        </Button>
      </Link>
    </div>
  );
};

export default Home;
