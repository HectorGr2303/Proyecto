const { sql, poolPromise } = require('../config/db');

// Obtener todas las preguntas
const getPreguntas = async () => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Pregunta');
    return result.recordset;
  } catch (error) {
    throw error;
  }
};

// Obtener una pregunta por ID
const getPreguntaById = async (id) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM Pregunta WHERE PreguntaId = @id');
    return result.recordset[0];
  } catch (error) {
    throw error;
  }
};

// Crear una nueva pregunta
const createPregunta = async (pregunta, seccionId) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('pregunta', sql.NVarChar, pregunta)
      .input('seccionId', sql.Int, seccionId)
      .query('INSERT INTO Pregunta (Pregunta, SeccionId) VALUES (@pregunta, @seccionId); SELECT SCOPE_IDENTITY() AS PreguntaId');
    return result.recordset[0];
  } catch (error) {
    throw error;
  }
};

// Actualizar una pregunta existente
const updatePregunta = async (id, pregunta, seccionId) => {
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, id)
      .input('pregunta', sql.NVarChar, pregunta)
      .input('seccionId', sql.Int, seccionId)
      .query('UPDATE Pregunta SET Pregunta = @pregunta, SeccionId = @seccionId WHERE PreguntaId = @id');
  } catch (error) {
    throw error;
  }
};

// Eliminar una pregunta
const deletePregunta = async (id) => {
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM Pregunta WHERE PreguntaId = @id');
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getPreguntas,
  getPreguntaById,
  createPregunta,
  updatePregunta,
  deletePregunta
};
