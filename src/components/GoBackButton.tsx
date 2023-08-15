import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Grid from "@mui/material/Grid";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface GoBackButtonProps {
  handleClick: () => void;
}

const GoBackButton: React.FC<GoBackButtonProps> = ({ handleClick }) => {
  return (
    <ButtonGroup className="me-4" variant="contained" aria-label="split button">
      <Button sx={{ backgroundColor: "#fff" }} onClick={handleClick}>
        <ArrowBackIcon sx={{ color: "#6a6a6a" }} />
      </Button>
    </ButtonGroup>
  );
};

export default GoBackButton;
