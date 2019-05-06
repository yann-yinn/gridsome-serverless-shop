const { CORSHeaders } = require("../lib/bootstrap");
const { Shoe } = require("../lib/mongooseModels");

exports.handler = function(event, context, callback) {
  return Shoe
    .find({})
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
