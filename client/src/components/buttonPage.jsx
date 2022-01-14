import React from 'react'

const ButtonPage = ({pokemonReact, page, setPage}) => {

      const next = () => {
            if(pokemonReact.pokemons.length > page + 12) {
                  setPage(page + 12)
            }
      }
      
      const previus = () => {
            if(page > 0) {
                  setPage(page - 12)
            }
      }


     return (
            <div>
                  <button onClick={previus}>Anterior</button>
                  <button onClick={next}>Siguiente</button>
            </div>
     )

}

export default ButtonPage;