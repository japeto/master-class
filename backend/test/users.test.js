

const app = require("../routes")
const aUser = require("./aUser.json")

const expect = require("chai").expect;
const assert = require("chai").assert;

const request = require("supertest");

describe("Backend live ping-pong", ()=>{
    it("ping message", ()=>{
        return request(app)
        .get("/ping")
        .expect(200, {"message":"pong"})
    })
});

describe("Backend CRUD", ()=>{
    it("POST create a user", ()=>{
        return request(app)
        .post("/users")
        .send(aUser)
        .set("Accept","application/json")
        .expect(200)
        .expect("Content-type", /json/)
        .then(resp=>{
            assert(resp.body.email, aUser.email)
        })
        .catch(err=>err)
    })
    it('GET a non-existent user', ()=>{
        return request(app)
        .get("/users/618db856bbfc8fd9b6cf321f")
        .expect(404, {"message":"Not Found"});
    });
    it('GET a existent user', ()=>{
        return request(app)
        .get(`/users/${aUser._id}`)
        .expect(200)
        .then(response => {
            assert(response.body.email, aUser.email)
            assert(response.body.gender, aUser.gender)
        })
    });
    
    let otherUser = Object.assign({}, aUser);
    otherUser.gender = "male";

    it('PUT a user', ()=>{
        return request(app)
        .put(`/users/${aUser._id}`)
        .send(otherUser)
        .expect(200)
    });

    it('GET a user after updated', ()=>{
        return request(app)
        .get(`/users/${aUser._id}`)
        .expect(200)
        .then(response => {
            assert(response.body.email, aUser.email)
            assert(response.body.gender, otherUser.gender)
        })
    });

    it('Delete a user', ()=>{
        return request(app)
        .delete(`/users/${aUser._id}`)
        .expect(200)
        .then(resp=>{
            assert(resp.body.message, 'Has been deleted')
        })
    });
    it('GET all users', ()=>{
        return request(app)
        .get("/users/")
        .expect(200)
        .then(resp=>{
            assert.typeOf( resp.body, 'array', 'response non is a array' );
        })
    });
});