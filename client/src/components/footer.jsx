import React from 'react'
import { useNavigate } from 'react-router-dom';
import footer from './footer.module.css';
import grass from '../images/ce'


const Footer = () => {

      return (
            <div className={footer.contain}>
                  <img src={grass} alt="" />
            </div>
      )

}

export default Footer;