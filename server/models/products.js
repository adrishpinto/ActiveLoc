import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  project_name: { type: String, required: true },
  client_name: { type: String, required: true },
  deadline: { type: Number, required: true },
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
