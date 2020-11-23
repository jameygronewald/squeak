import * as express from "express";
import * as path from "path";
import * as cors from "cors";
const authController = require('../controllers/authController');
const placeController = require('../controllers/placeController');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
}

app.use(authController);
app.use(placeController);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});
