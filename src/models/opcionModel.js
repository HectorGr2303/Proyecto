const { sql, poolPromise } = require('../config/db');

// Obtener todas las opciones
const getOpciones = async () => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Opcion');
    return result.recordset;
  } catch (error) {
    throw error;
  }
};

// Obtener una opción por ID
const getOpcionById = async (id) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM Opcion WHERE OpcionId = @id');
    return result.recordset[0];
  } catch (error) {
    throw error;
  }
};

// Crear una nueva opción
const createOpcion = async (respuesta, valor, preguntaId) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('respuesta', sql.NVarChar, respuesta)
      .input('valor', sql.Int, valor)
      .input('preguntaId', sql.Int, preguntaId)
      .query('INSERT INTO Opcion (Respuesta, Valor, PreguntaId) VALUES (@respuesta, @valor, @preguntaId); SELECT SCOPE_IDENTITY() AS OpcionId');
    return result.recordset[0];
  } catch (error) {
    throw error;
  }
};

// Actualizar una opción existente
const updateOpcion = async (id, respuesta, valor, preguntaId) => {
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, id)
      .input('respuesta', sql.NVarChar, respuesta)
      .input('valor', sql.Int, valor)
      .input('preguntaId', sql.Int, preguntaId)
      .query('UPDATE Opcion SET Respuesta = @respuesta, Valor = @valor, PreguntaId = @preguntaId WHERE OpcionId = @id');
  } catch (error) {
    throw error;
  }
};

// Eliminar una opción
const deleteOpcion = async (id) => {
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM Opcion WHERE OpcionId = @id');
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getOpciones,
  getOpcionById,
  createOpcion,
  updateOpcion,
  deleteOpcion
};
