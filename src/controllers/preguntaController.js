const preguntaModel = require('../models/preguntaModel');

// Obtener todas las preguntas
const getPreguntas = async (req, res) => {
  try {
    const preguntas = await preguntaModel.getPreguntas();
    res.json(preguntas);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Obtener una pregunta por ID
const getPreguntaById = async (req, res) => {
  try {
    const { id } = req.params;
    const pregunta = await preguntaModel.getPreguntaById(id);
    if (!pregunta) {
      return res.status(404).send('Pregunta no encontrada');
    }
    res.json(pregunta);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Crear una nueva pregunta
const createPregunta = async (req, res) => {
  try {
    const { pregunta, seccionId } = req.body;
    const newPregunta = await preguntaModel.createPregunta(pregunta, seccionId);
    res.status(201).json(newPregunta);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Actualizar una pregunta existente
const updatePregunta = async (req, res) => {
  try {
    const { id } = req.params;
    const { pregunta, seccionId } = req.body;
    await preguntaModel.updatePregunta(id, pregunta, seccionId);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Eliminar una pregunta
const deletePregunta = async (req, res) => {
  try {
    const { id } = req.params;
    await preguntaModel.deletePregunta(id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getPreguntas,
  getPreguntaById,
  createPregunta,
  updatePregunta,
  deletePregunta
};
