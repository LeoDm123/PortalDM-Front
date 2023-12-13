import React from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Title from "../../../Title";
import { DividerTitle } from "../../../Dividers";
import CloseButton from "../../../CloseButton";
import MaterialesMarcosList from "../../Lists/Puertas/Materiales/MaterialesMarcosList";

const PuertasConfigModal = ({ open, onClose }) => {
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
            <Title>
              Configuración de Parametros de Presupuestos de Puertas
            </Title>
            <Grid>
              <CloseButton handleClick={onClose} />
            </Grid>
          </Grid>
          <DividerTitle />
        </Grid>
        <Grid>
          <MaterialesMarcosList />
        </Grid>
      </Paper>
    </Modal>
  );
};

export default PuertasConfigModal;
