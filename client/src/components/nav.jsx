import React from 'react'
import {Link, Outlet, useNavigate} from 'react-router-dom';

const Nav = () => {

     const [search, setSearch] = React.useState('')
     const navigate = useNavigate()

     const onSearch = (event) => {
          navigate(`home/detail?name=${search.toLowerCase()}`);
     }

     return (
          <div>
               <div>
                    <input type="search" placeholder='Search Pokemon...' onChange={(event) => setSearch(event.target.value)} />
                    <button onClick={onSearch}>Search</button>
               </div>
               <div>
                    <Link to='/home'>
                         Home
                    </Link>
               </div>
               <div>
                    <Link to="/create">
                                   <button>Create Your Pokemon!!</button>
                    </Link> 
               </div>
               <Outlet />
          </div>
     )

}

export default Nav;