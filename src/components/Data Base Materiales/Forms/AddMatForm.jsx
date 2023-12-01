import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { crearMaterial } from "../../../hooks/Materiales/crearMaterial";

const AddMatForm = ({ onClose, onMatSubmit }) => {
  const [Codigo, setCodigo] = useState("");
  const [Descripcion, setDescripcion] = useState("");
  const [Unidad, setUnidad] = useState("");
  const [Categoria, setCategoria] = useState("");
  const [Ancho, setAncho] = useState(0);
  const [Alto, setAlto] = useState(0);
  const [Largo, setLargo] = useState(0);
  const [Espesor, setEspesor] = useState(0);
  const [Costo, setCosto] = useState(0);
  const [Stock, setStock] = useState("");
  const [StockSeguridad, setStockSeguridad] = useState("");
  const [Proveedor, setProveedor] = useState("");
  const [InvLog, setInvLog] = useState([]);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (
      Codigo === "" ||
      Descripcion === "" ||
      Categoria === "" ||
      Costo === ""
    ) {
      return swal({
        title: "¡Error!",
        text: "Todos los campos son obligatorios",
        icon: "error",
      });
    }

    crearMaterial(
      Codigo,
      Descripcion,
      Categoria,
      Unidad,
      Ancho,
      Alto,
      Largo,
      Espesor,
      Costo,
      StockSeguridad,
      Stock,
      Proveedor,
      InvLog
    );

    setCodigo("");
    setDescripcion("");
    setCategoria("");
    setAncho(0);
    setAlto(0);
    setLargo(0);
    setEspesor(0);
    setCosto(0);
    setUnidad("");
    setStock(0);
    setStockSeguridad(0);
    setProveedor("");
    onMatSubmit();
    onClose();
  };

  return (
    <form id="matForm" onSubmit={handleFormSubmit}>
      <div className="d-flex justify-content-between mb-2">
        <h1 className="h3">Agregar Material</h1>
        <HighlightOffIcon onClick={onClose} fontSize="large" />
      </div>

      <Grid display={"flex"}>
        <TextField
          type="text"
          className="form-control mt-3 w-75"
          name="Descripcion"
          placeholder="Descripcion"
          value={Descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          label="Descripcion"
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
            <MenuItem value="">Seleccionar una categoría de producto</MenuItem>
            <MenuItem value="Perfileria de PVC">Perfilería de PVC</MenuItem>
            <MenuItem value="Madera Maciza y Alistonados">
              Madera Maciza y Alistonados
            </MenuItem>
            <MenuItem value="Placas de MDF y Cantos">
              Placas de MDF y Cantos
            </MenuItem>
            <MenuItem value="Deck y Revestimientos de WPC">
              Deck y Revestimientos de WPC
            </MenuItem>
            <MenuItem value="Insumos de Lustre">Insumos de Lustre</MenuItem>
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
          name="Stock"
          placeholder="Stock"
          value={Stock}
          onChange={(e) => setStock(e.target.value)}
          label="Stock"
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
        Agregar Material
      </Button>
    </form>
  );
};

export default AddMatForm;
