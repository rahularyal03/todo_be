require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const todoRouter = require("./routes/taskRoute");

app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: process.env.MONGODB_DB,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/todo", todoRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}!`);
});
