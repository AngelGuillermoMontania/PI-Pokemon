import React from 'react'

const CardDetail = ({state}) => {

      return (
      <div>          
            <div>
                  <h1>{state.name ? state.name : state}</h1>
                  <div>
                        <img src={state.img} height={150} width={150} alt="" />
                  </div>
                  <p>Id: {state.id}</p>
                  <h3>Estadisticas</h3>
                  <div>
                        <p>Life: {state.life}</p>
                        <p>Power: {state.power}</p>
                        <p>Defense: {state.defense}</p>
                        <p>Speed: {state.speed}</p>
                  </div>
                  <div>
                        <p>Altura: {state.height}</p>
                        <p>Peso: {state.weight}</p>
                  </div>
                  <div>
                        <h3>Types</h3>
                        {
                              !state.types ? '' : state.types.map(type => 
                                    <p key={state.id}>{type.name}</p>  
                              )
                        }
                  </div>
            </div>
      </div>      
      )

}

export default CardDetail;