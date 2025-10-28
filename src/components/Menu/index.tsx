import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './index.css';
import GlassMenu from '@components/GlassMenu';

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
    <GlassMenu
      width="80%"
      height="3.5rem"
      mixBlendMode="screen"
      style={{
        position: 'fixed',
        zIndex: 10,
        top: '2rem',
        display: 'flex',
        flexDirection: 'row',
        padding: '0 1rem',
      }}>
      <Link to="/" style={linkStyle('/')}>
        Home
      </Link>
      <Link to="/blackHole" style={linkStyle('/blackHole')}>
        BlackRole
      </Link>
      <Link to="/Components" style={linkStyle('/Components')}>
        Components
      </Link>
    </GlassMenu>
  );
}
