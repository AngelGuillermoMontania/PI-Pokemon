import React from 'react'
import buttonCreate from './buttonCreate.module.css';
import pokeButton from '../images/open-pokeball.png'

const ButtonCreate = () => {

     return (

            <button type="submit" className={buttonCreate.button}>
               <img className={buttonCreate.poke1} src={pokeButton} alt="" />
               <b>Create!!</b>
               <img className={buttonCreate.poke2} src={pokeButton} alt="" />
            </button>

     )

}

export default ButtonCreate;