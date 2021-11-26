const mgdb = require("mongoose");
const express = require("express");

const db = require("../database/db"),
      users = require("../database/users");

const router = express.Router();  /// ofrece modularidad en tu codigo

router.use(express.json());     /// Convierte el _body_ de las solicitudes a JSON
router.use(express.urlencoded({extended:true})); // Convierte las solicitudes con parametros a través de la URL

router.route("/search")
    /**
     * @swagger
     * /search:
     *  get:
     *   description: response the pong message
     *  responses:
     *   200:
     *    description: {"message","pong"}
     */
     .get((req, resp)=>{
         const { name } = req.query;
         mgdb.model("Users").find({"name.first":name}, (err, users)=>{
            if(err) throw err;
            resp.json(users);
         })
     })

router.route("/")
    /**
     * @swagger
     * /users:
     *  get:
     *      summary: Returns a list of users.
     *      description: Contactame send first 100 users in DB as arrayt the objects.
     *  responses:
     *      200:
     *          description: A User object.
     *          schema:
     *              type: object
     *              properties:
     *                  id:
     *                      type: ObjectId
     *                      example: 619fc8ca9b4b0c1468536c23
     *      400:
     *          description: The specified user ID is invalid (e.g. not a number).
     *      404:
     *          description: A user with the specified ID was not found.
     *      default:
     *          description: Unexpected error
     */
    .get(function(req, resp){
        mgdb.model("Users")
        .find({})
        .limit(100)
        .exec((err, users)=>{
            if(err) throw err;
            resp.json(users);
        })
    })
    /**
     * @swagger
     * /users:
     *  post:
     *   description: response the pong message
     *  responses:
     *   200:
     *    description: {"message","pong"}
     */
    .post((req, resp)=>{
        mgdb.model("Users").create(
            req.body, 
            (err, user)=>{
            if(err){
                resp.json({"message":"User does not saved!"});
                console.log("error when save ", err);
            }else{
                resp.json(user);
            }
        })
    })

router.route("/:id")
    /** 
     * @swagger
     * paths:
     *  /users/{id}:
     *  get:
     *      summary: Returns a user by ID.
     *    parameters:
     *      - in: path
     *      name: id
     *      required: true
     *      type: ObjectId
     *      minimum: 1
     *      description: The ID of the user to return.
     *    responses:
     *       200:
     *          description: A User object.
     *          schema:
     *              type: object
     *              properties:
     *              id:
     *                  type: ObjectId
     *                  example: 619fc8ca9b4b0c1468536c23
     *       400:
     *          description: The specified user ID is invalid (e.g. not a number).
     *       404:
     *          description: A user with the specified ID was not found.
     *       default:
     *          description: Unexpected error
    */
    .get(function(req, resp){
        mgdb.model("Users").findById(req.params.id, 
            (err, user)=>{
                if(err){
                    console.log("There was a problem ", err);
                }else if(user){
                    resp.json(user);
                }else{
                    resp.status(404)
                    resp.json({"message":"Not Found"});
                }
            })
    })
    /**
     * @swagger
     * /users/id:
     *  put:
     *   description: response the pong message
     *  responses:
     *   200:
     *    description: {"message","pong"}
     */
    .put(function(req, resp){
        mgdb.model("Users").findById(req.params.id, 
            (err, user)=>{
                if(err){
                    console.log("There was a problem ", err);
                }else{
                    user.updateOne(req.body, (err, data)=>{
                        if(err) resp.json({"message": "Has been NOT updated"})
                        resp.json({
                            "_id":user._id,
                            "message": "Has been updated"
                        })
                    })
                }
            })
    })
    /**
     * @swagger
     * /users/id:
     *  delete:
     *   description: response the pong message
     *  responses:
     *   200:
     *    description: {"message","pong"}
     */
    .delete(function(req, resp){
        mgdb.model("Users").findById(req.params.id, 
            (err, user)=>{
                if(err){
                    console.log("There was a problem ", err);
                }else{
                    user.remove((err, user)=>{
                        if(err) resp.json({"message": "Has been NOT deleted"})
                        resp.json({
                            "_id":user._id,
                            "message": "Has been deleted"
                        })
                    })
                }
            })
    })

module.exports = router;

