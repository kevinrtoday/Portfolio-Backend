const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// dotenv configuration
require("dotenv").config();

// database connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Database connected ✔️ ");
  })
  .catch(() => {
    console.log("Database connection error ❌");
  });

// general middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/projects", require("./routes/project"));

// listent to port
const port = process.env.PORT;
app.listen(port, () => {
  console.log("server running");
});
