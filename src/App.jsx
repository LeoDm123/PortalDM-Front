import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Paginas Generales
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Main from "./pages/Main";
//Paginas de Presupuestos
import PresupuestoPM from "./pages/Presupuestos/PresupuestoPM";
import PresupuestoEM from "./pages/Presupuestos/PresupuestoEM";
import PresupuestoExtras from "./pages/Presupuestos/PresupuestoExtras";
import PresupuestoDeck from "./pages/Presupuestos/PresupuestoDeck";
//Paginas de Base de Datos de Materiales
import BaseDatosMats from "./pages/Data Base Materiales/MatsDB/BaseDatosMats";
import ModificarMat from "./pages/Data Base Materiales/MatsDB/ModificarMat";
import DBPuertasPlacas from "./pages/Data Base Materiales/DBPuertasPlacas";
import DBManoObra from "./pages/Data Base Materiales/DBManoObra";
import DBInfoProduccion from "./pages/Data Base Materiales/ProdInfoDB/DBInfoProduccion";
//Paginas de Pedidos
import PedidosMats from "./pages/Pedidos/PedidosMats";
//Paginas de Gestion de Clientes
import GestionarClientes from "./pages/Clientes/GestionarClientes";
import ClientesDB from "./pages/Clientes/ClientesDB";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Main" element={<Main />} />
        {/* PRESUPUESTOS */}
        <Route path="/PresupuestoPM" element={<PresupuestoPM />} />
        <Route path="/PresupuestoEM" element={<PresupuestoEM />} />
        <Route path="/PresupuestoDeck" element={<PresupuestoDeck />} />
        <Route path="/PresupuestoExtras" element={<PresupuestoExtras />} />
        {/* BASE DE DATOS DE MATERIALES */}
        <Route path="/BaseDatosMats" element={<BaseDatosMats />} />
        <Route path="/ModificarMat" element={<ModificarMat />} />
        <Route path="/DBPuertasPlacas" element={<DBPuertasPlacas />} />
        <Route path="/DBManoObra" element={<DBManoObra />} />
        <Route path="/DBInfoProduccion" element={<DBInfoProduccion />} />
        {/* PEDIDOS */}
        <Route path="/PedidosMats" element={<PedidosMats />} />
        {/* GESTION DE CLIENTES */}
        <Route path="/GestionarClientes" element={<GestionarClientes />} />
        <Route path="/ClientesDB" element={<ClientesDB />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
