import React from 'react';
import './Home.css';
import Menu from '@components/Menu';
export default function Home() {
  return (
    <div className="container">
      <Menu />
      <div className="main-container">
        <h1>Sala</h1>
        <p>Bem-vindo ao laboratorio!</p>
      </div>
    </div>
  );
}
