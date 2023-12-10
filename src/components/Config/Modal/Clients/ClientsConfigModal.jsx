import React from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Title from "../../../Title";
import { DividerTitle } from "../../../Dividers";
import ConceptoPagoList from "../../Lists/ConceptoPagoList";
import CondicionPagoList from "../../Lists/CondicionPagoList";
import CondicionFacturacionList from "../../Lists/CondicionFacturacionList";
import CloseButton from "../../../CloseButton";

const ClientsConfigModal = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Paper
        sx={{
          p: 2,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        className="CreateModal"
      >
        <Grid>
          <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
            <Title>Configuración de Gestión de Clientes</Title>
            <Grid>
              <CloseButton handleClick={onClose} />
            </Grid>
          </Grid>
          <DividerTitle />
        </Grid>
        <Grid container item xs={12} display={"flex"} spacing={1} mt={1}>
          <Grid item xs={4} sx={{ height: 510 }}>
            <Paper
              sx={{
                p: 1,
                display: "flex",
                flexDirection: "column",
                height: "100%",
                borderColor: "#01662b",
              }}
              variant="outlined"
            >
              <ConceptoPagoList />
            </Paper>
          </Grid>
          <Grid item xs={4} sx={{ height: 510 }}>
            <Paper
              sx={{
                p: 1,
                display: "flex",
                flexDirection: "column",
                height: "100%",
                borderColor: "#01662b",
              }}
              variant="outlined"
            >
              <CondicionPagoList />
            </Paper>
          </Grid>
          <Grid item xs={4} sx={{ height: 510 }}>
            <Paper
              sx={{
                p: 1,
                display: "flex",
                flexDirection: "column",
                height: "100%",
                borderColor: "#01662b",
              }}
              variant="outlined"
            >
              <CondicionFacturacionList />
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  );
};

export default ClientsConfigModal;
