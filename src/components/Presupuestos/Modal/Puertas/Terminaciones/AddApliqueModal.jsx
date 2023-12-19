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

const AddApliqueModal = ({ open, onClose }) => {
  const Materiales = fetchMats();
  const [Detalle, setDetalle] = useState("");
  const [Categoria, setCategoria] = useState("");
  const [UnidadMedida, setUnidadMedida] = useState("");
  const [MatCategoria, setMatCategoria] = useState("");
  const [MatAsociado, setMatAsociado] = useState("");
  const [MatId, setMatId] = useState("");
  const [Ancho, setAncho] = useState(null);
  const [Alto, setAlto] = useState(null);
  const [Largo, setLargo] = useState(null);
  const [Cantidad, setCantidad] = useState(null);
  const [Precio, setPrecio] = useState(0);
  const [Porcentaje, setPorcentaje] = useState(null);
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

  const crearAplique = async (Detalle) => {
    try {
      const resp = await serverAPI.post("/presPuertasSettings/crearApliques", {
        Detalle,
        Categoria,
        UnidadMedida,
        MatAsociado,
        Ancho,
        Alto,
        Largo,
        Cantidad,
        Precio,
        Porcentaje,
        MatId,
      });

      if (resp.data.msg === "El aplique que intenta registrar ya existe") {
        SwAlertError();
      } else {
        console.log(resp);

        setDetalle("");
        setCategoria("");
        setUnidadMedida("");
        setMatAsociado("");
        setMatCategoria("");
        setAncho("");
        setAlto("");
        setLargo("");
        setCantidad("");
        setPrecio("");
        setPorcentaje("");
        setMatId("");

        SwAlertOk();
        onClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCategoriaChange = (e) => {
    setMatCategoria(e.target.value);

    const filteredMateriales = Materiales.filter(
      (material) => material.Categoria === e.target.value
    );
    setFilteredMateriales(filteredMateriales);
  };

  const SwAlertOk = () => {
    swal({
      title: "¡Éxito!",
      text: "Aplique creado correctamente",
      icon: "success",
    });
  };

  const SwAlertError = () => {
    swal({
      title: "¡Error!",
      text: "El aplique ya se encuentra registrado",
      icon: "error",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (Detalle === "") {
      console.log("Todos los campos son obligatorios");
      return;
    }

    crearAplique(
      Detalle,
      Categoria,
      UnidadMedida,
      MatAsociado,
      Ancho,
      Alto,
      Largo,
      Cantidad,
      Precio,
      Porcentaje
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
          height: "90%",
        }}
        className="CreateModal"
      >
        <form id="registerForm" onSubmit={handleSubmit}>
          <div className="d-flex justify-content-between mb-2">
            <h1 className="h3">Asignar Aplique</h1>
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
              <FormControl className="form-floating w-100">
                <InputLabel htmlFor="categoria">Categoría:</InputLabel>
                <Select
                  className="form-select my-3 w-100"
                  name="Categoria"
                  value={Categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                >
                  <MenuItem value="">
                    Seleccionar una categoría de Aplique
                  </MenuItem>
                  <MenuItem value="Fabricación Personal">
                    Fabricación Personal
                  </MenuItem>
                  <MenuItem value="Insumo Comprado">Insumo Comprado</MenuItem>
                  <MenuItem value="Porcentaje sobre Venta">
                    Porcentaje sobre Venta
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <DividerSecondary />
          <Grid container spacing={1} sx={{ marginTop: 1 }}>
            <Grid item sx={{ width: "50%" }}>
              <FormControl
                className="form-floating w-100"
                disabled={Categoria !== "Fabricación Personal"}
              >
                <InputLabel htmlFor="categoria">
                  Categoría Mat. Asociado:
                </InputLabel>
                <Select
                  className="form-select my-3 w-100"
                  name="MatCategoria"
                  value={MatCategoria}
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
              <FormControl
                className="form-floating w-100"
                disabled={Categoria !== "Fabricación Personal"}
              >
                <InputLabel>Material Asociado</InputLabel>
                <Select
                  className="form-select my-3 w-100"
                  name="Material Asociado"
                  value={MatAsociado}
                  onChange={(e) => setMatAsociado(e.target.value)}
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
          <Grid container spacing={1}>
            <Grid item sx={{ width: "40%" }}>
              <FormControl
                className="form-floating w-100"
                disabled={Categoria !== "Fabricación Personal"}
              >
                <InputLabel htmlFor="categoria">Unidad de Medida</InputLabel>
                <Select
                  className="form-select my-3 w-100"
                  name="UnidadMedida"
                  value={UnidadMedida}
                  onChange={(e) => setUnidadMedida(e.target.value)}
                >
                  <MenuItem value="">Seleccionar una unidad de medida</MenuItem>
                  <MenuItem value="Metro Lineal [ml.]">
                    Metro Lineal [ml.]
                  </MenuItem>
                  <MenuItem value="Metro Cuadrado [m2.]">
                    Metro Cuadrado [m2.]
                  </MenuItem>
                  <MenuItem value="Metro Cubico [m3.]">
                    Metro Cubico [m3.]
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item sx={{ width: "15%" }}>
              <TextField
                type="text"
                className="form-control my-3 w-100"
                name="Ancho"
                placeholder="Ancho"
                value={Ancho}
                onChange={(e) => setAncho(e.target.value)}
                label="Ancho"
                disabled={Categoria !== "Fabricación Personal"}
              />
            </Grid>
            <Grid item sx={{ width: "15%" }}>
              <TextField
                type="text"
                className="form-control my-3 w-100"
                name="Alto"
                placeholder="Alto"
                value={Alto}
                onChange={(e) => setAlto(e.target.value)}
                label="Alto"
                disabled={Categoria !== "Fabricación Personal"}
              />
            </Grid>
            <Grid item sx={{ width: "15%" }}>
              <TextField
                type="text"
                className="form-control my-3 w-100"
                name="Largo"
                placeholder="Largo"
                value={Largo}
                onChange={(e) => setLargo(e.target.value)}
                label="Largo"
                disabled={Categoria !== "Fabricación Personal"}
              />
            </Grid>
            <Grid item sx={{ width: "15%" }}>
              <TextField
                type="text"
                className="form-control my-3 w-100"
                name="Cantidad"
                placeholder="Cantidad"
                value={Cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                label="Cantidad"
                disabled={Categoria !== "Fabricación Personal"}
              />
            </Grid>
          </Grid>

          <DividerSecondary />
          <Grid container spacing={1} sx={{ marginTop: 1 }}>
            <Grid item sx={{ width: "30%" }}>
              <TextField
                type="text"
                className="form-control my-3 w-100"
                name="Precio"
                placeholder="Precio"
                value={Precio}
                onChange={(e) => setPrecio(e.target.value)}
                label="Precio"
                disabled={Categoria == "Porcentaje sobre Venta"}
              />
            </Grid>
            <Grid item sx={{ width: "30%" }}>
              <TextField
                type="percentaje"
                className="form-control my-3 w-100"
                name="Porcentaje"
                placeholder="Porcentaje"
                value={Porcentaje}
                onChange={(e) => setPorcentaje(e.target.value)}
                label="Porcentaje"
                disabled={Categoria !== "Porcentaje sobre Venta"}
              />
            </Grid>
          </Grid>

          <List>
            <ListItem sx={{ margin: 0, padding: 0 }}>
              <Typography variant="body2">Notas:</Typography>
            </ListItem>
            <ListItem sx={{ margin: 0, padding: 0 }}>
              <Typography variant="body2">
                - Categoria: Hace referencia a si el aplique es fabricado en la
                empresa, comprado a un proveedor, o si se cobra como porcentaje
                sobre los materiales de la hoja.
              </Typography>
            </ListItem>
            <ListItem sx={{ margin: 0, padding: 0 }}>
              <Typography variant="body2">
                - Unidad de Medida: La unidad de medida utilizada para cobrar el
                apliquue en el presupuesto.
              </Typography>
            </ListItem>
          </List>

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

export default AddApliqueModal;
