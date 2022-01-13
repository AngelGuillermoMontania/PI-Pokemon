import React from 'react';
import { Link } from 'react-router-dom'

const Home = ({id, img, name, power, types}) => {

      return (
            <div key={id}>
                  <Link to={`detail/${id}`}>
                        <div>
                              <h1>{name}</h1>
                              <img src={img} alt="" />
                        </div>
                        <div>
                              <div>
                                    <h3>Type:</h3>
                                    {
                                    types.map(type => 
                                        <h5>{type.name}</h5>  
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