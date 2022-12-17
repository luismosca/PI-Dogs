import {
  GET_ALL_DOGS,
  GET_DOG_DETAILS,
  GET_DOG_BY_NAME,
  GET_TEMPERAMENTS,
  CREATE_DOG,
} from "../actions/actions";

const initialState = {
  allDogs: [],
  dogDetails: {},
  dogSearch: [],
  temperaments: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {

  case GET_ALL_DOGS:
      return {
          ...state,
          allDogs: action.payload,
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

  default:
      return { ...state };
  }
};

export default rootReducer;
