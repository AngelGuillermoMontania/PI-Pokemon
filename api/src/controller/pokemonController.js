const axios = require('axios')
const { Pokemon, Type } = require('./../db.js')
const URL_GET = "https://pokeapi.co/api/v2/pokemon/";

module.exports = {
     indexAndName: async (req, res) => {

          if(req.query.name) {
               await axios.get(`${URL_GET}${req.query.name.toLowerCase()}`)
                    .then(data => data.data)
                         .then(data => res.send({
                              id: data.id,
                              name: data.forms[0].name,
                              img: data.sprites.other.home.front_default,
                              types: data.types.map(elem => {return {name: elem.type.name}}),
                              life: data.stats[0].base_stat,
                              atack: data.stats[1].base_stat,
                              defense: data.stats[2].base_stat,
                              speed: data.stats[5].base_stat,
                              weight: data.weight,
                              height: data.height
                         }))
                         .catch(async (error) => {
                              try {
                                   await Pokemon.findOne({
                                        where: {name: req.query.name},
                                        include: {
                                             model: Type,
                                             attributes: ['name'],
                                             through: {
                                                  attributes: [],
                                             }
                                        }
                                   }).then(data => {
                                        res.send(data)
                                   })   
                              } catch (error) {
                                   res.send('The indicated pokemon does not exist. strict search')
                              } 
                         })
          } else {

               
               /* .all 2x20 */
                         let fullInfoApi = []
                         try {
                              const firstRequest = await axios.get(URL_GET);
                              const secondRequest = await axios.get(firstRequest.data.next);
                              const infoFirstRequest = await axios.all(firstRequest.data.results.map(elem => axios.get(elem.url)));
                              const infoSecondRequest = await axios.all(secondRequest.data.results.map(elem => axios.get(elem.url)));
                              const fullRequestApi = [
                                   ...infoFirstRequest,
                                   ...infoSecondRequest
                              ]
                              fullInfoApi = fullRequestApi.map(elem => ({
                                   id: elem.data.id,
                                   name: elem.data.forms[0].name,
                                   img: elem.data.sprites.other.home.front_default,
                                   atack: elem.data.stats[1].base_stat,
                                   types: elem.data.types.map(elem => {return {name: elem.type.name}})
                              }))
                         } catch (error) {
                              res.send(error)
                         }
               
               
               /* .all x40 */
                    /* try {
                              let pokemones = [];
                              do {
                                   let info = await axios.get(URL_GET);
                                   let pokemonesApi = info.data;
                                   let auxPokemones = pokemonesApi.results.map(e => {
                                        return {
                                             name: e.name,
                                             url: e.url,                    
                                        }
                                   })
                                   pokemones.push(...auxPokemones);
                                   url = pokemonesApi.next;
                              } while (url != null && pokemones.length < 40);
                                   var pokesWithData = await Promise.all(pokemones.map(async e => {
                                        var pokemon = await axios.get(e.url);
                                        console.log(pokemon.data.id)
                                        return {
                                        id: pokemon.data.id,
                                        name: pokemon.data.name,
                                        img: pokemon.data.sprites.other.home.front_default,
                                        types: pokemon.data.types.map(e => {
                                             return ({name: e.type.name})
                                        }),
                                        hp: pokemon.data.stats[0].base_stat,
                                        attack: pokemon.data.stats[1].base_stat,
                                        defense: pokemon.data.stats[2].base_stat,
                                        speed: pokemon.data.stats[5].base_stat,
                                        height: pokemon.data.height,
                                        weight: pokemon.data.weight,
                                   }
                              }));
                              console.log(pokesWithData); 
                              res.send(pokesWithData);
                    } catch (e) {
                       res.send(e);
                    } */
               
      
               await Pokemon.findAll({
                         include: {
                              model: Type,
                              attributes: ['name'],
                              through: {
                                   attributes: [],
                              }
                         }
                    })
                    .then(fullInfoDB => {
                         let fullInfo = [
                              ...fullInfoApi,
                              ...fullInfoDB
                         ];
                         res.send(fullInfo)
                    })
                    .catch(error => res.send(error))
          }

     },
     detail: async (req, res) => {
          let id = req.params.id
          if(id.length < 8) {
               try {
                    await axios.get(`${URL_GET}${id}`)
                         .then(data => data.data)
                              .then(data => {
                                   res.send({
                                        id: data.id,
                                        name: data.forms[0].name,
                                        img: data.sprites.other.home.front_default,
                                        types: data.types.map(elem => {return {name: elem.type.name}}),
                                        life: data.stats[0].base_stat,
                                        atack: data.stats[1].base_stat,
                                        defense: data.stats[2].base_stat,
                                        speed: data.stats[5].base_stat,
                                        weight: data.weight,
                                        height: data.height
                                   })
                              });     
               } catch (error) {
                    res.send(error)
               }
          } else {
               try {
                    await Pokemon.findOne({
                         where: {id: id},
                         include: {
                              model: Type,
                              attributes: ['name'],
                              through: {
                                   attributes: [],
                              }
                         }
                    }).then(data => res.send(data))   
               } catch (error) {
                    res.send(error)
               } 
          }
     },
     create: async (req, res) => {
          let { name, life, atack, defense, speed, weight, height, type} = req.body;
          let pokemonCreate

          try { 
               pokemonCreate = await Pokemon.create({
                    name: name.toLowerCase(),
                    life,
                    atack,
                    defense,
                    speed,
                    height,
                    weight
               });
               const types = await Type.findAll({
                    where: {name: type}
               });
               pokemonCreate.addType(types);
               res.send('success') 
          } catch (error) {
               res.send(error)
          }
     },
}