import React from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import InventarioLogForm from "../../../components/Data Base Materiales/Forms/InventarioLogForm";

const InventarioLog = ({ onClose, open, pedidoId, codigoMat }) => {
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
        <InventarioLogForm onClose={onClose} />
      </Paper>
    </Modal>
  );
};

export default InventarioLog;
