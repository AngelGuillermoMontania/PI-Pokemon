const axios  = require("axios")
const { Type } = require('./../db.js')

module.exports = {
     index: async (req, res) => {

          let typesApi;
          try {
               await axios.get('https://pokeapi.co/api/v2/type')
                    .then(data => typesApi = data)
          } catch (error) {
               res.send(error)
          }
          const types = typesApi.data.results.map(elem => elem.name)
          types.forEach(elem => {
               Type.findOrCreate({
                    where: {
                         name: elem
                    }
               })
          });
          
          res.send(types)
     }
}