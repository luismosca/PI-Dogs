const { Router } = require('express');
const axios = require("axios");
const { Dog, Temperament } = require('../db');
const router = Router();

router.get('/', async (req, res) => {
  res.send('Soy la ruta Temperaments')
})


module.exports = router;
