import React from 'react';
import { Link } from 'react-router-dom'
import { capitalize } from '../functions/extras';

const Home = ({id, img, name, power, types}) => {

      return (
            <div key={id}>
                  <Link to={`detail/${id}`}>
                        <div>
                              <h1>{capitalize(name)}</h1>
                              <img src={img} width={150} height={150} alt="Img not found" />
                        </div>
                        <div>
                              <div>
                                    <h5>Type:</h5>
                                    {
                                    types.map(type => 
                                        <p key={type.name}>{capitalize(type.name)}</p>  
                                    )
                                    }
                              </div>
                        </div>
                        <div>
                              <h5>Power:</h5>
                              <p>{power}</p>
                        </div>
                  </Link>
            </div>
      )

}

export default Home;