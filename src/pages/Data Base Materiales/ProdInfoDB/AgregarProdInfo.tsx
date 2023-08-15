import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Title from "../../../components/Title";
import CloseButton from "../../../components/CloseButton";

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
    const infoDetail = (
      event.currentTarget.elements.namedItem("detailInput") as HTMLInputElement
    ).value;

    const infoValue = parseFloat(
      (event.currentTarget.elements.namedItem("valueInput") as HTMLInputElement)
        .value
    );

    const infoUnit = (
      event.currentTarget.elements.namedItem("unitInput") as HTMLInputElement
    ).value;

    const infoDescription = (
      event.currentTarget.elements.namedItem(
        "descriptionInput"
      ) as HTMLInputElement
    ).value;

    const infoCategory = (
      event.currentTarget.elements.namedItem("catInput") as HTMLInputElement
    ).value;

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
            <Title>Agergar Datos de Producción</Title>
            <CloseButton handleClick={onClose} />
          </div>

          {/* DETALLE */}
          <div className="d-flex flex-direction-row">
            <div className="w-100 me-3">
              <div className="form-floating">
                <input
                  type="name"
                  className="form-control w-100"
                  name="detailInput" // Use "name" attribute to access the input in the event target
                  placeholder="Detalle"
                />
                <label htmlFor="detailInput">Detalle</label>
              </div>
              {/* VALOR */}
              <div className="d-flex">
                <div className="form-floating me-2">
                  <input
                    type="text"
                    className="form-control mt-3"
                    name="valueInput" // Use "name" attribute to access the input in the event target
                    placeholder="Valor"
                  />
                  <label htmlFor="valueInput">Valor</label>
                </div>
                {/* UNIDAD DE MEDIDA */}
                <div className="form-floating me-2 w-25">
                  <select
                    className="form-select mt-3"
                    name="unitInput"
                    value={unit}
                    onChange={handleUnitChange}
                    placeholder="Unidad de Medida"
                  >
                    <option value="" disabled />
                    <option value="m">m.</option>
                    <option value="ml">ml.</option>
                    <option value="m2">m2.</option>
                    <option value="m3">m3.</option>
                    <option value="u.">u.</option>
                    <option value="lt">lt.</option>

                    {/* Add more options as needed */}
                  </select>
                  <label htmlFor="unitInput">Unidad de Medida</label>
                </div>
                {/* CATEGORÍA */}
                <div className="form-floating w-50">
                  <select
                    className="form-select mt-3"
                    name="catInput"
                    value={categoria}
                    onChange={handleCatChange}
                    placeholder="Categoría"
                  >
                    <option value="" disabled />
                    <option value="Puertas Placas">Puertas Placas</option>
                    <option value="Peldaños de Escalera">
                      Peldaños de Escalera
                    </option>
                    <option value="Deck de WPC">Deck de WPC</option>

                    {/* Add more options as needed */}
                  </select>
                  <label htmlFor="catInput">Categoría</label>
                </div>
              </div>

              {/* DESCRIPCIÓN*/}
              <div className="form-floating">
                <input
                  type="text"
                  maxLength={200}
                  className="form-control w-100 mt-3"
                  name="descriptionInput" // Use "name" attribute to access the input in the event target
                  placeholder="Descripción"
                />
                <label htmlFor="descriptionInput">Descripción</label>
              </div>
            </div>
          </div>
          <button className="btn btn-primary w-25 py-2 mt-4" type="submit">
            Agregar Información
          </button>
        </form>
      </Paper>
    </Modal>
  );
};

export default AgregarProdInfo;
