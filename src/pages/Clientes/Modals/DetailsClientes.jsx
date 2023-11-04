import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Title from "../../../components/Title";
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

const DetailsClientes = ({
  open,
  onClose,
  selectedClientIndex,
  onPaySubmit,
  onPresSubmit,
}) => {
  const [onSubmitPres, setOnSubmitPres] = useState(false);
  const [onSubmitPay, setOnSubmitPay] = useState(false);
  const [onClientEdit, setOnClientEdit] = useState(false);

  const handleOnSubmitPres = () => {
    setOnSubmitPres(!onSubmitPres);
    onPresSubmit();
  };

  const handleOnSubmitPay = () => {
    setOnSubmitPay(!onSubmitPay);
    onPaySubmit();
  };

  const handleOnClientEdit = () => {
    setOnClientEdit(!onClientEdit);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    }).format(value);
  };

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
              <AddPresupuestoButton
                selectedClientIndex={selectedClientIndex}
                onSubmitPres={handleOnSubmitPres}
              />
              <AddPagoButton
                selectedClientIndex={selectedClientIndex}
                onSubmitPay={handleOnSubmitPay}
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
                <div className="d-flex justify-content-between">
                  <Title>Datos del Cliente</Title>
                </div>
                <EditClienteButton
                  selectedClientIndex={selectedClientIndex}
                  onClientChange={handleOnClientEdit}
                />
              </Grid>
              <Grid mb={2}>
                <DividerTitle />
              </Grid>
              <ClientDataList
                selectedClientIndex={selectedClientIndex}
                onClientChange={handleOnClientEdit}
              />
            </Paper>

            <Paper sx={{ width: "100%", py: 1, px: 2, ml: 2 }}>
              <div className="d-flex justify-content-between">
                <Title>Pagos</Title>
              </div>
              <DividerTitle />
              <PagosList
                selectedClientIndex={selectedClientIndex}
                onSubmitPay={onSubmitPay}
              />
            </Paper>
          </div>

          <Paper sx={{ width: "100%", py: 1, px: 2, height: 280 }}>
            <div className="d-flex justify-content-between ">
              <Title>Presupuestos</Title>
            </div>
            <DividerTitle />
            <PresupuestosList
              selectedClientIndex={selectedClientIndex}
              onSubmitPres={handleOnSubmitPres}
            />
          </Paper>
        </Paper>
      </Modal>
    </ThemeProvider>
  );
};

export default DetailsClientes;
