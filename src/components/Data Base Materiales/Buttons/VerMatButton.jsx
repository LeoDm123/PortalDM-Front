import React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";

const VerMatButton = ({ onClick }) => {
  return (
    <div>
      <ButtonGroup variant="outlined" aria-label="delete">
        <IconButton onClick={onClick}>
          <VisibilityIcon />
        </IconButton>
      </ButtonGroup>
    </div>
  );
};

export default VerMatButton;
