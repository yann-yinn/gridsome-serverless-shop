exports.handler = function(event, context, callback) {
  counter++;
  callback(null, {
    statusCode: 200,
    body: "Hello, World"
  });
};
