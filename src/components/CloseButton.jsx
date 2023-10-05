import React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import CloseIcon from "@mui/icons-material/Close";

const CloseButton = ({ handleClick }) => {
  return (
    <ButtonGroup
      sx={{ borderRadius: 50 }}
      variant="contained"
      aria-label="split button"
    >
      <Button sx={{ borderRadius: 50 }} onClick={handleClick}>
        <CloseIcon />
      </Button>
    </ButtonGroup>
  );
};

export default CloseButton;
