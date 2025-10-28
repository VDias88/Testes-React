import React from 'react';
import './Home.css';
import Menu from '@components/Menu';
import Aurora from '@components/Aurora';

export default function Home() {
  return (
    <>
      <Aurora colorStops={['#3A29FF', '#FF94B4', '#FF3232']} blend={1} amplitude={1} speed={1} />

      <div className="ui-overlay">
        <header className="topbar">
          <Menu />
        </header>

        <main className="hero-center">
          <h1>Sala</h1>
          <p>Bem-vindo ao laboratorio!</p>
        </main>
      </div>
    </>
  );
}
