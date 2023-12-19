import React from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Title from "../../../Title";
import { DividerTitle } from "../../../Dividers";
import CloseButton from "../../../CloseButton";
import MaterialesMarcosList from "../../Lists/Puertas/Materiales/MaterialesMarcosList";
import MaterialesHojaList from "../../Lists/Puertas/Materiales/MaterialesHojaList";
import MaterialesRellenoList from "../../Lists/Puertas/Materiales/MaterialesRellenoList";
import ApliquesList from "../../Lists/Puertas/Terminaciones/ApliquesList";
import TerminacionesList from "../../Lists/Puertas/Terminaciones/TerminacionesList";

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
          width: "100%",
          height: "100%",
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
        <Grid
          container
          spacing={1}
          sx={{ width: "100%", display: "Flex", marginTop: 1 }}
        >
          <Grid item lg>
            <MaterialesMarcosList />
          </Grid>
          <Grid item lg>
            <MaterialesHojaList />
          </Grid>
          <Grid item lg>
            <MaterialesRellenoList />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={1}
          sx={{ width: "100%", display: "Flex", marginTop: 1 }}
        >
          <Grid item lg>
            <ApliquesList />
          </Grid>
          <Grid item lg>
            <TerminacionesList />
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  );
};

export default PuertasConfigModal;
