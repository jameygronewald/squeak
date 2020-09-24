import * as express from "express";
import * as path from "path";
import * as cors from "cors";
const authController = require('../controllers/authController');
const placeController = require('../controllers/placeController');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", '*');
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
// app.options('*', cors());

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
