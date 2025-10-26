import './App.css';
import Menu from '@components/Menu';
import { Route, Routes } from 'react-router';
import Home from './routes/Home';
import { BlackHole } from './routes/BlackHole';
import Componentes from './routes/Componentes';
import '@fontsource/roboto';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/400-italic.css';

//TODO: remover css styles e adiconar stylesheets
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blackHole" element={<BlackHole />} />
        <Route path="/Components" element={<Componentes />} />
      </Routes>
    </>
  );
}
