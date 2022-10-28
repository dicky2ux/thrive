const swaggerAutogen = require("swagger-autogen")();
const port = require("./bin/www").port;

const doc = {
  info: {
    version: "1.0.0",
    title: "API Documentation",
    description: "API Documentation for E-Commerce App",
  },
  host: `localhost:${port}`,
  basePath: "/",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],

  tags: [
    {
      name: "User",
      description: "User API",
      path: "/user",
    },
    {
      name: "Product",
      description: "Product API",
      path: "/product",
    },
    {
      name: "Order",
      description: "Order API",
      path: "/order",
    },
  ],
  // security using JWT Token
  securityDefinitions: {
    Bearer: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
    },
  },
  security: [
    {
      Bearer: [],
    },
  ],
};
const outputFile = "./swagger_output.json";
const endpointsFiles = [
  "./app.js",
  "./controllers/users.controllers.js",
  "./controllers/products.controllers.js",
  "./controllers/orders.controllers.js",
  "./models/user.js",
  "./models/product.js",
  "./models/order.js",
  "./bin/www",
];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./app");
});
