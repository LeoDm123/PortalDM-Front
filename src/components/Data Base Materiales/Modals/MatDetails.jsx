import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Title from "../../Title";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import fetchMatByID from "../../../hooks/fetchMatByID";
import formatDate from "../../../hooks/formatDate";

const MatDetails = ({ open, onClose, matID }) => {
  const [Codigo, setCodigo] = useState("");
  const [Detalle, setDetalle] = useState("");
  const [Unidad, setUnidad] = useState("");
  const [Categoria, setCategoria] = useState("");
  const [Ancho, setAncho] = useState(0);
  const [Alto, setAlto] = useState(0);
  const [Largo, setLargo] = useState(0);
  const [Espesor, setEspesor] = useState(0);
  const [Costo, setCosto] = useState(0);
  const [StockInicial, setStockInicial] = useState(0);
  const [StockSeguridad, setStockSeguridad] = useState(0);
  const [Proveedor, setProveedor] = useState("");
  const [InvLog, setInvLog] = useState([]);
  const matByID = fetchMatByID(matID);
  const FormatDate = formatDate();
  const [StockActualizado, setStockActualizado] = useState(0);

  useEffect(() => {
    if (
      matID &&
      matByID &&
      typeof matByID === "object" &&
      Object.keys(matByID).length > 0
    ) {
      setCodigo(matByID.Codigo ?? 0);
      setDetalle(matByID.Detalle ?? "");
      setCategoria(matByID.Categoria ?? "");
      setAncho(matByID.Ancho ?? 0);
      setAlto(matByID.Alto ?? 0);
      setLargo(matByID.Largo ?? 0);
      setEspesor(matByID.Espesor ?? 0);
      setCosto(matByID.Costo ?? 0);
      setUnidad(matByID.Unidad ?? "");
      setStockInicial(matByID.StockInicial ?? 0);
      setStockSeguridad(matByID.StockSeguridad ?? 0);
      setProveedor(matByID.Proveedor ?? "");
      setInvLog(matByID.InvLog ?? []);
    }
  }, [matID, matByID]);

  useEffect(() => {
    if (matByID && matByID.InvLog && Array.isArray(matByID.InvLog)) {
      const stockIngresos = matByID.InvLog.filter(
        (log) => log.TipoMov === "Ingreso"
      ).reduce((total, log) => total + log.CantRecibida, 0);

      const stockEgresos = matByID.InvLog.filter(
        (log) => log.TipoMov === "Egreso"
      ).reduce((total, log) => total + log.CantRecibida, 0);

      const StockActualizado = matByID.Stock + stockIngresos - stockEgresos;
      setStockActualizado(StockActualizado);
    }
  }, [matByID]);

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
        {matByID && (
          <Grid>
            <div className="d-flex justify-content-between">
              <h1 className="h3">Detalles de material</h1>
              <HighlightOffIcon onClick={onClose} fontSize="large" />
            </div>

            <Grid display={"flex"}>
              <TextField
                type="text"
                className="form-control mt-3 w-75"
                name="Detalle"
                placeholder="Detalle"
                value={Detalle}
                label="Detalle"
                disabled
              />
              <TextField
                type="text"
                className="form-control mt-3 ms-3 w-25"
                name="Unidad"
                placeholder="Unidad"
                value={Unidad}
                label="Unidad"
                disabled
              />
            </Grid>

            <Grid display={"flex"}>
              <TextField
                type="text"
                className="form-control mt-3 w-50"
                name="Codigo"
                placeholder="Codigo"
                value={Codigo}
                label="Codigo"
                disabled
              />
              <TextField
                type="text"
                className="form-control mt-3 mx-3 w-50"
                name="Categoria"
                placeholder="Categoria"
                value={Categoria}
                label="Categoria"
                disabled
              />
              <TextField
                type="text"
                className="form-control mt-3 w-50"
                name="Proveedor"
                placeholder="Proveedor"
                value={Proveedor}
                label="Proveedor"
                disabled
              />
            </Grid>

            <Grid display={"flex"}>
              <TextField
                type="text"
                className="form-control my-3 me-3 w-25"
                name="Ancho"
                placeholder="Ancho"
                value={Ancho}
                label="Ancho [mm]"
                disabled
              />
              <TextField
                type="text"
                className="form-control my-3 me-3 w-25"
                name="Alto"
                placeholder="Alto"
                value={Alto}
                label="Alto [mm]"
                disabled
              />
              <TextField
                type="text"
                className="form-control mt-3 me-3 w-25"
                name="Largo"
                placeholder="Largo"
                value={Largo}
                label="Largo [mm]"
                disabled
              />
              <TextField
                type="text"
                className="form-control mt-3 w-25"
                name="Espesor"
                placeholder="Espesor"
                value={Espesor}
                label="Espesor [mm]"
                disabled
              />
            </Grid>

            <Grid display={"flex"} className="w-100">
              <TextField
                type="text"
                className="form-control mt-3 me-3 w-50"
                name="StockInicial"
                placeholder="StockInicial"
                value={StockInicial}
                label="Stock Inicial"
                disabled
              />
              <TextField
                type="text"
                className="form-control mt-3 me-3 w-50"
                name="StockSeguridad"
                placeholder="StockSeguridad"
                value={StockSeguridad}
                label="Stock de Seguridad"
                disabled
              />
              <TextField
                type="text"
                className="form-control mt-3 w-50"
                name="Costo"
                placeholder="Costo"
                value={Costo}
                label="Costo Unitario"
                disabled
              />
            </Grid>
          </Grid>
        )}

        <Grid className="mt-1">
          <Title>Movimientos de Inventario</Title>
        </Grid>

        <Grid
          sx={{
            mb: 1,
            display: "flex",
            flexDirection: "column",
            height: 160,
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
                    Fecha
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: "#E1E3E1" }}
                    className="text-center fw-bold"
                  >
                    Cantidad
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
                    Tipo de Movimiento
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: "#E1E3E1" }}
                    className="text-center fw-bold"
                  >
                    Detalle
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: "#E1E3E1" }}
                    className="text-center fw-bold"
                  >
                    Stock
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {matByID && matByID.InvLog && Array.isArray(matByID.InvLog) ? (
                  matByID.InvLog.map((log, index) => {
                    const stockIngresos = matByID.InvLog.filter(
                      (entry) => entry.TipoMov === "Ingreso"
                    )
                      .slice(0, index + 1)
                      .reduce((total, entry) => total + entry.CantRecibida, 0);

                    const stockEgresos = matByID.InvLog.filter(
                      (entry) => entry.TipoMov === "Egreso"
                    )
                      .slice(0, index + 1)
                      .reduce((total, entry) => total + entry.CantRecibida, 0);

                    const stockActualizado =
                      matByID.Stock + stockIngresos - stockEgresos;

                    return (
                      <TableRow key={index}>
                        <TableCell className="text-center">
                          {FormatDate(log.FechaRecep)}
                        </TableCell>
                        <TableCell className="text-center">
                          {log.CantRecibida}
                        </TableCell>
                        <TableCell className="text-center">
                          {log.Unidad}
                        </TableCell>
                        <TableCell className="text-center">
                          {log.TipoMov}
                        </TableCell>
                        <TableCell className="text-center">
                          {log.RemitoLog}
                        </TableCell>
                        <TableCell className="text-center">
                          {stockActualizado}
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      No data available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Box>
        </Grid>
      </Paper>
    </Modal>
  );
};

export default MatDetails;
