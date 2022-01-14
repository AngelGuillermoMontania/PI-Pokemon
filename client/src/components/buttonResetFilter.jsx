import React from 'react'

const ButtonReset = ({setPokemonReact, state, setPage, renderCards}) => {

      const reset = () => {
            setPokemonReact({...state})
            renderCards()
            setPage(0)
      }

      return (
                  <button onClick={reset}>Reiniciar filtros</button>
      )

}

export default ButtonReset;