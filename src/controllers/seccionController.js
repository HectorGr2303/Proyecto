const seccionModel = require('../models/seccionModel');

// Obtener todas las secciones
const getSecciones = async (req, res) => {
  try {
    const secciones = await seccionModel.getSecciones();
    res.json(secciones);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Obtener una sección por ID
const getSeccionById = async (req, res) => {
  try {
    const { id } = req.params;
    const seccion = await seccionModel.getSeccionById(id);
    if (!seccion) {
      return res.status(404).send('Sección no encontrada');
    }
    res.json(seccion);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Crear una nueva sección
const createSeccion = async (req, res) => {
  try {
    const { descripcion, estado, formularioId } = req.body;
    const newSeccion = await seccionModel.createSeccion(descripcion, estado, formularioId);
    res.status(201).json(newSeccion);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Actualizar una sección existente
const updateSeccion = async (req, res) => {
  try {
    const { id } = req.params;
    const { descripcion, estado, formularioId } = req.body;
    await seccionModel.updateSeccion(id, descripcion, estado, formularioId);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Eliminar una sección
const deleteSeccion = async (req, res) => {
  try {
    const { id } = req.params;
    await seccionModel.deleteSeccion(id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getSecciones,
  getSeccionById,
  createSeccion,
  updateSeccion,
  deleteSeccion
};
