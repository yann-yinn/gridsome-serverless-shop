// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function(api) {
  api.loadSource(store => {
    // Use the Data store API here: https://gridsome.org/docs/data-store-api
    const shoes = store.addContentType({
      typeName: "Shoe",
      route: "/shoe/:id"
    });
    shoes.addNode({
      id: "2",
      title: "My first blog post",
      fields: {
        size: "40",
        description: "My value"
      }
    });
  });
};
