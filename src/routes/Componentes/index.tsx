import React from 'react';
import './styles.css';
import Menu from '@components/Menu';
import MagicBento from '@components/CardBox';

export default function Componentes() {
  return (
    <div className="container">
      <Menu />
      <div className="section">
        <h1>Página de Components</h1>
        <p>Aqui temos alguns testes de componentes</p>
        <MagicBento
          textAutoHide={true}
          enableStars={false}
          enableSpotlight={false}
          enableBorderGlow={true}
          enableTilt={false}
          enableMagnetism={false}
          clickEffect={false}
          spotlightRadius={400}
          particleCount={12}
          glowColor="132, 0, 255"
          disableAnimations
        />
      </div>
      <div className="section" style={{ background: 'black' }}>
        <h1>Página de Components 2</h1>
        <p>Aqui temos alguns testes de componentes</p>
      </div>
    </div>
  );
}
