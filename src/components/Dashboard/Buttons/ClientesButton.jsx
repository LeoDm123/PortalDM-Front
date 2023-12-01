import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useNavigate } from "react-router-dom";

export default function ClientesButton() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/GestionarClientes");
  };

  return (
    <React.Fragment>
      <ButtonGroup variant="contained" aria-label="split button">
        <Button className="ActionButtonListless" onClick={handleClick}>
          Gestionar Clientes
        </Button>
      </ButtonGroup>
    </React.Fragment>
  );
}
