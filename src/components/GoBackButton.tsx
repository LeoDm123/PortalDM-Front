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
    <ButtonGroup className="me-5" variant="contained" aria-label="split button">
      <Button onClick={handleClick}>
        <ArrowBackIcon />
      </Button>
    </ButtonGroup>
  );
};

export default GoBackButton;
