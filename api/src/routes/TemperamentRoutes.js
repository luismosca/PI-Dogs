const { Router } = require('express');
const axios = require("axios");
const { Dog, Temperament } = require('../db');
const router = Router();

router.get('/', async (req, res) => {

  console.log('Soy la ruta Temperaments')
  let arrayTemperaments = [];
  let arrayFinal = [];

  try {
    const apiDogs = await axios.get('https://api.thedogapi.com/v1/breeds');
    const temperaments = apiDogs.data.map((t) => t.temperament)
    
    for (let i=0; i<temperaments.length; i++){
      if (temperaments[i]) {
        arrayTemperaments = temperaments[i].split(', ')
      }
      for (let j=0; j<arrayTemperaments.length; j++){
        arrayFinal.push(arrayTemperaments[j])
      }
      arrayTemperaments = []
    }
   
    const unicosTemperaments = Array.from(new Set(arrayFinal))
    console.log(unicosTemperaments)
    const temperamentsDB= await Temperament.bulkCreate(unicosTemperaments)
    res.status(200).send(temperamentsDB)
    //res.status(200).send(unicosTemperaments)

  } catch (error) {
    res.status(400).send(error.message)
  }
})


module.exports = router;
