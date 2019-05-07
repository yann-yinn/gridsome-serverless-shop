// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const drupalImporter = require("./src/utils/drupalImporter");

module.exports = function(api) {
  // Use the Data store API here: https://gridsome.org/docs/data-store-api
  api.loadSource(async store => {
    await drupalImporter(store);
  });
};
