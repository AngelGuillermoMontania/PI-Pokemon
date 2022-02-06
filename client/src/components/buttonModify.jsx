import React from 'react'
import buttonModify from './buttonModify.module.css';
import pokeButton from '../images/close-pokeball.png'

const ButtonCreate = () => {

     return (
            <button type="submit" className={buttonModify.button}>
               <img className={buttonModify.poke} src={pokeButton} alt="" />
               <b>Create!!</b>
            </button>
     )

}

export default ButtonCreate;