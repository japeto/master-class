
const dotenv = require("dotenv").config()
const app = require('./routes')

const port = process.env.PORT || 5000;

const server = app.listen(port, ()=>{
    let host = server.address().address;
    if(process.env.NODE_ENV !== "production") console.log("Server listening at http://", host, port);
})