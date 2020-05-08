const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.category = require("./Category/category");


db.ROLES = ["user", "tutor", "admin"];
db.CATEGORY = ["Primary", "Jss", "Sss"];

module.exports = db;
