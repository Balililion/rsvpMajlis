const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

// Set up body-parser untuk parsing form data
app.use(bodyParser.urlencoded({ extended: true }));

// Setup database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Guna username database
  password: '',  // Guna password database
  database: 'jemputan_db'  // Nama database
});

db.connect(function(err) {
  if (err) throw err;
  console.log("Connected to database!");
});

// Endpoint untuk menerima data form
app.post('/submit', (req, res) => {
  const { name, attendance, message } = req.body;
  const query = "INSERT INTO responses (nama, kehadiran, bilangan, ucapan) VALUES (?, ?, ?, )";
  
  db.query(query, [nama, kehadiran, bilangan, ucapan], (err, result) => {
    if (err) throw err;
    res.send("Terima Kasih Atas Ucapan Dan Respond Anda!");
  });
});

// Endpoint untuk get responses (display on the frontend)
app.get('/responses', (req, res) => {
  db.query("SELECT * FROM responses", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Mulakan server pada port 3000
app.listen(3000, () => {
  console.log('Server berjalan pada http://localhost:3000');
});
