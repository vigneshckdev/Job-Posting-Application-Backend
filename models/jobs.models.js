const mongoose = require("mongoose");
const jobSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        enum: ["Full-Time(On-site)", "Part-time(On-site)", "Full-time(Remote)", "Part-time(Remote)"],
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    jobQualification: {
        type: [String],
        required: true
    }
}, {timestamps: true})

const Jobs = mongoose.model("Jobs", jobSchema);
module.exports = Jobs;