import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteButton from "../../../components/DeleteButton";
import serverAPI from "../../../api/serverAPI";

const PresupuestosList = ({ open, onClose, selectedClientIndex }) => {
  const [ClientData, setClientData] = useState([]);
  const [onPay, setOnPay] = useState(true);

  useEffect(() => {
    fetchClientsData();
  }, []);

  const fetchClientsData = async () => {
    try {
      const resp = await serverAPI.get(
        `/clients/obtenerClientePorId/${selectedClientIndex}`
      );
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
              <TableCell className="text-center fw-bold">Saldo</TableCell>
              <TableCell className="text-center fw-bold">Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ClientData.Presupuestos?.map((presupuesto, presupuestoIndex) => (
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
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PresupuestosList;
