const mgdb = require("mongoose");
const express = require("express");

const db = require("../database/db"),
      users = require("../database/users");

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended:true}));

router.route("/search")
     .get((req, resp)=>{
         const { name } = req.query;
         mgdb.model("Users").find({"name.first":name}, (err, users)=>{
            if(err) throw err;
            resp.json(users);
         })
     })

router.route("/")
    .get(function(req, resp){
        mgdb.model("Users").find({}, (err, users)=>{
            if(err) throw err;
            resp.json(users);
        })
    })
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

