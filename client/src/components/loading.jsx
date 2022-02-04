import React from 'react'
import loading from './loading.module.css'
import pikachuLoad from '../images/loading.gif'


const Loading = () => {

      return (
            <div className={loading.containImg}>
                  <h1>Loading</h1>
                  <img src={pikachuLoad} alt="" />
            </div>
      )

}

export default Loading;