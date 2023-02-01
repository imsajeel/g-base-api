const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.set("strictQuery", false);

const db = {};

db.mongoose = mongoose;

db.sites = require("./sites.model");
db.user = require("./user.model");

module.exports = db;
