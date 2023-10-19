import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Title from "../../../components/Title";
import CloseButton from "../../../components/CloseButton";
import swal from "sweetalert";

const AgregarMat = ({ open, onClose }) => {
  const [categoria, setCategoria] = useState("");
  const [materials, setMaterials] = useState([]);

  const SwAlert = () => {
    swal({
      title: "¡Éxito!",
      text: "El material se agregó correctamente",
      icon: "success",
    });
  };

  useEffect(() => {
    // Retrieve existing materials from local storage and parse the JSON data
    const storedMaterials = JSON.parse(localStorage.getItem("materials"));
    // If there are existing materials, set them in the state
    if (storedMaterials && Array.isArray(storedMaterials)) {
      setMaterials(storedMaterials);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Retrieve the form values using the "name" attribute
    const matDetail =
      event.currentTarget.elements.namedItem("detailInput").value;

    const matAncho = parseFloat(
      event.currentTarget.elements.namedItem("anchoInput").value
    );

    const matAlto = parseFloat(
      event.currentTarget.elements.namedItem("altoInput").value
    );

    const matLargo = parseFloat(
      event.currentTarget.elements.namedItem("largoInput").value
    );

    const matEspesor = parseFloat(
      event.currentTarget.elements.namedItem("espesorInput").value
    );

    const matCategory =
      event.currentTarget.elements.namedItem("catInput").value;

    const matProveedor =
      event.currentTarget.elements.namedItem("proveedorInput").value;

    const matPrice = parseFloat(
      event.currentTarget.elements.namedItem("priceInput").value
    );

    // Create a user object to save in local storage
    const newMaterial = {
      matDetail,
      matAncho,
      matAlto,
      matLargo,
      matEspesor,
      matCategory,
      matProveedor,
      matPrice,
    };

    // Push the new material object into the existing materials array
    const updatedMaterials = [...materials, newMaterial];

    // Save the updated materials array to local storage
    localStorage.setItem("materials", JSON.stringify(updatedMaterials));

    // Clear the form after submission (optional)
    event.currentTarget.reset();
    setCategoria("");
    // window.location.href = "/BaseDatosMats"; // If you redirect, the state will be reset anyway

    // Optionally, you can update the state with the new materials
    setMaterials(updatedMaterials);

    // Alert
    SwAlert();
  };

  const handleCatChange = (e) => {
    setCategoria(e.target.value);
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
            <Title>Agregar Material</Title>
            <CloseButton handleClick={onClose} />
          </div>

          {/* DETALLE */}
          <div className="d-flex flex-direction-row">
            <div className="w-100 me-3">
              <div className="form-floating">
                <input
                  type="name"
                  className="form-control w-100"
                  name="detailInput"
                  placeholder="Nombre o Razón Social"
                />
                <label htmlFor="detailInput">Detalle del material</label>
              </div>
              {/* DIMENSIONES */}
              <div className="d-flex">
                {/* ANCHO */}
                <div className="form-floating me-2">
                  <input
                    type="text"
                    className="form-control mt-3"
                    name="anchoInput"
                    placeholder="Ancho"
                  />
                  <label htmlFor="anchoInput">Ancho [m.]</label>
                </div>
                {/* ALTO */}
                <div className="form-floating me-2">
                  <input
                    type="text"
                    className="form-control mt-3"
                    name="altoInput"
                    placeholder="Alto"
                  />
                  <label htmlFor="altoInput">Alto [m.]</label>
                </div>
                {/* LARGO */}
                <div className="form-floating me-2">
                  <input
                    type="text"
                    className="form-control mt-3"
                    name="largoInput"
                    placeholder="Largo"
                  />
                  <label htmlFor="largoInput">Largo [m.]</label>
                </div>
                {/* ESPESOR */}
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control mt-3"
                    name="espesorInput"
                    placeholder="Espesor"
                  />
                  <label htmlFor="espesorInput">Espesor [mm.]</label>
                </div>
              </div>

              {/* CATEGORIA */}
              <div className="form-floating">
                <select
                  className="form-select mt-3 w-100"
                  name="catInput"
                  value={categoria}
                  onChange={handleCatChange}
                  placeholder=""
                >
                  <option value="" disabled />
                  <option value="Madera Maciza y Alistonados">
                    Madera Maciza y Alistonados
                  </option>
                  <option value="Placas de MDF y Cantos">
                    Placas de MDF y Cantos
                  </option>
                  <option value="Deck y Revestimientos de WPC">
                    Deck y Revestimientos de WPC
                  </option>
                  <option value="Insumos de Lustre">Insumos de Lustre</option>
                  <option value="Insumos Varios">Insumos Varios</option>
                  {/* Add more options as needed */}
                </select>
                <label htmlFor="ivaInput">Categoría</label>
              </div>
              {/* PROVEEDOR */}
              <div className="form-floating">
                <input
                  type="name"
                  maxLength={20}
                  className="form-control w-100 mt-3"
                  name="proveedorInput"
                  placeholder="Proveedor"
                />
                <label htmlFor="proveedorInput">Proveedor</label>
              </div>
              {/* PRECIO SIN IVA */}
              <div className="form-floating">
                <input
                  type="text"
                  min={0}
                  maxLength={14}
                  className="form-control w-100 mt-3"
                  name="priceInput"
                  placeholder="Precio sin IVA"
                />
                <label htmlFor="priceInput">Precio sin IVA</label>
              </div>
            </div>
          </div>
          <button className="btn btn-primary w-25 py-2 mt-4" type="submit">
            Agregar Material
          </button>
        </form>
      </Paper>
    </Modal>
  );
};

export default AgregarMat;
