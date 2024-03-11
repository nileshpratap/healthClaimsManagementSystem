import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "HCMS API Documentation",
    description: "Description",
  },
  host: "localhost:5000",
};

const outputFile = "./swagger-output.json";
const routes = [
  "./routes/users.js",
  "./routes/claims.js",
  "./routes/policies.js",
];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);
