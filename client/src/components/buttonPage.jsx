import React from 'react'
import buttonPage from './buttonPage.module.css'
import pokeButton from '../images/close-pokeball.png'

const ButtonPage = ({pokemonReact, page, setPage}) => {

      const next = () => {
            if(pokemonReact.pokemons.length > page + 12) {
                  setPage(page + 12)
            }
      }
      
      const previous = () => {
            if(page > 0) {
                  setPage(page - 12)
            }
      }

     return (

            <div className={buttonPage.containButtons}>
                  <div className={buttonPage.font}>
                  </div>
                  <div className={buttonPage.containButton1}>
                        <button onClick={previous} className={buttonPage.buttonPrev}>
                              <img className={buttonPage.poke1} src={pokeButton} alt="" />
                              Previous Page
                        </button>
                  </div>
                  <div className={buttonPage.containButton2}>
                        <button onClick={next} className={buttonPage.buttonNext}>
                              Next Page
                              <img className={buttonPage.poke2} src={pokeButton} alt="" />
                        </button>
                  </div>
            </div>
     )

}

export default ButtonPage;