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
         mgdb.model("User").find({"email":"roca.medina@example.com"}, (err, users)=>{
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
                console.log("error when save ", user);
            }else{
                console.log("saved ", user)
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
                }else{
                    console.log("Retrieving id ", req.params.id);
                    resp.json(user);
                }
            })
    })
    .put(function(req, resp){
        mgdb.model("Users").findById(req.params.id, 
            (err, user)=>{
                if(err){
                    console.log("There was a problem ", err);
                }else{
                    console.log("Updating id ", req.params.id);
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
                    console.log("Deleting id ", req.params.id);
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

