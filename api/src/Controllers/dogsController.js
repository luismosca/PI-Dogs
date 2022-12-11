const { Dog, Temperament } = require('../db');
const { getAllDogs } = require('../Utils/utilities');
const { Op } = require('sequelize');
const {API_KEY, API_URL} = process.env
const axios = require('axios');

const getDogs = async (req, res) => {
  let { name } = req.query;
  //console.log(name)
  if (name) {
    name = name.split(" ").join("-").toLowerCase();
    //Busco primero en la BD
    const nameDog = await Dog.findAll({
      where: {
          name: {
              [Op.iLike]: `%${name}%` //Usamos el operador iLike para validar nombre ingresado
          },
      },
      include: [{
          model: Temperament,
          through: {
              attributes: [],
          }
      
      }],
    })
    
    if(!nameDog.length) {
      console.log("Voy por aqui")
      // Busco en la API
      const dogName = await axios.get(`${API_URL}breeds/search?q=${name}`)
      //console.log(dogName.data) 
      const imageID = dogName.data[0].reference_image_id
      
      console.log(imageID)
      
      const apiDogs = await axios.get('https://api.thedogapi.com/v1/breeds');
  
      const imagen = apiDogs.data.filter(function(image){
        return image.image.id === imageID
      })
      //console.log(imagen)
      let imgUrl = imagen[0].image.url
      console.log(imgUrl)

      const results = {
        id: dogName.data[0].id,
        name: dogName.data[0].name,
        height: dogName.data[0].height.metric,
        weight: dogName.data[0].weight.metric,
        life_span: dogName.data[0].life_span,
        temperament: dogName.data[0].temperament,
        image: imgUrl
        }
        console.log(results)
        
      try {
        if (!results.length){
          res.status(200).json(results);
        } else {
          res.status(400).send('Dog not found')
        }
      } catch (error) {
        res.send(error.message)
      }
      
    } else {
      return res.status(200).send(nameDog)
    }

  } else {
    console.log('voy por todos los dogs')
    let results = await getAllDogs()
    res.status(200).json(results);
    
  }
};

const getDog = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const temperaments = {
    model: Temperament,
    attributes: ['name'],
    through: {
    attributes: []
    }
}
try {
  const regex = /([a-zA-Z]+([0-9]+[a-zA-Z]+)+)/

  if (regex.test(id)){
    console.log(`Por if true en DB con id: ${id}`)
    const dogInDb = await Dog.findOne({ where: { id: id }, includes: [temperaments] });

    console.log(dogInDb)
    res.json(dogInDb);
  }
  const dogInAPI = await axios.get(`${API_URL}breeds/${id}?key=${API_KEY}`)
  const imageID = dogInAPI.data.reference_image_id
  const apiDogs = await axios.get('https://api.thedogapi.com/v1/breeds');
  
  const imagen = apiDogs.data.filter(function(image){
    return image.image.id === imageID
  })
  //console.log(imagen)
  let imgUrl = imagen[0].image.url

  const resultado = {
    id: dogInAPI.data.id,
    name: dogInAPI.data.name,
    height: dogInAPI.data.height.metric,
    weight: dogInAPI.data.weight.metric,
    life_span: dogInAPI.data.life_span,
    temperament: dogInAPI.data.temperament,
    image: imgUrl
    }

  //console.log(resultado)
  //console.log(`IMPLEMENTING YET: Get by id en API ID: ${id}`)
  
  if (resultado){
    res.json(resultado)
  }

} catch (error) {
  res.status(404).json({error: error.message})
}

};

module.exports = {
  getDogs,
  getDog,
  
};
