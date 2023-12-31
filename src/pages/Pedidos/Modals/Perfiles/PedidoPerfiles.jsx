import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import PedidoPerfilesForm from "../../../../components/Pedidos/Forms/Perfiles/PedidoPerfilesForm";

const PedidoPerfiles = ({ open, onClose, onSubmit }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Paper
        sx={{
          height: "95%",
          p: 2,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        className="CreateModal"
      >
        <PedidoPerfilesForm onClose={onClose} onSubmit={onSubmit} />
      </Paper>
    </Modal>
  );
};

export default PedidoPerfiles;
