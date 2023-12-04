import React, { ChangeEvent } from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import swal from "sweetalert";
import serverAPI from "../../../api/serverAPI";
import Button from "@mui/material/Button";
import Title from "../../Title";
import { DividerTitle } from "../../Dividers";

const AddUserModal = ({ open, onClose, onUserCreation }) => {
  const [userName, setUserName] = useState("");
  const [userApellido, setUserApellido] = useState("");
  const [userDNI, setUserDNI] = useState("");
  const [userDireccion, setUserDireccion] = useState("");
  const [userTelefono, setUserTelefono] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const crearUsuario = async (
    userName,
    userApellido,
    userDNI,
    userTelefono,
    userDireccion,
    userEmail,
    userPassword
  ) => {
    try {
      const resp = await serverAPI.post("/auth/crearUsuario", {
        userName,
        userApellido,
        userDNI,
        userTelefono,
        userDireccion,
        userEmail,
        userPassword,
      });

      if (resp.data.msg === "El usuario que intenta registrar ya existe") {
        SwAlertError();
      } else {
        console.log(resp);

        setUserName("");
        setUserApellido("");
        setUserDNI("");
        setUserEmail("");
        setUserDireccion("");
        setUserTelefono("");
        setUserPassword("");

        onClose();
        onUserCreation();

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
      text: "Usuario creado correctamente",
      icon: "success",
    });
  };

  const SwAlertError = () => {
    swal({
      title: "¡Error!",
      text: "El usuario ya se encuentra registrado",
      icon: "error",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (userEmail === "" || userName === "" || userApellido === "") {
      console.log("Todos los campos son obligatorios");
      return;
    }

    crearUsuario(
      userName,
      userApellido,
      userDNI,
      userTelefono,
      userDireccion,
      userEmail,
      userPassword
    );
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
            <h1 className="h3">Crear Usuario</h1>
            <HighlightOffIcon onClick={onClose} fontSize="large" />
          </div>

          <Grid className="mb-3">
            <Title>Datos Personales</Title>
            <DividerTitle />
          </Grid>
          <div className="d-flex flex-direction-row">
            <div className="w-100 me-3">
              <TextField
                fullWidth
                label="Nombre"
                variant="outlined"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />

              <TextField
                fullWidth
                label="Apellido"
                variant="outlined"
                className="mt-3"
                value={userApellido}
                onChange={(e) => setUserApellido(e.target.value)}
              />

              <TextField
                fullWidth
                type="text"
                label="Numero de Documento"
                variant="outlined"
                className="mt-3"
                value={userDNI}
                onChange={(e) => setUserDNI(e.target.value)}
              />
            </div>

            <div className="w-100">
              <TextField
                fullWidth
                label="Dirección"
                variant="outlined"
                value={userDireccion}
                onChange={(e) => setUserDireccion(e.target.value)}
              />
              <TextField
                fullWidth
                type="text"
                label="Telefono"
                variant="outlined"
                className="mt-3"
                value={userTelefono}
                onChange={(e) => setUserTelefono(e.target.value)}
              />
            </div>
          </div>

          <Grid className="my-3">
            <Title>Datos de Acceso</Title>
            <DividerTitle />
          </Grid>
          <div className="d-flex flex-direction-row">
            <TextField
              fullWidth
              type="email"
              label="Correo Electrónico"
              variant="outlined"
              className="mt-3 me-3"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            <TextField
              fullWidth
              type="text"
              label="Contraseña"
              variant="outlined"
              className="mt-3"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />
          </div>

          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            className="mt-4"
          >
            Crear Usuario
          </Button>
        </form>
      </Paper>
    </Modal>
  );
};

export default AddUserModal;
