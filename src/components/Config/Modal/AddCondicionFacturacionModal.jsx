import React from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import TextField from "@mui/material/TextField";
import swal from "sweetalert";
import serverAPI from "../../../api/serverAPI";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

const AddCondicionFacturacionModal = ({
  open,
  onClose,
  onCondicionCreation,
}) => {
  const [Detalle, setDetalle] = useState(null);
  const [equivIVA, setEquivIVA] = useState(0);

  const calcularEquivIVA = (detalle) => {
    const porcentajeIVA = 21;

    const equivalenteIVA = (detalle * porcentajeIVA) / 100;
    return equivalenteIVA;
  };

  const crearCondicionFacturacion = async (Detalle, equivIVA) => {
    try {
      const resp = await serverAPI.post("/settings/crearCondicionFacturacion", {
        Detalle,
        equivIVA,
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
      text: "Condición de facturación creada correctamente",
      icon: "success",
    });
  };

  const SwAlertError = () => {
    swal({
      title: "¡Error!",
      text: "La condición de facturación ya se encuentra registrada",
      icon: "error",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (Detalle === "") {
      console.log("Todos los campos son obligatorios");
      return;
    }

    const equivalenteIVA = calcularEquivIVA(Detalle);
    setEquivIVA(equivalenteIVA);

    crearCondicionFacturacion(Detalle, equivIVA);
  };

  const handleChangeDetalle = (e) => {
    const nuevoDetalle = e.target.value;
    setDetalle(nuevoDetalle);

    const equivalenteIVA = calcularEquivIVA(nuevoDetalle);
    setEquivIVA(equivalenteIVA);
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
            <h1 className="h3">Crear Condición de Facturación</h1>
            <HighlightOffIcon onClick={onClose} fontSize="large" />
          </div>

          <Grid sx={{ display: "flex" }}>
            <div className="w-100 me-3">
              <TextField
                fullWidth
                label="Detalle"
                variant="outlined"
                value={Detalle}
                onChange={handleChangeDetalle}
              />
            </div>
            <div className="w-100 me-3">
              <TextField
                fullWidth
                disabled
                label="equivIVA"
                variant="outlined"
                value={equivIVA}
                onChange={(e) => setEquivIVA(e.target.value)}
              />
            </div>
          </Grid>
          <Typography sx={{ marginTop: 2, marginRight: 1 }} variant="body2">
            Descripción: Se entiende por condición de facturación al porcentaje
            total de precio sin impuestos de un presupuesto que va a ser
            facturada. Ejemplo: 100%, 65%, 50%, etc.
          </Typography>

          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            className="mt-3"
          >
            Crear Condición de Facturacion
          </Button>
        </form>
      </Paper>
    </Modal>
  );
};

export default AddCondicionFacturacionModal;
