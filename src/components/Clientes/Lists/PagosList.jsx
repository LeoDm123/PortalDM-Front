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

const PagosList = ({ selectedClientIndex, onSubmitPay }) => {
  const clientByID = fetchClientByID(selectedClientIndex, onSubmitPay);
  const { deletePago, error } = DeletePago(selectedClientIndex);
  const [sortedPagos, setSortedPagos] = useState([]);
  const formatCurrency = FormatCurrency();

  useEffect(() => {
    if (clientByID.Presupuestos) {
      const sortedPagos = [];
      clientByID.Presupuestos.forEach((presupuesto) => {
        if (presupuesto.Pagos) {
          sortedPagos.push(...presupuesto.Pagos);
        }
      });
      sortedPagos.sort((a, b) => new Date(a.FechaPago) - new Date(b.FechaPago));
      setSortedPagos(sortedPagos);
    }
  }, [clientByID]);

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
      }
    });
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = date.getDate() + 1;
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? "0" : ""}${day}-${
      month < 10 ? "0" : ""
    }${month}-${year}`;
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
            {sortedPagos.map((pago) => (
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
                      handleDeletePago(pago.PresupuestoId, pago._id)
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </div>
  );
};

export default PagosList;
