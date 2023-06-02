# Prueba-IACC
desarrollo backend en nodejs
# scripts tablas mysql

CREATE TABLE estudiantes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  edad INT NOT NULL,
  carrera VARCHAR(100) NOT NULL
);

paquetes dependencias utilizados en el proyecto

npm install express mysql2
npm install cors
pm install body-parser
