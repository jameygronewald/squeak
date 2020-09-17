const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const connection = require("./config/db").pool;
const authController = require('../controllers/authController');
const placeController = require('../controllers/placeController');

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(authController);
app.use(placeController);

app.get("/api/config", (req, res) => {
  res.json({ success: true });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});
