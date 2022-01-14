import React from 'react'
import {Link, Outlet} from 'react-router-dom';




const Nav = () => {

     const [search, setSearch] = React.useState('')


     return (
          <div>
               <div>
                    <input type="search" onChange={(event) => setSearch(event.target.value)}/>
                    <Link to={`home/detail?name=${search.toLowerCase()}`} replace={true}>
                         <button>Search</button>
                    </Link>
               </div>
               <div>
                    <Link to='/home'>
                         Home
                    </Link>
               </div>
               <div>
                    <Link to="/create">
                                   <button>Crear un Pokemon</button>
                    </Link> 
               </div>
               <Outlet />
          </div>
     )

}

export default Nav;