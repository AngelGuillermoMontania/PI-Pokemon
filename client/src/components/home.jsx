import React, { useCallback } from 'react';
import { getPokemons, getTypes} from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { filterType, filterApiOrDb, filterAlfab, filterPower } from '../functions/filters';
import Card from './card'
import Loading from './loading'
import ButtonPage from './buttonPage';
import ButtonReset from './buttonResetFilter';

const Home = () => {

      const dispatch = useDispatch();
      let state = useSelector(state => state);
      const [pokemonReact, setPokemonReact] = React.useState({...state});
      const [page, setPage] = React.useState(0);
      const [loading, setLoading] = React.useState(true)

      React.useEffect(() => {
            dispatch(getPokemons());
            dispatch(getTypes());
      }, [dispatch])

      React.useEffect(() => {
            setPokemonReact({...state})
      }, [state])

      React.useEffect(() => {
            if(pokemonReact.pokemons.length > 0) {
                  setLoading(false)
            }
            return () => {
                  setLoading(true)
            }
      }, [pokemonReact.pokemons])
      
      const functionsFilters = (event, nameFilter) => {
            switch (nameFilter) {
                  case filterType:
                        filterType(event, pokemonReact, setPokemonReact, state, renderCards)
                        break;
                  case filterApiOrDb:
                        filterApiOrDb(event, setPokemonReact, state, renderCards)
                        break;
                  case filterAlfab:
                        filterAlfab(event, pokemonReact, setPokemonReact, state, renderCards)
                        break;
                  case filterPower:
                        filterPower(event, pokemonReact, setPokemonReact, state, renderCards)
                        break;
                  default:
                        break;
            }
      }

      const renderCards = useCallback(() => {
            let pokemonRender = pokemonReact.pokemons.slice(page,page + 12)
                        return pokemonRender.map(elem => <Card 
                              id={elem.id}
                              img={elem.img}
                              name={elem.name}
                              types={elem.types}
                              power={elem.atack}
                              key={elem.id}
                              />)
      }, [pokemonReact.pokemons, page])
           

      return (
            <div>
                  <div>
                        <div>
                              <label htmlFor="">Ordena por tipo</label>
                              <select name="type" onChange={(event) => functionsFilters(event, filterType)}>
                                    <option>-</option>
                                    {
                                          state.types.map(elem => <option value={elem} key={elem}>{elem}</option>)
                                    }
                              </select>
                        </div>
                        <div>
                              <label htmlFor="">Creado o existente</label>
                              <select name="apiOrDb" onChange={(event) => functionsFilters(event, filterApiOrDb)}>
                                    <option>-</option>
                                    <option value='api'>Existente</option>
                                    <option value='db'>Creado</option>
                              </select>
                        </div>
                        <div>
                              <label htmlFor="">Ordena Alfabeticamente</label>
                              <select name="alfab" onChange={(event) => functionsFilters(event, filterAlfab)}>
                                    <option>-</option>
                                    <option value='A-Z'>Descendente</option>
                                    <option value='Z-A'>Ascendente</option>
                              </select>
                        </div>
                        <div>
                              <label htmlFor="">Ordena Por Fuerza</label>
                              <select name="force" onChange={(event) => functionsFilters(event, filterPower)}>
                                    <option>-</option>
                                    <option value='Up'>Descendente</option>
                                    <option value='Down'>Ascendente</option>
                              </select>
                        </div>
                        <ButtonReset setPokemonReact={setPokemonReact} state={state} setPage={setPage} renderCards={renderCards}/>
                  </div>
                  <div>
                        <ButtonPage pokemonReact={pokemonReact} page={page} setPage={setPage} />

                        {
                              loading && <Loading />
                        }
                        {
                              renderCards()
                        }
                              
                            
                  </div>
            </div>
      )

}

export default Home;