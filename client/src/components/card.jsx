import React from 'react';
import { useNavigate } from 'react-router-dom'
import card from './card.module.css'

const Home = ({id, img, name, power, types}) => {

      const navigate = useNavigate()

      const handleClick = () => {
            navigate(`detail/${id}`)
      }

      return (
            <div key={id} className={card.containCard} onClick={handleClick}>
                  <div className={card.containName}>
                        <p>{name}</p>
                  </div>
                  <div className={card.containDetail}>
                        <div className={card.containImg}>
                              <img src={img} alt="Img not found" />
                        </div>
                        <div className={card.containStats}>
                              <div className={card.stats}>
                                    <h5><b>{`Power: `}</b></h5>
                                    <p>{power}</p>
                              </div>
                              <div className={card.stats}>
                                    <h5>Types: </h5>
                                    {
                                          types.map(type => 
                                                <p key={type.name}>{type.name} <br /></p>  
                                          )
                                    }
                              </div>
                              
                        </div>
                  </div>
            </div>
      )

}

export default Home;