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
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <FeatureCard title="test" description="Descrição do teste" />
          <MetricCard label="Teste" value={100} />
          <ProfileCard initials="JD" name="John Doe" role="Developer" />
          <StatusCard title="Status" subtitle="Online" status="active" />
        </div>
      </div>
      <div className="section" style={{ background: 'black' }}>
        <h1>Página de Components 2</h1>
        <p>Aqui temos alguns testes de componentes</p>
      </div>
    </div>
  );
}
