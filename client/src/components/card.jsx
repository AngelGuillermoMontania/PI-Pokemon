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
                                    <h3>Type:</h3>
                                    {
                                    types.map(type => 
                                        <h5 key={type.name}>{capitalize(type.name)}</h5>  
                                    )
                                    }
                              </div>
                        </div>
                        <div>
                              <p>Power: {power}</p>
                        </div>
                  </Link>
            </div>
      )

}

export default Home;