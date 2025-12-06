const { DataTypes } = require("sequelize");
const sequelize = require("../conexion/database");
const Trivia = require("./Trivia");
const Dificultad = require("./Dificultad");
const Modalidad = require("./Modalidad");
const Pregunta = sequelize.define(
  "pregunta",
  {
    idPregunta: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
      idTrivia: {
        type: DataTypes.INTEGER,
       
        
      },
      idDificultad: {
        type: DataTypes.INTEGER,
 
      },
      idModalidad: {
        type: DataTypes.INTEGER,
      },
     nombre: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "pregunta",
    timestamps: false,
  }

);
Pregunta.belongsTo(Trivia, { 
  foreignKey: "idTrivia", 
  targetKey: "id"
});
  
Trivia.hasMany(Pregunta, 
  { foreignKey: "idTrivia" ,
    
  });

Pregunta.belongsTo(Dificultad, { 
  foreignKey: "idDificultad" ,
  targetKey: "id"
});
Dificultad.hasMany(Pregunta, { 
  foreignKey: "idDificultad", 
});

Pregunta.belongsTo(Modalidad, { 
  foreignKey: "idModalidad" ,
  targetKey: "id"
});
Modalidad.hasMany(Pregunta, {
   foreignKey: "idModalidad",
   });

module.exports = Pregunta;
