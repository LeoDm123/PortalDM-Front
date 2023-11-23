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

const formatNumber = (number) => {
  const parsedNumber = parseFloat(number);
  return isNaN(parsedNumber) ? number : parsedNumber.toFixed(2);
};

const NestedList = ({ history, pedidoId }) => (
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
              Cant. Pedida
            </TableCell>
            <TableCell
              sx={{ backgroundColor: "#E1E3E1" }}
              className="text-center fw-bold"
            >
              Cant. Envio
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
              Fecha Recepción
            </TableCell>
            <TableCell
              sx={{ backgroundColor: "#E1E3E1" }}
              className="text-center fw-bold"
            >
              N° Remito
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
                {formatNumber(product.CantPedida)}
              </TableCell>
              <TableCell className="text-center">
                {formatNumber(product.CantEntrega)}
              </TableCell>
              <TableCell className="text-center">
                {formatNumber(product.CantRecibida)}
              </TableCell>
              <TableCell className="text-center">
                {product.FechaRecepcion}
              </TableCell>
              <TableCell className="text-center">{product.NRemito}</TableCell>
              <TableCell className="text-center">{product.Estado}</TableCell>
              <TableCell
                sx={{
                  width: 2,
                  padding: 0,
                  margin: 0,
                }}
              >
                <RecibirPedidoButton
                  pedidoId={pedidoId}
                  codigoMat={product.Codigo}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  </Grid>
);

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
