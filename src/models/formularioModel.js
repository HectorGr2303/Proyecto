const { sql, poolPromise } = require('../config/db');

// Obtener todos los formularios
const getFormularios = async () => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Formulario');
    return result.recordset;
  } catch (error) {
    throw error;
  }
};

// Obtener un formulario por ID
const getFormularioById = async (id) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.NVarChar, id)
      .query('SELECT * FROM Formulario WHERE FormularioId = @id');
    return result.recordset[0];
  } catch (error) {
    throw error;
  }
};

// Crear un nuevo formulario
const createFormulario = async (nroFormulario) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('nroFormulario', sql.NVarChar, nroFormulario)
      .query('INSERT INTO Formulario (NroFormulario) VALUES (@nroFormulario); SELECT SCOPE_IDENTITY() AS FormularioId');
    return result.recordset[0];
  } catch (error) {
    throw error;
  }
};

// Actualizar un formulario existente
const updateFormulario = async (id, nroFormulario) => {
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, id)
      .input('nroFormulario', sql.NVarChar, nroFormulario)
      .query('UPDATE Formulario SET NroFormulario = @nroFormulario WHERE FormularioId = @id');
  } catch (error) {
    throw error;
  }
};

// Eliminar un formulario
const deleteFormulario = async (id) => {
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM Formulario WHERE FormularioId = @id');
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getFormularios,
  getFormularioById,
  createFormulario,
  updateFormulario,
  deleteFormulario
};
