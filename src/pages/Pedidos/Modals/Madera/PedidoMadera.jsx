import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import PedidoMaderaForm from "../../../../components/Pedidos/Forms/Madera/PedidoMaderaForm";

const PedidoMadera = ({ open, onClose, onSubmit }) => {
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
        <PedidoMaderaForm onClose={onClose} onSubmit={onSubmit} />
      </Paper>
    </Modal>
  );
};

export default PedidoMadera;
