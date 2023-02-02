const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authenticateToken = require("./middlewares/authenticateToken");
const db = require("./models");

const dbConfig = require("./config/db.config");
const Site = require("./models/sites.model");
const User = require("./models/user.model");

const auth = require("./routes/auth/index.js");
const api = require("./routes/api/index.js");
const app = express();

require("dotenv").config();

console.log(process.env.CORS_ORIGIN);
var corsOptions = {
  origin: process.env.CORS_ORIGIN,
};

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

app.use(express.static("public"));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "gbase-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true,
  })
);

db.mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    // initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

app.use("/auth", auth);

app.use("/api", authenticateToken, api);

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "public") });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;
