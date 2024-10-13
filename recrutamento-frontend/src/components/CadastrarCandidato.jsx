import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Modal, Alert } from 'react-bootstrap';

function CadastrarCandidato({ show, handleClose }) {
  const [cpf, setCpf] = useState('');
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [message, setMessage] = useState('');

  const handleCadastro = () => {
    if (!cpf || !nome || !endereco || !telefone) {
      setMessage('Por favor, preencha todos os campos.');
      return;
    }

    axios.post('http://localhost:4000/candidatos', {
      pk_cand_cpf: cpf,
      cand_nome: nome,
      cand_endereco: endereco,
      cand_telefone: telefone,
    })
    .then(response => {
      setMessage('Candidato cadastrado com sucesso!');
      setCpf('');
      setNome('');
      setEndereco('');
      setTelefone('');
    })
    .catch(error => {
      console.error(error);
      setMessage('Erro ao cadastrar candidato.');
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Cadastro de Candidato</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message && <Alert variant="info">{message}</Alert>}
        <Form>
          <Form.Group controlId="formCpf">
            <Form.Label>CPF</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formNome">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formEndereco">
            <Form.Label>Endereço</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o Endereço"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formTelefone">
            <Form.Label>Telefone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o Telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fechar
        </Button>
        <Button variant="primary" onClick={handleCadastro}>
          Cadastrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CadastrarCandidato;
