import React from 'react'
import buttonReset from './buttonReset.module.css'
import pokeButton from '../images/close-pokeball.png'

const ButtonReset = ({setPokemonReact, state, setPage, renderCards}) => {

      const reset = () => {
            setPokemonReact({...state})
            renderCards()
            setPage(0)
      }

      return (
            <div className={buttonReset.containButton}>
                  <button onClick={reset}>RESET FILTERS 
                        <img src={pokeButton} alt="" />
                  </button>
            </div>
      )

}

export default ButtonReset;