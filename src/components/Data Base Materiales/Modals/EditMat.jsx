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
import fetchMatByID from "../../../hooks/fetchMatByID";
import swal from "sweetalert";
import serverAPI from "../../../api/serverAPI";

const EditMaterial = ({ open, onClose, matID, onMatChange }) => {
  const [Codigo, setCodigo] = useState("");
  const [Detalle, setDetalle] = useState("");
  const [Unidad, setUnidad] = useState("");
  const [Categoria, setCategoria] = useState("");
  const [Ancho, setAncho] = useState(0);
  const [Alto, setAlto] = useState(0);
  const [Largo, setLargo] = useState(0);
  const [Espesor, setEspesor] = useState(0);
  const [Costo, setCosto] = useState(0);
  const [StockInicial, setStockInicial] = useState(0);
  const [StockSeguridad, setStockSeguridad] = useState(0);
  const [Proveedor, setProveedor] = useState("");
  const matByID = fetchMatByID(matID);

  useEffect(() => {
    if (
      matID !== null &&
      typeof matByID === "object" &&
      Object.keys(matByID).length > 0
    ) {
      setCodigo(matByID.Codigo ?? 0);
      setDetalle(matByID.Detalle ?? "");
      setCategoria(matByID.Categoria ?? "");
      setAncho(matByID.Ancho ?? 0);
      setAlto(matByID.Alto ?? 0);
      setLargo(matByID.Largo ?? 0);
      setEspesor(matByID.Espesor ?? 0);
      setCosto(matByID.Costo ?? 0);
      setUnidad(matByID.Unidad ?? "");
      setStockInicial(matByID.StockInicial ?? 0);
      setStockSeguridad(matByID.StockSeguridad ?? 0);
      setProveedor(matByID.Proveedor ?? "");
    }
  }, [matID, matByID]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (Codigo === "" || Detalle === "" || Categoria === "" || Costo === "") {
      return swal({
        title: "¡Error!",
        text: "Todos los campos son obligatorios",
        icon: "error",
      });
    }

    try {
      await serverAPI.put(`/mats/editMat/${matID}`, {
        Codigo,
        Detalle,
        Categoria,
        Unidad,
        Ancho,
        Alto,
        Largo,
        Espesor,
        Costo,
        StockSeguridad,
        StockInicial,
        Proveedor,
      });

      SwAlertOk();
      onClose();
      onMatChange();
    } catch (error) {
      console.error(error);
      SwAlertError();
    }
  };

  const SwAlertOk = () => {
    swal({
      title: "¡Éxito!",
      text: "Los datos del material se han actualizado correctamente",
      icon: "success",
    });
  };

  const SwAlertError = () => {
    swal({
      title: "¡Error!",
      text: "Hubo un error al actualizar los datos del material",
      icon: "error",
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
        {matByID && (
          <form id="matForm" onSubmit={handleSubmit}>
            <div className="d-flex justify-content-between mb-2">
              <h1 className="h3">Editar Material</h1>
              <HighlightOffIcon onClick={onClose} fontSize="large" />
            </div>

            <Grid display={"flex"}>
              <TextField
                type="text"
                className="form-control mt-3 w-75"
                name="Detalle"
                placeholder="Detalle"
                value={Detalle}
                onChange={(e) => setDetalle(e.target.value)}
                label="Detalle"
              />
              <FormControl className="form-floating w-25 ms-3">
                <InputLabel htmlFor="categoria">Unidad de Medida</InputLabel>
                <Select
                  className="form-select my-3 w-100"
                  name="Unidad"
                  value={Unidad}
                  onChange={(e) => setUnidad(e.target.value)}
                >
                  <MenuItem value="">Seleccionar una unidad de medida</MenuItem>
                  <MenuItem value="ml">Metro Lineal [ml.]</MenuItem>
                  <MenuItem value="m2">Metro cuadrado [m2.]</MenuItem>
                  <MenuItem value="m3">Metro cúbico [m3.]</MenuItem>
                  <MenuItem value="u">Unidad [u.]</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid display={"flex"}>
              <TextField
                type="text"
                className="form-control mt-3 w-50"
                name="Codigo"
                placeholder="Codigo"
                value={Codigo}
                onChange={(e) => setCodigo(e.target.value)}
                label="Codigo"
              />
              <FormControl className="form-floating w-50 ms-3">
                <InputLabel htmlFor="categoria">Categoría:</InputLabel>
                <Select
                  className="form-select my-3 w-100"
                  name="Categoria"
                  value={Categoria}
                  onChange={(e) => setCategoria(e.target.value)}
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
              <FormControl className="form-floating w-50 ms-3">
                <InputLabel htmlFor="categoria">Proveedor</InputLabel>
                <Select
                  className="form-select my-3 w-100"
                  name="Proveedor"
                  value={Proveedor}
                  onChange={(e) => setProveedor(e.target.value)}
                >
                  <MenuItem value="">Seleccionar un Proveedor</MenuItem>
                  <MenuItem value="Rehau S.A.">Rehau S.A.</MenuItem>
                  <MenuItem value="Vidrial S.R.L">Vidrial S.R.L</MenuItem>
                  <MenuItem value="Magnum Herrajes">Magnum Herrajes</MenuItem>
                  <MenuItem value="G.U. Herrajes">G.U. Herrajes</MenuItem>
                  <MenuItem value="Madergold">Madergold</MenuItem>
                  <MenuItem value="Maderplak">Maderplak</MenuItem>
                  <MenuItem value="Vancar">Vancar</MenuItem>
                  <MenuItem value="Würth">Würth</MenuItem>
                  <MenuItem value="Pinturería Silva">Pinturería Silva</MenuItem>
                  <MenuItem value="Cromosol">Cromosol</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid display={"flex"}>
              <TextField
                type="text"
                className="form-control my-3 me-3 w-25"
                name="Ancho"
                placeholder="Ancho"
                value={Ancho}
                onChange={(e) => setAncho(e.target.value)}
                label="Ancho [mm]"
              />
              <TextField
                type="text"
                className="form-control my-3 me-3 w-25"
                name="Alto"
                placeholder="Alto"
                value={Alto}
                onChange={(e) => setAlto(e.target.value)}
                label="Alto [mm]"
              />
              <TextField
                type="text"
                className="form-control mt-3 me-3 w-25"
                name="Largo"
                placeholder="Largo"
                value={Largo}
                onChange={(e) => setLargo(e.target.value)}
                label="Largo [mm]"
              />
              <TextField
                type="text"
                className="form-control mt-3 w-25"
                name="Espesor"
                placeholder="Espesor"
                value={Espesor}
                onChange={(e) => setEspesor(e.target.value)}
                label="Espesor [mm]"
              />
            </Grid>

            <Grid display={"flex"} className="w-100">
              <TextField
                type="text"
                className="form-control my-3 me-3 w-50"
                name="StockInicial"
                placeholder="StockInicial"
                value={StockInicial}
                onChange={(e) => setStockInicial(e.target.value)}
                label="Stock Inicial"
              />
              <TextField
                type="text"
                className="form-control my-3 me-3 w-50"
                name="StockSeguridad"
                placeholder="StockSeguridad"
                value={StockSeguridad}
                onChange={(e) => setStockSeguridad(e.target.value)}
                label="Stock de Seguridad"
              />
              <TextField
                type="text"
                className="form-control my-3 w-50"
                name="Costo"
                placeholder="Costo"
                value={Costo}
                onChange={(e) => setCosto(e.target.value)}
                label="Costo Unitario"
              />
            </Grid>

            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              className="mt-4"
            >
              Guardar Información
            </Button>
          </form>
        )}
      </Paper>
    </Modal>
  );
};

export default EditMaterial;
