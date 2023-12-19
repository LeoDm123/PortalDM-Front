import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  TextField,
  List,
  ListItem,
  Grid,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import swal from "sweetalert";
import serverAPI from "../../../../../api/serverAPI";
import Button from "@mui/material/Button";
import fetchMats from "../../../../../hooks/Materiales/fetchMats";
import { DividerSecondary } from "../../../../Dividers";

const AddTerminacionModal = ({ open, onClose }) => {
  const Materiales = fetchMats();
  const [Detalle, setDetalle] = useState("");
  const [Precio, setPrecio] = useState(0);

  useEffect(() => {
    if (Detalle) {
      const selectedMaterial = Materiales.find(
        (material) => material.Descripcion === Detalle
      );
      if (selectedMaterial) {
        setMatId(selectedMaterial._id);
      }
    }
  }, [Detalle, Materiales]);

  const crearTerminacion = async (Detalle) => {
    try {
      const resp = await serverAPI.post(
        "/presPuertasSettings/crearTerminacion",
        {
          Detalle,
          Precio,
        }
      );

      if (resp.data.msg === "La terminación que intenta registrar ya existe") {
        SwAlertError();
      } else {
        console.log(resp);

        setDetalle("");
        setPrecio("");

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

    crearTerminacion(Detalle, Precio);
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
            <h1 className="h3">Asignar Terminación</h1>
            <HighlightOffIcon onClick={onClose} fontSize="large" />
          </div>

          <Grid container spacing={1}>
            <Grid item sx={{ width: "70%" }}>
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
            <Grid item sx={{ width: "30%" }}>
              <TextField
                type="text"
                className="form-control my-3 w-100"
                name="Precio"
                placeholder="Precio"
                value={Precio}
                onChange={(e) => setPrecio(e.target.value)}
                label="Precio"
              />
            </Grid>
          </Grid>

          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            className="mt-3"
          >
            Seleccionar Material
          </Button>
        </form>
      </Paper>
    </Modal>
  );
};

export default AddTerminacionModal;
