const usuarioModel = require('../models/usuarioModel');

// Obtener todos los usuarios
const getUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioModel.getUsuarios();
    res.json(usuarios);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Obtener un usuario por ID
const getUsuarioById = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await usuarioModel.getUsuarioById(id);
    if (!usuario) {
      return res.status(404).send('Usuario no encontrado');
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Crear un nuevo usuario
const createUsuario = async (req, res) => {
  try {
    const { nombre, apellido, correo, contrasenna, rolId } = req.body;
    const newUsuario = await usuarioModel.createUsuario(nombre, apellido, correo, contrasenna, rolId);
    res.status(201).json(newUsuario);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Actualizar un usuario existente
const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, correo, contrasenna, rolId } = req.body;
    await usuarioModel.updateUsuario(id, nombre, apellido, correo, contrasenna, rolId);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Eliminar un usuario
const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    await usuarioModel.deleteUsuario(id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario
};
