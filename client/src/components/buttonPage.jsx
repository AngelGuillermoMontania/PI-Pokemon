import React from 'react'

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
            <div>
                  <button onClick={previous}>Previous</button>
                  <button onClick={next}>Next</button>
            </div>
     )

}

export default ButtonPage;