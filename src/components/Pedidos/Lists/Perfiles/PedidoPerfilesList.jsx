import React, { useState, useEffect } from "react";
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
import useFetchPedidos from "../../../../hooks/fetchPedidos";
import "../../../../App.css";
import DeletePedidoButton from "../../Buttons/Perfiles/DeletePedidoButton";
import formatDate from "../../../../hooks/formatDate";
import DeletePedido from "../../../../hooks/deletePedido";
import swal from "sweetalert";
import PerfilesNestedList from "./PerfilesNestedList";

const PedidosPerfilesList = ({ onSubmit }) => {
  console.log("PedidosPerfilesList rendered - onSubmit:", onSubmit);
  const [openRows, setOpenRows] = useState([]);
  const [onMatSubmit, setOnMatSubmit] = useState(false);
  const [onDelete, setOnDelete] = useState(false);
  const FormatDate = formatDate();
  const { deletePedido, error } = DeletePedido();

  const handleMatSubmit = () => {
    setOnMatSubmit(!onMatSubmit);
  };

  const handleDelete = () => {
    setOnDelete(!onDelete);
  };

  const handleRowToggle = (index) => {
    const newOpenRows = [...openRows];
    newOpenRows[index] = !newOpenRows[index];
    setOpenRows(newOpenRows);
  };

  const handleDeletePedido = async (pedidoId) => {
    handleDeleteCliente(pedidoId);
  };

  const handleDeleteCliente = (pedidoId) => {
    swal({
      title: "¿Desea eliminar el pedido?",
      text: "Una vez eliminado no podrá ser recuperado",
      icon: "warning",
      buttons: ["No", "Sí"],
      dangerMode: true,
    }).then((willCancel) => {
      if (willCancel) {
        deletePedido(pedidoId);
        handleDelete();
      }
    });
  };

  const Pedidos = useFetchPedidos(onSubmit, onMatSubmit, onDelete);

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
                sx={{ backgroundColor: "#E1E3E1", width: "25%" }}
                className="text-center fw-bold"
              >
                Obra
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "#E1E3E1", width: "15%" }}
                className="text-center fw-bold"
              >
                Fecha
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "#E1E3E1", width: "25%" }}
                className="text-center fw-bold"
              >
                N° Pedido
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "#E1E3E1", width: "25%" }}
                className="text-center fw-bold"
              >
                N° Orden de Compra
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "#E1E3E1", width: "10%" }}
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Pedidos.map((pedido, index) => (
              <React.Fragment key={index}>
                <TableRow>
                  <TableCell className="text-center">{pedido.Obra}</TableCell>
                  <TableCell className="text-center">
                    {FormatDate(pedido.Fecha)}
                  </TableCell>
                  <TableCell className="text-center">
                    {pedido.NroPedido}
                  </TableCell>
                  <TableCell className="text-center">
                    {pedido.OrdenCompra}
                  </TableCell>
                  <TableCell sx={{ width: "5%" }}>
                    <Grid display={"flex"}>
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
                      <DeletePedidoButton
                        onDelete={() => handleDeletePedido(pedido._id)}
                      />
                    </Grid>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={5}
                  >
                    <Collapse in={openRows[index]} timeout="auto" unmountOnExit>
                      <PerfilesNestedList
                        history={pedido.Materiales}
                        pedidoId={pedido._id}
                        onMatSubmit={handleMatSubmit}
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
