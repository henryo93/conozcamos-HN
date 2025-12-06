const { DataTypes } = require("sequelize");
const sequelize = require("../conexion/database");
const Trivia = require("./Trivia");
const Dificultad = require("./Dificultad");
const Modalidad = require("./Modalidad");
const Usuario = require("./Usuario");
const Ranking = sequelize.define(
  "ranking",
  {
    id: {
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
     tiempoInicio: {
      type: DataTypes.DATE,
    },
     tiempoFin: {
      type: DataTypes.DATE,
    },
    totalPuntos: {
      type: DataTypes.INTEGER,
    },
    idUsuario: {
      type: DataTypes.INTEGER,
    },
    
  },
  {
    tableName: "ranking",
    timestamps: false,
  }
);
Ranking.belongsTo(Trivia, {
   foreignKey: "idTrivia" ,
   targetKey: "id"
  });
Trivia.hasMany(Ranking, { 
  foreignKey: "idTrivia" 
});

Ranking.belongsTo(Dificultad, {
   foreignKey: "idDificultad",
    targetKey: "id"
   });
Dificultad.hasMany(Ranking, { 
  foreignKey: "idDificultad" 
});

Ranking.belongsTo(Modalidad, {
   foreignKey: "idModalidad",
    targetKey: "id"
   });
Modalidad.hasMany(Ranking, {
   foreignKey: "idModalidad"
   });

Ranking.belongsTo(Usuario, { 
  foreignKey: "idUsuario", 
  targetKey: "idUsuario"
});
Usuario.hasMany(Ranking, {
   foreignKey: "idUsuario" 
  });

module.exports = Ranking;
