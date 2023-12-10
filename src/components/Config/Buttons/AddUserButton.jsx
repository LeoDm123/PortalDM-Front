import * as React from "react";
import IconButton from "@mui/material/IconButton";
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
      <IconButton onClick={handleClick} size="small">
        <PersonAddIcon />
      </IconButton>
      <AddUserModal
        open={modalOpen}
        onClose={handleCloseModal}
        onUserCreation={onUserCreation}
      />
    </Grid>
  );
}
