require('dotenv').config();
const express = require("express");
const sequelize = require("./conexion/database");
const { Op } = require("sequelize");
const Dificultad = require("./Modelos/Dificultad");
const Modalidad = require("./Modelos/Modalidad");
const Trivia = require("./Modelos/Trivia");
const Usuario = require("./Modelos/Usuario");
const Ranking = require("./Modelos/Ranking");
const Pregunta = require("./Modelos/Pregunta");
const Respuesta = require("./Modelos/Respuesta");
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());

//registrar al usuario
app.post("/registro", async (req, res) => {
  const { correo, apodo, contrasenia } = req.body;

  if (!correo || !apodo || !contrasenia) {
    return res.status(400).json({ msg: "Faltan campos obligatorios" });
  }

  try {
    const existeusuario = await Usuario.findOne({
      where: {
        [Op.or]: [{ correo }, { apodo }],
      },
    });

    if (existeusuario) {
      return res.status(400).json({ msg: "El correo o apodo ya esta registrado" });
    }

    await Usuario.create({ correo, apodo, contrasenia });

    res.status(200).json({ msg: "Usuario registrado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message || error });
  }
 
});
 //login del usuario
app.post("/login", async (req, res) => {
  const { correo, contrasenia } = req.body;

  if (!correo || !contrasenia) {
    return res.status(400).json({ msg: "Faltan datos de login" });
  }

  try {
    const usuario = await Usuario.findOne({
      where: {
        correo: correo,
        contrasenia: contrasenia,
      },
    });

    if (!usuario) {
      return res.status(400).json({ msg: "Correo o contraseña incorrectos" });
    }

    res.status(200).json({
      msg: "Login correcto",
      data: {
        idUsuario: usuario.idUsuario,
        correo: usuario.correo,
        apodo: usuario.apodo,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message || error });
  }
});

// dificultades probar
app.get("/dificultades", async (req, res) => {
  try {
    const filas = await Dificultad.findAll();
    res.status(200).json(filas);
  } catch (error) {
    res.status(500).json({ error: error.message || error });
  }
});

//modalidades probar
app.get("/modalidades", async (req, res) => {
  try {
    const filas = await Modalidad.findAll();
    res.status(200).json(filas);
  } catch (error) {
    res.status(500).json({ error: error.message || error });
  }
});

//trivias probar
app.get("/trivias", async (req, res) => {
  try {
    const filas = await Trivia.findAll();
    res.status(200).json(filas);
  } catch (error) {
    res.status(500).json({ error: error.message || error });
  }
});

// obtener pregunta
app.get("/preguntas", async (req, res) => {
  const { idTrivia, idDificultad, idModalidad } = req.query;
  try {
    const where = {};
    if (idTrivia) where.idTrivia = idTrivia;
    if (idDificultad) where.idDificultad = idDificultad;
    if (idModalidad) where.idModalidad = idModalidad;

    const filas = await Pregunta.findAll({ where });
    res.status(200).json(filas);
  } catch (error) {
    res.status(500).json({ error: error.message || error });
  }
});

//respuestas 
app.get("/respuestas/:idPregunta", async (req, res) => {
  const { idPregunta } = req.params;
  try {
    const filas = await Respuesta.findAll({ where: { idPregunta } });
    res.status(200).json(filas);
  } catch (error) {
    res.status(500).json({ error: error.message || error });
  }
});

//registro de ranking
app.post("/ranking", async (req, res) => {
  const {
    idTrivia,
    idDificultad,
    idModalidad,
    tiempoInicio,
    tiempoFin,
    totalPuntos,
    idUsuario,
  } = req.body;

  if (
    idTrivia == null ||
    idDificultad == null ||
    idModalidad == null ||
    idUsuario == null ||
    totalPuntos == null ||
    !tiempoInicio ||
    !tiempoFin
  ) {
    return res.status(400).json({ msg: "Faltan campos obligatorios para ranking" });
  }

  try {
    const creado = await Ranking.create({
      idTrivia,
      idDificultad,
      idModalidad,
      tiempoInicio,
      tiempoFin,
      totalPuntos,
      idUsuario,
    });

    res.status(200).json({ msg: "Ranking guardado", data: creado });
  } catch (error) {
    res.status(500).json({ error: error.message || error });
  }
});

// ranking
app.get("/ranking", async (req, res) => {
  const { idTrivia, idDificultad, idModalidad, idUsuario } = req.query;
  try {
    const where = {};
    if (idTrivia) where.idTrivia = idTrivia;
    if (idDificultad) where.idDificultad = idDificultad;
    if (idModalidad) where.idModalidad = idModalidad;
    if (idUsuario) where.idUsuario = idUsuario;

    const filas = await Ranking.findAll({
      where,
      order: [["totalPuntos", "DESC"], ["tiempoFin", "ASC"]],
    });

    res.status(200).json(filas);
  } catch (error) {
    res.status(500).json({ error: error.message || error });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`aplicacion ejecutando en puerto ${PORT}`);
});
