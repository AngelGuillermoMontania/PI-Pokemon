import React, { useCallback } from 'react';
import { getPokemons, getTypes, setLoading} from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import Card from './card'

const Home = () => {

      const dispatch = useDispatch();
      let state = useSelector(state => state);
      const [pokemonReact, setPokemonReact] = React.useState({...state});
      const [page, setPage] = React.useState(0)

      React.useEffect(() => {
            dispatch(getPokemons());
            dispatch(getTypes());
      }, [dispatch])

      React.useEffect(() => {
            setPokemonReact({...state})
      }, [state])

      React.useEffect(() => {
            if(pokemonReact.pokemons.length > 0) {
                  dispatch(setLoading())
            }
      }, [pokemonReact.pokemons, dispatch])

      const filterType = (event) => {
            var prev = [];
            state.pokemons.forEach(elem => 
                        elem.types.forEach(value => {
                              if(value.name.includes(event.target.value)) {
                                    prev.push(elem)
                              }
                        })
                  )
            setPokemonReact({...state, pokemons: prev});
            renderCards();
      }

      const filterApiOrDb = (event) => {
            var prev = [];
            if(event.target.value === 'db') {
                  pokemonReact.pokemons.forEach(elem => {
                        if(elem.createInDB) {
                              prev.push(elem)
                        }
                  })
            }
            if(event.target.value === 'api') {
                  pokemonReact.pokemons.forEach(elem => {
                        if(!elem.createInDB) {
                              prev.push(elem)
                        }
                  })
            }
            setPokemonReact({...state, pokemons: prev});
            renderCards();
      }

      const filterAlfab = (event) => {
            let pokemonsReact = [...pokemonReact.pokemons]
            if(event.target.value === 'Z-A') {
                  let names = pokemonsReact.sort((a, b) => {
                        if (a.name > b.name) {
                              return 1;
                        }
                        if (a.name < b.name) {
                              return -1;
                        }
                        return 0;
                  })
                  setPokemonReact({...state, pokemons: names});
                  
            } 
            if(event.target.value === 'A-Z') {
                  let names = pokemonsReact.sort((a, b) => {
                        if (a.name < b.name) {
                              return 1;
                        }
                        if (a.name > b.name) {
                              return -1;
                        }
                        return 0;
                  })
                  setPokemonReact({...state, pokemons: names});
            }
            renderCards();
      }

      const filterPower = (event) => {
            let pokemonsReact = [...pokemonReact.pokemons]
            if(event.target.value === 'Down') {
                  let powers = pokemonsReact.sort((a, b) => {
                        if (a.atack > b.atack) {
                              console.log(a.power)
                              return 1;
                        }
                        if (a.atack < b.atack) {
                              return -1;
                        }
                        return 0;
                  })
                  setPokemonReact({...state, pokemons: powers});
            } 
            if(event.target.value === 'Up') {
                  let powers = pokemonsReact.sort((a, b) => {
                        if (a.atack < b.atack) {
                              return 1;
                        }
                        if (a.atack > b.atack) {
                              return -1;
                        }
                        return 0;
                  })
                  setPokemonReact({...state, pokemons: powers});
            }
            renderCards();
      }
      
      const reset = () => {
            setPokemonReact({...state})
            renderCards() 
      }
      
      /* console.log(event.target.selectedIndex) */
            

      const paginCards = useCallback(() => {
            
            const pokemonRender = pokemonReact.pokemons.slice(page,page + 12)
            return pokemonRender
            
      }, [pokemonReact, page])

      const next = () => {
            setPage(page + 12)
      }

      /* const previus = () => {

      } */

      const renderCards = useCallback(() => {
                        return paginCards().map(elem => <Card 
                              id={elem.id}
                              img={elem.img}
                              name={elem.name}
                              types={elem.types}
                              power={elem.atack}
                              />)
      }, [paginCards])

      const isLoading = useCallback(() => {
            if(state.loading) {
                  return (<div>
                              <h1>Cargando...</h1>
                        </div>)
            }
      }, [state.loading])
           

      return (
            <div>
                  <div>
                        <div>
                              <div>
                                    <label htmlFor="">Ordena por tipo</label>
                                    <select name="type" onChange={filterType}>
                                          <option>-</option>
                                          {
                                                state.types.map(elem => <option value={elem} key={elem}>{elem}</option>)
                                          }
                                    </select>
                              </div>
                              <div>
                              <label htmlFor="">Creado o existente</label>
                                    <select name="apiOrDb" onChange={filterApiOrDb}>
                                          <option>-</option>
                                          <option value='api'>Existente</option>
                                          <option value='db'>Creado</option>
                                    </select>
                              </div>
                        </div>
                        <div>
                              <div>
                                    <label htmlFor="">Ordena Alfabeticamente</label>
                                    <select name="alfab" onChange={filterAlfab}>
                                          <option>-</option>
                                          <option value='A-Z'>Descendente</option>
                                          <option value='Z-A'>Ascendente</option>
                                    </select>
                              </div>
                                    <label htmlFor="">Ordena Por Fuerza</label>
                                    <select name="force" onChange={filterPower}>
                                          <option>-</option>
                                          <option value='Up'>Descendente</option>
                                          <option value='Down'>Ascendente</option>
                                    </select>
                              <div>

                              </div>
                        </div>
                        <button onClick={reset}>Reiniciar filtros</button>
                        
                  </div>
                  <div>
                        <button>Anterior</button>
                        <button onClick={next}>Siguiente</button>
                  </div>
                  <div>
                        {
                              isLoading()
                        }
                        {
                              renderCards()
                        }
                              
                            
                  </div>
            </div>
      )

}

export default Home;