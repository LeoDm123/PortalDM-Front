import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CloseButton from "../../../components/CloseButton";
import { DividerTitle } from "../../../components/Dividers";
import swal from "sweetalert";
import serverAPI from "../../../api/serverAPI";
import EditClienteButton from "../../../components/Clientes/Buttons/EditClienteButton";
import AddPresupuestoButton from "../../../components/Clientes/Buttons/AddPresupuestoButton";
import AddPagoButton from "../../../components/Clientes/Buttons/AddPagoButton";
import PresupuestosList from "../../../components/Clientes/Lists/PresupuestosLists";
import PagosList from "../../../components/Clientes/Lists/PagosList";
import ClientDataList from "../../../components/Clientes/Lists/ClientDataList";

const DetailsClientes = ({ open, onClose, selectedClientIndex }) => {
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

  const defaultTheme = createTheme({
    palette: {
      primary: {
        main: "#01662b",
      },
      secondary: {
        main: "#6a6a6a",
      },
    },
  });

  return (
    <ThemeProvider theme={defaultTheme}>
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
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[300]
                : theme.palette.grey[900],
          }}
          className="CreateModal"
        >
          <div className="d-flex justify-content-between align-items-center">
            <Grid
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <AddPresupuestoButton selectedClientIndex={selectedClientIndex} />
              <AddPagoButton
                onPay={handleOnPay}
                selectedClientIndex={selectedClientIndex}
              />
            </Grid>
            <CloseButton handleClick={onClose} />
          </div>

          <div className="d-flex mb-3 DatosPagosContainer">
            <Paper
              sx={{
                height: "100%",
                py: 1,
                px: 2,
              }}
            >
              <Grid
                sx={{
                  width: 450,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingRight: 1,
                }}
              >
                <Typography variant="h4">Datos del Cliente</Typography>
                <EditClienteButton selectedClientIndex={selectedClientIndex} />
              </Grid>
              <Grid mb={2}>
                <DividerTitle />
              </Grid>
              <ClientDataList selectedClientIndex={selectedClientIndex} />
            </Paper>

            <Paper sx={{ width: "100%", py: 1, px: 2, ml: 2 }}>
              <div className="d-flex justify-content-between">
                <h1 className="h3 ms-2">Pagos</h1>
              </div>
              <DividerTitle />
              <PagosList selectedClientIndex={selectedClientIndex} />
            </Paper>
          </div>

          <Paper sx={{ width: "100%", py: 1, px: 2, height: 280 }}>
            <div className="d-flex justify-content-between ">
              <h1 className="h3">Presupuestos</h1>
            </div>
            <DividerTitle />
            <PresupuestosList selectedClientIndex={selectedClientIndex} />
          </Paper>
        </Paper>
      </Modal>
    </ThemeProvider>
  );
};

export default DetailsClientes;
