import React from 'react';
import buttonModify from './buttonModify.module.css';
import pokeButton from '../images/close-pokeball.png';

const ButtonModify = () => {
    return (
        <button type="submit" className={buttonModify.button}>
           <img className={buttonModify.poke1} src={pokeButton} alt="Img not found" />
           <b>Modify!!</b>
           <img className={buttonModify.poke2} src={pokeButton} alt="Img not found" />
        </button>
    )
};

export default ButtonModify;