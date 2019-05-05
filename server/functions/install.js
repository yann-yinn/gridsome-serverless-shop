const { Shoe } = require("../lib/mongooseModels");
const mongoose = require("mongoose");
require("dotenv").config();
console.log("p", process.env.MONGODB_URL);

let connection = null;

connection = mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true
});

function installDemoData() {
  const promises = [];
  promises.push(
    Shoe.create({
      title: "Blues shoes",
      size: 40,
      description: "Nice blues shoes"
    })
  );
  return Promise.all(promises);
}

exports.handler = function(event, context, callback) {
  return installDemoData()
    .then(r => {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(r)
      });
    })
    .catch(e => {
      callback(e, {
        statusCode: 500,
        body: e
      });
    });
};
