import React from 'react'
import {/* useResolvedPath, */ Link, Outlet} from 'react-router-dom';

/* Probar resolvePath y si no es home */



const Nav = () => {

     const [search, setSearch] = React.useState('')
     /* let navigate = useNavigate() */

     /* function submit() {
          navigate(`detail?name=${search}`, { replace: false });
     } */
     /* const resolvedPath = useResolvedPath(`detail?name=${search}`, `home/detail?name=${search}`) */

     return (
          <div>
               <Link to='/home'>
                    Home
               </Link>
               <form action="">
                    <input type="search" onChange={(event) => setSearch(event.target.value)}/>
                    <Link to={`home/detail?name=${search}`} replace={true}>
                         <button /* onClick={submit} */>Search</button>
                    </Link>
                    
               </form>
               <Link to="/create">
                              <button type="submit">crear</button>
               </Link> 
               <Outlet />
          </div>
     )

}

export default Nav;