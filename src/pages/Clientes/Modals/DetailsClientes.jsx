import React, { useState, useEffect } from "react";
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
import swal from "sweetalert";
import List from "@mui/material/List";
import serverAPI from "../../../api/serverAPI";
import EditClienteButton from "../../../components/Clientes/Buttons/EditClienteButton";

const DetailsClientes = ({ open, onClose, selectedClientIndex }) => {
  const [ClientData, setClientData] = useState([]);

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

  const handleDeletePres = (codigo) => {
    swal({
      title: "¿Desea borrar el presupuesto?",
      text: "Una vez borrado, este no podrá ser recuperado",
      icon: "warning",
      buttons: ["No", "Sí"],
      dangerMode: true,
    }).then((willCancel) => {
      if (willCancel) {
        swal("¡Presupuesto borrado con éxito!", {
          icon: "success",
        });
        DeletePres(ClientData[selectedClientIndex]._id, codigo);
      }
    });
  };

  useEffect(() => {
    fetchClientsData();
  }, [DeletePres]);

  return (
    <Modal open={open} onClose={onClose}>
      <Paper
        sx={{
          height: "100%",
          width: "100%",
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

        <div className="d-flex mb-4 DatosPagosContainer">
          <div>
            <Grid
              sx={{
                width: 450,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 2,
              }}
            >
              <Typography variant="h4">Datos del Cliente</Typography>
              <EditClienteButton selectedClientIndex={selectedClientIndex} />
            </Grid>

            {ClientData[selectedClientIndex] && (
              <div>
                <div className="d-flex w-100">
                  <div>
                    <p className="fw-bold">Cliente:&nbsp;</p>
                  </div>
                  <div>
                    <p>
                      {ClientData[selectedClientIndex].ClientName}{" "}
                      {ClientData[selectedClientIndex].ClientApellido}
                    </p>
                  </div>
                </div>
                <div className="d-flex w-100">
                  <div>
                    <p className="fw-bold">CUIT:&nbsp;</p>
                  </div>
                  <div>
                    <p>{ClientData[selectedClientIndex].ClientCUIT}</p>
                  </div>
                </div>
                <div className="d-flex w-100">
                  <div>
                    <p className="fw-bold">DNI:&nbsp;</p>
                  </div>
                  <div>
                    <p>{ClientData[selectedClientIndex].ClientDNI}</p>
                  </div>
                </div>

                <div className="d-flex w-100">
                  <div>
                    <p className="fw-bold">Dirección:&nbsp;</p>
                  </div>
                  <div>
                    <p>{ClientData[selectedClientIndex].ClientAdress}</p>
                  </div>
                </div>
                <div className="d-flex w-100">
                  <div>
                    <p className="fw-bold">Email:&nbsp;</p>
                  </div>
                  <div>
                    <p>{ClientData[selectedClientIndex].ClientEmail}</p>
                  </div>
                </div>
                <div className="d-flex w-100">
                  <div>
                    <p className="fw-bold">Condición de facturación:&nbsp;</p>
                  </div>
                  <div>
                    <p>{ClientData[selectedClientIndex].ClientIVACond}</p>
                  </div>
                </div>

                <div className="d-flex w-100">
                  <div>
                    <p className="fw-bold">Teléfono:&nbsp;</p>
                  </div>
                  <div>
                    <p>{ClientData[selectedClientIndex].ClientTel}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="w-75 mx-3 border-3 border-start">
            <div className="d-flex justify-content-between">
              <h1 className="h3 ms-2">Pagos</h1>
            </div>
            <List className="scrollable-paylist">
              <Table size="medium">
                <TableHead>
                  <TableRow>
                    <TableCell className="text-center fw-bold">
                      Codigo
                    </TableCell>
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
                  {ClientData[selectedClientIndex]?.Presupuestos?.map(
                    (presupuesto, presupuestoIndex) =>
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
            </List>
          </div>
        </div>

        <React.Fragment>
          <div className="d-flex justify-content-between mt-3">
            <h1 className="h3">Presupuestos</h1>
          </div>
          <div className="scrollable-list">
            <Table size="medium">
              <TableHead>
                <TableRow>
                  <TableCell className="text-center fw-bold">Codigo</TableCell>
                  <TableCell className="text-center fw-bold">
                    Facturac.
                  </TableCell>
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
        </React.Fragment>
      </Paper>
    </Modal>
  );
};

export default DetailsClientes;
