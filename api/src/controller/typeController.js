const axios  = require("axios")
const { Type } = require('./../db.js')
const URL_TYPE = "https://pokeapi.co/api/v2/type";

module.exports = {
     index: async (req, res) => {

          let typesApi;
          try {
               await axios.get(URL_TYPE)
                    .then(data => typesApi = data.data.results.map(elem => elem.name))
          } catch (error) {
               return res.send(error)
          }
          typesApi.forEach(elem => {
               Type.findOrCreate({
                    where: {
                         name: elem
                    }
               })
          });
          return res.send(typesApi)
     },
     getTypes: async (req, res) => {
          try {
               await axios.get(URL_TYPE)
                    .then(data => res.send(data.data.results.map(elem => elem.name)))
          } catch (error) {
               return res.send(error)
          }
     }
}