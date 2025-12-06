const { DataTypes } = require("sequelize");
const sequelize = require("../conexion/database");

const Modalidad = sequelize.define(
  "modalidad",
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
    tableName: "modalidad",
    timestamps: false,
  }
);

module.exports = Modalidad;
