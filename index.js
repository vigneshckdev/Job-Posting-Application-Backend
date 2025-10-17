require("dotenv").config()
const {initializeDatabase} = require("./db/db.connect");
const express = require("express");
const app = express();
const Jobs = require("./models/jobs.models");
app.use(express.json());
initializeDatabase();


app.get("/", (req,res) => {
    res.send("Hello from the server");
})

async function displayJobPosting(){
    try{
        const jobs = await Jobs.find()
        return jobs;
    }
    catch(error){
        console.log("Something went wrong", error);
    }
}

app.get("/jobPostingInfo", async (req,res) => {
    try{
        const job = await displayJobPosting();
        if(job.length !== 0){
            res.json(job);
        }
        else{
            res.status(404).json({message: "No jobs found"});
        }
    }
    catch(error){
        throw error;
    }
})

app.post("/jobPostings", async (req,res) => {
    try{
        const newJobs = new Jobs(req.body);
        const savedJobs = new newJobs.save();
        req.status(200).json({message: "Jobs saved", data: savedJobs});
    }
    catch(error){
        res.status(404).json({message: "Something went wrong"});
    }
})

PORT = 3000;
app.listen(PORT,() => {
    console.log(`Running on PORT ${PORT}`);
})