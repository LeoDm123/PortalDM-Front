import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useNavigate } from "react-router-dom";

export default function MatsDatabaseButton() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/BaseDatosMats");
  };

  return (
    <React.Fragment>
      <ButtonGroup variant="contained" aria-label="split button">
        <Button className="ActionButtonListless" onClick={handleClick}>
          Gestionar DB de Materiales
        </Button>
      </ButtonGroup>
    </React.Fragment>
  );
}
