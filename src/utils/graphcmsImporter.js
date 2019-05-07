const axios = require("axios");

module.exports = async store => {
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
      slug
      photo {
        url
      }
    }
  }
`
  });
  //console.log("r", result.data.data.shoes);

  const contentType = store.addContentType({
    typeName: "Shoe",
    route: "/shoe/:slug"
  });

  console.log("before forEach");
  result.data.data.shoes.forEach(shoe => {
    console.log("into forEach : slug", shoe.slug);
    const node = { fields: shoe };
    contentType.addNode(node);
    //console.log("adding", JSON.stringify("node", node));
  });
  return result;
};
