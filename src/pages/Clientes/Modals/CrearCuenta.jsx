import React, { ChangeEvent } from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import swal from "sweetalert";
import serverAPI from "../../../api/serverAPI";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

const CrearCuenta = ({ open, onClose, onClientCreation }) => {
  const [ClientName, setClientName] = useState("");
  const [ClientApellido, setClientApellido] = useState("");
  const [ClientIVACond, setClientIVACond] = useState("");
  const [ClientDNI, setClientDNI] = useState("");
  const [ClientAdress, setClientAdress] = useState("");
  const [ClientTel, setClientTel] = useState("");
  const [ClientEmail, setClientEmail] = useState("");
  const [ClientCUIT, setClientCUIT] = useState("");
  const [ClientStatus, setClientStatus] = useState("Activo");

  const crearCliente = async (
    ClientName,
    ClientApellido,
    ClientIVACond,
    ClientDNI,
    ClientCUIT,
    ClientAdress,
    ClientTel,
    ClientEmail,
    ClientStatus
  ) => {
    try {
      const resp = await serverAPI.post("/clients/crearCliente", {
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

      if (
        resp.data.msg ===
        "El DNI que intenta registrar ya se encuentra registrado"
      ) {
        SwAlertError();
      } else {
        console.log(resp);
        SwAlertOk();
        onClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const SwAlertOk = () => {
    swal({
      title: "¡Éxito!",
      text: "El cliente se agregó correctamente",
      icon: "success",
    });
  };

  const SwAlertError = () => {
    swal({
      title: "¡Error!",
      text: "El cliente ya se encuentra registrado",
      icon: "error",
    });
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

  const handleSubmit = (event) => {
    event.preventDefault();

    if (ClientEmail === "" || ClientName === "" || ClientIVACond === "") {
      return console.log("todos los campos son obligatorios");
    }

    console.log(
      ClientName,
      ClientApellido,
      ClientIVACond,
      ClientDNI,
      ClientCUIT,
      ClientAdress,
      ClientTel,
      ClientEmail,
      ClientStatus
    );

    crearCliente(
      ClientName,
      ClientApellido,
      ClientIVACond,
      ClientDNI,
      ClientCUIT,
      ClientAdress,
      ClientTel,
      ClientEmail,
      ClientStatus
    );

    setClientName("");
    setClientApellido("");
    setClientIVACond("");
    setClientDNI("");
    setClientEmail("");
    setClientAdress("");
    setClientTel("");
    setClientCUIT("");

    onClientCreation();
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
        <form id="registerForm" onSubmit={handleSubmit}>
          <div className="d-flex justify-content-between mb-2">
            <h1 className="h3">Ingresar Cliente</h1>
            <HighlightOffIcon onClick={onClose} fontSize="large" />
          </div>
          <div className="d-flex flex-direction-row">
            <div className="w-100 me-3">
              <TextField
                fullWidth
                label="Nombre o Razon Social"
                variant="outlined"
                value={ClientName}
                onChange={(e) => setClientName(e.target.value)}
              />
              <TextField
                fullWidth
                label="Apellido"
                variant="outlined"
                className="mt-3"
                value={ClientApellido}
                onChange={(e) => setClientApellido(e.target.value)}
              />
              <FormControl variant="outlined" fullWidth className="mt-3">
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
                </Select>
              </FormControl>
              <TextField
                fullWidth
                type="number"
                label="Numero de Documento"
                variant="outlined"
                className="mt-3"
                value={ClientDNI}
                onChange={(e) => setClientDNI(e.target.value)}
              />
              <TextField
                fullWidth
                label="CUIT"
                variant="outlined"
                className="mt-3"
                value={ClientCUIT}
                onChange={handleCUITChange}
              />
            </div>
            <div className="w-100">
              <TextField
                fullWidth
                label="Dirección"
                variant="outlined"
                value={ClientAdress}
                onChange={(e) => setClientAdress(e.target.value)}
              />
              <TextField
                fullWidth
                type="number"
                label="Telefono"
                variant="outlined"
                className="mt-3"
                value={ClientTel}
                onChange={(e) => setClientTel(e.target.value)}
              />
              <TextField
                fullWidth
                type="email"
                label="Correo Electrónico"
                variant="outlined"
                className="mt-3"
                value={ClientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
              />
            </div>
          </div>

          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            className="mt-4"
          >
            Crear Cuenta
          </Button>
        </form>
      </Paper>
    </Modal>
  );
};

export default CrearCuenta;
