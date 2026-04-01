import React from 'react';
import './styles.css';
import Menu from '@components/Menu';
import MagicBento from '@components/CardBox';
import { FeatureCard, MetricCard, ProfileCard, StatusCard } from '@components/Card';

export default function Componentes() {
  return (
    <div className="container">
      <Menu />
      <div className="section">
        <h1>Página de Components</h1>
        <p>Aqui temos alguns testes de componentes</p>
        <div>
          <FeatureCard title="test" description="Descrição do teste" />
        </div>
      </div>
      <div className="section" style={{ background: 'black' }}>
        <h1>Página de Components 2</h1>
        <p>Aqui temos alguns testes de componentes</p>
      </div>
    </div>
  );
}
