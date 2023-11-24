import React, { useState, useEffect } from "react";
import { Button, TextField, Grid } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import serverAPI from "../../../../api/serverAPI";
import Title from "../../../Title";
import getCurretDate from "../../../../hooks/getCurrentDate";

const RecibirPedidoHerrajesForm = ({
  onClose,
  pedidoId,
  codigoMat,
  onSubmit,
}) => {
  const Today = getCurretDate();
  const [MaterialData, setMaterialData] = useState({});
  const [Codigo, setCodigo] = useState("");
  const [Descripcion, setDescripcion] = useState("");
  const [CantPedida, setCantPedida] = useState("");
  const [CantEntrega, setCantEntrega] = useState("");
  const [Unidad, setUnidad] = useState("");
  const [CantRecibida, setCantRecibida] = useState("");
  const [FechaRecep, setFechaRecep] = useState(Today);
  const [NroRemito, setNroRemito] = useState("");

  console.log("pedidoId:", pedidoId);
  console.log("codigoMat:", codigoMat);

  const fetchMaterialData = async () => {
    try {
      const resp = await serverAPI.get(
        `/pedidoHerrajes/obtenerMaterialPorCodigo/${pedidoId}/${codigoMat}`
      );
      setMaterialData(resp.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchMaterialData();
  }, []);

  useEffect(() => {
    if (codigoMat !== null && MaterialData) {
      const selectedMaterial = MaterialData;
      setCodigo(selectedMaterial.Codigo);
      setDescripcion(selectedMaterial.Descripcion);
      setCantPedida(selectedMaterial.CantPedida);
      setCantEntrega(selectedMaterial.CantEntrega);
      setUnidad(selectedMaterial.Unidad);
      setCantRecibida(selectedMaterial.CantRecibida);
      setFechaRecep(FechaRecep);
      setNroRemito(selectedMaterial.NroRemito);
    }
  }, [codigoMat, MaterialData]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (CantRecibida === "" || FechaRecep === "" || NroRemito === "") {
      return console.log("Todos los campos son obligatorios");
    }

    try {
      await serverAPI.put(
        `/pedidoHerrajes/recibirPedido/${pedidoId}/${codigoMat}`,
        {
          CantRecibida,
          FechaRecep,
          NroRemito,
        }
      );

      SwAlertOk();
      onClose();
      onSubmit();
    } catch (error) {
      console.error(error);
      const errorMessage = error.response.data.message || "Error desconocido";
      SwAlertError(errorMessage);
    }
  };

  const SwAlertOk = () => {
    swal({
      title: "¡Éxito!",
      text: "Los datos de recepción se han actualizado correctamente",
      icon: "success",
    });
  };

  const SwAlertError = (errorMessage) => {
    swal({
      title: "¡Error!",
      text: errorMessage,
      icon: "error",
    });
  };

  return (
    <form id="matForm" onSubmit={handleSubmit}>
      <div className="d-flex justify-content-between mb-2">
        <h1 className="h3">Recepción de Material</h1>
        <HighlightOffIcon onClick={onClose} fontSize="large" />
      </div>

      <Grid display={"flex"}>
        <TextField
          type="text"
          className="form-control mt-3 w-25"
          name="Codigo"
          placeholder="Codigo"
          value={Codigo}
          onChange={(e) => setCodigo(e.target.value)}
          label="Codigo"
          disabled
        />
        <TextField
          type="text"
          className="form-control mt-3 ms-3 w-75"
          name="Descripcion"
          placeholder="Descripcion"
          value={Descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          label="Descripcion"
          disabled
        />
      </Grid>

      <Grid className="mt-3">
        <Title>Datos de Recepción</Title>
      </Grid>

      <Grid display={"flex"}>
        <TextField
          type="date"
          className="form-control w-25"
          name="FechaRecep"
          placeholder="Fecha Recepción"
          value={FechaRecep}
          onChange={(e) => setFechaRecep(e.target.value)}
          label="Fecha Recepción"
        />
        <TextField
          type="number"
          className="form-control w-25 ms-3"
          name="CantRecibida"
          placeholder="Cant. Recibida"
          value={CantRecibida}
          onChange={(e) => setCantRecibida(parseFloat(e.target.value))}
          label="Cant. Recibida"
        />

        <TextField
          type="text"
          className="form-control w-25 ms-3"
          name="NroRemito"
          placeholder="N° de  Remito"
          value={NroRemito}
          onChange={(e) => setNroRemito(e.target.value)}
          label="N° de  Remito"
        />
        <Button
          variant="contained"
          color="primary"
          size="small"
          type="submit"
          className="ms-3 w-25"
        >
          Confirmar Recepción
        </Button>
      </Grid>
    </form>
  );
};

export default RecibirPedidoHerrajesForm;
