import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Title from "../../../components/Title";
import CloseButton from "../../../components/CloseButton";
import swal from "sweetalert";

const AgregarMat = ({ open, onClose }) => {
  const [ClientName, setClientName] = useState("");
  const [ClientApellido, setClientApellido] = useState("");
  const [ClientIVACond, setClientIVACond] = useState("");
  const [ClientDNI, setClientDNI] = useState("");
  const [ClientAdress, setClientAdress] = useState("");
  const [ClientTel, setClientTel] = useState("");
  const [ClientEmail, setClientEmail] = useState("");
  const [ClientCUIT, setClientCUIT] = useState("");
  const [ClientStatus, setClientStatus] = useState("Activo");

  const crearCliente = async (
    ClientName,
    ClientApellido,
    ClientIVACond,
    ClientDNI,
    ClientCUIT,
    ClientAdress,
    ClientTel,
    ClientEmail,
    ClientStatus
  ) => {
    try {
      const resp = await serverAPI.post("/clients/crearCliente", {
        ClientName,
        ClientApellido,
        ClientIVACond,
        ClientDNI,
        ClientCUIT,
        ClientAdress,
        ClientTel,
        ClientEmail,
        ClientStatus,
      });

      if (
        resp.data.msg ===
        "El DNI que intenta registrar ya se encuentra registrado"
      ) {
        SwAlertError();
      } else {
        console.log(resp);
        SwAlertOk();
        onClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const SwAlertOk = () => {
    swal({
      title: "¡Éxito!",
      text: "El cliente se agregó correctamente",
      icon: "success",
    });
  };

  const SwAlertError = () => {
    swal({
      title: "¡Error!",
      text: "El cliente ya se encuentra registrado",
      icon: "error",
    });
  };

  const handleIVAChange = (e) => {
    setClientIVACond(e.target.value);
  };

  const handleCUITChange = (e) => {
    const inputNumber = e.target.value.replace(/\D/g, "");
    const paddedNumber = inputNumber.padStart(11, "");
    const formattedCuit = `${paddedNumber.substring(
      0,
      2
    )}-${paddedNumber.substring(2, 10)}-${paddedNumber.charAt(10)}`;
    setClientCUIT(formattedCuit);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (ClientEmail === "" || ClientName === "" || ClientIVACond === "") {
      return console.log("todos los campos son obligatorios");
    }

    console.log(
      ClientName,
      ClientApellido,
      ClientIVACond,
      ClientDNI,
      ClientCUIT,
      ClientAdress,
      ClientTel,
      ClientEmail,
      ClientStatus
    );

    crearCliente(
      ClientName,
      ClientApellido,
      ClientIVACond,
      ClientDNI,
      ClientCUIT,
      ClientAdress,
      ClientTel,
      ClientEmail,
      ClientStatus
    );

    setClientName("");
    setClientApellido("");
    setClientIVACond("");
    setClientDNI("");
    setClientEmail("");
    setClientAdress("");
    setClientTel("");
    setClientCUIT("");

    onClientCreation();
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
