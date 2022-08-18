require("dotenv").config();
const routes = require("./routes/routes")
const express = require("express");
const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database connected successfully");
});

const app = express();

app.use(express.json());


app.use("/api", routes)


app.listen(7000, () => {
  console.log("server is running on port 7000");
});
