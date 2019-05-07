require("../lib/bootstrap");
const { Shoe } = require("../lib/mongooseModels");
const mongoose = require("mongoose");

function installDemoData() {
  const promises = [];
  if (mongoose.connection.collections["shoes"]) {
    mongoose.connection.collections["shoes"].drop(() =>
      console.log("shoes collection dropped")
    );
  }
  promises.push(
    Shoe.create({
      title: "Blues shoes",
      size: 40,
      description: "Nice blues shoes"
    }),
    Shoe.create({
      title: "Red shoes",
      size: 40,
      description: "Nice red shoes"
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
