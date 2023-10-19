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

const PagosList = ({ open, onClose, selectedClientIndex }) => {
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

  const handleOnPay = () => {
    setOnPay(!onPay);
  };

  useEffect(() => {
    fetchClientsData();
  }, [DeletePres, handleOnPay]);

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
            {ClientData.Presupuestos?.map((presupuesto, presupuestoIndex) =>
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
