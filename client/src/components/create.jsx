import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPokemon, getTypes } from '../redux/actions';

const Create = () => {

      const dispatch = useDispatch()
      
      const stateRedux = useSelector(state => state.types)

      const [newPokemon, setNewPokemon] = React.useState({
            name: '',
            life: '',
            defense: '',
            atack: '',
            speed: '',
            weight: '',
            height: '',
            type: []
      })

      React.useEffect(() => {
            dispatch(getTypes())
      }, [dispatch])

      const handleSubmit = (event) => {
            console.log(newPokemon)
            dispatch(createPokemon(newPokemon));
            let newInfo = event.currentTarget;
            let div = document.createElement("div");
            div.textContent = `Pokemon Creado`;
            newInfo.insertAdjacentElement('afterend', div);
            setTimeout(() => {
                  
            }, 3000);
      }

      const selectType = (event) => {
            if(event.currentTarget.checked) {
                  console.log(event.currentTarget.checked)
                  console.log(event.target.value)
                  let newType = [event.target.value]
                  setNewPokemon({
                        ...newPokemon,
                        type: [...newPokemon.type, ...newType]
                  })
            } else {
                  setNewPokemon({
                        ...newPokemon,
                        type: newPokemon.type.filter(elem => elem !== event.target.value)
                  })
                  
            }
      }

      return (
            <div>
                  <form onSubmit={handleSubmit}>
                        <div>
                              <label htmlFor="">Nombre</label>
                              <input type="text" onChange={(event) => setNewPokemon({
                                    ...newPokemon,
                                    name: event.target.value
                              })} />
                        </div>
                        <div>
                              <div>
                                    <label htmlFor="">Ataque</label>
                                    <input type="text" onChange={(event) => setNewPokemon({
                                    ...newPokemon,
                                    power: event.target.value
                              })}/>
                                    <label htmlFor="">Defensa</label>
                                    <input type="text" onChange={(event) => setNewPokemon({
                                    ...newPokemon,
                                    defense: event.target.value
                              })}/>
                              </div>
                              <div>
                                    <label htmlFor="">Altura</label>
                                    <input type="text" name="" id="" onChange={(event) => setNewPokemon({
                                    ...newPokemon,
                                    height: event.target.value
                              })}/>
                                    <label htmlFor="">Peso</label>
                                    <input type="text" onChange={(event) => setNewPokemon({
                                    ...newPokemon,
                                    weight: event.target.value
                              })}/>
                              </div>
                        </div>
                        <div>
                              <div>
                                    <label htmlFor="">Vida</label>
                                    <input type="text" onChange={(event) => setNewPokemon({
                                          ...newPokemon,
                                          life: event.target.value
                                    })}/>
                                    <label htmlFor="">Velocidad</label>
                                    <input type="text" onChange={(event) => setNewPokemon({
                                          ...newPokemon,
                                          speed: event.target.value
                                    })}/>
                              </div>
                        </div>
                        <div>
                              <p>Tipo o Tipos</p>
                              
                              {
                              stateRedux.map(elem => 
                                    <div>
                                          <label htmlFor="type">{elem}</label>
                                          <input type="checkbox" name="type" id="type" value={elem} onChange={selectType}/>
                                    </div>
                              )
                              }
                              
                        </div>
                        <button type="submit">crear</button>
                  </form>
            </div>
      )

}

export default Create;