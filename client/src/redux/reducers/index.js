import { GET_POKEMONS, GET_DETAIL, GET_POKEMONS_NAME, CREATE_POKEMON, GET_TYPES } from '../actions/index'

const initialState = {
      pokemons: [],
      pokemon: [],
      types: [],
  };

const rootReducer = (state = initialState, action) => {
      switch(action.type) {
            case GET_POKEMONS:
                  return ({
                        ...state,
                        pokemons: action.payload
                  });
            case GET_DETAIL:
                  return ({
                        ...state,
                        pokemon: action.payload
                  });
            case GET_POKEMONS_NAME:
                  return({
                        ...state,
                        pokemon: action.payload
                  });
            case CREATE_POKEMON:
                  return ({
                        ...state,
                        pokemons: [
                        ...state.pokemons,
                        ...action.payload
                        ],
                        pokemon: action.payload
                  });
            case GET_TYPES:
                  return({
                        ...state,
                        types: action.payload
                  })
            default:
                  return ({...state})
      };
};
  
export default rootReducer;