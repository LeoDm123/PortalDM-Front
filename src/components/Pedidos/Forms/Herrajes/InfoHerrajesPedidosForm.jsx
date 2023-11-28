import React, { useState, useEffect } from "react";
import { Button, TextField, Grid, Box } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import serverAPI from "../../../../api/serverAPI";
import Title from "../../../Title";
import formatDate from "../../../../hooks/formatDate";

const InfoHerrajesPedidosForm = ({ onClose, pedidoId, codigoMat }) => {
  const [MaterialData, setMaterialData] = useState({});
  const [Codigo, setCodigo] = useState("");
  const [Descripcion, setDescripcion] = useState("");
  const [CantPedida, setCantPedida] = useState("");
  const [CantEntrega, setCantEntrega] = useState("");
  const [Unidad, setUnidad] = useState("");
  const [CantRecibida, setCantRecibida] = useState("");
  const [FechaRecep, setFechaRecep] = useState("");
  const [NroRemito, setNroRemito] = useState("");
  const [TotalEntregado, setTotalEntregado] = useState("");
  const [onMatRecep, setOnMatRecep] = useState(false);

  const FormatDate = formatDate();

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
  }, [onMatRecep]);

  useEffect(() => {
    if (codigoMat !== null && MaterialData && MaterialData.Recepciones) {
      const selectedMaterial = MaterialData;
      setCodigo(selectedMaterial.Codigo);
      setDescripcion(selectedMaterial.Descripcion);
      setCantPedida(selectedMaterial.CantPedida);
      setCantEntrega(selectedMaterial.CantEntrega);
      setUnidad(selectedMaterial.Unidad);
      setCantRecibida(selectedMaterial.CantRecibida);
      setFechaRecep(FechaRecep);
      setNroRemito(selectedMaterial.NroRemito);

      if (Array.isArray(selectedMaterial.Recepciones)) {
        const totalEntregado = selectedMaterial.Recepciones.reduce(
          (total, recepcion) => total + Number(recepcion.CantRecibida),
          0
        );

        setTotalEntregado(totalEntregado.toString());
      }
    }
  }, [codigoMat, MaterialData]);

  return (
    <Grid>
      <div className="d-flex justify-content-between mb-2">
        <h1 className="h3">Información del Material</h1>
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
        <TextField
          type="text"
          className="form-control mt-3 w-25 ms-3"
          name="TotalEntregado"
          placeholder="Total Entregado"
          value={TotalEntregado}
          onChange={(e) => setTotalEntregado(e.target.value)}
          label="Total Entregado"
          disabled
        />
      </Grid>

      <Grid className="mt-3">
        <Title>Legajo de Recepciones</Title>
      </Grid>

      <Grid
        sx={{
          mb: 1,
          display: "flex",
          flexDirection: "column",
          height: 300,
          overflow: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "dark",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "lightgray",
            borderRadius: "5px",
          },
        }}
      >
        <Box>
          <Table stickyHeader size="small" aria-label="purchases">
            <TableHead>
              <TableRow sx={{ width: "100%" }}>
                <TableCell
                  sx={{ backgroundColor: "#E1E3E1" }}
                  className="text-center fw-bold"
                >
                  Fecha de Recepcion
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "#E1E3E1" }}
                  className="text-center fw-bold"
                >
                  Cant. Recibida
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "#E1E3E1" }}
                  className="text-center fw-bold"
                >
                  Unidad de Medida
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "#E1E3E1" }}
                  className="text-center fw-bold"
                >
                  Nro. de Remito
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {MaterialData?.Recepciones?.map((recepcion) => (
                <TableRow key={recepcion.FechaRecep}>
                  <TableCell className="text-center">
                    {FormatDate(recepcion.FechaRecep)}
                  </TableCell>
                  <TableCell className="text-center">
                    {recepcion.CantRecibida}
                  </TableCell>
                  <TableCell className="text-center">
                    {MaterialData.Unidad}
                  </TableCell>
                  <TableCell className="text-center">
                    {recepcion.NroRemito}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Grid>
    </Grid>
  );
};

export default InfoHerrajesPedidosForm;
