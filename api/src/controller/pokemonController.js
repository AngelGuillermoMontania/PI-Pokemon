const axios = require('axios')
const { Pokemon, Type } = require('./../db.js')

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

          let firstCall

          await axios('https://pokeapi.co/api/v2/pokemon')
               .then(data => {
                    firstCall = data.data
               })
               .catch(error => res.send(error))

          await axios(firstCall.next)
               .then(data => {
                    firstCall = [
                         ...firstCall.results,
                         ...data.data.results
                    ]
               })
               .catch(error => res.send(error))

          /* var arr = result.map(elem => axios.get(elem.url)) */
          /* try {
               await Promise.all(result.map(elem => axios.get(elem.url)))
               .then(elem => {
                    console.log(elem)
               })
          } catch (error) {
               res.status(404).send(error)
          } */
          
          var secondCall = []
          for (let i = 0; i < firstCall.length; i++) {
               await axios(firstCall[i].url)
               .then(data => data.data)
                    .then(data => {
                         secondCall.push({
                              id: data.id,
                              name: data.forms[0].name,
                              img: data.sprites.front_default,
                              /* types: data.types.map(elem => elem.type.name) */
                              types: data.types.map(elem => {return {name: elem.type.name}})
                         })
                    }).catch(error => res.send(error))
          }
          
          var endCall
          await Pokemon.findAll({
               include: {
                    model: Type,
                    attributes: ['name'],
                    through: {
                         attributes: []
                    }
               }
          })
               .then(pokemonDB => {
                    console.log(pokemonDB);
                    endCall = [
                         ...secondCall,
                         ...pokemonDB
                    ];
                    res.send(endCall)
               }).catch(error => res.send(error))

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
               let includeDB = false
               await Pokemon.findAll({
                    where: {name: name.toLowerCase()}
               }).then(data => {
                    data.forEach(elem => {
                         elem.dataValues.name === name.toLowerCase() ? includeDB = true : '';
                    });
               }).catch(error => res.send(error))

               if(includeDB) {
                    res.send('el nombre de este pokemon coincide con otro previamente creado')
               } else {
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
               }
          } catch (error) {
               res.send(error)
          }
     },
}