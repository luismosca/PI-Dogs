const { Router } = require('express');
const router = Router();
const { validateDog } = require('../Middleware/index');

//const axios = require("axios");
//const { Dog, Temperament } = require('../db');

const { getDog, getDogs } = require("../controllers/dogsController");
const { getAllDogs } = require('../Utils/utilities');

router.get("/", getDogs);

router.get("/:id", getDog);



// router.get('/', async (req, res) => {
//  // res.send('Soy la ruta Dogs');
  
//   let apiDogs = await axios.get('https://api.thedogapi.com/v1/breeds');

//   res.send(apiDogs.data)
// })


module.exports = router;
