import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import { Menu } from './components/Menu';
import { Personagens } from './pages/Personagens';
import { Localizacoes } from './pages/Localizacao';
import { Episodios } from './pages/Episodios';
import { NotFound } from './pages/NotFound';
import { Header } from './components/Header';


function App() {

  return (
    <BrowserRouter>
      <Menu />
      <Header />
        <Routes>
          <Route path="/" element={<Personagens />} />
          <Route path="/localizacoes" element={<Localizacoes />} />
          <Route path="/episodios" element={<Episodios />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

    </BrowserRouter>
  )
}

export default App
