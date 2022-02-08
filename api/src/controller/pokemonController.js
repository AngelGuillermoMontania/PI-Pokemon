const axios = require('axios');
const { Pokemon, Type } = require('./../db.js');
const URL_GET = "https://pokeapi.co/api/v2/pokemon/";

module.exports = {
    indexAndName: async (req, res) => {
        if(req.query.name) {
            axios.get(`${URL_GET}${req.query.name.toLowerCase()}`)
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
                        let onePokemonDB = await Pokemon.findOne({
                            where: {name: req.query.name},
                                include: {
                                    model: Type,
                                    attributes: ['name'],
                                    through: {
                                        attributes: [],
                                    }
                                }
                            });
                        res.send(onePokemonDB)
                    } catch (error) {
                        res.send('The indicated pokemon does not exist. strict search')
                    }
                })
        } else {
            try {
                const firstRequest = await axios.get(URL_GET);
                const secondRequest = await axios.get(firstRequest.data.next);
                const infoFirstRequest = await axios.all(firstRequest.data.results.map(elem => axios.get(elem.url)));
                console.log('PrimerReq')
                const infoSecondRequest = await axios.all(secondRequest.data.results.map(elem => axios.get(elem.url)));
                console.log('segundoReq')
                const fullRequestApi = [
                    ...infoFirstRequest,
                    ...infoSecondRequest
                ];
                let fullInfoApi = fullRequestApi.map(elem => ({
                    id: elem.data.id,
                    name: elem.data.forms[0].name,
                    img: elem.data.sprites.other.home.front_default,
                    atack: elem.data.stats[1].base_stat,
                    types: elem.data.types.map(elem => {return {name: elem.type.name}})
                }));
                let pokemonsDB = await Pokemon.findAll({
                    include: {
                        model: Type,
                        attributes: ['name'],
                        through: {
                            attributes: [],
                        }
                    }
                });
                res.send([...pokemonsDB, ...fullInfoApi]);
            } catch (error) {
                res.send(error.message);
            }
        }
    },
    detail: async (req, res) => {
        let id = req.params.id;
        if(id.length < 8) {
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
                })
                .catch(error => res.send(error.message))     
        } else {
            try {
                let onePokemon = await Pokemon.findOne({
                    where: { id, },
                    include: {
                        model: Type,
                        attributes: ['name'],
                        through: {
                            attributes: [],
                        }
                    }
                });
                res.send(onePokemon);
            } catch (error) {
                res.send(error.message)
            } 
        }
    },
    create: async (req, res) => {
        let { name, life, atack, defense, speed, weight, height, type, img, id } = req.body;
        try {
            let pokemonSearch = await Pokemon.findByPk(id);
            if(pokemonSearch) {
                await pokemonSearch.removeTypes(await pokemonSearch.getTypes());
                await Pokemon.update({
                    name: name.toLowerCase(),
                    life,
                    atack,
                    defense,
                    speed,
                    height,
                    weight,
                    img
                },{
                    where: { id, }
                });
                let types = await Type.findAll({
                    where: {name: type}
                });
                await pokemonSearch.addType(types);
                res.send('success');
            } else {
                let pokemonCreate = await Pokemon.create({
                    name: name.toLowerCase(),
                    life,
                    atack,
                    defense,
                    speed,
                    height,
                    weight,
                    img
                });
                let types = await Type.findAll({
                    where: {name: type}
                });
                pokemonCreate.addType(types);
                res.send('success');
            }
        } catch (error) {
           console.log(error.message);
        }
    },
    delete: async (req, res) => {
        let namePoke = req.query.name;
        try {
            let pokemonSearch = await Pokemon.findOne({
                where: {
                    name: namePoke
                }
            });
            pokemonSearch.removeTypes(await pokemonSearch.getTypes());
            await Pokemon.destroy({
                where: {
                    name: namePoke
                }
            });
            res.send('success');
        } catch (error) {
            console.log(error.message)
        }
    }
}