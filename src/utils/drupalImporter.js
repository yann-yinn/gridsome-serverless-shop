const axios = require("axios");

module.exports = async store => {
  const result = await axios.post(process.env.DRUPAL_URL, {
    query: `
    {
      nodeQuery(filter:{conditions:{field:"type", value: "shoe"}}){
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
  console.log("r", JSON.stringify(result.data.data, 0, 2));

  const contentType = store.addContentType({
    typeName: "Shoe",
    route: "/shoe/:entityId"
  });

  console.log("before forEach");
  result.data.data.nodeQuery.entities.forEach(entity => {
    const node = {
      fields: {
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
  return result;
};
