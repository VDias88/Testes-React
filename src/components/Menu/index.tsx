import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Menu() {
  const location = useLocation();

  const linkStyle = (path: string) => ({
    marginRight: '2rem',
    textDecoration: location.pathname === path ? 'underline' : 'none',
    color: '#e7b84a',
    fontWeight: 500,
  });

  return (
    <nav
      style={{
        padding: '2rem',
        backgroundColor: '#0b100a',
        position: 'fixed',
        width: '100%',
        top: 0,
        zIndex: 10,
      }}>
      <Link to="/" style={linkStyle('/')}>
        Home
      </Link>
      <Link to="/blackHole" style={linkStyle('/blackHole')}>
        BlackRole
      </Link>
      <Link to="/teste" style={linkStyle('/teste')}>
        Teste
      </Link>
    </nav>
  );
}
