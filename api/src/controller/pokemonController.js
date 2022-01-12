const axios = require('axios')
const { Pokemon, Type } = require('./../db.js')
const URL_GET = "https://pokeapi.co/api/v2/pokemon";

module.exports = {
     indexAndName: async (req, res) => {

          if(req.query.name) {
               await axios.get(`https://pokeapi.co/api/v2/pokemon/${req.query.name.toLowerCase()}`)
                    .then(data => data.data)
                         .then(data => res.send({
                              id: data.id,
                              name: data.forms[0].name,
                              img: data.sprites.front_default,
                              types: data.types.map(elem => elem.type.name),
                              life: data.stats[0].base_stat,
                              atack: data.stats[1].base_stat,
                              defense: data.stats[2].base_stat,
                              speed: data.stats[5].base_stat,
                              weight: data.weight,
                              height: data.height
                         }))
                              .catch((error) => res.send('No se encontro el pokemon indicado'))
          }

     
          /* let fullInfoApi = []
          try {
               const firstRequest = await axios.get(URL_GET);
               const secondRequest = await axios.get(firstRequest.data.next);
               const infoFirstRequest = await axios.all(firstRequest.data.results.map(elem => axios.get(elem.url)));
               const infoSecondRequest = await axios.all(secondRequest.data.results.map(elem => axios.get(elem.url)));
               const fullRequestApi = [
                    ...infoFirstRequest,
                    ...infoSecondRequest
               ]
               console.log(fullRequestApi)
               fullInfoApi = fullRequestApi.map(elem => ({
                    id: elem.data.id,
                    name: elem.data.forms[0].name,
                    img: elem.data.sprites.front_default,
                    types: elem.data.types.map(elem => {return {name: elem.type.name}})
               }))
          } catch (error) {
               res.send(error)
          }
 */



          /* try {
               let url = 'https://pokeapi.co/api/v2/pokemon/';
               let pokemones = [];
               do {
                   let info = await axios.get(url);
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
          let pokesWithData = await Promise.all(pokemones.map(async e => {
               let pokemon = await axios.get(e.url);
               console.log(pokemon.data.id)
               return {
                   id: pokemon.data.id,
                   name: pokemon.data.name,
                   img: pokemon.data.sprites.front_default,
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
        console.log(e);
     } */







          let fullInfoApi = []
          let firstRequest
          let secondRequest

          await axios(URL_GET)
               .then(data => firstRequest = data.data)
               .catch(error => res.send(error))
          await axios(firstRequest.next)
               .then(data => secondRequest = data.data)
               .catch(error => res.send(error))
          await Promise.all(firstRequest.results.map(elem => axios(elem.url)))
               .then(data => {
                    data.forEach(elem => {
                         fullInfoApi.push({
                              id: elem.data.id,
                              name: elem.data.forms[0].name,
                              img: elem.data.sprites.front_default,
                              types: elem.data.types.map(elem => {return {name: elem.type.name}})
                         })
                    })
               })
               .catch(error => res.send(error))
          await Promise.all(secondRequest.results.map(elem => axios(elem.url)))
               .then(data => {
                    data.forEach(elem => {
                         fullInfoApi.push({
                              id: elem.data.id,
                              name: elem.data.forms[0].name,
                              img: elem.data.sprites.front_default,
                              types: elem.data.types.map(elem => {return {name: elem.type.name}})
                         })
                    })
               })
               .catch(error => res.send(error))

          
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

     },
     detail: async (req, res) => {
          let id = req.params.id
          let detailPokemon

          await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
               .then(data => data.data)
                    .then(data => {
                         detailPokemon = {
                              id: data.id,
                              name: data.forms[0].name,
                              img: data.sprites.front_default,
                              types: data.types.map(elem => elem.type.name),
                              life: data.stats[0].base_stat,
                              atack: data.stats[1].base_stat,
                              defense: data.stats[2].base_stat,
                              speed: data.stats[5].base_stat,
                              weight: data.weight,
                              height: data.height
                         }
                    }).catch(error => res.send(error));
          
          res.send(detailPokemon)
     },
     create: async (req, res) => {
          let { name, life, power, defense, speed, weight, height, type} = req.body;
          let pokemonCreate
          
          try { 
               pokemonCreate = await Pokemon.create({
                    name: name.toLowerCase(),
                    life,
                    power,
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