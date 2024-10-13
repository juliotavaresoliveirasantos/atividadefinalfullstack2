import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Candidatos from './components/Candidatos';
import Vagas from './components/Vagas';
import Inscricoes from './components/Inscricoes';
import CadastrarCandidato from './components/CadastrarCandidato';
import CadastrarVaga from './components/CadastrarVaga';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './App.css'; // Importando o arquivo CSS para estilos personalizados

function App() {
  // Estados para controlar a exibição dos modais
  const [showCadastroCandidato, setShowCadastroCandidato] = useState(false);
  const [showCadastroVaga, setShowCadastroVaga] = useState(false);

  // Funções para abrir e fechar os modais de cadastro de candidatos e vagas
  const handleShowCandidato = () => setShowCadastroCandidato(true);
  const handleCloseCandidato = () => setShowCadastroCandidato(false);
  const handleShowVaga = () => setShowCadastroVaga(true);
  const handleCloseVaga = () => setShowCadastroVaga(false);

  return (
    <Container className="app-container">
      <h1 className="mt-4 mb-4 text-center">Sistema de Recrutamento Online</h1>

      {/* Botões para abrir os modais de cadastro */}
      <div className="text-center mb-4">
        <Button variant="primary" className="me-2" onClick={handleShowCandidato}>
          Cadastrar Candidato
        </Button>
        <Button variant="success" onClick={handleShowVaga}>
          Cadastrar Vaga
        </Button>
      </div>

      {/* Layout com componentes já existentes */}
      <Row>
        <Col md={4}>
          <Candidatos />
        </Col>
        <Col md={4}>
          <Vagas />
        </Col>
        <Col md={4}>
          <Inscricoes />
        </Col>
      </Row>

      {/* Modais de Cadastro */}
      <CadastrarCandidato show={showCadastroCandidato} handleClose={handleCloseCandidato} />
      <CadastrarVaga show={showCadastroVaga} handleClose={handleCloseVaga} />
    </Container>
  );
}

export default App;
