import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getDetail, getPokemonName } from '../redux/actions';
import { useParams, useLocation } from 'react-router-dom';

function useQuery() {
      return new URLSearchParams(useLocation().search)
}







const Detail = () => {
      
      const dispatch = useDispatch();
      const state = useSelector(state => state.pokemon);
      const {id} = useParams();
      const query = useQuery()
      const name = query.get("name")

      console.log(query)

      React.useEffect(() => {
            if(id){
                  dispatch(getDetail(id))
            }
      }, [dispatch, id])


      React.useEffect(() => {
            if(name) {
                  dispatch(getPokemonName(name))
            }
      }, [dispatch, name])
     
      return (
            <div>
                  <div>
                        <h1>{state.name ? state.name : state}</h1>
                  <div>
                        <img src={state.img} alt="" />
                  </div>
                  <p>Id: {state.id}</p>
                  <h3>Estadisticas</h3>
                        <div>
                              <p>Life: {state.life}</p>
                              <p>Power: {state.power}</p>
                              <p>Defense: {state.defense}</p>
                              <p>Speed: {state.speed}</p>
                        </div>
                        <div>
                              <p>Altura: {state.height}</p>
                              <p>Peso: {state.weight}</p>
                        </div>
                        <div>
                        {
                              state.types.map(type => 
                                    <h5>{type.name}</h5>  
                              )
                        }
                        </div>
            </div>
            </div>
      )

}

export default Detail;