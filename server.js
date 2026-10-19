const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const logger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
};
app.use(logger);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api", (req, res) => {
  res.send("My Week 2 API");
});

app.post("/user", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "name or email missing" });
  }

  res.json({ message: `Hello, ${name}!` });
});

app.get("/user/:id", (req, res) => {
  const { id } = req.params;
  res.send(`User ${id} profile`);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});