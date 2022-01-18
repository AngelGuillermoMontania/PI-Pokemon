import React from 'react'
import loading from './loading.module.css'
import pikachuLoad from '../images/loading.gif'


const Loading = () => {

      return (
            <div className={loading.containImg}>
                  <img src={pikachuLoad} alt="" />
                  <h1>Loading</h1>
            </div>
      )

}

export default Loading;