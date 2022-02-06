import React from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { deletePoke } from '../redux/actions';
import card from './card.module.css'
import { FaWindowClose } from 'react-icons/fa'

const Home = ({id, img, name, power, types, createInDB}) => {

      const navigate = useNavigate()
      const dispatch = useDispatch();

      const handleClick = () => {
            navigate(`detail/${id}`)
      }

      const deletePokemon = () => {
            dispatch(deletePoke(name))
            window.location.reload(true);
      }

      return (
            <div className={card.contain}>
                  {
                  createInDB ? <div className={card.close}><FaWindowClose onClick={deletePokemon}/> </div>: ''
                  }
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
            </div>
      )

}

export default Home;