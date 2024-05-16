const { sql, poolPromise } = require('../config/db');

// Obtener todos los formularios completados
const getFormulariosCompletados = async () => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM FormCompletado');
    return result.recordset;
  } catch (error) {
    throw error;
  }
};

// Obtener un formulario completado por ID
const getFormCompletadoById = async (id) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM FormCompletado WHERE FormCompletadoId = @id');
    return result.recordset[0];
  } catch (error) {
    throw error;
  }
};

// Crear un nuevo formulario completado
const createFormCompletado = async (usuarioId, formularioId, detalle, puntuacionFinal) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('usuarioId', sql.Int, usuarioId)
      .input('formularioId', sql.Int, formularioId)
      .input('detalle', sql.NVarChar, detalle)
      .input('puntuacionFinal', sql.Int, puntuacionFinal)
      .query('INSERT INTO FormCompletado (UsuarioId, FormularioId, Detalle, PuntuacionFinal) VALUES (@usuarioId, @formularioId, @detalle, @puntuacionFinal); SELECT SCOPE_IDENTITY() AS FormCompletadoId');
    return result.recordset[0];
  } catch (error) {
    throw error;
  }
};

// Actualizar un formulario completado existente
const updateFormCompletado = async (id, usuarioId, formularioId, detalle, puntuacionFinal) => {
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, id)
      .input('usuarioId', sql.Int, usuarioId)
      .input('formularioId', sql.Int, formularioId)
      .input('detalle', sql.NVarChar, detalle)
      .input('puntuacionFinal', sql.Int, puntuacionFinal)
      .query('UPDATE FormCompletado SET UsuarioId = @usuarioId, FormularioId = @formularioId, Detalle = @detalle, PuntuacionFinal = @puntuacionFinal WHERE FormCompletadoId = @id');
  } catch (error) {
    throw error;
  }
};

// Eliminar un formulario completado
const deleteFormCompletado = async (id) => {
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM FormCompletado WHERE FormCompletadoId = @id');
  } catch (error) {
    throw error;
  }
};

module.exports = {
    getFormulariosCompletados,
    getFormCompletadoById,
    createFormCompletado,
    updateFormCompletado,
    deleteFormCompletado
};
  