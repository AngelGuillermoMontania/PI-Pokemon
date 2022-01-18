import React from 'react'
import {Outlet, useNavigate} from 'react-router-dom';
import nav from './nav.module.css'
import lupa from '../images/lupa.png'

const Nav = () => {

     const [search, setSearch] = React.useState('')
     const navigate = useNavigate()

     const handleClick = (event) => {
          if(event.target.id === 'home') navigate('/home');
          if(event.target.id === 'create') navigate('/create')
          if(event.target.id === 'search') navigate(`home/detail?name=${search.toLowerCase()}`);
     }

     return (
          <div className={nav.containHeader}>
               <div className={nav.header}>
                    <div className={nav.containSearch}>
                         <input type="search" placeholder='Search Pokemon...' onChange={(event) => setSearch(event.target.value)} />
                         <button onClick={handleClick} id='search'>
                              Search 
                              <img src={lupa} alt="" />
                         </button>
                    </div>
                    <div className={nav.containHome}>
                         <p onClick={handleClick} id='home'>Home</p> 
                    </div>
                    <div className={nav.containCreate}>
                         <button onClick={handleClick} id='create'>Create Your Pokemon!!</button>
                    </div>
                    <Outlet />
               </div>
          </div>
     )

}

export default Nav;