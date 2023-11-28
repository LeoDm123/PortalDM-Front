import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import fetchPedidosVidrios from "../../../../hooks/Pedidos/Vidrios/fetchPedidoVidrios";
import RecibirVidriosButton from "../../Buttons/Vidrios/RecibirVidriosButton";
import InfoVidriosButton from "../../Buttons/Vidrios/InfoVidriosButton";
import "../../../../App.css";

const formatNumber = (number) => {
  const parsedNumber = parseFloat(number);
  return isNaN(parsedNumber) ? number : parsedNumber.toFixed(2);
};

const getStateColorClass = (product) => {
  const cantRecibida = product.Recepciones
    ? product.Recepciones.reduce(
        (recepcionTotal, recepcion) =>
          recepcionTotal + Number(recepcion.CantRecibida),
        0
      )
    : 0;

  const cantEntrega = parseFloat(product.Cantidad);

  if (cantRecibida === 0) {
    return "EnTransito";
  } else if (cantRecibida < cantEntrega) {
    return "Incompleto";
  } else if (cantRecibida === cantEntrega) {
    return "Completo";
  } else {
    return "Excedido";
  }
};

const VidriosNestedList = ({ history, pedidoId, onMatSubmit }) => {
  const sumCantRecibida = history.reduce((total, product) => {
    const sumRecepciones = product.Recepciones
      ? product.Recepciones.reduce(
          (recepcionTotal, recepcion) =>
            recepcionTotal + Number(recepcion.CantRecibida),
          0
        )
      : 0;

    return total + sumRecepciones;
  }, 0);

  useEffect(() => {
    const fetchData = async () => {
      await fetchPedidosVidrios();
    };

    fetchData();
  }, [onMatSubmit]);

  return (
    <Grid
      sx={{
        mb: 1,
        display: "flex",
        flexDirection: "column",
        height: 400,
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
                Tipologia
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "#E1E3E1" }}
                className="text-center fw-bold"
              >
                Ancho
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "#E1E3E1" }}
                className="text-center fw-bold"
              >
                Alto
              </TableCell>

              <TableCell
                sx={{ backgroundColor: "#E1E3E1" }}
                className="text-center fw-bold"
              >
                Composición
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "#E1E3E1" }}
                className="text-center fw-bold"
              >
                Cant. a Recibir
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
                Estado
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#E1E3E1",
                  width: 2,
                  padding: 0,
                  margin: 0,
                }}
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map((product) => (
              <TableRow key={product.Tipologia}>
                <TableCell className="text-center" sx={{ width: "15%" }}>
                  {product.Tipologia}
                </TableCell>
                <TableCell className="text-center" sx={{ width: "12%" }}>
                  {product.Ancho}
                </TableCell>
                <TableCell className="text-center" sx={{ width: "12%" }}>
                  {product.Alto}
                </TableCell>
                <TableCell className="text-center" sx={{ width: "15%" }}>
                  {product.Composicion}
                </TableCell>
                <TableCell className="text-center" sx={{ width: "12%" }}>
                  {formatNumber(product.Cantidad)}
                </TableCell>
                <TableCell className="text-center" sx={{ width: "12%" }}>
                  {formatNumber(
                    product.Recepciones
                      ? product.Recepciones.reduce(
                          (recepcionTotal, recepcion) =>
                            recepcionTotal + Number(recepcion.CantRecibida),
                          0
                        )
                      : 0
                  )}
                </TableCell>
                <TableCell
                  className={`text-center ${getStateColorClass(product)}`}
                >
                  {(() => {
                    const cantRecibida = product.Recepciones
                      ? product.Recepciones.reduce(
                          (recepcionTotal, recepcion) =>
                            recepcionTotal + Number(recepcion.CantRecibida),
                          0
                        )
                      : 0;

                    const cantEntrega = parseFloat(product.Cantidad);

                    if (cantRecibida === 0) {
                      return "En transito";
                    } else if (cantRecibida < cantEntrega) {
                      return "Incompleto";
                    } else if (cantRecibida === cantEntrega) {
                      return "Completo";
                    } else {
                      return "Excedido";
                    }
                  })()}
                </TableCell>
                <TableCell
                  sx={{
                    width: 2,
                    padding: 0,
                    margin: 0,
                  }}
                >
                  <Grid display={"flex"}>
                    <RecibirVidriosButton
                      pedidoId={pedidoId}
                      codigoMat={product.Codigo}
                      onMatSubmit={onMatSubmit}
                    />
                    <InfoVidriosButton
                      pedidoId={pedidoId}
                      codigoMat={product.Codigo}
                    />
                  </Grid>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Grid>
  );
};

export default VidriosNestedList;
