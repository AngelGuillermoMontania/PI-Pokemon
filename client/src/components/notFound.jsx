import React from 'react';
import notFound from './notFound.module.css';
import notFound1 from '../images/notFound.gif';

const PageNotFound = () => {
    return (
        <div className={notFound.contain}>
            <h1>404 - Address does not exist</h1>
            <img src={notFound1} alt="" />
        </div>
    )
};

export default PageNotFound;