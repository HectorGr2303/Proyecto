const opcionModel = require('../models/opcionModel');

// Obtener todas las opciones
const getOpciones = async (req, res) => {
  try {
    const opciones = await opcionModel.getOpciones();
    res.json(opciones);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Obtener una opción por ID
const getOpcionById = async (req, res) => {
  try {
    const { id } = req.params;
    const opcion = await opcionModel.getOpcionById(id);
    if (!opcion) {
      return res.status(404).send('Opción no encontrada');
    }
    res.json(opcion);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Crear una nueva opción
const createOpcion = async (req, res) => {
  try {
    const { respuesta, valor, preguntaId } = req.body;
    const newOpcion = await opcionModel.createOpcion(respuesta, valor, preguntaId);
    res.status(201).json(newOpcion);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Actualizar una opción existente
const updateOpcion = async (req, res) => {
  try {
    const { id } = req.params;
    const { respuesta, valor, preguntaId } = req.body;
    await opcionModel.updateOpcion(id, respuesta, valor, preguntaId);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Eliminar una opción
const deleteOpcion = async (req, res) => {
  try {
    const { id } = req.params;
    await opcionModel.deleteOpcion(id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getOpciones,
  getOpcionById,
  createOpcion,
  updateOpcion,
  deleteOpcion
};
