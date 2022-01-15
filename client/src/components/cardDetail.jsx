import React from 'react'
import { capitalize } from '../functions/extras';

const CardDetail = ({state}) => {

      return (
      <div>          
            <div>
                  <div>
                        <h1>{state.name ? capitalize(state.name) : state}</h1>
                        <img src={state.img} height={150} width={150} alt="img not found" />
                  </div>
                  <div>
                        <h3>Statistics:</h3>
                        <div>
                              <div>
                                    <div>
                                          <h5>Life:</h5>
                                          <p>{state.life}</p>
                                    </div>
                                    <div>
                                          <h5>Power:</h5>
                                          <p>{state.atack}</p>
                                    </div>
                              </div>
                              <div>
                                    <div>
                                          <h5>Defense:</h5>
                                          <p>{state.defense}</p>
                                    </div>
                                    <div>
                                          <h5>Speed:</h5>
                                          <p>{state.speed}</p>
                                    </div>
                              </div>
                              <div>
                                    <div>
                                          <h5>Altura:</h5>
                                          <p>{state.height}</p>
                                    </div>
                                    <div>
                                          <h5>Peso:</h5>
                                          <p>{state.weight}</p>
                                    </div>
                              </div>
                        </div>
                        <div>
                              <h3>Types</h3>
                              {
                                    !state.types ? '' : state.types.map(type => 
                                          <p key={type.name}>{capitalize(type.name)}</p>  
                                          )
                                    }
                        </div>
                        <div>
                              <h5>Id:</h5>
                              <p>{state.id}</p>
                        </div>
                  </div>
            </div>
      </div>      
      )

}

export default CardDetail;