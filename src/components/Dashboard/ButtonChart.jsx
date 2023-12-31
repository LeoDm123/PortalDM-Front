import PresupuestosButton from "./Buttons/PresupuestosButton";
import PedidosButton from "./Buttons/PedidosButton";
import "../../App.css";
import ClientesButton from "./Buttons/ClientesButton";
import DatabaseButton from "./Buttons/DatabaseButton";

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
          <DatabaseButton />
        </div>
      </div>
    </div>
  );
}
