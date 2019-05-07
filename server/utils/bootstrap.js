const mongoose = require("mongoose");
require("dotenv").config();

let dbConnection = null;

if (dbConnection === null) {
  dbConnection = mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true
  });
}

const CORSHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type"
};

module.exports = {
  dbConnection,
  CORSHeaders
};
