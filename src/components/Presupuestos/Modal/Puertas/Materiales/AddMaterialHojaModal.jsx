import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Grid,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import swal from "sweetalert";
import serverAPI from "../../../../../api/serverAPI";
import Button from "@mui/material/Button";
import fetchMats from "../../../../../hooks/Materiales/fetchMats";

const AddMaterialHojaModal = ({ open, onClose }) => {
  const Materiales = fetchMats();
  const [Detalle, setDetalle] = useState("");
  const [Categoria, setCategoria] = useState("");
  const [MatId, setMatId] = useState("");
  const [FilteredMateriales, setFilteredMateriales] = useState([]);

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

  const crearComponenteHoja = async (Detalle) => {
    try {
      const resp = await serverAPI.post(
        "/presPuertasSettings/crearComponenteHoja",
        {
          Detalle,
          MatId,
        }
      );

      if (resp.data.msg === "El material que intenta registrar ya existe") {
        SwAlertError();
      } else {
        console.log(resp);

        setDetalle("");
        setMatId("");

        SwAlertOk();
        onClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCategoriaChange = (e) => {
    setCategoria(e.target.value);

    const filteredMateriales = Materiales.filter(
      (material) => material.Categoria === e.target.value
    );
    setFilteredMateriales(filteredMateriales);
  };

  const SwAlertOk = () => {
    swal({
      title: "¡Éxito!",
      text: "Material de marco creado correctamente",
      icon: "success",
    });
  };

  const SwAlertError = () => {
    swal({
      title: "¡Error!",
      text: "El material ya se encuentra registrado",
      icon: "error",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (Detalle === "") {
      console.log("Todos los campos son obligatorios");
      return;
    }

    crearComponenteHoja(Detalle);
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
            <h1 className="h3">Asignar Componente de Hoja</h1>
            <HighlightOffIcon onClick={onClose} fontSize="large" />
          </div>

          <Grid container spacing={1}>
            <Grid item sx={{ width: "50%" }}>
              <FormControl className="form-floating w-100">
                <InputLabel htmlFor="categoria">Categoría:</InputLabel>
                <Select
                  className="form-select my-3 w-100"
                  name="Categoria"
                  value={Categoria}
                  onChange={handleCategoriaChange}
                >
                  <MenuItem value="">
                    Seleccionar una categoría de producto
                  </MenuItem>
                  <MenuItem value="Perfileria de PVC">
                    Perfilería de PVC
                  </MenuItem>
                  <MenuItem value="Madera Maciza y Alistonados">
                    Madera Maciza y Alistonados
                  </MenuItem>
                  <MenuItem value="Placas de MDF y Cantos">
                    Placas de MDF y Cantos
                  </MenuItem>
                  <MenuItem value="Deck y Revestimientos de WPC">
                    Deck y Revestimientos de WPC
                  </MenuItem>
                  <MenuItem value="Insumos de Lustre">
                    Insumos de Lustre
                  </MenuItem>
                  <MenuItem value="Insumos Varios">Insumos Varios</MenuItem>
                  <MenuItem value="Herrajes para Aberturas de PVC">
                    Herrajes para Aberturas de PVC
                  </MenuItem>
                  <MenuItem value="Herrajes para Puertas de Madera">
                    Herrajes para Puertas de Madera
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item sx={{ width: "50%" }}>
              <FormControl className="form-floating w-100 ">
                <InputLabel>Material</InputLabel>
                <Select
                  className="form-select my-3 w-100"
                  name="Terminacion"
                  value={Detalle}
                  onChange={(e) => setDetalle(e.target.value)}
                >
                  <MenuItem disabled value="">
                    Seleccionar un material
                  </MenuItem>
                  {FilteredMateriales.map((material) => (
                    <MenuItem key={material._id} value={material.Descripcion}>
                      {material.Descripcion}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Typography variant="body2">
            Descripción: Material utilizado para la producción de las hojas de
            madera de cada puerta.
          </Typography>

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

export default AddMaterialHojaModal;
