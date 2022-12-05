const { Router } = require('express');
const router = Router();


const axios = require("axios");
const { Dog, Temperament } = require('../db');


router.get('/', async (req, res) => {
 // res.send('Soy la ruta Dogs');
  
  let apiDogs = await axios.get('https://api.thedogapi.com/v1/breeds');

  res.send(apiDogs.data)
})


module.exports = router;
