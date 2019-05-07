// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const axios = require("axios");

module.exports = function(api) {
  // Use the Data store API here: https://gridsome.org/docs/data-store-api
  api.loadSource(async store => {
    const result = await axios.post(process.env.GRAPHCMS_URL, {
      query: `
      {
        shoes {
          id
          createdAt
          title
          price
          size
          status
          photo {
            url
          }
        }
      }
    `
    });

    const contentType = store.addContentType({
      typeName: "Shoe",
      route: "/shoe/:slug"
    });

    result.data.data.shoes.forEach(shoe => {
      const node = { fields: shoe };
      contentType.addNode(node);
    });
  });
};
