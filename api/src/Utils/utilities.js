const { Dog, Temperament } = require('../db');
const axios = require('axios');

// busco los Dogs de la DB
const getDBdogs = async () => {
const dbDogs = await Dog.findAll({
  include: {
    model: Temperament,
    attributes: ["name"],
  },
})


const dbDogsClean = dbDogs.map((dog) => {
  return {
    id: dog.id,
    name: dog.name,
    image: dog.image,
    weight: dog.weight.metric,
    origin: "db",
    temperament: dog.temperament,
  };
});
return dbDogsClean;
};

const getAPIdogs = async () => {

const apiDogs = await axios.get('https://api.thedogapi.com/v1/breeds');

const apiDogsClean = apiDogs.data.map((dog) => {
  return {
    id: dog.id,
    name: dog.name,
    image: dog.image.url,
    weight: dog.weight.metric,
    origin: "api",
    temperament: dog.temperament,
  };
});
return apiDogsClean;
};

const getAllDogs = async () =>{
  const dbDogs = await getDBdogs();
  const apiDogs = await getAPIdogs();
  return [...dbDogs, ...apiDogs];
}

module.exports = { getAllDogs };
