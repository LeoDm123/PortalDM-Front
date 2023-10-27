import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";
import DeleteButton from "../../../components/DeleteButton";
import swal from "sweetalert";
import serverAPI from "../../../api/serverAPI";
import fetchClientByID from "../../../hooks/fetchClientByID";

const PagosList = ({ open, onClose, selectedClientIndex, onSubmitPay }) => {
  const clientByID = fetchClientByID(selectedClientIndex, onSubmitPay);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div>
      <Grid
        sx={{
          px: 2,
          py: 1,
          mb: 1,
          display: "flex",
          flexDirection: "column",
          height: 300,
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
              <TableCell className="text-center fw-bold">Codigo</TableCell>
              <TableCell className="text-center fw-bold">Fecha</TableCell>
              <TableCell className="text-center fw-bold">Monto</TableCell>
              <TableCell className="text-center fw-bold">Concepto</TableCell>
              <TableCell className="text-center fw-bold">
                Comprobante N°
              </TableCell>
              <TableCell className="text-center fw-bold">Comentarios</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientByID.Presupuestos?.map((presupuesto, presupuestoIndex) =>
              presupuesto.Pagos?.map((pago, pagoIndex) => (
                <TableRow key={pagoIndex}>
                  <TableCell className="text-center">
                    {pago.PresupuestoCodigo}
                  </TableCell>
                  <TableCell className="text-center">
                    {pago.FechaPago}
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
                  <TableCell className="text-center">
                    {pago.Comentarios}
                  </TableCell>
                  <TableCell className="text-center">
                    <DeleteButton
                      onDelete={() =>
                        handleDeletePago(
                          selectedClientIndex,
                          presupuestoIndex,
                          pagoIndex
                        )
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
