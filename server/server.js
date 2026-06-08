const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const User = require("./models/User");

const app = express();
console.log("hello world");
app.use(cors());
app.use(express.json());

const path = require("path");

app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend Connected" });
});

app.post("/api/users", async (req, res) => {
  console.log(req.body);
  try {
    console.log(req.body.name);
    console.log(req.body.email);
    const user = new User({
      name: req.body.name,
      email: req.body.email,
    });
    console.log(user);
    await user.save();
    console.log(user);
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

/*
GET USERS
*/
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    console.log(users);
    res.json(users);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
});

app.use(express.static(path.join(__dirname, "../client/dist")));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
