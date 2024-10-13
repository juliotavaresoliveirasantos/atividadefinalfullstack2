const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const PORT = 4000;


app.use(cors());
app.use(express.json());

// Conexão com o banco de dados
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'recrutamento',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Conectado ao banco de dados');
});

// Endpoint para listar candidatos
app.get('/candidatos', (req, res) => {
  const sql = 'SELECT * FROM candidatos';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Endpoint para adicionar um candidato
app.post('/candidatos', (req, res) => {
  const { pk_cand_cpf, cand_nome, cand_endereco, cand_telefone } = req.body;
  const sql = 'INSERT INTO candidatos (pk_cand_cpf, cand_nome, cand_endereco, cand_telefone) VALUES (?, ?, ?, ?)';
  db.query(sql, [pk_cand_cpf, cand_nome, cand_endereco, cand_telefone], (err, result) => {
    if (err) throw err;
    res.send('Candidato cadastrado com sucesso');
  });
});

// Endpoint para listar vagas
app.get('/vagas', (req, res) => {
  const sql = 'SELECT * FROM vagas';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Endpoint para adicionar uma nova vaga
app.post('/vagas', (req, res) => {
  const { vaga_cargo, vaga_salario, vaga_cidade, vaga_quantidade } = req.body;
  const sql = 'INSERT INTO vagas (vaga_cargo, vaga_salario, vaga_cidade, vaga_quantidade) VALUES (?, ?, ?, ?)';
  db.query(sql, [vaga_cargo, vaga_salario, vaga_cidade, vaga_quantidade], (err, result) => {
    if (err) throw err;
    res.send('Vaga cadastrada com sucesso');
  });
});

// Endpoint para listar inscrições com detalhes de candidatos e vagas
app.get('/inscricoes', (req, res) => {
  const sql = `
    SELECT 
      inscritos.pk_cand_cpf,
      candidatos.cand_nome,
      vagas.vaga_cargo,
      vagas.vaga_cidade,
      inscritos.data_inscricao,
      inscritos.horario_inscricao
    FROM inscricoes AS inscritos
    INNER JOIN candidatos ON inscritos.pk_cand_cpf = candidatos.pk_cand_cpf
    INNER JOIN vagas ON inscritos.pk_vaga_codigo = vagas.pk_vaga_codigo;
  `;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Endpoint para realizar inscrição
app.post('/inscricoes', (req, res) => {
  const { pk_cand_cpf, pk_vaga_codigo, data_inscricao, horario_inscricao } = req.body;
  const sql = 'INSERT INTO inscricoes (pk_cand_cpf, pk_vaga_codigo, data_inscricao, horario_inscricao) VALUES (?, ?, ?, ?)';
  db.query(sql, [pk_cand_cpf, pk_vaga_codigo, data_inscricao, horario_inscricao], (err, result) => {
    if (err) throw err;
    res.send('Inscrição realizada com sucesso');
  });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
