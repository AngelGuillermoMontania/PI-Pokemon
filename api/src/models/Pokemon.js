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
    img: {
      type: DataTypes.STRING,
      defaultValue: 'https://www.vectorkhazana.com/assets/images/products/Pokemon-Pikachu-Pokeball.jpg',
    },
    life: {
      type: DataTypes.STRING,
      alowNull: false
    },
    atack: {
      type: DataTypes.STRING,
      alowNull: false
    },
    createInDB: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    defense: {
      type: DataTypes.STRING,
      alowNull: false
    },
    speed: {
      type: DataTypes.STRING,
      alowNull: false
    },
    height: {
      type: DataTypes.STRING,
      alowNull: false
    },
    weight: {
      type: DataTypes.STRING,
      alowNull: false
    }
  },{
    timestamps: false,
    sequelize: sequelize,
    modelName: 'pokemon'
  })

};
