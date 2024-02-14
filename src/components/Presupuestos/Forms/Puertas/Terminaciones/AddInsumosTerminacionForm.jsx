import React, { useState, useEffect } from "react";
import {
  Typography,
  Table,
  TableHead,
  TableBody,
  IconButton,
  TableCell,
  TableRow,
  Grid,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import PostAddIcon from "@mui/icons-material/PostAdd";
import DeleteButton from "../../../../DeleteButton";
import fetchMats from "../../../../../hooks/Materiales/fetchMats";

const AddInsumosTerminacionForm = ({ onMaterialesChange }) => {
  const Materiales = fetchMats();
  const [FilteredMateriales, setFilteredMateriales] = useState([]);
  const [materiales, setMateriales] = useState([]);
  const [MatId, setMatId] = useState("");
  const [nuevoMaterial, setNuevoMaterial] = useState({
    Descripcion: "",
    Unidad: "",
    Presentacion: 0,
    Cantidad: 0,
    ID: MatId,
  });

  useEffect(() => {
    if (nuevoMaterial.Descripcion) {
      const selectedMaterial = Materiales.find(
        (material) => material.Descripcion === nuevoMaterial.Descripcion
      );
      if (selectedMaterial) {
        setNuevoMaterial((prevMaterial) => ({
          ...prevMaterial,
          ID: selectedMaterial._id,
        }));
      }
    }
  }, [nuevoMaterial.Descripcion, Materiales]);

  useEffect(() => {
    const filteredMateriales = Materiales.filter(
      (material) => material.Categoria === "Insumos de Lustre"
    );
    setFilteredMateriales(filteredMateriales);
  }, [Materiales]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoMaterial((prevMaterial) => ({
      ...prevMaterial,
      [name]: value,
    }));
  };

  const handleAddMaterial = () => {
    const nuevosMateriales = [...materiales, nuevoMaterial];
    setMateriales(nuevosMateriales);
    onMaterialesChange(nuevosMateriales);
    setNuevoMaterial({
      Descripcion: "",
      Unidad: "",
      Presentacion: 0,
      Cantidad: 0,
      ID: MatId,
    });
  };

  const handleDeleteMaterial = (index) => {
    const nuevosMateriales = [...materiales];
    nuevosMateriales.splice(index, 1);
    setMateriales(nuevosMateriales);
    onMaterialesChange(nuevosMateriales);
  };

  return (
    <form id="matForm">
      <Grid>
        <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid sx={{ width: "55%" }}>
            <FormControl className="form-floating w-100">
              <InputLabel>Material Asociado</InputLabel>

              <Select
                className="form-select my-3 w-100"
                name="Descripcion"
                value={nuevoMaterial.Descripcion}
                onChange={handleInputChange}
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

          <Grid sx={{ width: "10%", marginTop: 2 }}>
            <TextField
              type="number"
              name="Presentacion"
              value={nuevoMaterial.Presentacion}
              onChange={handleInputChange}
              label="Presentacion"
            />
          </Grid>
          <Grid sx={{ width: "10%", marginTop: 2 }}>
            <TextField
              type="number"
              name="Cantidad"
              value={nuevoMaterial.Cantidad}
              onChange={handleInputChange}
              label="Cantidad"
            />
          </Grid>
          <Grid sx={{ width: "20%" }}>
            <FormControl className="form-floating w-100">
              <InputLabel htmlFor="categoria">Unidad de Medida</InputLabel>
              <Select
                className="form-select my-3 w-100"
                name="Unidad"
                value={nuevoMaterial.Unidad}
                onChange={handleInputChange}
              >
                <MenuItem value="">Seleccionar una unidad de medida</MenuItem>
                <MenuItem value="Centimetro Cubico [cc.]">
                  Centimetro Cubico [cc.]
                </MenuItem>
                <MenuItem value="Litro [lt.]">Litro [lt.]</MenuItem>
                <MenuItem value="Unidad [u.]">Unidad [u.]</MenuItem>
                <MenuItem value="Gramo [gr.]">Gramo [gr.]</MenuItem>
                <MenuItem value="Kilogramo [kg.]">Kilogramo [kg.]</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <IconButton onClick={handleAddMaterial}>
            <PostAddIcon />
          </IconButton>
        </Grid>
        <Grid
          sx={{
            mb: 1,
            display: "flex",
            flexDirection: "column",
            height: 210,
            overflow: "auto",
            scrollbarWidth: "thin",
            scrollbarColor: "dark",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "lightgray",
              borderRadius: "5px",
            },
          }}
        >
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ backgroundColor: "#E1E3E1", width: "60%" }}
                  className="text-center fw-bold"
                >
                  Descripcion
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "#E1E3E1", width: "20%" }}
                  className="text-center fw-bold"
                >
                  Presentación
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "#E1E3E1", width: "20%" }}
                  className="text-center fw-bold"
                >
                  Cantidad
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "#E1E3E1" }}
                  className="text-center fw-bold"
                ></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {materiales.map((material, index) => (
                <TableRow key={index}>
                  <TableCell className="text-center">
                    {material.Descripcion}
                  </TableCell>
                  <TableCell className="text-center">
                    {material.Presentacion + " " + material.Unidad}
                  </TableCell>
                  <TableCell className="text-center">
                    {material.Cantidad + " " + material.Unidad}
                  </TableCell>
                  <TableCell className="text-center">
                    <DeleteButton
                      onDelete={() => handleDeleteMaterial(index)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddInsumosTerminacionForm;
