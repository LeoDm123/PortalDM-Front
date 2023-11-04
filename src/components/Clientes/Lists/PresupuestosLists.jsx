import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";
import DeleteButton from "../../../components/DeleteButton";
import fetchClientByID from "../../../hooks/fetchClientByID";
import useDeletePres from "../../../hooks/deletePresByID";

const PresupuestosList = ({ selectedClientIndex, onSubmitPres }) => {
  const [onPay, setOnPay] = useState(true);
  const clientByID = fetchClientByID(selectedClientIndex, onSubmitPres);
  const { deletePres, error } = useDeletePres(selectedClientIndex, clientByID);

  const handleDeletePres = (presId) => {
    swal({
      title: "¿Desea eliminar el pago?",
      text: "Una vez eliminado no podrá ser recuperado",
      icon: "warning",
      buttons: ["No", "Sí"],
      dangerMode: true,
    }).then((willCancel) => {
      if (willCancel) {
        deletePres(selectedClientIndex, presId);
      }
    });
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    }).format(value);
  };

  const handleOnPay = () => {
    setOnPay(!onPay);
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
          height: 200,
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
              <TableCell className="text-center fw-bold">Facturac.</TableCell>
              <TableCell className="text-center fw-bold">Precio</TableCell>
              <TableCell className="text-center fw-bold">IVA</TableCell>
              <TableCell className="text-center fw-bold">Total</TableCell>
              <TableCell className="text-center fw-bold">
                Total Pagado
              </TableCell>
              <TableCell className="text-center fw-bold">
                Actualización
              </TableCell>
              <TableCell className="text-center fw-bold">Extras</TableCell>
              <TableCell className="text-center fw-bold">Saldo</TableCell>
              <TableCell className="text-center fw-bold">Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientByID.Presupuestos?.map((presupuesto, presupuestoIndex) => (
              <TableRow key={presupuestoIndex}>
                <TableCell className="text-center">
                  {presupuesto.PresupuestoCodigo}
                </TableCell>
                <TableCell className="text-center">
                  {presupuesto.CondicionFacturacion}%
                </TableCell>
                <TableCell className="text-center">
                  {formatCurrency(presupuesto.Precio)}
                </TableCell>
                <TableCell className="text-center">
                  {formatCurrency(presupuesto.IVA)}
                </TableCell>
                <TableCell className="text-center">
                  {formatCurrency(presupuesto.Total)}
                </TableCell>
                <TableCell className="text-center">
                  {formatCurrency(
                    presupuesto.Pagos
                      ? presupuesto.Pagos.filter(
                          (pago) =>
                            pago.PagoConcepto === "Anticipo Parcial" ||
                            pago.PagoConcepto === "Anticipo Completo" ||
                            pago.PagoConcepto === "Saldo Parcial" ||
                            pago.PagoConcepto === "Saldo Completo"
                        ).reduce((sum, pago) => sum + pago.PagoMonto, 0)
                      : 0
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {formatCurrency(
                    presupuesto.Pagos
                      ? presupuesto.Pagos.filter(
                          (pago) => pago.PagoConcepto === "Actualización"
                        ).reduce((sum, pago) => sum + pago.PagoMonto, 0)
                      : 0
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {formatCurrency(
                    presupuesto.Pagos
                      ? presupuesto.Pagos.filter(
                          (pago) => pago.PagoConcepto === "Extra"
                        ).reduce((sum, pago) => sum + pago.PagoMonto, 0)
                      : 0
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {formatCurrency(
                    presupuesto.Total -
                      (presupuesto.Pagos
                        ? presupuesto.Pagos.filter(
                            (pago) =>
                              pago.PagoConcepto === "Anticipo Parcial" ||
                              pago.PagoConcepto === "Anticipo Completo" ||
                              pago.PagoConcepto === "Saldo Parcial" ||
                              pago.PagoConcepto === "Saldo Completo"
                          ).reduce((sum, pago) => sum + pago.PagoMonto, 0)
                        : 0) +
                      (presupuesto.Pagos
                        ? presupuesto.Pagos.filter(
                            (pago) => pago.PagoConcepto === "Actualización"
                          ).reduce((sum, pago) => sum + pago.PagoMonto, 0)
                        : 0) +
                      (presupuesto.Pagos
                        ? presupuesto.Pagos.filter(
                            (pago) => pago.PagoConcepto === "Extra"
                          ).reduce((sum, pago) => sum + pago.PagoMonto, 0)
                        : 0)
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {presupuesto.Estado}
                </TableCell>
                <TableCell className="text-center">
                  <DeleteButton
                    onDelete={() => handleDeletePres(presupuesto._id)}
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

export default PresupuestosList;
