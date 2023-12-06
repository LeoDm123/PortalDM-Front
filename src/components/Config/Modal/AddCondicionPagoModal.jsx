import React from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import TextField from "@mui/material/TextField";
import swal from "sweetalert";
import serverAPI from "../../../api/serverAPI";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

const AddCondicionPagoModal = ({ open, onClose, onCondicionCreation }) => {
  const [Detalle, setDetalle] = useState("");

  const crearCondicionPago = async (Detalle) => {
    try {
      const resp = await serverAPI.post("/settings/crearCondicionPago", {
        Detalle,
      });

      if (resp.data.msg === "La condición que intenta registrar ya existe") {
        SwAlertError();
      } else {
        console.log(resp);

        setDetalle("");
        onCondicionCreation();

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
      text: "Condición de pago creada correctamente",
      icon: "success",
    });
  };

  const SwAlertError = () => {
    swal({
      title: "¡Error!",
      text: "La condición de pago ya se encuentra registrado",
      icon: "error",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (Detalle === "") {
      console.log("Todos los campos son obligatorios");
      return;
    }

    crearCondicionPago(Detalle);
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
            <h1 className="h3">Crear Condición de Pago</h1>
            <HighlightOffIcon onClick={onClose} fontSize="large" />
          </div>

          <div className="w-100 me-3">
            <TextField
              fullWidth
              label="Detalle"
              variant="outlined"
              value={Detalle}
              onChange={(e) => setDetalle(e.target.value)}
            />
          </div>
          <Typography sx={{ marginTop: 2, marginRight: 1 }} variant="body2">
            Descripción: Se entiende por condición de pago al caracter atribuido
            al pago realizado por un cliente. Ejemplo: Pago, Nota de Credito,
            Nota de Debito, etc.
          </Typography>

          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            className="mt-3"
          >
            Crear Condición de Pago
          </Button>
        </form>
      </Paper>
    </Modal>
  );
};

export default AddCondicionPagoModal;
