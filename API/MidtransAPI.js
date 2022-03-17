const axios = require("axios");
const AUTHORIZATION = process.env.AUTHORIZATION;

const urlMovie = "https://app.sandbox.midtrans.com/";

const midtrans = axios.create({
  baseURL: urlMovie,
  headers: {
    Authorization: btoa(AUTHORIZATION),
    Accept: 'application/json',
    "Content-Type": 'application/json'
  },
});

module.exports = midtrans;
