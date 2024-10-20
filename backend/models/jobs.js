const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  name: { type: String, required: true },
  post: { type: String, required: true },
  stipend: { type: Number, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  email: { type: String, required: true },
  type: { type: String, required: true },
  skills: {type: String, required: true},
  experience: { type: String, required: true },
}, { timestamp: true });

const Job = mongoose.model("Job", jobSchema);

module.exports = Job; //exporting the model and mongoose
