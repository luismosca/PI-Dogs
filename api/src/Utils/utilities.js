const { Dog, Temperament } = require('../db');
const axios = require('axios');

// busco los Dogs de la DB
const getDBdogs = async () => {
  const dbDogs = await Dog.findAll({
    include: {
      model: Temperament,
      attributes: "name",
    },
  })


const dbDogsClean = dbDogs.map((dog) => {
  return {
    id: dog.id,
    name: dog.name,
    height: dog.height,
    weight: dog.weight,
    life_span: dog.life_span,
    origin: "db",
    Temperaments: dog.Temperaments,
  };
});
return dbDogsClean;
};

const getAPIdogs = async () => {

  const apiDogs = await axios.get('https://api.thedogapi.com/v1/breeds');

  const apiDogsClean = apiDogs.map((dog) => {
    return {
      id: dog.id,
      name: dog.name,
      height: dog.height,
      weight: dog.weight,
      life_span: dog.life_span,
      origin: "api",
      Temperaments: dog.Temperaments,
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
