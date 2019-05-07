// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const axios = require("axios");

module.exports = function(api) {
  // Use the Data store API here: https://gridsome.org/docs/data-store-api
  api.loadSource(store => {
    return axios
      .post(process.env.GRAPHCMS_URL, {
        query: `{
          shoes {
            title
            size
            content
            id
            createdAt
            price
          } 
       }`
      })
      .then(result => {
        const contentType = store.addContentType({
          typeName: "Shoe",
          route: "/shoe/:id"
        });
        //console.log("r", JSON.stringify(result.data, 0, 1));
        result.data.data.shoes.forEach(shoe => {
          contentType.addNode({
            title: shoe.title,
            content: shoe.content,
            fields: {
              price: shoe.price,
              size: shoe.size
            }
          });
        });
      });
  });
};
