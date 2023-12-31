import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import AddPresupuestoForm from "../../../components/Clientes/Forms/AddPresupuestoForm";

const AddPago = ({ open, onClose, selectedClientIndex, onSubmitPres }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Paper
        sx={{
          height: "95%",
          p: 2,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        className="CreateModal"
      >
        <AddPresupuestoForm
          onClose={onClose}
          open={open}
          selectedClientIndex={selectedClientIndex}
          onSubmitPres={onSubmitPres}
        />
      </Paper>
    </Modal>
  );
};

export default AddPago;
