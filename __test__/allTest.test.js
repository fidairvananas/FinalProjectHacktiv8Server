const app = require("../app");
const request = require("supertest");
const { sequelize, Dealer } = require("../models");
const { queryInterface } = sequelize;

let newDealer = {
  name: "Dealer",
  email: "dealer@mail.com",
  password: "12345",
  phoneNumber: "081312849392",
  storeName: "Cars",
  storeAddress: "Jakarta",
};

let access_token;

let car = {
  name: "Ford Mustang G5",
  description: "This is sport car",
  fuel: "Solar",
  seats: 2,
  mileage: 12000,
  price: 1000000,
  color: "black",
  yearMade: "1989-04-23T18:25:43.511Z",
  TypeId: 5,
  image: ["tes", "tes"],
};

beforeAll((done) => {
  let data = {
    id: 1,
    name: "Ford Mustang G5",
    description: "This is sport car",
    fuel: "Solar",
    seats: 2,
    mileage: 12000,
    price: 1000000,
    color: "black",
    yearMade: "1989-04-23T18:25:43.511Z",
    TypeId: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  queryInterface
    .bulkInsert("Cars", [data], {})
    .then((res) => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

afterAll((done) => {
  queryInterface
    .bulkDelete("Cars", null, {})
    .then((res) => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

describe("Register dealer routes", () => {
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
          phoneNumber: "08123456733",
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

describe("Dealer login routes", () => {
  describe("POST /dealers/login - success test", () => {
    let dealer = {
      email: "dealer@mail.com",
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
          access_token = res.body.access_token;
          done();
        })
        .catch((err) => {
          done(err);
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
        })
        .catch((err) => {
          done(err);
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
        })
        .catch((err) => {
          done(err);
        });
    });
  });
});

// Car test

describe("Car routes", () => {
  describe("GET /cars - success test", () => {
    it("should return correct response (200) with cars data", (done) => {
      request(app)
        .get("/cars")
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body).toBeInstanceOf(Array);
          expect(res.body[0]).toHaveProperty("id", expect.any(Number));
          expect(res.body[0]).toHaveProperty("Type", expect.any(Object));
          expect(res.body[0]).toHaveProperty("Dealer", expect.any(Object));
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("GET /cars/:id - success test", () => {
    test("should return correct response (200) if car with id is in database", (done) => {
      request(app)
        .get(`/cars/${1}`)
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("id", expect.any(Number));
          expect(res.body).toHaveProperty("Type", expect.any(Object));
          expect(res.body).toHaveProperty("Dealer", expect.any(Object));
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("GET /cars/:id - failed test", () => {
    test("should return correct response (404) when car is not found", (done) => {
      request(app)
        .get(`/cars/${2}`)
        .then((res) => {
          expect(res.status).toBe(404);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("message", expect.any(String));
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("POST /cars - success test", () => {
    test("should return correct response (201) when car is created", (done) => {
      request(app)
        .post("/cars")
        .send(car)
        .set("access_token", access_token)
        .then((res) => {
          expect(res.status).toBe(201);
          expect(res.body).toHaveProperty("message", expect.any(String));
          done();
        })
        .catch((err) => {
          console.log(err);
          done(err);
        });
    });
  });

  describe("POST /cars - failed test", () => {
    test("should return correct response (400) when name field is missing", (done) => {
      request(app)
        .post("/cars")
        .send({
          description: "This is sport car",
          fuel: "Solar",
          seats: 2,
          mileage: 12000,
          price: 1000000,
          color: "black",
          yearMade: "1989-04-23T18:25:43.511Z",
          TypeId: 5,
          image: ["tes", "tes"],
        })
        .set("access_token", access_token)
        .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body).toHaveProperty("message", "Car name is required");
          done();
        })
        .catch((err) => {
          console.log(accesstoken, "disini");
          done(err);
        });
    });

    test("should return correct response (400) when description is missing", (done) => {
      request(app)
        .post("/cars")
        .send({
          name: "Ford Mustang G5",
          fuel: "Solar",
          seats: 2,
          mileage: 12000,
          price: 1000000,
          color: "black",
          yearMade: "1989-04-23T18:25:43.511Z",
          TypeId: 5,
          image: ["tes", "tes"],
        })
        .set("access_token", access_token)
        .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body).toHaveProperty("message", "Description is required");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test("should return correct response (400) when fuel field is missing", (done) => {
      request(app)
        .post("/cars")
        .send({
          name: "Ford Mustang G5",
          description: "This is sport car",
          seats: 2,
          mileage: 12000,
          price: 1000000,
          color: "black",
          yearMade: "1989-04-23T18:25:43.511Z",
          TypeId: 5,
          image: ["tes", "tes"],
        })
        .set("access_token", access_token)
        .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body).toHaveProperty("message", "Fuel is required");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test("should return correct response (400) when seats field is missing", (done) => {
      request(app)
        .post("/cars")
        .send({
          name: "Ford Mustang G5",
          description: "This is sport car",
          fuel: "Solar",
          mileage: 12000,
          price: 1000000,
          color: "black",
          yearMade: "1989-04-23T18:25:43.511Z",
          TypeId: 5,
          image: ["tes", "tes"],
        })
        .set("access_token", access_token)
        .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body).toHaveProperty("message", "Seats is required");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test("should return correct response (400) when mileage field is missing", (done) => {
      request(app)
        .post("/cars")
        .send({
          name: "Ford Mustang G5",
          description: "This is sport car",
          fuel: "Solar",
          seats: 2,
          price: 1000000,
          color: "black",
          yearMade: "1989-04-23T18:25:43.511Z",
          TypeId: 5,
          image: ["tes", "tes"],
        })
        .set("access_token", access_token)
        .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body).toHaveProperty("message", "Mileage is required");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test("should return correct response (400) when price field is missing", (done) => {
      request(app)
        .post("/cars")
        .send({
          name: "Ford Mustang G5",
          description: "This is sport car",
          fuel: "Solar",
          seats: 2,
          mileage: 12000,
          color: "black",
          yearMade: "1989-04-23T18:25:43.511Z",
          TypeId: 5,
          image: ["tes", "tes"],
        })
        .set("access_token", access_token)
        .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body).toHaveProperty("message", "Price is required");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test("should return correct response (400) when color field is missing", (done) => {
      request(app)
        .post("/cars")
        .send({
          name: "Ford Mustang G5",
          description: "This is sport car",
          fuel: "Solar",
          seats: 2,
          mileage: 12000,
          price: 1000000,
          yearMade: "1989-04-23T18:25:43.511Z",
          TypeId: 5,
          image: ["tes", "tes"],
        })
        .set("access_token", access_token)
        .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body).toHaveProperty("message", "Color is required");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test("should return correct response (400) when year make is missing", (done) => {
      request(app)
        .post("/cars")
        .send({
          name: "Ford Mustang G5",
          description: "This is sport car",
          fuel: "Solar",
          seats: 2,
          mileage: 12000,
          price: 1000000,
          color: "black",
          TypeId: 5,
          image: ["tes", "tes"],
        })
        .set("access_token", access_token)
        .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body).toHaveProperty("message", "Make Year is required");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test("should return correct response (400) when image field is missing", (done) => {
      request(app)
        .post("/cars")
        .send({
          name: "Ford Mustang G5",
          description: "This is sport car",
          fuel: "Solar",
          seats: 2,
          mileage: 12000,
          price: 1000000,
          color: "black",
          yearMade: "1989-04-23T18:25:43.511Z",
          TypeId: 5,
        })
        .set("access_token", access_token)
        .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body).toHaveProperty("message", "Image is required");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test("should return correct response (400) when type id field is missing", (done) => {
      request(app)
        .post("/cars")
        .send({
          name: "Ford Mustang G5",
          description: "This is sport car",
          fuel: "Solar",
          seats: 2,
          mileage: 12000,
          price: 1000000,
          color: "black",
          yearMade: "1989-04-23T18:25:43.511Z",
          image: ["tes", "tes"],
        })
        .set("access_token", access_token)
        .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body).toHaveProperty("message", "Type is required");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test("should return correct response (400) when access token is not provided", (done) => {
      request(app)
        .post("/cars")
        .send({
          name: "Ford Mustang G5",
          description: "This is sport car",
          fuel: "Solar",
          seats: 2,
          mileage: 12000,
          price: 1000000,
          color: "black",
          yearMade: "1989-04-23T18:25:43.511Z",
          TypeId: 5,
          image: ["tes", "tes"],
        })
        .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body).toHaveProperty("message", "jwt must be provided");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("DELETE /cars/:id - success test", () => {
    test("should return correct response (200) when product deleted successfully", (done) => {
      request(app)
        .delete("/cars/1")
        .set("access_token", access_token)
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body).toHaveProperty("message", expect.any(String));
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("DELETE /cars/:id - failed test", () => {
    test("should return correct response (404) when there is no product to delete", (done) => {
      request(app)
        .delete("/cars/10")
        .set("access_token", access_token)
        .then((res) => {
          expect(res.status).toBe(404);
          expect(res.body).toHaveProperty("message", expect.any(String));
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("PUT /cars/:id - success test", () => {
    beforeEach((done) => {
      let data = [
        {
          id: 1,
          name: "Ford Mustang G5",
          description: "This is sport car",
          fuel: "Solar",
          seats: 2,
          mileage: 12000,
          price: 1000000,
          color: "black",
          yearMade: "1989-04-23T18:25:43.511Z",
          TypeId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      queryInterface
        .bulkInsert("Cars", data, {})
        .then((res) => {
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test("should return correct response (200) when car is updated", (done) => {
      request(app)
        .put("/cars/" + 1)
        .send({
          name: "Ford Mustang G5 edited",
          description: "This is sport car",
          fuel: "Solar",
          seats: 2,
          mileage: 12000,
          price: 1000000,
          color: "black",
          yearMade: "1989-04-23T18:25:43.511Z",
          TypeId: 5,
          image: ["tes", "tes"],
        })
        .set("access_token", access_token)
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body).toHaveProperty("message", expect.any(String));
          done();
        })
        .catch((err) => {
          console.log(err);
          done(err);
        });
    });
  });

  describe("PUT /cars/:id - failed test", () => {
    test("should return correct response (404) when car is updated", (done) => {
      request(app)
        .put("/cars/10")
        .send({
          name: "Ford Mustang G5 edited",
          description: "This is sport car",
          fuel: "Solar",
          seats: 2,
          mileage: 12000,
          price: 1000000,
          color: "black",
          yearMade: "1989-04-23T18:25:43.511Z",
          TypeId: 5,
          image: ["tes", "tes"],
        })
        .set("access_token", access_token)
        .then((res) => {
          expect(res.status).toBe(404);
          expect(res.body).toHaveProperty("message", expect.any(String));
          done();
        })
        .catch((err) => {
          console.log(err);
          done(err);
        });
    });
  });
});
