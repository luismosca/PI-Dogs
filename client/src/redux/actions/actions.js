import axios from "axios";

// declaro variables para las action types.
export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const GET_DOG_DETAILS = "GET_DOG_DETAILS";
export const GET_DOG_BY_NAME = "GET_DOG_BY_NAME";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTES";
export const CREATE_DOG = "CREATE_DOG";
export const FILTER_BY_TEMPERAMENT = "FILTER_BY_TEMPERAMENT"
export const ORDER_BY_NAME = "ORDER_BY_NAME"

//* Trae todos los dogs (DB + API)
export function getAllDogs() {
  return async function (dispatch) {
      return await axios.get('http://localhost:3001/breeds')
      .then((allDogs) => {
          dispatch({ type: GET_ALL_DOGS, payload: allDogs.data })})
      .catch((err) => {
          return err;
      });
  };
}

// detalles del dog por pasado por:ID)
export function getDogDetail(id) {
  return async function (dispatch) {
    return await axios.get(`http://localhost:3001/breeds/${id}`)
    .then((detail) => {
      dispatch({ type: GET_DOG_DETAILS, payload: detail.data }); 
      })
      .catch((err) => {
        return err;
      });
      
  };
  
}

export function getDogByName(name) {
  return function (dispatch) {
    return axios.get(`http://localhost:3001/breeds?name=${name}`)
      .then((dogName) => {
        dispatch({ type: GET_DOG_BY_NAME, payload: dogName.data });
      })
      .catch((err) => {
        return err;
      });
  };
}

//* Trae todos los TEMPERAMENTOS
export function getTemperaments() {
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/temperaments`)
      .then((res) => {
        dispatch({ type: GET_TEMPERAMENTS, payload: res.data });
      })
      .catch((err) => {
        return err;
      });
  };
}

export function createDog(dogs){
  return async function(){
      const response = await axios.post('http://localhost:3001/dogcreate', dogs)
      return response
  }
}

//* Ordenamiento
export function orderByName(order) {
  console.log(order)
  return async function (dispatch) {
    dispatch({ type: ORDER_BY_NAME, payload: order });
  };
}

//* Filtrado
export function filterByTemperament(filtro) {
  console.log(filtro)
  return async function (dispatch) {
    dispatch({ type: FILTER_BY_TEMPERAMENT, payload: filtro });
  };
}


// export const filterByTemperament = (temperaments) => (dispatch, getState) => {
//   let filteredDogs = [];

//   if (temperaments === "All") {
//     filteredDogs = getState().dogs;
//   } else {
//     filteredDogs = getState().dogs.filter((dog) =>
//       (dog.temperaments).includes(temperaments)
//     )
//   };
//   dispatch({
//     type: "FILTER_BY_TEMPERAMENT",
//     payload: {
//       temperaments,
//       videogameGenre: filteredDogs,
//     },
//   });
// };

// export const orderByDB = (source) => (dispatch, getState) => {
//   const dogs = getState().dogs.filter(function (d) {
//       return d.source === source
//     });
//   dispatch({
//     type: "ORDER_BY_DB",
//     payload: {
//       dogs,
//       source,
//     },
//   });
// };
