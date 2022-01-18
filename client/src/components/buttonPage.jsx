import React from 'react'
import buttonPage from './buttonPage.module.css'

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
                  <div className={buttonPage.buttons}>
                  </div>
                  <button onClick={previous} className={buttonPage.buttonImg}>← Previous Page</button>
                  <button onClick={next}>Next Page →</button>
            </div>
     )

}

export default ButtonPage;