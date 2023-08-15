import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import swal from "sweetalert";

const AddPresupuesto = ({ open, onClose }) => {
  const [selectedClient, setSelectedClient] = useState("");
  const [precio, setPrecio] = useState("");
  const [factCondicion, setFactCondicion] = useState("");
  const [calculatedIVA, setCalculatedIVA] = useState(0);
  const [total, setTotal] = useState(0);
  const [codigo, setCodigo] = useState("");

  const clientData = JSON.parse(localStorage.getItem("clients")) || [];

  const handleClientChange = (e) => {
    setSelectedClient(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const presCode = e.target.presCode.value;
    const clientCUIT = selectedClient;
    const clientData = JSON.parse(localStorage.getItem("clients")) || [];
    const clientIndex = clientData.findIndex(
      (client) => client.ClientCUIT === clientCUIT
    );

    if (clientIndex !== -1) {
      if (!clientData[clientIndex].Presupuestos) {
        clientData[clientIndex].Presupuestos = [];
      }

      clientData[clientIndex].Presupuestos.push({
        PresupuestoCodigo: presCode,
        CondicionFacturacion: factCondicion,
        Precio: precio,
        IVA: calculatedIVA,
        Total: total,
      });

      localStorage.setItem("clients", JSON.stringify(clientData));

      SwAlert();

      setSelectedClient("");
      setPrecio("");
      setFactCondicion("");
      setCalculatedIVA(0);
      setTotal(0);
      setCodigo("");
    } else {
      console.error("Selected client not found.");
    }
  };

  const SwAlert = () => {
    swal({
      title: "¡Exito!",
      text: "El presupuesto se agregó correctamente al cliente",
      icon: "success",
    });
  };

  //FORMATO DE MONEDA
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    }).format(value);
  };

  const handlePrecioChange = (e) => {
    const newPrecio = parseFloat(e.target.value);
    setPrecio(newPrecio.toString()); // Store as number, not formatted string
    calculateIVA(newPrecio, parseFloat(factCondicion));
  };

  const handleCodigoChange = (e) => {
    setCodigo(e.target.value);
  };

  const handleFactCondicionChange = (e) => {
    const newFactCondicion = parseFloat(e.target.value);
    setFactCondicion(newFactCondicion.toString()); // Convert back to string for input display
    calculateIVA(parseFloat(precio), newFactCondicion);
  };

  const calculateIVA = (precio: number, condition: number) => {
    const calculatedValue = (precio * condition * 0.21) / 100;
    setCalculatedIVA(calculatedValue);
    console.log("calculatedValue:", calculatedValue);
    calculateTotal(); // Call calculateTotal after updating calculatedIVA
  };

  useEffect(() => {
    calculateTotal();
  }, [precio, calculatedIVA]);

  const calculateTotal = () => {
    const calculatedTotal = parseFloat(precio) + calculatedIVA;
    setTotal(calculatedTotal);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Paper
        sx={{
          p: 2,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        className="CreateModal"
      >
        <form id="presupuestoForm" onSubmit={handleFormSubmit}>
          <div className="d-flex justify-content-between mb-2">
            <h1 className="h3">Agregar Presupuesto a Cuenta Existente</h1>
            <HighlightOffIcon onClick={onClose} fontSize="large" />
          </div>

          {/* CUENTA DE CLIENTE */}
          <div className="form-floating">
            <select
              className="form-select my-3 w-50"
              name="client"
              value={selectedClient}
              onChange={handleClientChange}
              required
            >
              <option value="" disabled>
                Seleccionar cliente
              </option>
              {clientData.map((client, index) => (
                <option key={index} value={client.ClientCUIT}>
                  {client.ClientName} {client.ClientApellido}
                </option>
              ))}
            </select>

            <label htmlFor="client">Cliente</label>
          </div>

          <div className="d-flex w-100">
            {/* CODIGO DE PRESUPUESTO */}
            <div className="form-floating w-100 me-3">
              <input
                type="text"
                min={0}
                maxLength={9}
                className="form-control w-100 mt-3"
                name="presCode"
                placeholder="Codigo de Presupuesto"
                value={codigo}
                onChange={handleCodigoChange}
                required
              />
              <label htmlFor="presCode">Codigo de Presupuesto</label>
            </div>
            {/* CONDICION DE FACTURACIÓN */}
            <div className="form-floating w-100">
              <select
                className="form-select my-3 w-100"
                name="factCondicion"
                value={factCondicion}
                onChange={handleFactCondicionChange}
              >
                <option value="">
                  Seleccionar una condición de facturación
                </option>
                <option value="100%">100% - (21%)</option>
                <option value="65%">65% - (13,65%)</option>
                <option value="50%">50% - (10,5%)</option>
                <option value="0%">0%</option>
              </select>
              <label htmlFor="factCondicion">
                Condición de facturación:{" "}
                {factCondicion ? factCondicion : "Seleccionar"}
              </label>
            </div>
          </div>

          <div className="d-flex w-100">
            {/* PRECIO C/DESCUENTO */}
            <div className="form-floating w-75 me-3">
              <input
                type="text"
                min={0}
                maxLength={15}
                className="form-control w-100 mt-3"
                name="precio"
                placeholder="Codigo de Presupuesto"
                value={precio}
                onChange={handlePrecioChange}
              />
              <label htmlFor="dniInput">Precio c/ Descuento</label>
            </div>
            <div className="d-flex w-100">
              {/* IVA */}
              <div className="form-floating w-100 me-3">
                <input
                  type="text"
                  className="form-control mt-3 w-100"
                  name="iva"
                  placeholder="IVA"
                  value={factCondicion ? formatCurrency(calculatedIVA) : ""}
                  disabled
                />
                <label>IVA</label>
              </div>
              {/* TOTAL */}
              <div className="form-floating w-100">
                <input
                  type="text"
                  className="form-control mt-3 w-100"
                  name="total"
                  placeholder="Total"
                  value={factCondicion ? formatCurrency(total) : ""}
                  disabled
                />
                <label>Total</label>
              </div>
            </div>
          </div>

          {precio && !factCondicion && (
            <div>
              <p className="text-danger mt-2 me-1 row justify-content-end">
                Selecciona una condición de IVA, por favor.
              </p>
            </div>
          )}

          <button className="btn btn-primary w-25 py-2 mt-4" type="submit">
            Agregar Presupuesto
          </button>
        </form>
      </Paper>
    </Modal>
  );
};

export default AddPresupuesto;
