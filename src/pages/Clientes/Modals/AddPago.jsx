import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import swal from "sweetalert";

const AddPago = ({ open, onClose }) => {
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedPresupuesto, setSelectedPresupuesto] = useState("");
  const [pago, setPago] = useState("");
  const [pagoCondicion, setPagoCondicion] = useState("");
  const [pagoConcepto, setPagoConcepto] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [comprobante, setComprobante] = useState("");
  const [comments, setComments] = useState("");
  const [showResumen, setShowResumen] = useState(false);

  const clientData = JSON.parse(localStorage.getItem("clients")) || [];

  const handleClientChange = (e) => {
    const newValue = e.target.value;
    setSelectedClient(newValue);
    setSelectedPresupuesto(""); // Reset selectedPresupuesto when client changes
  };

  const handlePresupuestoChange = (e) => {
    setSelectedPresupuesto(e.target.value);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handlePagoCondicionChange = (e) => {
    setPagoCondicion(e.target.value);
  };

  const handlePagoConceptoChange = (e) => {
    setPagoConcepto(e.target.value);
  };

  const handleComprobanteChange = (e) => {
    setComprobante(e.target.value);
  };

  const handleCommentsChange = (e) => {
    setComments(e.target.value);
  };

  const handlePagoChange = (e) => {
    const newPago = parseFloat(e.target.value);
    setPago(newPago.toString()); // Store as number, not formatted string
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const presCode = selectedPresupuesto;
    const clientCUIT = selectedClient;
    const clientIndex = clientData.findIndex(
      (client) => client.ClientCUIT === clientCUIT
    );

    if (clientIndex !== -1) {
      const selectedPresupuestoIndex = clientData[
        clientIndex
      ].Presupuestos.findIndex(
        (presupuesto) => presupuesto.PresupuestoCodigo === presCode
      );

      if (selectedPresupuestoIndex !== -1) {
        if (
          !clientData[clientIndex].Presupuestos[selectedPresupuestoIndex].pagos
        ) {
          clientData[clientIndex].Presupuestos[selectedPresupuestoIndex].pagos =
            [];
        }

        let EstadoConcepto = 0; // Default value

        if (pagoConcepto === "Actualización") {
          EstadoConcepto = 1;
        } else if (pagoConcepto === "Extra") {
          EstadoConcepto = 2;
        }

        const newPago = {
          Fecha: selectedDate,
          CondicionPago: pagoCondicion,
          ConceptoPago: pagoConcepto,
          EstadoConcepto: EstadoConcepto,
          MontoPago: parseFloat(pago),
          NumeroComprobante: comprobante,
          Comentarios: comments,
        };

        clientData[clientIndex].Presupuestos[
          selectedPresupuestoIndex
        ].pagos.push(newPago);

        localStorage.setItem("clients", JSON.stringify(clientData));

        SwAlert();

        setSelectedClient("");
        setPago("");
        setSelectedPresupuesto("");
        setPagoCondicion("");
        setPagoConcepto("");
        setComprobante("");
        setComments("");
        setSelectedDate("");
      } else {
        console.error("Selected presupuesto not found.");
      }
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

  const handleAgregarPagoClick = () => {
    // Check if all required fields are completed
    if (
      selectedClient &&
      selectedPresupuesto &&
      selectedDate &&
      pagoCondicion &&
      pagoConcepto &&
      pago &&
      comprobante &&
      comments
    ) {
      setShowResumen(true);
    } else {
      // If not all fields are completed, display an alert or message to the user
      swal({
        title: "¡Error!",
        text: "Por favor, complete todos los campos antes de continuar.",
        icon: "error",
      });
    }
  };

  //FORMATO DE MONEDA
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    }).format(value);
  };

  const getClientNameAndApellido = (cuit) => {
    const client = clientData.find((client) => client.ClientCUIT === cuit);
    if (client) {
      return `${client.ClientName} ${client.ClientApellido}`;
    }
    return ""; // Return an empty string if client is not found
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Paper
        sx={{
          height: "95%",
          p: 2,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        className="CreateModal"
      >
        <form id="pagoForm" onSubmit={handleFormSubmit}>
          {!showResumen && (
            <div>
              <div className="d-flex justify-content-between mb-2">
                <h1 className="h3">Agregar Pago a Presupuesto Existente</h1>
                <HighlightOffIcon onClick={onClose} fontSize="large" />
              </div>

              <div className="d-flex">
                {/* CUENTA DE CLIENTE */}
                <div className="form-floating w-100 me-3">
                  <select
                    className="form-select my-2 w-100"
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
                </div>

                <div className="form-floating w-100">
                  {/* PRESUPUESTO */}
                  <select
                    className="form-select my-2 w-100"
                    name="presupuesto"
                    value={selectedPresupuesto}
                    onChange={handlePresupuestoChange}
                    required
                  >
                    <option value="" disabled>
                      Seleccionar presupuesto
                    </option>
                    {clientData.map((client) => {
                      if (
                        client.ClientCUIT === selectedClient &&
                        client.Presupuestos
                      ) {
                        return client.Presupuestos.map((presupuesto, index) => (
                          <option
                            key={index}
                            value={presupuesto.PresupuestoCodigo}
                          >
                            {presupuesto.PresupuestoCodigo}
                          </option>
                        ));
                      }
                      return null;
                    })}
                  </select>
                </div>
              </div>

              <div className="d-flex w-100">
                {/* FECHA DE PAGO */}
                <div className="form-floating w-100 me-3">
                  <input
                    type="date"
                    min={0}
                    maxLength={9}
                    className="form-control w-100 my-2"
                    name="datePago"
                    placeholder="Fecha de Pago"
                    value={selectedDate}
                    onChange={handleDateChange}
                    required
                  />
                  <label htmlFor="datePago">Fecha de Pago</label>
                </div>
                {/* CONDICION DE PAGO */}
                <div className="form-floating w-100">
                  <select
                    className="form-select my-2 w-100"
                    name="pagoCondicion"
                    value={pagoCondicion}
                    onChange={handlePagoCondicionChange}
                    required
                  >
                    <option value="">Seleccionar una condición de pago</option>
                    <option value="Pago">Pago</option>
                    <option value="Nota de Crédito">Nota de Crédito</option>
                    <option value="Nota de Débito">Nota de Débito</option>
                    <option value="Otro">Otro</option>
                  </select>
                  <label htmlFor="pagoCondicion">
                    Condición de pago:{" "}
                    {pagoCondicion ? pagoCondicion : "Seleccionar"}
                  </label>
                </div>
              </div>

              <div className="d-flex w-100">
                {/* CONCEPTO DE PAGO */}
                <div className="form-floating w-100 me-3">
                  <select
                    className="form-select my-2 w-100"
                    name="pagoConcepto"
                    value={pagoConcepto}
                    onChange={handlePagoConceptoChange}
                    required
                  >
                    <option value="">Seleccionar un concepto de pago</option>
                    <option value="Anticipo Parcial">Anticipo Parcial</option>
                    <option value="Anticipo Total">Anticipo Total</option>
                    <option value="Saldo Parcial">Saldo Parcial</option>
                    <option value="Saldo Total">Saldo Total</option>
                    <option value="Pago Total">Pago Total</option>
                    <option value="Actualizacion">Actualización</option>
                    <option value="Extra">Extra</option>
                  </select>
                  <label htmlFor="pagoConcepto">
                    Concepto de pago:{" "}
                    {pagoConcepto ? pagoConcepto : "Seleccionar"}
                  </label>
                </div>
                {/* MONTO DE PAGO */}
                <div className="form-floating w-100">
                  <input
                    type="text"
                    min={0}
                    maxLength={15}
                    className="form-control w-100 my-2"
                    name="pago"
                    placeholder="Monto de Pago"
                    value={pago}
                    onChange={handlePagoChange}
                    required
                  />
                  <label htmlFor="pago">Monto de Pago</label>
                </div>
              </div>

              <div className="d-flex w-100">
                {/* NUMERO DE COMPROBANTE */}
                <div className="form-floating w-100 me-3">
                  <input
                    type="number"
                    min={0}
                    maxLength={15}
                    className="form-control w-100 my-2"
                    name="comprobante"
                    placeholder="Numero de Comprobante"
                    value={comprobante}
                    onChange={handleComprobanteChange}
                    required
                  />
                  <label htmlFor="comprobante">Numero de Comprobante</label>
                </div>
                {/* COMENTARIOS */}
                <div className="form-floating w-100">
                  <input
                    type="text"
                    min={0}
                    maxLength={40}
                    className="form-control w-100 my-2"
                    name="comments"
                    placeholder="Comentarios"
                    value={comments}
                    onChange={handleCommentsChange}
                    required
                  />
                  <label htmlFor="comments">Comentarios</label>
                </div>
              </div>

              <button className="btn btn-primary w-25 py-2 mt-4" type="submit">
                Agregar Pago
              </button>
            </div>
          )}
          {showResumen && (
            <form>
              <div className="d-flex justify-content-between mb-2">
                <h1 className="h3">Agregar Pago a Presupuesto Existente</h1>
                <HighlightOffIcon onClick={onClose} fontSize="large" />
              </div>

              <div className="d-flex w-25">
                <div>
                  <p>Cliente:&nbsp;</p>
                </div>
                <div>
                  <p>{getClientNameAndApellido(selectedClient)}</p>
                </div>
              </div>
              <div className="d-flex w-25">
                <div>
                  <p>CUIT:&nbsp;</p>
                </div>
                <div>
                  <p>{selectedClient}</p>
                </div>
              </div>
              <div className="d-flex w-25">
                <div>
                  <p>Fecha:&nbsp;</p>
                </div>
                <div>
                  <p>{selectedDate}</p>
                </div>
              </div>

              <div className="d-flex w-25">
                <div>
                  <p>Codigo:&nbsp;</p>
                </div>
                <div>
                  <p>{selectedPresupuesto}</p>
                </div>
              </div>
              <div className="d-flex w-50">
                <div>
                  <p>Condición de Pago:&nbsp;</p>
                </div>
                <div>
                  <p>{pagoCondicion}</p>
                </div>
              </div>
              <div className="d-flex w-50">
                <div>
                  <p>Concepto de Pago:&nbsp;</p>
                </div>
                <div>
                  <p>{pagoConcepto}</p>
                </div>
              </div>

              <div className="d-flex w-50">
                <div>
                  <p>Monto de Pago:&nbsp;</p>
                </div>
                <div>
                  <p>{formatCurrency(pago)}</p>
                </div>
              </div>
              <div className="d-flex w-50">
                <div>
                  <p>Numero de Comprobante:&nbsp;</p>
                </div>
                <div>
                  <p>{comprobante}</p>
                </div>
              </div>

              <div className="d-flex">
                <div>
                  <p>Comentarios:&nbsp;</p>
                </div>
                <div>
                  <p>{comments}</p>
                </div>
              </div>

              <button className="btn btn-primary w-25 py-2 mt-4" type="submit">
                Confirmar Pago
              </button>
              <button
                className="btn btn-secondary ms-3 py-2 mt-4"
                onClick={() => setShowResumen(false)}
              >
                Volver
              </button>
            </form>
          )}
        </form>
      </Paper>
    </Modal>
  );
};

export default AddPago;
