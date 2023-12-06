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
import { Typography } from "@mui/material";

const AddConceptoPagoModal = ({ open, onClose, onConceptCreation }) => {
  const [Detalle, setDetalle] = useState("");

  const crearConceptoPago = async (Detalle) => {
    try {
      const resp = await serverAPI.post("/settings/crearConceptoPago", {
        Detalle,
      });

      if (resp.data.msg === "El concepto que intenta registrar ya existe") {
        SwAlertError();
      } else {
        console.log(resp);

        setDetalle("");
        onConceptCreation();

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
      text: "Concepto de pago creado correctamente",
      icon: "success",
    });
  };

  const SwAlertError = () => {
    swal({
      title: "¡Error!",
      text: "El concepto de pago ya se encuentra registrado",
      icon: "error",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (Detalle === "") {
      console.log("Todos los campos son obligatorios");
      return;
    }

    crearConceptoPago(Detalle);
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
            <h1 className="h3">Crear Concepto de Pago</h1>
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
            Descripción: Se entiende por concepto de pago al valor relativo al
            presupuesto que se le atribuye al pago realizado por un cliente.
            Ejemplo: Anticipo, saldo, etc.
          </Typography>

          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            className="mt-3"
          >
            Crear Concepto de Pago
          </Button>
        </form>
      </Paper>
    </Modal>
  );
};

export default AddConceptoPagoModal;
