var axios = require("axios").default;

var options = {
  method: "GET",
  url: "https://car-data.p.rapidapi.com/cars/years",
  headers: {
    "x-rapidapi-host": "car-data.p.rapidapi.com",
    "x-rapidapi-key": "20f5115868msh54034bfe0b0e1bbp17459ejsne864744800a5",
  },
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
