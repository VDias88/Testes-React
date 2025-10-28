import React from 'react';
import './styles.css';
import Menu from '@components/Menu';

export default function Componentes() {
  return (
    <div className="container">
      <Menu />
      <div className="section">
        <h1>Página de Components</h1>
        <p>Aqui temos alguns testes de componentes</p>
      </div>
      <div className="section" style={{ background: 'black' }}>
        <h1>Página de Components 2</h1>
        <p>Aqui temos alguns testes de componentes</p>
      </div>
    </div>
  );
}
