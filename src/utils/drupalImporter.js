const axios = require("axios");

function getShoes(limit = 100, offset = 0) {
  return axios.post(process.env.DRUPAL_URL, {
    variables: {
      limit,
      offset
    },
    query: `
    query($limit: Int!, $offset: Int!){
      nodeQuery(limit: $limit, offset:$offset, filter:{conditions:{field:"type", value: "shoe"}}){
        count
        entities {
          entityId
          entityLabel
          entityUrl {
            path
          }
          ...on NodeShoe {
            fieldShoeSize
            fieldShoePrice
            fieldShoePhoto {
              derivative(style:MEDIUM) {
                height
                url
              }
            }
          }
        }
      }
    }
  `
  });
}

module.exports = async store => {
  let result = null;

  const contentType = store.addContentType({
    typeName: "Shoe",
    route: "/shoe/:id"
  });

  let limit = 100;
  let offset = 0;
  do {
    result = await getShoes(limit, offset);
    offset = offset + limit;
    console.log("getShoes", limit, offset);
    result.data.data.nodeQuery.entities.forEach(entity => {
      const node = {
        fields: {
          id: entity.entityId,
          title: entity.entityLabel,
          path: entity.entityUrl.path,
          size: entity.fieldShoeSize,
          price: entity.fieldShoePrice,
          photo: {
            url: entity.fieldShoePhoto.derivative.url
          }
        }
      };
      contentType.addNode(node);
    });
  } while (result.data.data.nodeQuery.entities.length > 0);
};
