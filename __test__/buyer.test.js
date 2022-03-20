const app = require("../app");
const request = require("supertest");
const { Buyer } = require("../models");
const { login } = require("../controllers/buyerController");

describe("Register buyer routes", () => {
  describe("POST /buyers/register - success test", () => {
    let newBuyer = {
      username: "Buyer",
      email: "buyer@mail.com",
      password: "12345",
      phoneNumber: "081234576892",
      address: "Jakarta Timur",
    };

    beforeEach(async () => {
      await Buyer.destroy({
        where: {
          email: newBuyer.email,
        },
      });
    });

    test("should return correct response (201) when input is correct", (done) => {
      request(app)
        .post("/buyers/register")
        .send(newBuyer)
        .end(function (err, res) {
          if (err) done(err);
          expect(res.status).toBe(201);
          expect(res.body).toBeInstanceOf(Object);
          done();
        });
    });
  });

  describe("POST /buyers/register - failed test", () => {
    test("should return correct response (400) when username is not inputted", (done) => {
      request(app)
        .post("/buyers/register")
        .send({
          email: "buyer@mail.com",
          password: "12345",
          phoneNumber: "081234576892",
          address: "Jakarta Timur",
        })
        .end(function (err, res) {
          if (err) done(err);
          expect(res.status).toBe(400);
          expect(res.body).toBeInstanceOf(Object);
          done();
        });
    });

    test("should return correct response (400) when email is not inputted", (done) => {
      request(app)
        .post("/buyers/register")
        .send({
          username: "Buyer",
          password: "12345",
          phoneNumber: "081234576892",
          address: "Jakarta Timur",
        })
        .end(function (err, res) {
          if (err) done(err);
          expect(res.status).toBe(400);
          expect(res.body).toBeInstanceOf(Object);
          done();
        });
    });

    test("should return correct response (400) when email is not valid", (done) => {
      request(app)
        .post("/buyers/register")
        .send({
          username: "Buyer",
          email: "This is email",
          password: "12345",
          phoneNumber: "081234576892",
          address: "Jakarta Timur",
        })
        .end(function (err, res) {
          if (err) done(err);
          expect(res.status).toBe(400);
          expect(res.body).toBeInstanceOf(Object);
          done();
        });
    });

    test("should return correct response (400) when email is already registered", (done) => {
      request(app)
        .post("/buyers/register")
        .send({
          username: "Buyer",
          email: "buyer@mail.com",
          password: "12345",
          phoneNumber: "081234576892",
          address: "Jakarta Timur",
        })
        .end(function (err, res) {
          if (err) done(err);
          expect(res.status).toBe(400);
          expect(res.body).toBeInstanceOf(Object);
          done();
        });
    });

    test("should return correct response (400) when password is not inputted", (done) => {
      request(app)
        .post("/buyers/register")
        .send({
          username: "Buyer",
          email: "buyer@mail.com",
          phoneNumber: "081234576892",
          address: "Jakarta Timur",
        })
        .end(function (err, res) {
          if (err) done(err);
          expect(res.status).toBe(400);
          expect(res.body).toBeInstanceOf(Object);
          done();
        });
    });

    test("should return correct response (400) when password less than 5 character", (done) => {
      request(app)
        .post("/buyers/register")
        .send({
          username: "Buyer",
          email: "buyer@mail.com",
          password: "1234",
          phoneNumber: "081234576892",
          address: "Jakarta Timur",
        })
        .end(function (err, res) {
          if (err) done(err);
          expect(res.status).toBe(400);
          expect(res.body).toBeInstanceOf(Object);
          done();
        });
    });

    test("should return correct response (400) when phone number is not inputted", (done) => {
      request(app)
        .post("/buyers/register")
        .send({
          username: "Buyer",
          email: "buyer@mail.com",
          password: "12345",
          address: "Jakarta Timur",
        })
        .end(function (err, res) {
          if (err) done(err);
          expect(res.status).toBe(400);
          expect(res.body).toBeInstanceOf(Object);
          done();
        });
    });
  });
});

describe("Buyer login routes", () => {
  describe("POST /buyers/login - success test", () => {
    let buyer = {
      email: "buyer@mail.com",
      password: "12345",
    };

    test("should return correct response (200) when input is correct and buyer is registered", (done) => {
      request(app)
        .post("/buyers/login")
        .send(buyer)
        .end(function (err, res) {
          if (err) done(err);
          expect(res.status).toBe(200);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("access_token", expect.any(String));
          done();
        });
    });
  });

  describe("POST /buyers/login - failed test", () => {
    test("should return correct response (401) when buyer is not registered", async () => {
      const mReq = { body: { email: "test@mail.com", password: "12345" } };
      const mRes = {};
      const mNext = jest.fn();
      await login(mReq, mRes, mNext);
      expect(mNext).toBeCalledWith(expect.anything());
    });

    test("should return correct response (401) when buyer password is not correct", async () => {
      const mReq = { body: { email: "buyer@mail.com", password: "12" } };
      const mRes = {};
      const mNext = jest.fn();
      await login(mReq, mRes, mNext);
      expect(mNext).toBeCalledWith(expect.anything());
    });
  });
});
