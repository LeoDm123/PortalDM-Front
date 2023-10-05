import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

const AgregarProdInfo = ({ open, onClose }) => {
  const [categoria, setCategoria] = useState("");
  const [unit, setUnit] = useState("");
  const [info, setInfo] = useState([]);

  useEffect(() => {
    // Retrieve existing materials from local storage and parse the JSON data
    const storedInfo = JSON.parse(localStorage.getItem("info"));
    // If there are existing materials, set them in the state
    if (storedInfo && Array.isArray(storedInfo)) {
      setInfo(storedInfo);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Retrieve the form values using the "name" attribute
    const infoDetail =
      event.currentTarget.elements.namedItem("detailInput").value;

    const infoValue = parseFloat(
      event.currentTarget.elements.namedItem("valueInput").value
    );

    const infoUnit = event.currentTarget.elements.namedItem("unitInput").value;

    const infoDescription =
      event.currentTarget.elements.namedItem("descriptionInput").value;

    const infoCategory =
      event.currentTarget.elements.namedItem("catInput").value;

    // Create a user object to save in local storage
    const newInfo = {
      infoDetail,
      infoValue,
      infoUnit,
      infoCategory,
      infoDescription,
    };

    // Push the new material object into the existing materials array
    const updatedInfo = [...info, newInfo];

    // Save the updated materials array to local storage
    localStorage.setItem("info", JSON.stringify(updatedInfo));

    // Clear the form after submission (optional)
    event.currentTarget.reset();
    setCategoria("");
    setUnit("");
    // window.location.href = "/BaseDatosMats"; // If you redirect, the state will be reset anyway

    // Optionally, you can update the state with the new materials
    setInfo(updatedInfo);
  };

  const handleCatChange = (e) => {
    setCategoria(e.target.value);
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
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
            <Typography variant="h6">Agregar Datos de Producción</Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </div>

          {/* DETALLE */}
          <div className="d-flex flex-direction-row">
            <div className="w-100 me-3">
              <div className="form-floating">
                <TextField
                  type="text"
                  fullWidth
                  name="detailInput" // Use "name" attribute to access the input in the event target
                  label="Detalle"
                  variant="outlined"
                />
              </div>
              {/* VALOR */}
              <div className="d-flex">
                <div className="form-floating me-2">
                  <TextField
                    type="text"
                    fullWidth
                    name="valueInput" // Use "name" attribute to access the input in the event target
                    label="Valor"
                    variant="outlined"
                  />
                </div>
                {/* UNIDAD DE MEDIDA */}
                <div className="form-floating me-2 w-25">
                  <Select
                    fullWidth
                    name="unitInput"
                    value={unit}
                    onChange={handleUnitChange}
                    label="Unidad de Medida"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="m">m.</MenuItem>
                    <MenuItem value="ml">ml.</MenuItem>
                    <MenuItem value="m2">m2.</MenuItem>
                    <MenuItem value="m3">m3.</MenuItem>
                    <MenuItem value="u.">u.</MenuItem>
                    <MenuItem value="lt">lt.</MenuItem>
                    {/* Add more options as needed */}
                  </Select>
                </div>
                {/* CATEGORÍA */}
                <div className="form-floating w-50">
                  <Select
                    fullWidth
                    name="catInput"
                    value={categoria}
                    onChange={handleCatChange}
                    label="Categoría"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="Puertas Placas">Puertas Placas</MenuItem>
                    <MenuItem value="Peldaños de Escalera">
                      Peldaños de Escalera
                    </MenuItem>
                    <MenuItem value="Deck de WPC">Deck de WPC</MenuItem>
                    {/* Add more options as needed */}
                  </Select>
                </div>
              </div>

              {/* DESCRIPCIÓN*/}
              <div className="form-floating">
                <TextField
                  type="text"
                  fullWidth
                  name="descriptionInput" // Use "name" attribute to access the input in the event target
                  label="Descripción"
                  variant="outlined"
                  multiline
                  rows={4}
                />
              </div>
            </div>
          </div>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            style={{ marginTop: "1rem" }}
          >
            Agregar Información
          </Button>
        </form>
      </Paper>
    </Modal>
  );
};

export default AgregarProdInfo;
