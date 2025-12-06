const { DataTypes } = require("sequelize");
const sequelize = require("../conexion/database");

const Dificultad = sequelize.define(
  "dificultad",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
    },
   
  },
  {
    tableName: "dificultad",
    timestamps: false,
  }
);

module.exports = Dificultad;
