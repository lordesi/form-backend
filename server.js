const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');  // <-- qui

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

app.post('/invia-form', async (req, res) => {
  const { name, activityName, email, phone, budget, timeline, projectDescription } = req.body;
  try {
    await pool.query(
      `INSERT INTO richieste (name, activity_name, email, phone, budget, timeline, project_description)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [name, activityName, email, phone, budget, timeline, projectDescription]
    );
    res.status(200).send("Richiesta salvata con successo!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Errore durante il salvataggio");
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server avviato sulla porta ${port}`));