import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";
import swal from "sweetalert";
import DeleteButton from "../../../components/DeleteButton";
import fetchClientByID from "../../../hooks/fetchClientByID";
import DeletePago from "../../../hooks/deletePagoByID";
import FormatCurrency from "../../../hooks/formatCurrency";

const PagosList = ({ selectedClientIndex, onSubmitPay, onPayDelete }) => {
  const clientByID = fetchClientByID(
    selectedClientIndex,
    onSubmitPay,
    onPayDelete
  );
  const { deletePago, error } = DeletePago(selectedClientIndex);
  const formatCurrency = FormatCurrency();

  const handleDeletePago = (presupuestoId, pagoId) => {
    swal({
      title: "¿Desea eliminar el pago?",
      text: "Una vez eliminado no podrá ser recuperado",
      icon: "warning",
      buttons: ["No", "Sí"],
      dangerMode: true,
    }).then((willCancel) => {
      if (willCancel) {
        deletePago(selectedClientIndex, presupuestoId, pagoId);
        onPayDelete();
      }
    });
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    if (isNaN(date)) {
      return "Fecha inválida";
    }

    date.setUTCHours(0, 0, 0, 0);

    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();
    return `${day < 10 ? "0" : ""}${day}-${
      month < 10 ? "0" : ""
    }${month}-${year}`;
  };

  const presupuestos = clientByID.Presupuestos ?? [];

  const sortedPayments = presupuestos.map((presupuesto) => ({
    ...presupuesto,
    Pagos: [...presupuesto.Pagos].sort(
      (pagoA, pagoB) => new Date(pagoA.FechaPago) - new Date(pagoB.FechaPago)
    ),
  }));

  return (
    <div>
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
        <Table stickyHeader size="medium">
          <TableHead>
            <TableRow>
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
                Fecha
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "#E1E3E1" }}
                className="text-center fw-bold"
              >
                Monto
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "#E1E3E1" }}
                className="text-center fw-bold"
              >
                Concepto
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "#E1E3E1" }}
                className="text-center fw-bold"
              >
                Comprobante N°
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "#E1E3E1" }}
                className="text-center fw-bold"
              >
                Comentarios
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "#E1E3E1" }}
                className="text-center fw-bold"
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedPayments.map((presupuesto, presupuestoIndex) =>
              presupuesto.Pagos.map((pago, pagoIndex) => (
                <TableRow key={pago._id}>
                  <TableCell className="text-center" sx={{ width: "12%" }}>
                    {pago.PresupuestoCodigo}
                  </TableCell>
                  <TableCell className="text-center">
                    {formatDate(pago.FechaPago)}
                  </TableCell>
                  <TableCell className="text-center">
                    {formatCurrency(pago.PagoMonto)}
                  </TableCell>
                  <TableCell className="text-center">
                    {pago.PagoConcepto}
                  </TableCell>
                  <TableCell className="text-center">
                    {pago.PagoComprobante}
                  </TableCell>
                  <TableCell className="text-center" sx={{ width: "20%" }}>
                    {pago.Comentarios}
                  </TableCell>
                  <TableCell className="text-center">
                    <DeleteButton
                      onDelete={() =>
                        handleDeletePago(presupuesto._id, pago._id)
                      }
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Grid>
    </div>
  );
};

export default PagosList;
