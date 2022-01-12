import React, { useCallback } from 'react';
import { getPokemons, getTypes} from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Link} from 'react-router-dom';
import Card from './card'

const Home = () => {

      const dispatch = useDispatch();
      let state = useSelector(state => state);
      const [pokemonReact, setPokemonReact] = React.useState({...state})

      React.useEffect(() => {
            dispatch(getPokemons());
            dispatch(getTypes());
      }, [dispatch])

      React.useEffect(() => {
            setPokemonReact({...state})
      }, [state])

      const filter = (event) => {
            var prev = [];
            if(event.target.value === 'null') {
                  console.log(event.target.value)
                  setPokemonReact({...state, pokemons: state.pokemons});
            } else {
                  state.pokemons.forEach(elem => 
                        elem.types.forEach(value => {
                              if(value.name === event.target.value) {
                                    prev.push(elem)
                              }
                        })
                  )
                  setPokemonReact({...state, pokemons: prev});
            }
            renderCards();
      }

      const filterAlfab = (event) => {
            console.log(state.pokemons)
            if(event.target.value === 'qsy') {
                  console.log(event.target.value)
                  setPokemonReact({...state, pokemons: state.pokemons});
            } if(event.target.value === 'A-Z') {
                  let names = pokemonReact.pokemons.sort((a, b) => {
                        if (a.name > b.name) {
                              return 1;
                        }
                        if (a.name < b.name) {
                              return -1;
                        }
                        return 0;
                  })
                  console.log(state.pokemons)
                  setPokemonReact({...state, pokemons: names});
                  
            } if(event.target.value === 'Z-A') {
                  let names = pokemonReact.pokemons.sort((a, b) => {
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

            
            const renderCards = useCallback(() => {
                  
                              return pokemonReact.pokemons.map(elem => <Card 
                                    key={elem.id}
                                    id={elem.id}
                                    img={elem.img}
                                    name={elem.name}
                                    types={elem.types}
                                    />)
                        
                           
            }, [pokemonReact])


           

      return (
            <div>
                  <div>
                        <div>
                              <label htmlFor="">Ordena por tipo</label>
                              <select name="type" onChange={filter}>
                                    <option value='null'>Selecciona</option>
                                    {
                                          state.types.map(elem => <option value={elem} key={elem}>{elem}</option>)
                                    }
                              </select>
                        </div>
                        <div>
                              <label htmlFor="">Ordena Alfabeticamente</label>
                              <select name="alfab" onChange={filterAlfab}>
                                    <option value='qsy'>Selecciona</option>
                                    <option value='A-Z'>Descendente</option>
                                    <option value='Z-A'>Ascendente</option>
                              </select>
                        </div>
                        <form action="">
                              <button type="submit">♣♠♠♠♠</button>
                        </form>
                        <Link to="/create">
                              <button type="submit">crear</button>
                        </Link>  
                  </div>
                  <div>
                        {
                              renderCards()
                        }
                              
                            
                  </div>
            </div>
      )

}

export default Home;