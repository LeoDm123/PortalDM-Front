import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { crearPago } from "../../../hooks/Clientes/Pagos/crearPago";
import fetchClientByID from "../../../hooks/Clientes/fetchClientByID";

const AddPagoForm = ({ onClose, selectedClientIndex, onSubmitPay }) => {
  const [PresupuestoCodigo, setPresupuestoCodigo] = useState("");
  const [PagoMonto, setPagoMonto] = useState(0);
  const [PagoCondicion, setPagoCondicion] = useState("");
  const [PagoConcepto, setPagoConcepto] = useState("");
  const [FechaPago, setFechaPago] = useState("");
  const [PagoComprobante, setPagoComprobante] = useState("");
  const [Comentarios, setComentarios] = useState("");
  const [ClientCUIT, setClientCUIT] = useState("");

  const clientByID = fetchClientByID(selectedClientIndex);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const monto = parseFloat(PagoMonto);

    if (
      PresupuestoCodigo === "" ||
      FechaPago === "" ||
      PagoCondicion === "" ||
      PagoConcepto === "" ||
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
      clientByID.ClientCUIT,
      PresupuestoCodigo,
      FechaPago,
      PagoCondicion,
      PagoConcepto,
      PagoComprobante,
      monto,
      Comentarios,
      onClose
    );

    setClientCUIT("");
    setPresupuestoCodigo("");
    setFechaPago("");
    setPagoCondicion("");
    setPagoConcepto("");
    setPagoComprobante("");
    setPagoMonto(0);
    setComentarios("");

    onSubmitPay();
  };

  return (
    <form id="pagoForm" onSubmit={handleFormSubmit}>
      <div className="d-flex justify-content-between mb-2">
        <h1 className="h3">Agregar Pago</h1>
        <HighlightOffIcon onClick={onClose} fontSize="large" />
      </div>

      <Grid display={"flex"}>
        <TextField
          type="text"
          className="form-control mt-3 w-75"
          name="Cliente"
          placeholder="Cliente"
          value={`${clientByID.ClientName} ${clientByID.ClientApellido}`}
          disabled
          label="Cliente"
        />
        <TextField
          type="text"
          className="form-control mt-3 w-75 ms-3"
          name="CUIT"
          placeholder="CUIT"
          value={clientByID.ClientCUIT}
          disabled
          label="CUIT"
        />
      </Grid>

      <Grid display={"flex"}>
        <FormControl className="form-floating w-75">
          <InputLabel htmlFor="PresupuestoCodigo">
            Codigo de Presupuesto
          </InputLabel>
          <Select
            className="form-select mt-3 w-100"
            name="PresupuestoCodigo"
            value={PresupuestoCodigo}
            onChange={(e) => setPresupuestoCodigo(e.target.value)}
            required
            inputProps={{
              name: "PresupuestoCodigo",
              id: "PresupuestoCodigo",
            }}
          >
            <MenuItem value="" disabled>
              Seleccionar código de presupuesto
            </MenuItem>
            {clientByID && clientByID.Presupuestos ? (
              clientByID.Presupuestos.map((presupuesto, index) => (
                <MenuItem key={index} value={presupuesto.PresupuestoCodigo}>
                  {presupuesto.PresupuestoCodigo}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No presupuestos available</MenuItem>
            )}
          </Select>
        </FormControl>
        <TextField
          type="date"
          className="form-control w-75 mt-3 ms-3"
          name="fecha"
          value={FechaPago}
          onChange={(e) => setFechaPago(e.target.value)}
          label="Fecha del pago"
        />
      </Grid>

      <Grid display={"flex"}>
        <TextField
          type="text"
          className="form-control mt-3 w-75"
          name="Monto"
          placeholder="Monto"
          value={PagoMonto}
          onChange={(e) => setPagoMonto(e.target.value)}
          label="Monto del pago"
        />
        <FormControl className="form-floating w-75 ms-3">
          <InputLabel htmlFor="pagoCondicion">Condición de Pago</InputLabel>
          <Select
            className="form-select w-100 mt-3"
            name="pagoCondicion"
            value={PagoCondicion}
            onChange={(e) => setPagoCondicion(e.target.value)}
            required
            inputProps={{
              name: "pagoCondicion",
              id: "pagoCondicion",
            }}
          >
            <MenuItem value="" disabled>
              Seleccionar condición de pago
            </MenuItem>
            <MenuItem value="Pago">Pago</MenuItem>
            <MenuItem value="NC">Nota de Crédito</MenuItem>
            <MenuItem value="ND">Nota de Débito</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid display={"flex"}>
        <FormControl className="form-floating w-75">
          <InputLabel htmlFor="pagoConcepto">Concepto de Pago</InputLabel>
          <Select
            className="form-select w-100 mt-3"
            name="pagoConcepto"
            value={PagoConcepto}
            onChange={(e) => setPagoConcepto(e.target.value)}
            required
            inputProps={{
              name: "pagoConcepto",
              id: "pagoConcepto",
            }}
          >
            <MenuItem value="" disabled>
              Seleccionar concepto de pago
            </MenuItem>
            <MenuItem value="Anticipo Parcial">Anticipo Parcial</MenuItem>
            <MenuItem value="Anticipo Completo">Anticipo Completo</MenuItem>
            <MenuItem value="Saldo Parcial">Saldo Parcial</MenuItem>
            <MenuItem value="Saldo Completo">Saldo Completo</MenuItem>
            <MenuItem value="Actualización">Actualización</MenuItem>
            <MenuItem value="Extra">Extra</MenuItem>
          </Select>
        </FormControl>
        <TextField
          type="text"
          className="form-control w-75 ms-3 mt-3"
          name="Comprobante"
          placeholder="Comprobante"
          value={PagoComprobante}
          onChange={(e) => setPagoComprobante(e.target.value)}
          label="Numero del comprobante"
        />
      </Grid>

      <TextField
        type="text"
        className="form-control w-100 mt-3"
        name="Comentarios"
        placeholder="Comentarios"
        value={Comentarios}
        onChange={(e) => setComentarios(e.target.value)}
        label="Comentarios"
        multiline
      />

      <Button
        variant="contained"
        color="primary"
        size="large"
        type="submit"
        className="mt-4"
      >
        Agregar Pago
      </Button>
    </form>
  );
};

export default AddPagoForm;
