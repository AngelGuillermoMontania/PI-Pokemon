import axios from 'axios';
export const GET_POKEMONS = 'GET_POKEMONS';
export const GET_DETAIL = 'GET_DETAIL';
export const GET_POKEMONS_NAME = 'GET_POKEMONS_NAME'
export const CREATE_POKEMON = 'CREATE_POKEMON';
export const GET_TYPES = 'GET_TYPES';
export const SET_LOADING = 'SET_LOADING'
export const DEL_POKEMON = 'DEL_POKEMON';
export const POKE_TO_MODIFY = 'POKE_TO_MODIFY';
export const CLEAN_POKE_MODIFY = 'CLEAN_POKE_MODIFY';

export const getPokemons = () => dispatch => {
    return axios('http://localhost:3001/pokemons')
        .then(data => data.data)
        .then(data => dispatch({
            type: GET_POKEMONS,
            payload: data
        }))
};

export const getDetail = (id) => dispatch => {
    return axios(`http://localhost:3001/pokemons/${id}`)
        .then(data => data.data)
        .then(data => dispatch({
            type: GET_DETAIL,
            payload: data
        }))
};

export const getPokemonName = (name) => dispatch => {
    return axios(`http://localhost:3001/pokemons?name=${name}`)
        .then(data => data.data)
        .then(data => dispatch({
            type: GET_POKEMONS_NAME,
            payload: data
        }))
};

export const getTypes = () => dispatch => {
    return axios(`http://localhost:3001/types/get`)
        .then(data => data.data)
        .then(data => dispatch({
            type: GET_TYPES,
            payload: data
        }))
};

export const createPokemon = (pokemonCreate) => dispatch => {
    return axios.post(`http://localhost:3001/pokemons`, pokemonCreate)
        .then(data => data.data)
        .then(data => dispatch({
            type: CREATE_POKEMON,
            payload: data
        }))
};

export const deletePoke = (name) => dispatch => {
    return axios.delete(`http://localhost:3001/pokemons/delete/?name=${name}`)
        .then(data => data.data)
        .then(data => dispatch({
            type: CREATE_POKEMON,
        }))
};

export const modifyPoke = (name) => dispatch => {
    return dispatch({
        type: POKE_TO_MODIFY,
    })
};

export const cleanPokeModify = () => dispatch => {
    return dispatch({
        type: CLEAN_POKE_MODIFY,
        payload: []
    })
};