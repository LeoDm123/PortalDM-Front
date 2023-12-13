import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import AddPuertaForm from "../../Forms/Puertas/AddPuertaForm";

const AddPuertaModal = ({ open, onClose, onMatSubmit }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Paper
        sx={{
          p: 2,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          height: "90%",
        }}
        className="CreateModal"
      >
        <AddPuertaForm onClose={onClose} onMatSubmit={onMatSubmit} />
      </Paper>
    </Modal>
  );
};

export default AddPuertaModal;
