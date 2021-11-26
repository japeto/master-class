

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
});