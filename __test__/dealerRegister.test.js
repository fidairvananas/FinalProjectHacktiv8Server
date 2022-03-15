const app = require("../app");
const request = require("supertest");
const { sequelize, Dealer } = require("../models");

describe("Register dealer routes", () => {
  let newDealer = {
    name: "Dealer",
    email: "dealer@mail.com",
    password: "12345",
    phoneNumber: "081312849392",
    storeName: "Cars",
    storeAddress: "Jakarta",
  };

  describe("POST /dealers/register - success test", () => {
    beforeEach(async () => {
      await Dealer.destroy({
        where: { email: newDealer.email },
      });
    });

    test("should return correct response (201) when input is correct", (done) => {
      request(app)
        .post("/dealers/register")
        .send(newDealer)
        .end(function (err, res) {
          if (err) done(err);
          expect(res.status).toBe(201);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("id", expect.any(Number));
          expect(res.body).toHaveProperty("email", newDealer.email);
          expect(res.body).toHaveProperty("name", newDealer.name);
          done();
        });
    });
  });

  describe("POST /dealers/register - failed test", () => {
    test("should return correct response (400) when name is not inputted", (done) => {
      request(app)
        .post("/dealers/register")
        .send({
          email: "dealer@mail.com",
          password: "12345",
          phoneNumber: "081312849392",
          storeName: "Cars",
          storeAddress: "Jakarta",
        })
        .end(function (err, res) {
          if (err) done(err);
          expect(res.status).toBe(400);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("message", expect.any(String));
          done();
        });
    });
  });

  describe("POST /dealers/register - failed test", () => {
    test("should return correct response (400) when email is not inputted", (done) => {
      request(app)
        .post("/dealers/register")
        .send({
          name: "Dealer",
          password: "12345",
          phoneNumber: "081312849392",
          storeName: "Cars",
          storeAddress: "Jakarta",
        })
        .end(function (err, res) {
          if (err) done(err);
          expect(res.status).toBe(400);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("message", expect.any(String));
          done();
        });
    });
  });

  describe("POST /dealers/register - failed test", () => {
    test("should return correct response (400) when email is not valid", (done) => {
      request(app)
        .post("/dealers/register")
        .send({
          name: "Dealer",
          email: "dealer_mail_com",
          password: "12345",
          phoneNumber: "081312849392",
          storeName: "Cars",
          storeAddress: "Jakarta",
        })
        .end(function (err, res) {
          if (err) done(err);
          expect(res.status).toBe(400);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("message", expect.any(String));
          done();
        });
    });
  });

  describe("POST /dealers/register - failed test", () => {
    test("should return correct response (400) when email is duplicate", (done) => {
      request(app)
        .post("/dealers/register")
        .send({
          name: "Dealer",
          email: "dealer@mail.com",
          password: "12345",
          phoneNumber: "081312849392",
          storeName: "Cars",
          storeAddress: "Jakarta",
        })
        .end(function (err, res) {
          if (err) done(err);
          expect(res.status).toBe(400);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("message", expect.any(String));
          done();
        });
    });
  });

  describe("POST /dealers/register - failed test", () => {
    test("should return correct response (400) when password is not inputted", (done) => {
      request(app)
        .post("/dealers/register")
        .send({
          name: "Dealer",
          email: "dealer@mail.com",
          phoneNumber: "0913245678",
          storeName: "Cars",
          storeAddress: "Jakarta",
        })
        .end(function (err, res) {
          if (err) done(err);
          expect(res.status).toBe(400);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("message", expect.any(String));
          done();
        });
    });
  });

  describe("POST /dealers/register - failed test", () => {
    test("should return correct response (400) when password less than 5 character", (done) => {
      request(app)
        .post("/dealers/register")
        .send({
          name: "Dealer",
          email: "dealer@mail.com",
          phoneNumber: "0913245678",
          password: "1234",
          storeName: "Cars",
          storeAddress: "Jakarta",
        })
        .end(function (err, res) {
          if (err) done(err);
          expect(res.status).toBe(400);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("message", expect.any(String));
          done();
        });
    });
  });

  describe("POST /dealers/register - failed test", () => {
    test("should return correct response (400) when phone number is not inputted", (done) => {
      request(app)
        .post("/dealers/register")
        .send({
          name: "Dealer",
          email: "dealer@mail.com",
          password: "12345",
          storeName: "Cars",
          storeAddress: "Jakarta",
        })
        .end(function (err, res) {
          if (err) done(err);
          expect(res.status).toBe(400);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("message", expect.any(String));
          done();
        });
    });
  });

  describe("POST /dealers/register - failed test", () => {
    test("should return correct response (400) when store name is not inputted", (done) => {
      request(app)
        .post("/dealers/register")
        .send({
          name: "Dealer",
          email: "dealer@mail.com",
          phoneNumber: "08123456789",
          password: "12345",
          storeAddress: "Jakarta",
        })
        .end(function (err, res) {
          if (err) done(err);
          expect(res.status).toBe(400);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("message", expect.any(String));
          done();
        });
    });
  });

  describe("POST /dealers/register - failed test", () => {
    test("should return correct response (400) when store address is not inputted", (done) => {
      request(app)
        .post("/dealers/register")
        .send({
          name: "Dealer",
          email: "dealer@mail.com",
          password: "12345",
          storeName: "Cars",
          phoneNumber: "08123456733"
        })
        .end(function (err, res) {
          if (err) done(err);
          expect(res.status).toBe(400);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("message", expect.any(String));
          done();
        });
    });
  });
});
