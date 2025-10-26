import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './index.css';

export default function Menu() {
  const location = useLocation();

  const linkStyle = (path: string): React.CSSProperties => ({
    margin: '0 1rem',
    textDecoration: location.pathname === path ? 'underline' : 'none',
    color: '#e7b84a',
    fontWeight: 500,
    textAlign: 'center',
    position: 'relative',
    zIndex: 1,
  });

  return (
    <nav className="menu">
      <Link to="/" style={linkStyle('/')}>
        Home
      </Link>
      <Link to="/blackHole" style={linkStyle('/blackHole')}>
        BlackRole
      </Link>
      <Link to="/Components" style={linkStyle('/Components')}>
        Components
      </Link>
    </nav>
  );
}
