// Import necessary modules
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/routes.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());
const port = 5000;
app.use("/api/projects", router);

mongoose
  .connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("> Connected to MongoDB Atlas"))
  .catch((err) =>
    console.log(`Error: ${err.message}`)
  );

app.get("/", (req, res) => {
  res.send("server is working");
});

app.listen(port, () =>
  console.log("server is running on:" + port)
);
