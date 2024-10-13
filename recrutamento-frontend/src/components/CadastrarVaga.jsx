import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Modal, Alert } from 'react-bootstrap';

function CadastrarVaga({ show, handleClose }) {
  const [vagaCargo, setVagaCargo] = useState('');
  const [vagaSalario, setVagaSalario] = useState('');
  const [vagaCidade, setVagaCidade] = useState('');
  const [vagaQuantidade, setVagaQuantidade] = useState('');
  const [message, setMessage] = useState('');

  const handleCadastro = () => {
    if (!vagaCargo || !vagaSalario || !vagaCidade || !vagaQuantidade) {
      setMessage('Por favor, preencha todos os campos.');
      return;
    }

    axios.post('http://localhost:4000/vagas', {
      vaga_cargo: vagaCargo,
      vaga_salario: vagaSalario,
      vaga_cidade: vagaCidade,
      vaga_quantidade: vagaQuantidade,
    })
    .then(response => {
      setMessage('Vaga cadastrada com sucesso!');
      setVagaCargo('');
      setVagaSalario('');
      setVagaCidade('');
      setVagaQuantidade('');
    })
    .catch(error => {
      console.error(error);
      setMessage('Erro ao cadastrar vaga.');
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Cadastro de Vaga</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message && <Alert variant="info">{message}</Alert>}
        <Form>
          <Form.Group controlId="formVagaCargo">
            <Form.Label>Cargo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o cargo"
              value={vagaCargo}
              onChange={(e) => setVagaCargo(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formVagaSalario">
            <Form.Label>Salário</Form.Label>
            <Form.Control
              type="number"
              placeholder="Digite o salário"
              value={vagaSalario}
              onChange={(e) => setVagaSalario(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formVagaCidade">
            <Form.Label>Cidade</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite a cidade"
              value={vagaCidade}
              onChange={(e) => setVagaCidade(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formVagaQuantidade">
            <Form.Label>Quantidade de Vagas</Form.Label>
            <Form.Control
              type="number"
              placeholder="Digite a quantidade de vagas"
              value={vagaQuantidade}
              onChange={(e) => setVagaQuantidade(e.target.value)}
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

export default CadastrarVaga;
