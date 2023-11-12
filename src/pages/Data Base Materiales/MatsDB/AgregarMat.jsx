import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import AddMatForm from "../../../components/Data Base Materiales/Forms/AddMatForm";

const AgregarMat = ({ open, onClose }) => {
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
        <AddMatForm onClose={onClose} />
      </Paper>
    </Modal>
  );
};

export default AgregarMat;
