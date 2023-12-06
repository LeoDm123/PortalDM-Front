import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import serverAPI from "../../../api/serverAPI";
import formatDate from "../../../hooks/formatDate";
import fetchLogs from "../../../hooks/Inventario/fetchLog";

const InventarioLogList = ({ onClose }) => {
  const [onMatRecep, setOnMatRecep] = useState(false);
  const LogData = fetchLogs(onMatRecep);

  const FormatDate = formatDate();

  return (
    <Grid>
      <div className="d-flex justify-content-between mb-2">
        <h1 className="h3">Movimientos de Inventario</h1>
        <HighlightOffIcon onClick={onClose} fontSize="large" />
      </div>

      <Grid
        sx={{
          mb: 1,
          display: "flex",
          flexDirection: "column",
          height: 650,
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
                  Codigo
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "#E1E3E1" }}
                  className="text-center fw-bold"
                >
                  Descripción
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
                  N° de Pedido
                </TableCell>
                <TableCell
                  sx={{ backgroundColor: "#E1E3E1" }}
                  className="text-center fw-bold"
                >
                  Comentario
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(LogData) &&
                LogData.map((log, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-center">
                      {FormatDate(log.Fecha)}
                    </TableCell>
                    <TableCell className="text-center">{log.Codigo}</TableCell>
                    <TableCell className="text-center">
                      {log.Descripcion}
                    </TableCell>
                    <TableCell className="text-center">
                      {log.Cantidad}
                    </TableCell>
                    <TableCell className="text-center">{log.Unidad}</TableCell>
                    <TableCell className="text-center">{log.TipoMov}</TableCell>
                    <TableCell className="text-center">
                      {log.NroPedido}
                    </TableCell>
                    <TableCell className="text-center">
                      {log.Comentario}
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

export default InventarioLogList;
