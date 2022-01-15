import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { capitalize } from '../functions/extras';
import { createPokemon, getTypes } from '../redux/actions';
import { validate } from '../validators/validateCreateForm';

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
      const [errors, setErrors] = React.useState({})

      React.useEffect(() => {
            dispatch(getTypes())
      }, [dispatch])

      const onSubmit = (event) => {
            if(Object.values(errors).length === 0) {
                  dispatch(createPokemon(newPokemon));
                  let newInfo = event.currentTarget;
                  let div = document.createElement("div");
                  div.className = 'create';
                  div.textContent = `Pokemon Created!!`;
                  newInfo.insertAdjacentElement('afterend', div);
                  setTimeout(() => {
                  }, 4000);
            } else {
                  event.preventDefault()
                  let newInfo = event.currentTarget;
                  let div = document.createElement("div");
                  div.className = 'create';
                  div.textContent = `Please read the errors and fill in the necessary fields`;
                  newInfo.insertAdjacentElement('afterend', div);
            }
      }

      const handleSubmit = (event) => {
            setNewPokemon({
                  ...newPokemon,
                  [event.target.name]: event.target.value
            })
            setErrors(validate({
                  ...newPokemon,
                  [event.target.name]: event.target.value
            }))
      }

      const selectType = (event) => {
            if(event.currentTarget.checked) {
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
                  
            };
            if(newPokemon.type.length === 0) {
                  setErrors({})
            } else {
                  setErrors({
                        ...errors,
                        type: '1 type min'
                  })
            }
      }

      return (
            <div>
                  <form onSubmit={onSubmit}>
                        <div>
                              <label htmlFor="name">Name:</label>
                              <input 
                                    type="text" 
                                    id='name' 
                                    value={newPokemon.name} 
                                    name='name' 
                                    onChange={handleSubmit} 
                                    className={errors.name ? 'danger' : 'inputForm'}
                              />
                              {
                                    errors.name && (<p className='danger'>{errors.name}</p>)
                              }
                        </div>
                        <div>
                              <div>
                                    <label htmlFor="atack">Atack:</label>
                                    <input 
                                    type="number" 
                                    id='atack' 
                                    value={newPokemon.atack} 
                                    name='atack' 
                                    onChange={handleSubmit}
                                    className={errors.atack ? 'danger' : 'inputForm'}
                                    />
                                    {
                                          errors.atack && (<p className='danger'>{errors.atack}</p>)
                                    }
                                    <label htmlFor="defense">Defense:</label>
                                    <input 
                                    type="number" 
                                    id='defense' 
                                    value={newPokemon.defense}
                                    name='defense'
                                    onChange={handleSubmit}
                                    className={errors.defense ? 'danger' : 'inputForm'}
                                    />
                                    {
                                          errors.defense && (<p className='danger'>{errors.defense}</p>)
                                    }
                              </div>
                              <div>
                                    <label htmlFor="height">Height:</label>
                                    <input 
                                    type="number" 
                                    id="height" 
                                    value={newPokemon.height}
                                    name='height'
                                    onChange={handleSubmit}
                                    className={errors.height ? 'danger' : 'inputForm'}
                                    />
                                    {
                                          errors.height && (<p className='danger'>{errors.height}</p>)
                                    }
                                    <label htmlFor="weight">Weight:</label>
                                    <input 
                                    type="number" 
                                    id='weight' 
                                    value={newPokemon.weight}
                                    name='weight'
                                    onChange={handleSubmit}
                                    className={errors.weight ? 'danger' : 'inputForm'}
                                    />
                                    {
                                          errors.weight && (<p className='danger'>{errors.weight}</p>)
                                    }
                              </div>
                        </div>
                        <div>
                              <div>
                                    <label htmlFor="life">Life:</label>
                                    <input 
                                    type="number" 
                                    id='life' 
                                    value={newPokemon.life}
                                    name='life'
                                    onChange={handleSubmit}
                                    className={errors.life ? 'danger' : 'inputForm'}
                                    />
                                    {
                                          errors.life && (<p className='danger'>{errors.life}</p>)
                                    }
                                    <label htmlFor="speed">Speed:</label>
                                    <input 
                                    type="number" 
                                    id='speed' 
                                    value={newPokemon.speed}
                                    name='speed'
                                    onChange={handleSubmit}
                                    className={errors.speed ? 'danger' : 'inputForm'}
                                    />
                                    {
                                          errors.speed && (<p className='danger'>{errors.speed}</p>)
                                    }
                              </div>
                        </div>
                        <div>
                              <h5>Type or Types:</h5>
                              {
                                    stateRedux.map(elem => 
                                          <div key={elem}>
                                                <label htmlFor={elem}>{capitalize(elem)}</label>
                                                <input 
                                                type="checkbox" 
                                                name="type" 
                                                id={elem} 
                                                value={elem} 
                                                onChange={selectType}
                                                className={errors.type ? 'danger' : 'inputForm'}
                                                />
                                          </div>
                                    )
                              }
                              {
                                    errors.type && (<p className='danger'>{errors.type}</p>)
                              }
                        </div>
                        <button type="submit">crear</button>
                  </form>
            </div>
      )

}

export default Create;