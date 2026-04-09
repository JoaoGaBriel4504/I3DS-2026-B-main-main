import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import NaoEncontrado from "./pages/NaoEncontrado";
import Header from "./components/header/Header";
import Rodape from "./components/Rodape/Rodape";


const App = () => {
  return (
    <>
      <Header />
      <Routes>
        {/* Identifica todas as rotas do sistema*/}
        <Route path="/Contato" element={<Contato />} />
        <Route path="/NaoEncontrado" element={<NaoEncontrado />} />
        <Route path="/" element={<Home />} />
        <Route path="/Sobre" element={<Sobre />} /> {/* uma rota do sistema*/}
        <Route path="*" element={""} />
      </Routes>

    <Rodape link={"https://github.com/Pabl0Hernandez"}>Pabl0Hernandez</Rodape>
    </>
  );
};

export default App;