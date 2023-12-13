import React, { useState } from "react";
import { Button, TextField, Grid } from "@mui/material";
import "../../../../App.css";
import getCurrentDate from "../../../../hooks/getCurrentDate";
import Title from "../../../Title";
import { DividerTitle } from "../../../Dividers";
import AddPuertaButton from "../../Buttons/Puertas/AddPuertaButton";
import PuertasPresList from "../../Lists/Puertas/PuertasPresList";
import OpenPuertasConfigButton from "../../Buttons/Puertas/OpenPuertasConfigButton";

const handleFormSubmit = async (event) => {};

const PresPuertasForm = () => {
  const Today = getCurrentDate();
  const [uploadedData, setUploadedData] = useState([]);
  const [NroPedido, setNroPedido] = useState("");
  const [Obra, setObra] = useState("");
  const [Cliente, setCliente] = useState("");
  const [Descuento, setDescuento] = useState(0);
  const [Fecha, setFecha] = useState(Today);

  return (
    <div>
      <Grid
        sx={{
          px: 1,
          pb: 1,
          mb: 1,
        }}
      >
        <form id="matForm" onSubmit={handleFormSubmit}>
          <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
            <Title>Crear presupuesto de puertas de madera</Title>
          </Grid>

          <Grid
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Grid
              sx={{
                display: "flex",
                alignItems: "center",
                width: "60%",
              }}
            >
              <TextField
                type="text"
                className="form-control mb-3"
                sx={{ width: "40%" }}
                name="Obra"
                placeholder="Nombre del Cliente"
                value={Cliente}
                onChange={(e) => setCliente(e.target.value)}
                label="Nombre del Cliente"
              />
              <TextField
                type="text"
                className="form-control ms-3 mb-3"
                sx={{ width: "40%" }}
                name="Obra"
                placeholder="Nombre de la Obra"
                value={Obra}
                onChange={(e) => setObra(e.target.value)}
                label="Nombre de la Obra"
              />
              <TextField
                type="percent"
                className="form-control ms-3 mb-3"
                sx={{ width: "15%" }}
                name="Obra"
                placeholder="% Descuento"
                value={Descuento}
                onChange={(e) => setDescuento(e.target.value)}
                label="% Descuento"
              />
            </Grid>

            <Grid sx={{ display: "flex" }}>
              <AddPuertaButton />
              <OpenPuertasConfigButton />
            </Grid>
          </Grid>
          <DividerTitle />
          <Grid>
            <PuertasPresList />
          </Grid>
        </form>
      </Grid>
    </div>
  );
};

export default PresPuertasForm;
