import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import fetchPedidosMadera from "../../../../hooks/Pedidos/Madera/fetchPedidoMadera";
import RecibirMaderaButton from "../../Buttons/Madera/RecibirMaderaButton";
import InfoMaderaButton from "../../Buttons/Madera/InfoMaderaButton";
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

const MaderaNestedList = ({
  history,
  pedidoId,
  onMatSubmit,
  onEstadoChange,
}) => {
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
      await fetchPedidosMadera();
    };

    fetchData();
  }, [onMatSubmit]);

  const isPedidoComplete = history.every((product) => {
    const state = getStateColorClass(product);
    return state === "Completo" || state === "Excedido";
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isPedidoComplete) {
          const response = await serverAPI.put(
            `/pedidoMadera/editEstado/${pedidoId}`,
            {
              estado: "Cerrado",
            }
          );
          onEstadoChange();
          console.log("Pedido is complete!", response.data);
        }
      } catch (error) {
        console.error("Error updating estado:", error);
      }
    };

    fetchData();
  }, [isPedidoComplete, pedidoId]);

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
                Espesor
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
              <TableRow key={product.Codigo}>
                <TableCell className="text-center" sx={{ width: "12%" }}>
                  {product.Codigo}
                </TableCell>
                <TableCell className="text-center" sx={{ width: "30%" }}>
                  {product.Descripcion}
                </TableCell>
                <TableCell className="text-center" sx={{ width: "8%" }}>
                  {product.Ancho}
                </TableCell>
                <TableCell className="text-center" sx={{ width: "8%" }}>
                  {product.Alto}
                </TableCell>
                <TableCell className="text-center" sx={{ width: "8%" }}>
                  {product.Espesor}
                </TableCell>
                <TableCell className="text-center" sx={{ width: "8%" }}>
                  {formatNumber(product.Cantidad)}
                </TableCell>
                <TableCell className="text-center" sx={{ width: "8%" }}>
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
                    <RecibirMaderaButton
                      pedidoId={pedidoId}
                      codigoMat={product.Codigo}
                      onMatSubmit={onMatSubmit}
                    />
                    <InfoMaderaButton
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

export default MaderaNestedList;
