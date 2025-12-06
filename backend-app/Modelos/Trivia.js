const { DataTypes } = require("sequelize");
const sequelize = require("../conexion/database");

const Trivia = sequelize.define(
  "trivia",
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
    tableName: "trivia",
    timestamps: false,
  }
);

module.exports = Trivia;
