import React, { useState, useEffect } from "react";
import { Button, TextField, Grid } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import serverAPI from "../../../../api/serverAPI";
import Title from "../../../Title";
import getCurretDate from "../../../../hooks/getCurrentDate";
import { crearLog } from "../../../../hooks/Inventario/crearLog";

const RecibirPedidoMaderaForm = ({
  onClose,
  pedidoId,
  codigoMat,
  onSubmit,
}) => {
  const Today = getCurretDate();
  const [MaterialData, setMaterialData] = useState({});
  const [PedidoData, setPedidoData] = useState({});
  const [Descripcion, setDescripcion] = useState("");
  const [Proveedor, setProveedor] = useState("");
  const [Unidad, setUnidad] = useState("");
  const [Ancho, setAncho] = useState("");
  const [Alto, setAlto] = useState("");
  const [Espesor, setEspesor] = useState("");
  const [Codigo, setCodigo] = useState("");
  const [Cantidad, setCantidad] = useState("");
  const [CantRecibida, setCantRecibida] = useState("");
  const [FechaRecep, setFechaRecep] = useState(Today);
  const [NroRemito, setNroRemito] = useState("");
  const [TipoMov, setTipoMov] = useState("Ingreso");

  const fetchMaterialData = async () => {
    try {
      const resp = await serverAPI.get(
        `/pedidoMadera/obtenerMaterialPorCodigo/${pedidoId}/${codigoMat}`
      );
      setMaterialData(resp.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchPedidoData = async () => {
    try {
      const resp = await serverAPI.get(
        `/pedidoMadera/obtenerPedidoPorId/${pedidoId}`
      );
      setPedidoData(resp.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchMaterialData();
    fetchPedidoData();
  }, []);

  useEffect(() => {
    if (codigoMat !== null && MaterialData) {
      const selectedMaterial = MaterialData;
      setCodigo(selectedMaterial.Codigo);
      setDescripcion(selectedMaterial.Descripcion);
      setProveedor(PedidoData.Proveedor);
      setEspesor(selectedMaterial.Espesor);
      setAncho(selectedMaterial.Ancho);
      setAlto(selectedMaterial.Alto);
      setUnidad(selectedMaterial.Unidad);
      setCantidad(selectedMaterial.Cantidad);
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

    const nroPedido = PedidoData.NroPedido;

    const RemitoLog = "Remito N°: " + NroRemito;

    try {
      await serverAPI.put(
        `/pedidoMadera/recibirPedido/${pedidoId}/${codigoMat}`,
        {
          CantRecibida,
          FechaRecep,
          nroPedido,
          NroRemito,
          RemitoLog,
        }
      );

      crearLog(
        Codigo,
        Descripcion,
        FechaRecep,
        nroPedido,
        TipoMov,
        CantRecibida,
        Unidad,
        RemitoLog
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

      <Grid display={"flex"}>
        <TextField
          type="text"
          className="form-control mt-3 w-50"
          name="Proveedor"
          placeholder="Proveedor"
          value={Proveedor}
          onChange={(e) => setProveedor(e.target.value)}
          label="Proveedor"
          disabled
        />
        <TextField
          type="text"
          className="form-control mt-3 ms-3 w-25"
          name="Ancho"
          placeholder="Ancho"
          value={Ancho}
          onChange={(e) => setAncho(e.target.value)}
          label="Ancho"
          disabled
        />
        <TextField
          type="text"
          className="form-control mt-3 ms-3 w-25"
          name="Alto"
          placeholder="Alto"
          value={Alto}
          onChange={(e) => setAlto(e.target.value)}
          label="Alto"
          disabled
        />
        <TextField
          type="text"
          className="form-control mt-3 ms-3 w-25"
          name="Espesor"
          placeholder="Espesor"
          value={Espesor}
          onChange={(e) => setEspesor(e.target.value)}
          label="Espesor"
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

export default RecibirPedidoMaderaForm;
