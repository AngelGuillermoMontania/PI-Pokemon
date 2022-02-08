import React from 'react';
import buttonCreate from './buttonCreate.module.css';
import pokeButton from '../images/open-pokeball.png';

const ButtonCreate = () => {
    return (
        <button type="submit" className={buttonCreate.button}>
            <img className={buttonCreate.poke1} src={pokeButton} alt="Img not found" />
            <b>Create!!</b>
            <img className={buttonCreate.poke2} src={pokeButton} alt="Img not found" />
        </button>
    )
};

export default ButtonCreate;