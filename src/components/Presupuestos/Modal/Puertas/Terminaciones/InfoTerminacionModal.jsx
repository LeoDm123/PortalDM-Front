import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import { TextField, Grid } from "@mui/material";
import Title from "../../../../Title";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import swal from "sweetalert";
import serverAPI from "../../../../../api/serverAPI";
import Button from "@mui/material/Button";
import fetchMats from "../../../../../hooks/Materiales/fetchMats";
import useFetchTerminaciones from "../../../../../hooks/Presupuestos/Puertas/Config/fetchTerminaciones";
import { DividerSecondary } from "../../../../Dividers";
import InfoInsumosTerminacionForm from "../../../Forms/Puertas/Terminaciones/InfoInsumosTerminacionForm";

const InfoTerminacionModal = ({ open, onClose, terminacionIndex }) => {
  const { loading, Terminaciones, fetchTerminaciones } =
    useFetchTerminaciones();
  const terminacion = Terminaciones[terminacionIndex];
  const [editedMats, setEditedMats] = useState([]);
  const [Detalle, setDetalle] = useState("");

  useEffect(() => {
    setDetalle(terminacion?.Detalle);
    setEditedMats(terminacion?.Materiales || []);
  }, [terminacion]);

  const handleMaterialesChange = (materiales) => {
    setEditedMats(materiales);
  };

  const editarTerminacion = async (Detalle) => {
    try {
      const resp = await serverAPI.put(
        "/presPuertasSettings/editarTerminacion",
        {
          terminacionIndex,
          Detalle,
          editedMats,
        }
      );

      if (resp.data.msg === "La terminación que intenta registrar ya existe") {
        SwAlertError();
      } else {
        console.log(resp);

        setDetalle("");

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
      text: "Terminación creada correctamente",
      icon: "success",
    });
  };

  const SwAlertError = () => {
    swal({
      title: "¡Error!",
      text: "La terminación ya se encuentra registrado",
      icon: "error",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (Detalle === "") {
      console.log("Todos los campos son obligatorios");
      return;
    }

    editarTerminacion(terminacionIndex, Detalle, editedMats);
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
          width: "80%",
        }}
        className="CreateModal"
      >
        <form id="registerForm" onSubmit={handleSubmit}>
          <div className="d-flex justify-content-between mb-2">
            <h1 className="h3">Información de Terminación</h1>
            <HighlightOffIcon onClick={onClose} fontSize="large" />
          </div>

          <Grid container spacing={1}>
            <Grid item sx={{ width: "100%" }}>
              <TextField
                type="text"
                className="form-control my-3 w-100"
                name="Detalle"
                placeholder="Detalle"
                value={Detalle}
                onChange={(e) => setDetalle(e.target.value)}
                label="Detalle"
              />
            </Grid>
          </Grid>

          <DividerSecondary />
          <Grid>
            <Title>Insumos de terminación</Title>
            <InfoInsumosTerminacionForm
              terminacionIndex={terminacionIndex}
              onMatsEdit={handleMaterialesChange}
            />
          </Grid>

          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            className="mt-3"
          >
            Guardar Cambios
          </Button>
        </form>
      </Paper>
    </Modal>
  );
};

export default InfoTerminacionModal;
