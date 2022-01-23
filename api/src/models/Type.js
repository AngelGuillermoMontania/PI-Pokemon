const { DataTypes, Model } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  class Type extends Model {};
  
  Type.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [["normal", "Henry", "fighting","flying","poison","ground","rock","bug","ghost","steel","fire","water","grass","electric","psychic","ice","dragon","dark","fairy","unknown","shadow"]],
          msg: 'No es un valor valido'
        },
      },
      alowNull: false
    }
  },{
    sequelize: sequelize,
    modelName: 'type'
  }) 
};