var express = require("express");
var app = express();

require("dotenv").config();

const port = process.env.PORT || 5174;

const mongoose = require("mongoose");

if (process.env.DATABASE === "MONGODBATLAS") {
  mongoose.connect(process.env.DATABASEURL);
  mongoose.connection.on("error", (err) => {
    console.log("Connection Failed");
  });
  mongoose.connection.on("connected", (connected) => {
    console.log("Connected to MongoDB Atlas.");
  });
} else {
  console.log("No proper ENV.");
}

const cors = require("cors");

let allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://analyticdashboard-ten.vercel.app",
  "https://shikhar-react-portfolio.vercel.app",
];

app.use(
  cors({
    credentials: true,
    origin: allowedOrigins,
  })
);

const articlesRoute = require("./routes/newsArticleRoute");

app.use("/", articlesRoute);

app.listen(port);
