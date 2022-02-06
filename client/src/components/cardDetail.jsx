import React from 'react'
import cardDetail from './cardDetail.module.css'

const CardDetail = ({state}) => {

      return (
      <div className={cardDetail.containDetails}>          
            <div className={cardDetail.containStatsGeneral}>
                  <div className={cardDetail.containName}>
                        <h1>{state.name ? state.name : state}</h1>
                  </div>
                  <div className={cardDetail.containStats}>
                        <h2>Statistics:</h2>
                        <div className={cardDetail.containDetail}>
                              <div className={cardDetail.containStatistics}>
                                    <div className={cardDetail.detail}>
                                          <div>
                                                <h5>Life:</h5>  
                                                <p>{state.life}</p>                 
                                          </div>
                                          <div>
                                                <h5>Atack: </h5>
                                                <p>{state.atack}</p>
                                          </div>
                                          <div>
                                                <h5>Defense: </h5>
                                                <p>{state.defense}</p>      
                                          </div>
                                    </div>
                                    <div className={cardDetail.detail}>
                                          <div>
                                                <h5>Speed: </h5>
                                                <p>{state.speed}</p>
                                          </div>
                                          <div>
                                                <h5>Height: </h5> 
                                                <p>{state.height}</p>
                                          </div>
                                          <div>
                                                <h5>Weight: </h5>  
                                                <p>{state.weight}</p>
                                          </div>
                                    </div>
                              </div>
                              <div className={cardDetail.containTypes}>
                                    <h5>Types: </h5>
                                    <div className={cardDetail.types}>
                                          {
                                                !state.types ? '' : state.types.map(type => 
                                                      <p key={type.name}>{type.name}</p>  
                                                      )
                                          }
                                    </div>
                              </div>
                              <div className={cardDetail.id}>
                                    <h5>Id:</h5>
                                    <p>{state.id}</p>
                              </div>
                        </div>
                  </div>
            </div>
            <div className={cardDetail.containImg}>
                  <img src={state.img} height={150} width={150} alt="img not found" />
            </div>
            {
               
            }
      </div>      
      )

}

export default CardDetail;