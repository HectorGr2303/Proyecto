const { sql, poolPromise } = require('../config/db');

// Obtener todos los usuarios
const getUsuarios = async () => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Usuario');
    return result.recordset;
  } catch (error) {
    throw error;
  }
};

// Obtener un usuario por ID
const getUsuarioById = async (id) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM Usuario WHERE UsuarioId = @id');
    return result.recordset[0];
  } catch (error) {
    throw error;
  }
};

// Crear un nuevo usuario
const createUsuario = async (nombre, apellido, correo, contrasenna, rolId) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('nombre', sql.NVarChar, nombre)
      .input('apellido', sql.NVarChar, apellido)
      .input('correo', sql.NVarChar, correo)
      .input('contrasenna', sql.NVarChar, contrasenna)
      .input('rolId', sql.Int, rolId)
      .query('INSERT INTO Usuario (Nombre, Apellido, Correo, Contrasenna, RolId) VALUES (@nombre, @apellido, @correo, @contrasenna, @rolId); SELECT SCOPE_IDENTITY() AS UsuarioId');
    return result.recordset[0];
  } catch (error) {
    throw error;
  }
};

// Actualizar un usuario existente
const updateUsuario = async (id, nombre, apellido, correo, contrasenna, rolId) => {
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, id)
      .input('nombre', sql.NVarChar, nombre)
      .input('apellido', sql.NVarChar, apellido)
      .input('correo', sql.NVarChar, correo)
      .input('contrasenna', sql.NVarChar, contrasenna)
      .input('rolId', sql.Int, rolId)
      .query('UPDATE Usuario SET Nombre = @nombre, Apellido = @apellido, Correo = @correo, Contrasenna = @contrasenna, RolId = @rolId WHERE UsuarioId = @id');
  } catch (error) {
    throw error;
  }
};

// Eliminar un usuario
const deleteUsuario = async (id) => {
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM Usuario WHERE UsuarioId = @id');
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario
};
