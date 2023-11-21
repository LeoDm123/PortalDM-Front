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

const NestedList = ({ history }) => (
  <Box sx={{ margin: 1 }}>
    <Table size="small" aria-label="purchases">
      <TableHead>
        <TableRow>
          <TableCell>Codigo</TableCell>
          <TableCell>Descripcion</TableCell>
          <TableCell>Cant Pedida</TableCell>
          <TableCell>Cant Envio</TableCell>
          <TableCell>Cant Recibida</TableCell>
          <TableCell>Fecha Recepción</TableCell>
          <TableCell>N° Remito</TableCell>
          <TableCell>Estado</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {history.map((product) => (
          <TableRow key={product.Codigo}>
            <TableCell>{product.Codigo}</TableCell>
            <TableCell>{product.Descripcion}</TableCell>
            <TableCell>{product.CantPedida}</TableCell>
            <TableCell>{product.CantEntrega}</TableCell>
            <TableCell>{product.CantRecibida}</TableCell>
            <TableCell>{product.FechaRecepcion}</TableCell>
            <TableCell>{product.NRemito}</TableCell>
            <TableCell>{product.Estado}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Box>
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
          pr: 2,
          py: 1,
          mb: 1,
          display: "flex",
          flexDirection: "column",
          height: 500,
          marginLeft: 1,
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
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell className="text-center fw-bold">Obra</TableCell>
              <TableCell className="text-center fw-bold">Fecha</TableCell>
              <TableCell className="text-center fw-bold">N° Pedido</TableCell>
              <TableCell className="text-center fw-bold">
                N° Orden de Compra
              </TableCell>
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
                    colSpan={4}
                  >
                    <Collapse in={openRows[index]} timeout="auto" unmountOnExit>
                      <NestedList history={pedido.Materiales} />
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
