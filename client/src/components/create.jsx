import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPokemon, getTypes } from '../redux/actions';
import { validate } from '../validators/validateCreateForm';
import ButtonCreate from './buttonCreate';
import create from './create.module.css';
import { useNavigate } from 'react-router-dom';
import thunder from '../images/thunder.png'
import imgPokemons from '../images/home4.jpg'

const Create = () => {

      const dispatch = useDispatch()
      const stateRedux = useSelector(state => state.types)
      
      const navigate = useNavigate()

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
            event.preventDefault()
            if(Object.values(errors).length === 0) {
                  let newInfo = event.currentTarget;
                  let div = document.createElement("div");
                  div.textContent = `Pokemon Created!!`;
                  div.style.color = '#FFE400';
                  div.style.fontSize = '2rem';
                  div.style.fontFamily = 'Staatliches, cursive';
                  div.style.textShadow = '1px 0 0 var(--blue), -1px 0 0 var(--blue), 0 1px 0 var(--blue), 0 -1px 0 var(--blue), 0.5px 0.5px var(--blue), -0.5px -0.5px 0 var(--blue), 0.5px -0.5px 0 var(--blue), -0.5px 0.5px 0 var(--blue)'
                  newInfo.insertAdjacentElement('afterend', div);
                  dispatch(createPokemon(newPokemon));
                  navigate('/home')
            } else {
                  let newInfo = event.currentTarget;
                  let div = document.createElement("div");
                  div.textContent = `Please read the errors and fill in the necessary fields`;
                  div.style.color = '#FFE400';
                  div.style.fontSize = '2rem';
                  div.style.fontFamily = 'Staatliches, cursive';
                  div.style.textShadow = '1px 0 0 var(--blue), -1px 0 0 var(--blue), 0 1px 0 var(--blue), 0 -1px 0 var(--blue), 0.5px 0.5px var(--blue), -0.5px -0.5px 0 var(--blue), 0.5px -0.5px 0 var(--blue), -0.5px 0.5px 0 var(--blue)';
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
                  console.log('agrega nuevo tipo y no larga errores')
                  let newType = [event.target.value]
                  setNewPokemon({
                        ...newPokemon,
                        type: [...newPokemon.type, ...newType]
                  })
                  setErrors(validate({
                        ...newPokemon,
                        type: [...newPokemon.type, ...newType]
                  }))
            } else {
                  console.log('quita un tipo y si esta vacio muestra errores')
                  setNewPokemon({
                        ...newPokemon,
                        type: newPokemon.type.filter(elem => elem !== event.target.value)
                  })
                  setErrors(validate({
                        ...newPokemon,
                        type: newPokemon.type.filter(elem => elem !== event.target.value)
                  }))
                  console.log(newPokemon.type)
            };
      }

      return (
            <div className={create.containCreate}>
                  <div className={create.font}></div>
                  <img src={thunder} className={create.thunder} alt="" />
                  <img src={imgPokemons} className={create.imgPokemons} alt="" />
                  <form onSubmit={onSubmit} className={create.form}>
                        <div className={create.name}>
                              <div>
                                    <label htmlFor="name">Name:</label>
                                    <input 
                                          type="text" 
                                          id='name' 
                                          value={newPokemon.name} 
                                          name='name' 
                                          onChange={handleSubmit} 
                                          className={errors.name && create.danger}
                                    />
                                    {
                                          errors.name && (<p className={create.danger}>{errors.name}</p>)
                                    }
                              </div>
                              <div className={create.file}>
                                    <label htmlFor="file">Image:</label>
                                    <input 
                                          type="text" 
                                          id='img' 
                                          value={newPokemon.img} 
                                          name='img'
                                          onChange={handleSubmit} 
                                          className={errors.name && create.danger}
                                    />
                              </div>
                        </div>
                        <div className={create.containInputs}>
                              <div className={create.inputs}>
                                    <div>
                                          <label htmlFor="atack">Atack:</label>
                                          <input 
                                          type="number" 
                                          id='atack' 
                                          value={newPokemon.atack} 
                                          name='atack' 
                                          onChange={handleSubmit}
                                          className={errors.atack && create.danger}
                                          />
                                          {
                                                errors.atack && (<p className={create.danger}>{errors.atack}</p>)
                                          }
                                    </div>
                                    <div>
                                          <label htmlFor="defense">Defense:</label>
                                          <input 
                                          type="number" 
                                          id='defense' 
                                          value={newPokemon.defense}
                                          name='defense'
                                          onChange={handleSubmit}
                                          className={errors.defense && create.danger}
                                          />
                                          {
                                                errors.defense && (<p className={create.danger}>{errors.defense}</p>)
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
                                          className={errors.height && create.danger}
                                          />
                                          {
                                                errors.height && (<p className={create.danger}>{errors.height}</p>)
                                          }
                                    </div>
                                    <div>
                                          <label htmlFor="weight">Weight:</label>
                                          <input 
                                          type="number" 
                                          id='weight' 
                                          value={newPokemon.weight}
                                          name='weight'
                                          onChange={handleSubmit}
                                          className={errors.weight && create.danger}
                                          />
                                          {
                                                errors.weight && (<p className={create.danger}>{errors.weight}</p>)
                                          }
                                    </div>
                                    <div>
                                          <label htmlFor="life">Life:</label>
                                          <input 
                                          type="number" 
                                          id='life' 
                                          value={newPokemon.life}
                                          name='life'
                                          onChange={handleSubmit}
                                          className={errors.life && create.danger}
                                          />
                                          {
                                                errors.life && (<p className={create.danger}>{errors.life}</p>)
                                          }
                                    </div>
                                    <div>
                                          <label htmlFor="speed">Speed:</label>
                                          <input 
                                          type="number" 
                                          id='speed' 
                                          value={newPokemon.speed}
                                          name='speed'
                                          onChange={handleSubmit}
                                          className={errors.speed && create.danger}
                                          />
                                          {
                                                errors.speed && (<p className={create.danger}>{errors.speed}</p>)
                                          }
                                    </div>
                              </div>
                        </div>
                        <div className={create.containTypes}>
                              <h5>Type or Types:</h5>
                              <div className={create.types}>
                                    {
                                          stateRedux.map(elem => 
                                                <div key={elem} className={create.type}>
                                                      <label htmlFor={elem}>{elem}</label>
                                                      <input 
                                                      type="checkbox" 
                                                      name="type" 
                                                      id={elem} 
                                                      value={elem} 
                                                      onChange={selectType}
                                                      className={errors.type && create.danger}
                                                      />
                                                </div>
                                          )
                                    }
                                    {
                                          errors.type && (<p className={create.danger}>{errors.type}</p>)
                                    }
                              </div>
                        </div>
                        <ButtonCreate />
                  </form>
            </div>
      )

}

export default Create;