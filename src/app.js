const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());


const rolRoutes = require('./routes/rolRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const formularioRoutes = require('./routes/formularioRoutes');
const seccionRoutes = require('./routes/seccionRoutes');
const preguntaRoutes = require('./routes/preguntaRoutes');
const opcionRoutes = require('./routes/opcionRoutes');
const formCompletadoRoutes = require('./routes/formCompletadoRoutes');
app.use('/api/roles', rolRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/formularios', formularioRoutes);
app.use('/api/secciones', seccionRoutes);
app.use('/api/preguntas', preguntaRoutes);
app.use('/api/opciones', opcionRoutes);
app.use('/api/formulariosCompletados', formCompletadoRoutes);

module.exports = app;
