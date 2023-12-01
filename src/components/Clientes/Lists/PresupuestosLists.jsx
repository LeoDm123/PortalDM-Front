import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import serverAPI from "../../../api/serverAPI";
import DeleteButton from "../../../components/DeleteButton";
import fetchClientByID from "../../../hooks/Clientes/fetchClientByID";
import useDeletePres from "../../../hooks/Clientes/Presupuestos/deletePresByID";
import FormatCurrency from "../../../hooks/formatCurrency";

const PresupuestosList = ({
  selectedClientIndex,
  onSubmitPres,
  onPresEdit,
  onPresDelete,
}) => {
  const clientByID = fetchClientByID(selectedClientIndex, onSubmitPres);
  const { deletePres, error } = useDeletePres(selectedClientIndex, clientByID);
  const formatCurrency = FormatCurrency();
  const [estadoPres, setEstadoPres] = useState(null);
  const [selectedPresupuestoId, setSelectedPresupuestoId] = useState(null);

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
        onPresDelete();
      }
    });
  };

  const handleChangeStatus = () => {
    swal({
      title: "¿Desea cambiar el estado del presupuesto?",
      icon: "warning",
      buttons: ["No", "Sí"],
      dangerMode: true,
    }).then((confirmed) => {
      if (confirmed) {
        ChangeStatus(estadoPres, selectedPresupuestoId, selectedClientIndex);
      } else {
        console.log("El usuario canceló");
      }
    });
  };

  const ChangeStatus = async (
    estadoPres,
    selectedPresupuestoId,
    selectedClientIndex
  ) => {
    if (selectedPresupuestoId && estadoPres) {
      try {
        await serverAPI.put(
          `/pres/editPresupuesto/${selectedClientIndex}/${selectedPresupuestoId}`,
          {
            Estado: estadoPres,
          }
        );
        SwAlertOk();
        onPresEdit();
      } catch (error) {
        console.error(error);
        SwAlertError();
      }
    }
  };

  useEffect(() => {
    if (estadoPres !== null && selectedPresupuestoId !== null) {
      handleChangeStatus();
    }
  }, [estadoPres, selectedPresupuestoId]);

  const SwAlertOk = () => {
    swal({
      title: "¡Éxito!",
      text: "El estado del presupuesto se ha actualizado correctamente",
      icon: "success",
    });
  };

  const SwAlertError = () => {
    swal({
      title: "¡Error!",
      text: "Hubo un error al actualizar los datos del presupuesto",
      icon: "error",
    });
  };

  return (
    <div>
      <Grid
        sx={{
          mb: 1,
          display: "flex",
          flexDirection: "column",
          height: 200,
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
                Facturac.
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "#E1E3E1" }}
                className="text-center fw-bold"
              >
                Precio
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "#E1E3E1" }}
                className="text-center fw-bold"
              >
                IVA
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "#E1E3E1" }}
                className="text-center fw-bold"
              >
                Total
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "#E1E3E1" }}
                className="text-center fw-bold"
              >
                Total Pagado
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "#E1E3E1" }}
                className="text-center fw-bold"
              >
                Actualización
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "#E1E3E1" }}
                className="text-center fw-bold"
              >
                Extras
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "#E1E3E1" }}
                className="text-center fw-bold"
              >
                Saldo
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "#E1E3E1" }}
                className="text-center fw-bold"
              >
                Estado
              </TableCell>
              <TableCell
                sx={{ backgroundColor: "#E1E3E1" }}
                className="text-center fw-bold"
              ></TableCell>
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
                  <FormControl variant="standard" fullWidth>
                    <Select
                      label=""
                      value={estadoPres || presupuesto.Estado}
                      onChange={(e) => {
                        setEstadoPres(e.target.value);
                        setSelectedPresupuestoId(presupuesto._id);
                      }}
                    >
                      <MenuItem value="">
                        <em>Seleccione</em>
                      </MenuItem>
                      <MenuItem value="Activo">Activo</MenuItem>
                      <MenuItem value="En proceso">En proceso</MenuItem>
                      <MenuItem value="A cobrar">A cobrar</MenuItem>
                      <MenuItem value="Cerrado">Cerrado</MenuItem>
                    </Select>
                  </FormControl>
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
