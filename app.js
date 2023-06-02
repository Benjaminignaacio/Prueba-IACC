const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

// Crear una conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456xD',
  database: 'iacc'
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos MySQL');
});


const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Obtener todos los estudiantes
app.get('/estudiantes', (req, res) => {
  connection.query('SELECT * FROM estudiantes', (err, results) => {
    if (err) {
      console.error('Error al obtener los estudiantes:', err);
      res.sendStatus(500);
      return;
    }
    res.json(results);
  });
});

// Obtener un estudiante por ID
app.get('/estudiantes/:id', (req, res) => {
  const id = req.params.id;
  connection.query('SELECT * FROM estudiantes WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error al obtener el estudiante:', err);
      res.sendStatus(500);
      return;
    }
    if (results.length === 0) {
      res.sendStatus(404);
      return;
    }
    res.json(results[0]);
  });
});

// Crear un nuevo estudiante
app.post('/api/estudiantes', function(req, res) {
  const estudiante = {
    nombre: req.body.nombre,
    edad: req.body.edad,
    carrera: req.body.carrera
  };

  

  connection.query('INSERT INTO estudiantes SET ?', estudiante, function(error, results) {
    if (error) {
      console.error('Error al insertar el estudiante:', error);
      res.sendStatus(500);
    } else {
      console.log('Estudiante insertado exitosamente');
      res.sendStatus(200);
    }
  });
});


// Actualizar un estudiante
app.put('/estudiantes/:id', (req, res) => {
  const id = req.params.id;
  const estudiante = req.body;
  connection.query('UPDATE estudiantes SET ? WHERE id = ?', [estudiante, id], (err, result) => {
    if (err) {
      console.error('Error al actualizar el estudiante:', err);
      res.sendStatus(500);
      return;
    }
    if (result.affectedRows === 0) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(200);
  });
});

// Eliminar un estudiante
app.delete('/estudiantes/:id', (req, res) => {
  const id = req.params.id;
  connection.query('DELETE FROM estudiantes WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar el estudiante:', err);
      res.sendStatus(500);
      return;
    }
    if (result.affectedRows === 0) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(204);
  });
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});