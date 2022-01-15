import React, { useCallback } from 'react';
import { getPokemons, getTypes} from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { filterType, filterApiOrDb, filterAlphab, filterPower } from '../functions/filters';
import Card from './card'
import Loading from './loading'
import ButtonPage from './buttonPage';
import ButtonReset from './buttonResetFilter';
import { capitalize } from '../functions/extras';

const Home = () => {

      const dispatch = useDispatch();
      const state = useSelector(state => state);
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
                  case filterAlphab:
                        filterAlphab(event, pokemonReact, setPokemonReact, state, renderCards)
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
                              <label htmlFor="">Filter By Type</label>
                              <select name="type" onChange={(event) => functionsFilters(event, filterType)}>
                                    <option>-</option>
                                    {
                                          state.types.map(elem => <option value={elem} key={elem}>{capitalize(elem)}</option>)
                                    }
                              </select>
                        </div>
                        <div>
                              <label htmlFor="">Created Or Existing</label>
                              <select name="apiOrDb" onChange={(event) => functionsFilters(event, filterApiOrDb)}>
                                    <option>-</option>
                                    <option value='api'>Existing</option>
                                    <option value='db'>Created</option>
                              </select>
                        </div>
                        <div>
                              <label htmlFor="">Order Alphabetically</label>
                              <select name="Alphab" onChange={(event) => functionsFilters(event, filterAlphab)}>
                                    <option>-</option>
                                    <option value='A-Z'>Descendant</option>
                                    <option value='Z-A'>Ascendant</option>
                              </select>
                        </div>
                        <div>
                              <label htmlFor="">Order By Atack</label>
                              <select name="force" onChange={(event) => functionsFilters(event, filterPower)}>
                                    <option>-</option>
                                    <option value='Up'>Descendant</option>
                                    <option value='Down'>Ascendant</option>
                              </select>
                        </div>
                  </div>
                  <ButtonReset setPokemonReact={setPokemonReact} state={state} setPage={setPage} renderCards={renderCards}/>
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