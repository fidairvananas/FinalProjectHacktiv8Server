const app = require("../app");
const request = require("supertest");
const { Dealer } = require("../models");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");

describe("Dealer login routes", () => {
  describe("POST /dealers/login - success test", () => {
    let dealer = {
      email: "test@mail.com",
      password: "12345",
    };

    it("should return correct response (200) when input is correct and user is registered", (done) => {
      request(app)
        .post("/dealers/login")
        .send(dealer)
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("message", expect.any(String));
          expect(res.body).toHaveProperty("access_token", expect.any(String));
          done();
        });
    });
  });

  describe("POST /dealers/login - failed test", () => {
    let dealer = {
      email: "tes2@mail.com",
      password: "12345",
    };

    it("should return correct response (401) when user is not registered", (done) => {
      request(app)
        .post("/dealers/login")
        .send(dealer)
        .then((res) => {
          expect(res.status).toBe(401);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("message", expect.any(String));
          done();
        });
    });

    it("should return correct response (401) when password is not correct", (done) => {
      request(app)
        .post("/dealers/login")
        .send({
          email: "test@mail.com",
          password: "1234",
        })
        .then((res) => {
          expect(res.status).toBe(401);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("message", expect.any(String));
          done();
        });
    });
  });
});
