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
    <Grid
      sx={{
        px: 1,
        pb: 1,
        mb: 1,
      }}
    ></Grid>
  );
};

export default PresPuertasForm;
