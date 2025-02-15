const formCompletadoModel = require('../models/formCompletadoModel');

// Obtener todos los formularios completados
const getFormulariosCompletados = async (req, res) => {
  try {
    const formulariosCompletados = await formCompletadoModel.getFormulariosCompletados();
    res.json(formulariosCompletados);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Obtener un formulario completado por ID
const getFormCompletadoById = async (req, res) => {
  try {
    const { id } = req.params;
    const formCompletado = await formCompletadoModel.getFormCompletadoById(id);
    if (!formCompletado) {
      return res.status(404).send('Formulario completado no encontrado');
    }
    res.json(formCompletado);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Crear un nuevo formulario completado
const createFormCompletado = async (req, res) => {
  try {
    const { usuarioId, formularioId, detalle, puntuacionFinal } = req.body;
    const newFormCompletado = await formCompletadoModel.createFormCompletado(usuarioId, formularioId, detalle, puntuacionFinal);
    res.status(201).json(newFormCompletado);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Actualizar un formulario completado existente
const updateFormCompletado = async (req, res) => {
  try {
    const { id } = req.params;
    const { usuarioId, formularioId, detalle, puntuacionFinal } = req.body;
    await formCompletadoModel.updateFormCompletado(id, usuarioId, formularioId, detalle, puntuacionFinal);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Eliminar un formulario completado
const deleteFormCompletado = async (req, res) => {
  try {
    const { id } = req.params;
    await formCompletadoModel.deleteFormCompletado(id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getFormulariosCompletados,
  getFormCompletadoById,
  createFormCompletado,
  updateFormCompletado,
  deleteFormCompletado
};
