const { DataTypes } = require("sequelize");
const sequelize = require("../conexion/database");
const Pregunta = require("./Pregunta");

const Respuesta= sequelize.define(
  "respuesta",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idPregunta: {
      type: DataTypes.INTEGER,
     
    },
    nombre: {
      type: DataTypes.STRING,
    },
    puntos: {
      type: DataTypes.INTEGER,
    },
    
  },
  
  {
    tableName: "respuesta",
    timestamps: false,
  }
  
);
Respuesta.belongsTo(Pregunta, {
   foreignKey: "idPregunta",
    targetKey: "idPregunta"
   }
   
  );
Pregunta.hasMany(Respuesta, { 
  foreignKey: "idPregunta" }
);

module.exports = Respuesta;
