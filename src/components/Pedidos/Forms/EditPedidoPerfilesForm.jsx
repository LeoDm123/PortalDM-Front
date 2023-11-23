import React, { useState, useEffect } from "react";
import { Button, TextField, Grid } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import serverAPI from "../../../api/serverAPI";
import Title from "../../Title";

const EditPedidoPerfilesForm = ({
  onClose,
  onSubmit,
  pedidoId,
  codigoMat,
  handleFormSubmit,
}) => {
  const [MaterialData, setMaterialData] = useState({});
  const [Codigo, setCodigo] = useState("");
  const [Descripcion, setDescripcion] = useState("");
  const [CantPedida, setCantPedida] = useState("");
  const [CantEntrega, setCantEntrega] = useState("");
  const [Unidad, setUnidad] = useState("");
  const [CantRecibida, setCantRecibida] = useState("");
  const [FechaRecep, setFechaRecep] = useState("");
  const [NroRemito, setNroRemito] = useState("");

  console.log("pedidoId:", pedidoId);
  console.log("codigoMat:", codigoMat);

  const fetchMaterialData = async () => {
    try {
      const resp = await serverAPI.get(
        `/pedido/obtenerMaterialPorCodigo/${pedidoId}/${codigoMat}`
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
      setFechaRecep(selectedMaterial.FechaRecep);
      setNroRemito(selectedMaterial.NroRemito);
    }
  }, [codigoMat, MaterialData]);

  return (
    <form id="matForm" onSubmit={handleFormSubmit}>
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

      <Grid display={"flex"}>
        <TextField
          type="text"
          className="form-control mt-3 w-25"
          name="CantPedida"
          placeholder="Cant. Pedida"
          value={CantPedida}
          onChange={(e) => setCantPedida(e.target.value)}
          label="Cant. Pedida"
          disabled
        />
        <TextField
          type="text"
          className="form-control mt-3 w-25 ms-3"
          name="CantEntrega"
          placeholder="Cant. a Entregar"
          value={CantEntrega}
          onChange={(e) => setCantEntrega(e.target.value)}
          label="Cant. a Entregar"
          disabled
        />
        <TextField
          type="text"
          className="form-control mt-3 w-25 ms-3"
          name="Unidad"
          placeholder="Unidad de Medida"
          value={Unidad}
          onChange={(e) => setUnidad(e.target.value)}
          label="Unidad de Medida"
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
          type="text"
          className="form-control w-25 ms-3"
          name="CantRecibida"
          placeholder="Cant. Recibida"
          value={CantRecibida}
          onChange={(e) => setCantRecibida(e.target.value)}
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

export default EditPedidoPerfilesForm;
