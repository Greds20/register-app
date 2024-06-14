const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const { Pool } = require('pg');
const { isNumericLiteral } = require('typescript');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'DATA_BASE',
  password: 'aPstRef3@',
  port: 5432,
});

pool.connect((err) => {
  if (err) {
    console.error('Error connecting to PostgreSQL:', err);
  } else {
    console.log('Connected to PostgreSQL');
  }
});

app.get('/devs', (req, res) => {
  pool.query('SELECT * FROM desarrollador', (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(result.rows);
    }
  });
});

app.use(express.json());
app.post('/devs', (req, res) => {
  const { nickname, nombres, apellidos } = req.body;
  pool.query(
    'INSERT INTO desarrollador (nickname, nombres, apellidos) VALUES ($1, $2, $3) RETURNING *',
    [nickname, nombres, apellidos],
    (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(result.rows[0]);
      }
    }
  );
});

app.put('/devs/:id', (req, res) => {
  const id = req.params.id;
  const { nombres, apellidos } = req.body;
  pool.query(
    'UPDATE desarrollador SET nombres = $1, apellidos = $2 WHERE id_desarrollador = $3 RETURNING *',
    [nombres, apellidos, id],
    (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (result.rows.length === 0) {
        res.status(404).json({ error: 'Item not found' });
      } else {
        res.json(result.rows[0]);
      }
    }
  );
});


app.delete('/devs/:id', (req, res) => {
  const id  = req.params.id;
  pool.query(
    'DELETE FROM desarrollador WHERE id_desarrollador = $1 RETURNING *',
    [id],
    (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (result.rows.length === 0) {
        res.status(404).json({ error: 'Item not found' });
      } else {
        res.json(result.rows[0]);
      }
    }
  );
});


app.get('/devs/:id', (req, res) => {
  const id  = req.params.id;

  pool.query("SELECT * FROM desarrollador WHERE id_desarrollador = $1", 
    [id],
    (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(result.rows);
    }
  });
});