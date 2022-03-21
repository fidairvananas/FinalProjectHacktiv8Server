const app = require("../app");
const request = require("supertest");
const {
  sequelize,
  BoughtHistory,
  Buyer,
  Car,
  Dealer,
  Type,
  Brand,
} = require("../models");
const { queryInterface } = sequelize;
const { login } = require("../controllers/dealerController");

beforeAll((done) => {
  let data = [
    {
      username: "Arief",
      email: "arief.zhang21@gmail.com",
      password: "12345",
      address: "Jl. Bandung",
      phoneNumber: "0897867564",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: "Jubel",
      email: "jubelsinaga13@gmail.com",
      password: "12345",
      address: "Jl. Medan",
      phoneNumber: "0876543210",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
  queryInterface
    .bulkInsert("Buyers", data, {})
    .then(() => done())
    .catch((err) => done(err));

  let dealer = {
    name: "Fida",
    phoneNumber: "0897867564",
    email: "fida@gmail.com",
    password: "12345",
    storeName: "Car-Tique",
    storeAddress: "Jl. Jakarta",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  let brand = {
    name: "Ford",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  let type = {
    modelName: "Sedan",
    BrandId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  Dealer.create(dealer)
    .then(() => done())
    .catch((err) => done(err));

  queryInterface
    .bulkInsert("Brands", [brand], {})
    .then(() => done())
    .catch((err) => done(err));

  queryInterface
    .bulkInsert("Types", [type], {})
    .then(() => done())
    .catch((err) => done(err));
});

afterAll((done) => {
  queryInterface
    .bulkDelete("Buyers", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    })
    .then(() => done())
    .catch((err) => done(err));

  queryInterface
    .bulkDelete("Dealers", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    })
    .then(() => done())
    .catch((err) => done(err));

  queryInterface
    .bulkDelete("Types", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    })
    .then(() => done())
    .catch((err) => done(err));

  queryInterface
    .bulkDelete("Brands", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    })
    .then(() => done())
    .catch((err) => done(err));
});

describe("Payment transaction from buyer using full payment", () => {
  describe("POST /payments - Success Test", () => {
    let payload = {
      quantity: 1,
      carId: 1,
      buyerId: 1,
      notes: 'Full Payment'
    }
    beforeAll((done) => {
      let car = {
        name: "Mustang G5",
        description: "This is sport car",
        fuel: "Solar",
        seats: 2,
        mileage: 12000,
        price: 1000000000,
        color: "black",
        DealerId: 1,
        yearMade: "1989-04-23T18:25:43.511Z",
        TypeId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    
      Car.create(car)
        .then(() => done())
        .catch((err) => done(err));
    })

    test("should return an Object with token and redirect url from Midtrans", (done) => {
      request(app)
        .post("/payments")
        .send(payload)
        .end((err, res) => {
          if (err) done(err);

          expect(res.status).toBe(200);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty('message', expect.any(String))
          expect(res.body).toHaveProperty('token', expect.any(String))
          expect(res.body).toHaveProperty('redirect_url', expect.any(String))
          done();
        });
    });
  });

  describe("POST /payments - Failed Test Part.1", () => {
    let payload1 = {
      carId: 1,
      buyerId: 1,
      notes: 'Full Payment'
    }

    let payload2 = {
      quantity: 1,
      carId: 1,
      notes: 'Full Payment'
    }

    let payload3 = {
      quantity: 1,
      buyerId: 1,
      notes: 'Full Payment'
    }

    test("If client didn't send quantity in req.body should return an Object with message 'Quantity can't be empty.'", (done) => {
      request(app)
        .post("/payments")
        .send(payload1)
        .end((err, res) => {
          if (err) done(err);

          expect(res.status).toBe(400);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty('message', "Quantity can't be empty.")
          done();
        });
    });

    test("If client didn't send buyer Id in req.body should return an Object with message 'Buyer ID can't be empty.'", (done) => {
      request(app)
        .post("/payments")
        .send(payload2)
        .end((err, res) => {
          if (err) done(err);

          expect(res.status).toBe(400);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty('message', "Buyer ID can't be empty.")
          done();
        });
    });

    test("If client didn't send car Id in req.body should return an Object with message 'Car ID can't be empty.'", (done) => {
      request(app)
        .post("/payments")
        .send(payload3)
        .end((err, res) => {
          if (err) done(err);

          expect(res.status).toBe(400);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty('message', "Car ID can't be empty.")
          done();
        });
    });

    test("If buyer ID didn't in database should return an Object with message 'Please register first before buy.'", (done) => {
      request(app)
        .post("/payments")
        .send({
          quantity: 1,
          carId: 1,
          buyerId: 100,
          notes: 'Full Payment'
        })
        .end((err, res) => {
          if (err) done(err);

          expect(res.status).toBe(404);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty('message', "Please register first before buy.")
          done();
        });
    });

    test("If car ID didn't in database should return an Object with message 'Car not found.'", (done) => {
      request(app)
        .post("/payments")
        .send({
          quantity: 1,
          carId: 100,
          buyerId: 1,
          notes: 'Full Payment'
        })
        .end((err, res) => {
          if (err) done(err);

          expect(res.status).toBe(404);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty('message', "Car not found.")
          done();
        });
    });
  });
  
  describe("POST /payments - Failed Test Part.2", () => {
    beforeAll((done) => {
      Car.update({
        status: 'sold'
      }, {
        where: {
          id: 1
        }
      }).then(() => done())
      .catch(err => done(err))
    })

    afterAll((done) => {
      Car.update({
        status: 'sale'
      }, {
        where: {
          id: 1
        }
      }).then(() => done())
      .catch(err => done(err))
    })

    test("If car status was 'sold' in database should return an Object with message 'Car not found.'", (done) => {
      request(app)
        .post("/payments")
        .send({
          quantity: 1,
          carId: 1,
          buyerId: 1,
          notes: 'Full Payment'
        })
        .end((err, res) => {
          if (err) done(err);

          expect(res.status).toBe(404);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty('message', "Car not found.")
          done();
        });
    });
  })

  describe("POST /payments - Failed Test Part.3", () => {
    beforeAll((done) => {
      Car.update({
        status: 'pending'
      }, {
        where: {
          id: 1
        }
      }).then(() => done())
      .catch(err => done(err))
    })

    afterAll((done) => {
      Car.update({
        status: 'sale'
      }, {
        where: {
          id: 1
        }
      }).then(() => done())
      .catch(err => done(err))
    })

    test("If car status was 'pending' in database should return an Object with message 'Car status pending payment for other transaction.'", (done) => {
      request(app)
        .post("/payments")
        .send({
          quantity: 1,
          carId: 1,
          buyerId: 1,
          notes: 'Full Payment'
        })
        .end((err, res) => {
          if (err) done(err);

          expect(res.status).toBe(403);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty('message', "Car status pending payment for other transaction.")
          done();
        });
    });
  })

  describe("POST /payments - Failed Test Part.4", () => {

    test("If car already in another subscription in database should return an Object with message 'Car already in subcription with term.'", (done) => {
      request(app)
        .post("/payments")
        .send({
          quantity: 1,
          carId: 1,
          buyerId: 1,
          notes: 'Full Payment'
        })
        .end((err, res) => {
          if (err) done(err);

          expect(res.status).toBe(403);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty('message', "Car already in subcription with term.")
          done();
        });
    });
  })
  
});


describe("Get all transaction from buyer by ID", () => {
  describe("GET /payments/status - Success Test", () => {
    test("Should return an Array of bought history", (done) => {
      request(app)
        .get("/payments/status?BuyerId=" + 1)
        .end((err, res) => {
          if (err) done(err);

          expect(res.status).toBe(200);
          expect(res.body).toBeInstanceOf(Array);
          expect(res.body[0]).toBeInstanceOf(Object)
          expect(res.body[0]).toHaveProperty('id', expect.any(Number))
          expect(res.body[0]).toHaveProperty('carName', expect.any(String))
          expect(res.body[0]).toHaveProperty('description', expect.any(String))
          expect(res.body[0]).toHaveProperty('boughtDate', expect.any(String))
          expect(res.body[0]).toHaveProperty('paidOff', expect.any(Boolean))
          expect(res.body[0]).toHaveProperty('price', expect.any(Number))
          expect(res.body[0]).toHaveProperty('BuyerId', expect.any(Number))
          expect(res.body[0]).toHaveProperty('orderId', expect.any(String))
          expect(res.body[0]).toHaveProperty('installment', expect.any(Boolean))
          expect(res.body[0]).toHaveProperty('currentInstallment', expect.any(Number))
          done();
        });
    });
  });

  describe("GET /payments/status - Failed Test", () => {

    test("If client didn't send buyer Id in req.query should return an Object with message 'Buyer ID can't be empty.'", (done) => {
      request(app)
        .get("/payments/status")
        .end((err, res) => {
          if (err) done(err);

          expect(res.status).toBe(400);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty('message', "Buyer ID can't be empty.")
          done();
        });
    });

    test("If buyer didn't in database should return an Object with message 'Buyer not found.'", (done) => {
      request(app)
        .get("/payments/status?BuyerId=" + 100)
        .end((err, res) => {
          if (err) done(err);

          expect(res.status).toBe(404);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty('message', "Buyer not found.")
          done();
        });
    });

    test("If buyer hasn't have any bought history should return an Object with message 'Bought history not found.'", (done) => {
      request(app)
        .get("/payments/status?BuyerId=" + 2)
        .end((err, res) => {
          if (err) done(err);

          expect(res.status).toBe(404);
          expect(res.body).toBeInstanceOf(Object);
          expect(res.body).toHaveProperty('message', "Bought history not found.")
          done();
        });
    });

  });
});
