require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/vote";

// mongoose
//   .connect(mongoURI)
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB connection error:", err));

const chatRoutes = require("./routes/chat");
const voteRoutes = require("./routes/vote");

app.use("/chat", chatRoutes);
app.use("/vote", voteRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
