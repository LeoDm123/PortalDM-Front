import React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const DeletePedidoButton = ({ onDelete }) => {
  return (
    <div>
      <IconButton onClick={onDelete}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

export default DeletePedidoButton;
