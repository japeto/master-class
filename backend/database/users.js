const mgdb = require("mongoose");

const nameSchema =  new mgdb.Schema({
    title:String,
    first:String,
    last:String
})

const idSchema = new mgdb.Schema({
    type:String,
    value:String
})

const pictureSchema = new mgdb.Schema({
    large: String,
    small: String,
    thumbnail: String,
})

const userSchema = new mgdb.Schema({
    id:idSchema,
    name:nameSchema,
    gender:String,
    email:{
        type:String,
        trim:true,
        require:true
    },
    phone:String,
    cell:String,
    address:String,
    birth_date:String,
    picture:pictureSchema
});
/**
 * Check if model has been compiled.
 * @param {string} modelName 
 */
const checkModel = ( modelName )=>{
    mgdb.modelNames().indexOf(modelName) == -1
    ? mgdb.model(modelName, userSchema)
    : mgdb.connection.model(modelName)
}

checkModel("Users")