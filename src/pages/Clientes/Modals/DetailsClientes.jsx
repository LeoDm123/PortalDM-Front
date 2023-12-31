import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Title from "../../../components/Title";
import CloseButton from "../../../components/CloseButton";
import { DividerTitle } from "../../../components/Dividers";
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
  onDeleteClient,
  onPresEdit,
  onPresDelete,
  onClientChange,
  onPayDelete,
}) => {
  const [onSubmitPres, setOnSubmitPres] = useState(false);
  const [onSubmitPay, setOnSubmitPay] = useState(false);
  const [onClientEdit, setOnClientEdit] = useState(false);
  const [onClientDelete, setOnClientDelete] = useState(false);

  const handleOnSubmitPres = () => {
    setOnSubmitPres(!onSubmitPres);
    onPresSubmit();
  };

  const handleOnSubmitPay = () => {
    setOnSubmitPay(!onSubmitPay);
    onPaySubmit();
  };

  const handleOnClientDelete = () => {
    setOnClientDelete(!onClientDelete);
    onDeleteClient();
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
          <div className="d-flex justify-content-between align-items-center mb-2">
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
                }}
              >
                <div className="d-flex justify-content-between">
                  <Title>Datos del Cliente</Title>
                </div>
                <EditClienteButton
                  selectedClientIndex={selectedClientIndex}
                  onClientChange={onClientChange}
                  onClientDelete={handleOnClientDelete}
                />
              </Grid>
              <Grid mb={2}>
                <DividerTitle />
              </Grid>
              <ClientDataList
                selectedClientIndex={selectedClientIndex}
                onClientChange={onClientChange}
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
                onPayDelete={onPayDelete}
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
              onPresEdit={onPresEdit}
              onPresDelete={onPresDelete}
            />
          </Paper>
        </Paper>
      </Modal>
    </ThemeProvider>
  );
};

export default DetailsClientes;
