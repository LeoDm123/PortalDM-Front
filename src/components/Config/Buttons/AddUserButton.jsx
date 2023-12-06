import * as React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddUserModal from "../Modal/AddUserModal";

export default function AddUserButton({ onUserCreation }) {
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
        startIcon={<PersonAddIcon />}
        size="medium"
        sx={{ width: 210 }}
      >
        Agregar Usuario
      </Button>
      <AddUserModal
        open={modalOpen}
        onClose={handleCloseModal}
        onUserCreation={onUserCreation}
      />
    </Grid>
  );
}
