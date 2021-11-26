
const swaggerJsDoc =  require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const swaggerDocument =  require("../swagger.json");

const specs =  swaggerJsDoc(swaggerDocument);

const cors =require("cors");

const express = require("express");
const app = express();

app.use(cors({
    origin:"*"
}))

const userRoutes = require("./users");
app.use("/users", userRoutes);

/**
 * @swagger
 * /ping:
 *   get: 
 *     description: response pong message
 *     responses: 
 *       '200':
 *         description: pong message {"message":"pong"}
 */
app.get("/ping", (req, resp)=>{
    resp.json({
        "message":"pong"
    })
})

app.use('/', swaggerUI.serve, swaggerUI.setup(specs))

module.exports = app;