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

beforeAll(() => {
  queryInterface.bulkInsert("Buyers", [
    {
      username: 'Arief',
      email: 'arief.zhang21@gmail.com',
      password: '12345',
      address: 'Jl. Bandung',
      phoneNumber: '0897867564',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);

  
});
