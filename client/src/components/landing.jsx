import React from 'react';
import { useNavigate } from 'react-router-dom';
import landing from './landing.module.css';


const Landing = () => {

    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate('/home')
    };

    return (
        <div className={landing.contain}>
            <div className={landing.containButton}>
                <button onClick={handleClick}> Gotta catch <br /> ´em all! </button>
            </div>
        </div>
    )
};

export default Landing;