import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

function Vagas() {
  const [vagas, setVagas] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/vagas')
      .then(response => setVagas(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Vagas Disponíveis</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Código</th>
            <th>Cargo</th>
            <th>Salário</th>
            <th>Cidade</th>
            <th>Quantidade</th>
          </tr>
        </thead>
        <tbody>
          {vagas.map(vaga => (
            <tr key={vaga.pk_vaga_codigo}>
              <td>{vaga.pk_vaga_codigo}</td>
              <td>{vaga.vaga_cargo}</td>
              <td>{vaga.vaga_salario}</td>
              <td>{vaga.vaga_cidade}</td>
              <td>{vaga.vaga_quantidade}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Vagas;
