import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import PedidoVidriosForm from "../../../../components/Pedidos/Forms/Vidrios/PedidoVidriosForm";

const PedidoVidrios = ({ open, onClose, onSubmit }) => {
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
        <PedidoVidriosForm onClose={onClose} onSubmit={onSubmit} />
      </Paper>
    </Modal>
  );
};

export default PedidoVidrios;
