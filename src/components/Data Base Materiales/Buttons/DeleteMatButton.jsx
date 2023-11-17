import React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

const DeleteMatButton = ({ onDelete }) => {
  return (
    <div>
      <Button onClick={onDelete} startIcon={<DeleteIcon />}>
        Borrar
      </Button>
    </div>
  );
};

export default DeleteMatButton;
