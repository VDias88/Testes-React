import React from 'react';
import './Home.css';
import Menu from '@components/Menu';
import Aurora from '@components/Aurora';
import ShinyText from '@components/ShinyText';

export default function Home() {
  return (
    <>
      <Aurora colorStops={['#3A29FF', '#FF94B4', '#FF3232']} blend={1} amplitude={1} speed={1} />

      <div className="ui-overlay">
        <header className="topbar">
          <Menu />
        </header>

        <main className="hero-center">
          <ShinyText
            text="Bem-vindo ao laboratorio!"
            speed={2}
            delay={0}
            fontSize="2.5rem"
            color="black"
            shineColor="red"
            spread={120}
            direction="left"
            yoyo={false}
            pauseOnHover={false}
            disabled={false}
          />
        </main>
      </div>
    </>
  );
}
