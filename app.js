const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logRoutes = require('./routes/logRoutes.js');

const app = express();
app.use(bodyParser.json());

const MONGODB_URI = 'mongodb://localhost:27017/Error_log';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Conexión a MongoDB establecida'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

app.use('/logs', logRoutes);


app.listen(3000);
