const express = require("express");
const app = express();

const userRoutes = require("./routes/users");
app.use("/users", userRoutes);

app.get("/", (req, resp)=>{
    resp.json({
        "message":"pong"
    })
})

const server = app.listen(8000, ()=>{
    let host = server.address().address;
    let port = server.address().port;
    console.log("Server listening at http://", host, port);
})