import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CloseButton from "../../components/CloseButton";
import DeleteButton from "../../components/DeleteButton";
import Swal from "sweetalert2";

const DetailsClientes = ({ open, onClose }) => {
  const [ClientData, setClientData] = useState(
    JSON.parse(localStorage.getItem("clients")) || []
  );

  //FORMATO DE MONEDA
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    }).format(value);
  };

  const handleDeletePresupuesto = (clientIndex, presupuestoIndex) => {
    Swal.fire({
      title: "Confirm Deletion",
      text: "Are you sure you want to delete this presupuesto?",
      icon: "warning",
      customClass: { container: "DeleteSwalPos" },
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedClientData = [...ClientData];

        // Delete the presupuesto
        updatedClientData[clientIndex].Presupuestos.splice(presupuestoIndex, 1);

        localStorage.setItem("clients", JSON.stringify(updatedClientData));
        // Trigger a state update or re-render to reflect the changes in the UI if needed

        setClientData(updatedClientData);

        Swal.fire({
          title: "Deleted!",
          text: "The pago has been deleted.",
          icon: "success",
          customClass: {
            container: "DeleteSwalPos", // Add your custom class here
          },
        });
      }
    });
  };

  const handleDeletePago = (clientIndex, presupuestoIndex, pagoIndex) => {
    Swal.fire({
      title: "Confirm Deletion",
      text: "Are you sure you want to delete this pago?",
      icon: "warning",
      showCancelButton: true,
      customClass: { container: "DeleteSwalPos" },
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedClientData = [...ClientData];
        const presupuestoToUpdate =
          updatedClientData[clientIndex].Presupuestos[presupuestoIndex];

        // Delete the pago
        presupuestoToUpdate.pagos.splice(pagoIndex, 1);

        localStorage.setItem("clients", JSON.stringify(updatedClientData));
        // Trigger a state update or re-render to reflect the changes in the UI if needed

        setClientData(updatedClientData);

        Swal.fire({
          title: "Deleted!",
          text: "The pago has been deleted.",
          icon: "success",
          customClass: {
            container: "DeleteSwalPos", // Add your custom class here
          },
        });
      }
    });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Paper
        sx={{
          height: "95%",
          width: "80%",
          p: 2,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        className="CreateModal"
      >
        <div className="d-flex justify-content-end">
          <CloseButton handleClick={onClose} />
        </div>

        <div className="d-flex mb-4">
          <div className="border-3 border-end DatosList">
            <div className="d-flex justify-content-between mb-2">
              <h1 className="h3">Datos del Cliente</h1>
            </div>

            {ClientData.map((client) => (
              <div>
                <div className="d-flex w-100">
                  <div>
                    <p className="fw-bold">Cliente:&nbsp;</p>
                  </div>
                  <div>
                    <p>
                      {client.ClientName} {client.ClientApellido}
                    </p>
                  </div>
                </div>
                <div className="d-flex w-100">
                  <div>
                    <p className="fw-bold">CUIT:&nbsp;</p>
                  </div>
                  <div>
                    <p>{client.ClientCUIT}</p>
                  </div>
                </div>
                <div className="d-flex w-100">
                  <div>
                    <p className="fw-bold">DNI:&nbsp;</p>
                  </div>
                  <div>
                    <p>{client.ClientDNI}</p>
                  </div>
                </div>

                <div className="d-flex w-100">
                  <div>
                    <p className="fw-bold">Dirección:&nbsp;</p>
                  </div>
                  <div>
                    <p>{client.ClientAdress}</p>
                  </div>
                </div>
                <div className="d-flex w-100">
                  <div>
                    <p className="fw-bold">Email:&nbsp;</p>
                  </div>
                  <div>
                    <p>{client.ClientEmail}</p>
                  </div>
                </div>
                <div className="d-flex w-100">
                  <div>
                    <p className="fw-bold">Condición de facturación:&nbsp;</p>
                  </div>
                  <div>
                    <p>{client.ClientIVACond}</p>
                  </div>
                </div>

                <div className="d-flex w-100">
                  <div>
                    <p className="fw-bold">Teléfono:&nbsp;</p>
                  </div>
                  <div>
                    <p>{client.ClientTel}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="w-100 mx-3">
            <div className="d-flex justify-content-between">
              <h1 className="h3">Pagos</h1>
            </div>
            <Table size="medium">
              <TableHead>
                <TableRow>
                  <TableCell className="text-center fw-bold">Codigo</TableCell>
                  <TableCell className="text-center fw-bold">Fecha</TableCell>
                  <TableCell className="text-center fw-bold">Monto</TableCell>
                  <TableCell className="text-center fw-bold">
                    Concepto
                  </TableCell>
                  <TableCell className="text-center fw-bold">
                    Comprobante
                  </TableCell>
                  <TableCell className="text-center fw-bold">
                    Comentarios
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ClientData.map((client, clientIndex) =>
                  client.Presupuestos?.map((presupuesto, presupuestoIndex) =>
                    presupuesto.pagos?.map((pago, pagoIndex) => (
                      <TableRow key={pagoIndex}>
                        <TableCell className="text-center">
                          {presupuesto.PresupuestoCodigo}
                        </TableCell>
                        <TableCell className="text-center">
                          {pago.Fecha}
                        </TableCell>
                        <TableCell className="text-center">
                          {formatCurrency(pago.MontoPago)}
                        </TableCell>
                        <TableCell className="text-center">
                          {pago.ConceptoPago}
                        </TableCell>
                        <TableCell className="text-center">
                          {pago.NumeroComprobante}
                        </TableCell>
                        <TableCell className="text-center">
                          {pago.Comentarios}
                        </TableCell>
                        <DeleteButton
                          onDelete={() =>
                            handleDeletePago(
                              clientIndex,
                              presupuestoIndex,
                              pagoIndex
                            )
                          }
                        />
                      </TableRow>
                    ))
                  )
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        <React.Fragment>
          <div className="d-flex justify-content-between mt-3">
            <h1 className="h3">Presupuestos</h1>
          </div>
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
                <TableCell className="text-center fw-bold">
                  Total Final
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ClientData.map((client, clientIndex) => (
                <React.Fragment key={clientIndex}>
                  {client.Presupuestos?.map((presupuesto, presupuestoIndex) => (
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
                          presupuesto.pagos
                            ? presupuesto.pagos
                                .filter((pago) => pago.EstadoConcepto === 0)
                                .reduce((sum, pago) => sum + pago.MontoPago, 0)
                            : 0
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {formatCurrency(
                          presupuesto.pagos
                            ? presupuesto.pagos
                                .filter((pago) => pago.EstadoConcepto === 1)
                                .reduce((sum, pago) => sum + pago.MontoPago, 0)
                            : 0
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {formatCurrency(
                          presupuesto.pagos
                            ? presupuesto.pagos
                                .filter((pago) => pago.EstadoConcepto === 2)
                                .reduce((sum, pago) => sum + pago.MontoPago, 0)
                            : 0
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {formatCurrency(
                          presupuesto.Total -
                            (presupuesto.pagos
                              ? presupuesto.pagos
                                  .filter((pago) => pago.EstadoConcepto === 0)
                                  .reduce(
                                    (sum, pago) => sum + pago.MontoPago,
                                    0
                                  )
                              : 0) +
                            (presupuesto.pagos
                              ? presupuesto.pagos
                                  .filter((pago) => pago.EstadoConcepto === 1)
                                  .reduce(
                                    (sum, pago) => sum + pago.MontoPago,
                                    0
                                  )
                              : 0) +
                            (presupuesto.pagos
                              ? presupuesto.pagos
                                  .filter((pago) => pago.EstadoConcepto === 2)
                                  .reduce(
                                    (sum, pago) => sum + pago.MontoPago,
                                    0
                                  )
                              : 0)
                        )}
                      </TableCell>
                      <DeleteButton
                        onDelete={() =>
                          handleDeletePresupuesto(clientIndex, presupuestoIndex)
                        }
                      />
                    </TableRow>
                  ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </React.Fragment>
      </Paper>
    </Modal>
  );
};

export default DetailsClientes;
