require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { initializeDatabase } = require("./db/db.connect");
const Jobs = require("./models/jobs.models");

const app = express();

app.use(cors());
app.use(express.json());
initializeDatabase();

// -----------------Root Route-----------------------
app.get("/", (req, res) => {
  res.send("Hello from the server");
});

// -----------------Helper Function-----------------------
async function displayJobPosting() {
  try {
    const jobs = await Jobs.find();
    return jobs;
  } catch (error) {
    console.log("Something went wrong", error);
  }
}

// -----------------Job Postings-----------------------
app.get("/jobPostingInfo", async (req, res) => {
  try {
    const job = await displayJobPosting();
    if (job.length !== 0) {
      res.json(job);
    } else {
      res.status(404).json({ message: "No jobs found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

//--------------------Post Jobs---------------------------
app.post("/jobPostings", async (req, res) => {
  try {
    const newJobs = new Jobs(req.body);
    const savedJobs = await newJobs.save();
    res.status(200).json({ message: "Jobs saved", data: savedJobs });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

//-------------------Get Info by Id------------------------------
app.get("/jobPostingInfo/:id", async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Jobs.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

//---------------------Delete Job Post---------------------------
app.delete("/jobPostings/:id", async (req, res) => {
  try {
    const jobId = req.params.id;
    const deletedJob = await Jobs.findByIdAndDelete(jobId);
    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json({ message: "Job deleted successfully", data: deletedJob });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running locally on port ${PORT}`);
  });
}

module.exports = app;
