import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import AddPago from "../../../pages/Clientes/Modals/AddPago";

export default function AddPagoButton({ onPay }) {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Grid item xs={12} md={12} lg={12}>
      <React.Fragment>
        <ButtonGroup
          variant="contained"
          aria-label="split button"
          className="mb-3 ms-3"
        >
          <Button className="AddPresupuestoButton" onClick={handleClick}>
            Ingresar Pago
          </Button>
        </ButtonGroup>
        <AddPago open={modalOpen} onClose={handleCloseModal} onPay={onPay} />
      </React.Fragment>
    </Grid>
  );
}