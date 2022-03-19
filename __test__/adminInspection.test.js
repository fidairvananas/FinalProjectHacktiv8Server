const app = require("../app");
const request = require("supertest");
const { sequelize, Admin, Interior, Exterior } = require("../models");
const { queryInterface } = sequelize;
const { login } = require("../controllers/adminController");

let newAdmin = {
  name: "Admin",
  phoneNumber: "081311107954",
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
    test("should return correct response (401) when admin is not registered", async () => {
      const mReq = { body: { email: "test@mail.com", password: "12345" } };
      const mRes = {};
      const mNext = jest.fn();
      await login(mReq, mRes, mNext);
      expect(mNext).toBeCalledWith(expect.anything());
      expect(mRes).toBeInstanceOf(Object);
    });

    test("should return correct response (401) when password is wrong", async () => {
      const mReq = { body: { email: "admin@mail.com", password: "123" } };
      const mRes = {};
      const mNext = jest.fn();
      await login(mReq, mRes, mNext);
      expect(mNext).toBeCalledWith(expect.anything());
      expect(mRes).toBeInstanceOf(Object);
    });
  });
});

// Inspections test

describe("Inspection test", () => {
  describe("GET /inspections - success test", () => {
    test("should return correct response (200) when reads all inspections", (done) => {
      request(app)
        .get("/inspections")
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body).toBeInstanceOf(Array);
          expect(res.body[0]).toHaveProperty("Interior", expect.any(Object));
          expect(res.body[0]).toHaveProperty("Exterior", expect.any(Object));
          expect(res.body[0]).toHaveProperty("RoadTest", expect.any(Object));
          expect(res.body[0]).toHaveProperty("Kolong", expect.any(Object));
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    test("should return correct response (200) when reads inspection by id", (done) => {
      request(app)
        .get("/inspections/2")
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("Interior", expect.any(Object));
          expect(res.body).toHaveProperty("Exterior", expect.any(Object));
          expect(res.body).toHaveProperty("RoadTest", expect.any(Object));
          expect(res.body).toHaveProperty("Kolong", expect.any(Object));
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("GET /inspections - failed test", () => {
    test("should return correct response (404) when inspection is not found", (done) => {
      request(app)
        .get("/inspections/20")
        .then((res) => {
          expect(res.status).toBe(404);
          expect(res.body).toBeInstanceOf(Object);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

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

    test("should return correct response (404) when car is not found", (done) => {
      request(app)
        .patch("/cars/10")
        .send({ passedInspection: true })
        .set("access_token", access_token)
        .then((res) => {
          expect(res.status).toBe(404);
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

// interior test

describe("Interior routes", () => {
  beforeEach(async () => {
    let interior = {
      id: 1,
      speedometer: false,
      klakson: false,
      steeringWheel: false,
      rearViewMirror: false,
      dashboard: false,
      seats: false,
      gasPedal: false,
      brakePedal: false,
      InspectionId: 2,
    };
    const newInt = await Interior.create(interior);
  });
  afterEach(async () => {
    await Interior.destroy({ where: { id: 1 } });
  });
  describe("PATCH /inspections/interior-detail -- success test", () => {
    it("should return correct response (200) admin update inspection status", (done) => {
      request(app)
        .patch("/inspections/interior-detail/1")
        .set("access_token", access_token)
        .send({ speedometer: true, klakson: true, steeringWheel: true })
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body).toBeInstanceOf(Object);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it("should return correct response (200) when request for interior inspection by id complete", (done) => {
      request(app)
        .get("/inspections/interior-detail/1")
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body).toBeInstanceOf(Object);
          done();
        })
        .catch((err) => done(err));
    });
  });

  describe("PATCH /inspections/exterior-detail -- failed test", () => {
    it("should return correct response (404) when there is no interior inspection data", (done) => {
      request(app)
        .patch("/inspections/interior-detail/100")
        .set("access_token", access_token)
        .send({ speedometer: true, klakson: true, steeringWheel: true })
        .then((res) => {
          expect(res.status).toBe(404);
          expect(res.body).toBeInstanceOf(Object);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it("should return correct response (404) when there is no interior inspection data", (done) => {
      request(app)
        .get("/inspections/interior-detail/100")
        .then((res) => {
          expect(res.status).toBe(404);
          expect(res.body).toBeInstanceOf(Object);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
});

// exterior test

describe("Exterior routes", () => {
  beforeEach(async () => {
    let exterior = {
      id: 1,
      chassis: true,
      bumper: true,
      lights: true,
      roof: false,
      spion: false,
      windShield: false,
      kacaSamping: false,
      kacaBelakang: false,
      tire: false,
      InspectionId: 2,
    };
    const newEx = await Exterior.create(exterior);
  });
  afterEach(async () => {
    await Exterior.destroy({ where: { id: 1 } });
  });
  describe("PATCH /inspections/exterior-detail -- success test", () => {
    it("should return correct response (200) when admin update inspection status", (done) => {
      request(app)
        .patch("/inspections/exterior-detail/1")
        .set("access_token", access_token)
        .send({ speedometer: true, klakson: true, steeringWheel: true })
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body).toBeInstanceOf(Object);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it("should return correct response (200) when searching for exterior inspection by id", (done) => {
      request(app)
        .get("/inspections/exterior-detail/1")
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body).toBeInstanceOf(Object);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("PATCH /inspections/exterior-detail -- failed test", () => {
    it("should return correct response (404) when there is no exterior inspection data", (done) => {
      request(app)
        .patch("/inspections/exterior-detail/100")
        .set("access_token", access_token)
        .send({ chassis: true, bumper: true, lights: true })
        .then((res) => {
          expect(res.status).toBe(404);
          expect(res.body).toBeInstanceOf(Object);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it("should return correct response (404) when there is no exterior inspection data", (done) => {
      request(app)
        .get("/inspections/exterior-detail/100")
        .then((res) => {
          expect(res.status).toBe(404);
          expect(res.body).toBeInstanceOf(Object);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
});
