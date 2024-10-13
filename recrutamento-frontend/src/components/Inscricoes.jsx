import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Table, Alert } from 'react-bootstrap';

function Inscricoes() {
  const [candidatos, setCandidatos] = useState([]);
  const [vagas, setVagas] = useState([]);
  const [inscricoes, setInscricoes] = useState([]);
  const [selectedCandidato, setSelectedCandidato] = useState('');
  const [selectedVaga, setSelectedVaga] = useState('');
  const [message, setMessage] = useState('');

  // Buscar candidatos
  useEffect(() => {
    axios.get('http://localhost:4000/candidatos')
      .then(response => setCandidatos(response.data))
      .catch(error => console.error(error));
  }, []);

  // Buscar vagas
  useEffect(() => {
    axios.get('http://localhost:4000/vagas')
      .then(response => setVagas(response.data))
      .catch(error => console.error(error));
  }, []);

  // Buscar inscrições com detalhes
  useEffect(() => {
    axios.get('http://localhost:4000/inscricoes')
      .then(response => setInscricoes(response.data))
      .catch(error => console.error(error));
  }, []);

  // Função para inscrever candidato
  const handleInscricao = () => {
    // Verifica se o candidato já está inscrito na vaga selecionada
    const jaInscrito = inscricoes.some(
      inscricao => inscricao.pk_cand_cpf === selectedCandidato && inscricao.pk_vaga_codigo === parseInt(selectedVaga)
    );

    if (jaInscrito) {
      setMessage('O candidato já está inscrito nessa vaga!');
      return;
    }

    // Fazer a inscrição do candidato
    axios.post('http://localhost:4000/inscricoes', {
      pk_cand_cpf: selectedCandidato,
      pk_vaga_codigo: parseInt(selectedVaga),
      data_inscricao: new Date().toISOString().split('T')[0],
      horario_inscricao: new Date().toTimeString().split(' ')[0],
    })
    .then(response => {
      setMessage('Inscrição realizada com sucesso!');
      // Atualizar a lista de inscrições
      setInscricoes([...inscricoes, { pk_cand_cpf: selectedCandidato, pk_vaga_codigo: parseInt(selectedVaga) }]);
    })
    .catch(error => {
      console.error(error);
      setMessage('Erro ao realizar inscrição');
    });
  };

  return (
    <div>
      <h1>Inscrições</h1>
      {message && <Alert variant="info">{message}</Alert>}

      {/* Seletor de Candidato */}
      <Form.Group controlId="formCandidato">
        <Form.Label>Selecione um Candidato</Form.Label>
        <Form.Control as="select" value={selectedCandidato} onChange={(e) => setSelectedCandidato(e.target.value)}>
          <option value="">Selecione um candidato...</option>
          {candidatos.map(candidato => (
            <option key={candidato.pk_cand_cpf} value={candidato.pk_cand_cpf}>
              {candidato.cand_nome} (CPF: {candidato.pk_cand_cpf})
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      {/* Seletor de Vaga */}
      <Form.Group controlId="formVaga">
        <Form.Label>Selecione uma Vaga</Form.Label>
        <Form.Control as="select" value={selectedVaga} onChange={(e) => setSelectedVaga(e.target.value)}>
          <option value="">Selecione uma vaga...</option>
          {vagas.map(vaga => (
            <option key={vaga.pk_vaga_codigo} value={vaga.pk_vaga_codigo}>
              {vaga.vaga_cargo} - {vaga.vaga_cidade} (Salário: {vaga.vaga_salario})
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      {/* Botão de Inscrição */}
      <Button variant="primary" onClick={handleInscricao} disabled={!selectedCandidato || !selectedVaga}>
        Inscrever Candidato na Vaga
      </Button>

      {/* Tabela de Inscrições */}
      <h2 className="mt-4">Inscrições Realizadas</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>CPF Candidato</th>
            <th>Nome Candidato</th>
            <th>Vaga</th>
            <th>Cidade</th>
            <th>Data de Inscrição</th>
            <th>Horário de Inscrição</th>
          </tr>
        </thead>
        <tbody>
          {inscricoes.map(inscricao => (
            <tr key={`${inscricao.pk_cand_cpf}-${inscricao.vaga_cargo}`}>
              <td>{inscricao.pk_cand_cpf}</td>
              <td>{inscricao.cand_nome}</td>
              <td>{inscricao.vaga_cargo}</td>
              <td>{inscricao.vaga_cidade}</td>
              <td>{inscricao.data_inscricao}</td>
              <td>{inscricao.horario_inscricao}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Inscricoes;
