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
import fetchMats from "../../../hooks/Materiales/fetchMats";
import getCurrentDate from "../../../hooks/getCurrentDate";
import { crearLog } from "../../../hooks/Inventario/crearLog";
import serverAPI from "../../../api/serverAPI";

const AddMovInvForm = ({ onClose, onMatSubmit }) => {
  const Today = getCurrentDate();
  const MatsData = fetchMats();
  const [Comentario, setComentario] = useState("");
  const [Codigo, setCodigo] = useState("");
  const [MatID, setMatID] = useState("");
  const [Fecha, setFecha] = useState(Today);
  const [Unidad, setUnidad] = useState("");
  const [NroPedido, setNroPedido] = useState("");
  const [Descripcion, setDescripcion] = useState("");
  const [Categoria, setCategoria] = useState("");
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  const [TipoMov, setTipoMov] = useState("");
  const [Cantidad, setCantidad] = useState("");

  console.log("DATA", MatsData);

  useEffect(() => {
    if (Categoria === "") {
      setFilteredMaterials(MatsData);
    } else {
      const filtered = MatsData.filter(
        (material) => material.Categoria === Categoria
      );
      setFilteredMaterials(filtered);
    }
  }, [Categoria, MatsData]);

  console.log("FILTERED", filteredMaterials);

  useEffect(() => {
    const selectedMaterial = MatsData.find(
      (material) => material.Descripcion === Descripcion
    );
    console.log("Selected", selectedMaterial);
    if (selectedMaterial) {
      setCodigo(selectedMaterial.Codigo);
      setUnidad(selectedMaterial.Unidad);
      setMatID(selectedMaterial._id);
    } else {
      setCodigo("");
    }
  }, [Descripcion, MatsData]);

  console.log("Descripcion", Descripcion);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (Codigo === "" || Descripcion === "" || Categoria === "") {
      return swal({
        title: "¡Error!",
        text: "Todos los campos son obligatorios",
        icon: "error",
      });
    }

    crearLog(
      Codigo,
      Descripcion,
      Fecha,
      NroPedido,
      TipoMov,
      Cantidad,
      Unidad,
      Comentario
    );

    try {
      await serverAPI.put(`/mats/retirarIngresarMat/${MatID}`, {
        TipoMov,
        Cantidad,
        Fecha,
        Unidad,
      });

      SwAlertOk();
      onClose();
      onMatChange();
    } catch (error) {
      console.error(error);
      SwAlertError();
    }
  };

  return (
    <form id="matForm" onSubmit={handleFormSubmit}>
      <div className="d-flex justify-content-between mb-2">
        <h1 className="h3">Agregar Movimiento de Inventario</h1>
        <HighlightOffIcon onClick={onClose} fontSize="large" />
      </div>

      <Grid display={"flex"}>
        <FormControl className="form-floating w-50">
          <InputLabel htmlFor="categoria">Categoría:</InputLabel>
          <Select
            className="form-select mt-3 w-100"
            name="Categoria"
            value={Categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <MenuItem value="">Seleccionar una categoría de producto</MenuItem>
            <MenuItem value="Perfilería de PVC">Perfilería de PVC</MenuItem>
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
        <FormControl className="form-floating w-75 ms-3">
          <InputLabel htmlFor="categoria">Material</InputLabel>
          <Select
            className="form-select mt-3 w-100"
            name="Descripcion"
            value={Descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          >
            <MenuItem value="">Seleccionar un material</MenuItem>
            {Array.isArray(filteredMaterials) &&
              filteredMaterials.map((material) => (
                <MenuItem key={material._id} value={material.Descripcion}>
                  {material.Descripcion}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid display={"flex"}>
        <TextField
          type="text"
          className="form-control my-3 w-25 me-3"
          name="Codigo"
          placeholder="Codigo"
          value={Codigo}
          onChange={(e) => setCodigo(e.target.value)}
          label="Codigo"
        />
        <TextField
          type="date"
          className="form-control my-3 w-25 me-3"
          name="Fecha"
          placeholder="Fecha"
          value={Fecha}
          onChange={(e) => setFecha(e.target.value)}
          label="Fecha"
        />
        <FormControl className="form-floating w-25">
          <InputLabel htmlFor="categoria">Tipo de Movimiento:</InputLabel>
          <Select
            className="form-select my-3 w-100"
            name="TipoMov"
            value={TipoMov}
            onChange={(e) => setTipoMov(e.target.value)}
          >
            <MenuItem value="">Seleccionar un tipo de movimiento</MenuItem>
            <MenuItem value="Ingreso">Ingreso</MenuItem>
            <MenuItem value="Egreso">Egreso</MenuItem>
          </Select>
        </FormControl>
        <TextField
          type="number"
          className="form-control my-3 w-25 ms-3"
          name="Cantidad"
          placeholder="Cantidad"
          value={Cantidad}
          onChange={(e) => setCantidad(parseFloat(e.target.value))}
          label="Cantidad"
        />
      </Grid>

      <Grid>
        <TextField
          type="text"
          className="form-control mb-3 w-100"
          name="Comentario"
          placeholder="Comentario"
          value={Comentario}
          onChange={(e) => setComentario(e.target.value)}
          label="Comentario"
        />
      </Grid>

      <Button
        variant="contained"
        color="primary"
        size="large"
        type="submit"
        className="mt-2"
      >
        Agregar Mov. Inventario
      </Button>
    </form>
  );
};

export default AddMovInvForm;
