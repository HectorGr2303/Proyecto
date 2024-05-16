const { sql, poolPromise } = require('../config/db');

// Obtener todas las secciones
const getSecciones = async () => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Seccion');
    return result.recordset;
  } catch (error) {
    throw error;
  }
};

// Obtener una sección por ID
const getSeccionById = async (id) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM Seccion WHERE SeccionId = @id');
    return result.recordset[0];
  } catch (error) {
    throw error;
  }
};

// Crear una nueva sección
const createSeccion = async (descripcion, estado, formularioId) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('descripcion', sql.NVarChar, descripcion)
      .input('estado', sql.NVarChar, estado)
      .input('formularioId', sql.Int, formularioId)
      .query('INSERT INTO Seccion (Descripcion, Estado, FormularioId) VALUES (@descripcion, @estado, @formularioId); SELECT SCOPE_IDENTITY() AS SeccionId');
    return result.recordset[0];
  } catch (error) {
    throw error;
  }
};

// Actualizar una sección existente
const updateSeccion = async (id, descripcion, estado, formularioId) => {
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, id)
      .input('descripcion', sql.NVarChar, descripcion)
      .input('estado', sql.NVarChar, estado)
      .input('formularioId', sql.Int, formularioId)
      .query('UPDATE Seccion SET Descripcion = @descripcion, Estado = @estado, FormularioId = @formularioId WHERE SeccionId = @id');
  } catch (error) {
    throw error;
  }
};

// Eliminar una sección
const deleteSeccion = async (id) => {
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM Seccion WHERE SeccionId = @id');
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getSecciones,
  getSeccionById,
  createSeccion,
  updateSeccion,
  deleteSeccion
};
