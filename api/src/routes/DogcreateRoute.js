const { Router } = require("express");
const { Dog } = require("../db");
require('dotenv').config()
const dogcreateRouter = Router();

dogcreateRouter.post("/", async (req, res) => {
  console.log("Estoy en el POST")
  
  try {
    res.send(await Dog.create(req.body));
    
} catch (error) {
    res.status(400).send(error.message)
}

});

module.exports = dogcreateRouter;
