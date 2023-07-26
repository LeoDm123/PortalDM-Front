import React from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const CrearCuenta = ({ open, onClose }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Retrieve the form values using the "name" attribute
    const userName = (
      event.currentTarget.elements.namedItem("nameInput") as HTMLInputElement
    ).value;

    const userApellido = (
      event.currentTarget.elements.namedItem(
        "ApellidoInput"
      ) as HTMLInputElement
    ).value;

    const userIVACond = (
      event.currentTarget.elements.namedItem("ivaInput") as HTMLInputElement
    ).value;

    const passwordConfirmation = (
      event.currentTarget.elements.namedItem(
        "passwordConfirmationInput"
      ) as HTMLInputElement
    ).value;

    const userDNI = (
      event.currentTarget.elements.namedItem("dniInput") as HTMLInputElement
    ).value;

    const userCUIT = (
      event.currentTarget.elements.namedItem("cuitInput") as HTMLInputElement
    ).value;

    const userAdress = (
      event.currentTarget.elements.namedItem("adressInput") as HTMLInputElement
    ).value;

    const userTel = (
      event.currentTarget.elements.namedItem("telInput") as HTMLInputElement
    ).value;

    const userEmail = (
      event.currentTarget.elements.namedItem("emailInput") as HTMLInputElement
    ).value;

    // Create a user object to save in local storage
    const client = {
      userName,
      userApellido,
      userIVACond,
      passwordConfirmation,
      userDNI,
      userCUIT,
      userAdress,
      userTel,
      userEmail,
    };

    // Save the user object to local storage
    localStorage.setItem("client", JSON.stringify(client));

    // Clear the form after submission (optional)
    event.currentTarget.reset();
    window.location.href = "/";
  };

  //xxxxxxxxxxxxxxxxxxx CONDICION DE IVA xxxxxxxxxxxxxxxxxxxxxxxxxx//
  const [selectedIVA, setSelectedIVA] = useState("");

  const handleIVAChange = (e) => {
    setSelectedIVA(e.target.value);
  };
  //xxxxxxxxxxxxxxxxxxx CUIT FORMAT xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx//
  const [cuit, setCuit] = useState("");

  const handleCUITChange = (e) => {
    // Remove any non-numeric characters from the input
    const inputNumber = e.target.value.replace(/\D/g, "");

    // Pad the number with leading zeros to ensure a length of 11 characters
    const paddedNumber = inputNumber.padStart(11, "");

    // Format the number with the desired pattern xx-xxxxxxxx-x
    const formattedCuit = `${paddedNumber.substring(
      0,
      2
    )}-${paddedNumber.substring(2, 10)}-${paddedNumber.charAt(10)}`;

    // Update the state with the formatted value
    setCuit(formattedCuit);
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
            <h1 className="h3">Ingresar Cliente</h1>
            <HighlightOffIcon onClick={onClose} fontSize="large" />
          </div>

          {/* NOMBRE O RAZON SOCIAL */}
          <div className="d-flex flex-direction-row">
            <div className="w-100 me-3">
              <div className="form-floating">
                <input
                  type="name"
                  className="form-control w-100"
                  name="nameInput" // Use "name" attribute to access the input in the event target
                  placeholder="Nombre o Razon Social"
                />
                <label htmlFor="userInput">Nombre o Razon Social</label>
              </div>
              {/* APELLIDO */}
              <div className="form-floating">
                <input
                  type="name"
                  className="form-control mt-3 w-100"
                  name="apellidoInput" // Use "name" attribute to access the input in the event target
                  placeholder="Apellido"
                />
                <label htmlFor="apellidoInput">Apellido</label>
              </div>
              {/* CONDICION IVA */}
              <div className="form-floating">
                <select
                  className="form-select mt-3 w-100"
                  name="ivaInput"
                  value={selectedIVA}
                  onChange={handleIVAChange}
                  placeholder=""
                >
                  <option value="" disabled />
                  <option value="Responsable Inscripto">
                    Responsable Inscripto
                  </option>
                  <option value="Consumidor Final">Consumidor Final</option>
                  <option value="Monotributista">Monotributista</option>
                  <option value="Exento">Exento</option>
                  {/* Add more options as needed */}
                </select>
                <label htmlFor="ivaInput">Condición de IVA</label>
              </div>
              {/* DNI */}
              <div className="form-floating">
                <input
                  type="number"
                  min={0}
                  maxLength={8}
                  className="form-control w-100 mt-3"
                  name="dniInput" // Use "name" attribute to access the input in the event target
                  placeholder="Numero de Documento"
                />
                <label htmlFor="dniInput">Numero de Documento</label>
              </div>
              {/* CUIT */}
              <div className="form-floating">
                <input
                  type="text"
                  min={0}
                  maxLength={14}
                  className="form-control w-100 mt-3"
                  name="cuitInput" // Use "name" attribute to access the input in the event target
                  placeholder="xx-xxxxxxxx-x"
                  value={cuit}
                  onChange={handleCUITChange}
                />
                <label htmlFor="cuitInput">CUIT</label>
              </div>
            </div>

            {/* DIRECCION */}
            <div className="w-100">
              <div className="form-floating">
                <input
                  type="name"
                  className="form-control w-100"
                  name="adressInput" // Use "name" attribute to access the input in the event target
                  placeholder="Dirección"
                />
                <label htmlFor="adressInput">Dirección</label>
              </div>
              {/* TELEFONO */}
              <div className="form-floating">
                <input
                  type="number"
                  className="form-control mt-3 w-100"
                  name="telInput" // Use "name" attribute to access the input in the event target
                  placeholder="Telefono"
                />
                <label htmlFor="telInput">Telefono</label>
              </div>
              {/* CORREO ELECTRONICO */}
              <div className="form-floating">
                <input
                  type="email"
                  className="form-control mt-3 w-100"
                  name="emailInput" // Use "name" attribute to access the input in the event target
                  placeholder="Correo Electronico"
                />
                <label htmlFor="emailInput">Correo Electrónico</label>
              </div>
            </div>
          </div>
          <button className="btn btn-primary w-25 py-2 mt-4" type="submit">
            Crear Cuenta
          </button>
        </form>
      </Paper>
    </Modal>
  );
};

export default CrearCuenta;
