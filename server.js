const express = require("express");
const { Pool } = require("pg");
const app = express();
const path = require("path");
require("dotenv").config();
const port = 3000;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/gerarCodnome", async (req, res) => {
  const { nome, ramal, codnomeEscolhido } = req.body; // Recebe o codnome do cliente

  try {
    // Verifica se o usuário já tem um codnome escolhido
    const userExists = await pool.query(
      "SELECT * FROM users WHERE nome = $1 AND ramal = $2",
      [nome, ramal]
    );

    if (userExists.rows.length > 0) {
      // Se o usuário já existe, retorna o codnome associado a ele
      res.json({ success: true, codnome: userExists.rows[0].codnome });
    } else {
      // Caso contrário, insere o codnome escolhido no banco de dados
      const result = await pool.query(
        "INSERT INTO users (nome, ramal, codnome) VALUES ($1, $2, $3) RETURNING *",
        [nome, ramal, codnomeEscolhido]
      );

      res.json({ success: true, codnome: codnomeEscolhido });
    }
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

app.get("/listarUsuarios", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (error) {
    res.json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

function geraCodnome() {
  const alfabeto = [
    "🥕 cenoura",
    "🥑 abacate",
    "🥬 repolho",
    "🍅 tomate",
    "🥒 pepino",
    "🫛 ervilha",
    "🍍 abacaxi",
    "🍉 melancia",
    "🍇 uva",
    "🥝kiwi",
    "🥭 manga",
    "🍌 banana",
    "🍋 limão",
    "🥥 coco",
    "🍐 pera",
    "🍒 cereja",
    "🍓 morango",
    "🫐 mirtilo",
    "🍑 pessego",
    "🫒 azeitona",
    "🍆 berinjela",
    "🌽 milho",
    "🥔 batata",
  ];

  const caractereIndex = Math.floor(Math.random() * alfabeto.length);
  return alfabeto[caractereIndex];
}
