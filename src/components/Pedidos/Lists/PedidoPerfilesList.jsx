import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import fetchPedidos from "../../../hooks/fetchPedidos";
import RecibirPedidoButton from "../Buttons/RecibirPedidoButton";
import InfoPerfilesButton from "../Buttons/InfoPerfilesButton";
import "../../../App.css";

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

  const cantEntrega = parseFloat(product.CantEntrega);

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

const NestedList = ({ history, pedidoId }) => {
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
                Descripcion
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
                <TableCell className="text-center">{product.Codigo}</TableCell>
                <TableCell>{product.Descripcion}</TableCell>
                <TableCell className="text-center">
                  {formatNumber(product.CantEntrega)}
                </TableCell>
                <TableCell className="text-center">
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

                    const cantEntrega = parseFloat(product.CantEntrega);

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
                    <RecibirPedidoButton
                      pedidoId={pedidoId}
                      codigoMat={product.Codigo}
                    />
                    <InfoPerfilesButton
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

const PedidosPerfilesList = ({ onSubmit }) => {
  const Pedidos = fetchPedidos(onSubmit);
  const [openRows, setOpenRows] = useState([]);

  const handleRowToggle = (index) => {
    const newOpenRows = [...openRows];
    newOpenRows[index] = !newOpenRows[index];
    setOpenRows(newOpenRows);
  };

  return (
    <div>
      <Grid
        sx={{
          px: 1,
          py: 1,
          mb: 1,
          display: "flex",
          flexDirection: "column",
          height: 500,
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
        <Table stickyHeader size="medium">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ backgroundColor: "#E1E3E1" }}
                className="text-center fw-bold"
              >
                Obra
              </TableCell>
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
                N° Pedido
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "#E1E3E1" }}
                className="text-center fw-bold"
              >
                N° Orden de Compra
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "#E1E3E1" }}
                className="text-center fw-bold"
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Pedidos.map((pedido, index) => (
              <React.Fragment key={index}>
                <TableRow>
                  <TableCell className="text-center">{pedido.Obra}</TableCell>
                  <TableCell className="text-center">{pedido.Fecha}</TableCell>
                  <TableCell className="text-center">
                    {pedido.NroPedido}
                  </TableCell>
                  <TableCell className="text-center">
                    {pedido.OrdenCompra}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => handleRowToggle(index)}
                    >
                      {openRows[index] ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={5}
                  >
                    <Collapse in={openRows[index]} timeout="auto" unmountOnExit>
                      <NestedList
                        history={pedido.Materiales}
                        pedidoId={pedido._id}
                      />
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </div>
  );
};

export default PedidosPerfilesList;
