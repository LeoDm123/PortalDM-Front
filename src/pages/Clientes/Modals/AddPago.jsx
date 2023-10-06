import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import swal from "sweetalert";
import serverAPI from "../../../api/serverAPI";

const AddPago = ({ open, onClose, onPay }) => {
  const [ClientData, setClientData] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [PresupuestoCodigo, setPresupuestoCodigo] = useState("");
  const [PagoMonto, setPagoMonto] = useState(0);
  const [PagoCondicion, setPagoCondicion] = useState("");
  const [PagoConcepto, setPagoConcepto] = useState("");
  const [FechaPago, setFechaPago] = useState("");
  const [PagoComprobante, setPagoComprobante] = useState("");
  const [Comentarios, setComentarios] = useState("");
  const [showResumen, setShowResumen] = useState(false);
  const [ClientCUIT, setClientCUIT] = useState("");

  useEffect(() => {
    fetchClientsData();
  }, []);

  const fetchClientsData = async () => {
    try {
      const resp = await serverAPI.get("/clients/obtenerClientes");
      setClientData(resp.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const crearPago = async (
    ClientCUIT,
    PresupuestoCodigo,
    FechaPago,
    PagoCondicion,
    PagoConcepto,
    PagoComprobante,
    PagoMonto,
    Comentarios
  ) => {
    try {
      const resp = await serverAPI.post("/pay/crearPago", {
        ClientCUIT,
        PresupuestoCodigo,
        FechaPago,
        PagoCondicion,
        PagoConcepto,
        PagoComprobante,
        PagoMonto,
        Comentarios,
      });

      if (
        resp.data.msg === "El código de presupuesto no se encuentra registrado"
      ) {
        SwAlertError();
      } else {
        onPay();
        SwAlertOk();
        onClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const monto = parseFloat(PagoMonto);

    if (
      selectedClient === "" ||
      PresupuestoCodigo === "" ||
      FechaPago === "" ||
      PagoCondicion === "" ||
      PagoConcepto === "" ||
      PagoComprobante === "" ||
      isNaN(monto) ||
      monto <= 0
    ) {
      return swal({
        title: "¡Error!",
        text: "Todos los campos son obligatorios",
        icon: "error",
      });
    }

    crearPago(
      ClientCUIT,
      PresupuestoCodigo,
      FechaPago,
      PagoCondicion,
      PagoConcepto,
      PagoComprobante,
      monto,
      Comentarios
    );

    setSelectedClient("");
    setClientCUIT("");
    setPresupuestoCodigo("");
    setFechaPago("");
    setPagoCondicion("");
    setPagoConcepto("");
    setPagoComprobante("");
    setPagoMonto(0);
    setComentarios("");
  };

  const SwAlertOk = () => {
    swal({
      title: "¡Exito!",
      text: "El pago se agregó correctamente al presupuesto",
      icon: "success",
    });
  };

  const SwAlertError = () => {
    swal({
      title: "¡Error!",
      text: "El código de presupuesto no se encuentra registrado",
      icon: "error",
    });
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    }).format(value);
  };

  const getClientNameAndApellido = (cuit) => {
    const client = ClientData.find((client) => client.ClientCUIT === cuit);
    if (client) {
      return `${client.ClientName} ${client.ClientApellido}`;
    }
    return "";
  };

  const handleClientSelect = (event) => {
    const ClientCUIT = event.target.value;
    const selectedClientData = ClientData.find(
      (client) => client.ClientCUIT === ClientCUIT
    );

    if (selectedClientData) {
      setSelectedClient(selectedClientData.ClientCUIT);
      setClientCUIT(ClientCUIT);
    } else {
      setSelectedClient("");
      setClientCUIT("");
    }
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
                    onChange={handleClientSelect}
                    required
                  >
                    <option value="" disabled>
                      Seleccionar cliente
                    </option>
                    {ClientData.map((client, index) => (
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
                    value={PresupuestoCodigo}
                    onChange={(e) => setPresupuestoCodigo(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Seleccionar presupuesto
                    </option>
                    {ClientData.map((client) => {
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
                    value={FechaPago}
                    onChange={(e) => setFechaPago(e.target.value)}
                    required
                  />
                  <label htmlFor="datePago">Fecha de Pago</label>
                </div>
                {/* CONDICION DE PAGO */}
                <div className="form-floating w-100">
                  <select
                    className="form-select my-2 w-100"
                    name="pagoCondicion"
                    value={PagoCondicion}
                    onChange={(e) => setPagoCondicion(e.target.value)}
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
                    {PagoCondicion ? PagoCondicion : "Seleccionar"}
                  </label>
                </div>
              </div>

              <div className="d-flex w-100">
                {/* CONCEPTO DE PAGO */}
                <div className="form-floating w-100 me-3">
                  <select
                    className="form-select my-2 w-100"
                    name="pagoConcepto"
                    value={PagoConcepto}
                    onChange={(e) => setPagoConcepto(e.target.value)}
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
                    {PagoConcepto ? PagoConcepto : "Seleccionar"}
                  </label>
                </div>
                {/* MONTO DE PAGO */}
                <div className="form-floating w-100">
                  <input
                    type="number"
                    min={0}
                    maxLength={15}
                    className="form-control w-100 my-2"
                    name="pago"
                    placeholder="Monto de Pago"
                    value={PagoMonto}
                    onChange={(e) => setPagoMonto(e.target.value)}
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
                    value={PagoComprobante}
                    onChange={(e) => setPagoComprobante(e.target.value)}
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
                    value={Comentarios}
                    onChange={(e) => setComentarios(e.target.value)}
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
                  <p>{FechaPago}</p>
                </div>
              </div>

              <div className="d-flex w-25">
                <div>
                  <p>Codigo:&nbsp;</p>
                </div>
                <div>
                  <p>{PresupuestoCodigo}</p>
                </div>
              </div>
              <div className="d-flex w-50">
                <div>
                  <p>Condición de Pago:&nbsp;</p>
                </div>
                <div>
                  <p>{PagoCondicion}</p>
                </div>
              </div>
              <div className="d-flex w-50">
                <div>
                  <p>Concepto de Pago:&nbsp;</p>
                </div>
                <div>
                  <p>{PagoConcepto}</p>
                </div>
              </div>

              <div className="d-flex w-50">
                <div>
                  <p>Monto de Pago:&nbsp;</p>
                </div>
                <div>
                  <p>{formatCurrency(PagoMonto)}</p>
                </div>
              </div>
              <div className="d-flex w-50">
                <div>
                  <p>Numero de Comprobante:&nbsp;</p>
                </div>
                <div>
                  <p>{PagoComprobante}</p>
                </div>
              </div>

              <div className="d-flex">
                <div>
                  <p>Comentarios:&nbsp;</p>
                </div>
                <div>
                  <p>{Comentarios}</p>
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
