import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Form } from 'react-bootstrap';

function Candidatos() {
  const [candidatos, setCandidatos] = useState([]);
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    axios.get('http://localhost:4000/candidatos')
      .then(response => setCandidatos(response.data))
      .catch(error => console.error(error));
  }, []);

  const candidatosFiltrados = candidatos.filter(c => c.cand_nome.toLowerCase().includes(filtro.toLowerCase()));

  return (
    <div>
      <h1>Candidatos</h1>
      <Form.Control
        type="text"
        placeholder="Buscar por nome"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>CPF</th>
            <th>Nome</th>
            <th>Endereço</th>
            <th>Telefone</th>
          </tr>
        </thead>
        <tbody>
          {candidatosFiltrados.map(candidato => (
            <tr key={candidato.pk_cand_cpf}>
              <td>{candidato.pk_cand_cpf}</td>
              <td>{candidato.cand_nome}</td>
              <td>{candidato.cand_endereco}</td>
              <td>{candidato.cand_telefone}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Candidatos;
