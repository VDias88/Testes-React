import './App.css';
import Menu from '@components/Menu';
import { Route, Routes } from 'react-router';
import Home from './routes/Home';
import { BlackHole } from './routes/BlackHole';
import Teste from './routes/Teste';

export default function App() {
  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blackHole" element={<BlackHole />} />
        <Route path="/test" element={<Teste />} />
      </Routes>
    </>
  );
}
