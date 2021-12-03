const dotenv = require("dotenv").config()
const mgdb = require("mongoose");

//// Allow conection from URI
//// URI conection has been created from environtment variables
mgdb.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/masterclassuno`, (err, db)=>{
    if(err) throw err;
    if(process.env.NODE_ENV !== "production") console.log("Success!!! Database conected!");
});

module.exports = mgdb;