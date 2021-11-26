const express = require("express");
const app = express();

const userRoutes = require("./routes/users");
app.use("/users", userRoutes);

app.get("/", (req, resp)=>{
    resp.json({
        "message":"pong"
    })
})

module.exports = app;