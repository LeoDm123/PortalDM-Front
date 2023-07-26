import PresupuestosButton from "./PresupuestosButton";
import PedidosButton from "./PedidosButton";
import "../../App.css";
import ClientesButton from "./ClientesButton";
import MatsDatabaseButton from "./MatsDatabaseButton";

export default function ButtonChart() {
  return (
    <div className="d-flex">
      <div>
        <div className="py-1 me-5">
          <PresupuestosButton />
        </div>
        <div className="py-1 me-5">
          <PedidosButton />
        </div>
        <div className="py-1 me-5">
          <ClientesButton />
        </div>
      </div>
      <div>
        <div className="py-1">
          <MatsDatabaseButton />
        </div>
      </div>
    </div>
  );
}
