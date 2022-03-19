const app = require("../app");
const request = require("supertest");

describe("Brand routes", () => {
  describe("GET /brands -- success test", () => {
    test("should return correct response (200) when querying for brands", (done) => {
      request(app)
        .get("/brands")
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body).toBeInstanceOf(Array);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
});

describe("Types routes", () => {
  describe("GET /types -- success test", () => {
    test("should return correct response (200) when querying for types", (done) => {
      request(app)
        .get("/types")
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body).toBeInstanceOf(Array);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("GET /type/:id -- success test", () => {
    test("should return correct response (200) when querying for types by id", (done) => {
      request(app)
        .get("/types/1")
        .then((res) => {
          expect(res.status).toBe(200);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty("Brand", expect.any(Object));
          expect(res.body).toHaveProperty("Cars", expect.any(Array));
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("GET /type/:id -- failed test", () => {
    test("should return correct response (404) when querying for types by id not found", (done) => {
      request(app)
        .get("/types/100")
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
});
