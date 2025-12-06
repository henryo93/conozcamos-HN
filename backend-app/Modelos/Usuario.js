const { DataTypes } = require("sequelize");
const sequelize = require("../conexion/database");

const Usuario = sequelize.define(
  "usuario",
  {
    idUsuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    correo: {
      type: DataTypes.STRING,
    },
    apodo: {
      type: DataTypes.STRING,
    },
    contrasenia: {
      type: DataTypes.STRING,
    },
     
    
  },
  {
    tableName: "usuario",
    timestamps: false,
  }
);

module.exports = Usuario;
