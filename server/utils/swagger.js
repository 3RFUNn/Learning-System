import swaggerAutogen from "swagger-autogen";
import swaggerDoc from "../swagger.json" assert {type: "json"};

const outputFile = "./swagger_output.json";

const endpointsFiles = [
    "./routes/users.route.js",
    "./routes/auth.route.js",
    "./routes/courses.route.js",
    "./routes/terms.route.js",
    "./main.js",
];

swaggerAutogen()(outputFile, endpointsFiles,swaggerDoc);
