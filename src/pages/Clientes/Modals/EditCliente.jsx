import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import swal from "sweetalert";
import serverAPI from "../../../api/serverAPI";

const EditCliente = ({
  open,
  onClose,
  selectedClientIndex,
  onClientDelete,
}) => {
  const [ClientData, setClientData] = useState({});
  const [ClientName, setClientName] = useState("");
  const [ClientApellido, setClientApellido] = useState("");
  const [ClientIVACond, setClientIVACond] = useState("");
  const [ClientDNI, setClientDNI] = useState("");
  const [ClientAdress, setClientAdress] = useState("");
  const [ClientTel, setClientTel] = useState("");
  const [ClientEmail, setClientEmail] = useState("");
  const [ClientCUIT, setClientCUIT] = useState("");
  const [ClientStatus, setClientStatus] = useState("");

  useEffect(() => {
    fetchClientsData();
  }, []);

  useEffect(() => {
    if (selectedClientIndex !== null && ClientData) {
      const selectedClient = ClientData;
      setClientName(selectedClient.ClientName);
      setClientApellido(selectedClient.ClientApellido);
      setClientIVACond(selectedClient.ClientIVACond);
      setClientDNI(selectedClient.ClientDNI);
      setClientAdress(selectedClient.ClientAdress);
      setClientTel(selectedClient.ClientTel);
      setClientEmail(selectedClient.ClientEmail);
      setClientCUIT(selectedClient.ClientCUIT);
      setClientStatus(selectedClient.ClientStatus);
    }
  }, [selectedClientIndex, ClientData]);

  const fetchClientsData = async () => {
    try {
      const resp = await serverAPI.get(
        `/clients/obtenerClientePorId/${selectedClientIndex}`
      );
      setClientData(resp.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleIVAChange = (e) => {
    setClientIVACond(e.target.value);
  };

  const handleCUITChange = (e) => {
    const inputNumber = e.target.value.replace(/\D/g, "");
    const paddedNumber = inputNumber.padStart(11, "");
    const formattedCuit = `${paddedNumber.substring(
      0,
      2
    )}-${paddedNumber.substring(2, 10)}-${paddedNumber.charAt(10)}`;
    setClientCUIT(formattedCuit);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (ClientEmail === "" || ClientName === "" || ClientIVACond === "") {
      return console.log("Todos los campos son obligatorios");
    }

    try {
      await serverAPI.put(`/clients/editCliente/${selectedClientIndex}`, {
        ClientName,
        ClientApellido,
        ClientIVACond,
        ClientDNI,
        ClientCUIT,
        ClientAdress,
        ClientTel,
        ClientEmail,
        ClientStatus,
      });

      SwAlertOk();
      onClose();
    } catch (error) {
      console.error(error);
      SwAlertError();
    }
  };

  const handleDelete = async () => {
    try {
      await serverAPI.delete(`/clients/deleteCliente/${selectedClientIndex}`);

      SwAlertDelete();
      onClientDelete();
      onClose();
    } catch (error) {
      console.error(error);
      SwAlertError();
    }
  };

  const SwAlertOk = () => {
    swal({
      title: "¡Éxito!",
      text: "Los datos del cliente se han actualizado correctamente",
      icon: "success",
    });
  };

  const SwAlertError = () => {
    swal({
      title: "¡Error!",
      text: "Hubo un error al actualizar los datos del cliente",
      icon: "error",
    });
  };

  const SwAlertDelete = () => {
    swal({
      title: "¡Cuenta Eliminada!",
      text: "La cuenta del cliente se ha eliminado correctamente",
      icon: "success",
    });
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
        {ClientData && (
          <form id="registerForm" onSubmit={handleSubmit}>
            <div className="d-flex justify-content-between mb-2">
              <h1 className="h3">Editar Cliente</h1>
              <HighlightOffIcon onClick={onClose} fontSize="large" />
            </div>

            <Grid sx={{ display: "flex" }}>
              <TextField
                fullWidth
                label="Nombre o Razón Social"
                variant="outlined"
                sx={{ marginRight: 1 }}
                value={ClientName}
                onChange={(e) => setClientName(e.target.value)}
              />

              <TextField
                fullWidth
                label="Apellido"
                variant="outlined"
                sx={{ marginLeft: 1 }}
                value={ClientApellido}
                onChange={(e) => setClientApellido(e.target.value)}
              />
            </Grid>

            <Grid sx={{ display: "flex" }}>
              <FormControl
                variant="outlined"
                fullWidth
                sx={{ marginRight: 1, marginTop: 3 }}
              >
                <InputLabel id="ivaInputLabel">Condición de IVA</InputLabel>
                <Select
                  labelId="ivaInputLabel"
                  label="Condición de IVA"
                  value={ClientIVACond}
                  onChange={handleIVAChange}
                >
                  <MenuItem value="">
                    <em>Seleccione</em>
                  </MenuItem>
                  <MenuItem value="Responsable Inscripto">
                    Responsable Inscripto
                  </MenuItem>
                  <MenuItem value="Consumidor Final">Consumidor Final</MenuItem>
                  <MenuItem value="Monotributista">Monotributista</MenuItem>
                  <MenuItem value="Exento">Exento</MenuItem>
                  {/* Agrega más opciones según sea necesario */}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                type="number"
                label="Número de Documento"
                variant="outlined"
                sx={{ marginRight: 1, marginLeft: 1, marginTop: 3 }}
                value={ClientDNI}
                onChange={(e) => setClientDNI(e.target.value)}
              />

              <TextField
                fullWidth
                label="CUIT"
                variant="outlined"
                sx={{ marginLeft: 1, marginTop: 3 }}
                value={ClientCUIT}
                onChange={handleCUITChange}
              />
            </Grid>

            <TextField
              fullWidth
              label="Dirección"
              variant="outlined"
              sx={{ marginRight: 1, marginTop: 3 }}
              value={ClientAdress}
              onChange={(e) => setClientAdress(e.target.value)}
            />

            <Grid sx={{ display: "flex" }}>
              <TextField
                fullWidth
                type="number"
                label="Teléfono"
                variant="outlined"
                sx={{ marginRight: 1, marginTop: 3 }}
                value={ClientTel}
                onChange={(e) => setClientTel(e.target.value)}
              />

              <TextField
                fullWidth
                type="email"
                label="Correo Electrónico"
                variant="outlined"
                sx={{ marginLeft: 1, marginRight: 1, marginTop: 3 }}
                value={ClientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
              />

              <FormControl
                variant="outlined"
                fullWidth
                sx={{ marginRight: 1, marginTop: 3 }}
              >
                <InputLabel id="statusInputLabel">Estado</InputLabel>
                <Select
                  labelId="statusInputLabel"
                  label="Estado"
                  value={ClientStatus}
                  onChange={(e) => setClientStatus(e.target.value)}
                >
                  <MenuItem value="">
                    <em>Seleccione</em>
                  </MenuItem>
                  <MenuItem value="Activo">Activo</MenuItem>
                  <MenuItem value="Cerrado">Cerrado</MenuItem>
                  <MenuItem value="Deudor">Deudor</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid>
              <Button
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                className="mt-4 me-1"
              >
                Guardar Datos
              </Button>
              <Button
                variant="outlined"
                color="error"
                size="large"
                onClick={handleDelete}
                className="mt-4 ms-1"
              >
                Borrar Cuenta
              </Button>
            </Grid>
          </form>
        )}
      </Paper>
    </Modal>
  );
};

export default EditCliente;
