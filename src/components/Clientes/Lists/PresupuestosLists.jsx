import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CloseButton from "../../../components/CloseButton";
import DeleteButton from "../../../components/DeleteButton";
import { DividerTitle } from "../../../components/Dividers";
import swal from "sweetalert";
import List from "@mui/material/List";
import serverAPI from "../../../api/serverAPI";
import EditClienteButton from "../../../components/Clientes/Buttons/EditClienteButton";
import AddPresupuestoButton from "../../../components/Clientes/Buttons/AddPresupuestoButton";
import AddPagoButton from "../../../components/Clientes/Buttons/AddPagoButton";

const PresupuestosList = ({ open, onClose, selectedClientIndex }) => {
  const [ClientData, setClientData] = useState([]);
  const [onPay, setOnPay] = useState(true);

  useEffect(() => {
    fetchClientsData();
  }, []);

  const fetchClientsData = async () => {
    try {
      const resp = await serverAPI.get("/clients/obtenerClientes");
      setClientData(resp.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    }).format(value);
  };

  const DeletePres = async (clientId, _id) => {
    try {
      const client = ClientData[selectedClientIndex];

      if (!client) {
        console.error("Cliente no encontrado.");
        return;
      }

      console.log(client.Presupuestos);

      const presupuestoToDelete = client.Presupuestos.find(
        (presupuesto) => presupuesto._id === _id
      );

      console.log(presupuestoToDelete._id);

      if (!presupuestoToDelete) {
        console.error(`Presupuesto con código ${_id} no encontrado.`);
        return;
      }

      const deleteResp = await serverAPI.delete(
        `/pres/deletePres/${clientId}/${presupuestoToDelete._id}`
      );

      if (deleteResp.data.message === "Presupuesto deleted successfully") {
        console.log(deleteResp);
        fetchClientsData();
      } else {
        console.log("Operación de eliminación fallida.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnPay = () => {
    setOnPay(!onPay);
  };

  useEffect(() => {
    fetchClientsData();
  }, [DeletePres, handleOnPay]);

  return (
    <div>
      <div className="scrollable-list">
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
              <TableCell className="text-center fw-bold">Total Final</TableCell>
              <TableCell className="text-center fw-bold">Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ClientData[selectedClientIndex]?.Presupuestos?.map(
              (presupuesto, presupuestoIndex) => (
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
                              pago.PagoConcepto === "Anticipo Total" ||
                              pago.PagoConcepto === "Saldo Parcial" ||
                              pago.PagoConcepto === "Saldo Total" ||
                              pago.PagoConcepto === "Pago Total"
                          ).reduce((sum, pago) => sum + pago.PagoMonto, 0)
                        : 0
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {formatCurrency(
                      presupuesto.Pagos
                        ? presupuesto.Pagos.filter(
                            (pago) => pago.PagoConcepto === "Actualizacion"
                          ).reduce((sum, pago) => sum + pago.PagoMonto, 0)
                        : 0
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {formatCurrency(
                      presupuesto.Pagos
                        ? presupuesto.Pagos.filter(
                            (pago) => pago.PagoConcepto === "Extras"
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
                                pago.PagoConcepto === "Anticipo Total" ||
                                pago.PagoConcepto === "Saldo Parcial" ||
                                pago.PagoConcepto === "Saldo Total" ||
                                pago.PagoConcepto === "Pago Total"
                            ).reduce((sum, pago) => sum + pago.PagoMonto, 0)
                          : 0) +
                        (presupuesto.Pagos
                          ? presupuesto.Pagos.filter(
                              (pago) => pago.PagoConcepto === "Actualizacion"
                            ).reduce((sum, pago) => sum + pago.PagoMonto, 0)
                          : 0) +
                        (presupuesto.Pagos
                          ? presupuesto.Pagos.filter(
                              (pago) => pago.PagoConcepto === "Extras"
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
              )
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PresupuestosList;
