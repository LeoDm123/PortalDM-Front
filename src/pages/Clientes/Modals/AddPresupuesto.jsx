import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import swal from "sweetalert";
import serverAPI from "../../../api/serverAPI";

const AddPresupuesto = ({ open, onClose }) => {
  const [clientData, setClientData] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedClientCUIT, setSelectedClientCUIT] = useState("");
  const [precio, setPrecio] = useState("");
  const [factCondicion, setFactCondicion] = useState("");
  const [calculatedIVA, setCalculatedIVA] = useState(0);
  const [total, setTotal] = useState(0);
  const [codigo, setCodigo] = useState("");
  const [estado, setEstado] = useState("Activo");

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

  const crearPresupuesto = async (
    PresupuestoCodigo,
    CondicionFacturacion,
    IVA,
    Precio,
    Total,
    ClientCUIT,
    Estado
  ) => {
    try {
      const resp = await serverAPI.post("/pres/crearPresupuesto", {
        PresupuestoCodigo,
        CondicionFacturacion,
        IVA,
        Precio,
        Total,
        ClientCUIT,
        Estado,
      });

      if (
        resp.data.msg ===
        "El código de presupuesto ya se encuentra registrado para este cliente"
      ) {
        SwAlertError();
      } else {
        SwAlertOk();
        onClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const SwAlertOk = () => {
    swal({
      title: "¡Exito!",
      text: "El presupuesto se agregó correctamente",
      icon: "success",
    });
  };

  const SwAlertError = () => {
    swal({
      title: "¡Error!",
      text: "El presupuesto ya se encuentra registrado",
      icon: "error",
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (
      codigo === "" ||
      factCondicion === "" ||
      precio === "" ||
      selectedClient === ""
    ) {
      return console.log("todos los campos son obligatorios");
    }

    console.log(
      codigo,
      factCondicion,
      calculatedIVA,
      precio,
      total,
      selectedClientCUIT
    );

    crearPresupuesto(
      codigo,
      factCondicion,
      calculatedIVA,
      precio,
      total,
      selectedClientCUIT,
      estado
    );
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    }).format(value);
  };

  const handleClientSelect = (event) => {
    const selectedClientDNI = event.target.value;
    const selectedClientData = clientData.find(
      (client) => client.ClientDNI === selectedClientDNI
    );

    if (selectedClientData) {
      setSelectedClient(selectedClientDNI);
      setSelectedClientCUIT(selectedClientData.ClientCUIT);
    } else {
      setSelectedClient("");
      setSelectedClientCUIT("");
    }
  };

  const handleFactCondicionChange = (e) => {
    const newFactCondicion = parseFloat(e.target.value);
    setFactCondicion(newFactCondicion.toString());
    calculateIVA(parseFloat(precio), newFactCondicion);
  };

  const calculateIVA = (precio, condition) => {
    const calculatedValue = (precio * condition * 0.21) / 100;
    setCalculatedIVA(calculatedValue);
    console.log("calculatedValue:", calculatedValue);
    calculateTotal();
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

          <Grid display={"flex"}>
            <FormControl className="form-floating w-100">
              <InputLabel htmlFor="client">Cliente</InputLabel>
              <Select
                className="form-select my-3 w-100"
                name="client"
                value={selectedClient}
                onChange={handleClientSelect}
                required
                inputProps={{
                  name: "client",
                  id: "client",
                }}
              >
                <MenuItem value="" disabled>
                  Seleccionar cliente
                </MenuItem>
                {clientData.map((client, index) => (
                  <MenuItem key={index} value={client.ClientDNI}>
                    {client.ClientApellido}, {client.ClientName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              type="text"
              className="form-control mt-3 w-75 ms-3"
              name="CUIT"
              placeholder="CUIT"
              value={selectedClientCUIT}
              disabled
              label="CUIT"
            />
          </Grid>

          <div className="d-flex w-100">
            <TextField
              type="text"
              className="form-control w-100 mt-3 me-2"
              name="presCode"
              placeholder="Codigo de Presupuesto"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              required
              label="Codigo de Presupuesto"
            />
            <FormControl className="form-floating w-100 ms-2">
              <InputLabel htmlFor="factCondicion">
                Condición de facturación:{" "}
                {factCondicion ? factCondicion : "Seleccionar"}
              </InputLabel>
              <Select
                className="form-select my-3 w-100"
                name="factCondicion"
                value={factCondicion}
                onChange={handleFactCondicionChange}
                inputProps={{
                  name: "factCondicion",
                  id: "factCondicion",
                }}
              >
                <MenuItem value="">
                  Seleccionar una condición de facturación
                </MenuItem>
                <MenuItem value="100%">100% - (21%)</MenuItem>
                <MenuItem value="65%">65% - (13,65%)</MenuItem>
                <MenuItem value="50%">50% - (10,5%)</MenuItem>
                <MenuItem value="0%">0%</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="d-flex w-100">
            <TextField
              type="text"
              className="form-control w-100 me-3 mt-3"
              name="precio"
              placeholder="Codigo de Presupuesto"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              label="Precio c/ Descuento"
            />
            <TextField
              type="text"
              className="form-control mt-3 w-75 me-3"
              name="iva"
              placeholder="IVA"
              value={factCondicion ? formatCurrency(calculatedIVA) : ""}
              disabled
              label="IVA"
            />
            <TextField
              type="text"
              className="form-control mt-3 w-100"
              name="total"
              placeholder="Total"
              value={factCondicion ? formatCurrency(total) : ""}
              disabled
              label="Total"
            />
          </div>

          {precio && !factCondicion && (
            <div>
              <p className="text-danger mt-2 me-1 row justify-content-end">
                Selecciona una condición de IVA, por favor.
              </p>
            </div>
          )}

          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            className="mt-4"
          >
            Agregar Presupuesto
          </Button>
        </form>
      </Paper>
    </Modal>
  );
};

export default AddPresupuesto;
