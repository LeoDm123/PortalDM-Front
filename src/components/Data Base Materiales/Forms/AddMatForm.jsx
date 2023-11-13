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
import { crearMaterial } from "../../../hooks/crearMaterial";

const AddMatForm = ({ onClose }) => {
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

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (Codigo === "" || Detalle === "" || Categoria === "" || Costo === "") {
      return swal({
        title: "¡Error!",
        text: "Todos los campos son obligatorios",
        icon: "error",
      });
    }

    crearMaterial(
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
      Proveedor
    );

    setCodigo("");
    setDetalle("");
    setCategoria("");
    setAncho(0);
    setAlto(0);
    setLargo(0);
    setEspesor(0);
    setCosto(0);
    setUnidad("");
    setStockInicial(0);
    setStockSeguridad(0);
    setProveedor("");
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
            <MenuItem value="">Seleccionar una categoría de producto</MenuItem>
            <MenuItem value="Perfileria">Perfilería de PVC</MenuItem>
            <MenuItem value="MadMaciza">Madera Maciza y Alistonados</MenuItem>
            <MenuItem value="PlacasMDF">Placas de MDF y Cantos</MenuItem>
            <MenuItem value="DeckWPC">Deck y Revestimientos de WPC</MenuItem>
            <MenuItem value="Lustre">Insumos de Lustre</MenuItem>
            <MenuItem value="Varios">Insumos Varios</MenuItem>
            <MenuItem value="HerrajesMad">
              Herrajes para Aberturas de PVC
            </MenuItem>
            <MenuItem value="HerrajesPVC">
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
            <MenuItem value="Rehau">Rehau S.A.</MenuItem>
            <MenuItem value="Vidrial">Vidrial S.R.L</MenuItem>
            <MenuItem value="Magnum">Magnum Herrajes</MenuItem>
            <MenuItem value="GU">G.U. Herrajes</MenuItem>
            <MenuItem value="Madergold">Madergold</MenuItem>
            <MenuItem value="Maderplak">Maderplak</MenuItem>
            <MenuItem value="Vancar">Vancar</MenuItem>
            <MenuItem value="Würth">Würth</MenuItem>
            <MenuItem value="Silva">Pinturería Silva</MenuItem>
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
        Agregar Material
      </Button>
    </form>
  );
};

export default AddMatForm;
