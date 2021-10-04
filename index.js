const express = require("express");

const mongoose = require("mongoose");

const app = express();

// dotenv configuration
require("dotenv").config();

// database connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Database connected");
  })
  .catch(() => {
    console.log("Database connection error");
  });

// routes
app.get("/", (req, res) => {
  res.json({ message: "reached API" });
});

// listent to port
const port = process.env.PORT;
app.listen(port, () => {
  console.log("server running");
});
