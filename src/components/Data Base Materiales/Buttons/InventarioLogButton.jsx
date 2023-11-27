import * as React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import InventarioLog from "../../../pages/Data Base Materiales/MatsDB/InventarioLog";

export default function InventarioLogButton({}) {
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Grid>
      <Button
        className="AddButton mb-3"
        onClick={handleClick}
        variant="contained"
        startIcon={<VisibilityIcon />}
        size="medium"
        sx={{ width: "100%" }}
      >
        Movimientos de Inventario
      </Button>
      <InventarioLog open={modalOpen} onClose={handleCloseModal} />
    </Grid>
  );
}
