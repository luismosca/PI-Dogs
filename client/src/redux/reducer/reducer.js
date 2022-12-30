import {
  GET_ALL_DOGS,
  GET_DOG_DETAILS,
  GET_DOG_BY_NAME,
  GET_TEMPERAMENTS,
  CREATE_DOG,
  FILTER_BY_TEMPERAMENT,
  ORDER_BY_NAME,
  CLEAR_ALL,
} from "../actions/actions";

const initialState = {
  allDogs: [],
  dogDetails: {},
  dogSearch: [],
  temperaments: [],
  filteredDogs: [],
  dogsBackUp: [], 
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {

  case GET_ALL_DOGS:
      return {
          ...state,
          allDogs: action.payload,
          filteredDogs: action.payload,
          dogsBackUp: action.payload
      };
  case GET_DOG_DETAILS:
      return {
          ...state,
          dogDetails: action.payload,
      };
  case GET_DOG_BY_NAME:
      return {
          ...state,
          dogSearch: action.payload,
          filteredDogs: action.payload,
          dogsBackUp: action.payload        
      };
  case GET_TEMPERAMENTS:
      return {
          ...state,
          temperaments: action.payload
      };
  case CREATE_DOG:
      return {
        ...state,
        allDogs: [...state.allDogs, action.payload],
      };
  case FILTER_BY_TEMPERAMENT:
      if (action.payload === 'default'){
        return {...state, filteredDogs: state.dogsBackUp}
      }
                      
      if(action.payload === 'db'){
        return {...state, filteredDogs: state.dogsBackUp.filter((dog)=> dog.origin === 'db')}
      }
                      
      if(action.payload === 'api'){
        return {...state, filteredDogs: state.dogsBackUp.filter((dog)=> dog.origin === 'api')}
      }else {
        
        return {...state, filteredDogs: state.dogsBackUp.filter((dog) => {
          if(dog.temperament) {
            //convierto el string de temperaments en un array para aplicar el includes
            const dogTempsString = dog.temperament
            const dogTempsArr = dogTempsString.split(', ')
            return dogTempsArr.includes(action.payload)
          }
          return false
        })}
      };

    case ORDER_BY_NAME:
      if(action.payload === 'A-Z'){
        return {...state, filteredDogs: [...state.filteredDogs].sort((prev, next) => {
          if(prev.name > next.name) return 1
            if(prev.name < next.name) return -1
              return 0
          })}}
                      
      if(action.payload === 'Z-A'){
        return {...state, filteredDogs: [...state.filteredDogs].sort((prev, next) => {
          if(prev.name > next.name) return -1
            if(prev.name < next.name) return 1
              return 0
          })}}
                      
      if(action.payload === 'desc'){
        return {...state, filteredDogs: [...state.filteredDogs].sort((prev,next) =>
          ((parseInt(prev.weight.split(' - ')[0]) + parseInt(prev.weight.split(' - ').length > 1 ?
           prev.weight.split(' - ')[1] : prev.weight.split(' - ')[0])/2) -
            ((parseInt(next.weight.split(' - ')[0]) + parseInt(next.weight.split(' - ').length > 1 ?
             next.weight.split(' - ')[1] : next.weight.split(' - ')[0]))/2)))} 
        }
                      
      if(action.payload === 'asc'){
        return {...state, filteredDogs: [...state.filteredDogs].sort((prev,next) =>
          ((parseInt(next.weight.split(' - ')[0]) + parseInt(next.weight.split(' - ').length > 1 ?
           next.weight.split(' - ')[1] : next.weight.split(' - ')[0])/2) -
            ((parseInt(prev.weight.split(' - ')[0]) + parseInt(prev.weight.split(' - ').length > 1 ?
             prev.weight.split(' - ')[1] : prev.weight.split(' - ')[0]))/2)))}
        }else {
          return {...state, filteredDogs: state.dogsBackUp}
        };
    case CLEAR_ALL:
      return {
        ...state,
        dogSearch: [],
        filteredDogs: [],
        dogsBackUp: [],
      }
  default:
      return { ...state };
  }
};

export default rootReducer;
