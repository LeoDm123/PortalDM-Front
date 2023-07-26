import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Paginas Generales
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Main from "./pages/Main";
//Paginas de Presupuestos
import PresupuestoPM from "./pages/Presupuestos/PresupuestoPM";
import PresupuestoEM from "./pages/Presupuestos/PresupuestoEM";
import PresupuestoExtras from "./pages/Presupuestos/PresupuestoExtras";
import PresupuestoDeck from "./pages/Presupuestos/PresupuestoDeck";
import BaseDatosMats from "./pages/Presupuestos/BaseDatosMats";
import AgregarMat from "./pages/Presupuestos/AgregarMat";
//Paginas de Pedidos
import PedidoPerfiles from "./pages/Pedidos/PedidoPerfiles";
import PedidoHerrajes from "./pages/Pedidos/PedidoHerrajes";
import PedidoVidrios from "./pages/Pedidos/PedidoVidrios";
//Paginas de Gestion de Clientes
import GestionarClientes from "./pages/Clientes/GestionarClientes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Main" element={<Main />} />
        {/* PRESUPUESTOS */}
        <Route path="/PresupuestoPM" element={<PresupuestoPM />} />
        <Route path="/PresupuestoEM" element={<PresupuestoEM />} />
        <Route path="/PresupuestoDeck" element={<PresupuestoDeck />} />
        <Route path="/PresupuestoExtras" element={<PresupuestoExtras />} />
        <Route path="/BaseDatosMats" element={<BaseDatosMats />} />
        <Route path="/AgregarMat" element={<AgregarMat />} />
        {/* PEDIDOS */}
        <Route path="/PedidoPerfiles" element={<PedidoPerfiles />} />
        <Route path="/PedidoHerrajes" element={<PedidoHerrajes />} />
        <Route path="/PedidoVidrios" element={<PedidoVidrios />} />
        {/* GESTION DE CLIENTES */}
        <Route path="/GestionarClientes" element={<GestionarClientes />} />
      </Routes>
    </Router>
  );
}

export default App;
