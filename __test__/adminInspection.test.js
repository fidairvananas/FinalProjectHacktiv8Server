const app = require("../app");
const request = require("supertest");
const { sequelize, Admin } = require("../models");
const { queryInterface } = sequelize;

let newAdmin = {
  name: "Admin",
  phoneNumber: "081123456789",
  email: "admin@mail.com",
  password: "12345",
};

let access_token;

beforeAll((done) => {
  let data = {
    id: 2,
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
  let inspection = {
    id: 2,
    mainInspection: false,
    exteriorInspection: false,
    interiorInspection: false,
    roadTest: false,
    kolongTest: false,
    CarId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  queryInterface
    .bulkInsert("Cars", [data], {})
    .then((res) => {
      return queryInterface.bulkInsert("Inspections", [inspection], {});
    })
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
      return queryInterface.bulkDelete("Inspections", null, {});
    })
    .then((res) => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

describe("Admin register routes", () => {
  describe("POST /admins/register - success test", () => {
    beforeEach(async () => {
      await Admin.destroy({
        where: {
          email: newAdmin.email,
        },
      });
    });

    test("should return correct response (201) when input is correct", (done) => {
      request(app)
        .post("/admins/register")
        .send(newAdmin)
        .then((res) => {
          expect(res.status).toBe(201);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("message", expect.any(String));
          done();
        })
        .catch((err) => done(err));
    });
  });

  describe("POST /admins/register - failed test", () => {
    test("should return correct response (400) when name is not provided", (done) => {
      request(app)
        .post("/admins/register")
        .send({
          phoneNumber: "081123456789",
          email: "admin@mail.com",
          password: "12345",
        })
        .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("message", expect.any(String));
          done();
        })
        .catch((err) => done(err));
    });

    test("should return correct response (400) when phone is not provided", (done) => {
      request(app)
        .post("/admins/register")
        .send({
          name: "Admin",
          email: "admin@mail.com",
          password: "12345",
        })
        .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("message", expect.any(String));
          done();
        })
        .catch((err) => done(err));
    });

    test("should return correct response (400) when email is not provided", (done) => {
      request(app)
        .post("/admins/register")
        .send({
          name: "Admin",
          phoneNumber: "08123456789",
          password: "12345",
        })
        .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("message", expect.any(String));
          done();
        })
        .catch((err) => done(err));
    });

    test("should return correct response (400) when email is not valid", (done) => {
      request(app)
        .post("/admins/register")
        .send({
          name: "Admin",
          phoneNumber: "08123456789",
          email: "adminmail",
          password: "12345",
        })
        .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("message", expect.any(String));
          done();
        })
        .catch((err) => done(err));
    });

    test("should return correct response (400) when email already exist", (done) => {
      request(app)
        .post("/admins/register")
        .send({
          name: "Admin",
          phoneNumber: "08123456789",
          email: "admin@mail.com",
          password: "12345",
        })
        .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("message", expect.any(String));
          done();
        })
        .catch((err) => done(err));
    });

    test("should return correct response (400) when password is not provided", (done) => {
      request(app)
        .post("/admins/register")
        .send({
          name: "Admin",
          phoneNumber: "08123456789",
          email: "admin@mail.com",
        })
        .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("message", expect.any(String));
          done();
        })
        .catch((err) => done(err));
    });

    test("should return correct response (400) when password length less than 5 char", (done) => {
      request(app)
        .post("/admins/register")
        .send({
          name: "Admin",
          phoneNumber: "08123456789",
          email: "admin@mail.com",
          password: "123",
        })
        .then((res) => {
          expect(res.status).toBe(400);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("message", expect.any(String));
          done();
        })
        .catch((err) => done(err));
    });
  });
});

describe("Admin login routes", () => {
  describe("POST /admins/login - success test", () => {
    let admin = {
      email: "admin@mail.com",
      password: "12345",
    };

    test("should return correct response(200) when input is correct", (done) => {
      request(app)
        .post("/admins/login")
        .send(admin)
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

  describe("POST /admins/login - failed test", () => {
    test("should return correct response (401) when admin is not registered", (done) => {
      request(app)
        .post("/dealers/login")
        .send({
          email: "test@mail.com",
          password: "12345",
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

    test("should return correct response (401) when password is not correct", (done) => {
      request(app)
        .post("/dealers/login")
        .send({
          email: "admin@mail.com",
          password: "123",
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

// Inspections test

describe("Inspection test", () => {
  describe("PATCH /cars - success test", () => {
    test("should return correct response (200) when admin is authorized to change car inspection status", (done) => {
      request(app)
        .patch("/cars/2")
        .send({ passedInspection: true })
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

  describe("PATCH /cars - failed test", () => {
    test("should return correct response (401) when other user than admin tring to change inspection status", (done) => {
      request(app)
        .patch("/cars/2")
        .send({ passedInspection: true })
        .set(
          "access_token",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ikp1YmVsIiwiZW1haWwiOiJtd29ya2VyMjZAZ21haWwuY29tIiwic3RvcmVOYW1lIjoiSnViZWwgQ2xhc3NpYyIsInBob25lTnVtYmVyIjoiMDgxMzExMTA3OTU0Iiwic3RvcmVBZGRyZXNzIjoiTWVkYW4gaGVsdmV0aWEiLCJpYXQiOjE2NDc1NzA1ODl9.kouAbBpeUN1dIvjsNtfKbv482h7zsF-qsfYT2tLbPO8"
        )
        .then((res) => {
          expect(res.status).toBe(401);
          expect(res.body).toHaveProperty("message", "Invalid token or user");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("PATCH /inspections - success test", () => {
    test("should return correct response (200) when admin is authorized to change main inspection status", (done) => {
      request(app)
        .patch("/inspections/main/2")
        .send({ mainInspection: true })
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

    test("should return correct response (200) when admin is authorized to change exterior inspection status", (done) => {
      request(app)
        .patch("/inspections/exterior/2")
        .send({ exteriorInspection: true })
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

    test("should return correct response (200) when admin is authorized to change interior inspection status", (done) => {
      request(app)
        .patch("/inspections/interior/2")
        .send({ interiorInspection: true })
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

    test("should return correct response (200) when admin is authorized to change roadTest inspection status", (done) => {
      request(app)
        .patch("/inspections/roadTest/2")
        .send({ roadTest: true })
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

    test("should return correct response (200) when admin is authorized to change kolong inspection status", (done) => {
      request(app)
        .patch("/inspections/kolong/2")
        .send({ kolongTest: true })
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

  describe("PATCH /inspections - failed test", () => {
    test("should return correct response (401) when other user than admin trying to change inspection status", (done) => {
      request(app)
        .patch("/inspections/main/2")
        .send({ mainInspection: true })
        .set(
          "access_token",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ikp1YmVsIiwiZW1haWwiOiJtd29ya2VyMjZAZ21haWwuY29tIiwic3RvcmVOYW1lIjoiSnViZWwgQ2xhc3NpYyIsInBob25lTnVtYmVyIjoiMDgxMzExMTA3OTU0Iiwic3RvcmVBZGRyZXNzIjoiTWVkYW4gaGVsdmV0aWEiLCJpYXQiOjE2NDc1NzA1ODl9.kouAbBpeUN1dIvjsNtfKbv482h7zsF-qsfYT2tLbPO8"
        )
        .then((res) => {
          expect(res.status).toBe(401);
          expect(res.body).toHaveProperty("message", "Invalid token or user");
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test("should return correct response (404) when inspection is not found", (done) => {
      request(app)
        .patch("/inspections/main/100")
        .send({ mainInspection: true })
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

    test("should return correct response (404) when inspection is not found", (done) => {
      request(app)
        .patch("/inspections/interior/100")
        .send({ interiorInspection: true })
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

    test("should return correct response (404) when inspection is not found", (done) => {
      request(app)
        .patch("/inspections/exterior/100")
        .send({ exteriorInspection: true })
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

    test("should return correct response (404) when inspection is not found", (done) => {
      request(app)
        .patch("/inspections/roadtest/100")
        .send({ roadTest: true })
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

    test("should return correct response (404) when inspection is not found", (done) => {
      request(app)
        .patch("/inspections/kolong/100")
        .send({ kolongTest: true })
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
});
