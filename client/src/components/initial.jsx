import React from 'react'
import imageInitial from '../pokemon.png';
import { Link } from 'react-router-dom'


const Initial = () => {


      return (
            <div>
                  <img src={imageInitial} alt="imageInitial" />
                  <Link to="/home">
                        <button>Home!</button>
                  </Link>
            </div>
      )

}

export default Initial;