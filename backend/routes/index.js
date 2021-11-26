const express = require("express");
const app = express();

const swaggerJsDoc =  require("swagger-jsdoc");
const swaggerUI =  require("swagger-ui-express");
const swaggerDocument =  require("../swagger.json");

const specs =  swaggerJsDoc(swaggerDocument);

const userRoutes = require("./users");
app.use("/users", userRoutes);

app.get("/", (req, resp)=>{
    resp.json({
        "message":"pong"
    })
})

module.exports = app;