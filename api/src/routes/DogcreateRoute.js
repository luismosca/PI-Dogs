const { Router } = require("express");
const { Dog, Temperament } = require("../db");
require('dotenv').config()
const dogcreateRouter = Router();

// creo la ruta para el POST de un dog nuevo en tabla Dog
dogcreateRouter.post("/", async (req, res) => {
  console.log("Estoy en el POST")
  const { name, height, weight, life_span, image, temperaments } = req.body;
  console.log(req.body)
  
  try {
    const dogCreate = await Dog.create({
      name, height, weight, life_span, image,
    })
    temperaments.forEach(async (t) => {
      let temperamentDog = await Temperament.findOne({ where: { name: t } })
      await dogCreate.addTemperament(temperamentDog)
    })

  res.send('Dog created successfully!')
   // res.send(await Dog.create(req.body));
    
} catch (error) {
    res.status(400).send(error.message)
}

});

module.exports = dogcreateRouter;
