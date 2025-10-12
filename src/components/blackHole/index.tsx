import React, { useEffect, useRef } from 'react';

/**
 * BlackHoleHero — versão sem Tailwind e mais fiel à imagem de referência.
 * Ajustes principais:
 * - Paleta mais verde-escura com dourado quente (#e7b84a) e fundo #0b100a.
 * - Anel com textura turbulenta (SVG) e penumbra espessa.
 * - Vignette forte e "nuvens" ao redor usando feTurbulence + mask.
 * - Núcleo negro absoluto e transições suaves.
 */
export default function BlackHoleHero({ title, subtitle }) {
  const ringRef = useRef(null);

  // Rotação lentíssima do ruído para simular fluxo da matéria
  useEffect(() => {
    let raf;
    const tick = () => {
      if (ringRef.current) {
        const t = (Date.now() / 60000) * 360; // 1 volta por minuto
        ringRef.current.style.transform = `translate(-50%, -50%) rotate(${t}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section style={styles.section}>
      {/* Vignette e leve tonalização esverdeada */}
      <div style={styles.vignette} />

      {/* Camada de nuvens/poeira com máscara em volta do anel */}
      <div style={styles.clouds}>
        <CloudsMask />
      </div>

      {/* Anel dourado texturizado */}
      <div ref={ringRef} style={styles.ringWrap}>
        <AccretionRing />
      </div>

      {/* Núcleo negro absoluto */}
      <div style={styles.core} />

      {/* Textos opcionais (desligados por padrão para ficar fiel à arte) */}
      {(title || subtitle) && (
        <div style={styles.textContainer}>
          {title && <h1 style={styles.title}>{title}</h1>}
          {subtitle && <p style={styles.subtitle}>{subtitle}</p>}
        </div>
      )}
    </section>
  );
}

// === CAMADAS/COMPONENTES ===

// Anel com gradiente radial + ruído para borda "felpuda"
function AccretionRing() {
  const size = 620; // maior para borda difusa
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ display: 'block' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Gradiente dourado inspirado na referência */}
        <radialGradient id="gold" cx="50%" cy="50%" r="50%">
          <stop offset="40%" stopColor="#000000" />
          <stop offset="56%" stopColor="#e7b84a" stopOpacity="0.75" />
          <stop offset="72%" stopColor="#d3a23e" stopOpacity="0.38" />
          <stop offset="86%" stopColor="#8b6a1e" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#00000000" />
        </radialGradient>

        {/* Ruído para borda orgânica */}
        <filter id="ringNoise" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" seed="7" />
          <feGaussianBlur stdDeviation="0.7" />
          <feColorMatrix type="saturate" values="0.25" />
          <feComponentTransfer>
            <feFuncA type="table" tableValues="0 0.7" />
          </feComponentTransfer>
          <feBlend mode="multiply" in2="SourceGraphic" />
        </filter>

        {/* Suaviza a transição usando máscara radial */}
        <radialGradient id="softMask" cx="50%" cy="50%" r="50%">
          <stop offset="45%" stopColor="#ffffff" />
          <stop offset="75%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>
        <mask id="maskSoft">
          <rect width="100%" height="100%" fill="url(#softMask)" />
        </mask>
      </defs>

      <g filter="url(#ringNoise)" mask="url(#maskSoft)">
        <rect width="100%" height="100%" fill="url(#gold)" />
      </g>
    </svg>
  );
}

// Nuvens externas com máscara circular para dar sensação de espiral difusa
function CloudsMask() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      <defs>
        <filter id="cloudsNoise">
          <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="4" seed="11" />
          <feGaussianBlur stdDeviation="0.6" />
        </filter>
        <radialGradient id="cloudsMask" cx="50%" cy="50%" r="60%">
          <stop offset="35%" stopColor="#000" stopOpacity="0" />
          <stop offset="60%" stopColor="#fff" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0.85" />
        </radialGradient>
        <mask id="mClouds">
          <rect x="0" y="0" width="100" height="100" fill="url(#cloudsMask)" />
        </mask>
      </defs>

      {/* camada esverdeada-escura com nuvens multiplicadas */}
      <rect x="0" y="0" width="100" height="100" fill="#0b100a" />
      <g mask="url(#mClouds)" filter="url(#cloudsNoise)">
        <rect x="0" y="0" width="100" height="100" fill="#1a2318" />
      </g>
    </svg>
  );
}

// === ESTILOS ===
const styles = {
  section: {
    position: 'relative',
    minHeight: '100vh',
    width: '100%',
    overflow: 'hidden',
    backgroundColor: '#0b100a', // base verde-escuro
  },
  vignette: {
    position: 'absolute',
    inset: 0,
    background:
      'radial-gradient(circle at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.35) 75%, rgba(0,0,0,0.75) 100%)',
    pointerEvents: 'none',
  },
  clouds: {
    position: 'absolute',
    inset: 0,
    opacity: 0.6,
    mixBlendMode: 'multiply',
  },
  ringWrap: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    filter: 'drop-shadow(0 0 60px rgba(231,184,74,0.15))',
  },
  core: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    width: 460,
    height: 460,
    transform: 'translate(-50%, -50%)',
    borderRadius: '50%',
    background: '#000', // núcleo negro absoluto
    boxShadow: '0 0 140px 40px rgba(0,0,0,0.9) inset',
  },
  textContainer: {
    position: 'absolute',
    bottom: '8vh',
    width: '100%',
    textAlign: 'center',
    color: '#e7b84a',
  },
  title: {
    margin: 0,
    fontSize: '2.6rem',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    textShadow: '0 0 12px rgba(231,184,74,0.35)',
  },
  subtitle: {
    marginTop: '0.5rem',
    fontSize: '1rem',
    color: 'rgba(231,184,74,0.8)',
  },
};
