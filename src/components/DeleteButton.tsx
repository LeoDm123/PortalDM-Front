import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";

interface DeleteButtonProps {
  onDelete: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onDelete }) => {
  return (
    <div>
      <ButtonGroup variant="outlined" aria-label="delete">
        <IconButton onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </ButtonGroup>
    </div>
  );
};

export default DeleteButton;
