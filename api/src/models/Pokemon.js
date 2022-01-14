const { DataTypes, Model } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  class Pokemon extends Model {};
  
  Pokemon.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      alowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      alowNull: false
    },
    life: {
      type: DataTypes.STRING
    },
    atack: {
      type: DataTypes.STRING
    },
    createInDB: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    defense: {
      type: DataTypes.STRING
    },
    speed: {
      type: DataTypes.STRING
    },
    height: {
      type: DataTypes.STRING
    },
    weight: {
      type: DataTypes.STRING
    }
  },{
    timestamps: false,
    sequelize: sequelize,
    modelName: 'pokemon'
  })

  /* Pokemon.addHook('beforeValidate', (pokemon, options) => {

    pokemon.id > Number('10220');

    for (let i = 10220; i > 10219; i++) {
      fetch(`https://pokeapi.co/api/v2/pokemon/{i}`).catch(true)
    }

    for (let i = 10220; i > 10219; i++) {
      try {
        await fetch(`ht☺tps://pokeapi.co/api/v2/pokemon/{i}`)
      } catch(error) {
        return true
      }
    }

    try {
      await fetch('https://pokeapi.co/api/v2/pokemon/{id}');
    } catch (error) {
      return true
    }
    
  }); */
};
